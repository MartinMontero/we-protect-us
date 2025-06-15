
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, MessageCircle, Target } from 'lucide-react';

export const RestorativeJustice: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState<string>('circle');

  const conflictScenarios = [
    {
      id: 'resource_dispute',
      title: 'Community Garden Resource Dispute',
      description: 'Disagreement over shared tool access and plot boundaries',
      stage: 'mediation',
      participants: ['Gardener A', 'Gardener B', 'Garden Coordinator'],
      principles: ['accountability', 'healing', 'community_safety']
    },
    {
      id: 'meeting_disruption',
      title: 'Disruptive Behavior in Meetings',
      description: 'Member consistently interrupting and dominating discussions',
      stage: 'circle',
      participants: ['Affected Member', 'Community Facilitator', 'Circle Keeper'],
      principles: ['accountability', 'growth', 'inclusion']
    }
  ];

  const restorativePrinciples = [
    {
      principle: 'Accountability',
      description: 'Taking responsibility for harm caused',
      practices: ['Acknowledgment of impact', 'Commitment to change', 'Making amends']
    },
    {
      principle: 'Healing',
      description: 'Addressing harm to individuals and community',
      practices: ['Emotional support', 'Trauma-informed approach', 'Community care']
    },
    {
      principle: 'Community Safety',
      description: 'Ensuring everyone can participate safely',
      practices: ['Clear boundaries', 'Support systems', 'Ongoing check-ins']
    },
    {
      principle: 'Growth',
      description: 'Learning and transformation for all involved',
      practices: ['Skill development', 'Education', 'Personal reflection']
    }
  ];

  const processStages = [
    {
      stage: 'reported',
      title: 'Initial Report',
      description: 'Harm or conflict is identified and reported',
      actions: ['Document incident', 'Ensure immediate safety', 'Contact facilitator']
    },
    {
      stage: 'mediation',
      title: 'Mediation',
      description: 'Facilitated dialogue between affected parties',
      actions: ['Neutral facilitator', 'Safe space creation', 'Active listening']
    },
    {
      stage: 'circle',
      title: 'Community Circle',
      description: 'Broader community involvement in resolution',
      actions: ['Circle keeper facilitation', 'Community witnesses', 'Collective agreement']
    },
    {
      stage: 'resolved',
      title: 'Resolution & Follow-up',
      description: 'Agreements made and ongoing support provided',
      actions: ['Clear agreements', 'Accountability measures', 'Regular check-ins']
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Restorative Justice Simulator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedProcess} onValueChange={setSelectedProcess} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="circle">Circle Process</TabsTrigger>
            <TabsTrigger value="principles">Principles</TabsTrigger>
            <TabsTrigger value="scenarios">Practice Scenarios</TabsTrigger>
          </TabsList>

          <TabsContent value="circle" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Restorative Justice Process</h4>
              <div className="space-y-3">
                {processStages.map((stage, index) => (
                  <div key={stage.stage} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      {index < processStages.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <h5 className="font-medium text-sm">{stage.title}</h5>
                      <p className="text-xs text-gray-600 mt-1 mb-2">{stage.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {stage.actions.map((action) => (
                          <Badge key={action} variant="outline" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="principles" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Core Restorative Principles</h4>
              <div className="grid gap-3">
                {restorativePrinciples.map((item) => (
                  <div key={item.principle} className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-1">{item.principle}</h5>
                    <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                    <div className="space-y-1">
                      <span className="text-xs font-medium">Practices:</span>
                      <div className="flex flex-wrap gap-1">
                        {item.practices.map((practice) => (
                          <Badge key={practice} variant="secondary" className="text-xs">
                            {practice}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Practice Scenarios</h4>
              <div className="space-y-3">
                {conflictScenarios.map((scenario) => (
                  <div key={scenario.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-sm">{scenario.title}</h5>
                      <Badge variant="outline">{scenario.stage}</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{scenario.description}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium">Participants:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {scenario.participants.map((participant) => (
                            <Badge key={participant} variant="secondary" className="text-xs">
                              <Users className="w-3 h-3 mr-1" />
                              {participant}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-xs font-medium">Principles Applied:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {scenario.principles.map((principle) => (
                            <Badge key={principle} variant="default" className="text-xs">
                              {principle.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button size="sm" variant="outline" className="mt-3 gap-1">
                      <MessageCircle className="w-3 h-3" />
                      Simulate Resolution
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 text-green-600 mt-0.5" />
            <div className="text-sm text-green-800">
              <strong>Restorative Focus:</strong> Emphasizes healing, accountability, and community 
              strengthening rather than punishment. All processes are voluntary and community-led.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
