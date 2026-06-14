
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Clock, MapPin, Wrench } from 'lucide-react';
import { format } from 'date-fns';

export const WorkParties: React.FC = () => {
  const { data: workParties, isLoading } = useQuery({
    queryKey: ['work-parties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('work_parties')
        .select(`
          *,
          organizer:profiles!work_parties_organizer_id_fkey(pseudonym),
          participants:work_party_participants(
            id,
            participant:profiles(pseudonym)
          )
        `)
        .order('scheduled_date', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const getStatusBadgeVariant = (status: string | null) => {
    switch (status) {
      case 'planned': return 'default';
      case 'active': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const upcomingParties = workParties?.filter(party => 
    new Date(party.scheduled_date) > new Date() && party.status === 'planned'
  ) || [];

  const pastParties = workParties?.filter(party => 
    new Date(party.scheduled_date) <= new Date() || party.status === 'completed'
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Work Parties</h2>
          <p className="text-gray-600">Community garden maintenance and improvement projects</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Work Party
        </Button>
      </div>

      {/* Upcoming Work Parties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Work Parties ({upcomingParties.length})
          </CardTitle>
          <CardDescription>
            Join your fellow gardeners in maintaining and improving our community space
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingParties.length > 0 ? (
            <div className="space-y-4">
              {upcomingParties.map((party) => (
                <Card key={party.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-green-800">{party.title}</h3>
                        <p className="text-green-600">{party.description}</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(party.status)}>
                        {party.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(party.scheduled_date), 'EEE, MMM d, yyyy')}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          {format(new Date(party.scheduled_date), 'h:mm a')} 
                          ({party.duration_hours}h)
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>
                          {party.participants?.length || 0}
                          {party.max_participants && ` / ${party.max_participants}`} participants
                        </span>
                      </div>
                    </div>

                    {party.tools_needed && party.tools_needed.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Wrench className="w-4 h-4" />
                          Tools Needed
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {party.tools_needed.map((tool, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {party.tasks && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Tasks</h4>
                        <div className="bg-white p-3 rounded border">
                          <p className="text-sm text-gray-600">
                            Task list will be shared closer to the event date
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span>Organized by {party.organizer?.pseudonym}</span>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700">
                        Join Work Party
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No upcoming work parties scheduled</p>
              <p className="text-sm">Check back later or organize your own!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Work Parties */}
      {pastParties.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Work Parties</CardTitle>
            <CardDescription>
              Completed community projects and their impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pastParties.slice(0, 5).map((party) => (
                <div key={party.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{party.title}</p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(party.scheduled_date), 'MMM d, yyyy')} • 
                      {party.participants?.length || 0} participants
                    </p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(party.status)}>
                    {party.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
