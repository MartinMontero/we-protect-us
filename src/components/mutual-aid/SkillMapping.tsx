
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users } from 'lucide-react';
import { SkillExchangeTooltip } from './education/ContextualTooltips';
import { SkillNetworkView } from './skill-mapping/SkillNetworkView';
import { MemberDetailView } from './skill-mapping/MemberDetailView';
import { SkillDirectoryView } from './skill-mapping/SkillDirectoryView';
import { EndorsementsView } from './skill-mapping/EndorsementsView';

interface SkillEndorsement {
  id: string;
  endorser: string;
  skill: string;
  level: number;
  verified: boolean;
  date: string;
}

interface CommunityMember {
  id: string;
  name: string;
  skills: string[];
  endorsements: SkillEndorsement[];
  connections: string[];
}

export const SkillMapping: React.FC = () => {
  const [members] = useState<CommunityMember[]>([
    {
      id: '1',
      name: 'Alex Rivera',
      skills: ['Carpentry', 'Plumbing', 'Community Organizing'],
      endorsements: [
        { id: '1', endorser: 'Jordan Chen', skill: 'Carpentry', level: 5, verified: true, date: '2024-01-15' },
        { id: '2', endorser: 'Sam Wilson', skill: 'Community Organizing', level: 4, verified: true, date: '2024-01-20' }
      ],
      connections: ['2', '3']
    },
    {
      id: '2',
      name: 'Jordan Chen',
      skills: ['Gardening', 'Cooking', 'Childcare'],
      endorsements: [
        { id: '3', endorser: 'Alex Rivera', skill: 'Gardening', level: 5, verified: true, date: '2024-01-18' }
      ],
      connections: ['1', '4']
    },
    {
      id: '3',
      name: 'Sam Wilson',
      skills: ['Legal Aid', 'Translation', 'Conflict Resolution'],
      endorsements: [
        { id: '4', endorser: 'Maria Santos', skill: 'Legal Aid', level: 5, verified: true, date: '2024-01-10' }
      ],
      connections: ['1', '4']
    },
    {
      id: '4',
      name: 'Maria Santos',
      skills: ['Healthcare', 'Mental Health Support', 'Crisis Intervention'],
      endorsements: [],
      connections: ['2', '3']
    }
  ]);

  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);
  const [newSkill, setNewSkill] = useState('');

  const getSkillLevel = (skill: string, member: CommunityMember) => {
    const endorsement = member.endorsements.find(e => e.skill === skill);
    return endorsement ? endorsement.level : 0;
  };

  const getUniqueSkills = () => {
    const skills = new Set<string>();
    members.forEach(member => {
      member.skills.forEach(skill => skills.add(skill));
    });
    return Array.from(skills);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <SkillExchangeTooltip>
            <CardTitle className="flex items-center gap-2 cursor-help">
              <Users className="w-5 h-5" />
              Community Skill Network
            </CardTitle>
          </SkillExchangeTooltip>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="network" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="network">Visual Network</TabsTrigger>
              <TabsTrigger value="directory">Skill Directory</TabsTrigger>
              <TabsTrigger value="endorsements">Endorsements</TabsTrigger>
            </TabsList>

            <TabsContent value="network" className="space-y-4">
              <SkillNetworkView
                members={members}
                selectedMember={selectedMember}
                onMemberSelect={setSelectedMember}
              />

              {selectedMember && (
                <MemberDetailView
                  member={selectedMember}
                  getSkillLevel={getSkillLevel}
                />
              )}
            </TabsContent>

            <TabsContent value="directory" className="space-y-4">
              <SkillDirectoryView
                members={members}
                newSkill={newSkill}
                setNewSkill={setNewSkill}
                getSkillLevel={getSkillLevel}
                getUniqueSkills={getUniqueSkills}
              />
            </TabsContent>

            <TabsContent value="endorsements" className="space-y-4">
              <EndorsementsView members={members} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
