
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Utensils, 
  Heart, 
  Shield,
  Users
} from 'lucide-react';

// Only 4 core navigation items as requested
const navigationItems = [
  { key: 'mutual_aid', href: '/mutual-aid', icon: Heart, label: 'Mutual Aid' },
  { key: 'food_security', href: '/food-security', icon: Utensils, label: 'Food Security' },
  { key: 'community_defense', href: '/community-defense', icon: Shield, label: 'Community Defense' },
  { key: 'community', href: '/community', icon: Users, label: 'Community' }
];

export const NavigationItems: React.FC = () => {
  return (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.key}
            asChild
            variant="ghost"
            size="sm"
            className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <Link to={item.href} className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span className="hidden lg:inline">
                {item.label}
              </span>
            </Link>
          </Button>
        );
      })}
    </>
  );
};
