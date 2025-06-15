
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Building, DollarSign, TrendingUp, Vote } from 'lucide-react';

interface OwnershipMetrics {
  totalMemberOwners: number;
  democraticWorkplaces: number;
  sharedAssets: number;
  annualDividends: number;
  cooperativePrinciples: number;
}

interface CooperativeMetricsProps {
  metrics: OwnershipMetrics;
}

export const CooperativeMetrics: React.FC<CooperativeMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">Member-Owners</span>
          </div>
          <div className="text-2xl font-bold">{metrics.totalMemberOwners.toLocaleString()}</div>
          <div className="text-xs text-gray-600">across all co-ops</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Democratic Workplaces</span>
          </div>
          <div className="text-2xl font-bold">{metrics.democraticWorkplaces}</div>
          <div className="text-xs text-gray-600">active cooperatives</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium">Shared Assets</span>
          </div>
          <div className="text-2xl font-bold">${(metrics.sharedAssets / 1000000).toFixed(1)}M</div>
          <div className="text-xs text-gray-600">community-owned</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium">Annual Dividends</span>
          </div>
          <div className="text-2xl font-bold">${metrics.annualDividends.toLocaleString()}</div>
          <div className="text-xs text-gray-600">shared with members</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Vote className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium">Co-op Principles</span>
          </div>
          <div className="text-2xl font-bold">{metrics.cooperativePrinciples}%</div>
          <div className="text-xs text-gray-600">adherence score</div>
        </CardContent>
      </Card>
    </div>
  );
};
