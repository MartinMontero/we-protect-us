
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Building, Calculator } from 'lucide-react';

export const EducationCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Micro-Lessons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            Interactive lessons on solidarity economics fundamentals
          </p>
          <Button size="sm" variant="outline" className="w-full">
            Start Learning
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-green-600" />
            Co-op Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            Ready-to-use templates for starting cooperatives
          </p>
          <Button size="sm" variant="outline" className="w-full">
            Browse Templates
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-purple-600" />
            Investment Simulator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            Model community investment scenarios and outcomes
          </p>
          <Button size="sm" variant="outline" className="w-full">
            Run Simulation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
