
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, BookOpen, Users, Clock, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CreateCourseModal } from './CreateCourseModal';

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  learning_format: string;
  max_participants: number;
  duration_weeks: number;
  price: number;
  location_type: string;
  status: string;
  featured_image_url: string;
  created_at: string;
  creator_id: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  };
  course_enrollments?: Array<{ id: string }>;
}

export const CourseCreator: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'my-courses' | 'enrolled'>('all');

  useEffect(() => {
    fetchCourses();
  }, [filter]);

  const fetchCourses = async () => {
    try {
      let query = supabase
        .from('courses')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          ),
          course_enrollments (
            id
          )
        `);

      if (filter === 'my-courses' && user) {
        query = query.eq('creator_id', user.id);
      } else if (filter === 'enrolled' && user) {
        // This would need a more complex query to get enrolled courses
        query = query.eq('status', 'published');
      } else {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'one_on_one': return '👥';
      case 'small_group': return '👨‍👩‍👧‍👦';
      case 'large_class': return '🏛️';
      case 'self_paced': return '⏰';
      case 'apprenticeship': return '🎓';
      default: return '📚';
    }
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to enroll in courses",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('course_enrollments')
        .insert({
          course_id: courseId,
          student_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've enrolled in the course"
      });

      fetchCourses();
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast({
        title: "Error",
        description: "Failed to enroll in course",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading courses...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            All Courses
          </Button>
          <Button
            variant={filter === 'my-courses' ? 'default' : 'outline'}
            onClick={() => setFilter('my-courses')}
            size="sm"
          >
            My Courses
          </Button>
          <Button
            variant={filter === 'enrolled' ? 'default' : 'outline'}
            onClick={() => setFilter('enrolled')}
            size="sm"
          >
            Enrolled
          </Button>
        </div>

        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Course
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            {course.featured_image_url && (
              <div className="h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={course.featured_image_url} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <div className="text-right">
                  {course.price > 0 ? (
                    <p className="font-semibold text-green-600">${course.price}</p>
                  ) : (
                    <Badge variant="secondary">Free</Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>

              <div className="flex items-center justify-between">
                <Badge className={getDifficultyColor(course.difficulty_level)}>
                  {course.difficulty_level}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span>{getFormatIcon(course.learning_format)}</span>
                  {course.learning_format.replace('_', ' ')}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration_weeks} weeks
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.course_enrollments?.length || 0}/{course.max_participants}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.location_type}
                </div>
              </div>

              {course.profiles && (
                <div className="flex items-center gap-2 pt-2 border-t">
                  <img 
                    src={course.profiles.avatar_url || '/placeholder-avatar.png'} 
                    alt={course.profiles.full_name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">{course.profiles.full_name}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {course.creator_id === user?.id ? (
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit Course
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => enrollInCourse(course.id)}
                  >
                    Enroll
                  </Button>
                )}
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <Card className="p-8 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Courses Found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'my-courses' 
              ? "You haven't created any courses yet"
              : "No courses available yet"
            }
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            Create Your First Course
          </Button>
        </Card>
      )}

      <CreateCourseModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onCourseCreated={fetchCourses}
      />
    </div>
  );
};
