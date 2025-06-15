
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  BookOpen,
  Building,
  Calculator
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Time Banking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Hours</span>
                    <span className="font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Members</span>
                    <span className="font-medium">142</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Skills Available</span>
                    <span className="font-medium">68</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Community Currency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">In Circulation</span>
                    <span className="font-medium">$47,320</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Velocity</span>
                    <span className="font-medium">3.2x/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Businesses</span>
                    <span className="font-medium">28</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Cooperatives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Co-ops</span>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Assets</span>
                    <span className="font-medium">$890K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Member-Owners</span>
                    <span className="font-medium">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
