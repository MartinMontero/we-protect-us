
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Building, 
  Users, 
  Home, 
  DollarSign, 
  Utensils,
  Wrench,
  Download,
  Eye,
  Star,
  Search
} from 'lucide-react';

export const CooperativeTemplates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const templates = [
    {
      id: '1',
      name: 'Worker Cooperative Bylaws',
      category: 'worker',
      type: 'Legal Documents',
      description: 'Complete bylaws template for worker-owned cooperatives with democratic governance structures',
      downloads: 245,
      rating: 4.8,
      lastUpdated: '2024-06-01',
      complexity: 'intermediate',
      timeToImplement: '2-4 weeks',
      includes: ['Bylaws template', 'Operating agreement', 'Member handbook', 'Voting procedures']
    },
    {
      id: '2',
      name: 'Community Land Trust Toolkit',
      category: 'housing',
      type: 'Complete Package',
      description: 'Everything needed to establish a community land trust for permanently affordable housing',
      downloads: 189,
      rating: 4.9,
      lastUpdated: '2024-05-28',
      complexity: 'advanced',
      timeToImplement: '6-12 months',
      includes: ['Legal structure docs', 'Community engagement plan', 'Funding strategies', 'Land acquisition guide']
    },
    {
      id: '3',
      name: 'Food Cooperative Business Plan',
      category: 'consumer',
      type: 'Business Planning',
      description: 'Comprehensive business plan template for community-owned grocery stores and food co-ops',
      downloads: 167,
      rating: 4.6,
      lastUpdated: '2024-06-10',
      complexity: 'intermediate',
      timeToImplement: '3-6 months',
      includes: ['Financial projections', 'Market analysis', 'Member recruitment', 'Operations manual']
    },
    {
      id: '4',
      name: 'Community Credit Union Charter',
      category: 'financial',
      type: 'Regulatory',
      description: 'Step-by-step guide to obtaining credit union charter and serving community banking needs',
      downloads: 78,
      rating: 4.7,
      lastUpdated: '2024-05-15',
      complexity: 'advanced',
      timeToImplement: '12-18 months',
      includes: ['Charter application', 'Regulatory compliance', 'Board training', 'Member services guide']
    },
    {
      id: '5',
      name: 'Platform Cooperative Framework',
      category: 'platform',
      type: 'Technology',
      description: 'Template for creating worker-owned digital platforms and app-based cooperatives',
      downloads: 134,
      rating: 4.5,
      lastUpdated: '2024-06-05',
      complexity: 'advanced',
      timeToImplement: '4-8 months',
      includes: ['Technical architecture', 'Governance model', 'Revenue sharing', 'Member onboarding']
    },
    {
      id: '6',
      name: 'Artisan Cooperative Handbook',
      category: 'worker',
      type: 'Operations',
      description: 'Guide for craftspeople and artists to form cooperative workshops and shared studios',
      downloads: 92,
      rating: 4.4,
      lastUpdated: '2024-05-22',
      complexity: 'beginner',
      timeToImplement: '1-3 months',
      includes: ['Workspace sharing agreements', 'Equipment policies', 'Marketing collective', 'Skill sharing']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates', icon: Building, count: templates.length },
    { id: 'worker', label: 'Worker Co-ops', icon: Users, count: templates.filter(t => t.category === 'worker').length },
    { id: 'housing', label: 'Housing', icon: Home, count: templates.filter(t => t.category === 'housing').length },
    { id: 'consumer', label: 'Consumer Co-ops', icon: Utensils, count: templates.filter(t => t.category === 'consumer').length },
    { id: 'financial', label: 'Financial', icon: DollarSign, count: templates.filter(t => t.category === 'financial').length },
    { id: 'platform', label: 'Platform Co-ops', icon: Wrench, count: templates.filter(t => t.category === 'platform').length }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Cooperative Enterprise Templates</h3>
        <Button className="gap-2">
          <Building className="w-4 h-4" />
          Submit Template
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                size="sm"
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex-shrink-0 gap-2"
              >
                <Icon className="w-4 h-4" />
                {category.label} ({category.count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{template.type}</Badge>
                    <Badge className={getComplexityColor(template.complexity)}>
                      {template.complexity}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{template.rating}</span>
                  </div>
                  <div className="text-xs text-gray-600">{template.downloads} downloads</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Time to implement:</span>
                    <div className="font-medium">{template.timeToImplement}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Last updated:</span>
                    <div className="font-medium">{template.lastUpdated}</div>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-600">Includes:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.includes.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Success Stories */}
      <Card>
        <CardHeader>
          <CardTitle>Success Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2">Riverside Food Co-op</h5>
              <p className="text-sm text-gray-600 mb-2">
                Used our Food Cooperative template to launch a 200-member grocery co-op
              </p>
              <Badge variant="outline" className="text-xs">Consumer Co-op Template</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2">Makers Collective</h5>
              <p className="text-sm text-gray-600 mb-2">
                15 artisans formed a worker cooperative using our Artisan Handbook
              </p>
              <Badge variant="outline" className="text-xs">Worker Co-op Template</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2">Harmony Housing Trust</h5>
              <p className="text-sm text-gray-600 mb-2">
                Preserved 45 affordable homes using our Community Land Trust toolkit
              </p>
              <Badge variant="outline" className="text-xs">Housing Template</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Creation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Can't Find What You Need?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              We're always expanding our template library. If you don't see what you need, 
              we can help you create a custom template for your cooperative type.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline">Request Custom Template</Button>
              <Button>Get Consultation</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
