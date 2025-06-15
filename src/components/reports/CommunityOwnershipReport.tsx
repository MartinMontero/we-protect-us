
import React from 'react';
import { GovernanceMetrics } from './ownership/GovernanceMetrics';
import { CooperativeStructure } from './ownership/CooperativeStructure';
import { ValueFlowChart } from './ownership/ValueFlowChart';
import { PrinciplesCompliance } from './ownership/PrinciplesCompliance';

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
      <CooperativeStructure cooperatives={cooperativeStructure} />
      <ValueFlowChart flows={valueFlows} />
      <PrinciplesCompliance />
    </div>
  );
};
