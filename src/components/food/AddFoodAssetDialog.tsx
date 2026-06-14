
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { TablesInsert } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AddFoodAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddFoodAssetDialog: React.FC<AddFoodAssetDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    asset_name: '',
    asset_type: '',
    location_description: '',
    location_lat: '',
    location_lng: '',
    sustainability_notes: '',
    access_instructions: '',
    contact_method: '',
    estimated_yield_per_season: '',
    is_public: true
  });

  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [varieties, setVarieties] = useState<string[]>([]);
  const [newVariety, setNewVariety] = useState('');

  const addVariety = () => {
    if (newVariety.trim() && !varieties.includes(newVariety.trim())) {
      setVarieties([...varieties, newVariety.trim()]);
      setNewVariety('');
    }
  };

  const removeVariety = (variety: string) => {
    setVarieties(varieties.filter(v => v !== variety));
  };

  const toggleSeason = (season: string) => {
    setSelectedSeasons(prev => 
      prev.includes(season) 
        ? prev.filter(s => s !== season)
        : [...prev, season]
    );
  };

  const addAssetMutation = useMutation({
    mutationFn: async (assetData: { location_lat: string; location_lng: string; [key: string]: unknown }) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('food_assets')
        .insert({
          ...assetData,
          owner_id: user.id,
          harvest_seasons: selectedSeasons,
          crops_varieties: varieties,
          location_lat: parseFloat(assetData.location_lat) || null,
          location_lng: parseFloat(assetData.location_lng) || null
        } as TablesInsert<'food_assets'>)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food-assets'] });
      toast({
        title: "Food Asset Added",
        description: "Your food asset has been successfully added to the map.",
      });
      onOpenChange(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add food asset. Please try again.",
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setFormData({
      asset_name: '',
      asset_type: '',
      location_description: '',
      location_lat: '',
      location_lng: '',
      sustainability_notes: '',
      access_instructions: '',
      contact_method: '',
      estimated_yield_per_season: '',
      is_public: true
    });
    setSelectedSeasons([]);
    setVarieties([]);
    setNewVariety('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.asset_name || !formData.asset_type) {
      toast({
        title: "Validation Error",
        description: "Please fill in the required fields.",
        variant: "destructive",
      });
      return;
    }
    addAssetMutation.mutate(formData);
  };

  const seasons = [
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'fall', label: 'Fall' },
    { value: 'winter', label: 'Winter' },
    { value: 'year_round', label: 'Year Round' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Food Asset</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="asset_name">Asset Name *</Label>
              <Input
                id="asset_name"
                value={formData.asset_name}
                onChange={(e) => setFormData(prev => ({ ...prev, asset_name: e.target.value }))}
                placeholder="e.g., Community Garden Plot A"
                required
              />
            </div>

            <div>
              <Label htmlFor="asset_type">Asset Type *</Label>
              <Select 
                value={formData.asset_type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, asset_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="garden">Garden</SelectItem>
                  <SelectItem value="fruit_tree">Fruit Tree</SelectItem>
                  <SelectItem value="nut_tree">Nut Tree</SelectItem>
                  <SelectItem value="foraging_spot">Foraging Spot</SelectItem>
                  <SelectItem value="chicken_coop">Chicken Coop</SelectItem>
                  <SelectItem value="beehive">Beehive</SelectItem>
                  <SelectItem value="indoor_growing">Indoor Growing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="location_description">Location Description</Label>
            <Input
              id="location_description"
              value={formData.location_description}
              onChange={(e) => setFormData(prev => ({ ...prev, location_description: e.target.value }))}
              placeholder="e.g., Behind the community center, next to the playground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location_lat">Latitude</Label>
              <Input
                id="location_lat"
                type="number"
                step="any"
                value={formData.location_lat}
                onChange={(e) => setFormData(prev => ({ ...prev, location_lat: e.target.value }))}
                placeholder="e.g., 40.7128"
              />
            </div>

            <div>
              <Label htmlFor="location_lng">Longitude</Label>
              <Input
                id="location_lng"
                type="number"
                step="any"
                value={formData.location_lng}
                onChange={(e) => setFormData(prev => ({ ...prev, location_lng: e.target.value }))}
                placeholder="e.g., -74.0060"
              />
            </div>
          </div>

          <div>
            <Label>Harvest Seasons</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {seasons.map((season) => (
                <Button
                  key={season.value}
                  type="button"
                  variant={selectedSeasons.includes(season.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSeason(season.value)}
                >
                  {season.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Crops/Varieties</Label>
            <div className="flex gap-2 mt-2 mb-2">
              <Input
                value={newVariety}
                onChange={(e) => setNewVariety(e.target.value)}
                placeholder="e.g., Cherry tomatoes"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVariety())}
              />
              <Button type="button" onClick={addVariety}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {varieties.map((variety, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {variety}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeVariety(variety)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="estimated_yield">Estimated Yield per Season</Label>
            <Input
              id="estimated_yield"
              value={formData.estimated_yield_per_season}
              onChange={(e) => setFormData(prev => ({ ...prev, estimated_yield_per_season: e.target.value }))}
              placeholder="e.g., 20-30 lbs of tomatoes"
            />
          </div>

          <div>
            <Label htmlFor="access_instructions">Access Instructions</Label>
            <Textarea
              id="access_instructions"
              value={formData.access_instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, access_instructions: e.target.value }))}
              placeholder="How can community members access this asset?"
            />
          </div>

          <div>
            <Label htmlFor="sustainability_notes">Sustainability Notes</Label>
            <Textarea
              id="sustainability_notes"
              value={formData.sustainability_notes}
              onChange={(e) => setFormData(prev => ({ ...prev, sustainability_notes: e.target.value }))}
              placeholder="Environmental considerations, organic practices, etc."
            />
          </div>

          <div>
            <Label htmlFor="contact_method">Contact Method</Label>
            <Input
              id="contact_method"
              value={formData.contact_method}
              onChange={(e) => setFormData(prev => ({ ...prev, contact_method: e.target.value }))}
              placeholder="How should people contact you about this asset?"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={addAssetMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {addAssetMutation.isPending ? 'Adding...' : 'Add Asset'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
