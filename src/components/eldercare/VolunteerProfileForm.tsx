
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Users, Heart, Calendar, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VolunteerProfile {
  id?: string;
  full_name: string;
  phone_number: string;
  skills: string[];
  specializations: string[];
  languages_spoken: string[];
  availability_days: string[];
  availability_times: any;
  max_hours_per_week: number;
  transportation_available: boolean;
  background_check_date: string;
  references_verified: boolean;
}

export const VolunteerProfileForm: React.FC = () => {
  const [profile, setProfile] = useState<VolunteerProfile>({
    full_name: '',
    phone_number: '',
    skills: [],
    specializations: [],
    languages_spoken: [],
    availability_days: [],
    availability_times: { morning: false, afternoon: false, evening: false },
    max_hours_per_week: 5,
    transportation_available: false,
    background_check_date: '',
    references_verified: false
  });

  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const { toast } = useToast();

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const specializations = ['medical_companion', 'tech_support', 'transportation', 'errands', 'social_visits', 'language_help', 'home_maintenance'];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('volunteer_profiles')
        .select('*')
        .eq('volunteer_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const profileData = {
        ...profile,
        volunteer_id: user.id,
      };

      const { error } = await supabase
        .from('volunteer_profiles')
        .upsert(profileData, { onConflict: 'volunteer_id' });

      if (error) throw error;

      toast({
        title: "Profile saved",
        description: "Your volunteer profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving profile",
        description: "Failed to save your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = (field: keyof VolunteerProfile, value: string) => {
    if (value.trim()) {
      setProfile(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
    }
  };

  const removeItem = (field: keyof VolunteerProfile, index: number) => {
    setProfile(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="w-full shadow-lg border-2 border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-2xl font-bold text-green-800 flex items-center gap-2">
          <Heart className="w-8 h-8" />
          Volunteer Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-lg font-medium">Full Name</Label>
              <Input
                id="full_name"
                value={profile.full_name}
                onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                className="h-12 text-lg"
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone_number" className="text-lg font-medium">Phone Number</Label>
              <Input
                id="phone_number"
                value={profile.phone_number}
                onChange={(e) => setProfile(prev => ({ ...prev, phone_number: e.target.value }))}
                className="h-12 text-lg"
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max_hours_per_week" className="text-lg font-medium">Max Hours Per Week</Label>
              <Input
                id="max_hours_per_week"
                type="number"
                min="1"
                max="40"
                value={profile.max_hours_per_week}
                onChange={(e) => setProfile(prev => ({ ...prev, max_hours_per_week: parseInt(e.target.value) || 5 }))}
                className="h-12 text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="background_check_date" className="text-lg font-medium">Background Check Date</Label>
              <Input
                id="background_check_date"
                type="date"
                value={profile.background_check_date}
                onChange={(e) => setProfile(prev => ({ ...prev, background_check_date: e.target.value }))}
                className="h-12 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Skills & Specializations */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Skills & Specializations
          </h3>
          
          <div className="space-y-4">
            <Label className="text-lg font-medium">Specializations</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specializations.map(spec => (
                <div key={spec} className="flex items-center space-x-3">
                  <Checkbox
                    id={spec}
                    checked={profile.specializations.includes(spec)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setProfile(prev => ({ ...prev, specializations: [...prev.specializations, spec] }));
                      } else {
                        setProfile(prev => ({ ...prev, specializations: prev.specializations.filter(s => s !== spec) }));
                      }
                    }}
                    className="w-5 h-5"
                  />
                  <Label htmlFor={spec} className="text-lg capitalize">
                    {spec.replace('_', ' ')}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-medium">Additional Skills</Label>
            <div className="flex gap-2 mb-4">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="h-12 text-lg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addItem('skills', newSkill);
                    setNewSkill('');
                  }
                }}
              />
              <Button
                onClick={() => {
                  addItem('skills', newSkill);
                  setNewSkill('');
                }}
                size="lg"
                className="h-12"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-lg p-2">
                  {skill}
                  <X
                    className="w-4 h-4 ml-2 cursor-pointer"
                    onClick={() => removeItem('skills', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-medium">Languages Spoken</Label>
            <div className="flex gap-2 mb-4">
              <Input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add a language"
                className="h-12 text-lg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addItem('languages_spoken', newLanguage);
                    setNewLanguage('');
                  }
                }}
              />
              <Button
                onClick={() => {
                  addItem('languages_spoken', newLanguage);
                  setNewLanguage('');
                }}
                size="lg"
                className="h-12"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.languages_spoken.map((language, index) => (
                <Badge key={index} variant="secondary" className="text-lg p-2">
                  {language}
                  <X
                    className="w-4 h-4 ml-2 cursor-pointer"
                    onClick={() => removeItem('languages_spoken', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Availability
          </h3>
          
          <div className="space-y-4">
            <Label className="text-lg font-medium">Available Days</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {daysOfWeek.map(day => (
                <div key={day} className="flex items-center space-x-3">
                  <Checkbox
                    id={day}
                    checked={profile.availability_days.includes(day)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setProfile(prev => ({ ...prev, availability_days: [...prev.availability_days, day] }));
                      } else {
                        setProfile(prev => ({ ...prev, availability_days: prev.availability_days.filter(d => d !== day) }));
                      }
                    }}
                    className="w-5 h-5"
                  />
                  <Label htmlFor={day} className="text-lg capitalize">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-medium">Available Times</Label>
            <div className="grid grid-cols-3 gap-4">
              {['morning', 'afternoon', 'evening'].map(time => (
                <div key={time} className="flex items-center space-x-3">
                  <Checkbox
                    id={time}
                    checked={profile.availability_times[time]}
                    onCheckedChange={(checked) => {
                      setProfile(prev => ({
                        ...prev,
                        availability_times: { ...prev.availability_times, [time]: checked }
                      }));
                    }}
                    className="w-5 h-5"
                  />
                  <Label htmlFor={time} className="text-lg capitalize">
                    {time}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="transportation_available"
              checked={profile.transportation_available}
              onCheckedChange={(checked) => setProfile(prev => ({ ...prev, transportation_available: !!checked }))}
              className="w-5 h-5"
            />
            <Label htmlFor="transportation_available" className="text-lg">
              I can provide transportation
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="references_verified"
              checked={profile.references_verified}
              onCheckedChange={(checked) => setProfile(prev => ({ ...prev, references_verified: !!checked }))}
              className="w-5 h-5"
            />
            <Label htmlFor="references_verified" className="text-lg">
              References have been verified
            </Label>
          </div>
        </div>

        <Button
          onClick={saveProfile}
          disabled={loading}
          size="lg"
          className="w-full h-16 text-xl bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </CardContent>
    </Card>
  );
};
