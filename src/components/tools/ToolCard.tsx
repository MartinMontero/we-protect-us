
import React, { useState } from 'react';
import type { Tables } from '@/integrations/supabase/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, QrCode, Settings } from 'lucide-react';
import { ToolReservationDialog } from './ToolReservationDialog';
import { ToolDetailsDialog } from './ToolDetailsDialog';

interface ToolCardProps {
  tool: Tables<'tools'>;
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

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const [showReservation, setShowReservation] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
        <div onClick={() => setShowDetails(true)}>
          <div className="aspect-square bg-gray-100 rounded-t-lg relative overflow-hidden">
            {tool.photos && tool.photos.length > 0 ? (
              <img 
                src={tool.photos[0]} 
                alt={tool.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Settings className="w-12 h-12" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Badge className={conditionColors[tool.condition as keyof typeof conditionColors]}>
                {tool.condition.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="mb-2">
              <Badge variant="outline" className="text-xs">
                {categoryLabels[tool.category as keyof typeof categoryLabels]}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
              {tool.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {tool.description}
            </p>
            
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {tool.location_description || 'Location not specified'}
            </div>
            
            {tool.estimated_value && (
              <div className="text-sm text-gray-600">
                Est. Value: ${tool.estimated_value}
              </div>
            )}
          </CardContent>
        </div>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            disabled={!tool.availability_status}
            onClick={() => setShowReservation(true)}
          >
            <Calendar className="w-4 h-4 mr-1" />
            {tool.availability_status ? 'Reserve' : 'Unavailable'}
          </Button>
          
          {tool.qr_code && (
            <Button size="sm" variant="outline">
              <QrCode className="w-4 h-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <ToolReservationDialog 
        tool={tool}
        open={showReservation}
        onOpenChange={setShowReservation}
      />
      
      <ToolDetailsDialog 
        tool={tool}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
};
