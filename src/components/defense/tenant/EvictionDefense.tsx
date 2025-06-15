
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Phone, Scale, Users, Clock, FileText } from 'lucide-react';

export const EvictionDefense: React.FC = () => {
  const [activeCases] = useState([
    {
      id: '1',
      tenant: 'Maria Santos',
      address: '1234 Mission St, Apt 4B',
      caseType: 'No-fault eviction',
      courtDate: '2024-02-10',
      status: 'active',
      daysUntilCourt: 12,
      supportNeeded: ['Legal representation', 'Court accompaniment', 'Emergency fund']
    },
    {
      id: '2',
      tenant: 'Anonymous',
      address: 'Confidential',
      caseType: 'Rent increase retaliation',
      courtDate: '2024-02-20',
      status: 'preparing',
      daysUntilCourt: 22,
      supportNeeded: ['Documentation review', 'Witness statements']
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Eviction Defense Network</h3>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Phone className="w-4 h-4" />
            Emergency Hotline
          </Button>
          <Button className="gap-2 bg-red-600 hover:bg-red-700">
            <AlertTriangle className="w-4 h-4" />
            Report Eviction
          </Button>
        </div>
      </div>

      {/* Emergency Response */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            24/7 Eviction Defense Hotline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-red-700 font-medium mb-2">Immediate Support Available:</p>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Legal advice and representation</li>
                <li>• Emergency financial assistance</li>
                <li>• Court accompaniment</li>
                <li>• Community rapid response</li>
              </ul>
            </div>
            <div>
              <p className="text-red-700 font-medium mb-2">Emergency Contacts:</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Defense Hotline:</span>
                  <span className="font-medium">(415) 555-HELP</span>
                </div>
                <div className="flex justify-between">
                  <span>Legal Clinic:</span>
                  <span className="font-medium">(415) 555-LAW</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency Fund:</span>
                  <span className="font-medium">(415) 555-FUND</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Cases */}
      <div>
        <h4 className="text-lg font-medium mb-4">Active Defense Cases</h4>
        <div className="grid gap-4">
          {activeCases.map((case_) => (
            <Card key={case_.id} className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-semibold">{case_.tenant}</h5>
                    <p className="text-sm text-gray-600">{case_.address}</p>
                    <p className="text-sm text-orange-600 font-medium">{case_.caseType}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={case_.daysUntilCourt <= 14 ? "destructive" : "secondary"}>
                      {case_.daysUntilCourt} days to court
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(case_.courtDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="text-sm font-medium mb-2">Support Needed:</h6>
                  <div className="flex flex-wrap gap-2">
                    {case_.supportNeeded.map((need, index) => (
                      <Badge key={index} variant="outline">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Scale className="w-3 h-3" />
                      Legal Support
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Users className="w-3 h-3" />
                      Community Support
                    </Button>
                  </div>
                  <Button size="sm">
                    View Case Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Defense Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Defense Resources & Know Your Rights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-medium mb-3">Immediate Actions</h5>
              <ul className="text-sm space-y-2">
                <li>• Don't ignore any notices</li>
                <li>• Respond to court summons</li>
                <li>• Document everything</li>
                <li>• Seek legal representation</li>
                <li>• Connect with tenant organizations</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-3">Legal Protections</h5>
              <ul className="text-sm space-y-2">
                <li>• Just cause eviction laws</li>
                <li>• Rent control protections</li>
                <li>• Right to legal representation</li>
                <li>• Notice period requirements</li>
                <li>• Relocation assistance</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-3">Community Support</h5>
              <ul className="text-sm space-y-2">
                <li>• Court accompaniment volunteers</li>
                <li>• Emergency financial assistance</li>
                <li>• Housing search support</li>
                <li>• Moving assistance</li>
                <li>• Ongoing advocacy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
