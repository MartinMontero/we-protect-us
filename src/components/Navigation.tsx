
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Sun, 
  Moon, 
  Contrast,
  Users,
  Heart,
  Map,
  Shield,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Users },
    { href: '/community', label: 'Community Map', icon: Map },
    { href: '/mutual-aid', label: 'Mutual Aid', icon: Heart },
    { href: '/sovereignty', label: 'Community Sovereignty', icon: Shield },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'high-contrast' as const, label: 'High Contrast', icon: Contrast },
  ];

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="skip-link"
        onFocus={(e) => e.target.classList.add('top-4')}
        onBlur={(e) => e.target.classList.remove('top-4')}
      >
        Skip to main content
      </a>

      <nav 
        className="bg-card border-b border-border sticky top-0 z-40"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors focus-visible"
                aria-label="We Protect Us - Home"
              >
                <Users className="h-8 w-8 text-primary" aria-hidden="true" />
                <span className="font-bold text-lg hidden sm:block">
                  We Protect Us
                </span>
                <span className="font-bold text-lg sm:hidden">WPU</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible",
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

              {/* Theme selector */}
              <div className="flex items-center space-x-1 ml-4">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <Button
                      key={option.value}
                      variant={theme === option.value ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setTheme(option.value)}
                      aria-label={`Switch to ${option.label} theme`}
                      aria-pressed={theme === option.value}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden border-t border-border bg-card"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
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
              
              {/* Mobile theme selector */}
              <div className="pt-4 border-t border-border mt-4">
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                  Theme
                </div>
                <div className="flex space-x-2 px-3">
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <Button
                        key={option.value}
                        variant={theme === option.value ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setTheme(option.value)}
                        aria-label={`Switch to ${option.label} theme`}
                        aria-pressed={theme === option.value}
                      >
                        <Icon className="h-4 w-4" />
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
