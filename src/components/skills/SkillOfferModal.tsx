
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Skill {
  id: string;
  skill_name: string;
  category: string;
  description: string;
}

interface SkillOfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkillAdded: () => void;
}

export const SkillOfferModal: React.FC<SkillOfferModalProps> = ({
  open,
  onOpenChange,
  onSkillAdded
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    skill_id: '',
    skill_level: '',
    is_teaching: false,
    is_learning: false,
    teaching_styles: [] as string[],
    preferred_location: [] as string[],
    hourly_rate: '',
    bio: '',
    years_experience: ''
  });

  useEffect(() => {
    if (open) {
      fetchSkills();
    }
  }, [open]);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills_catalog')
        .select('*')
        .order('skill_name');

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_skills')
        .insert({
          user_id: user.id,
          skill_id: formData.skill_id,
          skill_level: formData.skill_level as any,
          is_teaching: formData.is_teaching,
          is_learning: formData.is_learning,
          teaching_styles: formData.teaching_styles,
          preferred_location: formData.preferred_location,
          hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
          bio: formData.bio,
          years_experience: formData.years_experience ? parseInt(formData.years_experience) : 0
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your skill has been added to the marketplace"
      });

      onSkillAdded();
      onOpenChange(false);
      setFormData({
        skill_id: '',
        skill_level: '',
        is_teaching: false,
        is_learning: false,
        teaching_styles: [],
        preferred_location: [],
        hourly_rate: '',
        bio: '',
        years_experience: ''
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const teachingStyles = ['hands_on', 'lecture', 'discussion', 'project_based', 'mentoring'];
  const locationTypes = ['in_person', 'virtual', 'hybrid'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Your Skill</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="skill">Skill</Label>
              <Select 
                value={formData.skill_id} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, skill_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map(skill => (
                    <SelectItem key={skill.id} value={skill.id}>
                      {skill.skill_name} ({skill.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="level">Your Level</Label>
              <Select 
                value={formData.skill_level} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, skill_level: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  value={formData.years_experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, years_experience: e.target.value }))}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="rate">Hourly Rate ($)</Label>
                <Input
                  id="rate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.hourly_rate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: e.target.value }))}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div>
              <Label>What would you like to do?</Label>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="teaching"
                    checked={formData.is_teaching}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, is_teaching: checked as boolean }))
                    }
                  />
                  <Label htmlFor="teaching">Teach this skill</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="learning"
                    checked={formData.is_learning}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, is_learning: checked as boolean }))
                    }
                  />
                  <Label htmlFor="learning">Learn this skill</Label>
                </div>
              </div>
            </div>

            {formData.is_teaching && (
              <>
                <div>
                  <Label>Teaching Styles</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {teachingStyles.map(style => (
                      <div key={style} className="flex items-center space-x-2">
                        <Checkbox
                          id={style}
                          checked={formData.teaching_styles.includes(style)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData(prev => ({
                                ...prev,
                                teaching_styles: [...prev.teaching_styles, style]
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                teaching_styles: prev.teaching_styles.filter(s => s !== style)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={style}>{style.replace('_', ' ')}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Preferred Location</Label>
                  <div className="flex gap-4 mt-2">
                    {locationTypes.map(location => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={location}
                          checked={formData.preferred_location.includes(location)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData(prev => ({
                                ...prev,
                                preferred_location: [...prev.preferred_location, location]
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                preferred_location: prev.preferred_location.filter(l => l !== location)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={location}>{location.replace('_', ' ')}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="bio">Bio / Description</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell others about your experience, teaching style, or what you're looking to learn..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !formData.skill_id || !formData.skill_level || (!formData.is_teaching && !formData.is_learning)}
            >
              {loading ? 'Adding...' : 'Add Skill'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
