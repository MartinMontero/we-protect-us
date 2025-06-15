
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Zap, Shield, AlertTriangle, Eye, Lock, Unlock } from 'lucide-react';

interface ThreatAdaptiveUIProps {
  threatLevel: 'low' | 'medium' | 'high';
  onProgressUpdate: (progress: number) => void;
}

export const ThreatAdaptiveUI: React.FC<ThreatAdaptiveUIProps> = ({
  threatLevel,
  onProgressUpdate
}) => {
  const [isUnderThreat, setIsUnderThreat] = useState(false);
  const [adaptationLevel, setAdaptationLevel] = useState(0);
  const [completedAdaptations, setCompletedAdaptations] = useState<string[]>([]);

  const adaptiveFeatures = [
    {
      id: 'layout_scrambling',
      title: 'Layout Scrambling',
      description: 'UI elements randomly reposition to confuse observers',
      triggerThreat: 'medium'
    },
    {
      id: 'decoy_interfaces',
      title: 'Decoy Interfaces',
      description: 'False screens overlay real content',
      triggerThreat: 'high'
    },
    {
      id: 'steganographic_hiding',
      title: 'Steganographic Content',
      description: 'Critical info hidden in innocent-looking elements',
      triggerThreat: 'high'
    },
    {
      id: 'panic_mode',
      title: 'Emergency Panic Mode',
      description: 'Instant wipe and redirect to safe content',
      triggerThreat: 'high'
    }
  ];

  const triggerThreatSimulation = () => {
    setIsUnderThreat(true);
    setAdaptationLevel(1);
    
    // Simulate escalating adaptations
    const adaptationTimer = setInterval(() => {
      setAdaptationLevel(prev => {
        if (prev >= 4) {
          clearInterval(adaptationTimer);
          setIsUnderThreat(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    // Track completion
    const newCompleted = [...completedAdaptations, 'threat_simulation'];
    setCompletedAdaptations(newCompleted);
    onProgressUpdate((newCompleted.length / 5) * 100);
  };

  const practiceFeature = (featureId: string) => {
    if (!completedAdaptations.includes(featureId)) {
      const newCompleted = [...completedAdaptations, featureId];
      setCompletedAdaptations(newCompleted);
      onProgressUpdate((newCompleted.length / 5) * 100);
    }
  };

  const getUIStyle = () => {
    if (!isUnderThreat) return {};
    
    const styles: React.CSSProperties = {};
    
    if (adaptationLevel >= 1) {
      // Layout scrambling
      styles.transform = `rotate(${Math.sin(Date.now() / 500) * 2}deg)`;
      styles.transition = 'transform 0.3s ease-in-out';
    }
    
    if (adaptationLevel >= 2) {
      // Color distortion
      styles.filter = 'hue-rotate(45deg) contrast(1.2)';
    }
    
    if (adaptationLevel >= 3) {
      // Opacity fluctuation
      styles.opacity = 0.7 + Math.sin(Date.now() / 300) * 0.3;
    }
    
    return styles;
  };

  return (
    <div className="space-y-6" style={getUIStyle()}>
      {/* Threat Status */}
      <Alert className={isUnderThreat ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}>
        <AlertTriangle className={`h-4 w-4 ${isUnderThreat ? 'text-red-600' : 'text-blue-600'}`} />
        <AlertDescription className={isUnderThreat ? 'text-red-800' : 'text-blue-800'}>
          {isUnderThreat 
            ? `THREAT DETECTED - Adaptation Level ${adaptationLevel}/4 Active`
            : 'System Secure - No Active Threats Detected'
          }
        </AlertDescription>
      </Alert>

      {/* Threat Simulation Control */}
      <Card className={isUnderThreat ? 'border-red-300 shadow-lg shadow-red-100' : ''}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Threat Environment Simulator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Experience how the interface adapts under surveillance pressure. 
            Watch UI elements transform to protect sensitive information.
          </p>
          <Button 
            onClick={triggerThreatSimulation}
            disabled={isUnderThreat}
            variant={isUnderThreat ? 'destructive' : 'default'}
            className="w-full"
          >
            {isUnderThreat ? 'Simulation Running...' : 'Start Threat Simulation'}
          </Button>
        </CardContent>
      </Card>

      {/* Adaptive Features Training */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {adaptiveFeatures.map((feature) => {
          const isCompleted = completedAdaptations.includes(feature.id);
          const canPractice = threatLevel === 'high' || 
                             (threatLevel === 'medium' && feature.triggerThreat !== 'high') ||
                             (threatLevel === 'low' && feature.triggerThreat === 'low');
          
          return (
            <Card 
              key={feature.id} 
              className={`${isCompleted ? 'border-green-300 bg-green-50' : ''} ${
                !canPractice ? 'opacity-60' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {isCompleted ? <Lock className="w-4 h-4 text-green-600" /> : <Unlock className="w-4 h-4" />}
                    {feature.title}
                  </CardTitle>
                  <Badge variant={feature.triggerThreat === 'high' ? 'destructive' : 'default'}>
                    {feature.triggerThreat} threat
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                <Button
                  onClick={() => practiceFeature(feature.id)}
                  disabled={!canPractice || isCompleted}
                  variant={isCompleted ? 'secondary' : 'outline'}
                  className="w-full"
                >
                  {isCompleted ? 'Completed' : canPractice ? 'Practice Feature' : 'Locked (Higher Threat Level Required)'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Adaptive Behavior Demo */}
      {isUnderThreat && (
        <Card className="border-orange-300 bg-orange-50 animate-pulse">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Active Adaptations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {adaptationLevel >= 1 && (
                <Badge variant="outline" className="bg-orange-100">
                  Layout Scrambling Active
                </Badge>
              )}
              {adaptationLevel >= 2 && (
                <Badge variant="outline" className="bg-orange-100">
                  Visual Distortion Enabled
                </Badge>
              )}
              {adaptationLevel >= 3 && (
                <Badge variant="outline" className="bg-orange-100">
                  Opacity Modulation Running
                </Badge>
              )}
              {adaptationLevel >= 4 && (
                <Badge variant="destructive">
                  Emergency Mode - Content Obscured
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Display */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Training Progress:</span>
            <Badge variant="outline">
              {completedAdaptations.length}/5 Modules Complete
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
