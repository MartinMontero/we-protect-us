
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Navigation } from "@/components/layout/Navigation";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/food-security" element={<FoodSecurity />} />
                  <Route path="/energy-democracy" element={<EnergyDemocracy />} />
                  <Route path="/mutual-aid" element={<MutualAid />} />
                  <Route path="/tool-library" element={<ToolLibrary />} />
                  <Route path="/community-garden" element={<CommunityGarden />} />
                  <Route path="/community-wealth" element={<CommunityWealth />} />
                  <Route path="/childcare-coop" element={<ChildcareCoop />} />
                  <Route path="/elder-care" element={<ElderCare />} />
                  <Route path="/disaster-preparedness" element={<DisasterPreparedness />} />
                  <Route path="/organizing" element={<Organizing />} />
                  <Route path="/security-governance" element={<SecurityGovernancePage />} />
                  <Route path="/community-sovereignty" element={<CommunitySovereignty />} />
                  <Route path="/community-defense" element={<CommunityDefense />} />
                  <Route path="/skills" element={<SkillsPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/auth" element={<AuthPage />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
