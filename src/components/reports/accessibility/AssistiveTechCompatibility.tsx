
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Keyboard } from 'lucide-react';

interface AssistiveTechTest {
  technology: string;
  support: string;
  tested: string[];
  score: number;
}

interface AssistiveTechCompatibilityProps {
  assistiveTechTests: AssistiveTechTest[];
}

export const AssistiveTechCompatibility: React.FC<AssistiveTechCompatibilityProps> = ({ 
  assistiveTechTests 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Keyboard className="w-5 h-5" />
          Assistive Technology Compatibility
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assistiveTechTests.map((tech, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{tech.technology}</h4>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={tech.support === 'Full' ? 'default' : 'secondary'}
                  >
                    {tech.support}
                  </Badge>
                  <span className="text-sm font-medium">{tech.score}%</span>
                </div>
              </div>
              <Progress value={tech.score} className="mb-3" />
              <div className="text-sm text-gray-600">
                <strong>Tested with:</strong> {tech.tested.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
