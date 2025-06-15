
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Sun, 
  Home, 
  Battery, 
  BookOpen, 
  Megaphone,
  Wrench,
  TrendingUp,
  Users,
  MapPin
} from 'lucide-react';
import { SolarCoordination } from '@/components/energy/SolarCoordination';
import { EfficiencyPrograms } from '@/components/energy/EfficiencyPrograms';
import { ResilienceInfrastructure } from '@/components/energy/ResilienceInfrastructure';
import { EnergyEducation } from '@/components/energy/EnergyEducation';
import { EnergyAdvocacy } from '@/components/energy/EnergyAdvocacy';
import { EnergyResourceSharing } from '@/components/energy/EnergyResourceSharing';

export const EnergyDemocracy: React.FC = () => {
  const [activeTab, setActiveTab] = useState('solar');

  const tabs = [
    {
      id: 'solar',
      label: 'Solar Projects',
      icon: Sun,
      component: SolarCoordination
    },
    {
      id: 'efficiency',
      label: 'Efficiency Programs',
      icon: Home,
      component: EfficiencyPrograms
    },
    {
      id: 'resilience',
      label: 'Resilience',
      icon: Battery,
      component: ResilienceInfrastructure
    },
    {
      id: 'education',
      label: 'Education',
      icon: BookOpen,
      component: EnergyEducation
    },
    {
      id: 'advocacy',
      label: 'Advocacy',
      icon: Megaphone,
      component: EnergyAdvocacy
    },
    {
      id: 'resources',
      label: 'Resource Sharing',
      icon: Wrench,
      component: EnergyResourceSharing
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Zap className="w-10 h-10 text-yellow-600" />
            Energy Democracy Platform
          </h1>
          <p className="text-xl text-gray-600">
            Community-driven energy independence, efficiency, and resilience coordination
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                </div>
                <Sun className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Energy Saved (kWh)</p>
                  <p className="text-2xl font-bold text-green-600">15,240</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Participants</p>
                  <p className="text-2xl font-bold text-blue-600">84</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CO₂ Reduced (tons)</p>
                  <p className="text-2xl font-bold text-purple-600">67.5</p>
                </div>
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {tabs.map((tab) => {
            const Component = tab.component;
            return (
              <TabsContent key={tab.id} value={tab.id}>
                <Component />
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};
