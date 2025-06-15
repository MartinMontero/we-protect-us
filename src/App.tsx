
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/layout/Navigation";
import Index from "./pages/Index";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { FoodSecurity } from "./pages/FoodSecurity";
import MutualAid from "./pages/MutualAid";
import { ToolLibrary } from "./pages/ToolLibrary";
import { CommunityGarden } from "./pages/CommunityGarden";
import CommunityWealth from "./pages/CommunityWealth";
import { ChildcareCoop } from "./pages/ChildcareCoop";
import Organizing from "./pages/Organizing";
import { SecurityGovernancePage } from "./pages/SecurityGovernancePage";
import CommunitySovereignty from "./pages/CommunitySovereignty";
import { ReportsPage } from "./pages/ReportsPage";
import { ProfilePage } from "./pages/ProfilePage";
import Settings from "./pages/Settings";
import AuthPage from "./pages/AuthPage";
import ElderCare from "./pages/ElderCare";
import { DisasterPreparedness } from "./pages/DisasterPreparedness";
import { EnergyDemocracy } from "./pages/EnergyDemocracy";
import CommunityDefense from "./pages/CommunityDefense";
import SkillsPage from "./pages/SkillsPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import AdminPage from "./pages/AdminPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import AdminSecurityPage from "./pages/AdminSecurityPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import './lib/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Main App Routes */}
                <Route path="/" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <Index />
                    </main>
                  </div>
                } />
                <Route path="/home" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <HomePage />
                    </main>
                  </div>
                } />
                <Route path="/dashboard" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <DashboardPage />
                    </main>
                  </div>
                } />
                <Route path="/food-security" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <FoodSecurity />
                    </main>
                  </div>
                } />
                <Route path="/energy-democracy" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <EnergyDemocracy />
                    </main>
                  </div>
                } />
                <Route path="/mutual-aid" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <MutualAid />
                    </main>
                  </div>
                } />
                <Route path="/tool-library" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <ToolLibrary />
                    </main>
                  </div>
                } />
                <Route path="/community-garden" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <CommunityGarden />
                    </main>
                  </div>
                } />
                <Route path="/community-wealth" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <CommunityWealth />
                    </main>
                  </div>
                } />
                <Route path="/childcare-coop" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <ChildcareCoop />
                    </main>
                  </div>
                } />
                <Route path="/elder-care" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <ElderCare />
                    </main>
                  </div>
                } />
                <Route path="/disaster-preparedness" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <DisasterPreparedness />
                    </main>
                  </div>
                } />
                <Route path="/organizing" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <Organizing />
                    </main>
                  </div>
                } />
                <Route path="/security-governance" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <SecurityGovernancePage />
                    </main>
                  </div>
                } />
                <Route path="/community-sovereignty" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <CommunitySovereignty />
                    </main>
                  </div>
                } />
                <Route path="/community-defense" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <CommunityDefense />
                    </main>
                  </div>
                } />
                <Route path="/skills" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <SkillsPage />
                    </main>
                  </div>
                } />
                <Route path="/integrations" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <IntegrationsPage />
                    </main>
                  </div>
                } />
                <Route path="/reports" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <ReportsPage />
                    </main>
                  </div>
                } />
                <Route path="/profile" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <ProfilePage />
                    </main>
                  </div>
                } />
                <Route path="/settings" element={
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-1" id="main-content">
                      <Settings />
                    </main>
                  </div>
                } />
                <Route path="/auth" element={<AuthPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminPage />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="users" element={<AdminUsersPage />} />
                  <Route path="analytics" element={<AdminAnalyticsPage />} />
                  <Route path="security" element={<AdminSecurityPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
