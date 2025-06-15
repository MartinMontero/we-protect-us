
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Plus } from 'lucide-react';

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

interface SkillDirectoryViewProps {
  members: CommunityMember[];
  newSkill: string;
  setNewSkill: (skill: string) => void;
  getSkillLevel: (skill: string, member: CommunityMember) => number;
  getUniqueSkills: () => string[];
}

export const SkillDirectoryView: React.FC<SkillDirectoryViewProps> = ({
  members,
  newSkill,
  setNewSkill,
  getSkillLevel,
  getUniqueSkills
}) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input 
          placeholder="Add new skill..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <Button onClick={() => setNewSkill('')}>
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getUniqueSkills().map(skill => {
          const skillMembers = members.filter(m => m.skills.includes(skill));
          return (
            <Card key={skill}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{skill}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {skillMembers.map(member => (
                    <div key={member.id} className="flex items-center justify-between text-sm">
                      <span>{member.name}</span>
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
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
