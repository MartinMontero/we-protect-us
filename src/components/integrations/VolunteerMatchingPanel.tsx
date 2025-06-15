import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface VolunteerMatch {
  id: string;
  volunteer_id: string;
  post_id: string;
  match_score: number;
  status: string;
  created_at: string;
  volunteer_profile?: {
    full_name: string;
    skills: string[];
  } | null;
  mutual_aid_post?: {
    title: string;
    description: string;
    post_type: string;
  } | null;
}

export const VolunteerMatchingPanel: React.FC = () => {
  const [matches, setMatches] = useState<VolunteerMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const { data, error } = await supabase
        .from('volunteer_matches')
        .select(`
          *,
          volunteer_profile:volunteer_id(full_name, skills),
          mutual_aid_post:post_id(title, description, post_type)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const mappedMatches: VolunteerMatch[] = (data || []).map(match => {
        // Safely extract volunteer profile
        const volunteerProfile = match.volunteer_profile && 
          match.volunteer_profile !== null &&
          typeof match.volunteer_profile === 'object' &&
          'full_name' in match.volunteer_profile
          ? match.volunteer_profile as { full_name: string; skills: string[] }
          : null;

        // Safely extract mutual aid post
        const mutualAidPost = match.mutual_aid_post &&
          match.mutual_aid_post !== null &&
          typeof match.mutual_aid_post === 'object' &&
          'title' in match.mutual_aid_post
          ? match.mutual_aid_post as { title: string; description: string; post_type: string }
          : null;

        return {
          id: match.id,
          volunteer_id: match.volunteer_id,
          post_id: match.post_id,
          match_score: match.match_score,
          status: match.status,
          created_at: match.created_at,
          volunteer_profile: volunteerProfile,
          mutual_aid_post: mutualAidPost,
        };
      });

      setMatches(mappedMatches);
    } catch (error) {
      console.error('Error fetching volunteer matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading volunteer matches...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Volunteer Matching Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {matches.map((match) => (
              <Card key={match.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {match.volunteer_profile?.full_name} - {match.mutual_aid_post?.title}
                      </h3>
                      <div className="text-sm text-gray-500 mb-2">
                        Match Score: {match.match_score}
                      </div>
                      <div className="text-sm text-gray-500">
                        Created At: {new Date(match.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(match.status)}>
                        {match.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {matches.length === 0 && (
              <Card className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Volunteer Matches</h3>
                <p className="text-gray-600 mb-4">
                  No volunteer matches have been recorded yet.
                </p>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
