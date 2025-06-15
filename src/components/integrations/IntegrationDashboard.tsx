
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, CheckCircle, Globe, Radio, Users } from 'lucide-react';
import { useIntegrations } from '@/hooks/useIntegrations';
import { EmergencyModeActivator } from './EmergencyModeActivator';
import { VolunteerMatchingPanel } from './VolunteerMatchingPanel';
import { ResourceDistributionTracker } from './ResourceDistributionTracker';

export const IntegrationDashboard: React.FC = () => {
  const { integrations, loading, updateIntegration } = useIntegrations();
  const [activePanel, setActivePanel] = useState<'overview' | 'emergency' | 'matching' | 'distribution'>('overview');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getServiceIcon = (serviceName: string) => {
    switch (serviceName) {
      case 'ushahidi': return <Globe className="w-5 h-5" />;
      case 'bridgefy': return <Radio className="w-5 h-5" />;
      case 'recovers': return <Users className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const toggleIntegration = async (serviceName: string, enabled: boolean) => {
    await updateIntegration(serviceName, { is_enabled: enabled });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading integrations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Integration Dashboard</h2>
        <div className="flex gap-2">
          <Button 
            variant={activePanel === 'overview' ? 'default' : 'outline'}
            onClick={() => setActivePanel('overview')}
            size="sm"
          >
            Overview
          </Button>
          <Button 
            variant={activePanel === 'emergency' ? 'default' : 'outline'}
            onClick={() => setActivePanel('emergency')}
            size="sm"
          >
            Emergency
          </Button>
          <Button 
            variant={activePanel === 'matching' ? 'default' : 'outline'}
            onClick={() => setActivePanel('matching')}
            size="sm"
          >
            Matching
          </Button>
          <Button 
            variant={activePanel === 'distribution' ? 'default' : 'outline'}
            onClick={() => setActivePanel('distribution')}
            size="sm"
          >
            Distribution
          </Button>
        </div>
      </div>

      {activePanel === 'overview' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <Card key={integration.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getServiceIcon(integration.service_name)}
                  {integration.service_name.charAt(0).toUpperCase() + integration.service_name.slice(1)}
                </CardTitle>
                <Switch
                  checked={integration.is_enabled}
                  onCheckedChange={(enabled) => toggleIntegration(integration.service_name, enabled)}
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(integration.health_status)}
                      <Badge variant={integration.health_status === 'healthy' ? 'default' : 'destructive'}>
                        {integration.health_status}
                      </Badge>
                    </div>
                  </div>
                  
                  {integration.api_endpoint && (
                    <div className="text-xs text-gray-500">
                      Endpoint: {integration.api_endpoint}
                    </div>
                  )}
                  
                  {integration.last_health_check && (
                    <div className="text-xs text-gray-500">
                      Last check: {new Date(integration.last_health_check).toLocaleString()}
                    </div>
                  )}

                  <div className="pt-2">
                    {integration.service_name === 'ushahidi' && (
                      <p className="text-sm text-gray-600">Crisis mapping and incident reporting</p>
                    )}
                    {integration.service_name === 'bridgefy' && (
                      <p className="text-sm text-gray-600">Offline mesh networking capabilities</p>
                    )}
                    {integration.service_name === 'recovers' && (
                      <p className="text-sm text-gray-600">Enhanced volunteer matching system</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activePanel === 'emergency' && <EmergencyModeActivator />}
      {activePanel === 'matching' && <VolunteerMatchingPanel />}
      {activePanel === 'distribution' && <ResourceDistributionTracker />}
    </div>
  );
};
