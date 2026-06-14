
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Users, Calendar, Music, Gamepad2, BookOpen, Heart, Camera, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type GroupActivity = Tables<'elder_group_activities'> & { participants_count?: number };

export const SocialEngagement: React.FC = () => {
  const [activities, setActivities] = useState<GroupActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("activities");
  const { toast } = useToast();

  const activityTypes = [
    { value: 'cards', label: 'Card Games', icon: '🃏', color: 'bg-red-100 text-red-800' },
    { value: 'crafts', label: 'Arts & Crafts', icon: '🎨', color: 'bg-orange-100 text-orange-800' },
    { value: 'exercise', label: 'Exercise', icon: '🏃', color: 'bg-green-100 text-green-800' },
    { value: 'music', label: 'Music', icon: '🎵', color: 'bg-purple-100 text-purple-800' },
    { value: 'discussion', label: 'Discussion', icon: '💬', color: 'bg-blue-100 text-blue-800' },
    { value: 'games', label: 'Games', icon: '🎮', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'educational', label: 'Educational', icon: '📚', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'intergenerational', label: 'Intergenerational', icon: '👨‍👩‍👧‍👦', color: 'bg-pink-100 text-pink-800' }
  ];

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('elder_group_activities')
        .select('*')
        .gte('scheduled_date', new Date().toISOString())
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinActivity = async (activityId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('elder_group_activity_participants')
        .insert({
          activity_id: activityId,
          participant_id: user.id,
          participant_type: 'elder' // This should be determined based on user profile
        });

      if (error) throw error;

      toast({
        title: "Joined activity!",
        description: "You've successfully joined this group activity.",
      });

      loadActivities();
    } catch (error) {
      toast({
        title: "Error joining activity",
        description: "Failed to join the activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getActivityTypeInfo = (type: string) => {
    return activityTypes.find(at => at.value === type) || activityTypes[0];
  };

  const startVideoCall = () => {
    toast({
      title: "Video call feature",
      description: "Video calling would be integrated with WebRTC here.",
    });
  };

  const startStoryRecording = () => {
    toast({
      title: "Story recording feature",
      description: "Story recording would capture audio/video for family archives.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Users className="w-10 h-10 text-blue-600" />
          Social Engagement Hub
        </h2>
        <p className="text-xl text-gray-600">
          Connect, participate, and share meaningful moments with your community
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-16 mb-8 bg-white shadow-lg rounded-xl">
          <TabsTrigger 
            value="activities" 
            className="text-lg font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <Users className="w-6 h-6 mr-2" />
            Group Activities
          </TabsTrigger>
          <TabsTrigger 
            value="virtual" 
            className="text-lg font-semibold data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <Video className="w-6 h-6 mr-2" />
            Virtual Visits
          </TabsTrigger>
          <TabsTrigger 
            value="stories" 
            className="text-lg font-semibold data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            <Camera className="w-6 h-6 mr-2" />
            Story Archive
          </TabsTrigger>
          <TabsTrigger 
            value="intergenerational" 
            className="text-lg font-semibold data-[state=active]:bg-pink-500 data-[state=active]:text-white"
          >
            <Heart className="w-6 h-6 mr-2" />
            Intergenerational
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {activities.map((activity) => {
              const typeInfo = getActivityTypeInfo(activity.activity_type ?? '');
              
              return (
                <Card key={activity.id} className="border-2 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-2xl">{typeInfo.icon}</span>
                        {activity.title}
                      </CardTitle>
                      <Badge className={`text-sm p-2 ${typeInfo.color}`}>
                        {typeInfo.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-4">
                    <p className="text-lg text-gray-700">{activity.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-lg">
                          {format(new Date(activity.scheduled_date), 'MMMM d, yyyy')}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        <span className="text-lg">
                          {format(new Date(activity.scheduled_date), 'h:mm a')} ({activity.duration_minutes} minutes)
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-lg">
                          {activity.participants_count || 0} / {activity.max_participants} participants
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => joinActivity(activity.id)}
                      size="lg"
                      className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Join Activity
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {activities.length === 0 && !loading && (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No upcoming activities</h3>
                <p className="text-xl text-gray-500">Check back soon for new group activities!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="virtual" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-2xl font-bold text-green-800 flex items-center gap-2">
                  <Video className="w-8 h-8" />
                  Video Calls
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Connect face-to-face with volunteers, family, and friends through secure video calls.
                </p>
                <Button
                  onClick={startVideoCall}
                  size="lg"
                  className="w-full h-14 text-xl bg-green-600 hover:bg-green-700"
                >
                  <Video className="w-6 h-6 mr-2" />
                  Start Video Call
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                  <Music className="w-8 h-8" />
                  Virtual Music
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Join virtual music sessions, sing-alongs, and listen to your favorite tunes together.
                </p>
                <Button
                  size="lg"
                  className="w-full h-14 text-xl bg-blue-600 hover:bg-blue-700"
                >
                  <Music className="w-6 h-6 mr-2" />
                  Join Music Session
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-2xl font-bold text-purple-800 flex items-center gap-2">
                  <Gamepad2 className="w-8 h-8" />
                  Virtual Games
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Play card games, trivia, and puzzles online with other community members.
                </p>
                <Button
                  size="lg"
                  className="w-full h-14 text-xl bg-purple-600 hover:bg-purple-700"
                >
                  <Gamepad2 className="w-6 h-6 mr-2" />
                  Play Games
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-2 border-orange-200 shadow-lg">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-2xl font-bold text-orange-800 flex items-center gap-2">
                  <Camera className="w-8 h-8" />
                  Record Your Story
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg text-gray-700 mb-6">
                  Share your life experiences, memories, and wisdom through audio or video recordings that can be treasured by your family for generations.
                </p>
                <div className="space-y-4">
                  <Button
                    onClick={startStoryRecording}
                    size="lg"
                    className="w-full h-14 text-xl bg-orange-600 hover:bg-orange-700"
                  >
                    <Camera className="w-6 h-6 mr-2" />
                    Start Recording
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-14 text-xl border-2"
                  >
                    <BookOpen className="w-6 h-6 mr-2" />
                    View My Stories
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-200 shadow-lg">
              <CardHeader className="bg-teal-50">
                <CardTitle className="text-2xl font-bold text-teal-800 flex items-center gap-2">
                  <BookOpen className="w-8 h-8" />
                  Family Archive
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg text-gray-700 mb-6">
                  Browse stories and memories shared by other community members. Listen to fascinating life experiences and historical perspectives.
                </p>
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full h-14 text-xl bg-teal-600 hover:bg-teal-700"
                  >
                    <BookOpen className="w-6 h-6 mr-2" />
                    Browse Stories
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-14 text-xl border-2"
                  >
                    <Heart className="w-6 h-6 mr-2" />
                    Featured Stories
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="intergenerational" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card className="border-2 border-pink-200 shadow-lg">
              <CardHeader className="bg-pink-50">
                <CardTitle className="text-xl font-bold text-pink-800 flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  Grandparent Program
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg text-gray-700 mb-4">
                  Be matched with local families as an honorary grandparent. Share stories, wisdom, and create meaningful connections.
                </p>
                <Button
                  size="lg"
                  className="w-full h-12 text-lg bg-pink-600 hover:bg-pink-700"
                >
                  Join Program
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-200 shadow-lg">
              <CardHeader className="bg-indigo-50">
                <CardTitle className="text-xl font-bold text-indigo-800 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  Story Time
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg text-gray-700 mb-4">
                  Read stories to children virtually or in person. Share the joy of reading and help nurture young minds.
                </p>
                <Button
                  size="lg"
                  className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700"
                >
                  Start Reading
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200 shadow-lg">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="text-xl font-bold text-yellow-800 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Skill Sharing
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg text-gray-700 mb-4">
                  Teach your skills and crafts to younger generations. From cooking to woodworking, share your expertise.
                </p>
                <Button
                  size="lg"
                  className="w-full h-12 text-lg bg-yellow-600 hover:bg-yellow-700"
                >
                  Teach Skills
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
