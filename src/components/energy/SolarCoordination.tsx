
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sun, 
  Users, 
  DollarSign, 
  Calendar, 
  Star, 
  Plus,
  MapPin,
  TrendingUp,
  Shield
} from 'lucide-react';

export const SolarCoordination: React.FC = () => {
  const [activeProjectTab, setActiveProjectTab] = useState('active');

  const solarProjects = [
    {
      id: 1,
      name: "Neighborhood Solar Group Buy",
      type: "solar_group_buy",
      coordinator: "Maria Santos",
      participants: 15,
      targetParticipants: 20,
      estimatedCost: 48000,
      estimatedSavings: 12000,
      status: "organizing",
      timeline: "Q2 2024",
      description: "Community solar bulk purchase for reduced installation costs"
    },
    {
      id: 2,
      name: "Community Center Solar Array",
      type: "solar_group_buy",
      coordinator: "David Chen",
      participants: 8,
      targetParticipants: 12,
      estimatedCost: 75000,
      estimatedSavings: 18000,
      status: "planning",
      timeline: "Q3 2024",
      description: "Large-scale installation for community center with surplus sharing"
    }
  ];

  const installers = [
    {
      id: 1,
      companyName: "SunPower Collective",
      rating: 4.8,
      reviews: 24,
      services: ["Residential Solar", "Commercial Solar", "Battery Storage"],
      verified: true,
      averageCost: "$2.85/watt",
      certifications: ["NABCEP", "Licensed Electrician"]
    },
    {
      id: 2,
      companyName: "Community Solar Solutions",
      rating: 4.6,
      reviews: 18,
      services: ["Group Buy Coordination", "Residential Solar", "Maintenance"],
      verified: true,
      averageCost: "$2.92/watt",
      certifications: ["NABCEP", "Local Co-op Certified"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Solar Project Coordination</h2>
        <Button className="bg-yellow-600 hover:bg-yellow-700">
          <Plus className="w-4 h-4 mr-2" />
          Start New Project
        </Button>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="installers">Installer Directory</TabsTrigger>
          <TabsTrigger value="financing">Financing Options</TabsTrigger>
          <TabsTrigger value="tracking">Production Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {solarProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Sun className="w-5 h-5 text-yellow-600" />
                        {project.name}
                      </CardTitle>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                    <Badge variant={project.status === 'organizing' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        {project.participants}/{project.targetParticipants} participants
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm">
                        ${project.estimatedSavings.toLocaleString()} savings
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{project.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span className="text-sm">{project.coordinator}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Join Project</Button>
                    <Button variant="outline" size="sm">Contact Coordinator</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="installers" className="space-y-4">
          <div className="grid gap-4">
            {installers.map((installer) => (
              <Card key={installer.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {installer.companyName}
                        {installer.verified && (
                          <Shield className="w-4 h-4 text-green-600" />
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="ml-1 text-sm font-medium">{installer.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600">({installer.reviews} reviews)</span>
                        <span className="text-sm font-medium text-green-600">{installer.averageCost}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Get Quote</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {installer.services.map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Certifications:</p>
                      <div className="flex flex-wrap gap-1">
                        {installer.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="financing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Solar Loan Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Community Solar Credit Union</span>
                    <span className="font-medium">3.99% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Green Energy Bank</span>
                    <span className="font-medium">4.25% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Local Energy Cooperative</span>
                    <span className="font-medium">3.75% APR</span>
                  </div>
                </div>
                <Button className="w-full">Compare All Options</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Incentives & Rebates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Federal Tax Credit</span>
                    <span className="font-medium text-green-600">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State Rebate Program</span>
                    <span className="font-medium text-green-600">$2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Utility Rebate</span>
                    <span className="font-medium text-green-600">$0.50/watt</span>
                  </div>
                </div>
                <Button className="w-full">Calculate Savings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Community Production
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">1,245 kWh</div>
                  <div className="text-sm text-gray-600">Today</div>
                  <div className="text-lg font-medium text-green-600 mt-2">+15% vs yesterday</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">$3,420</div>
                  <div className="text-sm text-gray-600">This Month</div>
                  <div className="text-lg font-medium text-blue-600 mt-2">$41,040 annual rate</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">15.6</div>
                  <div className="text-sm text-gray-600">Tons CO₂ Avoided</div>
                  <div className="text-lg font-medium text-green-600 mt-2">32 trees equivalent</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
