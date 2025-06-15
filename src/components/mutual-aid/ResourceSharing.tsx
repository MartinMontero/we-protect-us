
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package } from 'lucide-react';
import { ResourceSharingTooltip } from './education/ContextualTooltips';
import { ResourceMap } from './resource-sharing/ResourceMap';
import { ResourceDetails } from './resource-sharing/ResourceDetails';
import { InventoryView } from './resource-sharing/InventoryView';
import { ResourceFilters } from './resource-sharing/ResourceFilters';

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
          <ResourceFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterType={filterType}
            onFilterChange={setFilterType}
          />

          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="map">Resource Map</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="space-y-4">
              <ResourceMap
                resources={filteredResources}
                selectedResource={selectedResource}
                onResourceSelect={setSelectedResource}
              />

              {selectedResource && (
                <ResourceDetails resource={selectedResource} />
              )}
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <InventoryView resources={filteredResources} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
