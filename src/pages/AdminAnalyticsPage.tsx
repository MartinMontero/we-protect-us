
import React from 'react';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';

const AdminAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">
          Monitor platform usage and performance metrics.
        </p>
      </div>
      
      <AnalyticsCharts />
    </div>
  );
};

export default AdminAnalyticsPage;
