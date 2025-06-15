
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PowerMappingTutorial } from './PowerMappingTutorial';
import { OrganizingCaseStudies } from './OrganizingCaseStudies';
import { ResourceSovereigntyDashboard } from './ResourceSovereigntyDashboard';
import { Target, BookOpen, BarChart3 } from 'lucide-react';

export const CommunityEducation: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Community Education & Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Tools for understanding power structures, learning from historical organizing campaigns, 
            and tracking community resource sovereignty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <h4 className="font-medium mb-1">Power Mapping</h4>
              <p className="text-sm text-gray-600">Analyze decision-makers and influence networks</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-medium mb-1">Case Studies</h4>
              <p className="text-sm text-gray-600">Learn from historical organizing successes</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-medium mb-1">Resource Sovereignty</h4>
              <p className="text-sm text-gray-600">Track community ownership and control</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PowerMappingTutorial />
        <OrganizingCaseStudies />
      </div>

      <ResourceSovereigntyDashboard />
    </div>
  );
};
