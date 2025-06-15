
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, User, Package, Wrench } from 'lucide-react';

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

interface ResourceDetailsProps {
  resource: CommunityResource;
}

export const ResourceDetails: React.FC<ResourceDetailsProps> = ({ resource }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'borrowed': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'needs_repair': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {resource.type === 'fridge' && <Package className="w-5 h-5" />}
          {resource.type === 'toolshed' && <Wrench className="w-5 h-5" />}
          {resource.type === 'library' && <Package className="w-5 h-5" />}
          {resource.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{resource.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{resource.operatingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span>Coordinator: {resource.coordinator}</span>
              </div>
            </div>
            
            <h4 className="font-semibold mt-4 mb-2">Guidelines</h4>
            <ul className="text-sm space-y-1">
              {resource.guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Current Items</h4>
            <div className="space-y-3">
              {resource.items.map(item => (
                <div key={item.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-sm">{item.name}</h5>
                    <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Location: {item.location}</div>
                    <div>Owner: {item.owner}</div>
                    <div className={getConditionColor(item.condition)}>
                      Condition: {item.condition.replace('_', ' ')}
                    </div>
                    {item.borrower && (
                      <div>Borrowed by: {item.borrower}</div>
                    )}
                    {item.dueDate && (
                      <div>Due: {item.dueDate}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
