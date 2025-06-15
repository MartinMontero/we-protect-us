
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navigation } from '@/components/layout/Navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SecurityGovernancePage } from '@/pages/SecurityGovernancePage';
import MutualAid from '@/pages/MutualAid';
import CommunityWealth from '@/pages/CommunityWealth';
import CommunitySovereignty from '@/pages/CommunitySovereignty';
import Organizing from '@/pages/Organizing';
import Community from '@/pages/Community';
import AuthPage from '@/pages/AuthPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/mutual-aid" element={
              <ProtectedRoute>
                <MutualAid />
              </ProtectedRoute>
            } />
            <Route path="/security-governance" element={
              <ProtectedRoute>
                <SecurityGovernancePage />
              </ProtectedRoute>
            } />
            <Route path="/community-wealth" element={
              <ProtectedRoute>
                <CommunityWealth />
              </ProtectedRoute>
            } />
            <Route path="/community-sovereignty" element={
              <ProtectedRoute>
                <CommunitySovereignty />
              </ProtectedRoute>
            } />
            <Route path="/organizing" element={
              <ProtectedRoute>
                <Organizing />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
