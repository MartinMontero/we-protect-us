
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, Download } from 'lucide-react';

interface OverviewMetricsProps {
  overallScore: number;
}

export const OverviewMetrics: React.FC<OverviewMetricsProps> = ({ overallScore }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacy Architecture Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{overallScore}%</div>
            <div className="text-sm text-gray-600">Overall Compliance Score</div>
            <Progress value={overallScore} className="mt-2" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
            <div className="text-sm text-gray-600">Encryption Protocols Active</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Community Data Sovereignty</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="w-3 h-3" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="w-3 h-3" />
            Export JSON
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
