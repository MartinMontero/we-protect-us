
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, AlertTriangle, Building2, Scale, Users, Camera } from 'lucide-react';

export const EnvironmentalJustice: React.FC = () => {
  const [pollutionReports] = useState([
    {
      id: '1',
      location: 'Industrial Area, Bayview',
      pollutionType: 'Air Quality',
      description: 'Strong chemical odor reported by multiple residents',
      threatLevel: 'high',
      healthImpacts: 'Respiratory issues, headaches',
      suspectedSource: 'Chemical processing plant',
      reportDate: '2024-01-20',
      verified: false
    }
  ]);

  const [violations] = useState([
    {
      id: '1',
      company: 'Industrial Chemical Corp',
      violationType: 'Air Quality',
      violationDate: '2024-01-15',
      agency: 'EPA',
      fineAmount: 50000,
      description: 'Exceeded permitted emission levels for volatile organic compounds',
      status: 'pending'
    }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-6 h-6" />
            Environmental Justice Network
          </CardTitle>
          <p className="text-sm text-gray-600">
            Monitor pollution, track corporate violations, and coordinate environmental health actions
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monitoring" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="monitoring">Pollution Monitoring</TabsTrigger>
              <TabsTrigger value="violations">Corporate Violations</TabsTrigger>
              <TabsTrigger value="health">Health Mapping</TabsTrigger>
              <TabsTrigger value="actions">Direct Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Community Pollution Reports</h3>
                <Button className="gap-2">
                  <Camera className="w-4 h-4" />
                  Report Pollution
                </Button>
              </div>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Environmental Monitoring Network</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Document environmental hazards with photos, health impacts, and location data. 
                    Community reports build case for regulatory action and corporate accountability.
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {pollutionReports.map((report) => (
                  <Card key={report.id} className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{report.location}</h4>
                          <p className="text-sm text-gray-600">{report.pollutionType}</p>
                          <p className="text-sm text-gray-700 mt-1">{report.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={report.threatLevel === 'high' ? 'destructive' : 'secondary'}>
                            {report.threatLevel} threat
                          </Badge>
                          <Badge variant={report.verified ? 'default' : 'outline'}>
                            {report.verified ? 'verified' : 'pending'}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs font-medium text-gray-500">Health Impacts</p>
                          <p className="text-sm">{report.healthImpacts}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500">Suspected Source</p>
                          <p className="text-sm">{report.suspectedSource}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Reported: {new Date(report.reportDate).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm">
                            File Complaint
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="violations" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Corporate Violation Tracking</h3>
                <Button className="gap-2">
                  <Building2 className="w-4 h-4" />
                  Add Violation
                </Button>
              </div>

              <div className="grid gap-4">
                {violations.map((violation) => (
                  <Card key={violation.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{violation.company}</h4>
                          <p className="text-sm text-gray-600">{violation.violationType} Violation</p>
                          <p className="text-sm text-gray-700 mt-1">{violation.description}</p>
                        </div>
                        <Badge variant={violation.status === 'pending' ? 'secondary' : 'default'}>
                          {violation.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Violation Date</p>
                          <p className="text-sm">{new Date(violation.violationDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Regulatory Agency</p>
                          <p className="text-sm">{violation.agency}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Fine Amount</p>
                          <p className="text-sm font-bold text-green-600">
                            ${violation.fineAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Status</p>
                          <p className="text-sm capitalize">{violation.status}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm">
                          View Documents
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Track Progress
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

            <TabsContent value="health" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Community Health Impact Mapping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Map environmental health impacts across our community to identify patterns of environmental racism
                    and build evidence for policy change.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">Health Data Collection</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Asthma and respiratory illness rates</li>
                        <li>• Cancer cluster identification</li>
                        <li>• Childhood development impacts</li>
                        <li>• Environmental exposure tracking</li>
                        <li>• Community health surveys</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-3">Environmental Factors</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Air quality measurements</li>
                        <li>• Water contamination testing</li>
                        <li>• Soil contamination mapping</li>
                        <li>• Noise pollution monitoring</li>
                        <li>• Industrial facility proximity</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="w-full">
                      Participate in Health Survey
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Environmental Justice Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">Direct Action</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Factory blockades</li>
                        <li>• Permit hearing disruption</li>
                        <li>• Corporate office occupations</li>
                        <li>• Pipeline resistance</li>
                        <li>• Tree-sitting campaigns</li>
                      </ul>
                      <Button className="w-full mt-3" variant="outline">
                        Plan Action
                      </Button>
                    </div>
                    <div>
                      <h5 className="font-medium mb-3">Regulatory Advocacy</h5>
                      <ul className="text-sm space-y-2">
                        <li>• EPA complaint filing</li>
                        <li>• City council testimony</li>
                        <li>• Permit challenge lawsuits</li>
                        <li>• Environmental impact reviews</li>
                        <li>• Community benefit agreements</li>
                      </ul>
                      <Button className="w-full mt-3" variant="outline">
                        File Complaint
                      </Button>
                    </div>
                    <div>
                      <h5 className="font-medium mb-3">Community Solutions</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Community gardens</li>
                        <li>• Renewable energy cooperatives</li>
                        <li>• Waste reduction programs</li>
                        <li>• Green infrastructure</li>
                        <li>• Environmental education</li>
                      </ul>
                      <Button className="w-full mt-3" variant="outline">
                        Start Project
                      </Button>
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
