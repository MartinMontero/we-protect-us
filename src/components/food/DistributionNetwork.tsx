
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Truck, 
  Package, 
  Thermometer, 
  Clock, 
  MapPin, 
  Users,
  AlertCircle,
  Plus,
  RefreshCw
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const DistributionNetwork: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const { data: distributionPoints } = useQuery({
    queryKey: ['distribution-points'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_distribution_points')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: gleaningOps } = useQuery({
    queryKey: ['gleaning-opportunities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gleaning_opportunities')
        .select('*')
        .order('harvest_date', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const getPointTypeColor = (type: string) => {
    switch (type) {
      case 'pantry': return 'bg-blue-100 text-blue-800';
      case 'fridge': return 'bg-green-100 text-green-800';
      case 'mobile': return 'bg-purple-100 text-purple-800';
      case 'gleaning': return 'bg-orange-100 text-orange-800';
      case 'meal_share': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPoints = distributionPoints?.filter(point => 
    selectedType === 'all' || point.distribution_type === selectedType
  );

  return (
    <div className="space-y-6">
      {/* Distribution Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Distribution Points</p>
                <p className="text-3xl font-bold text-blue-600">{distributionPoints?.length || 0}</p>
              </div>
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Pantries</p>
                <p className="text-3xl font-bold text-green-600">
                  {distributionPoints?.filter(p => p.distribution_type === 'pantry').length || 0}
                </p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Community Fridges</p>
                <p className="text-3xl font-bold text-purple-600">
                  {distributionPoints?.filter(p => p.distribution_type === 'fridge').length || 0}
                </p>
              </div>
              <Thermometer className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gleaning Events</p>
                <p className="text-3xl font-bold text-orange-600">{gleaningOps?.length || 0}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="points" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="points">Distribution Points</TabsTrigger>
          <TabsTrigger value="gleaning">Gleaning Coordination</TabsTrigger>
          <TabsTrigger value="routes">Mobile Distribution</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
        </TabsList>

        <TabsContent value="points" className="space-y-6">
          {/* Type Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap gap-2">
                  {['all', 'pantry', 'fridge', 'mobile', 'meal_share'].map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className="capitalize"
                    >
                      {type === 'all' ? 'All Types' : type.replace('_', ' ')}
                    </Button>
                  ))}
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Distribution Point
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Distribution Points List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPoints?.map((point) => (
              <Card key={point.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{point.point_name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {point.address}
                      </p>
                    </div>
                    <Badge className={getPointTypeColor(point.distribution_type)}>
                      {point.distribution_type.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className={getStatusColor('active')}>
                        Active
                      </Badge>
                    </div>

                    {point.distribution_type === 'fridge' && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-1">
                          <Thermometer className="w-3 h-3" />
                          Temperature:
                        </span>
                        <span className="text-sm text-green-600 font-medium">38°F</span>
                      </div>
                    )}

                    {point.operating_hours && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Hours:
                        </span>
                        <span className="text-sm">24/7</span>
                      </div>
                    )}

                    {point.accessibility_features && point.accessibility_features.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-1">Accessibility:</p>
                        <div className="flex flex-wrap gap-1">
                          {point.accessibility_features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gleaning" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Gleaning Opportunities
                </CardTitle>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Gleaning Event
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gleaningOps?.slice(0, 5).map((gleaning) => (
                  <div key={gleaning.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{gleaning.location_name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{gleaning.available_produce}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>📅 {new Date(gleaning.harvest_date).toLocaleDateString()}</span>
                          <span>👥 {gleaning.current_volunteers}/{gleaning.volunteer_spots_needed} volunteers</span>
                          {gleaning.estimated_quantity && (
                            <span>📦 {gleaning.estimated_quantity}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={gleaning.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {gleaning.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Join Event
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Mobile Distribution Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <Truck className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-blue-600 font-medium">Route Planning Dashboard</p>
                  <p className="text-blue-500 text-sm">Optimize delivery routes and scheduling</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Real-time Inventory Management
                </CardTitle>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Inventory
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPoints?.map((point) => (
                  <div key={point.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{point.point_name}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Fresh Produce</span>
                        <Badge className="bg-green-100 text-green-800">High</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Canned Goods</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Dairy Products</span>
                        <Badge className="bg-red-100 text-red-800">Low</Badge>
                      </div>
                    </div>
                    {point.last_restocked && (
                      <p className="text-xs text-gray-500 mt-2">
                        Last restocked: {new Date(point.last_restocked).toLocaleDateString()}
                      </p>
                    )}
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
