
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

interface MemberDetailViewProps {
  member: CommunityMember;
  getSkillLevel: (skill: string, member: CommunityMember) => number;
}

export const MemberDetailView: React.FC<MemberDetailViewProps> = ({ member, getSkillLevel }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{member.name}'s Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Skills & Expertise</h4>
            <div className="space-y-2">
              {member.skills.map(skill => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-sm">{skill}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${
                          i < getSkillLevel(skill, member) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Endorsements</h4>
            <div className="space-y-2">
              {member.endorsements.map(endorsement => (
                <div key={endorsement.id} className="flex items-center gap-2 text-sm">
                  {endorsement.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                  <span>{endorsement.endorser} endorsed <strong>{endorsement.skill}</strong></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
