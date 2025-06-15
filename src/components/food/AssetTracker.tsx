
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  Apple, 
  TreePine, 
  Egg, 
  Home, 
  Calendar,
  TrendingUp,
  MapPin,
  Edit,
  BarChart3
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface AssetStats {
  totalAssets: number;
  gardenCount: number;
  treeCount: number;
  seasonalProduction: Record<string, number>;
}

export const AssetTracker: React.FC = () => {
  const [selectedAssetType, setSelectedAssetType] = useState<string>('all');

  const { data: assets } = useQuery({
    queryKey: ['food-assets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_assets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const getAssetStats = (): AssetStats => {
    if (!assets) return { totalAssets: 0, gardenCount: 0, treeCount: 0, seasonalProduction: {} };

    return {
      totalAssets: assets.length,
      gardenCount: assets.filter(a => a.asset_type === 'garden').length,
      treeCount: assets.filter(a => ['fruit_tree', 'nut_tree'].includes(a.asset_type)).length,
      seasonalProduction: assets.reduce((acc, asset) => {
        asset.harvest_seasons?.forEach(season => {
          acc[season] = (acc[season] || 0) + 1;
        });
        return acc;
      }, {} as Record<string, number>)
    };
  };

  const stats = getAssetStats();

  const assetTypes = [
    { value: 'all', label: 'All Assets', icon: Leaf },
    { value: 'garden', label: 'Gardens', icon: Leaf },
    { value: 'fruit_tree', label: 'Fruit Trees', icon: Apple },
    { value: 'nut_tree', label: 'Nut Trees', icon: TreePine },
    { value: 'foraging_spot', label: 'Foraging', icon: TreePine },
    { value: 'chicken_coop', label: 'Poultry', icon: Egg },
    { value: 'beehive', label: 'Beehives', icon: Home },
    { value: 'indoor_growing', label: 'Indoor', icon: Home }
  ];

  const filteredAssets = assets?.filter(asset => 
    selectedAssetType === 'all' || asset.asset_type === selectedAssetType
  );

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalAssets}</p>
              </div>
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gardens</p>
                <p className="text-3xl font-bold text-blue-600">{stats.gardenCount}</p>
              </div>
              <Leaf className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fruit/Nut Trees</p>
                <p className="text-3xl font-bold text-orange-600">{stats.treeCount}</p>
              </div>
              <Apple className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Peak Season</p>
                <p className="text-lg font-bold text-purple-600 capitalize">
                  {Object.entries(stats.seasonalProduction).length > 0 
                    ? Object.entries(stats.seasonalProduction).reduce((a, b) => 
                        stats.seasonalProduction[a[0]] > stats.seasonalProduction[b[0]] ? a : b
                      )[0].replace('_', ' ')
                    : 'N/A'
                  }
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Management */}
      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="inventory">Asset Inventory</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Planning</TabsTrigger>
          <TabsTrigger value="analytics">Production Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          {/* Asset Type Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {assetTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Button
                      key={type.value}
                      variant={selectedAssetType === type.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedAssetType(type.value)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {type.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Asset List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets?.map((asset) => (
              <Card key={asset.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{asset.asset_name}</h3>
                      <p className="text-sm text-gray-500 capitalize flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {asset.asset_type.replace('_', ' ')}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {asset.location_description && (
                    <p className="text-sm text-gray-600 mb-3">
                      {asset.location_description}
                    </p>
                  )}

                  {asset.harvest_seasons && asset.harvest_seasons.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">Harvest Seasons:</p>
                      <div className="flex flex-wrap gap-1">
                        {asset.harvest_seasons.map((season, index) => (
                          <Badge key={index} variant="outline" className="text-xs capitalize">
                            {season.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {asset.estimated_yield_per_season && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Est. Yield:</span> {asset.estimated_yield_per_season}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Seasonal Production Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['spring', 'summer', 'fall', 'winter'].map((season) => (
                  <div key={season} className="text-center p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold capitalize mb-2">{season}</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {stats.seasonalProduction[season] || 0}
                    </p>
                    <p className="text-sm text-gray-600">Active Assets</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Production Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Production Analytics Dashboard</p>
                  <p className="text-gray-500 text-sm">Yield tracking, efficiency metrics, and forecasting</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
