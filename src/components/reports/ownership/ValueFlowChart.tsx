
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DollarSign } from 'lucide-react';

interface ValueFlow {
  source: string;
  destination: string;
  amount: string;
  percentage: number;
}

interface ValueFlowChartProps {
  flows: ValueFlow[];
}

export const ValueFlowChart: React.FC<ValueFlowChartProps> = ({ flows }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Value Flow Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {flows.map((flow, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">{flow.source}</div>
                  <div className="text-gray-400">→</div>
                  <div className="text-sm font-medium">{flow.destination}</div>
                </div>
                <div className="text-sm font-medium">{flow.amount}</div>
              </div>
              <Progress value={flow.percentage} className="h-2" />
              <div className="text-xs text-gray-600 text-right">{flow.percentage}% of total flow</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Community Wealth Retention</h4>
          <div className="text-sm text-green-700">
            <p>• 92% of generated value remains within the community ecosystem</p>
            <p>• $170K+ annual value retained vs. traditional extraction model</p>
            <p>• 15% increase in local economic resilience year-over-year</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
