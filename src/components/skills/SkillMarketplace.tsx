import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SkillOfferModal } from './SkillOfferModal';

interface UserSkill {
  id: string;
  user_id: string;
  skill_level: string;
  is_teaching: boolean;
  is_learning: boolean;
  teaching_styles: string[];
  preferred_location: string[];
  hourly_rate: number;
  bio: string;
  years_experience: number;
  skills_catalog?: {
    skill_name: string;
    category: string;
    description: string;
  } | null;
  profiles?: {
    full_name: string;
    avatar_url: string;
  } | null;
}

interface SkillMarketplaceProps {
  searchQuery: string;
}

export const SkillMarketplace: React.FC<SkillMarketplaceProps> = ({ searchQuery }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'teaching' | 'learning'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showOfferModal, setShowOfferModal] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, [filter, categoryFilter]);

  const fetchSkills = async () => {
    try {
      let query = supabase
        .from('user_skills')
        .select(`
          *,
          skills_catalog (
            skill_name,
            category,
            description
          ),
          profiles (
            full_name,
            avatar_url
          )
        `);

      if (filter === 'teaching') {
        query = query.eq('is_teaching', true);
      } else if (filter === 'learning') {
        query = query.eq('is_learning', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Map the data to match our interface
      const mappedData: UserSkill[] = (data || []).map(skill => {
        const profiles = skill.profiles;
        const profileData = profiles && 
          typeof profiles === 'object' && 
          'full_name' in profiles && 
          profiles !== null
          ? profiles as { full_name: string; avatar_url: string }
          : null;
          
        return {
          id: skill.id,
          user_id: skill.user_id,
          skill_level: skill.skill_level || '',
          is_teaching: skill.is_teaching || false,
          is_learning: skill.is_learning || false,
          teaching_styles: skill.teaching_styles || [],
          preferred_location: skill.preferred_location || [],
          hourly_rate: skill.hourly_rate || 0,
          bio: skill.bio || '',
          years_experience: skill.years_experience || 0,
          skills_catalog: skill.skills_catalog ? {
            skill_name: skill.skills_catalog.skill_name || '',
            category: skill.skills_catalog.category || '',
            description: skill.skills_catalog.description || ''
          } : null,
          profiles: profileData ? {
            full_name: profileData.full_name || '',
            avatar_url: profileData.avatar_url || ''
          } : null
        };
      });

      let filteredData = mappedData;

      if (categoryFilter !== 'all') {
        filteredData = filteredData.filter(
          skill => skill.skills_catalog?.category === categoryFilter
        );
      }

      if (searchQuery) {
        filteredData = filteredData.filter(
          skill => 
            skill.skills_catalog?.skill_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.skills_catalog?.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.bio?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setSkills(filteredData);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast({
        title: "Error",
        description: "Failed to load skills",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = ['all', 'Programming', 'Design', 'Business', 'Languages', 'Creative', 'Health & Wellness'];

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading skills...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-4">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              <SelectItem value="teaching">Teaching</SelectItem>
              <SelectItem value="learning">Learning</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setShowOfferModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Offer a Skill
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <Card key={skill.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{skill.skills_catalog?.skill_name}</CardTitle>
                  <p className="text-sm text-gray-600">{skill.skills_catalog?.category}</p>
                </div>
                <div className="flex gap-2">
                  {skill.is_teaching && (
                    <Badge variant="outline" className="text-xs">Teaching</Badge>
                  )}
                  {skill.is_learning && (
                    <Badge variant="outline" className="text-xs">Learning</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getSkillLevelColor(skill.skill_level)}>
                  {skill.skill_level}
                </Badge>
                {skill.hourly_rate && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    ${skill.hourly_rate}/hr
                  </div>
                )}
              </div>

              {skill.bio && (
                <p className="text-sm text-gray-700 line-clamp-3">{skill.bio}</p>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-500">
                {skill.years_experience > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {skill.years_experience} years
                  </div>
                )}
                
                {skill.preferred_location?.length > 0 && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {skill.preferred_location.join(', ')}
                  </div>
                )}
              </div>

              {skill.teaching_styles?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {skill.teaching_styles.map((style, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {style.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  Connect
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {skills.length === 0 && (
        <Card className="p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Skills Found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? `No skills match "${searchQuery}"`
              : "Be the first to share a skill in this community"
            }
          </p>
          <Button onClick={() => setShowOfferModal(true)}>
            Share Your First Skill
          </Button>
        </Card>
      )}

      <SkillOfferModal 
        open={showOfferModal} 
        onOpenChange={setShowOfferModal}
        onSkillAdded={fetchSkills}
      />
    </div>
  );
};
