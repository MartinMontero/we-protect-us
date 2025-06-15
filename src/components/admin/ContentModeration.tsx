
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Flag, Eye, Check, X, AlertTriangle, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MutualAidPost {
  id: string;
  title: string;
  description: string;
  post_type: 'offer' | 'request';
  status: 'active' | 'flagged' | 'resolved' | 'removed';
  created_at: string;
  user_id: string;
  reported_count: number;
  profiles?: {
    full_name: string;
    pseudonym: string;
    avatar_url: string;
  };
}

export const ContentModeration: React.FC = () => {
  const [posts, setPosts] = useState<MutualAidPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'flagged' | 'pending'>('flagged');
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('mutual_aid_posts')
        .select(`
          *,
          profiles:user_id(full_name, pseudonym, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (filter === 'flagged') {
        query = query.eq('status', 'flagged');
      } else if (filter === 'pending') {
        query = query.in('status', ['flagged', 'pending']);
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;

      const mappedPosts: MutualAidPost[] = (data || []).map(post => ({
        id: post.id,
        title: post.title,
        description: post.description,
        post_type: post.post_type,
        status: post.status || 'active',
        created_at: post.created_at,
        user_id: post.user_id,
        reported_count: post.reported_count || 0,
        profiles: post.profiles as any,
      }));

      setPosts(mappedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModerationAction = async (postId: string, action: 'approve' | 'remove' | 'flag') => {
    try {
      const newStatus = action === 'approve' ? 'active' : action === 'remove' ? 'removed' : 'flagged';
      
      const { error } = await supabase
        .from('mutual_aid_posts')
        .update({ status: newStatus })
        .eq('id', postId);

      if (error) throw error;

      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, status: newStatus } : post
      ));

      toast({
        title: "Action Completed",
        description: `Post has been ${action}d`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      case 'removed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPostTypeColor = (type: string) => {
    return type === 'offer' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="w-5 h-5" />
            Content Moderation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={filter === 'flagged' ? 'default' : 'outline'}
              onClick={() => setFilter('flagged')}
            >
              Flagged Content
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
            >
              Pending Review
            </Button>
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Posts
            </Button>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="border-l-4 border-l-red-400">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={post.profiles?.avatar_url} />
                          <AvatarFallback>
                            {post.profiles?.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium">
                            {post.profiles?.full_name || 'Anonymous'}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            @{post.profiles?.pseudonym || 'unknown'}
                          </span>
                        </div>
                        <Badge className={getPostTypeColor(post.post_type)}>
                          {post.post_type}
                        </Badge>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        {post.reported_count > 0 && (
                          <Badge variant="destructive">
                            {post.reported_count} reports
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-2 line-clamp-3">{post.description}</p>
                      
                      <div className="text-sm text-gray-500">
                        Posted on {new Date(post.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Full
                      </Button>
                      
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600"
                          onClick={() => handleModerationAction(post.id, 'approve')}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-yellow-600"
                          onClick={() => handleModerationAction(post.id, 'flag')}
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <X className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove Post</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove this post? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleModerationAction(post.id, 'remove')}>
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Posts Found</h3>
                <p className="text-gray-600">
                  {filter === 'flagged' 
                    ? 'No flagged content to review at this time.' 
                    : 'No posts match the current filter criteria.'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
