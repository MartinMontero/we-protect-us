
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { HomePage } from '@/pages/HomePage';
import AuthPage from '@/pages/AuthPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import DashboardPage from '@/pages/DashboardPage';
import MutualAid from '@/pages/MutualAid';
import CommunityDefense from '@/pages/CommunityDefense';
import { FoodSecurity } from '@/pages/FoodSecurity';
import { EnergyDemocracy } from '@/pages/EnergyDemocracy';
import { ToolLibrary } from '@/pages/ToolLibrary';
import SkillsPage from '@/pages/SkillsPage';
import Settings from '@/pages/Settings';
import AdminPage from '@/pages/AdminPage';
import Organizing from '@/pages/Organizing';
import CommunityWealth from '@/pages/CommunityWealth';
import CommunitySovereignty from '@/pages/CommunitySovereignty';
import { DisasterPreparedness } from '@/pages/DisasterPreparedness';
import OnboardingPage from '@/pages/OnboardingPage';
import IntegrationsPage from '@/pages/IntegrationsPage';
import Navigation from '@/components/layout/Navigation';

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
                  <Navigation />
                  <main id="main-content" className="w-full">
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
                          <MutualAid />
                        </ProtectedRoute>
                      } />
                      <Route path="/community-defense" element={
                        <ProtectedRoute>
                          <CommunityDefense />
                        </ProtectedRoute>
                      } />
                      <Route path="/food-security" element={
                        <ProtectedRoute>
                          <FoodSecurity />
                        </ProtectedRoute>
                      } />
                      <Route path="/energy-democracy" element={
                        <ProtectedRoute>
                          <EnergyDemocracy />
                        </ProtectedRoute>
                      } />
                      <Route path="/tool-library" element={
                        <ProtectedRoute>
                          <ToolLibrary />
                        </ProtectedRoute>
                      } />
                      <Route path="/skills" element={
                        <ProtectedRoute>
                          <SkillsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/settings" element={
                        <ProtectedRoute>
                          <Settings />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin/*" element={
                        <ProtectedRoute>
                          <AdminPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/integrations" element={
                        <ProtectedRoute>
                          <IntegrationsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/organizing" element={
                        <ProtectedRoute>
                          <Organizing />
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
                      <Route path="/disaster-preparedness" element={
                        <DisasterPreparedness />
                      } />
                    </Routes>
                  </main>
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
