
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Leaf, 
  Apple, 
  Truck, 
  Users, 
  BookOpen, 
  AlertTriangle,
  Calendar,
  Share2,
  ChefHat
} from 'lucide-react';
import { FoodAssetMap } from '@/components/food/FoodAssetMap';
import { DistributionNetwork } from '@/components/food/DistributionNetwork';
import { ProductionPlanning } from '@/components/food/ProductionPlanning';
import { KnowledgeSharing } from '@/components/food/KnowledgeSharing';
import { CrisisResponse } from '@/components/food/CrisisResponse';
import { AssetTracker } from '@/components/food/AssetTracker';

export const FoodSecurity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mapping');

  const tabs = [
    {
      id: 'mapping',
      label: 'Food Asset Mapping',
      icon: MapPin,
      component: FoodAssetMap
    },
    {
      id: 'assets',
      label: 'Asset Tracker',
      icon: Leaf,
      component: AssetTracker
    },
    {
      id: 'distribution',
      label: 'Distribution Network',
      icon: Truck,
      component: DistributionNetwork
    },
    {
      id: 'planning',
      label: 'Production Planning',
      icon: Calendar,
      component: ProductionPlanning
    },
    {
      id: 'knowledge',
      label: 'Knowledge Sharing',
      icon: BookOpen,
      component: KnowledgeSharing
    },
    {
      id: 'crisis',
      label: 'Crisis Response',
      icon: AlertTriangle,
      component: CrisisResponse
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Apple className="w-10 h-10 text-green-600" />
            Community Food Security Platform
          </h1>
          <p className="text-xl text-gray-600">
            Mapping food assets, coordinating distribution, and building resilient community food systems
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Food Assets</p>
                  <p className="text-2xl font-bold text-green-600">24</p>
                </div>
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Distribution Points</p>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                </div>
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Volunteers</p>
                  <p className="text-2xl font-bold text-purple-600">56</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recipes Shared</p>
                  <p className="text-2xl font-bold text-orange-600">142</p>
                </div>
                <ChefHat className="w-8 h-8 text-orange-600" />
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
