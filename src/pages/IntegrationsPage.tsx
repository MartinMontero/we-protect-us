
import React from 'react';
import { IntegrationDashboard } from '@/components/integrations/IntegrationDashboard';

const IntegrationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Platform Integrations
          </h1>
          <p className="text-gray-600">
            Manage Ushahidi crisis mapping, Bridgefy mesh networking, and enhanced volunteer coordination features.
          </p>
        </div>
        
        <IntegrationDashboard />
      </div>
    </div>
  );
};

export default IntegrationsPage;
