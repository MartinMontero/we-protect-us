import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Users
} from 'lucide-react';

// Only keep Community as requested - remove all the "Essential Tools"
const navigationItems = [
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
