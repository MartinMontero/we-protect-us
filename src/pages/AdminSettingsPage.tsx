
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const AdminSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Configure platform settings and preferences.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Platform configuration features will be implemented here. This will include:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>General platform settings</li>
            <li>Email configuration</li>
            <li>API settings and keys</li>
            <li>Feature toggles</li>
            <li>Backup and maintenance</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettingsPage;
