
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Users } from 'lucide-react';

export const BrandLogo: React.FC = () => {
  const { user } = useAuth();

  return (
    <Link 
      to={user ? "/dashboard" : "/"} 
      className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1 -m-1"
      aria-label="We Protect Us - Home"
    >
      <div className="bg-gradient-to-br from-red-600 to-orange-600 p-2 rounded-lg shadow-lg flex-shrink-0">
        <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-bold text-lg sm:text-xl leading-tight text-gray-900 dark:text-white truncate">
          We Protect Us
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block truncate">
          Community Power
        </span>
      </div>
    </Link>
  );
};
