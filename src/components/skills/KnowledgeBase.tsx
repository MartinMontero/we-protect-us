
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Filter, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Article {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author_id: string;
  created_at: string;
  like_count: number;
  author?: {
    full_name: string;
    pseudonym: string;
  };
}

export const KnowledgeBase: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('knowledge_articles')
        .select(`
          *,
          profiles:author_id(username, pseudonym)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedArticles: Article[] = (data || []).map(article => {
        // Safely extract author profile
        const author = article.profiles && 
          article.profiles !== null &&
          typeof article.profiles === 'object' &&
          'username' in article.profiles
          ? {
              full_name: article.profiles.username || 'Unknown',
              pseudonym: article.profiles.pseudonym || 'Anonymous'
            }
          : undefined;

        return {
          id: article.id,
          title: article.title,
          content: article.content,
          tags: article.tags || [],
          author_id: article.author_id,
          created_at: article.created_at,
          like_count: article.like_count || 0,
          author,
        };
      });

      setArticles(mappedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Article
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Articles Grid */}
      <div className="grid gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">
                      by {article.author?.full_name || article.author?.pseudonym || 'Anonymous'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {article.like_count} likes
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.content.substring(0, 200)}...
              </p>
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredArticles.length === 0 && (
          <Card className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Articles Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? 'Try adjusting your search criteria.' 
                : 'Be the first to contribute to the knowledge base!'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
