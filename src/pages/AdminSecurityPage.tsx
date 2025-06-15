
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import ContentModeration from '@/components/admin/ContentModeration';

const AdminSecurityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security & Moderation</h1>
        <p className="text-gray-600 mt-1">
          Monitor security and moderate content across the platform.
        </p>
      </div>
      
      <ContentModeration />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Additional security features will be implemented here. This will include:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>Security incident monitoring</li>
            <li>Failed login attempt tracking</li>
            <li>Suspicious activity alerts</li>
            <li>Role-based access control management</li>
            <li>API key and token management</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSecurityPage;
