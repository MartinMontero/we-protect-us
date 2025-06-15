
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface PlotWaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PlotWaitlistDialog: React.FC<PlotWaitlistDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    preferred_size: '',
    sun_exposure: '',
    water_access: false,
    raised_bed: false,
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('plot_waitlist')
        .insert({
          user_id: user.id,
          plot_preferences: {
            preferred_size: formData.preferred_size,
            sun_exposure: formData.sun_exposure,
            water_access: formData.water_access,
            raised_bed: formData.raised_bed
          },
          notes: formData.notes || null
        });

      if (error) throw error;

      toast({
        title: "Added to waitlist",
        description: "You've been added to the garden plot waitlist.",
      });

      onOpenChange(false);
      setFormData({
        preferred_size: '',
        sun_exposure: '',
        water_access: false,
        raised_bed: false,
        notes: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Join Plot Waitlist</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preferred_size">Preferred Plot Size</Label>
            <Select
              value={formData.preferred_size}
              onValueChange={(value) => setFormData({ ...formData, preferred_size: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preferred size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (50-100 sq ft)</SelectItem>
                <SelectItem value="medium">Medium (100-150 sq ft)</SelectItem>
                <SelectItem value="large">Large (150+ sq ft)</SelectItem>
                <SelectItem value="any">Any Size</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sun_exposure">Preferred Sun Exposure</Label>
            <Select
              value={formData.sun_exposure}
              onValueChange={(value) => setFormData({ ...formData, sun_exposure: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sun preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full_sun">Full Sun</SelectItem>
                <SelectItem value="partial_sun">Partial Sun</SelectItem>
                <SelectItem value="partial_shade">Partial Shade</SelectItem>
                <SelectItem value="full_shade">Full Shade</SelectItem>
                <SelectItem value="any">Any Exposure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Plot Features (preferred)</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="water_access"
                  checked={formData.water_access}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, water_access: checked as boolean })
                  }
                />
                <Label htmlFor="water_access" className="text-sm">Water access nearby</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="raised_bed"
                  checked={formData.raised_bed}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, raised_bed: checked as boolean })
                  }
                />
                <Label htmlFor="raised_bed" className="text-sm">Raised bed</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any specific needs or preferences..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Adding...' : 'Join Waitlist'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
