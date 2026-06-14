
import React, { useState, useEffect } from 'react';
import type { Tables } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Users, Star, MapPin, Phone, Award, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MatchResult {
  volunteer: Tables<'volunteer_profiles'>;
  elder: Tables<'elder_profiles'>;
  match_score: number;
  common_interests: string[];
  compatible_skills: string[];
  availability_match: boolean;
}

export const SupportMatching: React.FC = () => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'elder' | 'volunteer' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    determineUserType();
  }, []);

  const determineUserType = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Check if user has elder profile
      const { data: elderProfile } = await supabase
        .from('elder_profiles')
        .select('id')
        .eq('elder_id', user.id)
        .single();

      // Check if user has volunteer profile
      const { data: volunteerProfile } = await supabase
        .from('volunteer_profiles')
        .select('id')
        .eq('volunteer_id', user.id)
        .single();

      if (elderProfile) {
        setUserType('elder');
        findVolunteerMatches();
      } else if (volunteerProfile) {
        setUserType('volunteer');
        findElderMatches();
      }
    } catch (error) {
      console.error('Error determining user type:', error);
    }
  };

  const findVolunteerMatches = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get elder profile
      const { data: elderProfile } = await supabase
        .from('elder_profiles')
        .select('*')
        .eq('elder_id', user.id)
        .single();

      if (!elderProfile) return;

      // Get all volunteers
      const { data: volunteers } = await supabase
        .from('volunteer_profiles')
        .select('*');

      if (!volunteers) return;

      // Calculate matches
      const matchResults: MatchResult[] = volunteers.map(volunteer => {
        const commonInterests = elderProfile.interests?.filter(interest =>
          volunteer.skills?.includes(interest) || 
          volunteer.specializations?.some((spec: string) => spec.includes(interest.toLowerCase()))
        ) || [];

        const compatibleSkills = volunteer.specializations?.filter((spec: string) =>
          elderProfile.preferred_visit_types?.includes(spec.replace('_', ' '))
        ) || [];

        const matchScore = calculateMatchScore(elderProfile, volunteer, commonInterests, compatibleSkills);

        return {
          volunteer,
          elder: elderProfile,
          match_score: matchScore,
          common_interests: commonInterests,
          compatible_skills: compatibleSkills,
          availability_match: true // Simplified for now
        };
      }).sort((a, b) => b.match_score - a.match_score);

      setMatches(matchResults);
    } catch (error) {
      console.error('Error finding matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const findElderMatches = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get volunteer profile
      const { data: volunteerProfile } = await supabase
        .from('volunteer_profiles')
        .select('*')
        .eq('volunteer_id', user.id)
        .single();

      if (!volunteerProfile) return;

      // Get all elders
      const { data: elders } = await supabase
        .from('elder_profiles')
        .select('*');

      if (!elders) return;

      // Calculate matches
      const matchResults: MatchResult[] = elders.map(elder => {
        const commonInterests = elder.interests?.filter(interest =>
          volunteerProfile.skills?.includes(interest) || 
          volunteerProfile.specializations?.some((spec: string) => spec.includes(interest.toLowerCase()))
        ) || [];

        const compatibleSkills = volunteerProfile.specializations?.filter((spec: string) =>
          elder.preferred_visit_types?.includes(spec.replace('_', ' '))
        ) || [];

        const matchScore = calculateMatchScore(elder, volunteerProfile, commonInterests, compatibleSkills);

        return {
          volunteer: volunteerProfile,
          elder,
          match_score: matchScore,
          common_interests: commonInterests,
          compatible_skills: compatibleSkills,
          availability_match: true // Simplified for now
        };
      }).sort((a, b) => b.match_score - a.match_score);

      setMatches(matchResults);
    } catch (error) {
      console.error('Error finding matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMatchScore = (elder: Tables<'elder_profiles'>, volunteer: Tables<'volunteer_profiles'>, commonInterests: string[], compatibleSkills: string[]) => {
    let score = 0;
    
    // Interest compatibility (30%)
    score += (commonInterests.length * 10);
    
    // Skill compatibility (40%)
    score += (compatibleSkills.length * 15);
    
    // Language compatibility (15%)
    if (elder.language_preferences?.some((lang: string) => volunteer.languages_spoken?.includes(lang))) {
      score += 15;
    }
    
    // Availability bonus (15%)
    if ((volunteer.max_hours_per_week ?? 0) >= 3) {
      score += 15;
    }
    
    return Math.min(score, 100);
  };

  const createMatch = async (matchResult: MatchResult) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('support_matches')
        .insert({
          elder_id: matchResult.elder.id,
          volunteer_id: matchResult.volunteer.id,
          match_type: 'regular_visitor',
          match_score: matchResult.match_score,
          status: 'pending',
          notes: `Common interests: ${matchResult.common_interests.join(', ')}`
        });

      if (error) throw error;

      toast({
        title: "Match request sent",
        description: "The other party will be notified of your interest.",
      });
    } catch (error) {
      toast({
        title: "Error creating match",
        description: "Failed to send match request. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Heart className="w-10 h-10 text-red-500" />
          {userType === 'elder' ? 'Find Volunteers' : 'Find Elders to Support'}
        </h2>
        <p className="text-xl text-gray-600">
          {userType === 'elder' 
            ? 'Discover caring volunteers who match your interests and needs'
            : 'Connect with elders who could benefit from your skills and care'
          }
        </p>
      </div>

      {matches.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No matches found</h3>
            <p className="text-lg text-gray-500">
              {userType === 'elder' 
                ? 'Complete your profile to find compatible volunteers'
                : 'Complete your profile to find elders who need your help'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {matches.map((match, index) => {
            const profile = userType === 'elder' ? match.volunteer : match.elder;
            const isVolunteer = userType === 'elder';
            
            return (
              <Card key={index} className="border-2 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      {profile.full_name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-500" />
                      <span className="text-xl font-bold text-gray-700">
                        {match.match_score}% Match
                      </span>
                    </div>
                  </div>
                  <Progress value={match.match_score} className="h-3 mt-2" />
                </CardHeader>
                
                <CardContent className="p-6 space-y-6">
                  {isVolunteer && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-lg">Specializations:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(profile as Tables<'volunteer_profiles'>).specializations?.map((spec: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-sm p-2">
                            {spec.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        <span className="text-lg">
                          Available {(profile as Tables<'volunteer_profiles'>).max_hours_per_week} hours/week
                        </span>
                      </div>
                      
                      {(profile as Tables<'volunteer_profiles'>).transportation_available && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-purple-600" />
                          <span className="text-lg">Can provide transportation</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!isVolunteer && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-lg">Interests:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(profile as Tables<'elder_profiles'>).interests?.map((interest: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-sm p-2">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-lg">Preferred visits:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(profile as Tables<'elder_profiles'>).preferred_visit_types?.map((type: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-sm p-2">
                            {type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {match.common_interests.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-semibold text-lg text-green-700">Common Interests:</span>
                      <div className="flex flex-wrap gap-2">
                        {match.common_interests.map((interest, i) => (
                          <Badge key={i} variant="default" className="bg-green-100 text-green-800 text-sm p-2">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {match.compatible_skills.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-semibold text-lg text-blue-700">Compatible Skills:</span>
                      <div className="flex flex-wrap gap-2">
                        {match.compatible_skills.map((skill, i) => (
                          <Badge key={i} variant="default" className="bg-blue-100 text-blue-800 text-sm p-2">
                            {skill.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={() => createMatch(match)}
                      size="lg"
                      className="flex-1 h-12 text-lg bg-blue-600 hover:bg-blue-700"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Connect
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 text-lg border-2"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
