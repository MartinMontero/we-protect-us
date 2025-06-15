
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Target, 
  Users, 
  TrendingUp, 
  Sprout,
  Clock,
  CheckCircle,
  Plus,
  BarChart3
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const ProductionPlanning: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<string>('current');

  const { data: productionPlans } = useQuery({
    queryKey: ['production-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_production_plans')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const getCurrentSeasonPlans = () => {
    const currentMonth = new Date().getMonth();
    let currentSeason = 'spring';
    
    if (currentMonth >= 5 && currentMonth <= 7) currentSeason = 'summer';
    else if (currentMonth >= 8 && currentMonth <= 10) currentSeason = 'fall';
    else if (currentMonth >= 11 || currentMonth <= 1) currentSeason = 'winter';
    
    return productionPlans?.filter(plan => plan.target_season === currentSeason) || [];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'harvesting': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanProgress = (plan: any) => {
    // Simplified progress calculation based on status
    switch (plan.status) {
      case 'planning': return 25;
      case 'active': return 60;
      case 'harvesting': return 85;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const currentSeasonPlans = getCurrentSeasonPlans();

  return (
    <div className="space-y-6">
      {/* Production Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Plans</p>
                <p className="text-3xl font-bold text-green-600">
                  {productionPlans?.filter(p => p.status === 'active').length || 0}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Season</p>
                <p className="text-3xl font-bold text-blue-600">{currentSeasonPlans.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participants</p>
                <p className="text-3xl font-bold text-purple-600">
                  {productionPlans?.reduce((acc, plan) => acc + (plan.participating_assets?.length || 0), 0) || 0}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-3xl font-bold text-orange-600">78%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="current">Current Plans</TabsTrigger>
          <TabsTrigger value="assessment">Needs Assessment</TabsTrigger>
          <TabsTrigger value="coordination">Crop Coordination</TabsTrigger>
          <TabsTrigger value="analytics">Production Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="w-5 h-5" />
                  Active Production Plans
                </CardTitle>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Production Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productionPlans?.map((plan) => (
                  <div key={plan.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">{plan.plan_name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{plan.community_goals}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="capitalize">🌱 {plan.target_season}</span>
                          <span>🏡 {plan.participating_assets?.length || 0} participating assets</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={getStatusColor(plan.status)}>
                          {plan.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progress:</span>
                        <span className="text-sm">{getPlanProgress(plan)}%</span>
                      </div>
                      <Progress value={getPlanProgress(plan)} className="h-2" />
                    </div>

                    {plan.target_crops && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2">Target Crops:</p>
                        <div className="flex flex-wrap gap-1">
                          {Object.keys(plan.target_crops).slice(0, 4).map((crop, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Community Food Needs Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Priority Crops</h3>
                  {[
                    { name: 'Tomatoes', demand: 85, supply: 60 },
                    { name: 'Leafy Greens', demand: 92, supply: 45 },
                    { name: 'Root Vegetables', demand: 78, supply: 70 },
                    { name: 'Herbs', demand: 65, supply: 80 }
                  ].map((crop, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{crop.name}</span>
                        <span className="text-sm text-gray-600">{crop.demand}% demand</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Progress value={crop.demand} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">Community Demand</p>
                        </div>
                        <div className="flex-1">
                          <Progress value={crop.supply} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">Current Supply</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Seasonal Recommendations</h3>
                  <div className="space-y-3">
                    {[
                      { season: 'Spring', recommendations: ['Peas', 'Lettuce', 'Radishes'] },
                      { season: 'Summer', recommendations: ['Tomatoes', 'Peppers', 'Squash'] },
                      { season: 'Fall', recommendations: ['Kale', 'Carrots', 'Beets'] },
                      { season: 'Winter', recommendations: ['Brussels Sprouts', 'Leeks'] }
                    ].map((season, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">{season.season}</h4>
                        <div className="flex flex-wrap gap-1">
                          {season.recommendations.map((crop, cropIndex) => (
                            <Badge key={cropIndex} variant="secondary" className="text-xs">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coordination" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Succession Planting Coordination
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border-2 border-dashed border-green-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <p className="text-green-600 font-medium">Succession Planting Calendar</p>
                  <p className="text-green-500 text-sm">Coordinate timing across community gardens</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Production Analytics & Forecasting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-blue-600 font-medium">Yield Projections</p>
                  </div>
                </div>
                <div className="bg-purple-50 border-2 border-dashed border-purple-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-purple-600 font-medium">Efficiency Metrics</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
