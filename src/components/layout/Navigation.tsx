
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LogIn } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { UserMenu } from '@/components/layout/UserMenu';
import { NavigationItems } from './navigation/NavigationItems';
import { ThemeSelector } from './navigation/ThemeSelector';
import { MobileMenu } from './navigation/MobileMenu';
import { BrandLogo } from './navigation/BrandLogo';

const Navigation = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      <nav 
        className="bg-card border-b border-border sticky top-0 z-40 w-full"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and brand */}
            <div className="flex-shrink-0">
              <BrandLogo />
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <NavigationItems />

              {/* Language toggle */}
              <div className="ml-2">
                <LanguageToggle />
              </div>

              {/* Theme selector */}
              <div className="ml-2">
                <ThemeSelector />
              </div>

              {/* Auth section */}
              <div className="ml-4">
                {user ? (
                  <UserMenu />
                ) : (
                  <Button asChild variant="default" size="sm">
                    <Link to="/auth" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      <span className="hidden sm:inline">Sign In</span>
                    </Link>
                  </Button>
                )}
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
                className="p-2"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </nav>
    </>
  );
};

export default Navigation;
