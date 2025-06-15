
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ModerationAction {
  id: string;
  post_id: string;
  action_type: 'approved' | 'rejected' | 'flagged';
  reason?: string;
  moderator_id: string;
  created_at: string;
}

interface PostWithProfile {
  id: string;
  title: string;
  description: string;
  post_type: string;
  status: string;
  created_at: string;
  profiles: {
    pseudonym: string;
  } | null;
  moderation_actions: ModerationAction[];
}

const ContentModeration = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [moderationReason, setModerationReason] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts-moderation'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id(pseudonym),
          moderation_actions(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PostWithProfile[];
    },
  });

  const moderatePostMutation = useMutation({
    mutationFn: async ({ postId, action, reason }: { postId: string; action: string; reason?: string }) => {
      const { error } = await supabase
        .from('moderation_actions')
        .insert({
          post_id: postId,
          action_type: action,
          reason,
          moderator_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts-moderation'] });
      toast({
        title: "Action completed",
        description: "Moderation action has been recorded.",
      });
      setSelectedPost(null);
      setModerationReason('');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to complete moderation action.",
        variant: "destructive",
      });
    },
  });

  const handleModeration = (postId: string, action: string) => {
    moderatePostMutation.mutate({ postId, action, reason: moderationReason });
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
                <Badge variant={post.status === 'active' ? 'default' : 'secondary'}>
                  {post.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{post.description}</p>
              
              {post.moderation_actions.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Moderation History</h4>
                  {post.moderation_actions.map((action) => (
                    <div key={action.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                      {action.action_type === 'approved' && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {action.action_type === 'rejected' && <XCircle className="h-4 w-4 text-red-500" />}
                      {action.action_type === 'flagged' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      <span>{action.action_type} - {action.reason || 'No reason provided'}</span>
                    </div>
                  ))}
                </div>
              )}

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
                    placeholder="Reason for moderation action (optional)"
                    value={moderationReason}
                    onChange={(e) => setModerationReason(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleModeration(post.id, 'approved')}
                      disabled={moderatePostMutation.isPending}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleModeration(post.id, 'rejected')}
                      disabled={moderatePostMutation.isPending}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleModeration(post.id, 'flagged')}
                      disabled={moderatePostMutation.isPending}
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
