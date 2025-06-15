import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Award, Users, Heart, Shield, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CaregiverProfile {
  id: string;
  pseudonym: string;
  verification_status: string;
  years_experience: number;
  care_philosophy: string;
  member_skill_badges: { badge_type: string }[];
  reviews: { rating: number; review_text: string; tags: string[] }[];
}

export const TrustBuilding: React.FC = () => {
  const [caregivers, setCaregivers] = useState<CaregiverProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCaregivers();
  }, []);

  const loadCaregivers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          pseudonym,
          verification_status,
          years_experience,
          care_philosophy,
          member_skill_badges(badge_type),
          caregiver_reviews:caregiver_reviews(rating, review_text, tags)
        `)
        .eq('verification_status', 'approved')
        .limit(6);

      if (error) throw error;
      
      // Transform data to match interface
      const transformedData: CaregiverProfile[] = (data || []).map(item => ({
        ...item,
        reviews: item.caregiver_reviews || []
      }));
      
      setCaregivers(transformedData);
    } catch (error) {
      console.error('Error loading caregivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAverageRating = (reviews: any[]) => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  };

  const getBadgeColor = (badgeType: string) => {
    const colors = {
      cpr_certified: 'bg-red-100 text-red-800',
      first_aid: 'bg-orange-100 text-orange-800',
      special_needs: 'bg-purple-100 text-purple-800',
      infant_care: 'bg-pink-100 text-pink-800',
      toddler_specialist: 'bg-blue-100 text-blue-800',
      homework_help: 'bg-green-100 text-green-800',
      music_activities: 'bg-indigo-100 text-indigo-800',
      outdoor_activities: 'bg-yellow-100 text-yellow-800',
    };
    return colors[badgeType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getBadgeDisplayName = (badgeType: string) => {
    const names = {
      cpr_certified: 'CPR Certified',
      first_aid: 'First Aid',
      special_needs: 'Special Needs',
      infant_care: 'Infant Care',
      toddler_specialist: 'Toddler Specialist',
      homework_help: 'Homework Help',
      music_activities: 'Music Activities',
      outdoor_activities: 'Outdoor Activities',
    };
    return names[badgeType as keyof typeof names] || badgeType;
  };

  if (loading) {
    return <div className="text-center py-8">Loading trusted caregivers...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Trust Overview */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Heart className="w-5 h-5" />
            Building Trust in Our Community
          </CardTitle>
          <CardDescription className="text-purple-700">
            Every caregiver is verified, reviewed, and committed to safe, nurturing childcare
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-purple-200 rounded-full flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-purple-700" />
              </div>
              <h4 className="font-semibold text-purple-800">Verified Members</h4>
              <p className="text-sm text-purple-600">Background checks & references</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-purple-200 rounded-full flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-purple-700" />
              </div>
              <h4 className="font-semibold text-purple-800">Reviewed Profiles</h4>
              <p className="text-sm text-purple-600">Parent reviews & ratings</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-purple-200 rounded-full flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-purple-700" />
              </div>
              <h4 className="font-semibold text-purple-800">Skill Badges</h4>
              <p className="text-sm text-purple-600">Certified qualifications</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-purple-200 rounded-full flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-purple-700" />
              </div>
              <h4 className="font-semibold text-purple-800">Community Bonds</h4>
              <p className="text-sm text-purple-600">Playdate connections</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Caregiver Profiles */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Trusted Community Caregivers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caregivers.map((caregiver) => (
            <Card key={caregiver.id} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {caregiver.pseudonym}
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{getAverageRating(caregiver.reviews).toFixed(1)}</span>
                  </div>
                  <div>
                    {caregiver.years_experience || 0} years experience
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Care Philosophy */}
                {caregiver.care_philosophy && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 italic">
                      "{caregiver.care_philosophy}"
                    </p>
                  </div>
                )}

                {/* Skill Badges */}
                {caregiver.member_skill_badges.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {caregiver.member_skill_badges.slice(0, 3).map((badge, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className={getBadgeColor(badge.badge_type)}
                        >
                          {getBadgeDisplayName(badge.badge_type)}
                        </Badge>
                      ))}
                      {caregiver.member_skill_badges.length > 3 && (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800">
                          +{caregiver.member_skill_badges.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Recent Reviews */}
                {caregiver.reviews.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Recent Review
                    </h4>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${
                              i < caregiver.reviews[0].rating 
                                ? 'text-yellow-500 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-700">
                        {caregiver.reviews[0].review_text?.slice(0, 100)}...
                      </p>
                      {caregiver.reviews[0].tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {caregiver.reviews[0].tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" className="flex-1">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trust Building Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Building Connections
          </CardTitle>
          <CardDescription>
            Ways to build trust before formal childcare arrangements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-blue-200 rounded-lg">
              <Users className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold mb-2">Playground Meetups</h4>
              <p className="text-sm text-gray-600 mb-3">
                Meet potential caregivers in a casual setting with your children present
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Find Meetups
              </Button>
            </div>
            <div className="p-4 border border-green-200 rounded-lg">
              <Heart className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-semibold mb-2">Playdates</h4>
              <p className="text-sm text-gray-600 mb-3">
                Organize supervised playdates to see how caregivers interact with children
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Arrange Playdate
              </Button>
            </div>
            <div className="p-4 border border-purple-200 rounded-lg">
              <MessageSquare className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="font-semibold mb-2">Philosophy Matching</h4>
              <p className="text-sm text-gray-600 mb-3">
                Find caregivers whose parenting philosophy aligns with yours
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Take Quiz
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
