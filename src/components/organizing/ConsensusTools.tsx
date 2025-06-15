
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DigitalHandSignals } from './consensus/DigitalHandSignals';
import { ProposalCoCreation } from '../sovereignty/governance/ProposalCoCreation';
import { Vote, MessageSquare, Users, Lightbulb } from 'lucide-react';

export const ConsensusTools: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Digital Hand Signals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="w-5 h-5" />
            Live Consensus Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DigitalHandSignals />
        </CardContent>
      </Card>

      {/* Proposal Co-Creation */}
      <ProposalCoCreation />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <div>
              <h4 className="font-medium">Stack Keeper</h4>
              <p className="text-sm text-gray-600">Manage speaking queue</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-green-600" />
            <div>
              <h4 className="font-medium">Breakout Rooms</h4>
              <p className="text-sm text-gray-600">Small group discussion</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-600" />
            <div>
              <h4 className="font-medium">Idea Collection</h4>
              <p className="text-sm text-gray-600">Anonymous suggestions</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
