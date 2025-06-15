
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mouse, Keyboard, Eye, Volume2, Info } from 'lucide-react';

interface InteractiveTestsProps {
  onRunTest: (testType: string) => void;
  activeTest: string | null;
}

export const InteractiveTests: React.FC<InteractiveTestsProps> = ({ 
  onRunTest, 
  activeTest 
}) => {
  const tests = [
    { id: 'keyboard', icon: Keyboard, label: 'Keyboard Nav' },
    { id: 'contrast', icon: Eye, label: 'Color Contrast' },
    { id: 'screen-reader', icon: Volume2, label: 'Screen Reader' },
    { id: 'focus', icon: Info, label: 'Focus Order' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mouse className="w-5 h-5" />
          Interactive Accessibility Tests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tests.map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant="outline"
              onClick={() => onRunTest(id)}
              disabled={activeTest === id}
              className="h-auto p-4 flex flex-col gap-2"
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm">
                {activeTest === id ? 'Testing...' : label}
              </span>
            </Button>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Accessibility Statement</h4>
          <p className="text-sm text-blue-700">
            This platform is committed to providing an inclusive experience for all users. 
            We continuously test and improve accessibility features based on WCAG 2.1 AA guidelines 
            and user feedback from the disability community.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
