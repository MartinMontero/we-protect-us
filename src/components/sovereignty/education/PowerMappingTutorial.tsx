
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Circle, Users, Building, Zap } from 'lucide-react';
import { PowerMapNode } from '../types';

export const PowerMappingTutorial: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [mapStage, setMapStage] = useState<'identify' | 'analyze' | 'strategize'>('identify');

  const sampleNodes: PowerMapNode[] = [
    {
      id: 'mayor',
      name: 'Mayor Johnson',
      type: 'individual',
      influence: 90,
      accessibility: 30,
      alignment: 'neutral',
      connections: ['city_council', 'developers'],
      position: { x: 200, y: 100 }
    },
    {
      id: 'city_council',
      name: 'City Council',
      type: 'institution',
      influence: 85,
      accessibility: 60,
      alignment: 'neutral',
      connections: ['mayor', 'community_orgs'],
      position: { x: 300, y: 200 }
    },
    {
      id: 'developers',
      name: 'Real Estate Developers',
      type: 'organization',
      influence: 75,
      accessibility: 10,
      alignment: 'opposed',
      connections: ['mayor', 'bank'],
      position: { x: 100, y: 150 }
    },
    {
      id: 'community_orgs',
      name: 'Community Organizations',
      type: 'organization',
      influence: 45,
      accessibility: 90,
      alignment: 'supportive',
      connections: ['city_council', 'residents'],
      position: { x: 400, y: 250 }
    },
    {
      id: 'residents',
      name: 'Local Residents',
      type: 'organization',
      influence: 40,
      accessibility: 95,
      alignment: 'supportive',
      connections: ['community_orgs'],
      position: { x: 450, y: 350 }
    },
    {
      id: 'bank',
      name: 'First National Bank',
      type: 'institution',
      influence: 70,
      accessibility: 5,
      alignment: 'opposed',
      connections: ['developers'],
      position: { x: 50, y: 250 }
    }
  ];

  const getNodeIcon = (type: PowerMapNode['type']) => {
    switch (type) {
      case 'individual': return Users;
      case 'organization': return Circle;
      case 'institution': return Building;
      case 'resource': return Zap;
    }
  };

  const getAlignmentColor = (alignment: PowerMapNode['alignment']) => {
    switch (alignment) {
      case 'supportive': return 'text-green-600 bg-green-100';
      case 'opposed': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-gray-600 bg-gray-100';
      case 'unknown': return 'text-purple-600 bg-purple-100';
    }
  };

  const tutorialSteps = [
    {
      stage: 'identify',
      title: 'Identify Key Players',
      description: 'Map out all individuals, organizations, and institutions that have influence over your issue.',
      tasks: [
        'List decision-makers and influencers',
        'Identify gatekeepers and allies',
        'Include both formal and informal power holders'
      ]
    },
    {
      stage: 'analyze',
      title: 'Analyze Power & Access',
      description: 'Assess each actor\'s level of influence and how accessible they are to your organizing.',
      tasks: [
        'Rate influence level (1-100)',
        'Assess accessibility (1-100)',
        'Determine alignment with your goals'
      ]
    },
    {
      stage: 'strategize',
      title: 'Develop Strategy',
      description: 'Use the power map to plan your organizing approach and build effective coalitions.',
      tasks: [
        'Prioritize high-influence, accessible allies',
        'Plan approaches for neutral parties',
        'Develop strategies for opponents'
      ]
    }
  ];

  const currentStep = tutorialSteps.find(step => step.stage === mapStage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Power Mapping Tutorial
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tutorial Steps */}
        <div className="flex gap-2 mb-4">
          {tutorialSteps.map((step, index) => (
            <Button
              key={step.stage}
              variant={mapStage === step.stage ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapStage(step.stage)}
              className="flex-1"
            >
              {index + 1}. {step.title}
            </Button>
          ))}
        </div>

        {/* Current Step Description */}
        {currentStep && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-sm mb-1">{currentStep.title}</h4>
            <p className="text-sm text-blue-800 mb-2">{currentStep.description}</p>
            <ul className="text-xs text-blue-700 space-y-1">
              {currentStep.tasks.map((task, index) => (
                <li key={index}>• {task}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Power Map Visualization */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Sample Power Map: Housing Campaign</h4>
          <div className="relative h-96 border rounded-lg bg-gray-50 overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="border border-gray-300" />
                ))}
              </div>
            </div>

            {/* Nodes */}
            {sampleNodes.map((node) => {
              const Icon = getNodeIcon(node.type);
              return (
                <div
                  key={node.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedNode === node.id ? 'z-10' : 'z-5'
                  }`}
                  style={{ 
                    left: `${node.position.x}px`, 
                    top: `${node.position.y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                >
                  <div className={`
                    p-2 border-2 rounded-lg bg-white shadow-md transition-all
                    ${selectedNode === node.id ? 'border-blue-500 scale-110' : 'border-gray-300'}
                    ${getAlignmentColor(node.alignment)}
                  `}>
                    <Icon className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs font-medium text-center whitespace-nowrap">
                      {node.name}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Connection lines */}
            <svg className="absolute inset-0 pointer-events-none">
              {sampleNodes.map((node) =>
                node.connections.map((connectionId) => {
                  const targetNode = sampleNodes.find(n => n.id === connectionId);
                  if (!targetNode) return null;
                  
                  return (
                    <line
                      key={`${node.id}-${connectionId}`}
                      x1={node.position.x}
                      y1={node.position.y}
                      x2={targetNode.position.x}
                      y2={targetNode.position.y}
                      stroke="#cbd5e1"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  );
                })
              )}
            </svg>
          </div>
        </div>

        {/* Node Details */}
        {selectedNode && (
          <div className="p-3 border rounded-lg">
            {(() => {
              const node = sampleNodes.find(n => n.id === selectedNode);
              if (!node) return null;
              
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-sm">{node.name}</h5>
                    <Badge variant="outline">{node.type}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="font-medium">Influence:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-blue-600 h-1 rounded-full"
                            style={{ width: `${node.influence}%` }}
                          />
                        </div>
                        <span>{node.influence}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium">Accessibility:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-green-600 h-1 rounded-full"
                            style={{ width: `${node.accessibility}%` }}
                          />
                        </div>
                        <span>{node.accessibility}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium">Alignment:</span>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {node.alignment}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-xs">Connected to:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {node.connections.map((connId) => {
                        const connNode = sampleNodes.find(n => n.id === connId);
                        return connNode ? (
                          <Badge key={connId} variant="secondary" className="text-xs">
                            {connNode.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 text-green-600 mt-0.5" />
            <div className="text-sm text-green-800">
              <strong>Power Mapping:</strong> Visual analysis tool for understanding decision-making 
              networks and planning strategic organizing approaches.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
