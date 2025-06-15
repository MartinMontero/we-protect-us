
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface MutualAidPost {
  id: string;
  user_id: string;
  type: 'request' | 'offer';
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  location_lat?: number;
  location_lng?: number;
  radius_km?: number;
  time_commitment_hours?: number;
  skills_needed?: string[];
  status: 'open' | 'in_progress' | 'fulfilled' | 'expired';
  expires_at?: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    pseudonym: string;
    vulnerability_factors?: string[];
  };
}

export const useMutualAidPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<MutualAidPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load real data from Supabase if user is authenticated
    if (user) {
      fetchRealPosts();
    } else {
      // Load mock data if not authenticated
      loadMockPosts();
    }
  }, [user]);

  const loadMockPosts = async () => {
    try {
      console.log('Loading mock mutual aid posts...');
      
      const mockPosts: MutualAidPost[] = [
        {
          id: '1',
          user_id: 'user1',
          title: 'Food Assistance Needed',
          description: 'Family needs groceries for the week. Any help would be greatly appreciated.',
          type: 'request',
          category: 'food',
          urgency: 'high',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: 'open',
          time_commitment_hours: 2,
          radius_km: 5,
          profiles: {
            pseudonym: 'CommunityMember1',
            vulnerability_factors: ['single_parent', 'low_income']
          }
        },
        {
          id: '2',
          user_id: 'user2',
          title: 'Offering Transportation',
          description: 'Can provide rides to medical appointments. Vehicle is wheelchair accessible.',
          type: 'offer',
          category: 'transportation',
          urgency: 'low',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: 'open',
          time_commitment_hours: 1,
          radius_km: 10,
          profiles: {
            pseudonym: 'HelpingHand',
            vulnerability_factors: []
          }
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(mockPosts);
      console.log('Mock posts loaded successfully:', mockPosts.length);
    } catch (error) {
      console.error('Error loading mock mutual aid posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRealPosts = async () => {
    try {
      console.log('Fetching real mutual aid posts from Supabase...');
      
      const { data, error } = await supabase
        .from('mutual_aid_posts')
        .select(`
          *,
          profiles (
            pseudonym,
            vulnerability_factors
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        // Fall back to mock data if there's an error
        loadMockPosts();
        return;
      }

      setPosts(data || []);
      console.log('Real posts loaded successfully:', data?.length || 0);
    } catch (error) {
      console.error('Error fetching real mutual aid posts:', error);
      // Fall back to mock data
      loadMockPosts();
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading };
};
