
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, User, Heart, Calendar, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ElderProfile {
  id?: string;
  full_name: string;
  date_of_birth: string;
  address: string;
  phone_number: string;
  mobility_level: string;
  accessibility_needs: string[];
  interests: string[];
  hobbies: string[];
  dietary_restrictions: string[];
  dietary_preferences: string[];
  preferred_visit_types: string[];
  language_preferences: string[];
  emergency_contact_primary: any;
  emergency_contact_secondary: any;
  medical_notes: string;
  special_instructions: string;
}

export const ElderProfileForm: React.FC = () => {
  const [profile, setProfile] = useState<ElderProfile>({
    full_name: '',
    date_of_birth: '',
    address: '',
    phone_number: '',
    mobility_level: '',
    accessibility_needs: [],
    interests: [],
    hobbies: [],
    dietary_restrictions: [],
    dietary_preferences: [],
    preferred_visit_types: [],
    language_preferences: [],
    emergency_contact_primary: { name: '', phone: '', relationship: '' },
    emergency_contact_secondary: { name: '', phone: '', relationship: '' },
    medical_notes: '',
    special_instructions: ''
  });

  const [loading, setLoading] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const [newHobby, setNewHobby] = useState('');
  const { toast } = useToast();

  const visitTypes = ['social', 'errands', 'medical', 'tech_help', 'companionship'];
  const mobilityLevels = ['fully_mobile', 'limited_mobility', 'wheelchair_user', 'bedridden'];
  const accessibilityOptions = ['wheelchair_accessible', 'hearing_assistance', 'vision_assistance', 'mobility_aids', 'medication_reminders'];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('elder_profiles')
        .select('*')
        .eq('elder_id', user.id)
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
        elder_id: user.id,
      };

      const { error } = await supabase
        .from('elder_profiles')
        .upsert(profileData, { onConflict: 'elder_id' });

      if (error) throw error;

      toast({
        title: "Profile saved",
        description: "Your elder profile has been updated successfully.",
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

  const addItem = (field: keyof ElderProfile, value: string) => {
    if (value.trim()) {
      setProfile(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
    }
  };

  const removeItem = (field: keyof ElderProfile, index: number) => {
    setProfile(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="w-full shadow-lg border-2 border-blue-200">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-2xl font-bold text-blue-800 flex items-center gap-2">
          <User className="w-8 h-8" />
          Elder Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <User className="w-6 h-6" />
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
              <Label htmlFor="date_of_birth" className="text-lg font-medium">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={profile.date_of_birth}
                onChange={(e) => setProfile(prev => ({ ...prev, date_of_birth: e.target.value }))}
                className="h-12 text-lg"
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
              <Label htmlFor="mobility_level" className="text-lg font-medium">Mobility Level</Label>
              <Select value={profile.mobility_level} onValueChange={(value) => setProfile(prev => ({ ...prev, mobility_level: value }))}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select mobility level" />
                </SelectTrigger>
                <SelectContent>
                  {mobilityLevels.map(level => (
                    <SelectItem key={level} value={level} className="text-lg">
                      {level.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="text-lg font-medium">Address</Label>
            <Textarea
              id="address"
              value={profile.address}
              onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
              className="min-h-20 text-lg"
              placeholder="Enter your full address"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Preferences & Interests
          </h3>
          
          <div className="space-y-4">
            <Label className="text-lg font-medium">Preferred Visit Types</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {visitTypes.map(type => (
                <div key={type} className="flex items-center space-x-3">
                  <Checkbox
                    id={type}
                    checked={profile.preferred_visit_types.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setProfile(prev => ({ ...prev, preferred_visit_types: [...prev.preferred_visit_types, type] }));
                      } else {
                        setProfile(prev => ({ ...prev, preferred_visit_types: prev.preferred_visit_types.filter(t => t !== type) }));
                      }
                    }}
                    className="w-5 h-5"
                  />
                  <Label htmlFor={type} className="text-lg capitalize">
                    {type.replace('_', ' ')}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-medium">Interests</Label>
            <div className="flex gap-2 mb-4">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add an interest"
                className="h-12 text-lg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addItem('interests', newInterest);
                    setNewInterest('');
                  }
                }}
              />
              <Button
                onClick={() => {
                  addItem('interests', newInterest);
                  setNewInterest('');
                }}
                size="lg"
                className="h-12"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="text-lg p-2">
                  {interest}
                  <X
                    className="w-4 h-4 ml-2 cursor-pointer"
                    onClick={() => removeItem('interests', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-medium">Hobbies</Label>
            <div className="flex gap-2 mb-4">
              <Input
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder="Add a hobby"
                className="h-12 text-lg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addItem('hobbies', newHobby);
                    setNewHobby('');
                  }
                }}
              />
              <Button
                onClick={() => {
                  addItem('hobbies', newHobby);
                  setNewHobby('');
                }}
                size="lg"
                className="h-12"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.hobbies.map((hobby, index) => (
                <Badge key={index} variant="secondary" className="text-lg p-2">
                  {hobby}
                  <X
                    className="w-4 h-4 ml-2 cursor-pointer"
                    onClick={() => removeItem('hobbies', index)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Phone className="w-6 h-6" />
            Emergency Contacts
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Primary Contact</h4>
              <Input
                placeholder="Name"
                value={profile.emergency_contact_primary?.name || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  emergency_contact_primary: { ...prev.emergency_contact_primary, name: e.target.value }
                }))}
                className="h-12 text-lg"
              />
              <Input
                placeholder="Phone"
                value={profile.emergency_contact_primary?.phone || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  emergency_contact_primary: { ...prev.emergency_contact_primary, phone: e.target.value }
                }))}
                className="h-12 text-lg"
              />
              <Input
                placeholder="Relationship"
                value={profile.emergency_contact_primary?.relationship || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  emergency_contact_primary: { ...prev.emergency_contact_primary, relationship: e.target.value }
                }))}
                className="h-12 text-lg"
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Secondary Contact</h4>
              <Input
                placeholder="Name"
                value={profile.emergency_contact_secondary?.name || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  emergency_contact_secondary: { ...prev.emergency_contact_secondary, name: e.target.value }
                }))}
                className="h-12 text-lg"
              />
              <Input
                placeholder="Phone"
                value={profile.emergency_contact_secondary?.phone || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  emergency_contact_secondary: { ...prev.emergency_contact_secondary, phone: e.target.value }
                }))}
                className="h-12 text-lg"
              />
              <Input
                placeholder="Relationship"
                value={profile.emergency_contact_secondary?.relationship || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  emergency_contact_secondary: { ...prev.emergency_contact_secondary, relationship: e.target.value }
                }))}
                className="h-12 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Medical & Special Instructions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="medical_notes" className="text-lg font-medium">Medical Notes</Label>
            <Textarea
              id="medical_notes"
              value={profile.medical_notes}
              onChange={(e) => setProfile(prev => ({ ...prev, medical_notes: e.target.value }))}
              className="min-h-24 text-lg"
              placeholder="Any medical conditions, medications, or health considerations"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="special_instructions" className="text-lg font-medium">Special Instructions</Label>
            <Textarea
              id="special_instructions"
              value={profile.special_instructions}
              onChange={(e) => setProfile(prev => ({ ...prev, special_instructions: e.target.value }))}
              className="min-h-24 text-lg"
              placeholder="Any special instructions for volunteers or caregivers"
            />
          </div>
        </div>

        <Button
          onClick={saveProfile}
          disabled={loading}
          size="lg"
          className="w-full h-16 text-xl bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </CardContent>
    </Card>
  );
};
