
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield, Users, MapPin, Radio, Wrench } from 'lucide-react';
import { PreparednessChecklist } from '@/components/disaster/PreparednessChecklist';
import { EmergencyAlerts } from '@/components/disaster/EmergencyAlerts';
import { ResourceMap } from '@/components/disaster/ResourceMap';
import { TransportationCoordination } from '@/components/disaster/TransportationCoordination';
import { CommunicationHub } from '@/components/disaster/CommunicationHub';
import { DamageReporting } from '@/components/disaster/DamageReporting';
import { SafetyCheckin } from '@/components/disaster/SafetyCheckin';

export const DisasterPreparedness: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Shield className="w-10 h-10 text-red-600" />
            Disaster Preparedness & Response
          </h1>
          <p className="text-xl text-gray-600">
            Community-driven emergency preparedness and coordination system
          </p>
        </div>

        {/* Quick Safety Check-in */}
        <div className="mb-8">
          <SafetyCheckin />
        </div>

        {/* Emergency Alerts Banner */}
        <div className="mb-8">
          <EmergencyAlerts />
        </div>

        <Tabs defaultValue="preparedness" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="preparedness" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Preparedness</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <Radio className="w-4 h-4" />
              <span className="hidden sm:inline">Communication</span>
            </TabsTrigger>
            <TabsTrigger value="evacuation" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Evacuation</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="transportation" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span className="hidden sm:inline">Transport</span>
            </TabsTrigger>
            <TabsTrigger value="recovery" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Recovery</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preparedness">
            <PreparednessChecklist />
          </TabsContent>

          <TabsContent value="communication">
            <CommunicationHub />
          </TabsContent>

          <TabsContent value="evacuation">
            <ResourceMap type="evacuation" />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceMap type="resources" />
          </TabsContent>

          <TabsContent value="transportation">
            <TransportationCoordination />
          </TabsContent>

          <TabsContent value="recovery">
            <DamageReporting />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
