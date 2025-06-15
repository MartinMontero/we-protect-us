
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart3, 
  Shield,
  Menu,
  Home
} from 'lucide-react';
import { UserMenu } from '@/components/layout/UserMenu';
import { useState } from 'react';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3
  },
  {
    name: 'Security',
    href: '/admin/security',
    icon: Shield
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
];

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActiveRoute = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-600" />
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <NavLink to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Back to App
              </Button>
            </NavLink>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden bg-white border-r border-gray-200`}>
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.href, item.exact);
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
