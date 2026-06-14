
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  Lightbulb, 
  Thermometer, 
  Users, 
  Calendar,
  Trophy,
  Plus,
  CheckCircle,
  Clock
} from 'lucide-react';

export const EfficiencyPrograms: React.FC = () => {
  const audits = [
    {
      id: 1,
      homeowner: "Sarah Johnson",
      address: "123 Oak Street",
      status: "completed",
      energyScore: 75,
      estimatedSavings: 1200,
      auditDate: "2024-01-15",
      recommendations: ["Insulation upgrade", "Window sealing", "LED conversion"]
    },
    {
      id: 2,
      homeowner: "Mike Rodriguez",
      address: "456 Pine Avenue",
      status: "scheduled",
      auditDate: "2024-02-20",
      recommendations: [] as string[]
    }
  ];

  const workParties = [
    {
      id: 1,
      title: "Weatherization Workshop",
      date: "2024-02-25",
      time: "9:00 AM - 3:00 PM",
      location: "Community Center",
      attendees: 12,
      maxAttendees: 15,
      skills: ["Insulation", "Air sealing", "Caulking"],
      materials: "Provided"
    },
    {
      id: 2,
      title: "LED Bulb Installation Day",
      date: "2024-03-10",
      time: "10:00 AM - 2:00 PM",
      location: "Various homes",
      attendees: 8,
      maxAttendees: 20,
      skills: ["Basic electrical", "Energy auditing"],
      materials: "Bulk purchase discount"
    }
  ];

  const bulkOrders = [
    {
      id: 1,
      item: "LED Light Bulbs (60W equivalent)",
      organizer: "Community Energy Group",
      unitPrice: 3.50,
      minimumQty: 100,
      currentQty: 78,
      deadline: "2024-02-28",
      supplier: "Green Energy Supply Co."
    },
    {
      id: 2,
      item: "Weather Stripping Kit",
      organizer: "Efficiency Collective",
      unitPrice: 24.99,
      minimumQty: 25,
      currentQty: 18,
      deadline: "2024-03-15",
      supplier: "Home Energy Solutions"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Martinez Family", savings: 2840, badge: "Gold" },
    { rank: 2, name: "Green Street Collective", savings: 2650, badge: "Silver" },
    { rank: 3, name: "Johnson Household", savings: 2420, badge: "Bronze" },
    { rank: 4, name: "Eco Warriors", savings: 2180, badge: null },
    { rank: 5, name: "Solar Sisters", savings: 1950, badge: null }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Efficiency Programs</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Audit
        </Button>
      </div>

      <Tabs defaultValue="audits" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="audits">Energy Audits</TabsTrigger>
          <TabsTrigger value="workparties">Work Parties</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Purchases</TabsTrigger>
          <TabsTrigger value="competition">Competitions</TabsTrigger>
        </TabsList>

        <TabsContent value="audits" className="space-y-4">
          <div className="grid gap-4">
            {audits.map((audit) => (
              <Card key={audit.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="w-5 h-5 text-blue-600" />
                        {audit.homeowner}
                      </CardTitle>
                      <p className="text-gray-600">{audit.address}</p>
                    </div>
                    <Badge variant={audit.status === 'completed' ? 'default' : 'secondary'}>
                      {audit.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{audit.auditDate}</span>
                    </div>
                    {audit.energyScore && (
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-orange-600" />
                        <span className="text-sm">Score: {audit.energyScore}/100</span>
                      </div>
                    )}
                    {audit.estimatedSavings && (
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-green-600" />
                        <span className="text-sm">${audit.estimatedSavings}/year</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      {audit.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-600" />
                      )}
                      <span className="text-sm capitalize">{audit.status}</span>
                    </div>
                  </div>
                  {audit.recommendations.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recommendations:</p>
                      <div className="flex flex-wrap gap-1">
                        {audit.recommendations.map((rec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {rec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workparties" className="space-y-4">
          <div className="grid gap-4">
            {workParties.map((party) => (
              <Card key={party.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    {party.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{party.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{party.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-600" />
                      <span className="text-sm">{party.attendees}/{party.maxAttendees}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{party.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Skills taught:</p>
                      <div className="flex flex-wrap gap-1">
                        {party.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Materials: {party.materials}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Join Event</Button>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <div className="grid gap-4">
            {bulkOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    {order.item}
                  </CardTitle>
                  <p className="text-gray-600">Organized by {order.organizer}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Unit Price: </span>
                      <span className="font-medium">${order.unitPrice}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Progress: </span>
                      <span className="font-medium">{order.currentQty}/{order.minimumQty}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Deadline: </span>
                      <span className="font-medium">{order.deadline}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Supplier: </span>
                      <span className="font-medium">{order.supplier}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(order.currentQty / order.minimumQty) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Join Order</Button>
                    <Button variant="outline" size="sm">Contact Organizer</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="competition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Winter Energy Challenge 2024
              </CardTitle>
              <p className="text-gray-600">Reduce your energy usage and win prizes!</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">23 days remaining</div>
                  <p className="text-sm text-gray-600">Challenge ends March 15, 2024</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Leaderboard</h4>
                  {leaderboard.map((entry) => (
                    <div key={entry.rank} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">{entry.rank}</span>
                        <span>{entry.name}</span>
                        {entry.badge && (
                          <Badge variant={entry.badge === 'Gold' ? 'default' : 'secondary'}>
                            {entry.badge}
                          </Badge>
                        )}
                      </div>
                      <span className="font-medium">${entry.savings} saved</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button>View My Progress</Button>
                  <Button variant="outline">Competition Rules</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
