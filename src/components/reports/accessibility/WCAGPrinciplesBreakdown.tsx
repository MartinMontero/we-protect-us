
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface PrincipleTest {
  name: string;
  status: 'pass' | 'warning' | 'info';
  issues: number;
}

interface PrincipleTestData {
  principle: string;
  score: number;
  tests: PrincipleTest[];
}

interface WCAGPrinciplesBreakdownProps {
  principleTests: PrincipleTestData[];
}

export const WCAGPrinciplesBreakdown: React.FC<WCAGPrinciplesBreakdownProps> = ({ 
  principleTests 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>WCAG 2.1 Principles Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {principleTests.map((principle, index) => (
            <AccordionItem key={index} value={`principle-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{principle.principle}</span>
                    <Badge variant={principle.score >= 95 ? 'default' : 'secondary'}>
                      {principle.score}%
                    </Badge>
                  </div>
                  <Progress value={principle.score} className="w-24" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-3">
                  {principle.tests.map((test, testIndex) => (
                    <div key={testIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {test.status === 'pass' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : test.status === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        ) : (
                          <Info className="w-4 h-4 text-blue-500" />
                        )}
                        <span className="font-medium">{test.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {test.issues > 0 && (
                          <Badge variant="outline">{test.issues} issues</Badge>
                        )}
                        <Badge 
                          variant={test.status === 'pass' ? 'default' : 'secondary'}
                        >
                          {test.status === 'pass' ? 'Pass' : 'Warning'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
