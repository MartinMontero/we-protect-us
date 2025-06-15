
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Package, Wrench, User } from 'lucide-react';

interface ResourceItem {
  id: string;
  name: string;
  type: 'tool' | 'food' | 'book' | 'equipment';
  location: string;
  status: 'available' | 'borrowed' | 'maintenance';
  owner: string;
  borrower?: string;
  dueDate?: string;
  condition: 'excellent' | 'good' | 'fair' | 'needs_repair';
}

interface CommunityResource {
  id: string;
  name: string;
  type: 'fridge' | 'library' | 'toolshed';
  address: string;
  coordinator: string;
  items: ResourceItem[];
  operatingHours: string;
  guidelines: string[];
}

interface ResourceMapProps {
  resources: CommunityResource[];
  selectedResource: CommunityResource | null;
  onResourceSelect: (resource: CommunityResource) => void;
}

export const ResourceMap: React.FC<ResourceMapProps> = ({
  resources,
  selectedResource,
  onResourceSelect
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map(resource => (
        <Card 
          key={resource.id}
          className={`cursor-pointer transition-colors ${
            selectedResource?.id === resource.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
          onClick={() => onResourceSelect(resource)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm">{resource.name}</h3>
              <Badge variant="outline" className="text-xs">
                {resource.type}
              </Badge>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>{resource.address}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <User className="w-3 h-3" />
                <span>Coordinator: {resource.coordinator}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Package className="w-3 h-3" />
                <span>{resource.items.length} items available</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
