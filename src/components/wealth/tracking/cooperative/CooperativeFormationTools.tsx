
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building, DollarSign, Leaf } from 'lucide-react';

export const CooperativeFormationTools: React.FC = () => {
  return (
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
  );
};
