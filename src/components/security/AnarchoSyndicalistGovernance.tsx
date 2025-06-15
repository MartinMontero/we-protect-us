
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RestorativeJusticeSimulator } from './RestorativeJusticeSimulator';
import { SecurityTrainingDojo } from './SecurityTrainingDojo';
import { Users, Shield, Heart, Zap, Target, CheckCircle } from 'lucide-react';

export const AnarchoSyndicalistGovernance: React.FC = () => {
  const [activeModule, setActiveModule] = useState('overview');
  const [completedTraining, setCompletedTraining] = useState<string[]>([]);

  const governanceModules = [
    {
      id: 'restorative_justice',
      title: 'Restorative Justice Circles',
      description: 'Practice healing-centered conflict resolution',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      status: completedTraining.includes('restorative_justice') ? 'completed' : 'available'
    },
    {
      id: 'security_training',
      title: 'Security Culture Training',
      description: 'Learn revolutionary defense systems',
      icon: Shield,
      color: 'from-gray-600 to-gray-800',
      status: completedTraining.includes('security_training') ? 'completed' : 'available'
    },
    {
      id: 'proposal_pipeline',
      title: 'Transparent Proposal Pipeline',
      description: 'Democratic decision-making processes',
      icon: Users,
      color: 'from-blue-500 to-purple-500',
      status: 'coming_soon'
    },
    {
      id: 'direct_action',
      title: 'Direct Action Coordination',
      description: 'Organize effective community resistance',
      icon: Zap,
      color: 'from-orange-500 to-red-600',
      status: 'coming_soon'
    }
  ];

  const principles = [
    {
      title: 'Worker Self-Management',
      description: 'Democratic control of workplaces and decision-making processes'
    },
    {
      title: 'Mutual Aid Networks',
      description: 'Solidarity-based support systems that build community resilience'
    },
    {
      title: 'Direct Democracy',
      description: 'Consensus-based governance without hierarchical representation'
    },
    {
      title: 'Revolutionary Defense',
      description: 'Community-controlled security that protects against state and corporate violence'
    },
    {
      title: 'Restorative Justice',
      description: 'Healing-centered approaches to harm that strengthen community bonds'
    },
    {
      title: 'Anti-Authoritarianism',
      description: 'Resistance to all forms of domination and oppression'
    }
  ];

  const markModuleComplete = (moduleId: string) => {
    if (!completedTraining.includes(moduleId)) {
      setCompletedTraining([...completedTraining, moduleId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Revolutionary Header */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-red-900 via-black to-red-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black/20" />
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-red-500/30 border border-red-400/50">
              <Users className="w-8 h-8 text-red-200" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                Anarcho-Syndicalist Governance Systems
              </CardTitle>
              <p className="text-red-200 text-lg">
                Revolutionary tools for community self-defense and democratic organization
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {governanceModules.map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.id} className="text-center">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} mx-auto mb-2 flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium">{module.title}</div>
                  <Badge 
                    variant={module.status === 'completed' ? 'default' : 'secondary'}
                    className="mt-1"
                  >
                    {module.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {module.status.replace('_', ' ')}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Anarcho-Syndicalist Principles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-red-600" />
            Core Anarcho-Syndicalist Principles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {principles.map((principle, index) => (
              <div key={index} className="p-4 border border-red-200 rounded-lg bg-red-50/50 hover:bg-red-50 transition-colors duration-200">
                <h3 className="font-bold text-red-800 mb-2">{principle.title}</h3>
                <p className="text-sm text-red-700">{principle.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Modules */}
      <Tabs value={activeModule} onValueChange={setActiveModule}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="restorative">Restorative Justice</TabsTrigger>
          <TabsTrigger value="security">Security Training</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revolutionary Training Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Build the skills needed for community self-defense, democratic governance, 
                and revolutionary organizing. Each module provides hands-on training in 
                essential anarcho-syndicalist practices.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {governanceModules.filter(m => m.status !== 'coming_soon').map((module) => {
                  const Icon = module.icon;
                  return (
                    <Card key={module.id} className="hover:shadow-lg transition-shadow duration-200">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${module.color}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <Badge variant={module.status === 'completed' ? 'default' : 'secondary'}>
                              {module.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {module.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{module.description}</p>
                        <Button 
                          onClick={() => setActiveModule(module.id.replace('_', ''))}
                          disabled={module.status === 'coming_soon'}
                          className="w-full"
                        >
                          {module.status === 'completed' ? 'Review Training' : 'Start Training'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restorative" className="space-y-4">
          <RestorativeJusticeSimulator />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecurityTrainingDojo />
        </TabsContent>
      </Tabs>

      {/* Revolutionary Call to Action */}
      <Card className="bg-gradient-to-r from-red-600 to-black text-white">
        <CardContent className="pt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">
            "The master's tools will never dismantle the master's house"
          </h2>
          <p className="text-red-200 mb-6">
            Build alternative systems of power rooted in mutual aid, direct democracy, 
            and community self-defense. The revolution starts with organized resistance.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="secondary" 
              onClick={() => setActiveModule('restorative')}
              className="bg-white text-red-600 hover:bg-red-50"
            >
              Practice Restorative Justice
            </Button>
            <Button 
              variant="secondary"
              onClick={() => setActiveModule('security')}
              className="bg-white text-red-600 hover:bg-red-50"
            >
              Train Security Culture
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
