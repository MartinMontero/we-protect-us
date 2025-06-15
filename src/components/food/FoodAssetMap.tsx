
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Plus, Filter, Leaf, Apple, TreePine, Egg, Home } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AddFoodAssetDialog } from './AddFoodAssetDialog';

interface FoodAsset {
  id: string;
  asset_name: string;
  asset_type: string;
  location_lat: number;
  location_lng: number;
  location_description?: string;
  harvest_seasons?: string[];
  crops_varieties?: string[];
  estimated_yield_per_season?: string;
  sustainability_notes?: string;
  access_instructions?: string;
  contact_method?: string;
  created_at: string;
}

export const FoodAssetMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const { data: foodAssets, isLoading } = useQuery({
    queryKey: ['food-assets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_assets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as FoodAsset[];
    }
  });

  const filteredAssets = foodAssets?.filter(asset => {
    const matchesSearch = asset.asset_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.location_description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || asset.asset_type === selectedType;
    const matchesSeason = selectedSeason === 'all' || 
                         (asset.harvest_seasons && asset.harvest_seasons.includes(selectedSeason));
    
    return matchesSearch && matchesType && matchesSeason;
  });

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'garden': return Leaf;
      case 'fruit_tree': 
      case 'nut_tree': return Apple;
      case 'foraging_spot': return TreePine;
      case 'chicken_coop': return Egg;
      case 'beehive': return Home;
      case 'indoor_growing': return Home;
      default: return Leaf;
    }
  };

  const getAssetColor = (type: string) => {
    switch (type) {
      case 'garden': return 'bg-green-100 text-green-800';
      case 'fruit_tree': return 'bg-red-100 text-red-800';
      case 'nut_tree': return 'bg-amber-100 text-amber-800';
      case 'foraging_spot': return 'bg-emerald-100 text-emerald-800';
      case 'chicken_coop': return 'bg-orange-100 text-orange-800';
      case 'beehive': return 'bg-yellow-100 text-yellow-800';
      case 'indoor_growing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Food Asset Mapping
            </CardTitle>
            <Button onClick={() => setShowAddDialog(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Food Asset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="garden">Gardens</SelectItem>
                <SelectItem value="fruit_tree">Fruit Trees</SelectItem>
                <SelectItem value="nut_tree">Nut Trees</SelectItem>
                <SelectItem value="foraging_spot">Foraging Spots</SelectItem>
                <SelectItem value="chicken_coop">Chicken Coops</SelectItem>
                <SelectItem value="beehive">Beehives</SelectItem>
                <SelectItem value="indoor_growing">Indoor Growing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger>
                <SelectValue placeholder="Harvest Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                <SelectItem value="spring">Spring</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="fall">Fall</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
                <SelectItem value="year_round">Year Round</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map View Placeholder */}
      <Card>
        <CardContent className="p-6">
          <div className="bg-green-50 border-2 border-dashed border-green-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-green-600 font-medium">Interactive Map View</p>
              <p className="text-green-500 text-sm">
                {filteredAssets?.length || 0} food assets mapped in your area
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets?.map((asset) => {
          const Icon = getAssetIcon(asset.asset_type);
          return (
            <Card key={asset.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getAssetColor(asset.asset_type)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{asset.asset_name}</h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {asset.asset_type.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {asset.location_description && (
                  <p className="text-sm text-gray-600 mb-3">
                    📍 {asset.location_description}
                  </p>
                )}
                
                {asset.crops_varieties && asset.crops_varieties.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Varieties:</p>
                    <div className="flex flex-wrap gap-1">
                      {asset.crops_varieties.slice(0, 3).map((variety, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {variety}
                        </Badge>
                      ))}
                      {asset.crops_varieties.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{asset.crops_varieties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {asset.harvest_seasons && asset.harvest_seasons.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Harvest Seasons:</p>
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
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Estimated Yield:</span> {asset.estimated_yield_per_season}
                  </p>
                )}

                {asset.access_instructions && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Access:</span> {asset.access_instructions}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAssets?.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No food assets found matching your criteria.</p>
            <Button 
              onClick={() => setShowAddDialog(true)} 
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              Add the first food asset
            </Button>
          </CardContent>
        </Card>
      )}

      <AddFoodAssetDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};
