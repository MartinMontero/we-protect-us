
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, CheckCircle } from 'lucide-react';

interface CommunityMember {
  id: string;
  name: string;
  skills: string[];
  endorsements: SkillEndorsement[];
  connections: string[];
}

interface SkillEndorsement {
  id: string;
  endorser: string;
  skill: string;
  level: number;
  verified: boolean;
  date: string;
}

interface EndorsementsViewProps {
  members: CommunityMember[];
}

export const EndorsementsView: React.FC<EndorsementsViewProps> = ({ members }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Endorsements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {members.flatMap(m => m.endorsements)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(endorsement => (
              <div key={endorsement.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {endorsement.verified && <CheckCircle className="w-5 h-5 text-green-500" />}
                  <div>
                    <p className="text-sm">
                      <strong>{endorsement.endorser}</strong> endorsed <strong>{endorsement.skill}</strong>
                    </p>
                    <p className="text-xs text-gray-500">{endorsement.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${
                        i < endorsement.level 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
