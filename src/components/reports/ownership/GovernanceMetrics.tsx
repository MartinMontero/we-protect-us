
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Vote, Download, TrendingUp } from 'lucide-react';

interface Metric {
  metric: string;
  value: number | string;
  trend: string;
  details: string;
}

interface GovernanceMetricsProps {
  metrics: Metric[];
}

export const GovernanceMetrics: React.FC<GovernanceMetricsProps> = ({ metrics }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Cooperative Governance Model
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {typeof metric.value === 'number' && metric.value > 50 ? `${metric.value}%` : metric.value}
              </div>
              <div className="text-sm font-medium mb-1">{metric.metric}</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {metric.trend}
              </div>
              <div className="text-xs text-gray-600 mt-2">{metric.details}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="w-3 h-3" />
            Governance Report
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Vote className="w-3 h-3" />
            View Decisions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
