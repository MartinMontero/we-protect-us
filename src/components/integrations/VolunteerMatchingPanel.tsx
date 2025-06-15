
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, MapPin, Clock, Star } from 'lucide-react';
import { useVolunteerMatching, VolunteerMatch } from '@/hooks/useIntegrations';
import { supabase } from '@/integrations/supabase/client';

export const VolunteerMatchingPanel: React.FC = () => {
  const { generateMatches, acceptMatch } = useVolunteerMatching();
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
          volunteer_profile:profiles!volunteer_id(full_name, pseudonym, skills),
          mutual_aid_post:mutual_aid_posts!need_id(title, description, post_type)
        `)
        .order('match_score', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Transform the data to match our interface
      const transformedMatches: VolunteerMatch[] = (data || []).map(match => ({
        id: match.id,
        need_id: match.need_id,
        volunteer_id: match.volunteer_id,
        match_score: match.match_score,
        factors: typeof match.factors === 'object' && match.factors !== null 
          ? match.factors as Record<string, any>
          : {},
        status: match.status,
        created_at: match.created_at,
        volunteer_profile: match.volunteer_profile && 
          typeof match.volunteer_profile === 'object' &&
          match.volunteer_profile !== null &&
          'full_name' in match.volunteer_profile
          ? {
              full_name: match.volunteer_profile.full_name || '',
              pseudonym: match.volunteer_profile.pseudonym || '',
              skills: Array.isArray(match.volunteer_profile.skills) ? match.volunteer_profile.skills : []
            }
          : null,
        mutual_aid_post: match.mutual_aid_post && 
          typeof match.mutual_aid_post === 'object' &&
          match.mutual_aid_post !== null &&
          'title' in match.mutual_aid_post
          ? {
              title: match.mutual_aid_post.title || '',
              description: match.mutual_aid_post.description || '',
              post_type: match.mutual_aid_post.post_type || ''
            }
          : null
      }));

      setMatches(transformedMatches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptMatch = async (matchId: string) => {
    await acceptMatch(matchId);
    fetchMatches();
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
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
            Volunteer Matching System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{matches.length}</div>
              <div className="text-sm text-gray-600">Total Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {matches.filter(m => m.status === 'accepted').length}
              </div>
              <div className="text-sm text-gray-600">Accepted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {matches.filter(m => m.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {match.mutual_aid_post?.title || 'Untitled Need'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {match.mutual_aid_post?.description?.substring(0, 150) || 'No description available'}...
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{match.volunteer_profile?.full_name || match.volunteer_profile?.pseudonym || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(match.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4" />
                    <span className={`font-semibold ${getMatchScoreColor(match.match_score)}`}>
                      {(match.match_score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Badge className={getStatusColor(match.status)}>
                    {match.status}
                  </Badge>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Match Factors</div>
                <Progress value={match.match_score * 100} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Skills: {match.factors?.skillMatch ? (match.factors.skillMatch * 100).toFixed(0) : 0}%</span>
                  <span>Location: {match.factors?.proximity ? (match.factors.proximity * 100).toFixed(0) : 0}%</span>
                  <span>Availability: {match.factors?.availability ? (match.factors.availability * 100).toFixed(0) : 0}%</span>
                </div>
              </div>

              {match.volunteer_profile?.skills && match.volunteer_profile.skills.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Volunteer Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {match.volunteer_profile.skills.slice(0, 5).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {match.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAcceptMatch(match.id)}
                    className="flex-1"
                  >
                    Accept Match
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    View Details
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {matches.length === 0 && (
          <Card className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Volunteer Matches</h3>
            <p className="text-gray-600 mb-4">
              No volunteer matches have been generated yet.
            </p>
            <Button onClick={() => generateMatches('sample-need-id')}>
              Generate Test Matches
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};
