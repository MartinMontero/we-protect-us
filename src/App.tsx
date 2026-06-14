import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';

// Import i18n to initialize it
import '@/lib/i18n';

// Eagerly loaded entry points (small / always needed)
import Index from '@/pages/Index';

// Route-level code splitting keeps the initial bundle small.
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const OnboardingPage = lazy(() => import('@/pages/OnboardingPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const MutualAid = lazy(() => import('@/pages/MutualAid'));
const CommunityDefense = lazy(() => import('@/pages/CommunityDefense'));
const FoodSecurity = lazy(() =>
  import('@/pages/FoodSecurity').then((m) => ({ default: m.FoodSecurity })),
);
const CommunityGarden = lazy(() =>
  import('@/pages/CommunityGarden').then((m) => ({ default: m.CommunityGarden })),
);
const ElderCare = lazy(() => import('@/pages/ElderCare'));
const ChildcareCoop = lazy(() =>
  import('@/pages/ChildcareCoop').then((m) => ({ default: m.ChildcareCoop })),
);
const EnergyDemocracy = lazy(() =>
  import('@/pages/EnergyDemocracy').then((m) => ({ default: m.EnergyDemocracy })),
);
const ToolLibrary = lazy(() =>
  import('@/pages/ToolLibrary').then((m) => ({ default: m.ToolLibrary })),
);
const SkillsPage = lazy(() => import('@/pages/SkillsPage'));
const CommunityWealth = lazy(() => import('@/pages/CommunityWealth'));
const CommunitySovereignty = lazy(() => import('@/pages/CommunitySovereignty'));
const Organizing = lazy(() => import('@/pages/Organizing'));
const Community = lazy(() => import('@/pages/Community'));
const Reports = lazy(() => import('@/pages/Reports'));
const IntegrationsPage = lazy(() => import('@/pages/IntegrationsPage'));
const DisasterPreparedness = lazy(() =>
  import('@/pages/DisasterPreparedness').then((m) => ({ default: m.DisasterPreparedness })),
);
const ProfilePage = lazy(() =>
  import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })),
);
const Settings = lazy(() => import('@/pages/Settings'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

const RouteFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
    <span className="sr-only">Loading…</span>
  </div>
);

const protect = (element: React.ReactNode) => <ProtectedRoute>{element}</ProtectedRoute>;

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <TooltipProvider>
                <Router>
                  <div className="min-h-screen bg-background text-foreground">
                    <Navigation />
                    <Toaster />
                    <Suspense fallback={<RouteFallback />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/auth" element={<AuthPage />} />
                        {/* Public so it works offline / without an account in an emergency */}
                        <Route path="/disaster-preparedness" element={<DisasterPreparedness />} />

                        <Route path="/onboarding" element={protect(<OnboardingPage />)} />
                        <Route path="/dashboard" element={protect(<DashboardPage />)} />
                        <Route path="/mutual-aid" element={protect(<MutualAid />)} />
                        <Route path="/community-defense" element={protect(<CommunityDefense />)} />
                        <Route path="/food-security" element={protect(<FoodSecurity />)} />
                        <Route path="/community-garden" element={protect(<CommunityGarden />)} />
                        <Route path="/elder-care" element={protect(<ElderCare />)} />
                        <Route path="/childcare" element={protect(<ChildcareCoop />)} />
                        <Route path="/energy-democracy" element={protect(<EnergyDemocracy />)} />
                        <Route path="/tool-library" element={protect(<ToolLibrary />)} />
                        <Route path="/skills" element={protect(<SkillsPage />)} />
                        <Route path="/community-wealth" element={protect(<CommunityWealth />)} />
                        <Route
                          path="/community-sovereignty"
                          element={protect(<CommunitySovereignty />)}
                        />
                        <Route path="/organizing" element={protect(<Organizing />)} />
                        <Route path="/community" element={protect(<Community />)} />
                        <Route path="/reports" element={protect(<Reports />)} />
                        <Route path="/integrations" element={protect(<IntegrationsPage />)} />
                        <Route path="/profile" element={protect(<ProfilePage />)} />
                        <Route path="/settings" element={protect(<Settings />)} />
                        <Route path="/admin/*" element={protect(<AdminPage />)} />

                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </div>
                </Router>
              </TooltipProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
