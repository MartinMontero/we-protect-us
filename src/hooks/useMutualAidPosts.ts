
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { MutualAidPost } from '@/components/mutual-aid/types';

const VALID_CATEGORIES = [
  'food', 'housing', 'transportation', 'childcare', 'healthcare',
  'education', 'technology', 'labor', 'financial', 'emotional_support'
] as const;

type ValidCategory = typeof VALID_CATEGORIES[number];

export const useMutualAidPosts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<MutualAidPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('mutual_aid_posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'mutual_aid_posts'
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
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
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type assertion to ensure data matches our interface
      const typedData = data as MutualAidPost[];
      setPosts(typedData || []);
    } catch (error) {
      console.error('Error fetching mutual aid posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: Partial<MutualAidPost>) => {
    if (!user) return null;

    try {
      // Validate category
      const category = postData.category as ValidCategory;
      if (!VALID_CATEGORIES.includes(category)) {
        throw new Error('Invalid category');
      }

      const { data, error } = await supabase
        .from('mutual_aid_posts')
        .insert({
          user_id: user.id,
          type: postData.type || 'request',
          title: postData.title || '',
          description: postData.description || '',
          category: category,
          urgency: postData.urgency || 'medium',
          location_lat: postData.location_lat,
          location_lng: postData.location_lng,
          radius_km: postData.radius_km || 5,
          time_commitment_hours: postData.time_commitment_hours,
          skills_needed: postData.skills_needed || [],
          expires_at: postData.expires_at,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post created successfully",
      });

      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
      return null;
    }
  };

  const updatePost = async (id: string, updates: Partial<MutualAidPost>) => {
    try {
      // Validate category if being updated
      if (updates.category && !VALID_CATEGORIES.includes(updates.category as ValidCategory)) {
        throw new Error('Invalid category');
      }

      const { data, error } = await supabase
        .from('mutual_aid_posts')
        .update({
          type: updates.type,
          title: updates.title,
          description: updates.description,
          category: updates.category as ValidCategory,
          urgency: updates.urgency,
          location_lat: updates.location_lat,
          location_lng: updates.location_lng,
          radius_km: updates.radius_km,
          time_commitment_hours: updates.time_commitment_hours,
          skills_needed: updates.skills_needed,
          status: updates.status,
          expires_at: updates.expires_at,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post updated successfully",
      });

      return data;
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive",
      });
      return null;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('mutual_aid_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post deleted successfully",
      });

      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    posts,
    loading,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};
