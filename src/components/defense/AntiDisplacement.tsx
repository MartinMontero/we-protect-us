
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Building, MapPin, AlertTriangle, Users, FileText } from 'lucide-react';

export const AntiDisplacement: React.FC = () => {
  const [propertyAlerts] = useState([
    {
      id: '1',
      address: '1234 Valencia St',
      alertType: 'sale',
      details: 'Property sold to development company',
      riskLevel: 'high',
      date: '2024-01-15',
      status: 'monitoring'
    },
    {
      id: '2', 
      address: '567 Mission St',
      alertType: 'development',
      details: 'Luxury condo development proposed - 0% affordable units',
      riskLevel: 'critical',
      date: '2024-01-10',
      status: 'organizing'
    }
  ]);

  const [developments] = useState([
    {
      id: '1',
      name: 'Mission Bay Luxury Towers',
      address: '789 Mission Bay Blvd',
      developer: 'Corporate Development Inc',
      proposedUnits: 500,
      affordableUnits: 0,
      status: 'proposed',
      hearingDate: '2024-02-15',
      oppositionCampaign: 'Stop Displacement Now'
    }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Anti-Displacement Monitoring Network
          </CardTitle>
          <p className="text-sm text-gray-600">
            Track property sales, development proposals, and organize community defense
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="alerts" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="alerts">Property Alerts</TabsTrigger>
              <TabsTrigger value="developments">Development Projects</TabsTrigger>
              <TabsTrigger value="zoning">Zoning Changes</TabsTrigger>
              <TabsTrigger value="landtrust">Community Land Trust</TabsTrigger>
            </TabsList>

            <TabsContent value="alerts" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Property Alerts</h3>
                <Button className="gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Set Alert Area
                </Button>
              </div>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">Displacement Risk Alert System</span>
                  </div>
                  <p className="text-sm text-red-700">
                    Monitor property sales, Ellis Act evictions, and development proposals that threaten community stability.
                    Early warning enables rapid organizing response.
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {propertyAlerts.map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{alert.address}</h4>
                          <p className="text-sm text-gray-600">{alert.details}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={alert.riskLevel === 'critical' ? 'destructive' : 'secondary'}>
                            {alert.riskLevel} risk
                          </Badge>
                          <Badge variant="outline">
                            {alert.alertType}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Alert: {new Date(alert.date).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm">
                            Organize Response
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="developments" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Development Projects</h3>
                <Button className="gap-2">
                  <Building className="w-4 h-4" />
                  Track New Project
                </Button>
              </div>

              <div className="grid gap-4">
                {developments.map((dev) => (
                  <Card key={dev.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{dev.name}</h4>
                          <p className="text-sm text-gray-600">{dev.address}</p>
                          <p className="text-sm text-gray-600">Developer: {dev.developer}</p>
                        </div>
                        <Badge variant={dev.affordableUnits === 0 ? 'destructive' : 'default'}>
                          {dev.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Total Units</p>
                          <p className="text-lg">{dev.proposedUnits}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Affordable Units</p>
                          <p className={`text-lg ${dev.affordableUnits === 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {dev.affordableUnits} ({((dev.affordableUnits / dev.proposedUnits) * 100).toFixed(1)}%)
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Public Hearing</p>
                          <p className="text-lg">{new Date(dev.hearingDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {dev.oppositionCampaign && (
                        <div className="mb-4">
                          <Badge variant="outline" className="text-purple-600">
                            Opposition Campaign: {dev.oppositionCampaign}
                          </Badge>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Documents
                          </Button>
                          <Button variant="outline" size="sm">
                            Public Comments
                          </Button>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Join Opposition
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="zoning" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Zoning Change Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Track zoning changes that could enable displacement through upzoning and density increases
                    without community benefit.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">What We Monitor</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Upzoning proposals</li>
                        <li>• Height limit changes</li>
                        <li>• Density bonus applications</li>
                        <li>• Conditional use permits</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Response Strategy</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Community input at hearings</li>
                        <li>• Demand community benefits</li>
                        <li>• Advocate for affordable housing</li>
                        <li>• Historic preservation when applicable</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="landtrust" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Community Land Trust Organizing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Build permanent community control over land to prevent speculation and displacement.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Land Acquisition</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Identify at-risk properties</li>
                        <li>• Community fundraising</li>
                        <li>• Public land advocacy</li>
                        <li>• Right of first refusal policies</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Community Ownership</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Democratic governance</li>
                        <li>• Permanent affordability</li>
                        <li>• Community stewardship</li>
                        <li>• Cooperative management</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Policy Advocacy</h5>
                      <ul className="text-sm space-y-1">
                        <li>• City land disposition</li>
                        <li>• Tax increment financing</li>
                        <li>• Community ownership zones</li>
                        <li>• Anti-speculation measures</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
