
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LiquidDemocracy } from './LiquidDemocracy';
import { RestorativeJustice } from './RestorativeJustice';
import { ProposalCoCreation } from './ProposalCoCreation';
import { Users, Heart, Lightbulb } from 'lucide-react';

export const DemocraticGovernance: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Democratic Governance Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Explore participatory democracy, restorative justice, and collaborative decision-making 
            tools designed to strengthen community autonomy and collective governance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-medium mb-1">Liquid Democracy</h4>
              <p className="text-sm text-gray-600">Flexible delegation and direct participation</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <h4 className="font-medium mb-1">Restorative Justice</h4>
              <p className="text-sm text-gray-600">Healing-centered conflict resolution</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Lightbulb className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <h4 className="font-medium mb-1">Proposal Co-Creation</h4>
              <p className="text-sm text-gray-600">Collaborative policy development</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiquidDemocracy />
        <RestorativeJustice />
      </div>

      <ProposalCoCreation />
    </div>
  );
};
