
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Recycle, Package, Sprout, ShoppingCart, Thermometer, Calendar } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export const ResourceManagement: React.FC = () => {
  const { data: compostBins } = useQuery({
    queryKey: ['compost-bins'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compost_bins')
        .select('*')
        .order('bin_name');
      if (error) throw error;
      return data;
    }
  });

  const { data: seedLibrary } = useQuery({
    queryKey: ['seed-library'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seed_library')
        .select(`
          *,
          donor:profiles(pseudonym)
        `)
        .order('crop_type', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const { data: bulkOrders } = useQuery({
    queryKey: ['bulk-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bulk_orders')
        .select(`
          *,
          organizer:profiles(pseudonym),
          participants:bulk_order_participants(
            quantity_requested,
            participant:profiles(pseudonym)
          )
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const getCompostStageColor = (stage: string | null) => {
    switch (stage) {
      case 'filling': return 'bg-blue-100 text-blue-800';
      case 'composting': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'empty': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusColor = (status: string | null) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-yellow-100 text-yellow-800';
      case 'ordered': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Resource Management</h2>
        <p className="text-gray-600">Manage compost, seeds, and coordinate bulk purchases</p>
      </div>

      <Tabs defaultValue="compost" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compost" className="flex items-center gap-2">
            <Recycle className="w-4 h-4" />
            Compost
          </TabsTrigger>
          <TabsTrigger value="seeds" className="flex items-center gap-2">
            <Sprout className="w-4 h-4" />
            Seed Library
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Bulk Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compost">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="w-5 h-5" />
                Compost Bin Management
              </CardTitle>
              <CardDescription>
                Track compost progress and schedule turning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {compostBins?.map((bin) => (
                  <Card key={bin.id} className="border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{bin.bin_name}</h3>
                        <Badge className={getCompostStageColor(bin.current_stage)}>
                          {bin.current_stage}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        {bin.location_description && (
                          <p className="text-sm text-gray-600">{bin.location_description}</p>
                        )}
                        
                        {bin.temperature && (
                          <div className="flex items-center gap-2 text-sm">
                            <Thermometer className="w-4 h-4 text-orange-500" />
                            <span>{bin.temperature}°F</span>
                          </div>
                        )}
                        
                        {bin.last_turned_date && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Last turned {differenceInDays(new Date(), new Date(bin.last_turned_date))} days ago
                            </span>
                          </div>
                        )}
                        
                        {bin.estimated_ready_date && (
                          <div className="text-sm">
                            <span className="text-gray-600">Ready: </span>
                            <span className="font-medium">
                              {format(new Date(bin.estimated_ready_date), 'MMM d, yyyy')}
                            </span>
                          </div>
                        )}
                        
                        {bin.notes && (
                          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                            {bin.notes}
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <Button size="sm" variant="outline" className="w-full">
                          Update Status
                        </Button>
                        {bin.current_stage === 'composting' && (
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                            Mark as Turned
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seeds">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="w-5 h-5" />
                    Community Seed Library
                  </CardTitle>
                  <CardDescription>
                    Free seeds donated by community gardeners
                  </CardDescription>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Donate Seeds
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {seedLibrary?.map((seed) => (
                  <Card key={seed.id} className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-green-800">{seed.variety_name}</h3>
                          <p className="text-green-600 text-sm">{seed.crop_type}</p>
                        </div>
                        <Badge className={(seed.quantity_available ?? 0) > 0 ? 'bg-green-600' : 'bg-gray-400'}>
                          {seed.quantity_available ?? 0} seeds
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        {seed.harvest_year && (
                          <p><strong>Harvest Year:</strong> {seed.harvest_year}</p>
                        )}
                        
                        {seed.days_to_maturity && (
                          <p><strong>Days to Maturity:</strong> {seed.days_to_maturity}</p>
                        )}
                        
                        {seed.germination_rate && (
                          <div>
                            <p><strong>Germination Rate:</strong> {seed.germination_rate}%</p>
                            <Progress value={seed.germination_rate} className="h-2 mt-1" />
                          </div>
                        )}
                        
                        {seed.donor && (
                          <p className="text-gray-600">
                            <strong>Donated by:</strong> {seed.donor.pseudonym}
                          </p>
                        )}
                        
                        {seed.planting_instructions && (
                          <div className="mt-3">
                            <p className="font-medium text-gray-700 mb-1">Planting Instructions:</p>
                            <p className="text-gray-600 text-xs bg-white p-2 rounded border">
                              {seed.planting_instructions}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full mt-3 bg-green-600 hover:bg-green-700"
                        disabled={seed.quantity_available === 0}
                      >
                        {(seed.quantity_available ?? 0) > 0 ? 'Request Seeds' : 'Out of Stock'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Bulk Orders
                  </CardTitle>
                  <CardDescription>
                    Coordinate group purchases for better prices
                  </CardDescription>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Start New Order
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bulkOrders?.map((order) => (
                  <Card key={order.id} className="border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{order.item_name}</h3>
                          <p className="text-gray-600">
                            Organized by {order.organizer?.pseudonym}
                          </p>
                        </div>
                        <Badge className={getOrderStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        {order.unit_price && (
                          <div>
                            <p className="text-sm text-gray-600">Unit Price</p>
                            <p className="font-medium">${order.unit_price}</p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm text-gray-600">Minimum Quantity</p>
                          <p className="font-medium">{order.minimum_quantity || 'N/A'}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600">Current Orders</p>
                          <p className="font-medium">{order.current_quantity || 0}</p>
                        </div>
                        
                        {order.order_deadline && (
                          <div>
                            <p className="text-sm text-gray-600">Deadline</p>
                            <p className="font-medium">
                              {format(new Date(order.order_deadline), 'MMM d')}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {order.minimum_quantity && order.current_quantity && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress to minimum order</span>
                            <span>{Math.round((order.current_quantity / order.minimum_quantity) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(order.current_quantity / order.minimum_quantity) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}
                      
                      {order.participants && order.participants.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Participants ({order.participants.length})
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {order.participants.slice(0, 5).map((participant: any, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {participant.participant?.pseudonym} ({participant.quantity_requested})
                              </Badge>
                            ))}
                            {order.participants.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{order.participants.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {order.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded mb-4">
                          {order.notes}
                        </p>
                      )}
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Join Order
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
