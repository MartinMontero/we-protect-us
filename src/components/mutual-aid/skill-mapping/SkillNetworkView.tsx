
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface SkillNetworkViewProps {
  members: CommunityMember[];
  selectedMember: CommunityMember | null;
  onMemberSelect: (member: CommunityMember) => void;
}

export const SkillNetworkView: React.FC<SkillNetworkViewProps> = ({
  members,
  selectedMember,
  onMemberSelect
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {members.map(member => (
        <Card 
          key={member.id} 
          className={`cursor-pointer transition-colors ${
            selectedMember?.id === member.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
          onClick={() => onMemberSelect(member)}
        >
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-2">{member.name}</h3>
            <div className="space-y-1">
              {member.skills.slice(0, 2).map(skill => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {member.skills.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{member.skills.length - 2} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
