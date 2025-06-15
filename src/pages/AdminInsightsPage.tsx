
import React from 'react';
import { AIInsights } from '@/components/admin/AIInsights';
import { CollaborationTools } from '@/components/admin/CollaborationTools';

const AdminInsightsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Insights & Collaboration</h1>
        <p className="text-gray-600 mt-1">
          AI-powered insights and team collaboration tools.
        </p>
      </div>
      
      <AIInsights />
      <CollaborationTools />
    </div>
  );
};

export default AdminInsightsPage;
