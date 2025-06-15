
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, Users, Coins, Plus, ArrowUpRight } from 'lucide-react';

export const CommunityLending: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('');

  const lendingCircles = [
    {
      id: '1',
      name: 'Small Business Circle',
      members: 12,
      totalPool: 15000,
      currentRound: 3,
      nextRecipient: 'Maria\'s Bakery',
      interestRate: 0,
      trustScore: 4.8
    },
    {
      id: '2',
      name: 'Emergency Support Circle',
      members: 25,
      totalPool: 8500,
      currentRound: 8,
      nextRecipient: 'Rodriguez Family',
      interestRate: 0,
      trustScore: 4.9
    },
    {
      id: '3',
      name: 'Housing Down Payment Circle',
      members: 8,
      totalPool: 40000,
      currentRound: 2,
      nextRecipient: 'Chen Family',
      interestRate: 0,
      trustScore: 4.7
    }
  ];

  const currencyStats = {
    totalCirculation: 47320,
    monthlyVelocity: 3.2,
    participatingBusinesses: 28,
    avgTransactionSize: 85,
    localRetention: 94.5
  };

  const recentActivity = [
    {
      id: '1',
      type: 'circle_payout',
      description: 'Small Business Circle funded Maria\'s Bakery',
      amount: 2500,
      date: '2024-06-14'
    },
    {
      id: '2',
      type: 'currency_exchange',
      description: 'Community Currency → Local Grocers',
      amount: 340,
      date: '2024-06-14'
    },
    {
      id: '3',
      type: 'new_member',
      description: 'Alex joined Emergency Support Circle',
      amount: 250,
      date: '2024-06-13'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Community Lending & Currency</h3>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Join Circle
          </Button>
          <Button className="gap-2">
            <Coins className="w-4 h-4" />
            Issue Currency
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Total Circulation</span>
            </div>
            <div className="text-2xl font-bold">${currencyStats.totalCirculation.toLocaleString()}</div>
            <div className="text-xs text-gray-600">+12% this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Velocity</span>
            </div>
            <div className="text-2xl font-bold">{currencyStats.monthlyVelocity}x</div>
            <div className="text-xs text-gray-600">per month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Businesses</span>
            </div>
            <div className="text-2xl font-bold">{currencyStats.participatingBusinesses}</div>
            <div className="text-xs text-gray-600">accepting currency</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium">Local Retention</span>
            </div>
            <div className="text-2xl font-bold">{currencyStats.localRetention}%</div>
            <div className="text-xs text-gray-600">stays in community</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lending Circles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lendingCircles.map((circle) => (
                <div key={circle.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{circle.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{circle.members} members</span>
                        <span>${circle.totalPool.toLocaleString()} pool</span>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      Round {circle.currentRound}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Next recipient:</span>
                      <span className="font-medium">{circle.nextRecipient}</span>
                    </div>
                    
                    <Progress value={(circle.currentRound / circle.members) * 100} className="h-2" />
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-gray-600">
                        {circle.interestRate}% interest • Trust: {circle.trustScore}⭐
                      </span>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {activity.type === 'circle_payout' && <DollarSign className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'currency_exchange' && <Coins className="w-4 h-4 text-green-600" />}
                    {activity.type === 'new_member' && <Users className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-600">{activity.date}</span>
                      <span className="text-sm font-medium text-green-600">
                        ${activity.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Currency Issuance Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Hours-Based Currency</h4>
              <p className="text-sm text-gray-600 mb-3">
                Issue currency backed by time banking hours
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Create Hours Token
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Asset-Backed Currency</h4>
              <p className="text-sm text-gray-600 mb-3">
                Back currency with community-owned assets
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Asset Backing
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Mutual Credit System</h4>
              <p className="text-sm text-gray-600 mb-3">
                Create currency through mutual agreements
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Setup Mutual Credit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
