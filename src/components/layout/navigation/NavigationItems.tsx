
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
  Crown,
  Puzzle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const NavigationItems: React.FC = () => {
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { hasPermission, loading: rolesLoading } = useRoles();

  console.log('NavigationItems DEBUG:', {
    user: user?.id,
    authLoading,
    rolesLoading,
    currentPath: location.pathname,
    hasAdminPermission: hasPermission('admin')
  });

  // Always show integrations and admin for authenticated users, let the ProtectedRoute handle access control
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/mutual-aid', label: 'Mutual Aid', icon: Heart },
    { href: '/community-defense', label: 'Defense', icon: Shield },
    { href: '/food-security', label: 'Food', icon: Apple },
    { href: '/energy-democracy', label: 'Energy', icon: Zap },
    { href: '/tool-library', label: 'Tools', icon: Wrench },
    { href: '/skills', label: 'Skills', icon: Users },
    { href: '/integrations', label: 'Integrations', icon: Puzzle },
    { href: '/admin', label: 'Admin', icon: Crown },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  // Don't render anything if user is not authenticated
  if (!user) {
    console.log('NavigationItems: No user, returning null');
    return null;
  }

  console.log('NavigationItems: Rendering', navItems.length, 'items for user:', user.id);

  return (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href || 
          (item.href === '/admin' && location.pathname.startsWith('/admin'));
        
        console.log('Rendering nav item:', item.label, 'href:', item.href, 'isActive:', isActive);
        
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
