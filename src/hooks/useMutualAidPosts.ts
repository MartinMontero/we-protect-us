
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { MutualAidPost, CreatePostData, UpdatePostData, NeedCategory } from '@/types/mutualAid';
import type { TablesUpdate } from '@/integrations/supabase/types';

const VALID_CATEGORIES: NeedCategory[] = [
  'food', 'housing', 'transportation', 'childcare', 'healthcare',
  'education', 'technology', 'labor', 'financial', 'emotional_support'
];

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
      console.log('Fetching mutual aid posts...');
      
      const { data, error } = await supabase
        .from('mutual_aid_posts')
        .select(`
          *,
          profiles (
            pseudonym,
            vulnerability_factors
          )
        `)
        .order('created_at', { ascending: false })
        .limit(200);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Type assertion with validation
      const typedData = (data || []).map(post => ({
        ...post,
        type: post.type as 'request' | 'offer',
        urgency: post.urgency as 'low' | 'medium' | 'high' | 'critical',
        status: post.status as 'open' | 'in_progress' | 'fulfilled' | 'expired',
        category: post.category as NeedCategory
      })) as MutualAidPost[];

      setPosts(typedData);
      console.log('Posts loaded successfully:', typedData.length);
    } catch (error) {
      console.error('Error fetching mutual aid posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: CreatePostData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a post",
        variant: "destructive",
      });
      return null;
    }

    try {
      // Validate category
      if (!VALID_CATEGORIES.includes(postData.category)) {
        throw new Error('Invalid category');
      }

      console.log('Creating post with data:', postData);

      const { data, error } = await supabase
        .from('mutual_aid_posts')
        .insert({
          user_id: user.id,
          type: postData.type,
          title: postData.title,
          description: postData.description,
          category: postData.category,
          urgency: postData.urgency || 'medium',
          location_lat: postData.location_lat,
          location_lng: postData.location_lng,
          radius_km: postData.radius_km || 5,
          time_commitment_hours: postData.time_commitment_hours,
          skills_needed: postData.skills_needed || [],
          contact_info: postData.contact_info,
          tags: postData.tags || [],
          expires_at: postData.expires_at,
        })
        .select()
        .single();

      if (error) {
        console.error('Create post error:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: "Post created successfully",
      });

      console.log('Post created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create post",
        variant: "destructive",
      });
      return null;
    }
  };

  const updatePost = async (id: string, updates: UpdatePostData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to update posts",
        variant: "destructive",
      });
      return null;
    }

    try {
      // Validate category if being updated
      if (updates.category && !VALID_CATEGORIES.includes(updates.category)) {
        throw new Error('Invalid category');
      }

      console.log('Updating post:', id, updates);

      const updateData: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };

      // Only include defined fields in the update
      Object.keys(updates).forEach(key => {
        const value = updates[key as keyof UpdatePostData];
        if (value !== undefined) {
          updateData[key] = value;
        }
      });

      const { data, error } = await supabase
        .from('mutual_aid_posts')
        .update(updateData as TablesUpdate<'mutual_aid_posts'>)
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user owns the post
        .select()
        .single();

      if (error) {
        console.error('Update post error:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: "Post updated successfully",
      });

      console.log('Post updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update post",
        variant: "destructive",
      });
      return null;
    }
  };

  const deletePost = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to delete posts",
        variant: "destructive",
      });
      return false;
    }

    try {
      console.log('Deleting post:', id);

      const { error } = await supabase
        .from('mutual_aid_posts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Ensure user owns the post

      if (error) {
        console.error('Delete post error:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: "Post deleted successfully",
      });

      console.log('Post deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete post",
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
