
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface InventoryViewProps {
  resources: CommunityResource[];
}

export const InventoryView: React.FC<InventoryViewProps> = ({ resources }) => {
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
    <div className="grid grid-cols-1 gap-4">
      {resources.map(resource => (
        <Card key={resource.id}>
          <CardHeader>
            <CardTitle className="text-lg">{resource.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {resource.items.map(item => (
                <div key={item.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-sm">{item.name}</h5>
                    <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600">
                    <div className={getConditionColor(item.condition)}>
                      {item.condition.replace('_', ' ')}
                    </div>
                    {item.borrower && <div>Borrowed by: {item.borrower}</div>}
                    {item.dueDate && <div>Due: {item.dueDate}</div>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
