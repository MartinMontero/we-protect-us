
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Camera, Radio, MapPin, Clock, CheckCircle, X } from 'lucide-react';

interface SurveillanceDetectionDrillsProps {
  threatLevel: 'low' | 'medium' | 'high';
  onProgressUpdate: (progress: number) => void;
}

export const SurveillanceDetectionDrills: React.FC<SurveillanceDetectionDrillsProps> = ({
  threatLevel,
  onProgressUpdate
}) => {
  const [activeDrill, setActiveDrill] = useState<string | null>(null);
  const [drillProgress, setDrillProgress] = useState(0);
  const [detectedThreats, setDetectedThreats] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const drills = [
    {
      id: 'street_surveillance',
      title: 'Street-Level Surveillance Detection',
      description: 'Identify foot surveillance and vehicular tracking',
      threats: ['repeated_faces', 'following_vehicles', 'staged_interactions', 'photo_taking'],
      difficulty: threatLevel === 'high' ? 'expert' : threatLevel === 'medium' ? 'intermediate' : 'beginner',
      timeLimit: threatLevel === 'high' ? 30 : threatLevel === 'medium' ? 60 : 90
    },
    {
      id: 'digital_surveillance',
      title: 'Digital Surveillance Awareness',
      description: 'Recognize digital tracking and monitoring attempts',
      threats: ['device_pinging', 'wifi_tracking', 'social_media_monitoring', 'location_triangulation'],
      difficulty: threatLevel === 'high' ? 'expert' : threatLevel === 'medium' ? 'intermediate' : 'beginner',
      timeLimit: threatLevel === 'high' ? 45 : threatLevel === 'medium' ? 75 : 120
    },
    {
      id: 'counter_surveillance',
      title: 'Counter-Surveillance Techniques',
      description: 'Practice techniques to evade and counter surveillance',
      threats: ['route_variation', 'reflection_checks', 'crowded_areas', 'decoy_movements'],
      difficulty: threatLevel === 'high' ? 'expert' : threatLevel === 'medium' ? 'intermediate' : 'beginner',
      timeLimit: threatLevel === 'high' ? 60 : threatLevel === 'medium' ? 90 : 150
    }
  ];

  const threatIndicators = {
    repeated_faces: { icon: Eye, description: 'Same person spotted multiple times' },
    following_vehicles: { icon: Camera, description: 'Vehicle maintaining distance behind you' },
    staged_interactions: { icon: Radio, description: 'Artificial interactions to get close' },
    photo_taking: { icon: Camera, description: 'Covert photography attempts' },
    device_pinging: { icon: Radio, description: 'Unknown device connection attempts' },
    wifi_tracking: { icon: MapPin, description: 'Unusual WiFi network behavior' },
    social_media_monitoring: { icon: Eye, description: 'Rapid engagement on posts' },
    location_triangulation: { icon: MapPin, description: 'GPS/cell tower tracking patterns' },
    route_variation: { icon: MapPin, description: 'Changing routes to detect followers' },
    reflection_checks: { icon: Eye, description: 'Using reflective surfaces for observation' },
    crowded_areas: { icon: Eye, description: 'Moving through crowds to lose surveillance' },
    decoy_movements: { icon: MapPin, description: 'False movements to confuse trackers' }
  };

  const startDrill = (drillId: string) => {
    const drill = drills.find(d => d.id === drillId);
    if (!drill) return;

    setActiveDrill(drillId);
    setTimeRemaining(drill.timeLimit);
    setDetectedThreats([]);
    setDrillProgress(0);

    // Start countdown
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endDrill();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const detectThreat = (threatId: string) => {
    if (!detectedThreats.includes(threatId)) {
      const newDetected = [...detectedThreats, threatId];
      setDetectedThreats(newDetected);
      
      const activeDrillData = drills.find(d => d.id === activeDrill);
      if (activeDrillData) {
        const progress = (newDetected.length / activeDrillData.threats.length) * 100;
        setDrillProgress(progress);
        
        if (progress === 100) {
          endDrill();
        }
      }
    }
  };

  const endDrill = () => {
    const finalProgress = drillProgress;
    onProgressUpdate(finalProgress);
    
    // Reset after showing results
    setTimeout(() => {
      setActiveDrill(null);
      setDrillProgress(0);
      setDetectedThreats([]);
      setTimeRemaining(0);
    }, 3000);
  };

  const getProgressColor = () => {
    if (drillProgress >= 80) return 'bg-green-500';
    if (drillProgress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Drill Selection */}
      {!activeDrill && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {drills.map((drill) => (
            <Card key={drill.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5" />
                  {drill.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{drill.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Difficulty:</span>
                    <Badge variant={drill.difficulty === 'expert' ? 'destructive' : drill.difficulty === 'intermediate' ? 'default' : 'secondary'}>
                      {drill.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Time Limit:</span>
                    <span className="text-xs font-medium">{drill.timeLimit}s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Threats:</span>
                    <span className="text-xs font-medium">{drill.threats.length} indicators</span>
                  </div>
                </div>
                <Button 
                  onClick={() => startDrill(drill.id)}
                  className="w-full"
                >
                  Start Drill
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Active Drill */}
      {activeDrill && (
        <Card className="border-red-200 shadow-lg">
          <CardHeader className="bg-red-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <Eye className="w-5 h-5" />
                {drills.find(d => d.id === activeDrill)?.title}
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span className="font-mono text-lg font-bold text-red-600">
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <Badge variant="destructive">
                  {detectedThreats.length}/{drills.find(d => d.id === activeDrill)?.threats.length || 0} Detected
                </Badge>
              </div>
            </div>
            <Progress value={drillProgress} className={`h-3 ${getProgressColor()}`} />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {drills.find(d => d.id === activeDrill)?.threats.map((threatId) => {
                const threat = threatIndicators[threatId as keyof typeof threatIndicators];
                const Icon = threat.icon;
                const isDetected = detectedThreats.includes(threatId);
                
                return (
                  <Button
                    key={threatId}
                    variant={isDetected ? "default" : "outline"}
                    className={`h-20 flex flex-col gap-2 ${isDetected ? 'bg-green-500 hover:bg-green-600' : 'hover:bg-red-50'}`}
                    onClick={() => detectThreat(threatId)}
                    disabled={isDetected}
                  >
                    <div className="flex items-center gap-1">
                      <Icon className="w-4 h-4" />
                      {isDetected && <CheckCircle className="w-3 h-3" />}
                    </div>
                    <span className="text-xs text-center leading-tight">
                      {threat.description}
                    </span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Drill Results */}
      {activeDrill && drillProgress === 100 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-green-800 mb-2">Drill Complete!</h3>
              <p className="text-green-700">
                You successfully identified all surveillance threats in {(drills.find(d => d.id === activeDrill)?.timeLimit ?? 0) - timeRemaining} seconds.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
