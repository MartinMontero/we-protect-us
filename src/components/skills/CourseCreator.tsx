import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Play, Clock, Users, Star, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CreateCourseModal } from './CreateCourseModal';

interface Course {
  id: string;
  title: string;
  description: string;
  duration_weeks: number;
  difficulty_level: string;
  status: string;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  } | null;
}

interface CourseCreatorProps {
  searchQuery: string;
}

export const CourseCreator: React.FC<CourseCreatorProps> = ({ searchQuery }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'my-courses' | 'enrolled'>('all');

  useEffect(() => {
    fetchCourses();
  }, [filter, searchQuery]);

  const fetchCourses = async () => {
    try {
      let query = supabase
        .from('courses')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `);

      if (filter === 'my-courses' && user) {
        query = query.eq('creator_id', user.id);
      } else if (filter === 'enrolled' && user) {
        query = query.eq('status', 'published');
      } else {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map the data to match our interface
      const mappedData: Course[] = (data || []).map(course => {
        const profiles = course.profiles;
        const profileData = profiles && 
          profiles !== null &&
          typeof profiles === 'object' && 
          'full_name' in profiles
          ? profiles as { full_name: string; avatar_url: string }
          : null;
          
        return {
          id: course.id,
          title: course.title || '',
          description: course.description || '',
          duration_weeks: course.duration_weeks || 0,
          difficulty_level: course.difficulty_level || '',
          status: course.status || '',
          created_at: course.created_at || '',
          profiles: profileData
        };
      });

      let filteredData = mappedData;

      if (searchQuery) {
        filteredData = filteredData.filter(
          course => 
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setCourses(filteredData);
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
      default: return 'bg-gray-100 text-gray-800';
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
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <Badge className={getDifficultyColor(course.difficulty_level)}>
                  {course.difficulty_level}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration_weeks}w
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Enrolled
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  4.5
                </div>
              </div>

              {course.profiles && (
                <div className="flex items-center gap-2 pt-2 border-t">
                  <img 
                    src={course.profiles.avatar_url || '/placeholder-avatar.png'} 
                    alt={course.profiles.full_name || 'User'}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">{course.profiles.full_name || 'Unknown'}</span>
                </div>
              )}

              <Button className="w-full gap-2">
                <Play className="w-4 h-4" />
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <Card className="p-8 text-center">
          <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Courses Found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? `No courses match "${searchQuery}"`
              : filter === 'my-courses'
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
