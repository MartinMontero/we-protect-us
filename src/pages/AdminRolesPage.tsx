
import React from 'react';
import { RoleManager } from '@/components/admin/RoleManager';

const AdminRolesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
        <p className="text-gray-600 mt-1">
          Manage user roles and permissions across the platform.
        </p>
      </div>
      
      <RoleManager />
    </div>
  );
};

export default AdminRolesPage;
