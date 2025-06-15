
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/hooks/useRoles';
import { 
  Users,
  Settings,
  Shield,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const NavigationItems: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { hasPermission } = useRoles();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Users },
    { href: '/integrations', label: 'Integrations', icon: Zap },
    ...(hasPermission('admin') ? [{ href: '/admin', label: 'Admin', icon: Shield }] : []),
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
              "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );
};
