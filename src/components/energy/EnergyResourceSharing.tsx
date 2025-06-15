
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { 
  Wrench, 
  Camera, 
  Users, 
  MapPin,
  Clock,
  DollarSign,
  Star,
  Plus,
  Thermometer,
  Zap,
  Calendar as CalendarIcon
} from 'lucide-react';

export const EnergyResourceSharing: React.FC = () => {
  const tools = [
    {
      id: 1,
      name: "Thermal Imaging Camera",
      owner: "Energy Efficiency Collective",
      description: "FLIR thermal camera for energy audits and insulation inspection",
      category: "equipment",
      rentalRate: 25,
      rentalPeriod: "per day",
      available: true,
      location: "Community Workshop",
      safetyNotes: "Requires basic training session before use",
      tags: ["thermal", "audit", "professional"]
    },
    {
      id: 2,
      name: "Solar Panel Cleaning Kit",
      owner: "Solar Maintenance Crew",
      description: "Professional cleaning equipment for solar panel maintenance",
      category: "tool",
      rentalRate: 0,
      rentalPeriod: "free",
      available: true,
      location: "Green Energy Hub",
      safetyNotes: "Ladder safety required, buddy system recommended",
      tags: ["solar", "maintenance", "cleaning"]
    },
    {
      id: 3,
      name: "Energy Monitor Devices",
      owner: "Smart Energy Group",
      description: "Kill-a-watt meters and smart plugs for energy monitoring",
      category: "equipment",
      rentalRate: 5,
      rentalPeriod: "per week",
      available: false,
      location: "Library Makerspace",
      safetyNotes: "Basic electrical safety knowledge recommended",
      tags: ["monitoring", "smart", "measurement"]
    }
  ];

  const contractors = [
    {
      id: 1,
      name: "Community Solar Solutions",
      specialties: ["Solar Installation", "Battery Storage", "Electrical"],
      rating: 4.8,
      reviews: 24,
      verified: true,
      priceRange: "$$",
      cooperativeMember: true,
      contact: "contact@communitysolar.coop"
    },
    {
      id: 2,
      name: "Weatherization Experts",
      specialties: ["Insulation", "Air Sealing", "Window Installation"],
      rating: 4.6,
      reviews: 18,
      verified: true,
      priceRange: "$",
      cooperativeMember: false,
      contact: "info@weatherizationexperts.com"
    }
  ];

  const services = [
    {
      id: 1,
      title: "Solar Panel Cleaning Service",
      provider: "Clean Energy Collective",
      description: "Monthly cleaning service for optimal solar panel performance",
      type: "service",
      pricing: "$50/visit",
      serviceArea: "5-mile radius",
      nextAvailable: "2024-03-01",
      teamSize: 3
    },
    {
      id: 2,
      title: "Energy Audit Consultation",
      provider: "Efficiency Experts",
      description: "Professional home energy audit with detailed recommendations",
      type: "consultation",
      pricing: "$200/audit",
      serviceArea: "City-wide",
      nextAvailable: "2024-02-25",
      teamSize: 2
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resource Sharing</h2>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Share Resource
        </Button>
      </div>

      <Tabs defaultValue="tools" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tools">Tool Library</TabsTrigger>
          <TabsTrigger value="contractors">Contractors</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid gap-4">
            {tools.map((tool) => (
              <Card key={tool.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {tool.category === 'equipment' ? (
                          <Camera className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Wrench className="w-5 h-5 text-orange-600" />
                        )}
                        {tool.name}
                      </CardTitle>
                      <p className="text-gray-600">Owner: {tool.owner}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={tool.available ? 'default' : 'secondary'}>
                        {tool.available ? 'Available' : 'Checked Out'}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-1">
                        {tool.rentalRate > 0 ? `$${tool.rentalRate} ${tool.rentalPeriod}` : 'Free'}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{tool.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{tool.rentalRate > 0 ? `$${tool.rentalRate}` : 'Free'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{tool.rentalPeriod}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {tool.safetyNotes && (
                      <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                        <strong>Safety:</strong> {tool.safetyNotes}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" disabled={!tool.available}>
                      {tool.available ? 'Reserve' : 'Join Waitlist'}
                    </Button>
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Contact Owner</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contractors" className="space-y-4">
          <div className="grid gap-4">
            {contractors.map((contractor) => (
              <Card key={contractor.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        {contractor.name}
                        {contractor.cooperativeMember && (
                          <Badge variant="outline" className="text-green-600">
                            Co-op Member
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="ml-1 text-sm font-medium">{contractor.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600">({contractor.reviews} reviews)</span>
                        <span className="text-sm font-medium">{contractor.priceRange}</span>
                      </div>
                    </div>
                    {contractor.verified && (
                      <Badge variant="default">Verified</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {contractor.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      Contact: {contractor.contact}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Get Quote</Button>
                    <Button variant="outline" size="sm">View Portfolio</Button>
                    <Button variant="outline" size="sm">Read Reviews</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid gap-4">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {service.type === 'service' ? (
                          <Zap className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <Thermometer className="w-5 h-5 text-red-600" />
                        )}
                        {service.title}
                      </CardTitle>
                      <p className="text-gray-600">By {service.provider}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{service.pricing}</div>
                      <div className="text-sm text-gray-600">{service.serviceArea}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Next: {service.nextAvailable}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{service.teamSize} person team</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{service.type}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm">Book Service</Button>
                    <Button variant="outline" size="sm">Get Info</Button>
                    <Button variant="outline" size="sm">Contact Provider</Button>
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
