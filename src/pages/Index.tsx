
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Heart, 
  Shield, 
  Users, 
  DollarSign, 
  Map,
  ArrowRight,
  Zap,
  Globe,
  Lock,
  Sparkles,
  Vote,
  Wrench,
  AlertTriangle,
  Apple
} from 'lucide-react';

const features = [
  {
    icon: AlertTriangle,
    title: 'Emergency Preparedness',
    description: 'Community-driven disaster preparedness and response coordination system.',
    color: 'from-red-500 to-orange-500',
    path: '/disaster-preparedness',
    implemented: true
  },
  {
    icon: Apple,
    title: 'Food Security Platform',
    description: 'Map food assets, coordinate distribution, and plan community food production.',
    color: 'from-green-500 to-emerald-500',
    path: '/food-security',
    implemented: true
  },
  {
    icon: Zap,
    title: 'Energy Democracy',
    description: 'Solar coordination, efficiency programs, and community energy resilience.',
    color: 'from-yellow-500 to-orange-500',
    path: '/energy-democracy',
    implemented: true
  },
  {
    icon: Heart,
    title: 'Mutual Aid Networks',
    description: 'Connect with neighbors to share resources, skills, and support during times of need.',
    color: 'from-blue-500 to-cyan-500',
    path: '/mutual-aid',
    implemented: true
  },
  {
    icon: Shield,
    title: 'Community Security',
    description: 'Security training and surveillance detection for community protection and safety.',
    color: 'from-purple-500 to-pink-500',
    path: '/security-governance',
    implemented: true
  },
  {
    icon: DollarSign,
    title: 'Solidarity Economy',
    description: 'Build alternative economic systems based on cooperation and community wealth.',
    color: 'from-green-500 to-emerald-500',
    path: '/community-wealth',
    implemented: true
  },
  {
    icon: Vote,
    title: 'Democratic Organizing',
    description: 'Tools for consensus building, event mobilization, and collaborative action.',
    color: 'from-indigo-500 to-purple-500',
    path: '/organizing',
    implemented: true
  },
  {
    icon: Wrench,
    title: 'Tool Library',
    description: 'Share tools and equipment with your community through our asset sharing system.',
    color: 'from-orange-500 to-amber-500',
    path: '/tool-library',
    implemented: true
  },
  {
    icon: Map,
    title: 'Community Mapping',
    description: 'Create and share maps of community assets, resources, and vulnerabilities.',
    color: 'from-yellow-500 to-orange-500',
    path: '/community',
    implemented: false
  },
  {
    icon: Globe,
    title: 'Global Solidarity',
    description: 'Connect with other communities around the world to share resources, knowledge, and support.',
    color: 'from-cyan-500 to-blue-500',
    path: '/global',
    implemented: false
  },
  {
    icon: Lock,
    title: 'Community Sovereignty',
    description: 'Build community autonomy through education, governance, and security coordination.',
    color: 'from-rose-500 to-red-500',
    path: '/community-sovereignty',
    implemented: true
  }
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFeatureClick = (feature: typeof features[0]) => {
    if (feature.implemented) {
      if (user) {
        navigate(feature.path);
      } else {
        navigate('/auth');
      }
    }
  };

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
                onClick={() => navigate('/disaster-preparedness')}
                className="border-2 px-8 py-4 text-lg rounded-xl hover:bg-slate-50 transition-all duration-200"
              >
                <AlertTriangle className="mr-2 w-5 h-5" />
                Emergency Prep
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
                <Card 
                  key={index} 
                  className={`group border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    feature.implemented ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => handleFeatureClick(feature)}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {feature.implemented ? (
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          Available
                        </div>
                      ) : (
                        <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
                          Coming Soon
                        </div>
                      )}
                    </div>
                    <h3 className={`text-xl font-bold text-slate-900 mb-3 transition-colors duration-200 ${
                      feature.implemented ? 'group-hover:text-red-600' : ''
                    }`}>
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                    {feature.implemented && (
                      <div className="flex items-center mt-4 text-red-600 font-medium">
                        <span>Explore Tool</span>
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
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

export default Index;
