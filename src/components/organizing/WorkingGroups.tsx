
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskDelegationBoard } from './workgroups/TaskDelegationBoard';
import { ResourceAllocationTracker } from './workgroups/ResourceAllocationTracker';
import { Users, ClipboardList, DollarSign } from 'lucide-react';

export const WorkingGroups: React.FC = () => {
  const workingGroups = [
    {
      id: '1',
      name: 'Community Defense',
      members: 8,
      activeTasks: 12,
      budget: 500,
      status: 'active'
    },
    {
      id: '2',
      name: 'Mutual Aid Network',
      members: 15,
      activeTasks: 6,
      budget: 1200,
      status: 'active'
    },
    {
      id: '3',
      name: 'Housing Justice',
      members: 23,
      activeTasks: 18,
      budget: 800,
      status: 'planning'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Working Groups Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Active Working Groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workingGroups.map((group) => (
              <Card key={group.id} className="p-4">
                <h4 className="font-medium mb-2">{group.name}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Members:</span>
                    <span>{group.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Tasks:</span>
                    <span>{group.activeTasks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Budget:</span>
                    <span>${group.budget}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Delegation Board */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Task Delegation Board
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TaskDelegationBoard />
        </CardContent>
      </Card>

      {/* Resource Allocation Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Resource Allocation Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResourceAllocationTracker />
        </CardContent>
      </Card>
    </div>
  );
};
