
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Home, 
  Utensils, 
  Zap, 
  Heart, 
  Hammer, 
  Flower, 
  Coins,
  Baby,
  Users,
  AlertTriangle,
  BookOpen,
  Megaphone,
  Shield,
  Crown,
  Swords
} from 'lucide-react';

const navigationItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'food_security', href: '/food-security', icon: Utensils },
  { key: 'energy_democracy', href: '/energy-democracy', icon: Zap },
  { key: 'mutual_aid', href: '/mutual-aid', icon: Heart },
  { key: 'tool_library', href: '/tool-library', icon: Hammer },
  { key: 'community_garden', href: '/community-garden', icon: Flower },
  { key: 'community_wealth', href: '/community-wealth', icon: Coins },
  { key: 'childcare_coop', href: '/childcare-coop', icon: Baby },
  { key: 'elder_care', href: '/elder-care', icon: Users },
  { key: 'disaster_prep', href: '/disaster-preparedness', icon: AlertTriangle },
  { key: 'skills', href: '/skills', icon: BookOpen },
  { key: 'organizing', href: '/organizing', icon: Megaphone },
  { key: 'security', href: '/security-governance', icon: Shield },
  { key: 'sovereignty', href: '/community-sovereignty', icon: Crown },
  { key: 'defense', href: '/community-defense', icon: Swords }
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
