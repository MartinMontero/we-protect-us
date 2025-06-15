
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Users } from 'lucide-react';

export const BrandLogo: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center">
      <Link 
        to={user ? "/dashboard" : "/"} 
        className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors focus-visible group"
        aria-label="We Protect Us - Home"
      >
        <Users className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight hidden sm:block">
            We Protect Us
          </span>
          <span className="font-bold text-lg sm:hidden">
            WPU
          </span>
        </div>
      </Link>
    </div>
  );
};
