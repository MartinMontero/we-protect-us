import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Star, Plus, CheckCircle } from 'lucide-react';
import { SkillExchangeTooltip } from './education/ContextualTooltips';

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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {members.map(member => (
                  <Card 
                    key={member.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedMember?.id === member.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedMember(member)}
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

              {selectedMember && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedMember.name}'s Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Skills & Expertise</h4>
                        <div className="space-y-2">
                          {selectedMember.skills.map(skill => (
                            <div key={skill} className="flex items-center justify-between">
                              <span className="text-sm">{skill}</span>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${
                                      i < getSkillLevel(skill, selectedMember) 
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
                          {selectedMember.endorsements.map(endorsement => (
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
              )}
            </TabsContent>

            <TabsContent value="directory" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="endorsements" className="space-y-4">
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
