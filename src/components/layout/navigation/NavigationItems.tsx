
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Home, 
  Utensils, 
  Heart, 
  Shield
} from 'lucide-react';

// Simplified navigation - only core items
const navigationItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'food_security', href: '/food-security', icon: Utensils },
  { key: 'mutual_aid', href: '/mutual-aid', icon: Heart },
  { key: 'community_defense', href: '/community-defense', icon: Shield }
];

export const NavigationItems: React.FC = () => {
  const { t } = useLanguage();

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
                {t(`navigation.${item.key}`)}
              </span>
            </Link>
          </Button>
        );
      })}
    </>
  );
};
