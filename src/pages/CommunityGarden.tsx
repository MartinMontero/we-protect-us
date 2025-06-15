
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GardenMap } from '@/components/garden/GardenMap';
import { PlotManagement } from '@/components/garden/PlotManagement';
import { SeasonalPlanning } from '@/components/garden/SeasonalPlanning';
import { HarvestSharing } from '@/components/garden/HarvestSharing';
import { WorkParties } from '@/components/garden/WorkParties';
import { ResourceManagement } from '@/components/garden/ResourceManagement';
import { KnowledgeBase } from '@/components/garden/KnowledgeBase';
import { Sprout, Calendar, Share, Users, Package, BookOpen, Map } from 'lucide-react';

export const CommunityGarden: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Sprout className="w-8 h-8 text-green-600" />
            Community Garden
          </h1>
          <p className="text-xl text-gray-600">Growing together, sharing abundance</p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Map
            </TabsTrigger>
            <TabsTrigger value="plots" className="flex items-center gap-2">
              <Sprout className="w-4 h-4" />
              Plots
            </TabsTrigger>
            <TabsTrigger value="planning" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Planning
            </TabsTrigger>
            <TabsTrigger value="harvest" className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Harvest
            </TabsTrigger>
            <TabsTrigger value="workparties" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Work Parties
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Knowledge
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Garden Plot Map</CardTitle>
                <CardDescription>
                  Interactive map showing all garden plots, their status, and details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GardenMap />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plots">
            <PlotManagement />
          </TabsContent>

          <TabsContent value="planning">
            <SeasonalPlanning />
          </TabsContent>

          <TabsContent value="harvest">
            <HarvestSharing />
          </TabsContent>

          <TabsContent value="workparties">
            <WorkParties />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceManagement />
          </TabsContent>

          <TabsContent value="knowledge">
            <KnowledgeBase />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
