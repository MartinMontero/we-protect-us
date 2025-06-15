
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Loader2, 
  Eye, 
  MousePointer, 
  Volume2,
  Palette
} from 'lucide-react';

const liveTests = [
  {
    id: 'color-contrast',
    name: 'Color Contrast Analysis',
    description: 'Check color contrast ratios across all interface elements',
    icon: Palette,
    estimatedTime: '30s'
  },
  {
    id: 'keyboard-navigation',
    name: 'Keyboard Navigation Test',
    description: 'Verify all interactive elements are keyboard accessible',
    icon: MousePointer,
    estimatedTime: '45s'
  },
  {
    id: 'screen-reader',
    name: 'Screen Reader Compatibility',
    description: 'Test with multiple screen reader technologies',
    icon: Volume2,
    estimatedTime: '60s'
  },
  {
    id: 'visual-validation',
    name: 'Visual Validation',
    description: 'Check for visual accessibility issues and layout problems',
    icon: Eye,
    estimatedTime: '40s'
  }
];

interface InteractiveTestsProps {
  onRunTest: (testType: string) => void;
  activeTest: string | null;
}

export const InteractiveTests: React.FC<InteractiveTestsProps> = ({ 
  onRunTest, 
  activeTest 
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Play className="w-5 h-5 mr-2" />
          Interactive Testing Suite
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveTests.map((test) => {
            const Icon = test.icon;
            const isRunning = activeTest === test.id;
            
            return (
              <div 
                key={test.id} 
                className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-blue-50 mr-3">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">
                        {test.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        ~{test.estimatedTime}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">
                  {test.description}
                </p>
                
                <Button
                  onClick={() => onRunTest(test.id)}
                  disabled={isRunning}
                  className="w-full"
                  variant="outline"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Test
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
