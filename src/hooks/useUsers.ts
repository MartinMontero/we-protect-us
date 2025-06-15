
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
  // Note: avatar_url is not available in the profiles table
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
      return data as UserProfile[];
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
      return data as UserProfile;
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
      user.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase())) ||
      user.interests.some(interest => interest.toLowerCase().includes(query.toLowerCase()))
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
