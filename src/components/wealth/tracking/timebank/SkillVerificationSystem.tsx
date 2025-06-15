
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Star } from 'lucide-react';

export const SkillVerificationSystem: React.FC = () => {
  const pendingVerifications = [
    {
      id: '1',
      skill: 'Web Development',
      requester: 'Maya Chen',
      verifier: 'Carlos Rodriguez',
      hoursCompleted: 3,
      rating: 5,
      status: 'pending'
    },
    {
      id: '2',
      skill: 'Garden Design',
      requester: 'Aisha Patel',
      verifier: 'Maya Chen',
      hoursCompleted: 2,
      rating: 4,
      status: 'completed'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Verification System</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Verify completed exchanges to build trust and maintain quality standards.
          </div>
          
          <div className="space-y-3">
            {pendingVerifications.map((verification) => (
              <div key={verification.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{verification.skill}</h4>
                    <p className="text-sm text-gray-600">
                      {verification.requester} → {verification.verifier}
                    </p>
                  </div>
                  <Badge 
                    variant={verification.status === 'completed' ? 'default' : 'secondary'}
                  >
                    {verification.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{verification.hoursCompleted} hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{verification.rating}/5</span>
                  </div>
                </div>
                
                {verification.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verify Complete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
