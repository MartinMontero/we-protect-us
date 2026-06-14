
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ArrowRight, Vote, UserCheck } from 'lucide-react';

export const LiquidDemocracy: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const communityMembers = [
    {
      id: 'alice',
      name: 'Alice Chen',
      role: 'Housing Advocate',
      directVotes: 1,
      delegatedVotes: 5,
      delegatesTo: null as string | null,
      expertise: ['housing', 'tenant_rights']
    },
    {
      id: 'bob',
      name: 'Bob Martinez',
      role: 'Environmental Organizer',
      directVotes: 1,
      delegatedVotes: 3,
      delegatesTo: null as string | null,
      expertise: ['environment', 'energy']
    },
    {
      id: 'carol',
      name: 'Carol Thompson',
      role: 'Community Member',
      directVotes: 0,
      delegatedVotes: 0,
      delegatesTo: 'alice',
      expertise: []
    },
    {
      id: 'david',
      name: 'David Kim',
      role: 'Local Business Owner',
      directVotes: 1,
      delegatedVotes: 2,
      delegatesTo: null as string | null,
      expertise: ['economics', 'small_business']
    }
  ];

  const proposals = [
    {
      id: 'prop1',
      title: 'Community Land Trust Formation',
      category: 'housing',
      votes: {
        alice: { direct: 1, delegated: 5, decision: 'support' },
        bob: { direct: 1, delegated: 3, decision: 'abstain' },
        david: { direct: 1, delegated: 2, decision: 'support' }
      }
    }
  ];

  const calculateVotingPower = (member: any) => {
    return member.directVotes + member.delegatedVotes;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Liquid Democracy Visualizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Community Members & Delegations</h4>
          <div className="space-y-2">
            {communityMembers.map((member) => (
              <div
                key={member.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedMember === member.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-gray-600">{member.role}</div>
                    </div>
                    {member.delegatesTo && (
                      <div className="flex items-center gap-1 text-xs text-blue-600">
                        <ArrowRight className="w-3 h-3" />
                        Delegates to {communityMembers.find(m => m.id === member.delegatesTo)?.name}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {calculateVotingPower(member)} voting power
                    </Badge>
                    {member.delegatedVotes > 0 && (
                      <UserCheck className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </div>

                {selectedMember === member.id && (
                  <div className="mt-3 pt-3 border-t space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-medium">Direct Votes:</span> {member.directVotes}
                      </div>
                      <div>
                        <span className="font-medium">Delegated Votes:</span> {member.delegatedVotes}
                      </div>
                    </div>
                    {member.expertise.length > 0 && (
                      <div className="text-xs">
                        <span className="font-medium">Expertise:</span>
                        <div className="flex gap-1 mt-1">
                          {member.expertise.map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                              {topic.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm">Active Proposals</h4>
          {proposals.map((proposal) => (
            <div key={proposal.id} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-sm">{proposal.title}</h5>
                <Badge variant="outline">{proposal.category}</Badge>
              </div>
              
              <div className="space-y-2">
                {Object.entries(proposal.votes).map(([memberId, vote]) => {
                  const member = communityMembers.find(m => m.id === memberId);
                  return (
                    <div key={memberId} className="flex items-center justify-between text-xs">
                      <span>{member?.name}</span>
                      <div className="flex items-center gap-2">
                        <span>{vote.direct + vote.delegated} votes</span>
                        <Badge 
                          variant={vote.decision === 'support' ? 'default' : vote.decision === 'oppose' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {vote.decision}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Vote className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Liquid Democracy:</strong> Members can vote directly on issues or delegate 
              their voting power to trusted representatives with relevant expertise.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
