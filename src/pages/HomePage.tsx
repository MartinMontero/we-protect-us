
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Users, 
  Shield, 
  Heart, 
  BarChart3,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Mutual Aid Networks',
    description: 'Connect with neighbors to share resources, skills, and support during times of need.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Shield,
    title: 'Community Security',
    description: 'Security training and surveillance detection for community protection and safety.',
    color: 'from-red-500 to-orange-500'
  },
  {
    icon: Heart,
    title: 'Solidarity Economy',
    description: 'Build alternative economic systems based on cooperation and community wealth.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: BarChart3,
    title: 'Democratic Governance',
    description: 'Transparent decision-making tools for truly democratic community organizing.',
    color: 'from-green-500 to-emerald-500'
  }
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Building Community Infrastructure for Mutual Aid</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 animate-fade-in">
              We Protect Us
              <span className="block bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Together We Rise
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 leading-relaxed animate-fade-in">
              A platform for mutual aid, community defense, solidarity economy, and democratic organizing. 
              Built by and for communities fighting for liberation and collective care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg" 
                onClick={() => navigate(user ? '/dashboard' : '/auth')}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {user ? 'Go to Dashboard' : 'Join the Movement'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/reports')}
                className="border-2 px-8 py-4 text-lg rounded-xl hover:bg-slate-50 transition-all duration-200"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Essential Tools for
              <span className="text-red-600"> Community Power</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Everything your community needs to organize, defend, and thrive together
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-8">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Community Power?
          </h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Join communities already organizing for liberation, mutual aid, and collective defense. 
            The future starts with us protecting each other.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate(user ? '/dashboard' : '/auth')}
            className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {user ? 'Go to Dashboard' : 'Start Organizing Today'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};
