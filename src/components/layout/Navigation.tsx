
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Shield, 
  BarChart3, 
  Settings,
  BookOpen,
  Leaf,
  Heart,
  Wrench,
  Sprout,
  DollarSign,
  Baby,
  FlameKindling,
  Zap,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

const navigationItems = [
  { name: 'navigation.home', href: '/home', icon: Home },
  { name: 'navigation.dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'navigation.food_security', href: '/food-security', icon: Leaf },
  { name: 'navigation.energy_democracy', href: '/energy-democracy', icon: Zap },
  { name: 'navigation.mutual_aid', href: '/mutual-aid', icon: Heart },
  { name: 'navigation.tool_library', href: '/tool-library', icon: Wrench },
  { name: 'navigation.community_garden', href: '/community-garden', icon: Sprout },
  { name: 'navigation.community_wealth', href: '/community-wealth', icon: DollarSign },
  { name: 'navigation.childcare_coop', href: '/childcare-coop', icon: Baby },
  { name: 'navigation.elder_care', href: '/elder-care', icon: User },
  { name: 'navigation.disaster_prep', href: '/disaster-preparedness', icon: FlameKindling },
  { name: 'navigation.skills', href: '/skills', icon: BookOpen },
  { name: 'navigation.organizing', href: '/organizing', icon: Users },
  { name: 'navigation.security', href: '/security-governance', icon: Shield },
  { name: 'navigation.sovereignty', href: '/community-sovereignty', icon: Shield },
  { name: 'navigation.defense', href: '/community-defense', icon: Shield }
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { t, isRTL } = useLanguage();

  return (
    <nav className={cn("bg-white shadow-lg border-b", isRTL && "rtl")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">CommunityOS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.slice(0, 8).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
                  {t(item.name)}
                </Link>
              );
            })}
            
            {/* More dropdown */}
            <div className="relative group">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                {t('common.more', 'More')}
              </Button>
              <div className={cn(
                "absolute top-full mt-1 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50",
                isRTL ? "right-0" : "left-0"
              )}>
                {navigationItems.slice(8).map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        isRTL && "flex-row-reverse"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
                      {t(item.name)}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    {t('navigation.profile')}
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={signOut}>
                  {t('navigation.sign_out')}
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button>{t('navigation.sign_in')}</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-base font-medium",
                    location.pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    isRTL && "flex-row-reverse"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className={cn("w-5 h-5", isRTL ? "ml-3" : "mr-3")} />
                  {t(item.name)}
                </Link>
              );
            })}
            
            {/* Mobile user menu */}
            <div className="border-t border-gray-200 pt-4">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.profile')}
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.settings')}
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    {t('navigation.sign_out')}
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {t('navigation.sign_in')}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
