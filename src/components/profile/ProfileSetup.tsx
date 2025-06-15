
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProfile } from '@/hooks/useProfile';
import { X, Plus } from 'lucide-react';

interface ProfileSetupProps {
  onProfileCreated?: () => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onProfileCreated }) => {
  const { createProfile, updateProfile, profile } = useProfile();
  const [pseudonym, setPseudonym] = useState(profile?.pseudonym || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [skills, setSkills] = useState<string[]>(profile?.skills || []);
  const [vulnerabilityFactors, setVulnerabilityFactors] = useState<string[]>(
    profile?.vulnerability_factors || []
  );
  const [newSkill, setNewSkill] = useState('');
  const [newVulnerabilityFactor, setNewVulnerabilityFactor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addVulnerabilityFactor = () => {
    if (newVulnerabilityFactor.trim() && !vulnerabilityFactors.includes(newVulnerabilityFactor.trim())) {
      setVulnerabilityFactors([...vulnerabilityFactors, newVulnerabilityFactor.trim()]);
      setNewVulnerabilityFactor('');
    }
  };

  const removeVulnerabilityFactor = (factorToRemove: string) => {
    setVulnerabilityFactors(vulnerabilityFactors.filter(factor => factor !== factorToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const profileData = {
      pseudonym: pseudonym.trim() || 'Anonymous',
      bio: bio.trim(),
      skills,
      vulnerability_factors: vulnerabilityFactors,
    };

    let result;
    if (profile) {
      result = await updateProfile(profileData);
    } else {
      result = await createProfile(profileData);
    }

    if (result && onProfileCreated) {
      onProfileCreated();
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {profile ? 'Update Your Profile' : 'Set Up Your Community Profile'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="pseudonym">Community Name/Pseudonym</Label>
            <Input
              id="pseudonym"
              value={pseudonym}
              onChange={(e) => setPseudonym(e.target.value)}
              placeholder="How you'd like to be known in the community"
              required
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell the community about yourself..."
              rows={3}
            />
          </div>

          <div>
            <Label>Skills & Abilities</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Vulnerability Factors (Optional)</Label>
            <p className="text-sm text-gray-600 mb-2">
              Help prioritize mutual aid for those who need it most
            </p>
            <div className="flex gap-2 mb-2">
              <Input
                value={newVulnerabilityFactor}
                onChange={(e) => setNewVulnerabilityFactor(e.target.value)}
                placeholder="e.g., single parent, low income, disabled, elderly..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVulnerabilityFactor())}
              />
              <Button type="button" onClick={addVulnerabilityFactor} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {vulnerabilityFactors.map((factor) => (
                <Badge key={factor} variant="outline" className="flex items-center gap-1">
                  {factor}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeVulnerabilityFactor(factor)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting 
              ? (profile ? 'Updating...' : 'Creating...') 
              : (profile ? 'Update Profile' : 'Create Profile')
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
