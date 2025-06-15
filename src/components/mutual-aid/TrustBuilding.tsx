
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Package, Heart, Star, Handshake, Network } from 'lucide-react';
import { SkillMapping } from './SkillMapping';
import { ResourceSharing } from './ResourceSharing';
import { ConflictResolution } from './ConflictResolution';

export const TrustBuilding: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Handshake className="w-6 h-6" />
            Community Trust & Relationship Building
          </CardTitle>
          <p className="text-sm text-gray-600">
            Strengthen community bonds through skill sharing, resource coordination, and restorative practices
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4 text-center">
                <Network className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold text-sm mb-1">Skill Networks</h3>
                <p className="text-xs text-gray-600">Map community expertise and build learning connections</p>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold text-sm mb-1">Resource Sharing</h3>
                <p className="text-xs text-gray-600">Coordinate community resources and reduce waste</p>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-semibold text-sm mb-1">Conflict Resolution</h3>
                <p className="text-xs text-gray-600">Heal relationships through restorative justice</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="skills" className="gap-2">
                <Users className="w-4 h-4" />
                Skill Mapping
              </TabsTrigger>
              <TabsTrigger value="resources" className="gap-2">
                <Package className="w-4 h-4" />
                Resource Sharing
              </TabsTrigger>
              <TabsTrigger value="resolution" className="gap-2">
                <Heart className="w-4 h-4" />
                Conflict Resolution
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skills">
              <SkillMapping />
            </TabsContent>

            <TabsContent value="resources">
              <ResourceSharing />
            </TabsContent>

            <TabsContent value="resolution">
              <ConflictResolution />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
