
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MutualAidPost } from '../types';

export const useMutualAidPosts = () => {
  const [posts, setPosts] = useState<MutualAidPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMutualAidPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('mutual_aid_posts')
        .select(`
          *,
          profiles (
            pseudonym,
            vulnerability_factors
          )
        `)
        .eq('status', 'open')
        .not('location_lat', 'is', null)
        .not('location_lng', 'is', null);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching mutual aid posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMutualAidPosts();
  }, []);

  return { posts, loading, refetch: fetchMutualAidPosts };
};
