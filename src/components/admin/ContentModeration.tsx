
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PostWithProfile {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'open' | 'in_progress' | 'fulfilled' | 'expired';
  created_at: string;
  profiles: {
    pseudonym: string;
  } | null;
}

const ContentModeration = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [moderationNote, setModerationNote] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['mutual-aid-posts-moderation'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mutual_aid_posts')
        .select(`
          *,
          profiles:user_id(pseudonym)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PostWithProfile[];
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ postId, status }: { postId: string; status: 'open' | 'in_progress' | 'fulfilled' | 'expired' }) => {
      const { error } = await supabase
        .from('mutual_aid_posts')
        .update({ status })
        .eq('id', postId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mutual-aid-posts-moderation'] });
      toast({
        title: "Action completed",
        description: "Post status has been updated.",
      });
      setSelectedPost(null);
      setModerationNote('');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update post status.",
        variant: "destructive",
      });
    },
  });

  const handleModeration = (postId: string, status: 'open' | 'in_progress' | 'fulfilled' | 'expired') => {
    updatePostMutation.mutate({ postId, status });
  };

  if (isLoading) {
    return <div>Loading posts for moderation...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Content Moderation</h2>
        <p className="text-muted-foreground">Review and moderate community posts</p>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>
                    By {post.profiles?.pseudonym || 'Unknown User'} • {new Date(post.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant={post.status === 'open' ? 'default' : 'secondary'}>
                  {post.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{post.description}</p>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {selectedPost === post.id ? 'Hide Actions' : 'Moderate'}
                </Button>
              </div>

              {selectedPost === post.id && (
                <div className="space-y-4 pt-4 border-t">
                  <Textarea
                    placeholder="Add moderation notes (optional)"
                    value={moderationNote}
                    onChange={(e) => setModerationNote(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleModeration(post.id, 'open')}
                      disabled={updatePostMutation.isPending}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleModeration(post.id, 'expired')}
                      disabled={updatePostMutation.isPending}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Hide
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleModeration(post.id, 'in_progress')}
                      disabled={updatePostMutation.isPending}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Flag
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentModeration;
