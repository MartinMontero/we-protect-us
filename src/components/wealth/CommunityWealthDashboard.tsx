
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TimeBank } from './tracking/TimeBank';
import { CommunityLending } from './tracking/CommunityLending';
import { CooperativeDashboard } from './tracking/CooperativeDashboard';
import { WealthFlowVisualizer } from './visualization/WealthFlowVisualizer';
import { ExtractionAlerts } from './visualization/ExtractionAlerts';
import { ValueProjections } from './visualization/ValueProjections';
import { SolidarityEconomics } from './education/SolidarityEconomics';
import { CooperativeTemplates } from './education/CooperativeTemplates';
import { InvestmentSimulator } from './education/InvestmentSimulator';
import { WealthMetricsCards } from './dashboard/WealthMetricsCards';
import { EducationCards } from './dashboard/EducationCards';
import { 
  Clock, 
  TrendingUp, 
  BookOpen
} from 'lucide-react';

export const CommunityWealthDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'tracking' | 'visualization' | 'education'>('tracking');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Community Wealth Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track value flows, build cooperatives, and strengthen community economics
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={activeView === 'tracking' ? 'default' : 'outline'}
            onClick={() => setActiveView('tracking')}
            size="sm"
          >
            <Clock className="w-4 h-4 mr-1" />
            Tracking
          </Button>
          <Button
            variant={activeView === 'visualization' ? 'default' : 'outline'}
            onClick={() => setActiveView('visualization')}
            size="sm"
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            Visualize
          </Button>
          <Button
            variant={activeView === 'education' ? 'default' : 'outline'}
            onClick={() => setActiveView('education')}
            size="sm"
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Learn
          </Button>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as typeof activeView)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tracking" className="gap-2">
            <Clock className="w-4 h-4" />
            Value Tracking
          </TabsTrigger>
          <TabsTrigger value="visualization" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Economic Flows
          </TabsTrigger>
          <TabsTrigger value="education" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Solidarity Economics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="space-y-6">
          <WealthMetricsCards />

          <Tabs defaultValue="timebank" className="w-full">
            <TabsList>
              <TabsTrigger value="timebank">Time Banking</TabsTrigger>
              <TabsTrigger value="currency">Community Lending</TabsTrigger>
              <TabsTrigger value="cooperatives">Cooperative Dashboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timebank">
              <TimeBank />
            </TabsContent>
            
            <TabsContent value="currency">
              <CommunityLending />
            </TabsContent>
            
            <TabsContent value="cooperatives">
              <CooperativeDashboard />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WealthFlowVisualizer />
            <ExtractionAlerts />
          </div>
          <ValueProjections />
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <EducationCards />

          <Tabs defaultValue="lessons" className="w-full">
            <TabsList>
              <TabsTrigger value="lessons">Solidarity Economics 101</TabsTrigger>
              <TabsTrigger value="templates">Cooperative Templates</TabsTrigger>
              <TabsTrigger value="simulator">Investment Simulator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="lessons">
              <SolidarityEconomics />
            </TabsContent>
            
            <TabsContent value="templates">
              <CooperativeTemplates />
            </TabsContent>
            
            <TabsContent value="simulator">
              <InvestmentSimulator />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};
