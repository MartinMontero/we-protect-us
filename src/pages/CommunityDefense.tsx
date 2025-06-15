
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Home, 
  Leaf, 
  Scale, 
  Megaphone, 
  Users,
  AlertTriangle,
  Lock,
  Eye,
  FileText,
  MapPin
} from 'lucide-react';
import { TenantOrganizing } from '@/components/defense/TenantOrganizing';
import { AntiDisplacement } from '@/components/defense/AntiDisplacement';
import { EnvironmentalJustice } from '@/components/defense/EnvironmentalJustice';
import { LegalSupport } from '@/components/defense/LegalSupport';
import { CampaignCoordination } from '@/components/defense/CampaignCoordination';

const CommunityDefense = () => {
  const [activeTab, setActiveTab] = useState('tenant');

  const defenseAreas = [
    {
      id: 'tenant',
      title: 'Tenant Organizing',
      icon: Home,
      description: 'Track rent, document issues, and organize tenant unions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'displacement',
      title: 'Anti-Displacement',
      icon: Shield,
      description: 'Monitor property sales, development, and displacement threats',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'environment',
      title: 'Environmental Justice',
      icon: Leaf,
      description: 'Track pollution, violations, and coordinate environmental actions',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'legal',
      title: 'Legal Support',
      icon: Scale,
      description: 'Access legal resources, clinics, and emergency fund support',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'campaigns',
      title: 'Campaign Coordination',
      icon: Megaphone,
      description: 'Organize petitions, rallies, and coordinate victory campaigns',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Community Defense Network
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize against displacement, environmental threats, and defend our communities
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800">Security & Privacy Notice</h3>
              <p className="text-sm text-amber-700 mt-1">
                All communications are encrypted. Use anonymity options for sensitive organizing. 
                Document everything but be mindful of operational security.
              </p>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          {defenseAreas.map((area) => {
            const Icon = area.icon;
            return (
              <Card 
                key={area.id}
                className={`cursor-pointer border-2 transition-all duration-200 ${
                  activeTab === area.id 
                    ? 'border-red-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(area.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${area.color} mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{area.title}</h3>
                  <p className="text-xs text-gray-600">{area.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="hidden">
          <TabsTrigger value="tenant">Tenant Organizing</TabsTrigger>
          <TabsTrigger value="displacement">Anti-Displacement</TabsTrigger>
          <TabsTrigger value="environment">Environmental Justice</TabsTrigger>
          <TabsTrigger value="legal">Legal Support</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Coordination</TabsTrigger>
        </TabsList>

        <TabsContent value="tenant" className="space-y-4">
          <TenantOrganizing />
        </TabsContent>

        <TabsContent value="displacement" className="space-y-4">
          <AntiDisplacement />
        </TabsContent>

        <TabsContent value="environment" className="space-y-4">
          <EnvironmentalJustice />
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <LegalSupport />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <CampaignCoordination />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityDefense;
