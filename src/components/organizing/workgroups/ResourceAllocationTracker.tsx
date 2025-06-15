
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Package, Users, TrendingUp } from 'lucide-react';

export const ResourceAllocationTracker: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const allocations = [
    {
      id: '1',
      category: 'Direct Aid',
      allocated: 2500,
      spent: 1800,
      workgroups: ['Mutual Aid Network', 'Housing Justice'],
      priority: 'high'
    },
    {
      id: '2',
      category: 'Training & Education',
      allocated: 800,
      spent: 450,
      workgroups: ['Community Defense'],
      priority: 'medium'
    },
    {
      id: '3',
      category: 'Materials & Supplies',
      allocated: 1200,
      spent: 950,
      workgroups: ['All Groups'],
      priority: 'high'
    },
    {
      id: '4',
      category: 'Events & Actions',
      allocated: 600,
      spent: 200,
      workgroups: ['Housing Justice', 'Community Defense'],
      priority: 'medium'
    }
  ];

  const recentTransactions = [
    {
      id: '1',
      description: 'Emergency housing support - family of 4',
      amount: 500,
      workgroup: 'Housing Justice',
      date: '2025-01-15',
      type: 'expense'
    },
    {
      id: '2',
      description: 'Legal observer training materials',
      amount: 150,
      workgroup: 'Community Defense',
      date: '2025-01-14',
      type: 'expense'
    },
    {
      id: '3',
      description: 'Community fundraiser proceeds',
      amount: 800,
      workgroup: 'General Fund',
      date: '2025-01-13',
      type: 'income'
    }
  ];

  const totalAllocated = allocations.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = allocations.reduce((sum, item) => sum + item.spent, 0);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="font-medium">Total Budget</span>
          </div>
          <div className="text-2xl font-bold">${totalAllocated.toLocaleString()}</div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Spent</span>
          </div>
          <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Remaining</span>
          </div>
          <div className="text-2xl font-bold">${(totalAllocated - totalSpent).toLocaleString()}</div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-orange-600" />
            <span className="font-medium">Utilization</span>
          </div>
          <div className="text-2xl font-bold">{Math.round((totalSpent / totalAllocated) * 100)}%</div>
        </div>
      </div>

      {/* Allocation Breakdown */}
      <div className="space-y-4">
        <h4 className="font-medium">Budget Allocation by Category</h4>
        {allocations.map((allocation) => (
          <div key={allocation.id} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium">{allocation.category}</h5>
              <div className="flex items-center gap-2">
                <Badge variant={allocation.priority === 'high' ? 'destructive' : 'secondary'}>
                  {allocation.priority}
                </Badge>
                <span className="text-sm text-gray-600">
                  ${allocation.spent} / ${allocation.allocated}
                </span>
              </div>
            </div>
            
            <Progress 
              value={(allocation.spent / allocation.allocated) * 100} 
              className="mb-2"
            />
            
            <div className="text-sm text-gray-600">
              <span>Workgroups: </span>
              <span>{allocation.workgroups.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h4 className="font-medium">Recent Transactions</h4>
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">{transaction.description}</span>
              <div className="flex items-center gap-2">
                <Badge variant={transaction.type === 'income' ? 'default' : 'outline'}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </Badge>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>{transaction.workgroup}</span>
              <span>{transaction.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline">Request Funds</Button>
        <Button variant="outline">Submit Expense</Button>
        <Button variant="outline">View Full Report</Button>
      </div>
    </div>
  );
};
