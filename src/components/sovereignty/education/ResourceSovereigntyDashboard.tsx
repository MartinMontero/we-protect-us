
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, TrendingDown, Building, Leaf, Home, Heart } from 'lucide-react';
import { ResourceSovereigntyData } from '../types';

export const ResourceSovereigntyDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'food' | 'housing' | 'energy'>('food');

  const resourceData: ResourceSovereigntyData[] = [
    {
      category: 'food',
      corporateControl: 75,
      communityOwnership: 15,
      cooperativeNetworks: 8,
      mutualAidCapacity: 12,
      trends: [
        { month: 'Jan', value: 10 },
        { month: 'Feb', value: 12 },
        { month: 'Mar', value: 11 },
        { month: 'Apr', value: 15 },
        { month: 'May', value: 18 },
        { month: 'Jun', value: 15 }
      ]
    },
    {
      category: 'housing',
      corporateControl: 65,
      communityOwnership: 25,
      cooperativeNetworks: 10,
      mutualAidCapacity: 20,
      trends: [
        { month: 'Jan', value: 20 },
        { month: 'Feb', value: 22 },
        { month: 'Mar', value: 24 },
        { month: 'Apr', value: 25 },
        { month: 'May', value: 26 },
        { month: 'Jun', value: 25 }
      ]
    },
    {
      category: 'energy',
      corporateControl: 85,
      communityOwnership: 8,
      cooperativeNetworks: 5,
      mutualAidCapacity: 7,
      trends: [
        { month: 'Jan', value: 5 },
        { month: 'Feb', value: 6 },
        { month: 'Mar', value: 7 },
        { month: 'Apr', value: 8 },
        { month: 'May', value: 9 },
        { month: 'Jun', value: 8 }
      ]
    }
  ];

  const categoryIcons = {
    food: Leaf,
    housing: Home,
    energy: Building,
    healthcare: Heart,
    education: Building,
    finance: Building
  };

  const sovereigntyStrategies = [
    {
      category: 'Food Sovereignty',
      strategies: [
        'Community gardens and urban farms',
        'Food buying cooperatives',
        'Community-supported agriculture (CSA)',
        'Seed libraries and preservation',
        'Food recovery and distribution networks'
      ],
      metrics: 'Community food production, local sourcing percentage'
    },
    {
      category: 'Housing Sovereignty',
      strategies: [
        'Community land trusts',
        'Housing cooperatives',
        'Tenant organizing and rent control',
        'Social housing development',
        'Anti-displacement campaigns'
      ],
      metrics: 'Affordable units preserved, community ownership percentage'
    },
    {
      category: 'Energy Sovereignty',
      strategies: [
        'Community solar projects',
        'Energy cooperatives',
        'Weatherization programs',
        'Community choice aggregation',
        'Energy democracy campaigns'
      ],
      metrics: 'Renewable energy percentage, community-owned generation'
    }
  ];

  const currentData = resourceData.find(data => data.category === selectedCategory);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Resource Sovereignty Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as 'food' | 'housing' | 'energy')} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="food" className="gap-1">
              <Leaf className="w-3 h-3" />
              Food
            </TabsTrigger>
            <TabsTrigger value="housing" className="gap-1">
              <Home className="w-3 h-3" />
              Housing
            </TabsTrigger>
            <TabsTrigger value="energy" className="gap-1">
              <Building className="w-3 h-3" />
              Energy
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-4">
            {currentData && (
              <>
                {/* Sovereignty Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      {currentData.corporateControl}%
                    </div>
                    <div className="text-xs text-gray-600">Corporate Control</div>
                  </div>
                  
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {currentData.communityOwnership}%
                    </div>
                    <div className="text-xs text-gray-600">Community Ownership</div>
                  </div>
                  
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {currentData.cooperativeNetworks}%
                    </div>
                    <div className="text-xs text-gray-600">Cooperative Networks</div>
                  </div>
                  
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {currentData.mutualAidCapacity}%
                    </div>
                    <div className="text-xs text-gray-600">Mutual Aid Capacity</div>
                  </div>
                </div>

                {/* Trend Visualization */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Community Ownership Trend (6 months)</h4>
                  <div className="h-32 border rounded-lg bg-gray-50 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end justify-around p-2">
                      {currentData.trends.map((point, index) => (
                        <div key={point.month} className="flex flex-col items-center">
                          <div 
                            className="bg-blue-600 rounded-t"
                            style={{ 
                              height: `${(point.value / 30) * 100}%`,
                              width: '20px',
                              minHeight: '4px'
                            }}
                          />
                          <span className="text-xs mt-1">{point.month}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="text-xs gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +3% this quarter
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Sovereignty Strategies */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Sovereignty Building Strategies</h4>
                  {sovereigntyStrategies
                    .filter(strategy => strategy.category.toLowerCase().includes(selectedCategory))
                    .map((strategy) => (
                      <div key={strategy.category} className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm mb-2">{strategy.category}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <span className="text-xs font-medium">Key Strategies:</span>
                            <ul className="text-xs text-gray-700 mt-1 space-y-1">
                              {strategy.strategies.map((item, index) => (
                                <li key={index}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="text-xs font-medium">Success Metrics:</span>
                            <p className="text-xs text-gray-700 mt-1">{strategy.metrics}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Analysis Summary */}
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <h5 className="font-medium text-sm mb-2">Community Analysis</h5>
                  <div className="text-sm text-orange-800 space-y-1">
                    <p>
                      <strong>Current Status:</strong> {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} sector 
                      shows {currentData.corporateControl}% corporate control with emerging community alternatives.
                    </p>
                    <p>
                      <strong>Opportunity:</strong> Growing cooperative networks and mutual aid capacity 
                      indicate potential for increased community sovereignty.
                    </p>
                    <p>
                      <strong>Next Steps:</strong> Focus on expanding {selectedCategory === 'food' ? 'local food systems' : 
                        selectedCategory === 'housing' ? 'community land trusts' : 'renewable energy cooperatives'}.
                    </p>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Resource Sovereignty:</strong> Tracking community ownership and control over 
              essential resources to build economic democracy and reduce corporate dependence.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
