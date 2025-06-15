import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MutualAidMap } from '@/components/mutual-aid/MutualAidMap';
import { SolidarityProjections } from '@/components/mutual-aid/SolidarityProjections';
import { CommunityLens } from '@/components/mutual-aid/CommunityLens';
import { TrustBuilding } from '@/components/mutual-aid/TrustBuilding';
import { CommunityLibrary } from '@/components/mutual-aid/education/CommunityLibrary';
import { FoodShareTooltip } from '@/components/mutual-aid/education/ContextualTooltips';
import { Button } from '@/components/ui/button';
import { Plus, Map, BarChart3, Users, Handshake, BookOpen } from 'lucide-react';

const MutualAid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Solidarity Coordination Matrix
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Building community resilience through mutual aid and resource sharing
          </p>
        </div>
        <div className="flex gap-3">
          <CommunityLens />
          <FoodShareTooltip>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Request/Offer
            </Button>
          </FoodShareTooltip>
        </div>
      </div>

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="map" className="gap-2">
            <Map className="w-4 h-4" />
            Resource Map
          </TabsTrigger>
          <TabsTrigger value="trust" className="gap-2">
            <Handshake className="w-4 h-4" />
            Trust Building
          </TabsTrigger>
          <TabsTrigger value="projections" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Solidarity Projections
          </TabsTrigger>
          <TabsTrigger value="community" className="gap-2">
            <Users className="w-4 h-4" />
            Community Impact
          </TabsTrigger>
          <TabsTrigger value="library" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Learning Library
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5" />
                Geospatial Resource Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MutualAidMap />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span className="text-sm">Critical Requests</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
                  <span className="text-sm">High Priority Requests</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <span className="text-sm">Community Offers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span className="text-sm">Low Priority Requests</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vulnerability-Aware Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Our algorithm prioritizes requests from community members with identified vulnerabilities:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Single parents</li>
                  <li>• Disabled community members</li>
                  <li>• Elderly individuals</li>
                  <li>• Recently displaced</li>
                  <li>• Chronic health conditions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trust" className="space-y-4">
          <TrustBuilding />
        </TabsContent>

        <TabsContent value="projections" className="space-y-4">
          <SolidarityProjections />
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Impact Education</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Understanding the deeper implications of mutual aid beyond immediate transactions.
                Click the "Community Lens" button to explore historical context and reflect on systemic impacts.
              </p>
              <CommunityLens />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <CommunityLibrary />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MutualAid;
