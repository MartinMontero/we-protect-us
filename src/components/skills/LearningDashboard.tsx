
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

export const LearningDashboard: React.FC = () => {
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
      // Fetch course enrollments
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('course_enrollments')
        .select(`
          *,
          courses (
            title,
            description,
            difficulty_level,
            duration_weeks
          )
        `)
        .eq('student_id', user?.id);

      if (enrollmentError) throw enrollmentError;

      // Fetch learning sessions
      const { data: sessionData, error: sessionError } = await supabase
        .from('session_participants')
        .select(`
          learning_sessions (
            id,
            title,
            status,
            scheduled_start,
            scheduled_end,
            learning_format,
            location_type
          )
        `)
        .eq('participant_id', user?.id);

      if (sessionError) throw sessionError;

      // Fetch earned badges
      const { data: badgeData, error: badgeError } = await supabase
        .from('user_badges')
        .select(`
          *,
          skill_badges (
            badge_name,
            description
          )
        `)
        .eq('user_id', user?.id);

      if (badgeError) throw badgeError;

      setEnrollments(enrollmentData || []);
      setSessions(sessionData?.map(s => s.learning_sessions).filter(Boolean) || []);
      setBadges(badgeData || []);
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
          {inProgressCourses.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">In Progress</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {inProgressCourses.map((enrollment) => (
                  <Card key={enrollment.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{enrollment.courses?.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {enrollment.courses?.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{enrollment.progress_percentage}%</span>
                        </div>
                        <Progress value={enrollment.progress_percentage} />
                      </div>

                      <div className="flex justify-between items-center">
                        <Badge variant="outline">
                          {enrollment.courses?.difficulty_level}
                        </Badge>
                        <Button size="sm">Continue Learning</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {completedCourses.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Completed</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {completedCourses.map((enrollment) => (
                  <Card key={enrollment.id} className="opacity-80">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{enrollment.courses?.title}</CardTitle>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Completed on {new Date(enrollment.completed_at).toLocaleDateString()}
                      </p>
                      <Button size="sm" variant="outline" className="mt-4">
                        View Certificate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {enrollments.length === 0 && (
            <Card className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Courses Yet</h3>
              <p className="text-gray-600 mb-4">
                Explore our course catalog to start your learning journey
              </p>
              <Button>Browse Courses</Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          {upcomingSessions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{session.title}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(session.scheduled_start).toLocaleString()} - 
                            {new Date(session.scheduled_end).toLocaleTimeString()}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{session.learning_format}</Badge>
                            <Badge variant="outline">{session.location_type}</Badge>
                          </div>
                        </div>
                        <Button size="sm">Join Session</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {sessions.length === 0 && (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Sessions Scheduled</h3>
              <p className="text-gray-600">
                Schedule learning sessions with community members
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          {badges.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <Card key={badge.id}>
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h4 className="font-semibold">{badge.skill_badges?.badge_name}</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      {badge.skill_badges?.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Earned {new Date(badge.earned_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Badges Yet</h3>
              <p className="text-gray-600">
                Complete courses and participate in the community to earn badges
              </p>
            </Card>
          )}
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
                      <span className="text-sm">3 courses</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Design</span>
                      <span className="text-sm">1 course</span>
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
