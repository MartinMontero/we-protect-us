
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Eye, Keyboard, Mouse, Volume2, Download, CheckCircle, AlertTriangle, Info } from 'lucide-react';

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
    // Simulate running test
    setTimeout(() => {
      setActiveTest(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* WCAG Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            WCAG 2.1 AA Validation Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">{wcagCompliance.overallScore}%</div>
              <div className="text-sm font-medium">Overall Score</div>
              <Badge variant="default" className="mt-2">WCAG {wcagCompliance.level}</Badge>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-sm font-medium">Principles Tested</div>
              <div className="text-xs text-gray-600 mt-2">All major areas covered</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">6</div>
              <div className="text-sm font-medium">Minor Issues</div>
              <div className="text-xs text-gray-600 mt-2">Non-blocking warnings</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-sm font-bold text-gray-700 mb-2">Apr 15</div>
              <div className="text-sm font-medium">Next Audit</div>
              <div className="text-xs text-gray-600 mt-2">Quarterly schedule</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="w-3 h-3" />
              Full Report (PDF)
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="w-3 h-3" />
              VPAT Document
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => runLiveTest('full-scan')}
              disabled={activeTest === 'full-scan'}
            >
              {activeTest === 'full-scan' ? 'Testing...' : 'Run Live Test'}
            </Button>
          </div>
        </CardContent>
      </Card>

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

      {/* Live Testing Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mouse className="w-5 h-5" />
            Interactive Accessibility Tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={() => runLiveTest('keyboard')}
              disabled={activeTest === 'keyboard'}
              className="h-auto p-4 flex flex-col gap-2"
            >
              <Keyboard className="w-6 h-6" />
              <span className="text-sm">
                {activeTest === 'keyboard' ? 'Testing...' : 'Keyboard Nav'}
              </span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => runLiveTest('contrast')}
              disabled={activeTest === 'contrast'}
              className="h-auto p-4 flex flex-col gap-2"
            >
              <Eye className="w-6 h-6" />
              <span className="text-sm">
                {activeTest === 'contrast' ? 'Testing...' : 'Color Contrast'}
              </span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => runLiveTest('screen-reader')}
              disabled={activeTest === 'screen-reader'}
              className="h-auto p-4 flex flex-col gap-2"
            >
              <Volume2 className="w-6 h-6" />
              <span className="text-sm">
                {activeTest === 'screen-reader' ? 'Testing...' : 'Screen Reader'}
              </span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => runLiveTest('focus')}
              disabled={activeTest === 'focus'}
              className="h-auto p-4 flex flex-col gap-2"
            >
              <Info className="w-6 h-6" />
              <span className="text-sm">
                {activeTest === 'focus' ? 'Testing...' : 'Focus Order'}
              </span>
            </Button>
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
    </div>
  );
};
