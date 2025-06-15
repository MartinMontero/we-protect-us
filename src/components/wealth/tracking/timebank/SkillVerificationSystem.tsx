
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, Clock } from 'lucide-react';

export const SkillVerificationSystem: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Verification System</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h4 className="font-medium mb-1">Peer Verification</h4>
            <p className="text-sm text-gray-600">Community members verify completed work</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <h4 className="font-medium mb-1">Rating System</h4>
            <p className="text-sm text-gray-600">Build trust through consistent quality</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h4 className="font-medium mb-1">Time Tracking</h4>
            <p className="text-sm text-gray-600">Accurate recording of all exchanges</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
