
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, Hand, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export const DigitalHandSignals: React.FC = () => {
  const [currentSignal, setCurrentSignal] = useState<string | null>(null);
  const [signalCounts, setSignalCounts] = useState<Record<string, number>>({
    agree: 12,
    disagree: 3,
    clarification: 2,
    direct_response: 1,
    process_point: 0,
    block: 0
  });

  const signals = [
    {
      id: 'agree',
      name: 'Agree',
      icon: ThumbsUp,
      color: 'bg-green-100 text-green-700 border-green-300',
      description: 'I support this proposal'
    },
    {
      id: 'disagree',
      name: 'Disagree',
      icon: ThumbsDown,
      color: 'bg-red-100 text-red-700 border-red-300',
      description: 'I have concerns with this proposal'
    },
    {
      id: 'clarification',
      name: 'Clarification',
      icon: Hand,
      color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      description: 'I need more information'
    },
    {
      id: 'direct_response',
      name: 'Direct Response',
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-700 border-blue-300',
      description: 'I want to respond directly to the speaker'
    },
    {
      id: 'process_point',
      name: 'Process Point',
      icon: Clock,
      color: 'bg-purple-100 text-purple-700 border-purple-300',
      description: 'Point about meeting process'
    },
    {
      id: 'block',
      name: 'Block',
      icon: AlertTriangle,
      color: 'bg-red-200 text-red-800 border-red-400',
      description: 'Serious ethical objection - halt discussion'
    }
  ];

  const handleSignal = (signalId: string) => {
    setCurrentSignal(signalId);
    setSignalCounts(prev => ({
      ...prev,
      [signalId]: prev[signalId] + 1
    }));
    
    // Auto-clear signal after 10 seconds
    setTimeout(() => {
      setCurrentSignal(null);
    }, 10000);
  };

  return (
    <div className="space-y-6">
      {/* Current Signal Display */}
      {currentSignal && (
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Your signal is active:</span>
              <Badge variant="outline" className="capitalize">
                {signals.find(s => s.id === currentSignal)?.name}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Signal Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {signals.map((signal) => {
          const Icon = signal.icon;
          const isActive = currentSignal === signal.id;
          const count = signalCounts[signal.id];
          
          return (
            <Button
              key={signal.id}
              variant="outline"
              className={`h-auto p-4 flex flex-col items-center gap-2 relative ${
                isActive ? signal.color : ''
              }`}
              onClick={() => handleSignal(signal.id)}
            >
              <Icon className={`w-6 h-6 ${isActive ? '' : 'text-gray-600'}`} />
              <div className="text-center">
                <div className="font-medium text-sm">{signal.name}</div>
                <div className="text-xs text-gray-500">{signal.description}</div>
              </div>
              {count > 0 && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center"
                >
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      {/* Live Signal Feed */}
      <Card>
        <CardContent className="pt-4">
          <h4 className="font-medium mb-3">Live Signal Feed</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Overall sentiment</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(signalCounts.agree / (signalCounts.agree + signalCounts.disagree + 1)) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">
                    {Math.round((signalCounts.agree / (signalCounts.agree + signalCounts.disagree + 1)) * 100)}% support
                  </span>
                </div>
              </div>
            </div>
            
            {signalCounts.block > 0 && (
              <div className="p-2 bg-red-50 border border-red-200 rounded text-sm">
                <AlertTriangle className="w-4 h-4 text-red-600 inline mr-2" />
                <strong>Block raised!</strong> Discussion should pause for resolution.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
