
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  Users, 
  Truck, 
  Clock,
  MapPin,
  Heart,
  Phone,
  CheckCircle,
  Plus,
  Target
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const CrisisResponse: React.FC = () => {
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const { data: crisisPlans } = useQuery({
    queryKey: ['crisis-response'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_crisis_response')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'standby': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activePlans = crisisPlans?.filter(plan => plan.status === 'active') || [];
  const plannedPlans = crisisPlans?.filter(plan => plan.status === 'planned') || [];

  return (
    <div className="space-y-6">
      {/* Crisis Response Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Responses</p>
                <p className="text-3xl font-bold text-red-600">{activePlans.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prepared Plans</p>
                <p className="text-3xl font-bold text-blue-600">{plannedPlans.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vulnerable Households</p>
                <p className="text-3xl font-bold text-purple-600">
                  {crisisPlans?.reduce((acc, plan) => acc + (plan.vulnerable_households?.length || 0), 0) || 0}
                </p>
              </div>
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-3xl font-bold text-orange-600">4h</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="active">Active Responses</TabsTrigger>
          <TabsTrigger value="planning">Emergency Planning</TabsTrigger>
          <TabsTrigger value="vulnerable">Vulnerable Households</TabsTrigger>
          <TabsTrigger value="coordination">Volunteer Coordination</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {activePlans.length > 0 ? (
            <div className="space-y-4">
              {activePlans.map((plan) => (
                <Card key={plan.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{plan.response_name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{plan.crisis_type}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getPriorityColor(plan.priority_level)}>
                            {plan.priority_level} priority
                          </Badge>
                          <Badge className={getStatusColor(plan.status)}>
                            {plan.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Activated</p>
                        <p className="text-sm font-medium">
                          {plan.activation_date ? new Date(plan.activation_date).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Households Served</p>
                        <p className="text-lg font-bold text-blue-600">
                          {plan.vulnerable_households?.length || 0}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <Truck className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Distribution Points</p>
                        <p className="text-lg font-bold text-green-600">3</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <Heart className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Volunteers</p>
                        <p className="text-lg font-bold text-purple-600">12</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Response Progress</span>
                          <span className="text-sm text-gray-600">75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          View Map
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Coordinator
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Update Status
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No Active Crisis Response</p>
                <p className="text-gray-500 text-sm">All systems operating normally</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="planning" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Emergency Response Plans
                </CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Response Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {plannedPlans.map((plan) => (
                  <div key={plan.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{plan.response_name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{plan.crisis_type}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getPriorityColor(plan.priority_level)}>
                            {plan.priority_level} priority
                          </Badge>
                          <Badge className={getStatusColor(plan.status)}>
                            {plan.status}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          Target households: {plan.vulnerable_households?.length || 0}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">
                          Review Plan
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Activate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Response Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Response Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Natural Disaster', icon: AlertTriangle, color: 'text-red-600' },
                  { name: 'Supply Chain Disruption', icon: Truck, color: 'text-orange-600' },
                  { name: 'Economic Crisis', icon: Heart, color: 'text-purple-600' },
                  { name: 'Seasonal Food Shortage', icon: Clock, color: 'text-blue-600' },
                  { name: 'Community Emergency', icon: Users, color: 'text-green-600' },
                  { name: 'Infrastructure Failure', icon: MapPin, color: 'text-gray-600' }
                ].map((template, index) => {
                  const Icon = template.icon;
                  return (
                    <Card key={index} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                      <div className="text-center">
                        <Icon className={`w-8 h-8 ${template.color} mx-auto mb-2`} />
                        <p className="font-medium">{template.name}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Use Template
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerable" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Vulnerable Household Registry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { category: 'Elderly (65+)', count: 23, priority: 'high' },
                  { category: 'Families with Children', count: 18, priority: 'medium' },
                  { category: 'Disabled Individuals', count: 12, priority: 'high' },
                  { category: 'Single Parents', count: 15, priority: 'medium' },
                  { category: 'Chronic Illness', count: 8, priority: 'high' },
                  { category: 'Low Income', count: 34, priority: 'medium' }
                ].map((group, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{group.category}</h3>
                      <Badge className={getPriorityColor(group.priority)}>
                        {group.priority}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-purple-600 mb-2">{group.count}</p>
                    <p className="text-sm text-gray-600">registered households</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coordination" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Volunteer Mobilization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 border-2 border-dashed border-purple-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-600 font-medium">Volunteer Coordination Dashboard</p>
                  <p className="text-purple-500 text-sm">Real-time volunteer deployment and communication</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
