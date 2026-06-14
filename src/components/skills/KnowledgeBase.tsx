
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Calendar, User } from 'lucide-react';
import CreateArticleModal from './CreateArticleModal';

interface ArticleWithProfile {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  author_profile: {
    pseudonym: string;
  } | null;
}

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: articles = [], isLoading, refetch } = useQuery({
    queryKey: ['knowledge_articles'],
    queryFn: async () => {
      // First, get the articles
      const { data: articlesData, error: articlesError } = await supabase
        .from('knowledge_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (articlesError) throw articlesError;

      // Then get author profiles separately if we have articles
      if (!articlesData || articlesData.length === 0) {
        return [];
      }

      const authorIds = articlesData
        .map(article => article.author_id)
        .filter(Boolean);

      let profilesData: { id: string; pseudonym: string | null }[] = [];
      if (authorIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, pseudonym')
          .in('id', authorIds);

        if (!profilesError) {
          profilesData = profiles || [];
        }
      }

      // Combine the data
      return articlesData.map(article => ({
        id: article.id,
        title: article.title,
        content: article.content,
        tags: article.tags || [],
        created_at: article.created_at,
        author_profile: profilesData.find(p => p.id === article.author_id) || null
      })) as ArticleWithProfile[];
    },
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || article.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(articles.flatMap(article => article.tags)));

  const handleArticleCreated = () => {
    refetch();
  };

  if (isLoading) {
    return <div>Loading knowledge base...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Knowledge Base</h2>
          <p className="text-muted-foreground">Community-shared knowledge and resources</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <BookOpen className="h-4 w-4 mr-2" />
          Create Article
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      )}

      <div className="grid gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span>{article.title}</span>
              </CardTitle>
              <CardDescription className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author_profile?.pseudonym || 'Unknown Author'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.created_at).toLocaleDateString()}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: article.content.length > 300 
                    ? article.content.substring(0, 300) + '...' 
                    : article.content 
                }} />
              </div>
              
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No articles found matching your criteria.
        </div>
      )}

      <CreateArticleModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen}
        onArticleCreated={handleArticleCreated}
      />
    </div>
  );
};

export default KnowledgeBase;
