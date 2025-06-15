
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const PrinciplesCompliance: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cooperative Principles Compliance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium">Rochdale Principles</h4>
            <div className="space-y-2 text-sm">
              {['Voluntary Membership', 'Democratic Control', 'Economic Participation', 'Autonomy & Independence'].map((principle) => (
                <div key={principle} className="flex items-center justify-between">
                  <span>{principle}</span>
                  <Badge variant="default">✓ Compliant</Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Community Values</h4>
            <div className="space-y-2 text-sm">
              {['Solidarity Economy', 'Environmental Sustainability', 'Social Justice', 'Community Care'].map((value) => (
                <div key={value} className="flex items-center justify-between">
                  <span>{value}</span>
                  <Badge variant="default">✓ Active</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
