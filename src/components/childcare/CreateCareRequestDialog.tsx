
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, Users, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CreateCareRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCareRequestDialog: React.FC<CreateCareRequestDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    startDate: '',
    locationAddress: '',
    careInstructions: '',
    emergencyInstructions: '',
    pointsOffered: 2,
    isRecurring: false,
    lastMinute: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to create care requests.",
          variant: "destructive",
        });
        return;
      }

      // Combine date and time
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.startDate}T${formData.endTime}`);

      // Check if this is a last-minute request (within 4 hours)
      const hoursUntilStart = (startDateTime.getTime() - Date.now()) / (1000 * 60 * 60);
      const isLastMinute = hoursUntilStart <= 4;

      const { error } = await supabase
        .from('care_requests')
        .insert({
          requesting_parent_id: user.id,
          children_ids: [], // TODO: Add child selection
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
          location_address: formData.locationAddress,
          care_instructions: formData.careInstructions,
          emergency_instructions: formData.emergencyInstructions,
          points_offered: formData.pointsOffered,
          is_recurring: formData.isRecurring,
          last_minute_request: isLastMinute,
        });

      if (error) throw error;

      toast({
        title: "Care request created",
        description: "Your care request has been posted to the community.",
      });

      onOpenChange(false);
      setFormData({
        startTime: '',
        endTime: '',
        startDate: '',
        locationAddress: '',
        careInstructions: '',
        emergencyInstructions: '',
        pointsOffered: 2,
        isRecurring: false,
        lastMinute: false,
      });
    } catch (error) {
      toast({
        title: "Error creating request",
        description: "Failed to create care request. Please try again.",
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
            Request Childcare
          </DialogTitle>
          <DialogDescription>
            Create a childcare request for community members to accept
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Care Location
            </Label>
            <Input
              id="location"
              placeholder="Enter address where care will take place"
              value={formData.locationAddress}
              onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
              required
            />
          </div>

          {/* Care Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Care Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Special instructions, routines, activities, etc."
              value={formData.careInstructions}
              onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
              rows={3}
            />
          </div>

          {/* Emergency Instructions */}
          <div className="space-y-2">
            <Label htmlFor="emergency" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Emergency Instructions
            </Label>
            <Textarea
              id="emergency"
              placeholder="Important medical info, emergency procedures, contacts"
              value={formData.emergencyInstructions}
              onChange={(e) => setFormData({ ...formData, emergencyInstructions: e.target.value })}
              rows={2}
            />
          </div>

          {/* Points Offered */}
          <div className="space-y-2">
            <Label htmlFor="points">Care Points Offered</Label>
            <Select 
              value={formData.pointsOffered.toString()} 
              onValueChange={(value) => setFormData({ ...formData, pointsOffered: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 point (1 hour or less)</SelectItem>
                <SelectItem value="2">2 points (2-3 hours)</SelectItem>
                <SelectItem value="3">3 points (3-4 hours)</SelectItem>
                <SelectItem value="4">4 points (4-5 hours)</SelectItem>
                <SelectItem value="5">5 points (5+ hours)</SelectItem>
                <SelectItem value="6">6 points (evening/weekend premium)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                checked={formData.isRecurring}
                onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: !!checked })}
              />
              <Label htmlFor="recurring" className="text-sm">
                This is a recurring request
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
