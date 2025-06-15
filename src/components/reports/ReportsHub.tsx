
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PrivacyArchitectureReport } from './PrivacyArchitectureReport';
import { CommunityOwnershipReport } from './CommunityOwnershipReport';
import { AccessibilityReport } from './AccessibilityReport';
import { Shield, Users, Eye, Download, RefreshCw } from 'lucide-react';

export const ReportsHub: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);

  const handleGenerateReports = async () => {
    setIsGenerating(true);
    // Simulate report generation with more realistic timing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastGenerated(new Date());
    setIsGenerating(false);
  };

  const reportTabs = [
    {
      value: 'privacy',
      label: 'Privacy Architecture',
      icon: Shield,
      component: PrivacyArchitectureReport
    },
    {
      value: 'ownership',
      label: 'Community Ownership', 
      icon: Users,
      component: CommunityOwnershipReport
    },
    {
      value: 'accessibility',
      label: 'Accessibility',
      icon: Eye,
      component: AccessibilityReport
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Auto-Generated Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Privacy, ownership, and accessibility compliance documentation
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {lastGenerated && (
            <span className="text-sm text-gray-500">
              Last updated: {lastGenerated.toLocaleString()}
            </span>
          )}
          <Button 
            onClick={handleGenerateReports} 
            disabled={isGenerating}
            className="gap-2"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isGenerating ? 'Generating...' : 'Generate All Reports'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {reportTabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="gap-2">
              <Icon className="w-4 h-4" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {reportTabs.map(({ value, component: Component }) => (
          <TabsContent key={value} value={value} className="space-y-6">
            <Component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
