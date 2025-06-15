
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { SecurityCoordination } from './security/SecurityCoordination';
import { DemocraticGovernance } from './governance/DemocraticGovernance';
import { CommunityEducation } from './education/CommunityEducation';
import { Shield, Users, BookOpen, Eye, AlertTriangle } from 'lucide-react';

export const SovereigntyDashboard: React.FC = () => {
  const [securityMode, setSecurityMode] = useState<'standard' | 'high_risk'>('standard');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Community Sovereignty Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Democratic coordination, security-aware organizing, and community education
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Security Level:</span>
            <Button
              variant={securityMode === 'high_risk' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => setSecurityMode(prev => prev === 'standard' ? 'high_risk' : 'standard')}
              className="gap-1"
            >
              {securityMode === 'high_risk' ? (
                <>
                  <AlertTriangle className="w-3 h-3" />
                  High Risk
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3" />
                  Standard
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Security & Coordination
          </TabsTrigger>
          <TabsTrigger value="governance" className="gap-2">
            <Users className="w-4 h-4" />
            Democratic Governance
          </TabsTrigger>
          <TabsTrigger value="education" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Community Education
          </TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-6">
          <SecurityCoordination securityMode={securityMode} />
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <DemocraticGovernance />
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <CommunityEducation />
        </TabsContent>
      </Tabs>
    </div>
  );
};
