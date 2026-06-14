
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { TablesInsert } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AddToolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  { value: 'power_tools', label: 'Power Tools' },
  { value: 'garden_equipment', label: 'Garden Equipment' },
  { value: 'kitchen_appliances', label: 'Kitchen Appliances' },
  { value: 'camping_gear', label: 'Camping Gear' },
  { value: 'party_supplies', label: 'Party Supplies' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'hand_tools', label: 'Hand Tools' },
  { value: 'cleaning_equipment', label: 'Cleaning Equipment' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'sports_recreation', label: 'Sports & Recreation' },
  { value: 'home_improvement', label: 'Home Improvement' },
  { value: 'art_craft', label: 'Art & Craft' }
];

const conditions = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'needs_repair', label: 'Needs Repair' }
];

export const AddToolDialog: React.FC<AddToolDialogProps> = ({ open, onOpenChange }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    condition: 'good',
    location_description: '',
    estimated_value: '',
    purchase_date: ''
  });

  const createTool = useMutation({
    mutationFn: async (toolData: { estimated_value?: string; purchase_date?: string; [key: string]: unknown }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('tools')
        .insert({
          ...toolData,
          owner_id: user.id,
          estimated_value: toolData.estimated_value ? parseFloat(toolData.estimated_value) : null,
          purchase_date: toolData.purchase_date || null
        } as TablesInsert<'tools'>)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Tool Added',
        description: 'Your tool has been added to the community library.',
      });
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      onOpenChange(false);
      setFormData({
        name: '',
        description: '',
        category: '',
        condition: 'good',
        location_description: '',
        estimated_value: '',
        purchase_date: ''
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to add tool. Please try again.',
        variant: 'destructive',
      });
      console.error('Add tool error:', error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    createTool.mutate(formData);
  };

  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Tool to Library</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Tool Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="e.g., DeWalt Circular Saw"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="condition">Condition</Label>
            <Select value={formData.condition} onValueChange={(value) => updateFormData('condition', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((cond) => (
                  <SelectItem key={cond.value} value={cond.value}>
                    {cond.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Describe the tool, what it's used for, any accessories included..."
            />
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location_description}
              onChange={(e) => updateFormData('location_description', e.target.value)}
              placeholder="e.g., Community Center, My Garage"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value">Estimated Value ($)</Label>
              <Input
                id="value"
                type="number"
                value={formData.estimated_value}
                onChange={(e) => updateFormData('estimated_value', e.target.value)}
                placeholder="150"
              />
            </div>
            
            <div>
              <Label htmlFor="purchase_date">Purchase Date</Label>
              <Input
                id="purchase_date"
                type="date"
                value={formData.purchase_date}
                onChange={(e) => updateFormData('purchase_date', e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={createTool.isPending}>
              {createTool.isPending ? 'Adding...' : 'Add Tool'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
