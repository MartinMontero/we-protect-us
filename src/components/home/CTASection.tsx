
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 to-red-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Organizing Today
          </h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Join thousands of community organizers using We Protect Us to build mutual aid networks, 
            fight displacement, and create the world we deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-50 text-lg px-8 py-3">
              <Link to="/auth" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-3">
              <Link to="/mutual-aid">
                Explore Tools
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
