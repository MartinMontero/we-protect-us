
import React from 'react';
import type { Tables } from '@/integrations/supabase/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, User, DollarSign } from 'lucide-react';

interface ToolDetailsDialogProps {
  tool: Tables<'tools'> & { owner?: { pseudonym?: string; full_name?: string } | null };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryLabels = {
  power_tools: 'Power Tools',
  garden_equipment: 'Garden Equipment',
  kitchen_appliances: 'Kitchen Appliances',
  camping_gear: 'Camping Gear',
  party_supplies: 'Party Supplies',
  electronics: 'Electronics',
  hand_tools: 'Hand Tools',
  cleaning_equipment: 'Cleaning Equipment',
  automotive: 'Automotive',
  sports_recreation: 'Sports & Recreation',
  home_improvement: 'Home Improvement',
  art_craft: 'Art & Craft'
};

const conditionColors = {
  excellent: 'bg-green-100 text-green-800',
  good: 'bg-blue-100 text-blue-800',
  fair: 'bg-yellow-100 text-yellow-800',
  needs_repair: 'bg-red-100 text-red-800',
  out_of_service: 'bg-gray-100 text-gray-800'
};

export const ToolDetailsDialog: React.FC<ToolDetailsDialogProps> = ({
  tool,
  open,
  onOpenChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{tool.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Photos */}
          {tool.photos && tool.photos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.photos.map((photo: string, index: number) => (
                <img 
                  key={index}
                  src={photo} 
                  alt={`${tool.name} ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Category</h3>
              <Badge variant="outline">
                {categoryLabels[tool.category as keyof typeof categoryLabels]}
              </Badge>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Condition</h3>
              <Badge className={conditionColors[tool.condition as keyof typeof conditionColors]}>
                {tool.condition.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{tool.description}</p>
          </div>
          
          {/* Location */}
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {tool.location_description || 'Location not specified'}
          </div>
          
          {/* Owner */}
          {tool.owner && (
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              Shared by {tool.owner.pseudonym}
            </div>
          )}
          
          {/* Value */}
          {tool.estimated_value && (
            <div className="flex items-center text-gray-600">
              <DollarSign className="w-4 h-4 mr-2" />
              Estimated value: ${tool.estimated_value}
            </div>
          )}
          
          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Added {tool.created_at ? new Date(tool.created_at).toLocaleDateString() : ''}
            </div>
            {tool.purchase_date && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Purchased {new Date(tool.purchase_date).toLocaleDateString()}
              </div>
            )}
          </div>
          
          {/* QR Code */}
          {tool.qr_code && (
            <div>
              <h3 className="font-semibold mb-2">QR Code</h3>
              <p className="text-sm text-gray-600">QR Code: {tool.qr_code}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
