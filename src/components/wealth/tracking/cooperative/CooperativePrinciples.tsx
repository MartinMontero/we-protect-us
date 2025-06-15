
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const CooperativePrinciples: React.FC = () => {
  const principles = [
    { principle: 'Voluntary & Open Membership', score: 98 },
    { principle: 'Democratic Member Control', score: 94 },
    { principle: 'Member Economic Participation', score: 96 },
    { principle: 'Autonomy & Independence', score: 92 },
    { principle: 'Education & Training', score: 89 },
    { principle: 'Cooperation Among Cooperatives', score: 95 },
    { principle: 'Concern for Community', score: 97 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cooperative Principles Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {principles.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.principle}</span>
                <span>{item.score}%</span>
              </div>
              <Progress value={item.score} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
