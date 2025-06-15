
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertTriangle, 
  Play,
  Calendar,
  Award
} from 'lucide-react';

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Overall Score */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-50">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-800">
              WCAG 2.1 AA
            </Badge>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-2">
              {overallScore}%
            </div>
            <div className="text-sm text-slate-600 mb-4">
              Overall Accessibility Score
            </div>
            <Progress value={overallScore} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Status Summary */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-slate-900">Compliance Status</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Passing Tests</span>
              <span className="text-sm font-medium text-green-600">47/50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Warnings</span>
              <span className="text-sm font-medium text-orange-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Critical Issues</span>
              <span className="text-sm font-medium text-slate-900">0</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Play className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-slate-900">Quick Actions</span>
          </div>
          <div className="space-y-3">
            <Button 
              onClick={() => onRunTest('full-scan')}
              disabled={isTestRunning}
              className="w-full justify-start"
              variant="outline"
            >
              {isTestRunning ? 'Running...' : 'Run Full Scan'}
            </Button>
            <Button 
              onClick={() => onRunTest('color-contrast')}
              className="w-full justify-start"
              variant="outline"
            >
              Check Color Contrast
            </Button>
            <div className="flex items-center text-xs text-slate-500 mt-3">
              <Calendar className="w-3 h-3 mr-1" />
              Last scan: 2 hours ago
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
