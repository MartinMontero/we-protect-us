import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import HomePage from '@/pages/HomePage';
import AuthPage from '@/pages/AuthPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import DashboardPage from '@/pages/DashboardPage';
import MutualAidPage from '@/pages/MutualAidPage';
import CommunityDefensePage from '@/pages/CommunityDefensePage';
import FoodSecurityPage from '@/pages/FoodSecurityPage';
import EnergyDemocracyPage from '@/pages/EnergyDemocracyPage';
import ToolLibraryPage from '@/pages/ToolLibraryPage';
import SkillsPage from '@/pages/SkillsPage';
import SettingsPage from '@/pages/SettingsPage';
import AdminPage from '@/pages/AdminPage';
import OrganizingPage from '@/pages/OrganizingPage';
import CommunityWealthPage from '@/pages/CommunityWealthPage';
import CommunitySovereigntyPage from '@/pages/CommunitySovereigntyPage';
import DisasterPreparednessPage from '@/pages/DisasterPreparednessPage';
import OnboardingPage from '@/pages/OnboardingPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Router>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Toaster />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/onboarding" element={
                      <ProtectedRoute>
                        <OnboardingPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/mutual-aid" element={
                      <ProtectedRoute>
                        <MutualAidPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/community-defense" element={
                      <ProtectedRoute>
                        <CommunityDefensePage />
                      </ProtectedRoute>
                    } />
                    <Route path="/food-security" element={
                      <ProtectedRoute>
                        <FoodSecurityPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/energy-democracy" element={
                      <ProtectedRoute>
                        <EnergyDemocracyPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/tool-library" element={
                      <ProtectedRoute>
                        <ToolLibraryPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/skills" element={
                      <ProtectedRoute>
                        <SkillsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/*" element={
                      <ProtectedRoute>
                        <Navigation />
                        <AdminPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/organizing" element={
                      <ProtectedRoute>
                        <OrganizingPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/community-wealth" element={
                      <ProtectedRoute>
                        <CommunityWealthPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/community-sovereignty" element={
                      <ProtectedRoute>
                        <CommunitySovereigntyPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/disaster-preparedness" element={
                      <DisasterPreparednessPage />
                    } />
                  </Routes>
                </div>
              </Router>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
