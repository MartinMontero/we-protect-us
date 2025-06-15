
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, BookOpen, Trophy, Users, Star, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Enrollment {
  id: string;
  progress_percentage: number;
  enrolled_at: string;
  completed_at: string;
  courses: {
    title: string;
    description: string;
    difficulty_level: string;
    duration_weeks: number;
  };
}

interface Session {
  id: string;
  title: string;
  status: string;
  scheduled_start: string;
  scheduled_end: string;
  learning_format: string;
  location_type: string;
}

interface Badge {
  id: string;
  earned_at: string;
  skill_badges: {
    badge_name: string;
    description: string;
  };
}

const LearningDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // For now, return empty arrays since these tables may not exist
      setEnrollments([]);
      setSessions([]);
      setBadges([]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading dashboard...</div>;
  }

  const completedCourses = enrollments.filter(e => e.completed_at);
  const inProgressCourses = enrollments.filter(e => !e.completed_at);
  const upcomingSessions = sessions.filter(s => s.status === 'scheduled');
  const totalHoursLearned = completedCourses.reduce((acc, course) => acc + (course.courses?.duration_weeks || 0) * 2, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Courses</p>
                <p className="text-2xl font-bold">{enrollments.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{completedCourses.length}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hours Learned</p>
                <p className="text-2xl font-bold">{totalHoursLearned}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Badges Earned</p>
                <p className="text-2xl font-bold">{badges.length}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="badges">Achievements</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Courses Yet</h3>
            <p className="text-gray-600 mb-4">
              Explore our course catalog to start your learning journey
            </p>
            <Button>Browse Courses</Button>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Sessions Scheduled</h3>
            <p className="text-gray-600">
              Schedule learning sessions with community members
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <Card className="p-8 text-center">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Badges Yet</h3>
            <p className="text-gray-600">
              Complete courses and participate in the community to earn badges
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Learning Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Course Completion Rate</h4>
                  <div className="flex items-center gap-4">
                    <Progress 
                      value={enrollments.length > 0 ? (completedCourses.length / enrollments.length) * 100 : 0} 
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600">
                      {enrollments.length > 0 ? Math.round((completedCourses.length / enrollments.length) * 100) : 0}%
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Learning Streak</h4>
                  <p className="text-2xl font-bold text-green-600">0 days</p>
                  <p className="text-sm text-gray-600">Keep learning to build your streak!</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Skills Development</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Programming</span>
                      <span className="text-sm">0 courses</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Design</span>
                      <span className="text-sm">0 courses</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningDashboard;
