
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, FileText, Users, DollarSign, Calendar, Phone } from 'lucide-react';

export const LegalSupport: React.FC = () => {
  const [legalCases] = useState([
    {
      id: '1',
      client: 'Anonymous',
      caseType: 'Eviction Defense',
      status: 'active',
      description: 'Retaliatory eviction after tenant organizing',
      assignedAdvocate: 'Sarah Martinez',
      courtDate: '2024-02-15',
      fundNeeded: 2500,
      fundRaised: 1200
    }
  ]);

  const [legalResources] = useState([
    {
      id: '1',
      title: 'Tenant Rights Handbook',
      category: 'Housing',
      description: 'Complete guide to tenant rights and protections',
      lastUpdated: '2024-01-01',
      languages: ['en', 'es', 'zh'],
      helpfulVotes: 45
    },
    {
      id: '2',
      title: 'Immigration Rights During Organizing',
      category: 'Immigration',
      description: 'Know your rights when participating in community organizing',
      lastUpdated: '2024-01-10',
      languages: ['en', 'es'],
      helpfulVotes: 32
    }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-6 h-6" />
            Legal Support Network
          </CardTitle>
          <p className="text-sm text-gray-600">
            Access legal resources, clinics, and emergency support for community members
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="resources">Know Your Rights</TabsTrigger>
              <TabsTrigger value="clinics">Legal Clinics</TabsTrigger>
              <TabsTrigger value="cases">Active Cases</TabsTrigger>
              <TabsTrigger value="fund">Emergency Fund</TabsTrigger>
            </TabsList>

            <TabsContent value="resources" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Legal Resource Library</h3>
                <Button className="gap-2">
                  <FileText className="w-4 h-4" />
                  Add Resource
                </Button>
              </div>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Legal Rights Education</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Knowledge is power. Understanding your rights is the first line of defense against 
                    exploitation and harassment. All resources available in multiple languages.
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {legalResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{resource.title}</h4>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline">{resource.category}</Badge>
                            <span className="text-xs text-gray-500">
                              Updated: {new Date(resource.lastUpdated).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{resource.helpfulVotes} helpful votes</p>
                          <div className="flex gap-1 mt-1">
                            {resource.languages.map((lang) => (
                              <Badge key={lang} variant="secondary" className="text-xs">
                                {lang.toUpperCase()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm">
                          Download PDF
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Online
                          </Button>
                          <Button size="sm">
                            Mark Helpful
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="clinics" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Legal Clinic Schedule</h3>
                <Button className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Appointment
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Legal Clinics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-l-blue-500 pl-4">
                      <h5 className="font-semibold">Housing Rights Clinic</h5>
                      <p className="text-sm text-gray-600">Saturdays 10AM-2PM • Community Center</p>
                      <p className="text-sm">Free legal advice for tenant issues, evictions, and housing discrimination</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">Walk-ins Welcome</Badge>
                        <Badge variant="outline">Interpreter Available</Badge>
                      </div>
                    </div>

                    <div className="border-l-4 border-l-green-500 pl-4">
                      <h5 className="font-semibold">Immigration Rights Clinic</h5>
                      <p className="text-sm text-gray-600">Wednesdays 6PM-8PM • Virtual & In-Person</p>
                      <p className="text-sm">Know your rights during ICE encounters and community organizing</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">Appointment Required</Badge>
                        <Badge variant="outline">Secure Communication</Badge>
                      </div>
                    </div>

                    <div className="border-l-4 border-l-purple-500 pl-4">
                      <h5 className="font-semibold">Workers' Rights Clinic</h5>
                      <p className="text-sm text-gray-600">Monthly • First Friday 7PM</p>
                      <p className="text-sm">Wage theft, workplace safety, and organizing protection</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">Group Sessions</Badge>
                        <Badge variant="outline">Anonymous OK</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cases" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Active Legal Cases</h3>
                <Button className="gap-2">
                  <Phone className="w-4 h-4" />
                  Request Legal Support
                </Button>
              </div>

              <div className="grid gap-4">
                {legalCases.map((case_) => (
                  <Card key={case_.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold">{case_.caseType}</h4>
                          <p className="text-sm text-gray-600">Client: {case_.client}</p>
                          <p className="text-sm text-gray-700 mt-1">{case_.description}</p>
                        </div>
                        <Badge variant={case_.status === 'active' ? 'default' : 'secondary'}>
                          {case_.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Assigned Advocate</p>
                          <p className="text-sm">{case_.assignedAdvocate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Court Date</p>
                          <p className="text-sm">{new Date(case_.courtDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Emergency Fund</p>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${(case_.fundRaised / case_.fundNeeded) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">${case_.fundRaised}/${case_.fundNeeded}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm">
                          Case Updates
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Court Support
                          </Button>
                          <Button size="sm">
                            Donate to Fund
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fund" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Emergency Legal Fund
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="font-medium mb-3">Fund Overview</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Available:</span>
                          <span className="font-bold text-green-600">$12,450</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cases Supported This Month:</span>
                          <span className="font-bold">8</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Support Amount:</span>
                          <span className="font-bold">$1,800</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-3">How Funds Are Used</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Legal representation fees</li>
                        <li>• Court filing costs</li>
                        <li>• Document translation</li>
                        <li>• Emergency bail assistance</li>
                        <li>• Immigration legal support</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button className="flex-1">
                      Contribute to Fund
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Request Emergency Support
                    </Button>
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
