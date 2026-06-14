
import React, { useState } from 'react';
import type { Tables } from '@/integrations/supabase/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ToolReservationDialogProps {
  tool: Tables<'tools'>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ToolReservationDialog: React.FC<ToolReservationDialogProps> = ({
  tool,
  open,
  onOpenChange
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [notes, setNotes] = useState('');

  const createReservation = useMutation({
    mutationFn: async (reservationData: { startDate: Date; endDate: Date; notes: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('tool_reservations')
        .insert({
          tool_id: tool.id,
          borrower_id: user.id,
          start_date: reservationData.startDate.toISOString(),
          end_date: reservationData.endDate.toISOString(),
          notes: reservationData.notes,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Reservation Requested',
        description: 'Your reservation request has been submitted for approval.',
      });
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      onOpenChange(false);
      setStartDate(undefined);
      setEndDate(undefined);
      setNotes('');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create reservation. Please try again.',
        variant: 'destructive',
      });
      console.error('Reservation error:', error);
    }
  });

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      toast({
        title: 'Error',
        description: 'Please select both start and end dates.',
        variant: 'destructive',
      });
      return;
    }

    if (startDate >= endDate) {
      toast({
        title: 'Error',
        description: 'End date must be after start date.',
        variant: 'destructive',
      });
      return;
    }

    createReservation.mutate({ startDate, endDate, notes });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reserve {tool.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date < new Date() || (!!startDate && date <= startDate)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requests or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1"
              disabled={createReservation.isPending}
            >
              {createReservation.isPending ? 'Submitting...' : 'Request Reservation'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
