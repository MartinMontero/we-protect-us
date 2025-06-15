
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, MapPin, Calendar, MessageCircle } from 'lucide-react';

export const TenantUnions: React.FC = () => {
  const [unions] = useState([
    {
      id: '1',
      name: 'Sunset District Tenants Union',
      address: '1200-1300 Irving St',
      members: 34,
      status: 'active',
      lastMeeting: '2024-01-15',
      nextMeeting: '2024-02-15',
      campaigns: ['Rent Control Expansion', 'Maintenance Standards']
    },
    {
      id: '2',
      name: 'Mission Bay Renters Coalition',
      address: 'Mission Bay Area',
      members: 18,
      status: 'forming',
      lastMeeting: null,
      nextMeeting: '2024-01-25',
      campaigns: ['Anti-Displacement']
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Tenant Union Network</h3>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Start New Union
        </Button>
      </div>

      {/* Union Formation Guide */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Users className="w-5 h-5" />
            Union Formation Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="text-green-700">
              <strong>1. Research</strong>
              <p>Know your rights, rent control laws, and tenant protections</p>
            </div>
            <div className="text-green-700">
              <strong>2. Connect</strong>
              <p>Build relationships with neighbors and identify shared issues</p>
            </div>
            <div className="text-green-700">
              <strong>3. Organize</strong>
              <p>Hold meetings, elect leadership, and plan collective actions</p>
            </div>
            <div className="text-green-700">
              <strong>4. Negotiate</strong>
              <p>Present united demands to landlords with collective power</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Unions */}
      <div className="grid gap-4">
        {unions.map((union) => (
          <Card key={union.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{union.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    {union.address}
                  </div>
                </div>
                <Badge variant={union.status === 'active' ? 'default' : 'secondary'}>
                  {union.status}
                </Badge>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">{union.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-sm">
                    Next: {new Date(union.nextMeeting).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">{union.campaigns.length} active campaigns</span>
                </div>
              </div>

              {union.campaigns.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-sm font-medium mb-2">Active Campaigns</h5>
                  <div className="flex flex-wrap gap-2">
                    {union.campaigns.map((campaign, index) => (
                      <Badge key={index} variant="outline">
                        {campaign}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Join Union
                  </Button>
                  <Button size="sm">
                    Contact Organizers
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Tenant Rights Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">Know Your Rights</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• Right to habitable conditions</li>
                <li>• Protection from retaliatory eviction</li>
                <li>• Right to organize with neighbors</li>
                <li>• Rent control protections (where applicable)</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Legal Protections</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• AB 1482 - Statewide rent cap</li>
                <li>• Just cause eviction requirements</li>
                <li>• Warranty of habitability</li>
                <li>• Right to repair and deduct</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
