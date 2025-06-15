
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Users, Wrench, Home, Heart, Radio, Battery, Droplets, Plus, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ResourceMapProps {
  type: 'resources' | 'evacuation';
}

interface CommunityResource {
  id: string;
  resource_type: string;
  resource_name: string;
  description?: string;
  capacity?: string;
  availability_status: string;
  location_description?: string;
  access_instructions?: string;
  contact_preference: string;
  sharing_conditions?: string;
}

interface EvacuationRoute {
  id: string;
  route_name: string;
  origin_area: string;
  destination_area: string;
  route_description?: string;
  estimated_travel_time?: number;
  accessibility_level: string;
  status: string;
  hazard_warnings?: string[];
}

interface EmergencyShelter {
  id: string;
  shelter_name: string;
  address: string;
  shelter_type: string;
  capacity_people: number;
  current_occupancy: number;
  pet_friendly: boolean;
  wheelchair_accessible: boolean;
  status: string;
  amenities?: string[];
}

export const ResourceMap: React.FC<ResourceMapProps> = ({ type }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const { data: resources = [] } = useQuery({
    queryKey: ['community-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_resources')
        .select('*')
        .order('resource_name');
      
      if (error) throw error;
      return data as CommunityResource[];
    },
    enabled: type === 'resources'
  });

  const { data: routes = [] } = useQuery({
    queryKey: ['evacuation-routes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('evacuation_routes')
        .select('*')
        .order('route_name');
      
      if (error) throw error;
      return data as EvacuationRoute[];
    },
    enabled: type === 'evacuation'
  });

  const { data: shelters = [] } = useQuery({
    queryKey: ['emergency-shelters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('emergency_shelters')
        .select('*')
        .order('shelter_name');
      
      if (error) throw error;
      return data as EmergencyShelter[];
    },
    enabled: type === 'evacuation'
  });

  const resourceIcons = {
    generator: Battery,
    medical_supplies: Heart,
    tools: Wrench,
    transportation: Users,
    shelter_space: Home,
    communication: Radio,
    water_storage: Droplets,
    food_supplies: Users
  };

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    in_use: 'bg-yellow-100 text-yellow-800',
    needs_repair: 'bg-orange-100 text-orange-800',
    unavailable: 'bg-red-100 text-red-800',
    open: 'bg-green-100 text-green-800',
    congested: 'bg-yellow-100 text-yellow-800',
    damaged: 'bg-orange-100 text-orange-800',
    closed: 'bg-red-100 text-red-800',
    full: 'bg-red-100 text-red-800'
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.resource_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.resource_type === selectedType;
    return matchesSearch && matchesType;
  });

  if (type === 'resources') {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <Wrench className="w-6 h-6 text-blue-600" />
              Community Resource Network
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search resources..."
                  className="pl-10"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  <SelectItem value="generator">Generators</SelectItem>
                  <SelectItem value="medical_supplies">Medical Supplies</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="shelter_space">Shelter Space</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="water_storage">Water Storage</SelectItem>
                  <SelectItem value="food_supplies">Food Supplies</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource) => {
                const IconComponent = resourceIcons[resource.resource_type as keyof typeof resourceIcons] || Wrench;
                
                return (
                  <Card key={resource.id} className="border-2 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{resource.resource_name}</h3>
                          <Badge className={statusColors[resource.availability_status as keyof typeof statusColors]}>
                            {resource.availability_status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      {resource.description && (
                        <p className="text-gray-600 mb-2">{resource.description}</p>
                      )}
                      
                      {resource.capacity && (
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Capacity: {resource.capacity}
                        </p>
                      )}
                      
                      {resource.location_description && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                          <MapPin className="w-3 h-3" />
                          {resource.location_description}
                        </div>
                      )}
                      
                      {resource.sharing_conditions && (
                        <p className="text-xs text-gray-500 mb-3">
                          Conditions: {resource.sharing_conditions}
                        </p>
                      )}
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Contact Owner
                        </Button>
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No resources found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <MapPin className="w-6 h-6 text-orange-600" />
            Evacuation Routes & Shelters
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evacuation Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Evacuation Routes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {routes.map((route) => (
              <Card key={route.id} className="p-4 border">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{route.route_name}</h3>
                    <Badge className={statusColors[route.status as keyof typeof statusColors]}>
                      {route.status}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p><span className="font-medium">From:</span> {route.origin_area}</p>
                    <p><span className="font-medium">To:</span> {route.destination_area}</p>
                    {route.estimated_travel_time && (
                      <p><span className="font-medium">Est. Time:</span> {route.estimated_travel_time} minutes</p>
                    )}
                    <p><span className="font-medium">Accessibility:</span> {route.accessibility_level.replace('_', ' ')}</p>
                  </div>
                  
                  {route.hazard_warnings && route.hazard_warnings.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {route.hazard_warnings.map((warning, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          ⚠️ {warning}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Button size="sm" className="w-full">
                    View Route Details
                  </Button>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Shelters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Emergency Shelters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {shelters.map((shelter) => (
              <Card key={shelter.id} className="p-4 border">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{shelter.shelter_name}</h3>
                    <Badge className={statusColors[shelter.status as keyof typeof statusColors]}>
                      {shelter.status}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {shelter.address}
                    </p>
                    <p>
                      <span className="font-medium">Capacity:</span> {shelter.current_occupancy}/{shelter.capacity_people} people
                    </p>
                    <p><span className="font-medium">Type:</span> {shelter.shelter_type.replace('_', ' ')}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {shelter.pet_friendly && (
                      <Badge variant="secondary" className="text-xs">🐕 Pet Friendly</Badge>
                    )}
                    {shelter.wheelchair_accessible && (
                      <Badge variant="secondary" className="text-xs">♿ Accessible</Badge>
                    )}
                    {shelter.amenities?.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button size="sm" className="w-full">
                    Contact Shelter
                  </Button>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
