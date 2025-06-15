
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SurveillanceDetectionDrills } from './SurveillanceDetectionDrills';
import { ThreatAdaptiveUI } from './ThreatAdaptiveUI';
import { GenerativeThreatScenarios } from './GenerativeThreatScenarios';
import { Shield, Eye, Zap, AlertTriangle, Users, Lock } from 'lucide-react';

export const SecurityTrainingDojo: React.FC = () => {
  const [threatLevel, setThreatLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [activeModule, setActiveModule] = useState('surveillance');
  const [trainingProgress, setTrainingProgress] = useState({
    surveillance: 0,
    threatResponse: 0,
    scenarios: 0
  });

  const modules = [
    {
      id: 'surveillance',
      title: 'Surveillance Detection',
      description: 'Learn to identify and counter surveillance techniques',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'adaptive',
      title: 'Threat Adaptive Training',
      description: 'Experience how interfaces adapt under pressure',
      icon: Zap,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'scenarios',
      title: 'Generative Scenarios',
      description: 'Practice with AI-generated threat scenarios',
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const updateProgress = (module: string, progress: number) => {
    setTrainingProgress(prev => ({
      ...prev,
      [module]: Math.max(prev[module as keyof typeof prev], progress)
    }));
  };

  const overallProgress = Math.round(
    (trainingProgress.surveillance + trainingProgress.threatResponse + trainingProgress.scenarios) / 3
  );

  return (
    <div className="space-y-6">
      {/* Dojo Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Security Training Dojo</CardTitle>
                <p className="text-slate-300 mt-1">Revolutionary defense systems for community protection</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-red-400">{overallProgress}%</div>
              <div className="text-sm text-slate-400">Overall Mastery</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modules.map((module) => {
              const Icon = module.icon;
              const progress = trainingProgress[module.id as keyof typeof trainingProgress];
              
              return (
                <div
                  key={module.id}
                  className={`p-4 rounded-lg border border-slate-700 bg-gradient-to-br ${module.color} bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 cursor-pointer`}
                  onClick={() => setActiveModule(module.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{module.title}</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{module.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={activeModule === module.id ? 'default' : 'secondary'}>
                      {progress}% Complete
                    </Badge>
                    {activeModule === module.id && (
                      <Badge className="bg-red-500 text-white">Active</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Threat Level Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Threat Environment Simulation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Threat Level:</span>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <Button
                  key={level}
                  variant={threatLevel === level ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setThreatLevel(level)}
                  className={
                    level === 'high' ? 'border-red-500 text-red-500 hover:bg-red-50' :
                    level === 'medium' ? 'border-orange-500 text-orange-500 hover:bg-orange-50' :
                    'border-green-500 text-green-500 hover:bg-green-50'
                  }
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
            <Badge 
              variant="outline"
              className={
                threatLevel === 'high' ? 'border-red-500 text-red-600' :
                threatLevel === 'medium' ? 'border-orange-500 text-orange-600' :
                'border-green-500 text-green-600'
              }
            >
              {threatLevel === 'high' ? 'High Risk' : threatLevel === 'medium' ? 'Elevated' : 'Secure'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Training Modules */}
      <Tabs value={activeModule} onValueChange={setActiveModule}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="surveillance">Surveillance Detection</TabsTrigger>
          <TabsTrigger value="adaptive">Adaptive UI</TabsTrigger>
          <TabsTrigger value="scenarios">Threat Scenarios</TabsTrigger>
        </TabsList>

        <TabsContent value="surveillance" className="space-y-4">
          <SurveillanceDetectionDrills 
            threatLevel={threatLevel}
            onProgressUpdate={(progress) => updateProgress('surveillance', progress)}
          />
        </TabsContent>

        <TabsContent value="adaptive" className="space-y-4">
          <ThreatAdaptiveUI 
            threatLevel={threatLevel}
            onProgressUpdate={(progress) => updateProgress('threatResponse', progress)}
          />
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <GenerativeThreatScenarios 
            threatLevel={threatLevel}
            onProgressUpdate={(progress) => updateProgress('scenarios', progress)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
