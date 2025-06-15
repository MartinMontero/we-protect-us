
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network } from 'lucide-react';
import { GovernanceMetrics } from './ownership/GovernanceMetrics';
import { ValueFlowChart } from './ownership/ValueFlowChart';

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
      <GovernanceMetrics metrics={governanceMetrics} />

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

      <ValueFlowChart flows={valueFlows} />

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
                {['Voluntary Membership', 'Democratic Control', 'Economic Participation', 'Autonomy & Independence'].map((principle) => (
                  <div key={principle} className="flex items-center justify-between">
                    <span>{principle}</span>
                    <Badge variant="default">✓ Compliant</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Community Values</h4>
              <div className="space-y-2 text-sm">
                {['Solidarity Economy', 'Environmental Sustainability', 'Social Justice', 'Community Care'].map((value) => (
                  <div key={value} className="flex items-center justify-between">
                    <span>{value}</span>
                    <Badge variant="default">✓ Active</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
