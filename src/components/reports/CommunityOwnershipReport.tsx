
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, Vote, DollarSign, Network, Download, TrendingUp } from 'lucide-react';

export const CommunityOwnershipReport: React.FC = () => {
  const governanceMetrics = [
    {
      metric: 'Democratic Participation',
      value: 87,
      trend: '+5% this month',
      details: '87% of members participated in governance decisions'
    },
    {
      metric: 'Cooperative Membership',
      value: 234,
      trend: '+23 new members',
      details: 'Active cooperative ownership across 3 sectors'
    },
    {
      metric: 'Value Retention',
      value: 92,
      trend: '+12% vs extraction',
      details: '92% of generated value stays in community'
    },
    {
      metric: 'Decision Consensus',
      value: 78,
      trend: '+3% efficiency',
      details: 'Average consensus reached in 2.3 rounds'
    }
  ];

  const cooperativeStructure = [
    {
      sector: 'Housing Cooperative',
      members: 45,
      assets: '$3.2M',
      governance: 'One member, one vote',
      profitSharing: 'Equity-based'
    },
    {
      sector: 'Food Cooperative',
      members: 234,
      assets: '$450K',
      governance: 'Delegated circles',
      profitSharing: 'Equal distribution'
    },
    {
      sector: 'Credit Union',
      members: 1847,
      assets: '$2.4M',
      governance: 'Board representation',
      profitSharing: 'Dividend system'
    }
  ];

  const valueFlows = [
    {
      source: 'Member Labor',
      destination: 'Community Assets',
      amount: '$125K',
      percentage: 35
    },
    {
      source: 'Cooperative Surplus',
      destination: 'Member Dividends',
      amount: '$45K',
      percentage: 25
    },
    {
      source: 'Time Bank Hours',
      destination: 'Service Exchange',
      amount: '2,340 hrs',
      percentage: 40
    }
  ];

  return (
    <div className="space-y-6">
      {/* Governance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Cooperative Governance Model
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {governanceMetrics.map((metric, index) => (
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

      {/* Cooperative Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            Cooperative Structure Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cooperativeStructure.map((coop, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{coop.sector}</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">{coop.members} members</Badge>
                    <Badge variant="secondary">{coop.assets}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Governance Model:</span>
                    <p className="text-gray-600">{coop.governance}</p>
                  </div>
                  <div>
                    <span className="font-medium">Profit Sharing:</span>
                    <p className="text-gray-600">{coop.profitSharing}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Value Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Value Flow Visualization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {valueFlows.map((flow, index) => (
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

      {/* Ownership Principles Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>Cooperative Principles Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Rochdale Principles</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Voluntary Membership</span>
                  <Badge variant="default">✓ Compliant</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Democratic Control</span>
                  <Badge variant="default">✓ Compliant</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Economic Participation</span>
                  <Badge variant="default">✓ Compliant</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Autonomy & Independence</span>
                  <Badge variant="default">✓ Compliant</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Community Values</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Solidarity Economy</span>
                  <Badge variant="default">✓ Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Environmental Sustainability</span>
                  <Badge variant="default">✓ Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Social Justice</span>
                  <Badge variant="default">✓ Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Community Care</span>
                  <Badge variant="default">✓ Active</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
