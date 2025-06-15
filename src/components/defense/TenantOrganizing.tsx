
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  DollarSign, 
  AlertTriangle, 
  Users, 
  FileText,
  Plus,
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';
import { RentTracker } from './tenant/RentTracker';
import { RepairRequests } from './tenant/RepairRequests';
import { TenantUnions } from './tenant/TenantUnions';
import { EvictionDefense } from './tenant/EvictionDefense';

export const TenantOrganizing: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('rent');

  const tools = [
    {
      id: 'rent',
      title: 'Rent Tracking',
      icon: DollarSign,
      description: 'Monitor rent increases and track payment history',
      count: '12 tracked properties'
    },
    {
      id: 'repairs',
      title: 'Repair Requests',
      icon: FileText,
      description: 'Document maintenance issues and landlord responses',
      count: '8 pending issues'
    },
    {
      id: 'unions',
      title: 'Tenant Unions',
      icon: Users,
      description: 'Form and coordinate tenant organizations',
      count: '3 active unions'
    },
    {
      id: 'eviction',
      title: 'Eviction Defense',
      icon: AlertTriangle,
      description: 'Rapid response and court support coordination',
      count: '2 active cases'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-6 h-6" />
            Tenant Organizing Tools
          </CardTitle>
          <p className="text-sm text-gray-600">
            Organize with your neighbors to defend against rent increases, poor conditions, and evictions
          </p>
        </CardHeader>
        <CardContent>
          {/* Tool Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card 
                  key={tool.id}
                  className={`cursor-pointer border-2 transition-all duration-200 ${
                    activeSubTab === tool.id 
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveSubTab(tool.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-sm">{tool.title}</h3>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{tool.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {tool.count}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <TabsList className="hidden">
              <TabsTrigger value="rent">Rent Tracking</TabsTrigger>
              <TabsTrigger value="repairs">Repair Requests</TabsTrigger>
              <TabsTrigger value="unions">Tenant Unions</TabsTrigger>
              <TabsTrigger value="eviction">Eviction Defense</TabsTrigger>
            </TabsList>

            <TabsContent value="rent">
              <RentTracker />
            </TabsContent>

            <TabsContent value="repairs">
              <RepairRequests />
            </TabsContent>

            <TabsContent value="unions">
              <TenantUnions />
            </TabsContent>

            <TabsContent value="eviction">
              <EvictionDefense />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
