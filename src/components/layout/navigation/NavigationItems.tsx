import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { dashboardNavItem, featureNav } from '@/lib/navigation';

/**
 * Condensed desktop top-bar navigation. Shown only to authenticated members.
 * The full feature directory lives on the dashboard hub; here we surface the
 * dashboard plus the highest-traffic areas.
 */
export const NavigationItems: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const items = [dashboardNavItem, ...featureNav.filter((item) => item.primary)];

  return (
    <>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        return (
          <Button
            key={item.href}
            asChild
            variant={isActive ? 'secondary' : 'ghost'}
            size="sm"
            className="text-sm font-medium"
          >
            <Link
              to={item.href}
              className="flex items-center gap-2"
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className={cn('hidden lg:inline')}>{item.label}</span>
            </Link>
          </Button>
        );
      })}
    </>
  );
};
