
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
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
    key: 'dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true
  },
  {
    key: 'users',
    href: '/admin/users',
    icon: Users
  },
  {
    key: 'analytics',
    href: '/admin/analytics',
    icon: BarChart3
  },
  {
    key: 'security',
    href: '/admin/security',
    icon: Shield
  },
  {
    key: 'settings',
    href: '/admin/settings',
    icon: Settings
  }
];

export const AdminLayout: React.FC = () => {
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActiveRoute = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
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
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('admin.dashboard')}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <NavLink to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                {t('navigation.back_to_app')}
              </Button>
            </NavLink>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.href, item.exact);
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-800'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {t(`admin.${item.key}`)}
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
