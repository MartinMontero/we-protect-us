
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlotWaitlistDialog } from './PlotWaitlistDialog';
import { Search, Plus, Users, History } from 'lucide-react';

export const PlotManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);

  const { data: plots, isLoading } = useQuery({
    queryKey: ['garden-plots-management'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('garden_plots')
        .select(`
          *,
          current_gardener:profiles(pseudonym),
          current_plantings(crop_name, variety, planted_date)
        `)
        .order('plot_number');
      if (error) throw error;
      return data;
    }
  });

  const { data: waitlist } = useQuery({
    queryKey: ['plot-waitlist'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plot_waitlist')
        .select(`
          *,
          user:profiles(pseudonym)
        `)
        .eq('active', true)
        .order('priority_score', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const filteredPlots = plots?.filter(plot => {
    const matchesSearch = plot.plot_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plot.current_gardener?.pseudonym?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plot.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string | null) => {
    switch (status) {
      case 'available': return 'default';
      case 'assigned': return 'secondary';
      case 'reserved': return 'outline';
      case 'maintenance': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Plot Management</h2>
          <p className="text-gray-600">Manage garden plots, assignments, and waitlist</p>
        </div>
        <Button 
          onClick={() => setShowWaitlistDialog(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Join Waitlist
        </Button>
      </div>

      <Tabs defaultValue="plots" className="space-y-6">
        <TabsList>
          <TabsTrigger value="plots">Garden Plots</TabsTrigger>
          <TabsTrigger value="waitlist">Waitlist ({waitlist?.length || 0})</TabsTrigger>
          <TabsTrigger value="history">Plot History</TabsTrigger>
        </TabsList>

        <TabsContent value="plots" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search plots or gardeners..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Plots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlots?.map((plot) => (
              <Card key={plot.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Plot {plot.plot_number}</CardTitle>
                    <Badge variant={getStatusBadgeVariant(plot.status)}>
                      {plot.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {plot.size_sqft} sq ft • {plot.sun_exposure.replace('_', ' ')} • {plot.soil_type}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plot.current_gardener && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{plot.current_gardener.pseudonym}</span>
                    </div>
                  )}
                  
                  {plot.current_plantings && plot.current_plantings.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Currently Growing:</p>
                      <div className="flex flex-wrap gap-1">
                        {plot.current_plantings.slice(0, 3).map((planting: any, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {planting.crop_name}
                          </Badge>
                        ))}
                        {plot.current_plantings.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{plot.current_plantings.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {plot.water_access && (
                      <Badge variant="secondary" className="text-xs">Water Access</Badge>
                    )}
                    {plot.raised_bed && (
                      <Badge variant="secondary" className="text-xs">Raised Bed</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="waitlist">
          <Card>
            <CardHeader>
              <CardTitle>Plot Waitlist</CardTitle>
              <CardDescription>
                Community members waiting for plot assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {waitlist && waitlist.length > 0 ? (
                <div className="space-y-4">
                  {waitlist.map((entry, index) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{entry.user?.pseudonym}</p>
                          <p className="text-sm text-gray-600">
                            Joined {entry.join_date ? new Date(entry.join_date).toLocaleDateString() : ''}
                          </p>
                          {entry.notes && (
                            <p className="text-sm text-gray-500 mt-1">{entry.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Priority Score: {entry.priority_score}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No one is currently on the waitlist</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Plot History
              </CardTitle>
              <CardDescription>
                Historical assignments and crop rotations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Plot history tracking coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <PlotWaitlistDialog 
        open={showWaitlistDialog}
        onOpenChange={setShowWaitlistDialog}
      />
    </div>
  );
};
