import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Clock, Users, CheckCircle, Heart, Calendar as CalendarIcon } from 'lucide-react';
import { ConflictResolutionTooltip } from './education/ContextualTooltips';

interface ConflictTicket {
  id: string;
  title: string;
  description: string;
  reporter: string;
  involvedParties: string[];
  status: 'open' | 'mediation' | 'healing_circle' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  mediator?: string;
  createdAt: string;
  updatedAt: string;
  resolution?: string;
  followUpDate?: string;
}

interface MediationSession {
  id: string;
  ticketId: string;
  mediator: string;
  participants: string[];
  sessionType: 'individual' | 'group' | 'healing_circle';
  scheduledDate: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  agreements?: string[];
}

export const ConflictResolution: React.FC = () => {
  const [tickets] = useState<ConflictTicket[]>([
    {
      id: '1',
      title: 'Resource Sharing Disagreement',
      description: 'Conflict over tool library borrowing policies and return times',
      reporter: 'Jordan Chen',
      involvedParties: ['Jordan Chen', 'Alex Rivera'],
      status: 'mediation',
      priority: 'medium',
      mediator: 'Sam Wilson',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-18'
    },
    {
      id: '2',
      title: 'Community Garden Space Allocation',
      description: 'Disagreement about plot assignments and maintenance responsibilities',
      reporter: 'Maria Santos',
      involvedParties: ['Maria Santos', 'Taylor Kim', 'Pat Johnson'],
      status: 'healing_circle',
      priority: 'high',
      mediator: 'Dr. Rivera',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Communication Misunderstanding',
      description: 'Misinterpretation during mutual aid coordination meeting',
      reporter: 'Casey Lee',
      involvedParties: ['Casey Lee', 'Morgan Davis'],
      status: 'resolved',
      priority: 'low',
      mediator: 'Sam Wilson',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-12',
      resolution: 'Both parties agreed to use written summaries for complex coordination tasks'
    }
  ]);

  const [sessions] = useState<MediationSession[]>([
    {
      id: '1',
      ticketId: '1',
      mediator: 'Sam Wilson',
      participants: ['Jordan Chen', 'Alex Rivera'],
      sessionType: 'group',
      scheduledDate: '2024-01-22',
      status: 'scheduled'
    },
    {
      id: '2',
      ticketId: '2',
      mediator: 'Dr. Rivera',
      participants: ['Maria Santos', 'Taylor Kim', 'Pat Johnson'],
      sessionType: 'healing_circle',
      scheduledDate: '2024-01-25',
      status: 'scheduled'
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<ConflictTicket | null>(null);
  const [newResponse, setNewResponse] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'mediation': return 'bg-yellow-100 text-yellow-800';
      case 'healing_circle': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUpcomingSessions = () => {
    return sessions.filter(session => session.status === 'scheduled');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <ConflictResolutionTooltip>
            <CardTitle className="flex items-center gap-2 cursor-help">
              <Heart className="w-6 h-6" />
              Restorative Justice & Community Healing
            </CardTitle>
          </ConflictResolutionTooltip>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tickets">Active Cases</TabsTrigger>
              <TabsTrigger value="mediation">Mediation Sessions</TabsTrigger>
              <TabsTrigger value="resources">RJ Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="tickets" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickets.map(ticket => (
                  <Card 
                    key={ticket.id}
                    className={`cursor-pointer transition-colors ${
                      selectedTicket?.id === ticket.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{ticket.title}</h3>
                        <div className="flex gap-1">
                          <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
                            {ticket.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                        {ticket.description}
                      </p>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-gray-500" />
                          <span>{ticket.involvedParties.length} parties involved</span>
                        </div>
                        {ticket.mediator && (
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-gray-500" />
                            <span>Mediator: {ticket.mediator}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span>Updated: {ticket.updatedAt}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedTicket && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedTicket.title}</span>
                      <div className="flex gap-2">
                        <Badge className={`${getStatusColor(selectedTicket.status)}`}>
                          {selectedTicket.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={`${getPriorityColor(selectedTicket.priority)}`}>
                          {selectedTicket.priority}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Case Details</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong>Description:</strong>
                            <p className="mt-1 text-gray-600">{selectedTicket.description}</p>
                          </div>
                          <div>
                            <strong>Reporter:</strong> {selectedTicket.reporter}
                          </div>
                          <div>
                            <strong>Involved Parties:</strong>
                            <ul className="mt-1 list-disc list-inside text-gray-600">
                              {selectedTicket.involvedParties.map(party => (
                                <li key={party}>{party}</li>
                              ))}
                            </ul>
                          </div>
                          {selectedTicket.mediator && (
                            <div>
                              <strong>Assigned Mediator:</strong> {selectedTicket.mediator}
                            </div>
                          )}
                          {selectedTicket.resolution && (
                            <div>
                              <strong>Resolution:</strong>
                              <p className="mt-1 text-gray-600">{selectedTicket.resolution}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Process Actions</h4>
                        <div className="space-y-3">
                          {selectedTicket.status === 'open' && (
                            <Button className="w-full" variant="outline">
                              <Users className="w-4 h-4 mr-2" />
                              Assign Mediator
                            </Button>
                          )}
                          {selectedTicket.status === 'mediation' && (
                            <Button className="w-full" variant="outline">
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              Schedule Session
                            </Button>
                          )}
                          {selectedTicket.status === 'healing_circle' && (
                            <Button className="w-full" variant="outline">
                              <Heart className="w-4 h-4 mr-2" />
                              Organize Healing Circle
                            </Button>
                          )}
                          <Button className="w-full" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Add Note
                          </Button>
                        </div>

                        <div className="mt-4">
                          <h5 className="font-medium mb-2">Add Update</h5>
                          <Textarea 
                            placeholder="Document progress, agreements, or next steps..."
                            value={newResponse}
                            onChange={(e) => setNewResponse(e.target.value)}
                            className="mb-2"
                          />
                          <Button size="sm">
                            Add Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="mediation" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getUpcomingSessions().map(session => (
                        <div key={session.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{session.sessionType.replace('_', ' ')}</h4>
                            <Badge variant="outline">
                              {session.scheduledDate}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Mediator: {session.mediator}</div>
                            <div>Participants: {session.participants.join(', ')}</div>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Session Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Individual Mediation
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          One-on-one sessions to understand perspectives and prepare for group mediation.
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Group Mediation
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Facilitated dialogue between all parties to find mutually acceptable solutions.
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Healing Circle
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Community-centered process focused on healing relationships and restoring harmony.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Restorative Justice Principles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Focus on Harm and Needs</h4>
                          <p className="text-sm text-gray-600">Address the harm caused and the needs of all affected parties.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Encourage Responsibility</h4>
                          <p className="text-sm text-gray-600">Support accountability without shame or blame.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Include All Stakeholders</h4>
                          <p className="text-sm text-gray-600">Involve everyone affected by the harm in the healing process.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Strengthen Community</h4>
                          <p className="text-sm text-gray-600">Build relationships and community resilience through the process.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conflict Prevention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Clear Communication</h4>
                          <p className="text-sm text-gray-600">Establish clear guidelines and expectations for community interactions.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Regular Check-ins</h4>
                          <p className="text-sm text-gray-600">Schedule regular community meetings to address concerns early.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Skill Building</h4>
                          <p className="text-sm text-gray-600">Provide training in conflict resolution and communication skills.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Cultural Competency</h4>
                          <p className="text-sm text-gray-600">Understand and respect diverse cultural approaches to conflict.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
