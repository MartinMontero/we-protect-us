
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Lightbulb } from 'lucide-react';

interface ImpactScenario {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ImpactScenarios: React.FC = () => {
  const getImpactScenarios = (): ImpactScenario[] => {
    return [
      {
        title: 'Immediate Impact',
        description: 'Direct needs met, immediate stress relief for community members',
        icon: <Target className="w-4 h-4" />
      },
      {
        title: 'Network Effect',
        description: 'Trust relationships formed, social capital increased, future cooperation enabled',
        icon: <Users className="w-4 h-4" />
      },
      {
        title: 'Systemic Change',
        description: 'Alternative economic patterns normalized, dependency on exploitative systems reduced',
        icon: <Lightbulb className="w-4 h-4" />
      }
    ];
  };

  return (
    <div className="grid gap-4">
      {getImpactScenarios().map((scenario, index) => (
        <Card key={index}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              {scenario.icon}
              {scenario.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{scenario.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
