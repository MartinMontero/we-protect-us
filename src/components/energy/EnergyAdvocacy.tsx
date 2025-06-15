
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Megaphone, 
  Users, 
  Target, 
  Calendar,
  FileText,
  Phone,
  Mail,
  Plus,
  TrendingUp
} from 'lucide-react';

export const EnergyAdvocacy: React.FC = () => {
  const campaigns = [
    {
      id: 1,
      name: "Community Solar for All",
      organizer: "Solar Justice Coalition",
      description: "Advocate for community solar access in underserved neighborhoods",
      targetOutcome: "Municipal community solar program",
      status: "active",
      targetSignatures: 1000,
      currentSignatures: 742,
      nextMeeting: "2024-02-28",
      contactOfficials: [
        { name: "City Council", contact: "council@city.gov" },
        { name: "Mayor's Office", contact: "mayor@city.gov" }
      ]
    },
    {
      id: 2,
      name: "Public Power Initiative",
      organizer: "Energy Democracy Alliance",
      description: "Campaign for municipal utility takeover to prioritize renewables",
      targetOutcome: "Ballot measure for public utility",
      status: "organizing",
      targetSignatures: 5000,
      currentSignatures: 1250,
      nextMeeting: "2024-03-05",
      contactOfficials: [
        { name: "State Representative", contact: "rep@state.gov" },
        { name: "Public Utilities Commission", contact: "puc@state.gov" }
      ]
    }
  ];

  const actionItems = [
    {
      id: 1,
      title: "Submit Public Comment",
      deadline: "2024-02-25",
      description: "Comment on proposed utility rate increases",
      category: "comment",
      difficulty: "easy"
    },
    {
      id: 2,
      title: "Attend City Council Meeting",
      deadline: "2024-03-01",
      description: "Speak at council meeting about solar zoning",
      category: "meeting",
      difficulty: "medium"
    },
    {
      id: 3,
      title: "Contact State Representative",
      deadline: "2024-03-10",
      description: "Call about renewable energy tax credits",
      category: "contact",
      difficulty: "easy"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Energy Advocacy</h2>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Start Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Campaigns */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Active Campaigns</h3>
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Megaphone className="w-5 h-5 text-red-600" />
                      {campaign.name}
                    </CardTitle>
                    <p className="text-gray-600">By {campaign.organizer}</p>
                  </div>
                  <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                    {campaign.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Petition Progress</span>
                      <span>{campaign.currentSignatures}/{campaign.targetSignatures}</span>
                    </div>
                    <Progress 
                      value={(campaign.currentSignatures / campaign.targetSignatures) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span>{campaign.targetOutcome}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span>Meeting: {campaign.nextMeeting}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Contact Officials:</p>
                    {campaign.contactOfficials.map((official, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{official.name}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-6 px-2">
                            <Mail className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-6 px-2">
                            <Phone className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button size="sm">Sign Petition</Button>
                  <Button variant="outline" size="sm">Share Campaign</Button>
                  <Button variant="outline" size="sm">Join Meeting</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Items */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Action Items</h3>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Climate Action Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-sm text-gray-600">Actions Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">3.2</div>
                  <div className="text-sm text-gray-600">Tons CO₂ Impact</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {actionItems.map((action) => (
            <Card key={action.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{action.title}</CardTitle>
                  <Badge variant={action.difficulty === 'easy' ? 'secondary' : 'default'}>
                    {action.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span>Due: {action.deadline}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="w-3 h-3 mr-1" />
                      Template
                    </Button>
                    <Button size="sm">Take Action</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card>
            <CardHeader>
              <CardTitle>Policy Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Net Metering Protection</span>
                  <Badge variant="default">In Progress</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Community Solar Access</span>
                  <Badge variant="secondary">Proposed</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Energy Storage Incentives</span>
                  <Badge variant="outline">Passed</Badge>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Policies
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
