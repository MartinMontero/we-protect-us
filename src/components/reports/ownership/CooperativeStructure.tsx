
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network } from 'lucide-react';

interface CooperativeItem {
  sector: string;
  members: number;
  assets: string;
  governance: string;
  profitSharing: string;
}

interface CooperativeStructureProps {
  cooperatives: CooperativeItem[];
}

export const CooperativeStructure: React.FC<CooperativeStructureProps> = ({ cooperatives }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="w-5 h-5" />
          Cooperative Structure Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cooperatives.map((coop, index) => (
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
  );
};
