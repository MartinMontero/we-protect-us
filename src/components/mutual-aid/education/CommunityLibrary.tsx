
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Plus, Search, Filter, Heart } from 'lucide-react';

interface CommunityGuide {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string[];
  category: 'guide' | 'case-study' | 'template';
  relevantFeatures: string[];
  dateAdded: string;
  likes: number;
  isUserContributed: boolean;
}

export const CommunityLibrary: React.FC = () => {
  const [guides] = useState<CommunityGuide[]>([
    {
      id: '1',
      title: 'Starting a Community Fridge',
      author: 'Oakland Food Network',
      description: 'Complete guide to establishing and maintaining community fridges',
      content: `# Starting a Community Fridge

## Planning Phase
1. **Location Assessment**
   - High foot traffic areas
   - Accessible 24/7
   - Near vulnerable populations
   - Property owner consent

2. **Community Engagement**
   - Door-to-door outreach
   - Multi-language flyers
   - Social media presence
   - Partner with local organizations

## Implementation
- Acquire refrigerator (donated/purchased)
- Weatherproofing and security
- Power source coordination
- Signage and guidelines
- Volunteer coordination system

## Maintenance
- Daily restocking schedule
- Weekly cleaning protocol
- Monthly electrical checks
- Quarterly community meetings`,
      tags: ['food', 'infrastructure', 'community-organizing'],
      category: 'guide',
      relevantFeatures: ['resource-sharing', 'food-sovereignty'],
      dateAdded: '2024-01-15',
      likes: 24,
      isUserContributed: false
    },
    {
      id: '2',
      title: 'Hull House Settlement Model',
      author: 'Dr. Maria Santos',
      description: 'How Jane Addams created mutual aid networks in 1889 Chicago',
      content: `# Hull House: A Model for Community Solidarity

## Historical Context
Jane Addams established Hull House in 1889 as a "settlement house" in Chicago's immigrant neighborhoods.

## Key Principles
1. **Reciprocal Learning**: Middle-class residents learned from immigrant neighbors
2. **Skill Sharing**: Cooking, childcare, English, trades taught mutually
3. **Political Action**: Organized for labor rights, sanitation, education
4. **Cultural Preservation**: Celebrated immigrant traditions while building bridges

## Modern Applications
- Time banking systems
- Skill exchange networks
- Intergenerational programming
- Community education hubs
- Political organizing spaces

## Lessons for Today
- Avoid saviorism - center community expertise
- Build lasting institutions, not just programs
- Connect immediate aid to systemic change
- Create spaces for joy and culture`,
      tags: ['history', 'settlement-movement', 'organizing'],
      category: 'case-study',
      relevantFeatures: ['skill-mapping', 'trust-building'],
      dateAdded: '2024-01-10',
      likes: 18,
      isUserContributed: true
    },
    {
      id: '3',
      title: 'Restorative Justice Circle Template',
      author: 'Community Justice Collective',
      description: 'Step-by-step process for community healing circles',
      content: `# Restorative Justice Circle Process

## Pre-Circle Preparation
- Individual meetings with all parties
- Consent from everyone involved
- Neutral facilitator selection
- Safe space arrangement

## Circle Structure
1. **Opening Ritual** (5 min)
   - Land acknowledgment
   - Intention setting
   - Community agreements

2. **Story Sharing** (20 min)
   - Each person shares their experience
   - No interruptions or responses
   - Talking piece to guide sharing

3. **Impact Exploration** (15 min)
   - How were relationships affected?
   - What needs remain unmet?
   - What accountability is needed?

4. **Healing Actions** (15 min)
   - What can repair the harm?
   - How can community support healing?
   - What systemic changes are needed?

5. **Closing Ritual** (5 min)
   - Appreciation circle
   - Next steps commitment
   - Closing blessing

## Follow-up
- Check-ins with all parties
- Community support activation
- Progress monitoring
- Celebration of healing`,
      tags: ['conflict-resolution', 'healing', 'process'],
      category: 'template',
      relevantFeatures: ['conflict-resolution', 'trust-building'],
      dateAdded: '2024-01-12',
      likes: 31,
      isUserContributed: false
    }
  ]);

  const [selectedGuide, setSelectedGuide] = useState<CommunityGuide | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newGuide, setNewGuide] = useState({
    title: '',
    description: '',
    content: '',
    tags: '',
    category: 'guide' as 'guide' | 'case-study' | 'template'
  });

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'case-study': return 'bg-green-100 text-green-800';
      case 'template': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Community Learning Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Guides</TabsTrigger>
              <TabsTrigger value="contribute">Contribute</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search guides, case studies, templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="guide">Guides</option>
                  <option value="case-study">Case Studies</option>
                  <option value="template">Templates</option>
                </select>
              </div>

              {selectedGuide ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{selectedGuide.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          by {selectedGuide.author} • {selectedGuide.dateAdded}
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => setSelectedGuide(null)}>
                        ← Back
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className={getCategoryColor(selectedGuide.category)}>
                        {selectedGuide.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Heart className="w-4 h-4" />
                        {selectedGuide.likes}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm">
                        {selectedGuide.content}
                      </pre>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {selectedGuide.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredGuides.map(guide => (
                    <Card 
                      key={guide.id}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedGuide(guide)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm">{guide.title}</h3>
                          <Badge className={`text-xs ${getCategoryColor(guide.category)}`}>
                            {guide.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{guide.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">by {guide.author}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Heart className="w-3 h-3" />
                            {guide.likes}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {guide.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="contribute" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Share Your Knowledge</CardTitle>
                  <p className="text-sm text-gray-600">
                    Contribute guides, case studies, or templates to help the community learn and grow.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                      value={newGuide.title}
                      onChange={(e) => setNewGuide({...newGuide, title: e.target.value})}
                      placeholder="Guide title..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={newGuide.category}
                      onChange={(e) => setNewGuide({...newGuide, category: e.target.value as 'guide' | 'case-study' | 'template'})}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="guide">Practical Guide</option>
                      <option value="case-study">Historical Case Study</option>
                      <option value="template">Process Template</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea
                      value={newGuide.description}
                      onChange={(e) => setNewGuide({...newGuide, description: e.target.value})}
                      placeholder="Brief description of what this guide covers..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <Textarea
                      value={newGuide.content}
                      onChange={(e) => setNewGuide({...newGuide, content: e.target.value})}
                      placeholder="Write your guide content here..."
                      rows={10}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Tags</label>
                    <Input
                      value={newGuide.tags}
                      onChange={(e) => setNewGuide({...newGuide, tags: e.target.value})}
                      placeholder="Tags separated by commas (e.g., food, organizing, history)"
                    />
                  </div>

                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Contribute Guide
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
