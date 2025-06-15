import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Plus, Eye, Heart, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CreateArticleModal } from './CreateArticleModal';

interface Article {
  id: string;
  title: string;
  content: string;
  tags: string[];
  is_featured: boolean;
  view_count: number;
  like_count: number;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  } | null;
}

interface KnowledgeBaseProps {
  searchQuery: string;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ searchQuery }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'featured' | 'my-articles'>('all');

  useEffect(() => {
    fetchArticles();
  }, [filter, searchQuery]);

  const fetchArticles = async () => {
    try {
      let query = supabase
        .from('knowledge_articles')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `);

      if (filter === 'featured') {
        query = query.eq('is_featured', true);
      } else if (filter === 'my-articles' && user) {
        query = query.eq('author_id', user.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      // Map the data to match our interface
      const mappedData: Article[] = (data || []).map(article => {
        const profiles = article.profiles;
        const profileData = profiles && 
          typeof profiles === 'object' && 
          'full_name' in profiles && 
          profiles !== null
          ? profiles as { full_name: string; avatar_url: string }
          : null;
          
        return {
          id: article.id,
          title: article.title || '',
          content: article.content || '',
          tags: article.tags || [],
          is_featured: article.is_featured || false,
          view_count: article.view_count || 0,
          like_count: article.like_count || 0,
          created_at: article.created_at || '',
          profiles: profileData
        };
      });

      let filteredData = mappedData;

      if (searchQuery) {
        filteredData = filteredData.filter(
          article => 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      setArticles(filteredData);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Error",
        description: "Failed to load articles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const likeArticle = async (articleId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to like articles",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('knowledge_articles')
        .update({ 
          like_count: articles.find(a => a.id === articleId)?.like_count + 1 || 1 
        })
        .eq('id', articleId);

      if (error) throw error;

      setArticles(prev => prev.map(article => 
        article.id === articleId 
          ? { ...article, like_count: article.like_count + 1 }
          : article
      ));

      toast({
        title: "Thanks!",
        description: "Article liked successfully"
      });
    } catch (error) {
      console.error('Error liking article:', error);
      toast({
        title: "Error",
        description: "Failed to like article",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading knowledge base...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            All Articles
          </Button>
          <Button
            variant={filter === 'featured' ? 'default' : 'outline'}
            onClick={() => setFilter('featured')}
            size="sm"
          >
            Featured
          </Button>
          <Button
            variant={filter === 'my-articles' ? 'default' : 'outline'}
            onClick={() => setFilter('my-articles')}
            size="sm"
          >
            My Articles
          </Button>
        </div>

        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Write Article
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                {article.is_featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-4">
                {article.content.substring(0, 200)}...
              </p>

              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{article.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.view_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {article.like_count}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.created_at).toLocaleDateString()}
                </div>
              </div>

              {article.profiles && (
                <div className="flex items-center gap-2 pt-2 border-t">
                  <img 
                    src={article.profiles.avatar_url || '/placeholder-avatar.png'} 
                    alt={article.profiles.full_name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">{article.profiles.full_name}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  Read More
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => likeArticle(article.id)}
                  className="gap-1"
                >
                  <Heart className="w-4 h-4" />
                  Like
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {articles.length === 0 && (
        <Card className="p-8 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Articles Found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? `No articles match "${searchQuery}"`
              : filter === 'my-articles'
                ? "You haven't written any articles yet"
                : "No articles available yet"
            }
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            Write the First Article
          </Button>
        </Card>
      )}

      <CreateArticleModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onArticleCreated={fetchArticles}
      />
    </div>
  );
};
