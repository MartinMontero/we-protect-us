
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  ArrowDown, 
  ArrowUp, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Repeat,
  AlertCircle
} from 'lucide-react';

export const WealthFlowVisualizer: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  const wealthFlows = [
    {
      category: 'Local Businesses',
      inflow: 85000,
      outflow: 23000,
      netFlow: 62000,
      extractionRisk: 'low' as const,
      velocity: 2.8,
      retention: 94
    },
    {
      category: 'Housing',
      inflow: 120000,
      outflow: 78000,
      netFlow: 42000,
      extractionRisk: 'medium' as const,
      velocity: 1.2,
      retention: 67
    },
    {
      category: 'Food Systems',
      inflow: 45000,
      outflow: 12000,
      netFlow: 33000,
      extractionRisk: 'low' as const,
      velocity: 3.5,
      retention: 89
    },
    {
      category: 'Financial Services',
      inflow: 67000,
      outflow: 54000,
      netFlow: 13000,
      extractionRisk: 'high' as const,
      velocity: 0.8,
      retention: 34
    },
    {
      category: 'Healthcare',
      inflow: 93000,
      outflow: 71000,
      netFlow: 22000,
      extractionRisk: 'high' as const,
      velocity: 1.1,
      retention: 42
    }
  ];

  const getFlowColor = (netFlow: number) => {
    if (netFlow > 40000) return 'text-green-600';
    if (netFlow > 20000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Repeat className="w-5 h-5 text-blue-600" />
            Wealth Circulation Flows
          </CardTitle>
          <div className="flex gap-2">
            {(['week', 'month', 'year'] as const).map((period) => (
              <Button
                key={period}
                size="sm"
                variant={timeframe === period ? 'default' : 'outline'}
                onClick={() => setTimeframe(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Flow Diagram */}
          <div className="relative bg-gray-50 p-6 rounded-lg">
            <div className="text-center mb-4">
              <h4 className="font-medium">Community Economic Flow</h4>
              <p className="text-sm text-gray-600">Money movement within and outside the community</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ArrowDown className="w-8 h-8 text-green-600" />
                </div>
                <div className="font-medium text-lg">$410K</div>
                <div className="text-sm text-gray-600">Money In</div>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Repeat className="w-10 h-10 text-blue-600" />
                </div>
                <div className="font-medium text-lg">2.1x</div>
                <div className="text-sm text-gray-600">Avg Velocity</div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ArrowUp className="w-8 h-8 text-red-600" />
                </div>
                <div className="font-medium text-lg">$238K</div>
                <div className="text-sm text-gray-600">Money Out</div>
              </div>
            </div>
          </div>

          {/* Detailed Flows */}
          <div className="space-y-3">
            <h4 className="font-medium">Sector-by-Sector Analysis</h4>
            {wealthFlows.map((flow, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-medium">{flow.category}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getRiskColor(flow.extractionRisk)}>
                        {flow.extractionRisk} extraction risk
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {flow.retention}% retention
                      </span>
                    </div>
                  </div>
                  <div className={`text-right ${getFlowColor(flow.netFlow)}`}>
                    <div className="font-medium">
                      {flow.netFlow > 0 ? '+' : ''}${(flow.netFlow / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs">net flow</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Inflow</div>
                    <div className="font-medium text-green-600">
                      ${(flow.inflow / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Outflow</div>
                    <div className="font-medium text-red-600">
                      ${(flow.outflow / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Velocity</div>
                    <div className="font-medium">
                      {flow.velocity}x/month
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Local Retention</span>
                    <span className="text-xs font-medium">{flow.retention}%</span>
                  </div>
                  <Progress value={flow.retention} className="h-2" />
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$172K</div>
              <div className="text-sm text-gray-600">Net Positive Flow</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">73%</div>
              <div className="text-sm text-gray-600">Avg Retention</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2.1x</div>
              <div className="text-sm text-gray-600">Money Velocity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">+18%</div>
              <div className="text-sm text-gray-600">Month Growth</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
