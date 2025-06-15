
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, MapPin, DollarSign, Plus, User, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SkillOfferModal } from './SkillOfferModal';

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  skill_level: string;
  hourly_rate?: number;
  location_type: string;
  is_teaching: boolean;
  is_learning: boolean;
  created_at: string;
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
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'teaching' | 'learning'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    fetchSkills();
  }, [filter, searchQuery, categoryFilter]);

  const fetchSkills = async () => {
    try {
      // For now, return empty array since the table doesn't exist
      const mockSkills: Skill[] = [];
      setSkills(mockSkills);
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

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading skills...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            All Skills
          </Button>
          <Button
            variant={filter === 'teaching' ? 'default' : 'outline'}
            onClick={() => setFilter('teaching')}
            size="sm"
          >
            Teaching
          </Button>
          <Button
            variant={filter === 'learning' ? 'default' : 'outline'}
            onClick={() => setFilter('learning')}
            size="sm"
          >
            Learning
          </Button>
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
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{skill.title}</CardTitle>
                <div className="flex flex-col gap-1">
                  <Badge className={getSkillLevelColor(skill.skill_level)}>
                    {skill.skill_level}
                  </Badge>
                  {skill.is_teaching && (
                    <Badge variant="default" className="text-xs">
                      Teaching
                    </Badge>
                  )}
                  {skill.is_learning && (
                    <Badge variant="secondary" className="text-xs">
                      Learning
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">{skill.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {skill.location_type}
                </div>
                {skill.hourly_rate && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ${skill.hourly_rate}/hr
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  4.8
                </div>
              </div>

              {skill.profiles && (
                <div className="flex items-center gap-2 pt-2 border-t">
                  <img 
                    src={skill.profiles.avatar_url || '/placeholder-avatar.png'} 
                    alt={skill.profiles.full_name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">{skill.profiles.full_name}</span>
                </div>
              )}

              <Button className="w-full gap-2">
                <MessageCircle className="w-4 h-4" />
                Connect
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {skills.length === 0 && (
        <Card className="p-8 text-center">
          <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Skills Found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? `No skills match "${searchQuery}"`
              : filter === 'teaching'
                ? "No one is teaching skills yet"
                : filter === 'learning'
                ? "No one is looking to learn skills yet"
                : "No skills available yet"
            }
          </p>
          <Button onClick={() => setShowOfferModal(true)}>
            Offer Your First Skill
          </Button>
        </Card>
      )}

      <SkillOfferModal
        open={showOfferModal}
        onOpenChange={setShowOfferModal}
      />
    </div>
  );
};
