
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface CourseData {
  title: string;
  description: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  learning_format: 'online' | 'in_person' | 'hybrid';
  location_type: 'remote' | 'local' | 'regional';
  duration_weeks: number;
  max_participants: number;
  price: number;
}

export const CourseCreator: React.FC = () => {
  const { user } = useAuth();
  const [courseData, setCourseData] = useState<CourseData>({
    title: '',
    description: '',
    difficulty_level: 'beginner',
    learning_format: 'online',
    location_type: 'remote',
    duration_weeks: 4,
    max_participants: 10,
    price: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('courses')
        .insert([{
          ...courseData,
          creator_id: user.id,
          status: 'draft',
        }]);

      if (error) throw error;

      // Reset form
      setCourseData({
        title: '',
        description: '',
        difficulty_level: 'beginner',
        learning_format: 'online',
        location_type: 'remote',
        duration_weeks: 4,
        max_participants: 10,
        price: 0,
      });

      console.log('Course created successfully');
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CourseData, value: any) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Course Title</label>
            <Input
              value={courseData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter course title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={courseData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your course"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty Level</label>
              <select
                value={courseData.difficulty_level}
                onChange={(e) => handleInputChange('difficulty_level', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Learning Format</label>
              <select
                value={courseData.learning_format}
                onChange={(e) => handleInputChange('learning_format', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="online">Online</option>
                <option value="in_person">In Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Duration (weeks)</label>
              <Input
                type="number"
                value={courseData.duration_weeks}
                onChange={(e) => handleInputChange('duration_weeks', parseInt(e.target.value))}
                min="1"
                max="52"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Max Participants</label>
              <Input
                type="number"
                value={courseData.max_participants}
                onChange={(e) => handleInputChange('max_participants', parseInt(e.target.value))}
                min="1"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <Input
                type="number"
                value={courseData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Creating...' : 'Create Course'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
