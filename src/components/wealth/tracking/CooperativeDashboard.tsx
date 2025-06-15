
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building, Users, DollarSign, Vote, Leaf, Plus, TrendingUp } from 'lucide-react';

export const CooperativeDashboard: React.FC = () => {
  const cooperatives = [
    {
      id: '1',
      name: 'Riverside Food Co-op',
      type: 'consumer',
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
      type: 'credit_union',
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
      type: 'housing',
      members: 45,
      totalAssets: 3200000,
      monthlyRevenue: 28000,
      profitSharing: 'hours_worked',
      democraticVoting: true,
      sustainabilityScore: 95,
      recentDecisions: ['Solar panel installation', 'Community garden expansion']
    }
  ];

  const coopTypes = {
    worker: { color: 'bg-blue-100 text-blue-800', label: 'Worker Co-op' },
    housing: { color: 'bg-green-100 text-green-800', label: 'Housing Co-op' },
    credit_union: { color: 'bg-purple-100 text-purple-800', label: 'Credit Union' },
    consumer: { color: 'bg-orange-100 text-orange-800', label: 'Consumer Co-op' },
    multi_stakeholder: { color: 'bg-pink-100 text-pink-800', label: 'Multi-Stakeholder' }
  };

  const ownershipMetrics = {
    totalMemberOwners: 2126,
    democraticWorkplaces: 7,
    sharedAssets: 6090000,
    annualDividends: 125000,
    cooperativePrinciples: 95 // percentage adherence
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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Member-Owners</span>
            </div>
            <div className="text-2xl font-bold">{ownershipMetrics.totalMemberOwners.toLocaleString()}</div>
            <div className="text-xs text-gray-600">across all co-ops</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Democratic Workplaces</span>
            </div>
            <div className="text-2xl font-bold">{ownershipMetrics.democraticWorkplaces}</div>
            <div className="text-xs text-gray-600">active cooperatives</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Shared Assets</span>
            </div>
            <div className="text-2xl font-bold">${(ownershipMetrics.sharedAssets / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-gray-600">community-owned</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium">Annual Dividends</span>
            </div>
            <div className="text-2xl font-bold">${ownershipMetrics.annualDividends.toLocaleString()}</div>
            <div className="text-xs text-gray-600">shared with members</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Vote className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium">Co-op Principles</span>
            </div>
            <div className="text-2xl font-bold">{ownershipMetrics.cooperativePrinciples}%</div>
            <div className="text-xs text-gray-600">adherence score</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Cooperative Principles Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { principle: 'Voluntary & Open Membership', score: 98 },
                { principle: 'Democratic Member Control', score: 94 },
                { principle: 'Member Economic Participation', score: 96 },
                { principle: 'Autonomy & Independence', score: 92 },
                { principle: 'Education & Training', score: 89 },
                { principle: 'Cooperation Among Cooperatives', score: 95 },
                { principle: 'Concern for Community', score: 97 }
              ].map((item, index) => (
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cooperative Formation Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-medium mb-1">Worker Co-op</h4>
              <p className="text-sm text-gray-600 mb-3">Employee-owned business</p>
              <Button size="sm" variant="outline">Start Formation</Button>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Building className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-medium mb-1">Housing Co-op</h4>
              <p className="text-sm text-gray-600 mb-3">Resident-owned housing</p>
              <Button size="sm" variant="outline">Start Formation</Button>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-medium mb-1">Credit Union</h4>
              <p className="text-sm text-gray-600 mb-3">Member-owned financial</p>
              <Button size="sm" variant="outline">Start Formation</Button>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Leaf className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <h4 className="font-medium mb-1">Consumer Co-op</h4>
              <p className="text-sm text-gray-600 mb-3">Customer-owned retail</p>
              <Button size="sm" variant="outline">Start Formation</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
