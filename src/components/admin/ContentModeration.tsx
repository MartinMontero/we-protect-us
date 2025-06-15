
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AlertTriangle, CheckCircle, Eye, Flag, Trash, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MutualAidPost {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'resolved' | 'flagged' | 'removed';
  created_at: string;
  user_id: string;
  reported_count: number;
  author?: {
    full_name: string;
    pseudonym: string;
    avatar_url?: string;
  };
}

export const ContentModeration: React.FC = () => {
  const [posts, setPosts] = useState<MutualAidPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('mutual_aid_posts')
        .select(`
          *,
          profiles:user_id(pseudonym, profile_image_url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedPosts: MutualAidPost[] = (data || []).map(post => {
        // Map database status to moderation status
        let moderationStatus: 'active' | 'resolved' | 'flagged' | 'removed' = 'active';
        if (post.status === 'fulfilled') moderationStatus = 'resolved';
        if (post.status === 'expired') moderationStatus = 'removed';

        // Safely extract author profile
        const author = post.profiles && 
          post.profiles !== null &&
          typeof post.profiles === 'object' &&
          'pseudonym' in post.profiles
          ? {
              full_name: post.profiles.pseudonym || 'Unknown',
              pseudonym: post.profiles.pseudonym || 'Anonymous',
              avatar_url: post.profiles.profile_image_url || undefined
            }
          : undefined;

        return {
          id: post.id,
          title: post.title,
          description: post.description,
          category: post.category,
          status: moderationStatus,
          created_at: post.created_at,
          user_id: post.user_id,
          reported_count: 0, // Default since not in schema
          author,
        };
      });

      setPosts(mappedPosts);
    } catch (error) {
      console.error('Error fetching posts for moderation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModerationAction = async (postId: string, action: 'approve' | 'flag' | 'remove') => {
    try {
      let newStatus: 'open' | 'in_progress' | 'fulfilled' | 'expired' = 'open';
      if (action === 'remove') newStatus = 'expired';
      if (action === 'approve') newStatus = 'open';

      const { error } = await supabase
        .from('mutual_aid_posts')
        .update({ status: newStatus })
        .eq('id', postId);

      if (error) throw error;

      // Update local state
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          let moderationStatus: 'active' | 'resolved' | 'flagged' | 'removed' = 'active';
          if (action === 'remove') moderationStatus = 'removed';
          if (action === 'flag') moderationStatus = 'flagged';
          if (action === 'approve') moderationStatus = 'active';
          
          return { ...post, status: moderationStatus };
        }
        return post;
      }));

      toast({
        title: "Action completed",
        description: `Post has been ${action}d successfully`,
      });
    } catch (error) {
      console.error('Error performing moderation action:', error);
      toast({
        title: "Error",
        description: "Failed to perform moderation action",
        variant: "destructive",
      });
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'flagged': return 'bg-yellow-100 text-yellow-800';
      case 'removed': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <AlertTriangle className="w-5 h-5" />
            Content Moderation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="flagged">Flagged</option>
              <option value="removed">Removed</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-2 line-clamp-2">{post.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Category: {post.category}</span>
                        <span>By: {post.author?.pseudonym || 'Anonymous'}</span>
                        <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                        {post.reported_count > 0 && (
                          <span className="text-red-600 font-medium">
                            {post.reported_count} reports
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleModerationAction(post.id, 'approve')}
                      className="gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleModerationAction(post.id, 'flag')}
                      className="gap-1"
                    >
                      <Flag className="w-4 h-4" />
                      Flag
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleModerationAction(post.id, 'remove')}
                      className="gap-1"
                    >
                      <Trash className="w-4 h-4" />
                      Remove
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Content Found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.' 
                    : 'No content requires moderation at this time.'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
