
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Brain, Target, Clock, CheckCircle } from 'lucide-react';

interface GenerativeThreatScenariosProps {
  threatLevel: 'low' | 'medium' | 'high';
  onProgressUpdate: (progress: number) => void;
}

interface ThreatScenario {
  id: string;
  title: string;
  context: string;
  threatActors: string[];
  vulnerabilities: string[];
  timeframe: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  correctResponses: string[];
}

export const GenerativeThreatScenarios: React.FC<GenerativeThreatScenariosProps> = ({
  threatLevel,
  onProgressUpdate
}) => {
  const [currentScenario, setCurrentScenario] = useState<ThreatScenario | null>(null);
  const [userResponse, setUserResponse] = useState('');
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  const scenarioTemplates: ThreatScenario[] = [
    {
      id: 'community_meeting_infiltration',
      title: 'Community Meeting Infiltration',
      context: 'During a weekly community organizing meeting, you notice someone new taking extensive notes and asking probing questions about future actions and key organizers. They claim to be "just interested" but their questions seem unusually specific about security protocols and individual members.',
      threatActors: ['Law Enforcement Informant', 'Corporate Spy', 'Hostile Activist'],
      vulnerabilities: ['Information Leakage', 'Member Safety', 'Operational Security'],
      timeframe: 'Immediate (during meeting)',
      severity: 'medium',
      correctResponses: [
        'Politely limit sensitive discussion topics',
        'Privately alert trusted organizers',
        'Implement buddy system for new attendees',
        'Document suspicious behavior discretely'
      ]
    },
    {
      id: 'digital_communication_compromise',
      title: 'Digital Communication Compromise',
      context: 'Several community members report receiving suspicious messages that appear to be from other organizers, asking for sensitive information about upcoming actions. The messages use slightly incorrect language patterns and ask for details that the supposed senders would already know.',
      threatActors: ['State Surveillance', 'Social Engineering Attack', 'Account Takeover'],
      vulnerabilities: ['Communication Security', 'Member Authentication', 'Information Integrity'],
      timeframe: '24-48 hours',
      severity: 'high',
      correctResponses: [
        'Immediately verify sender identity through secondary channel',
        'Alert all members about potential compromise',
        'Switch to more secure communication platform',
        'Implement verification protocols for sensitive requests'
      ]
    },
    {
      id: 'resource_distribution_surveillance',
      title: 'Resource Distribution Surveillance',
      context: 'Your mutual aid group has been running a food distribution program. Recently, you\'ve noticed the same unmarked van parked nearby during distributions, with occupants who appear to be photographing participants and volunteers. Local community members are becoming nervous.',
      threatActors: ['Immigration Enforcement', 'Law Enforcement', 'Hostile Documentation'],
      vulnerabilities: ['Participant Safety', 'Community Trust', 'Program Continuity'],
      timeframe: 'Ongoing',
      severity: 'high',
      correctResponses: [
        'Move distribution to different location',
        'Implement counter-surveillance measures',
        'Brief volunteers on surveillance awareness',
        'Coordinate with legal observers'
      ]
    },
    {
      id: 'infiltrator_escalation_tactics',
      title: 'Infiltrator Escalation Tactics',
      context: 'A member who joined recently has been pushing for increasingly aggressive tactics and trying to convince others to engage in illegal activities. They seem frustrated when the group prefers legal, non-violent approaches and keeps bringing up "more effective" methods.',
      threatActors: ['Agent Provocateur', 'Law Enforcement Plant', 'Extremist Influence'],
      vulnerabilities: ['Group Integrity', 'Legal Safety', 'Member Safety'],
      timeframe: 'Several weeks',
      severity: 'critical',
      correctResponses: [
        'Document concerning statements and behavior',
        'Reinforce group principles and boundaries',
        'Privately discuss concerns with trusted core members',
        'Consider formal intervention or removal process'
      ]
    },
    {
      id: 'financial_tracking_investigation',
      title: 'Financial Tracking Investigation',
      context: 'Your organization has received several large anonymous donations through various platforms. While grateful, you notice patterns suggesting these might be designed to create financial trails that could be used to investigate your funding sources and spending patterns.',
      threatActors: ['Financial Intelligence Unit', 'Regulatory Investigation', 'Hostile Research'],
      vulnerabilities: ['Financial Privacy', 'Donor Safety', 'Organizational Security'],
      timeframe: 'Months',
      severity: 'medium',
      correctResponses: [
        'Implement donation screening procedures',
        'Diversify funding sources and platforms',
        'Maintain transparent but secure financial records',
        'Consult with legal experts on compliance'
      ]
    }
  ];

  const generateScenario = () => {
    const availableScenarios = scenarioTemplates.filter(
      scenario => {
        const severityMatch = 
          threatLevel === 'high' || 
          (threatLevel === 'medium' && scenario.severity !== 'critical') ||
          (threatLevel === 'low' && ['low', 'medium'].includes(scenario.severity));
        
        return severityMatch && !completedScenarios.includes(scenario.id);
      }
    );

    if (availableScenarios.length === 0) return;

    const randomScenario = availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
    setCurrentScenario(randomScenario);
    setUserResponse('');
    setShowSolution(false);
  };

  const submitResponse = () => {
    if (!currentScenario || !userResponse.trim()) return;

    const newCompleted = [...completedScenarios, currentScenario.id];
    setCompletedScenarios(newCompleted);
    onProgressUpdate((newCompleted.length / scenarioTemplates.length) * 100);
    setShowSolution(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 border-red-600';
      case 'high': return 'text-orange-600 border-orange-600';
      case 'medium': return 'text-yellow-600 border-yellow-600';
      default: return 'text-green-600 border-green-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Scenario Generator */}
      {!currentScenario && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI-Generated Threat Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Practice responding to realistic security threats using AI-generated scenarios 
              tailored to your current threat level. Each scenario presents unique challenges 
              requiring strategic thinking and community safety awareness.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{scenarioTemplates.length}</div>
                <div className="text-sm text-gray-500">Total Scenarios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedScenarios.length}</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {scenarioTemplates.filter(s => {
                    const severityMatch = 
                      threatLevel === 'high' || 
                      (threatLevel === 'medium' && s.severity !== 'critical') ||
                      (threatLevel === 'low' && ['low', 'medium'].includes(s.severity));
                    return severityMatch && !completedScenarios.includes(s.id);
                  }).length}
                </div>
                <div className="text-sm text-gray-500">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{threatLevel}</div>
                <div className="text-sm text-gray-500">Threat Level</div>
              </div>
            </div>
            <Button onClick={generateScenario} className="w-full">
              Generate New Scenario
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Active Scenario */}
      {currentScenario && !showSolution && (
        <Card className="border-orange-200 shadow-lg">
          <CardHeader className="bg-orange-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="w-5 h-5" />
                {currentScenario.title}
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className={getSeverityColor(currentScenario.severity)}>
                  {currentScenario.severity} severity
                </Badge>
                <Badge variant="outline" className="border-blue-500 text-blue-600">
                  <Clock className="w-3 h-3 mr-1" />
                  {currentScenario.timeframe}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Scenario:</h4>
              <p className="text-gray-700 leading-relaxed">{currentScenario.context}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Potential Threat Actors:</h4>
                <div className="space-y-1">
                  {currentScenario.threatActors.map((actor, index) => (
                    <Badge key={index} variant="destructive" className="mr-2 mb-1">
                      <Target className="w-3 h-3 mr-1" />
                      {actor}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Vulnerabilities:</h4>
                <div className="space-y-1">
                  {currentScenario.vulnerabilities.map((vuln, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-1 border-red-300 text-red-600">
                      {vuln}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Your Response Strategy:</h4>
              <Textarea
                placeholder="Describe how you would respond to this threat scenario. Consider immediate actions, long-term strategies, and community safety measures..."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                rows={6}
                className="w-full"
              />
            </div>

            <Button 
              onClick={submitResponse}
              disabled={!userResponse.trim()}
              className="w-full"
            >
              Submit Response
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Solution & Feedback */}
      {currentScenario && showSolution && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              Recommended Response Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Your Response:</h4>
              <div className="p-3 bg-white border rounded-lg">
                <p className="text-gray-700">{userResponse}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Expert Recommendations:</h4>
              <div className="space-y-2">
                {currentScenario.correctResponses.map((response, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-white border rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{response}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={() => {
                setCurrentScenario(null);
                setShowSolution(false);
              }}
              className="w-full"
            >
              Continue Training
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Progress Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Math.round((completedScenarios.length / scenarioTemplates.length) * 100)}%
            </div>
            <div className="text-gray-600 mb-4">Training Progress</div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-green-600">{completedScenarios.length}</div>
                <div className="text-gray-500">Completed</div>
              </div>
              <div>
                <div className="font-medium text-blue-600">
                  {scenarioTemplates.length - completedScenarios.length}
                </div>
                <div className="text-gray-500">Remaining</div>
              </div>
              <div>
                <div className="font-medium text-purple-600">{threatLevel}</div>
                <div className="text-gray-500">Difficulty</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
