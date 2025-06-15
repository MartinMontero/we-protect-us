
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/hooks/useRoles';
import { 
  Users,
  Settings,
  LogIn,
  Shield,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UserMenu } from '@/components/layout/UserMenu';
import { ThemeSelector } from './ThemeSelector';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { hasPermission } = useRoles();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Users },
    { href: '/integrations', label: 'Integrations', icon: Zap },
    ...(hasPermission('admin') ? [{ href: '/admin', label: 'Admin', icon: Shield }] : []),
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  if (!isOpen) return null;

  return (
    <div 
      id="mobile-menu"
      className="md:hidden border-t border-border bg-card"
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        {user && navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href ||
            (item.href === '/admin' && location.pathname.startsWith('/admin'));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors focus-visible",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        
        {/* Mobile auth section */}
        {user ? (
          <div className="px-3 py-2">
            <UserMenu />
          </div>
        ) : (
          <Link
            to="/auth"
            onClick={onClose}
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible"
          >
            <LogIn className="h-5 w-5" aria-hidden="true" />
            <span>Sign In</span>
          </Link>
        )}
        
        {/* Mobile language toggle */}
        <div className="pt-4 border-t border-border mt-4">
          <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
            Language
          </div>
          <div className="px-3">
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile theme selector */}
        <div className="pt-4 border-t border-border mt-4">
          <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
            Theme
          </div>
          <div className="px-3">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </div>
  );
};
