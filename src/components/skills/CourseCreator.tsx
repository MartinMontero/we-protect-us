
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const CourseCreator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    difficulty_level: 'beginner' as 'beginner' | 'intermediate' | 'advanced' | 'expert',
    delivery_mode: 'in_person' as 'in_person' | 'virtual' | 'hybrid',
    duration_weeks: 4,
    max_participants: 20,
    prerequisites: '',
    learning_outcomes: '',
    materials_needed: '',
  });

  const createCourseMutation = useMutation({
    mutationFn: async (data: typeof courseData) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('skill_courses')
        .insert({
          ...data,
          created_by: user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill_courses'] });
      toast({
        title: "Course created!",
        description: "Your course has been successfully created.",
      });
      // Reset form
      setCourseData({
        title: '',
        description: '',
        difficulty_level: 'beginner',
        delivery_mode: 'in_person',
        duration_weeks: 4,
        max_participants: 20,
        prerequisites: '',
        learning_outcomes: '',
        materials_needed: '',
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating course",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCourseMutation.mutate(courseData);
  };

  const handleInputChange = (field: keyof typeof courseData, value: any) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Course</CardTitle>
        <CardDescription>Design a course to share your skills with the community</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={courseData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Introduction to Permaculture"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={courseData.difficulty_level} onValueChange={(value) => handleInputChange('difficulty_level', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Course Description</Label>
            <Textarea
              id="description"
              value={courseData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what participants will learn..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="delivery">Delivery Mode</Label>
              <Select value={courseData.delivery_mode} onValueChange={(value) => handleInputChange('delivery_mode', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_person">In Person</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (weeks)</Label>
              <Input
                id="duration"
                type="number"
                value={courseData.duration_weeks}
                onChange={(e) => handleInputChange('duration_weeks', parseInt(e.target.value))}
                min="1"
                max="52"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants">Max Participants</Label>
              <Input
                id="participants"
                type="number"
                value={courseData.max_participants}
                onChange={(e) => handleInputChange('max_participants', parseInt(e.target.value))}
                min="1"
                max="100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prerequisites">Prerequisites</Label>
            <Textarea
              id="prerequisites"
              value={courseData.prerequisites}
              onChange={(e) => handleInputChange('prerequisites', e.target.value)}
              placeholder="What should participants know before taking this course?"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="outcomes">Learning Outcomes</Label>
            <Textarea
              id="outcomes"
              value={courseData.learning_outcomes}
              onChange={(e) => handleInputChange('learning_outcomes', e.target.value)}
              placeholder="What will participants be able to do after completing this course?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="materials">Materials Needed</Label>
            <Textarea
              id="materials"
              value={courseData.materials_needed}
              onChange={(e) => handleInputChange('materials_needed', e.target.value)}
              placeholder="List any materials, tools, or supplies participants need"
              rows={2}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={createCourseMutation.isPending}
          >
            {createCourseMutation.isPending ? 'Creating Course...' : 'Create Course'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseCreator;
