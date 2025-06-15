
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CreateActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivityCreated: () => void;
}

export const CreateActivityDialog: React.FC<CreateActivityDialogProps> = ({
  open,
  onOpenChange,
  onActivityCreated,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    activityType: '',
    date: '',
    time: '',
    locationName: '',
    locationAddress: '',
    maxChildren: '',
    ageMin: '',
    ageMax: '',
    costPerChild: '',
    requiresPermissionSlip: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to create activities.",
          variant: "destructive",
        });
        return;
      }

      const scheduledDate = new Date(`${formData.date}T${formData.time}`);

      const { error } = await supabase
        .from('group_activities')
        .insert({
          organizer_id: user.id,
          title: formData.title,
          description: formData.description || null,
          activity_type: formData.activityType,
          scheduled_date: scheduledDate.toISOString(),
          location_name: formData.locationName,
          location_address: formData.locationAddress || null,
          max_children: formData.maxChildren ? parseInt(formData.maxChildren) : null,
          age_min: formData.ageMin ? parseInt(formData.ageMin) : null,
          age_max: formData.ageMax ? parseInt(formData.ageMax) : null,
          cost_per_child: formData.costPerChild ? parseFloat(formData.costPerChild) : 0,
          requires_permission_slip: formData.requiresPermissionSlip,
        });

      if (error) throw error;

      toast({
        title: "Activity created",
        description: "Your group activity has been posted to the community.",
      });

      onOpenChange(false);
      onActivityCreated();
      setFormData({
        title: '',
        description: '',
        activityType: '',
        date: '',
        time: '',
        locationName: '',
        locationAddress: '',
        maxChildren: '',
        ageMin: '',
        ageMax: '',
        costPerChild: '',
        requiresPermissionSlip: false,
      });
    } catch (error) {
      toast({
        title: "Error creating activity",
        description: "Failed to create group activity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Create Group Activity
          </DialogTitle>
          <DialogDescription>
            Organize a fun activity for children in the community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Activity Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Playground Meetup, Story Time, Zoo Trip"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Activity Type *</Label>
              <Select value={formData.activityType} onValueChange={(value) => setFormData({ ...formData, activityType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="playground">Playground Meetup</SelectItem>
                  <SelectItem value="story_time">Story Time</SelectItem>
                  <SelectItem value="field_trip">Field Trip</SelectItem>
                  <SelectItem value="birthday_party">Birthday Party Helper</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the activity, what to bring, any special instructions..."
                rows={3}
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="locationName" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location Name *
              </Label>
              <Input
                id="locationName"
                value={formData.locationName}
                onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                placeholder="e.g., Central Park Playground, Main Library"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationAddress">Full Address</Label>
              <Input
                id="locationAddress"
                value={formData.locationAddress}
                onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                placeholder="Full address for GPS navigation"
              />
            </div>
          </div>

          {/* Participant Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxChildren" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Max Children
              </Label>
              <Input
                id="maxChildren"
                type="number"
                value={formData.maxChildren}
                onChange={(e) => setFormData({ ...formData, maxChildren: e.target.value })}
                placeholder="No limit"
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageMin">Min Age</Label>
              <Input
                id="ageMin"
                type="number"
                value={formData.ageMin}
                onChange={(e) => setFormData({ ...formData, ageMin: e.target.value })}
                placeholder="0"
                min="0"
                max="18"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageMax">Max Age</Label>
              <Input
                id="ageMax"
                type="number"
                value={formData.ageMax}
                onChange={(e) => setFormData({ ...formData, ageMax: e.target.value })}
                placeholder="12"
                min="0"
                max="18"
              />
            </div>
          </div>

          {/* Cost */}
          <div className="space-y-2">
            <Label htmlFor="cost" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Cost per Child
            </Label>
            <Input
              id="cost"
              type="number"
              step="0.01"
              value={formData.costPerChild}
              onChange={(e) => setFormData({ ...formData, costPerChild: e.target.value })}
              placeholder="0.00"
              min="0"
            />
          </div>

          {/* Permission Slip */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="permission"
              checked={formData.requiresPermissionSlip}
              onCheckedChange={(checked) => setFormData({ ...formData, requiresPermissionSlip: !!checked })}
            />
            <Label htmlFor="permission" className="text-sm">
              Requires permission slip (for field trips or activities with potential risks)
            </Label>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Activity'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
