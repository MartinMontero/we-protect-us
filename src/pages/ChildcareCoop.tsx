
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Calendar, Users, Star, MapPin, Clock } from 'lucide-react';
import { CareScheduling } from '@/components/childcare/CareScheduling';
import { MemberVerification } from '@/components/childcare/MemberVerification';
import { ChildProfiles } from '@/components/childcare/ChildProfiles';
import { SafetyFeatures } from '@/components/childcare/SafetyFeatures';
import { TrustBuilding } from '@/components/childcare/TrustBuilding';
import { GroupActivities } from '@/components/childcare/GroupActivities';
import { CarePointsTracker } from '@/components/childcare/CarePointsTracker';

export const ChildcareCoop: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scheduling');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            Childcare Cooperation
          </h1>
          <p className="text-xl text-gray-600">Safe, trusted community childcare sharing</p>
        </div>

        {/* Safety Notice */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-blue-800">
              <Shield className="w-5 h-5" />
              <p className="text-sm">
                <strong>Security First:</strong> All members undergo verification including background checks and references. 
                Emergency contacts and medical information are securely encrypted.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="scheduling" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="children" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Children
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Verification
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Safety
            </TabsTrigger>
            <TabsTrigger value="trust" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Trust
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="points" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Points
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scheduling">
            <CareScheduling />
          </TabsContent>

          <TabsContent value="children">
            <ChildProfiles />
          </TabsContent>

          <TabsContent value="verification">
            <MemberVerification />
          </TabsContent>

          <TabsContent value="safety">
            <SafetyFeatures />
          </TabsContent>

          <TabsContent value="trust">
            <TrustBuilding />
          </TabsContent>

          <TabsContent value="activities">
            <GroupActivities />
          </TabsContent>

          <TabsContent value="points">
            <CarePointsTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
