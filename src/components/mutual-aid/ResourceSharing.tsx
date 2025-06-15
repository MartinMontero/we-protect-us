import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Package, Wrench, Calendar, User } from 'lucide-react';
import { ResourceSharingTooltip } from './education/ContextualTooltips';

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

export const ResourceSharing: React.FC = () => {
  const [resources] = useState<CommunityResource[]>([
    {
      id: '1',
      name: 'Community Fridge #1',
      type: 'fridge',
      address: '123 Main St, Corner of Oak Ave',
      coordinator: 'Maria Santos',
      operatingHours: '24/7',
      guidelines: [
        'Take what you need, give what you can',
        'Check expiration dates',
        'Clean containers before donating'
      ],
      items: [
        { id: '1', name: 'Fresh Vegetables', type: 'food', location: 'Main compartment', status: 'available', owner: 'Community', condition: 'excellent' },
        { id: '2', name: 'Bread & Pastries', type: 'food', location: 'Top shelf', status: 'available', owner: 'Local Bakery', condition: 'good' }
      ]
    },
    {
      id: '2',
      name: 'Neighborhood Tool Library',
      type: 'toolshed',
      address: '456 Elm St, Community Center',
      coordinator: 'Alex Rivera',
      operatingHours: 'Weekdays 9AM-6PM, Weekends 10AM-4PM',
      guidelines: [
        'Return tools within 1 week',
        'Report any damage immediately',
        'Clean tools before returning'
      ],
      items: [
        { id: '3', name: 'Electric Drill', type: 'tool', location: 'Shelf A', status: 'borrowed', owner: 'Community', borrower: 'Jordan Chen', dueDate: '2024-01-25', condition: 'excellent' },
        { id: '4', name: 'Circular Saw', type: 'tool', location: 'Shelf B', status: 'available', owner: 'Community', condition: 'good' },
        { id: '5', name: 'Garden Spade Set', type: 'tool', location: 'Garden section', status: 'available', owner: 'Community', condition: 'excellent' }
      ]
    },
    {
      id: '3',
      name: 'Little Free Library',
      type: 'library',
      address: '789 Pine St, Front yard',
      coordinator: 'Sam Wilson',
      operatingHours: '24/7',
      guidelines: [
        'Take a book, leave a book',
        'Keep books in good condition',
        'Family-friendly content only'
      ],
      items: [
        { id: '6', name: 'Gardening Guide', type: 'book', location: 'Top shelf', status: 'available', owner: 'Community', condition: 'good' },
        { id: '7', name: 'Community Organizing Handbook', type: 'book', location: 'Middle shelf', status: 'available', owner: 'Community', condition: 'excellent' }
      ]
    }
  ]);

  const [selectedResource, setSelectedResource] = useState<CommunityResource | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredResources = resources.filter(resource => {
    if (filterType !== 'all' && resource.type !== filterType) return false;
    if (searchTerm && !resource.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <ResourceSharingTooltip>
            <CardTitle className="flex items-center gap-2 cursor-help">
              <Package className="w-5 h-5" />
              Community Resource Network
            </CardTitle>
          </ResourceSharingTooltip>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input 
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="fridge">Community Fridges</SelectItem>
                <SelectItem value="toolshed">Tool Libraries</SelectItem>
                <SelectItem value="library">Book Libraries</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="map">Resource Map</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResources.map(resource => (
                  <Card 
                    key={resource.id}
                    className={`cursor-pointer transition-colors ${
                      selectedResource?.id === resource.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedResource(resource)}
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

              {selectedResource && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {selectedResource.type === 'fridge' && <Package className="w-5 h-5" />}
                      {selectedResource.type === 'toolshed' && <Wrench className="w-5 h-5" />}
                      {selectedResource.type === 'library' && <Package className="w-5 h-5" />}
                      {selectedResource.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{selectedResource.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>{selectedResource.operatingHours}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span>Coordinator: {selectedResource.coordinator}</span>
                          </div>
                        </div>
                        
                        <h4 className="font-semibold mt-4 mb-2">Guidelines</h4>
                        <ul className="text-sm space-y-1">
                          {selectedResource.guidelines.map((guideline, index) => (
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
                          {selectedResource.items.map(item => (
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
              )}
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {filteredResources.map(resource => (
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
