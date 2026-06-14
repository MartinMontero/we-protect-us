
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Calendar, MapPin, DollarSign, FileText } from 'lucide-react';
import { CreateActivityDialog } from './CreateActivityDialog';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { format } from 'date-fns';

type GroupActivity = Tables<'group_activities'> & {
  profiles: { pseudonym: string } | null;
  participant_count: number;
};

export const GroupActivities: React.FC = () => {
  const [activities, setActivities] = useState<GroupActivity[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('group_activities')
        .select(`
          *,
          profiles:organizer_id(pseudonym),
          activity_participants(id)
        `)
        .gte('scheduled_date', new Date().toISOString())
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      
      const activitiesWithCount = (data || []).map(activity => ({
        ...activity,
        participant_count: activity.activity_participants?.length || 0
      }));
      
      setActivities(activitiesWithCount);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinActivity = async (activityId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('activity_participants')
        .insert({
          activity_id: activityId,
          parent_id: user.id,
          children_ids: [], // TODO: Add child selection
        });

      if (error) throw error;
      loadActivities();
    } catch (error) {
      console.error('Error joining activity:', error);
    }
  };

  const getActivityTypeColor = (type: string) => {
    const colors = {
      playground: 'bg-green-100 text-green-800',
      story_time: 'bg-blue-100 text-blue-800',
      field_trip: 'bg-purple-100 text-purple-800',
      birthday_party: 'bg-pink-100 text-pink-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getActivityTypeDisplay = (type: string) => {
    const names = {
      playground: 'Playground',
      story_time: 'Story Time',
      field_trip: 'Field Trip',
      birthday_party: 'Birthday Party',
    };
    return names[type as keyof typeof names] || type;
  };

  if (loading) {
    return <div className="text-center py-8">Loading group activities...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Group Activities</h2>
          <p className="text-gray-600">Fun community events for children and families</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Activity
        </Button>
      </div>

      {/* Activity Types */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4 border-green-200">
          <Users className="w-8 h-8 mx-auto text-green-600 mb-2" />
          <h3 className="font-semibold text-green-800">Playground Meetups</h3>
          <p className="text-sm text-green-600">Casual outdoor play</p>
        </Card>
        <Card className="text-center p-4 border-blue-200">
          <FileText className="w-8 h-8 mx-auto text-blue-600 mb-2" />
          <h3 className="font-semibold text-blue-800">Story Time</h3>
          <p className="text-sm text-blue-600">Reading sessions</p>
        </Card>
        <Card className="text-center p-4 border-purple-200">
          <MapPin className="w-8 h-8 mx-auto text-purple-600 mb-2" />
          <h3 className="font-semibold text-purple-800">Field Trips</h3>
          <p className="text-sm text-purple-600">Educational outings</p>
        </Card>
        <Card className="text-center p-4 border-pink-200">
          <Calendar className="w-8 h-8 mx-auto text-pink-600 mb-2" />
          <h3 className="font-semibold text-pink-800">Birthday Parties</h3>
          <p className="text-sm text-pink-600">Celebration helpers</p>
        </Card>
      </div>

      {/* Upcoming Activities */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Upcoming Activities</h3>
        {activities.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No upcoming activities</h3>
              <p className="text-gray-600 mb-4">
                Be the first to organize a fun group activity for the community
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                Create First Activity
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                    <Badge className={getActivityTypeColor(activity.activity_type)}>
                      {getActivityTypeDisplay(activity.activity_type)}
                    </Badge>
                  </div>
                  <CardDescription>
                    Organized by {activity.profiles?.pseudonym}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activity.description && (
                    <p className="text-sm text-gray-700">{activity.description}</p>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{format(new Date(activity.scheduled_date), 'MMM d, h:mm a')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{activity.location_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>
                        {activity.participant_count}
                        {activity.max_children && `/${activity.max_children}`} kids
                      </span>
                    </div>
                    {(activity.cost_per_child ?? 0) > 0 && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span>${activity.cost_per_child} per child</span>
                      </div>
                    )}
                  </div>

                  {(activity.age_min || activity.age_max) && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        Ages {activity.age_min || 0}-{activity.age_max || '12+'}
                      </Badge>
                    </div>
                  )}

                  {activity.requires_permission_slip && (
                    <div className="flex items-center gap-2 text-orange-600">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">Permission slip required</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => joinActivity(activity.id)}
                      className="flex-1"
                      disabled={activity.max_children != null && activity.participant_count >= activity.max_children}
                    >
                      {activity.max_children && activity.participant_count >= activity.max_children
                        ? 'Full'
                        : 'Join Activity'
                      }
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <CreateActivityDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
        onActivityCreated={loadActivities}
      />
    </div>
  );
};
