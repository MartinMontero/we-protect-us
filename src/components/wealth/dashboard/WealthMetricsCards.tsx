
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, DollarSign, Users } from 'lucide-react';

export const WealthMetricsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Time Banking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Hours</span>
              <span className="font-medium">2,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Members</span>
              <span className="font-medium">142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Skills Available</span>
              <span className="font-medium">68</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Community Currency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">In Circulation</span>
              <span className="font-medium">$47,320</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Velocity</span>
              <span className="font-medium">3.2x/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Businesses</span>
              <span className="font-medium">28</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Cooperatives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Co-ops</span>
              <span className="font-medium">7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Assets</span>
              <span className="font-medium">$890K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Member-Owners</span>
              <span className="font-medium">89</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
