
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, MessageCircle, Target, Clock, CheckCircle } from 'lucide-react';

interface ConflictCase {
  id: string;
  title: string;
  description: string;
  participants: string[];
  harmType: 'interpersonal' | 'structural' | 'community';
  severity: 'minor' | 'moderate' | 'serious';
  stage: 'reported' | 'mediation' | 'circle' | 'resolution';
  principles: string[];
  culturalContext: string;
}

export const RestorativeJusticeSimulator: React.FC = () => {
  const [activeCase, setActiveCase] = useState<ConflictCase | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [circleParticipants, setCircleParticipants] = useState<string[]>([]);

  const conflictCases: ConflictCase[] = [
    {
      id: 'resource_conflict',
      title: 'Community Garden Resource Dispute',
      description: 'Long-term gardener feels newcomers are taking too many resources without contributing equally to maintenance work.',
      participants: ['Maya (5-year gardener)', 'Jordan (new member)', 'Community Garden Coordinator'],
      harmType: 'interpersonal',
      severity: 'moderate',
      stage: 'reported',
      principles: ['accountability', 'healing', 'community_safety'],
      culturalContext: 'Mixed urban community with different work schedules and cultural approaches to shared resources'
    },
    {
      id: 'exclusion_harm',
      title: 'Cultural Exclusion in Decision-Making',
      description: 'Spanish-speaking community members feel excluded from important decisions due to language barriers and meeting formats.',
      participants: ['Elena (community member)', 'David (meeting facilitator)', 'Maria (translator)', 'Community Council'],
      harmType: 'structural',
      severity: 'serious',
      stage: 'reported',
      principles: ['inclusion', 'cultural_respect', 'structural_change'],
      culturalContext: 'Bilingual community with ongoing gentrification pressures'
    },
    {
      id: 'safety_violation',
      title: 'Boundary Violations at Community Events',
      description: 'Multiple people report feeling unsafe due to one person\'s persistent unwelcome advances and disregard for stated boundaries.',
      participants: ['Alex (affected party)', 'Sam (causing harm)', 'Event Safety Team', 'Witnessed Community Members'],
      harmType: 'interpersonal',
      severity: 'serious',
      stage: 'reported',
      principles: ['consent', 'safety', 'accountability', 'healing'],
      culturalContext: 'Activist community with strong values around consent and trauma-informed practices'
    }
  ];

  const processStages = [
    {
      stage: 'preparation',
      title: 'Preparation & Assessment',
      description: 'Assess readiness, ensure safety, gather initial information',
      actions: ['Safety assessment', 'Stakeholder identification', 'Facilitator selection', 'Ground rules establishment']
    },
    {
      stage: 'individual_meetings',
      title: 'Individual Pre-Meetings',
      description: 'Meet separately with all parties to understand perspectives',
      actions: ['Listen to experiences', 'Identify needs and concerns', 'Assess readiness for dialogue', 'Explain process options']
    },
    {
      stage: 'circle_design',
      title: 'Circle Design & Invitation',
      description: 'Design appropriate process and invite participants',
      actions: ['Choose circle format', 'Invite community members', 'Prepare talking piece', 'Set sacred space']
    },
    {
      stage: 'circle_process',
      title: 'Restorative Circle',
      description: 'Facilitated dialogue focusing on harm, responsibility, and healing',
      actions: ['Opening ceremony', 'Share experiences', 'Acknowledge harm', 'Explore responsibility', 'Identify needs']
    },
    {
      stage: 'agreements',
      title: 'Agreements & Follow-up',
      description: 'Create concrete agreements and ongoing support structures',
      actions: ['Develop agreements', 'Assign support people', 'Schedule check-ins', 'Community reintegration']
    }
  ];

  const restorativePrinciples = {
    accountability: 'Taking responsibility for harm caused while maintaining dignity',
    healing: 'Addressing trauma and supporting recovery for all affected',
    community_safety: 'Ensuring everyone can participate safely in community life',
    inclusion: 'Creating space for all voices and perspectives to be heard',
    cultural_respect: 'Honoring different cultural approaches to conflict and healing',
    structural_change: 'Addressing systemic issues that contribute to harm',
    consent: 'Respecting boundaries and ensuring voluntary participation',
    safety: 'Prioritizing physical and emotional safety throughout the process'
  };

  const startCase = (caseId: string) => {
    const selectedCase = conflictCases.find(c => c.id === caseId);
    if (selectedCase) {
      setActiveCase(selectedCase);
      setCurrentStage(0);
      setCompletedActions([]);
      setCircleParticipants([]);
    }
  };

  const completeAction = (action: string) => {
    if (!completedActions.includes(action)) {
      setCompletedActions([...completedActions, action]);
    }
  };

  const advanceStage = () => {
    if (currentStage < processStages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const addCircleParticipant = (participant: string) => {
    if (!circleParticipants.includes(participant)) {
      setCircleParticipants([...circleParticipants, participant]);
    }
  };

  const getStageProgress = () => {
    if (!activeCase) return 0;
    const currentActions = processStages[currentStage]?.actions || [];
    const completedInStage = completedActions.filter(action => 
      currentActions.includes(action)
    ).length;
    return (completedInStage / currentActions.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Case Selection */}
      {!activeCase && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Restorative Justice Conflict Simulator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Practice facilitating restorative justice processes through realistic community conflict scenarios. 
                Learn to center healing, accountability, and community safety.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {conflictCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">{case_.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={case_.severity === 'serious' ? 'destructive' : case_.severity === 'moderate' ? 'default' : 'secondary'}>
                      {case_.severity}
                    </Badge>
                    <Badge variant="outline">
                      {case_.harmType}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{case_.description}</p>
                  <div className="space-y-2 mb-4">
                    <div>
                      <span className="text-xs font-medium">Participants:</span>
                      <div className="text-xs text-gray-500">{case_.participants.join(', ')}</div>
                    </div>
                    <div>
                      <span className="text-xs font-medium">Cultural Context:</span>
                      <div className="text-xs text-gray-500">{case_.culturalContext}</div>
                    </div>
                  </div>
                  <Button onClick={() => startCase(case_.id)} className="w-full">
                    Begin Case
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Active Case Processing */}
      {activeCase && (
        <div className="space-y-6">
          {/* Case Header */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-red-800">{activeCase.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-red-300 text-red-600">
                    Stage {currentStage + 1}/5
                  </Badge>
                  <Badge variant={activeCase.severity === 'serious' ? 'destructive' : 'default'}>
                    {activeCase.severity}
                  </Badge>
                </div>
              </div>
              <Progress value={(currentStage + 1) / processStages.length * 100} className="mt-2" />
            </CardHeader>
          </Card>

          {/* Current Stage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {processStages[currentStage].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{processStages[currentStage].description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Stage Progress:</span>
                  <span className="text-sm text-gray-500">{Math.round(getStageProgress())}% Complete</span>
                </div>
                <Progress value={getStageProgress()} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {processStages[currentStage].actions.map((action) => {
                  const isCompleted = completedActions.includes(action);
                  return (
                    <Button
                      key={action}
                      variant={isCompleted ? "default" : "outline"}
                      onClick={() => completeAction(action)}
                      disabled={isCompleted}
                      className={`justify-start h-auto p-3 ${isCompleted ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        {isCompleted && <CheckCircle className="w-4 h-4" />}
                        <span className="text-sm">{action}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>

              {getStageProgress() === 100 && currentStage < processStages.length - 1 && (
                <Button onClick={advanceStage} className="w-full mt-4">
                  Advance to Next Stage
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Restorative Principles Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Restorative Principles for This Case
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeCase.principles.map((principleKey) => {
                  const principle = restorativePrinciples[principleKey as keyof typeof restorativePrinciples];
                  return (
                    <div key={principleKey} className="p-3 border rounded-lg bg-blue-50">
                      <h4 className="font-medium text-blue-800 mb-1 capitalize">
                        {principleKey.replace('_', ' ')}
                      </h4>
                      <p className="text-sm text-blue-700">{principle}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Case Completion */}
          {currentStage === processStages.length - 1 && getStageProgress() === 100 && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-green-800 mb-2">Case Complete!</h3>
                  <p className="text-green-700 mb-4">
                    You have successfully guided this restorative justice process through all stages.
                  </p>
                  <Button onClick={() => setActiveCase(null)}>
                    Return to Case Selection
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
