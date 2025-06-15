
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/hooks/useRoles';
import { 
  LayoutDashboard,
  Heart,
  Shield,
  Apple,
  Zap,
  Wrench,
  Users,
  Settings,
  Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const NavigationItems: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { hasPermission } = useRoles();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/mutual-aid', label: 'Mutual Aid', icon: Heart },
    { href: '/community-defense', label: 'Defense', icon: Shield },
    { href: '/food-security', label: 'Food', icon: Apple },
    { href: '/energy-democracy', label: 'Energy', icon: Zap },
    { href: '/tool-library', label: 'Tools', icon: Wrench },
    { href: '/skills', label: 'Skills', icon: Users },
    ...(hasPermission('admin') ? [{ href: '/admin', label: 'Admin', icon: Crown }] : []),
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  if (!user) return null;

  return (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href || 
          (item.href === '/admin' && location.pathname.startsWith('/admin'));
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden lg:block">{item.label}</span>
          </Link>
        );
      })}
    </>
  );
};
