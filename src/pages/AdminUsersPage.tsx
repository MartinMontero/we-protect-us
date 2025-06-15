
import React from 'react';
import { UserManagement } from '@/components/admin/UserManagement';

const AdminUsersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">
          Manage user accounts, roles, and permissions.
        </p>
      </div>
      
      <UserManagement />
    </div>
  );
};

export default AdminUsersPage;
