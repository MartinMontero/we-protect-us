
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Megaphone, Users, FileText, Calendar, Trophy, Plus } from 'lucide-react';

export const CampaignCoordination: React.FC = () => {
  const [campaigns] = useState([
    {
      id: '1',
      name: 'Stop Mission Bay Displacement',
      type: 'Anti-Displacement',
      status: 'active',
      coordinator: 'Bay Area Action Collective',
      targetSignatures: 5000,
      currentSignatures: 3250,
      description: 'Oppose luxury development without community benefits',
      nextAction: 'City Council Hearing',
      nextActionDate: '2024-02-15'
    },
    {
      id: '2',
      name: 'Clean Air Now',
      type: 'Environmental Justice',
      status: 'active',
      coordinator: 'Environmental Justice Alliance',
      targetSignatures: 2000,
      currentSignatures: 1850,
      description: 'Demand air quality monitoring in industrial areas',
      nextAction: 'Community Rally',
      nextActionDate: '2024-02-20'
    }
  ]);

  const [victories] = useState([
    {
      id: '1',
      campaign: 'Rent Control Expansion',
      outcome: 'Passed citywide rent control with 65% support',
      completedDate: '2024-01-15',
      impact: '50,000 households protected from excessive rent increases'
    }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="w-6 h-6" />
            Campaign Coordination Hub
          </CardTitle>
          <p className="text-sm text-gray-600">
            Organize petitions, coordinate actions, and track victories for community power
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="active">Active Campaigns</TabsTrigger>
              <TabsTrigger value="petitions">Petitions</TabsTrigger>
              <TabsTrigger value="actions">Actions & Events</TabsTrigger>
              <TabsTrigger value="stories">Story Banking</TabsTrigger>
              <TabsTrigger value="victories">Victories</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Active Campaigns</h3>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Start Campaign
                </Button>
              </div>

              <div className="grid gap-4">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{campaign.name}</h4>
                          <p className="text-sm text-gray-600">{campaign.description}</p>
                          <p className="text-sm text-gray-500 mt-1">Led by: {campaign.coordinator}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{campaign.type}</Badge>
                          <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Petition Progress</span>
                          <span className="text-sm text-gray-500">
                            {campaign.currentSignatures.toLocaleString()} / {campaign.targetSignatures.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(campaign.currentSignatures / campaign.targetSignatures) * 100} className="h-2" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Next Action</p>
                          <p className="text-sm">{campaign.nextAction}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Date</p>
                          <p className="text-sm">{new Date(campaign.nextActionDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Sign Petition
                          </Button>
                          <Button variant="outline" size="sm">
                            Share Campaign
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Volunteer
                          </Button>
                          <Button size="sm">
                            Join Action
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="petitions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Petition Creation & Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="font-medium mb-3">Petition Best Practices</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Clear, specific demands</li>
                        <li>• Personal stories and impacts</li>
                        <li>• Research and evidence</li>
                        <li>• Strategic target identification</li>
                        <li>• Concrete timeline for response</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-3">Signature Collection</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Door-to-door canvassing</li>
                        <li>• Community event tabling</li>
                        <li>• Digital sharing campaigns</li>
                        <li>• Coalition partner networks</li>
                        <li>• Media amplification</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button className="flex-1">
                      Create New Petition
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Petition Templates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Action & Event Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">Direct Actions</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Planning and coordination</li>
                        <li>• Security and safety protocols</li>
                        <li>• Legal observer recruitment</li>
                        <li>• Media strategy and outreach</li>
                        <li>• Post-action evaluation</li>
                      </ul>
                      <Button className="w-full mt-3" variant="outline">
                        Plan Action
                      </Button>
                    </div>
                    <div>
                      <h5 className="font-medium mb-3">Community Events</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Town halls and forums</li>
                        <li>• Educational workshops</li>
                        <li>• Rally and march coordination</li>
                        <li>• Fundraising events</li>
                        <li>• Community celebration</li>
                      </ul>
                      <Button className="w-full mt-3" variant="outline">
                        Plan Event
                      </Button>
                    </div>
                    <div>
                      <h5 className="font-medium mb-3">Media Coordination</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Press release templates</li>
                        <li>• Media contact database</li>
                        <li>• Social media campaigns</li>
                        <li>• Spokesperson training</li>
                        <li>• Message amplification</li>
                      </ul>
                      <Button className="w-full mt-3" variant="outline">
                        Media Toolkit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stories" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Community Story Banking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Collect and organize personal stories that demonstrate the impact of issues and the need for change.
                    Stories are powerful tools for building empathy and motivating action.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">Story Collection</h5>
                      <ul className="text-sm space-y-2">
                        <li>• In-person interviews</li>
                        <li>• Digital story submissions</li>
                        <li>• Community listening sessions</li>
                        <li>• Photo and video testimonials</li>
                        <li>• Anonymous submission options</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-3">Story Use</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Campaign materials and websites</li>
                        <li>• Media interviews and coverage</li>
                        <li>• Legislative testimony</li>
                        <li>• Community presentations</li>
                        <li>• Coalition building</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button className="flex-1">
                      Share Your Story
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Conduct Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="victories" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Community Victories</h3>
                <Button className="gap-2">
                  <Trophy className="w-4 h-4" />
                  Report Victory
                </Button>
              </div>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Celebrating Wins</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Every victory, big or small, builds community power and shows what's possible when we organize together.
                    Document and celebrate our collective achievements.
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {victories.map((victory) => (
                  <Card key={victory.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{victory.campaign}</h4>
                          <p className="text-sm text-gray-600">{victory.outcome}</p>
                          <p className="text-sm text-green-600 font-medium mt-1">{victory.impact}</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          Victory
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Completed: {new Date(victory.completedDate).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Share Victory
                          </Button>
                          <Button size="sm">
                            Build on Success
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
