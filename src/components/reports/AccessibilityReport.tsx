
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Keyboard, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { WCAGOverview } from './accessibility/WCAGOverview';
import { InteractiveTests } from './accessibility/InteractiveTests';

export const AccessibilityReport: React.FC = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null);

  const wcagCompliance = {
    level: 'AA',
    overallScore: 94,
    lastAudit: '2024-01-15',
    nextAudit: '2024-04-15'
  };

  const principleTests = [
    {
      principle: 'Perceivable',
      score: 96,
      tests: [
        { name: 'Text Alternatives', status: 'pass', issues: 0 },
        { name: 'Captions & Transcripts', status: 'pass', issues: 0 },
        { name: 'Color Contrast', status: 'pass', issues: 0 },
        { name: 'Resize Text', status: 'warning', issues: 2 }
      ]
    },
    {
      principle: 'Operable',
      score: 92,
      tests: [
        { name: 'Keyboard Navigation', status: 'pass', issues: 0 },
        { name: 'No Seizures', status: 'pass', issues: 0 },
        { name: 'Time Limits', status: 'pass', issues: 0 },
        { name: 'Focus Management', status: 'warning', issues: 3 }
      ]
    },
    {
      principle: 'Understandable',
      score: 95,
      tests: [
        { name: 'Language Identification', status: 'pass', issues: 0 },
        { name: 'Consistent Navigation', status: 'pass', issues: 0 },
        { name: 'Error Identification', status: 'pass', issues: 0 },
        { name: 'Help & Documentation', status: 'warning', issues: 1 }
      ]
    },
    {
      principle: 'Robust',
      score: 93,
      tests: [
        { name: 'Valid HTML', status: 'pass', issues: 0 },
        { name: 'ARIA Implementation', status: 'pass', issues: 0 },
        { name: 'Screen Reader Support', status: 'warning', issues: 2 },
        { name: 'Browser Compatibility', status: 'pass', issues: 0 }
      ]
    }
  ];

  const assistiveTechTests = [
    {
      technology: 'Screen Readers',
      support: 'Full',
      tested: ['NVDA', 'JAWS', 'VoiceOver'],
      score: 94
    },
    {
      technology: 'Voice Control',
      support: 'Good',
      tested: ['Dragon NaturallySpeaking', 'Voice Control (macOS)'],
      score: 87
    },
    {
      technology: 'Switch Navigation',
      support: 'Good',
      tested: ['Switch Access', 'External switches'],
      score: 89
    },
    {
      technology: 'Magnification',
      support: 'Full',
      tested: ['ZoomText', 'System zoom'],
      score: 96
    }
  ];

  const runLiveTest = (testType: string) => {
    setActiveTest(testType);
    setTimeout(() => setActiveTest(null), 3000);
  };

  return (
    <div className="space-y-6">
      <WCAGOverview 
        overallScore={wcagCompliance.overallScore}
        onRunTest={runLiveTest}
        isTestRunning={activeTest === 'full-scan'}
      />

      {/* WCAG Principles Breakdown */}
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

      {/* Assistive Technology Testing */}
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

      <InteractiveTests onRunTest={runLiveTest} activeTest={activeTest} />
    </div>
  );
};
