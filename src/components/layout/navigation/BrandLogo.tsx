
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
        className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 -m-2"
        aria-label="We Protect Us - Home"
      >
        <div className="bg-gradient-to-br from-red-600 to-orange-600 p-2 rounded-lg shadow-lg">
          <Users className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl leading-tight text-gray-900 dark:text-white">
            We Protect Us
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
            Community Power
          </span>
        </div>
      </Link>
    </div>
  );
};
