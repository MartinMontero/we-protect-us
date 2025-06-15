
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';

interface WCAGOverviewProps {
  overallScore: number;
  onRunTest: (testType: string) => void;
  isTestRunning: boolean;
}

export const WCAGOverview: React.FC<WCAGOverviewProps> = ({ 
  overallScore, 
  onRunTest, 
  isTestRunning 
}) => {
  return (
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
            <div className="text-3xl font-bold text-green-600 mb-2">{overallScore}%</div>
            <div className="text-sm font-medium">Overall Score</div>
            <Badge variant="default" className="mt-2">WCAG AA</Badge>
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
            onClick={() => onRunTest('full-scan')}
            disabled={isTestRunning}
          >
            {isTestRunning ? 'Testing...' : 'Run Live Test'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
