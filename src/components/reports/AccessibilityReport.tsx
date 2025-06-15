
import React, { useState } from 'react';
import { WCAGOverview } from './accessibility/WCAGOverview';
import { WCAGPrinciplesBreakdown } from './accessibility/WCAGPrinciplesBreakdown';
import { AssistiveTechCompatibility } from './accessibility/AssistiveTechCompatibility';
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
        { name: 'Text Alternatives', status: 'pass' as const, issues: 0 },
        { name: 'Captions & Transcripts', status: 'pass' as const, issues: 0 },
        { name: 'Color Contrast', status: 'pass' as const, issues: 0 },
        { name: 'Resize Text', status: 'warning' as const, issues: 2 }
      ]
    },
    {
      principle: 'Operable',
      score: 92,
      tests: [
        { name: 'Keyboard Navigation', status: 'pass' as const, issues: 0 },
        { name: 'No Seizures', status: 'pass' as const, issues: 0 },
        { name: 'Time Limits', status: 'pass' as const, issues: 0 },
        { name: 'Focus Management', status: 'warning' as const, issues: 3 }
      ]
    },
    {
      principle: 'Understandable',
      score: 95,
      tests: [
        { name: 'Language Identification', status: 'pass' as const, issues: 0 },
        { name: 'Consistent Navigation', status: 'pass' as const, issues: 0 },
        { name: 'Error Identification', status: 'pass' as const, issues: 0 },
        { name: 'Help & Documentation', status: 'warning' as const, issues: 1 }
      ]
    },
    {
      principle: 'Robust',
      score: 93,
      tests: [
        { name: 'Valid HTML', status: 'pass' as const, issues: 0 },
        { name: 'ARIA Implementation', status: 'pass' as const, issues: 0 },
        { name: 'Screen Reader Support', status: 'warning' as const, issues: 2 },
        { name: 'Browser Compatibility', status: 'pass' as const, issues: 0 }
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

      <WCAGPrinciplesBreakdown principleTests={principleTests} />

      <AssistiveTechCompatibility assistiveTechTests={assistiveTechTests} />

      <InteractiveTests onRunTest={runLiveTest} activeTest={activeTest} />
    </div>
  );
};
