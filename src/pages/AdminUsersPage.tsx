
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const AdminUsersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">
          Manage user accounts, roles, and permissions.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Users Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            User management features will be implemented here. This will include:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li>View all registered users</li>
            <li>Search and filter users</li>
            <li>Edit user profiles and roles</li>
            <li>Suspend or ban users</li>
            <li>Export user data</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
