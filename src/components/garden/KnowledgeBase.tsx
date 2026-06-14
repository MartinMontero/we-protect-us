
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Search, Plus, ThumbsUp, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const { data: knowledgeEntries, isLoading } = useQuery({
    queryKey: ['garden-knowledge', searchTerm, categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from('garden_knowledge')
        .select(`
          *,
          author:profiles(pseudonym)
        `)
        .order('helpful_votes', { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`);
      }

      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const categories = [
    'planting',
    'pest_control',
    'harvesting',
    'composting',
    'soil_health',
    'watering',
    'pruning',
    'companion_planting',
    'seed_saving',
    'seasonal_care'
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      planting: 'bg-green-100 text-green-800',
      pest_control: 'bg-red-100 text-red-800',
      harvesting: 'bg-orange-100 text-orange-800',
      composting: 'bg-amber-100 text-amber-800',
      soil_health: 'bg-blue-100 text-blue-800',
      watering: 'bg-cyan-100 text-cyan-800',
      pruning: 'bg-purple-100 text-purple-800',
      companion_planting: 'bg-pink-100 text-pink-800',
      seed_saving: 'bg-indigo-100 text-indigo-800',
      seasonal_care: 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Garden Knowledge Base</h2>
          <p className="text-gray-600">Community-shared growing tips, techniques, and solutions</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Share Knowledge
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tips, techniques, or solutions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Entries */}
      <div className="space-y-4">
        {knowledgeEntries?.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{entry.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{entry.author?.pseudonym || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{entry.created_at ? format(new Date(entry.created_at), 'MMM d, yyyy') : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{entry.helpful_votes} helpful</span>
                    </div>
                  </div>
                </div>
                <Badge className={getCategoryColor(entry.category)}>
                  {entry.category.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{entry.content}</p>
                
                {entry.tags && entry.tags.length > 0 && (
                  <>
                    <Separator />
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Tags:</span>
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful ({entry.helpful_votes})
                    </Button>
                  </div>
                  <Button size="sm" variant="ghost">
                    View Discussion
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {knowledgeEntries?.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No knowledge entries found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || categoryFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Be the first to share your gardening knowledge!'
              }
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Share Your Knowledge
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
