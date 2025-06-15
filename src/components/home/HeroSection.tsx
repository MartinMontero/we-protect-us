
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Shield, Heart, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50 dark:from-blue-950 dark:via-background dark:to-red-950 py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ef4444%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22m36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            <span>Building Community Power Through Mutual Aid</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            We Protect Us
            <span className="block bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent leading-tight">
              Together We Rise
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            A comprehensive platform for mutual aid, community defense, solidarity economy, 
            and democratic organizing. Built by and for communities fighting for liberation 
            and collective care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!loading && (
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link to={user ? '/dashboard' : '/auth'}>
                  {user ? 'Go to Dashboard' : 'Join the Movement'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            )}
            
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-2 border-border bg-card text-card-foreground px-8 py-4 text-lg rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            >
              <Link to="/disaster-preparedness">
                <Shield className="mr-2 w-5 h-5" />
                Emergency Prep
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Mutual Aid</h3>
              <p className="text-muted-foreground">Connect with neighbors to share resources and support</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Community Defense</h3>
              <p className="text-muted-foreground">Organize against displacement and defend our communities</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Democratic Organizing</h3>
              <p className="text-muted-foreground">Tools for consensus building and collaborative action</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
