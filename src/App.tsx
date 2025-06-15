
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Navigation } from '@/components/layout/Navigation';
import { HomePage } from '@/pages/HomePage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SecurityGovernancePage } from '@/pages/SecurityGovernancePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mutual-aid" element={<div className="p-8"><h1>Mutual Aid (Coming Soon)</h1></div>} />
          <Route path="/security-governance" element={<SecurityGovernancePage />} />
          <Route path="/community-wealth" element={<div className="p-8"><h1>Community Wealth (Coming Soon)</h1></div>} />
          <Route path="/organizing" element={<div className="p-8"><h1>Organizing (Coming Soon)</h1></div>} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
