
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Star, 
  ChefHat, 
  Leaf, 
  Calendar,
  ThumbsUp,
  Search,
  Plus,
  Filter,
  Clock,
  Users
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const KnowledgeSharing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: knowledgeBase } = useQuery({
    queryKey: ['food-knowledge'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_knowledge_base')
        .select('*')
        .order('helpful_votes', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: recipes } = useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipe_exchange')
        .select('*')
        .order('helpful_votes', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const categories = ['all', 'growing', 'preservation', 'cooking', 'nutrition', 'pest_management', 'soil_health'];

  const filteredKnowledge = knowledgeBase?.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredRecipes = recipes?.filter(recipe => 
    recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.instructions.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      growing: 'bg-green-100 text-green-800',
      preservation: 'bg-blue-100 text-blue-800',
      cooking: 'bg-red-100 text-red-800',
      nutrition: 'bg-purple-100 text-purple-800',
      pest_management: 'bg-orange-100 text-orange-800',
      soil_health: 'bg-amber-100 text-amber-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Knowledge Sharing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growing Guides</p>
                <p className="text-3xl font-bold text-green-600">{knowledgeBase?.length || 0}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shared Recipes</p>
                <p className="text-3xl font-bold text-blue-600">{recipes?.length || 0}</p>
              </div>
              <ChefHat className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Community Votes</p>
                <p className="text-3xl font-bold text-purple-600">
                  {(knowledgeBase?.reduce((acc, item) => acc + item.helpful_votes, 0) || 0) + 
                   (recipes?.reduce((acc, item) => acc + item.helpful_votes, 0) || 0)}
                </p>
              </div>
              <ThumbsUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contributors</p>
                <p className="text-3xl font-bold text-orange-600">
                  {new Set([
                    ...(knowledgeBase?.map(item => item.author_id) || []),
                    ...(recipes?.map(item => item.contributor_id) || [])
                  ]).size}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="guides" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="guides">Growing Guides</TabsTrigger>
          <TabsTrigger value="recipes">Recipe Exchange</TabsTrigger>
          <TabsTrigger value="preservation">Preservation</TabsTrigger>
          <TabsTrigger value="workshops">Skill Shares</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search growing guides..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Guide
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category === 'all' ? 'All Categories' : category.replace('_', ' ')}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Growing Guides List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredKnowledge?.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{guide.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getCategoryColor(guide.category)}>
                          {guide.category.replace('_', ' ')}
                        </Badge>
                        {guide.difficulty_level && (
                          <Badge className={getDifficultyColor(guide.difficulty_level)}>
                            {guide.difficulty_level}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <ThumbsUp className="w-4 h-4" />
                      {guide.helpful_votes}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {guide.content.substring(0, 150)}...
                  </p>
                  
                  {guide.tags && guide.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {guide.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {guide.growing_seasons && guide.growing_seasons.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">Best Seasons:</p>
                      <div className="flex flex-wrap gap-1">
                        {guide.growing_seasons.map((season, index) => (
                          <Badge key={index} variant="secondary" className="text-xs capitalize">
                            {season.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-xs text-gray-500">
                      {new Date(guide.created_at).toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recipes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5" />
                  Community Recipe Exchange
                </CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Share Recipe
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes?.map((recipe) => (
                  <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{recipe.recipe_name}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            {(recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0)} min
                            <span>•</span>
                            <span>{recipe.servings} servings</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Star className="w-4 h-4" />
                          {recipe.helpful_votes}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {recipe.seasonal_ingredients && recipe.seasonal_ingredients.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Seasonal Ingredients:</p>
                          <div className="flex flex-wrap gap-1">
                            {recipe.seasonal_ingredients.slice(0, 3).map((ingredient, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {recipe.tags && recipe.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {recipe.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-xs text-gray-500">
                          {new Date(recipe.created_at).toLocaleDateString()}
                        </span>
                        <Button variant="outline" size="sm">
                          View Recipe
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preservation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Food Preservation Techniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { method: 'Canning', difficulty: 'Intermediate', items: 24 },
                  { method: 'Dehydrating', difficulty: 'Beginner', items: 18 },
                  { method: 'Fermentation', difficulty: 'Advanced', items: 12 },
                  { method: 'Freezing', difficulty: 'Beginner', items: 31 },
                  { method: 'Root Cellaring', difficulty: 'Intermediate', items: 8 },
                  { method: 'Smoking', difficulty: 'Advanced', items: 6 }
                ].map((method, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="font-semibold mb-2">{method.method}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getDifficultyColor(method.difficulty.toLowerCase())}>
                        {method.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{method.items} guides available</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workshops" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Skill Shares & Workshops
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: 'Seed Starting Workshop',
                    date: '2024-03-15',
                    time: '2:00 PM',
                    location: 'Community Garden',
                    spots: 8,
                    filled: 5
                  },
                  {
                    title: 'Fermentation Basics',
                    date: '2024-03-22',
                    time: '10:00 AM',
                    location: 'Community Kitchen',
                    spots: 12,
                    filled: 9
                  },
                  {
                    title: 'Companion Planting 101',
                    date: '2024-03-29',
                    time: '1:00 PM',
                    location: 'Virtual',
                    spots: 20,
                    filled: 7
                  }
                ].map((workshop, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{workshop.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>📅 {new Date(workshop.date).toLocaleDateString()}</span>
                          <span>🕐 {workshop.time}</span>
                          <span>📍 {workshop.location}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm text-gray-600">
                            {workshop.filled}/{workshop.spots} spots filled
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Join Workshop
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
