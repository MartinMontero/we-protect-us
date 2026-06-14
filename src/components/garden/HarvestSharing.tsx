
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Share, Plus, MapPin, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

export const HarvestSharing: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newShare, setNewShare] = useState({
    crop_name: '',
    quantity: '',
    unit: 'lbs',
    location_description: '',
    notes: ''
  });

  const { data: harvestShares, isLoading } = useQuery({
    queryKey: ['harvest-shares'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('harvest_sharing')
        .select(`
          *,
          gardener:profiles!harvest_sharing_gardener_id_fkey(pseudonym),
          claimer:profiles!harvest_sharing_claimed_by_fkey(pseudonym)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const addShareMutation = useMutation({
    mutationFn: async (shareData: any) => {
      const { data, error } = await supabase
        .from('harvest_sharing')
        .insert({
          ...shareData,
          gardener_id: user?.id
        });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvest-shares'] });
      toast({
        title: "Harvest shared!",
        description: "Your harvest has been added to the sharing board.",
      });
      setShowAddDialog(false);
      setNewShare({
        crop_name: '',
        quantity: '',
        unit: 'lbs',
        location_description: '',
        notes: ''
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const claimShareMutation = useMutation({
    mutationFn: async (shareId: string) => {
      const { data, error } = await supabase
        .from('harvest_sharing')
        .update({
          claimed_by: user?.id,
          claimed_at: new Date().toISOString()
        })
        .eq('id', shareId);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvest-shares'] });
      toast({
        title: "Harvest claimed!",
        description: "You've claimed this harvest. Contact the gardener to arrange pickup.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleAddShare = (e: React.FormEvent) => {
    e.preventDefault();
    addShareMutation.mutate(newShare);
  };

  const availableShares = harvestShares?.filter(share => !share.claimed_by) || [];
  const claimedShares = harvestShares?.filter(share => share.claimed_by) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Harvest Sharing</h2>
          <p className="text-gray-600">Share your surplus and claim fresh produce from fellow gardeners</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Share Harvest
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Your Harvest</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddShare} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="crop_name">Crop Name</Label>
                <Input
                  id="crop_name"
                  placeholder="e.g., Tomatoes, Lettuce, Zucchini"
                  value={newShare.crop_name}
                  onChange={(e) => setNewShare({ ...newShare, crop_name: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 5, 2.5"
                    value={newShare.quantity}
                    onChange={(e) => setNewShare({ ...newShare, quantity: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select
                    value={newShare.unit}
                    onValueChange={(value) => setNewShare({ ...newShare, unit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbs">Pounds</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="bunches">Bunches</SelectItem>
                      <SelectItem value="heads">Heads</SelectItem>
                      <SelectItem value="items">Individual Items</SelectItem>
                      <SelectItem value="bags">Bags</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Pickup Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Plot A1, Garden shed, North entrance"
                  value={newShare.location_description}
                  onChange={(e) => setNewShare({ ...newShare, location_description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional details, quality notes, best before date..."
                  value={newShare.notes}
                  onChange={(e) => setNewShare({ ...newShare, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={addShareMutation.isPending} className="flex-1">
                  {addShareMutation.isPending ? 'Sharing...' : 'Share Harvest'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Available Shares */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share className="w-5 h-5" />
            Available Harvests ({availableShares.length})
          </CardTitle>
          <CardDescription>
            Fresh produce available for pickup from community gardeners
          </CardDescription>
        </CardHeader>
        <CardContent>
          {availableShares.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableShares.map((share) => (
                <Card key={share.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-green-800">{share.crop_name}</h3>
                        <p className="text-green-600">
                          {share.quantity} {share.unit}
                        </p>
                      </div>
                      <Badge className="bg-green-600">Available</Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>Shared by {share.gardener?.pseudonym}</span>
                      </div>
                      
                      {share.location_description && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{share.location_description}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Shared {format(new Date(share.created_at), 'MMM d, yyyy')}</span>
                      </div>
                      
                      {share.notes && (
                        <p className="text-gray-700 mt-2 p-2 bg-white rounded border">
                          {share.notes}
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full mt-3 bg-green-600 hover:bg-green-700"
                      onClick={() => claimShareMutation.mutate(share.id)}
                      disabled={claimShareMutation.isPending}
                    >
                      Claim Harvest
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Share className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No harvests available right now</p>
              <p className="text-sm">Check back later or share your own surplus!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Claims */}
      {claimedShares.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Claimed</CardTitle>
            <CardDescription>
              Harvests that have been claimed by community members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {claimedShares.slice(0, 5).map((share) => (
                <div key={share.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{share.crop_name}</p>
                      <p className="text-sm text-gray-600">
                        {share.quantity} {share.unit} • Shared by {share.gardener?.pseudonym}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>Claimed by {share.claimer?.pseudonym}</p>
                    <p>{format(new Date(share.claimed_at), 'MMM d')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
