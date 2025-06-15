
import React from 'react';
import { RealtimeDashboard } from '@/components/admin/RealtimeDashboard';

const AdminRealtimePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Real-time Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Monitor live platform activity and system health.
        </p>
      </div>
      
      <RealtimeDashboard />
    </div>
  );
};

export default AdminRealtimePage;
