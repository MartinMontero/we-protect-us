
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Star, CheckCircle, User, Plus } from 'lucide-react';

export const TimeBank: React.FC = () => {
  const [searchSkill, setSearchSkill] = useState('');

  const timeBank = [
    {
      id: '1',
      participantName: 'Maya Chen',
      skillsOffered: ['Web Development', 'Garden Design', 'Language Tutoring'],
      skillsNeeded: ['Childcare', 'Home Repairs'],
      hoursAvailable: 15,
      hoursUsed: 8,
      trustScore: 4.8,
      verifications: 12
    },
    {
      id: '2',
      participantName: 'Carlos Rodriguez',
      skillsOffered: ['Carpentry', 'Plumbing', 'Auto Repair'],
      skillsNeeded: ['Tax Preparation', 'Computer Help'],
      hoursAvailable: 20,
      hoursUsed: 18,
      trustScore: 4.9,
      verifications: 25
    },
    {
      id: '3',
      participantName: 'Aisha Patel',
      skillsOffered: ['Accounting', 'Legal Advice', 'Meal Prep'],
      skillsNeeded: ['Moving Help', 'Pet Care'],
      hoursAvailable: 12,
      hoursUsed: 5,
      trustScore: 4.7,
      verifications: 8
    }
  ];

  const recentTransactions = [
    {
      id: '1',
      from: 'Maya Chen',
      to: 'Carlos Rodriguez',
      skill: 'Web Development',
      hours: 3,
      date: '2024-06-14',
      status: 'completed'
    },
    {
      id: '2',
      from: 'Aisha Patel',
      to: 'Maya Chen',
      skill: 'Tax Preparation',
      hours: 2,
      date: '2024-06-13',
      status: 'completed'
    },
    {
      id: '3',
      from: 'Carlos Rodriguez',
      to: 'Aisha Patel',
      skill: 'Home Repairs',
      hours: 4,
      date: '2024-06-12',
      status: 'in_progress'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Time Banking System</h3>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Join Time Bank
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Find Skills & Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Search for skills (e.g., 'gardening', 'tutoring')"
                value={searchSkill}
                onChange={(e) => setSearchSkill(e.target.value)}
              />
              
              <div className="space-y-3">
                {timeBank.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{member.participantName}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{member.trustScore}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {member.verifications} verified
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-green-600">Offers:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {member.skillsOffered.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-blue-600">Needs:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {member.skillsNeeded.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <div className="text-sm">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {member.hoursAvailable - member.hoursUsed} hours available
                        </div>
                        <Button size="sm" variant="outline">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Exchanges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{transaction.skill}</span>
                      {transaction.status === 'completed' && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      {transaction.from} → {transaction.to}
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaction.hours} hours • {transaction.date}
                    </div>
                  </div>
                  <Badge 
                    variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {transaction.status === 'completed' ? 'Complete' : 'In Progress'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
};
