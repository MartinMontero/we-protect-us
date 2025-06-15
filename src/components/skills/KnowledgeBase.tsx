
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Plus, User, Calendar, ThumbsUp, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CreateArticleModal } from './CreateArticleModal';

interface Article {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  like_count: number;
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
  const [filter, setFilter] = useState<'all' | 'my-articles'>('all');

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

      if (filter === 'my-articles' && user) {
        query = query.eq('author_id', user.id);
      }

      const { data, error } = await query.order('like_count', { ascending: false });

      if (error) throw error;

      const mappedData: Article[] = (data || []).map(article => {
        const profiles = article.profiles;
        const profileData = profiles && 
          profiles !== null &&
          typeof profiles === 'object' && 
          'full_name' in profiles
          ? profiles as { full_name: string; avatar_url: string }
          : null;
          
        return {
          id: article.id,
          title: article.title || '',
          content: article.content || '',
          tags: article.tags || [],
          created_at: article.created_at || '',
          like_count: article.like_count || 0,
          profiles: profileData
        };
      });

      let filteredData = mappedData;

      if (searchQuery) {
        filteredData = filteredData.filter(
          article => 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading articles...</div>;
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

      <div className="grid gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{article.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {article.profiles && article.profiles !== null && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.profiles.full_name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{article.like_count}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-3">{article.content}</p>
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
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
            Write Your First Article
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
