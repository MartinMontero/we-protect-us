
import React from 'react';
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute';
import { AdminLayout } from '@/components/admin/AdminLayout';

const AdminPage: React.FC = () => {
  return (
    <AdminProtectedRoute>
      <AdminLayout />
    </AdminProtectedRoute>
  );
};

export default AdminPage;
