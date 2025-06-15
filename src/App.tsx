
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import MutualAid from "./pages/MutualAid";
import ToolLibrary from "./pages/ToolLibrary";
import CommunityGarden from "./pages/CommunityGarden";
import CommunityWealth from "./pages/CommunityWealth";
import ChildcareCoop from "./pages/ChildcareCoop";
import Organizing from "./pages/Organizing";
import SecurityGovernancePage from "./pages/SecurityGovernancePage";
import CommunitySovereignty from "./pages/CommunitySovereignty";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";
import Settings from "./pages/Settings";
import AuthPage from "./pages/AuthPage";
import ElderCare from "./pages/ElderCare";
import { Navigation } from "./components/layout/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/mutual-aid" element={<MutualAid />} />
              <Route path="/tool-library" element={<ToolLibrary />} />
              <Route path="/community-garden" element={<CommunityGarden />} />
              <Route path="/community-wealth" element={<CommunityWealth />} />
              <Route path="/childcare-coop" element={<ChildcareCoop />} />
              <Route path="/elder-care" element={<ElderCare />} />
              <Route path="/organizing" element={<Organizing />} />
              <Route path="/security-governance" element={<SecurityGovernancePage />} />
              <Route path="/community-sovereignty" element={<CommunitySovereignty />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthContextProvider>
  </QueryClientProvider>
);

export default App;
