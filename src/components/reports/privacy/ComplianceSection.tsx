
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, CheckCircle, AlertTriangle } from 'lucide-react';

interface ComplianceItem {
  category: string;
  status: 'compliant' | 'warning';
  details: string;
  score: number;
}

interface ComplianceSectionProps {
  items: ComplianceItem[];
}

export const ComplianceSection: React.FC<ComplianceSectionProps> = ({ items }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Data Sovereignty Compliance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{item.category}</h4>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={item.status === 'compliant' ? 'default' : 'destructive'}
                    className="gap-1"
                  >
                    {item.status === 'compliant' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                    {item.status === 'compliant' ? 'Compliant' : 'Needs Attention'}
                  </Badge>
                  <span className="text-sm font-medium">{item.score}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{item.details}</p>
              <Progress value={item.score} className="mt-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
