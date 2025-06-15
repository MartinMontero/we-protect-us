
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Lightbulb, Users, Clock, MessageSquare, ThumbsUp } from 'lucide-react';

export const ProposalCoCreation: React.FC = () => {
  const [selectedProposal, setSelectedProposal] = useState<string>('1');
  const [newComment, setNewComment] = useState('');

  const proposals = [
    {
      id: '1',
      title: 'Community Food Hub Development',
      status: 'discussion',
      description: 'Establish a community-controlled food distribution and processing center',
      createdBy: 'Maria Santos',
      coCreators: ['Ahmed Chen', 'River Johnson'],
      comments: [
        {
          author: 'David Kim',
          text: 'Could we include composting facilities in the design?',
          likes: 3,
          time: '2 hours ago'
        },
        {
          author: 'Sarah Miller',
          text: 'We should prioritize accessibility for disabled community members.',
          likes: 5,
          time: '1 hour ago'
        }
      ],
      consensusLevel: 75,
      deadline: '2025-01-15'
    },
    {
      id: '2',
      title: 'Digital Privacy Workshop Series',
      status: 'voting',
      description: 'Monthly workshops on digital security and privacy protection',
      createdBy: 'Alex Thompson',
      coCreators: ['Jordan Lee'],
      comments: [
        {
          author: 'Maya Patel',
          text: 'We need childcare during these workshops for parent participation.',
          likes: 4,
          time: '3 hours ago'
        }
      ],
      consensusLevel: 85,
      deadline: '2025-01-10'
    }
  ];

  const collaborationFeatures = [
    {
      feature: 'Real-time Editing',
      description: 'Multiple people can edit proposal simultaneously',
      icon: Users,
      active: true
    },
    {
      feature: 'Version History',
      description: 'Track all changes and contributor attribution',
      icon: Clock,
      active: true
    },
    {
      feature: 'Comment Threading',
      description: 'Structured discussion on specific proposal sections',
      icon: MessageSquare,
      active: true
    },
    {
      feature: 'Consensus Tracking',
      description: 'Real-time measurement of community agreement',
      icon: ThumbsUp,
      active: true
    }
  ];

  const currentProposal = proposals.find(p => p.id === selectedProposal);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Proposal Co-Creation Workshop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Collaboration Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {collaborationFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.feature}
                className="p-3 border rounded-lg text-center"
              >
                <Icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <h4 className="font-medium text-xs mb-1">{feature.feature}</h4>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Proposal Selection */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Active Proposals</h4>
          <div className="grid gap-2">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedProposal === proposal.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedProposal(proposal.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-medium text-sm">{proposal.title}</h5>
                  <div className="flex items-center gap-2">
                    <Badge variant={proposal.status === 'voting' ? 'default' : 'secondary'}>
                      {proposal.status}
                    </Badge>
                    <span className="text-xs text-gray-500">{proposal.consensusLevel}% consensus</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">{proposal.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    by {proposal.createdBy} + {proposal.coCreators.length} co-creators
                  </div>
                  <div className="text-xs text-gray-500">
                    Deadline: {proposal.deadline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proposal Details */}
        {currentProposal && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Proposal Details</h4>
              <Button size="sm" variant="outline">
                Join as Co-Creator
              </Button>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Title</label>
                <Input 
                  value={currentProposal.title} 
                  className="text-sm"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium mb-1">Description</label>
                <Textarea 
                  value={currentProposal.description}
                  className="text-sm"
                  rows={3}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Created by</label>
                  <div className="text-sm">{currentProposal.createdBy}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Co-creators</label>
                  <div className="text-sm">{currentProposal.coCreators.join(', ')}</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Consensus Level</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${currentProposal.consensusLevel}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{currentProposal.consensusLevel}%</span>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Community Discussion</h4>
              <div className="space-y-2">
                {currentProposal.comments.map((comment, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-xs">{comment.author}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{comment.time}</span>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-gray-400" />
                          <span className="text-xs">{comment.likes}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Add your thoughts, suggestions, or questions..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="text-sm"
                  rows={2}
                />
                <Button size="sm" className="gap-1">
                  <MessageSquare className="w-3 h-3" />
                  Add Comment
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <strong>Co-Creation Process:</strong> Proposals evolve through collaborative editing, 
              community feedback, and consensus-building. All changes are transparent and attributed.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
