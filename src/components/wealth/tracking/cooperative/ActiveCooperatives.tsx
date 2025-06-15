
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Cooperative {
  id: string;
  name: string;
  type: 'worker' | 'housing' | 'credit_union' | 'consumer' | 'multi_stakeholder';
  members: number;
  totalAssets: number;
  monthlyRevenue: number;
  profitSharing: string;
  democraticVoting: boolean;
  sustainabilityScore: number;
  recentDecisions: string[];
}

interface ActiveCooperativesProps {
  cooperatives: Cooperative[];
}

export const ActiveCooperatives: React.FC<ActiveCooperativesProps> = ({ cooperatives }) => {
  const coopTypes = {
    worker: { color: 'bg-blue-100 text-blue-800', label: 'Worker Co-op' },
    housing: { color: 'bg-green-100 text-green-800', label: 'Housing Co-op' },
    credit_union: { color: 'bg-purple-100 text-purple-800', label: 'Credit Union' },
    consumer: { color: 'bg-orange-100 text-orange-800', label: 'Consumer Co-op' },
    multi_stakeholder: { color: 'bg-pink-100 text-pink-800', label: 'Multi-Stakeholder' }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Cooperatives</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cooperatives.map((coop) => (
            <div key={coop.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">{coop.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={coopTypes[coop.type].color}>
                      {coopTypes[coop.type].label}
                    </Badge>
                    <span className="text-sm text-gray-600">{coop.members} members</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">${(coop.totalAssets / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-600">assets</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Revenue:</span>
                  <span className="font-medium">${coop.monthlyRevenue.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Sustainability Score:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={coop.sustainabilityScore} className="w-16 h-2" />
                    <span className="font-medium">{coop.sustainabilityScore}%</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Profit Sharing:</span>
                  <span className="font-medium capitalize">{coop.profitSharing.replace('_', ' ')}</span>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="text-xs text-gray-600 mb-1">Recent Decisions:</div>
                  {coop.recentDecisions.map((decision, index) => (
                    <div key={index} className="text-xs bg-gray-50 px-2 py-1 rounded mb-1">
                      • {decision}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
