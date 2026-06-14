import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute';
import { AdminLayout } from '@/components/admin/AdminLayout';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminUsersPage from '@/pages/AdminUsersPage';
import AdminRolesPage from '@/pages/AdminRolesPage';
import AdminAnalyticsPage from '@/pages/AdminAnalyticsPage';
import AdminInsightsPage from '@/pages/AdminInsightsPage';
import AdminRealtimePage from '@/pages/AdminRealtimePage';
import AdminSecurityPage from '@/pages/AdminSecurityPage';
import AdminSettingsPage from '@/pages/AdminSettingsPage';

const AdminPage: React.FC = () => {
  return (
    <AdminProtectedRoute>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="roles" element={<AdminRolesPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="insights" element={<AdminInsightsPage />} />
          <Route path="realtime" element={<AdminRealtimePage />} />
          <Route path="security" element={<AdminSecurityPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AdminProtectedRoute>
  );
};

export default AdminPage;
