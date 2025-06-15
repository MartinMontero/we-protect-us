
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Battery, 
  Zap, 
  Car, 
  Building, 
  MapPin,
  Plus,
  Shield,
  Clock,
  Users
} from 'lucide-react';

export const ResilienceInfrastructure: React.FC = () => {
  const batteryNetwork = [
    {
      id: 1,
      owner: "Green Energy Collective",
      location: "Community Center",
      capacity: "50 kWh",
      available: true,
      sharingTerms: "Emergency use only",
      backupHours: 12,
      connectedHomes: 8
    },
    {
      id: 2,
      owner: "Martinez Family",
      location: "Residential - 123 Oak St",
      capacity: "13.5 kWh",
      available: true,
      sharingTerms: "Neighbors welcome",
      backupHours: 6,
      connectedHomes: 2
    }
  ];

  const microgridPlans = [
    {
      id: 1,
      name: "Downtown Resilience Hub",
      coordinator: "City Planning Dept",
      status: "planning",
      participants: 25,
      targetCapacity: "500 kWh",
      criticalFacilities: ["Hospital", "Fire Station", "Senior Center"],
      timeline: "Q4 2024"
    },
    {
      id: 2,
      name: "Neighborhood Block Microgrid",
      coordinator: "Residents Association",
      status: "organizing",
      participants: 12,
      targetCapacity: "150 kWh",
      criticalFacilities: ["Community Center", "Elementary School"],
      timeline: "Q2 2025"
    }
  ];

  const generators = [
    {
      id: 1,
      owner: "Emergency Response Team",
      type: "Portable Generator",
      fuelType: "Gasoline",
      capacity: "7500W",
      location: "Fire Station",
      available: true,
      lastMaintenance: "2024-01-15"
    },
    {
      id: 2,
      owner: "Community Workshop",
      type: "Solar Generator",
      fuelType: "Solar/Battery",
      capacity: "3000W",
      location: "Community Center",
      available: true,
      lastMaintenance: "2024-02-01"
    }
  ];

  const evStations = [
    {
      id: 1,
      location: "Main Street Plaza",
      type: "Level 2",
      ports: 4,
      available: 3,
      pricing: "$0.15/kWh",
      renewable: true,
      amenities: ["WiFi", "Covered parking"]
    },
    {
      id: 2,
      location: "Community Solar Farm",
      type: "DC Fast Charging",
      ports: 2,
      available: 2,
      pricing: "$0.25/kWh",
      renewable: true,
      amenities: ["Food truck", "Picnic area"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resilience Infrastructure</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      <Tabs defaultValue="battery" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="battery">Battery Network</TabsTrigger>
          <TabsTrigger value="microgrid">Microgrids</TabsTrigger>
          <TabsTrigger value="generators">Generators</TabsTrigger>
          <TabsTrigger value="ev">EV Charging</TabsTrigger>
        </TabsList>

        <TabsContent value="battery" className="space-y-4">
          <div className="grid gap-4">
            {batteryNetwork.map((battery) => (
              <Card key={battery.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Battery className="w-5 h-5 text-green-600" />
                        {battery.owner}
                      </CardTitle>
                      <p className="text-gray-600">{battery.location}</p>
                    </div>
                    <Badge variant={battery.available ? 'default' : 'secondary'}>
                      {battery.available ? 'Available' : 'In Use'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">{battery.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{battery.backupHours}h backup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{battery.connectedHomes} homes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{battery.sharingTerms}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Request Access</Button>
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Contact Owner</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="microgrid" className="space-y-4">
          <div className="grid gap-4">
            {microgridPlans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                        {plan.name}
                      </CardTitle>
                      <p className="text-gray-600">Coordinator: {plan.coordinator}</p>
                    </div>
                    <Badge variant={plan.status === 'planning' ? 'secondary' : 'default'}>
                      {plan.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{plan.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{plan.targetCapacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm">{plan.timeline}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Critical Facilities:</p>
                    <div className="flex flex-wrap gap-1">
                      {plan.criticalFacilities.map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Building className="w-3 h-3 mr-1" />
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Join Project</Button>
                    <Button variant="outline" size="sm">View Plan</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generators" className="space-y-4">
          <div className="grid gap-4">
            {generators.map((generator) => (
              <Card key={generator.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-orange-600" />
                        {generator.type}
                      </CardTitle>
                      <p className="text-gray-600">Owner: {generator.owner}</p>
                    </div>
                    <Badge variant={generator.available ? 'default' : 'secondary'}>
                      {generator.available ? 'Available' : 'In Use'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">{generator.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{generator.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{generator.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Last: {generator.lastMaintenance}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Request Use</Button>
                    <Button variant="outline" size="sm">View Manual</Button>
                    <Button variant="outline" size="sm">Report Issue</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ev" className="space-y-4">
          <div className="grid gap-4">
            {evStations.map((station) => (
              <Card key={station.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Car className="w-5 h-5 text-blue-600" />
                        {station.location}
                      </CardTitle>
                      <p className="text-gray-600">{station.type} Charging</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{station.available}/{station.ports} available</div>
                      <div className="text-sm text-gray-600">{station.pricing}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {station.renewable && (
                      <Badge variant="outline" className="text-green-600">
                        <Zap className="w-3 h-3 mr-1" />
                        100% Renewable
                      </Badge>
                    )}
                    <div>
                      <p className="text-sm font-medium">Amenities:</p>
                      <div className="flex flex-wrap gap-1">
                        {station.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Get Directions</Button>
                    <Button variant="outline" size="sm">Reserve Spot</Button>
                    <Button variant="outline" size="sm">Report Issue</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
