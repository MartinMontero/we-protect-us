
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Users, Heart, Shield } from 'lucide-react';

export const CTASection: React.FC = () => {
  const { user } = useAuth();

  return (
    <section className="py-24 bg-gradient-to-r from-red-600 to-orange-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-4 mb-8">
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Build Community Power?
        </h2>
        
        <p className="text-xl text-red-100 mb-8 leading-relaxed max-w-3xl mx-auto">
          Join communities already organizing for liberation, mutual aid, and collective defense. 
          The future starts with us protecting each other.
        </p>
        
        {/* Centered and bigger "Start Organizing Today" button */}
        <div className="flex justify-center mb-12">
          <Button 
            asChild
            size="lg"
            className="bg-white text-red-600 hover:bg-red-50 px-12 py-6 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-bold"
          >
            <Link to={user ? '/dashboard' : '/auth'}>
              {user ? 'Go to Dashboard' : 'Start Organizing Today'}
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </Button>
        </div>
        
        <div className="text-red-100">
          <p className="text-sm opacity-90">
            Free and open-source • Community-owned • Privacy-focused
          </p>
        </div>
      </div>
    </section>
  );
};
