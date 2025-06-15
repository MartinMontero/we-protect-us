
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CooperativeMetrics } from './cooperative/CooperativeMetrics';
import { ActiveCooperatives } from './cooperative/ActiveCooperatives';
import { CooperativePrinciples } from './cooperative/CooperativePrinciples';
import { CooperativeFormationTools } from './cooperative/CooperativeFormationTools';

export const CooperativeDashboard: React.FC = () => {
  const cooperatives = [
    {
      id: '1',
      name: 'Riverside Food Co-op',
      type: 'consumer' as const,
      members: 234,
      totalAssets: 450000,
      monthlyRevenue: 85000,
      profitSharing: 'equal',
      democraticVoting: true,
      sustainabilityScore: 92,
      recentDecisions: ['Expand produce section', 'Partner with local farms']
    },
    {
      id: '2',
      name: 'Neighborhood Credit Union',
      type: 'credit_union' as const,
      members: 1847,
      totalAssets: 2400000,
      monthlyRevenue: 45000,
      profitSharing: 'investment_based',
      democraticVoting: true,
      sustainabilityScore: 88,
      recentDecisions: ['Lower loan rates', 'Green energy financing']
    },
    {
      id: '3',
      name: 'Community Housing Collective',
      type: 'housing' as const,
      members: 45,
      totalAssets: 3200000,
      monthlyRevenue: 28000,
      profitSharing: 'hours_worked',
      democraticVoting: true,
      sustainabilityScore: 95,
      recentDecisions: ['Solar panel installation', 'Community garden expansion']
    }
  ];

  const ownershipMetrics = {
    totalMemberOwners: 2126,
    democraticWorkplaces: 7,
    sharedAssets: 6090000,
    annualDividends: 125000,
    cooperativePrinciples: 95
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Cooperative Ownership Dashboard</h3>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Start New Co-op
        </Button>
      </div>

      <CooperativeMetrics metrics={ownershipMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveCooperatives cooperatives={cooperatives} />
        <CooperativePrinciples />
      </div>

      <CooperativeFormationTools />
    </div>
  );
};
