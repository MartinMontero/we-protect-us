
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Star, Clock } from 'lucide-react';

interface TimeBank {
  id: string;
  participantName: string;
  skillsOffered: string[];
  skillsNeeded: string[];
  hoursAvailable: number;
  hoursUsed: number;
  trustScore: number;
  verifications: number;
}

interface TimeBankParticipantsProps {
  searchSkill: string;
  setSearchSkill: (value: string) => void;
  timeBank: TimeBank[];
}

export const TimeBankParticipants: React.FC<TimeBankParticipantsProps> = ({
  searchSkill,
  setSearchSkill,
  timeBank
}) => {
  return (
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
  );
};
