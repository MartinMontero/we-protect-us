
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const AdminSecurityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security</h1>
        <p className="text-gray-600 mt-1">
          Monitor security events and manage platform safety.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Security monitoring features will be implemented here. This will include:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Security event logs</li>
            <li>Failed login attempts</li>
            <li>Suspicious activity detection</li>
            <li>User behavior analysis</li>
            <li>Threat monitoring</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSecurityPage;
