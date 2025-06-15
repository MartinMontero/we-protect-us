
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProfile {
  id: string;
  pseudonym: string;
  bio: string;
  skills: string[];
  interests: string[];
  address: string;
  location_lat: number;
  location_lng: number;
  trust_score: number;
  created_at: string;
  care_points_balance?: number;
}

export const useUsers = () => {
  const { user } = useAuth();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map the database fields to our interface, handling missing properties
      return data.map(profile => ({
        id: profile.id,
        pseudonym: profile.pseudonym || 'Anonymous',
        bio: profile.bio || '',
        skills: profile.skills || [],
        interests: [], // Default to empty array since this field may not exist
        address: profile.address || '',
        location_lat: profile.location_lat || 0,
        location_lng: profile.location_lng || 0,
        trust_score: profile.trust_score || 0,
        created_at: profile.created_at,
        care_points_balance: profile.care_points_balance || 0
      })) as UserProfile[];
    },
    enabled: !!user,
  });

  const { data: currentUserProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      return {
        id: data.id,
        pseudonym: data.pseudonym || 'Anonymous',
        bio: data.bio || '',
        skills: data.skills || [],
        interests: [], // Default to empty array since this field may not exist
        address: data.address || '',
        location_lat: data.location_lat || 0,
        location_lng: data.location_lng || 0,
        trust_score: data.trust_score || 0,
        created_at: data.created_at,
        care_points_balance: data.care_points_balance || 0
      } as UserProfile;
    },
    enabled: !!user?.id,
  });

  const getUserById = (userId: string) => {
    return users.find(u => u.id === userId);
  };

  const searchUsers = (query: string) => {
    return users.filter(user => 
      user.pseudonym.toLowerCase().includes(query.toLowerCase()) ||
      user.bio.toLowerCase().includes(query.toLowerCase()) ||
      user.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return {
    users,
    currentUserProfile,
    isLoading: isLoading || isLoadingProfile,
    error,
    getUserById,
    searchUsers,
  };
};
