
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Apple, 
  Zap, 
  Heart, 
  Shield, 
  DollarSign, 
  Vote, 
  Wrench,
  ArrowRight 
} from 'lucide-react';

const features = [
  {
    icon: AlertTriangle,
    title: 'Emergency Preparedness',
    description: 'Community-driven disaster preparedness and response coordination system.',
    color: 'from-red-500 to-orange-500',
    path: '/disaster-preparedness',
    status: 'active'
  },
  {
    icon: Apple,
    title: 'Food Security Platform',
    description: 'Map food assets, coordinate distribution, and plan community food production.',
    color: 'from-green-500 to-emerald-500',
    path: '/food-security',
    status: 'active'
  },
  {
    icon: Zap,
    title: 'Energy Democracy',
    description: 'Solar coordination, efficiency programs, and community energy resilience.',
    color: 'from-yellow-500 to-orange-500',
    path: '/energy-democracy',
    status: 'active'
  },
  {
    icon: Heart,
    title: 'Mutual Aid Networks',
    description: 'Connect with neighbors to share resources, skills, and support during times of need.',
    color: 'from-blue-500 to-cyan-500',
    path: '/mutual-aid',
    status: 'active'
  },
  {
    icon: Shield,
    title: 'Community Defense',
    description: 'Organize against displacement, environmental threats, and defend our communities.',
    color: 'from-purple-500 to-pink-500',
    path: '/community-defense',
    status: 'active'
  },
  {
    icon: DollarSign,
    title: 'Solidarity Economy',
    description: 'Build alternative economic systems based on cooperation and community wealth.',
    color: 'from-green-500 to-emerald-500',
    path: '/community-wealth',
    status: 'active'
  },
  {
    icon: Vote,
    title: 'Democratic Organizing',
    description: 'Tools for consensus building, event mobilization, and collaborative action.',
    color: 'from-indigo-500 to-purple-500',
    path: '/organizing',
    status: 'active'
  },
  {
    icon: Wrench,
    title: 'Tool Library',
    description: 'Share tools and equipment with your community through our asset sharing system.',
    color: 'from-orange-500 to-amber-500',
    path: '/tool-library',
    status: 'active'
  }
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Essential Tools for
            <span className="text-red-600"> Community Power</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything your community needs to organize, defend, and thrive together
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant={feature.status === 'active' ? 'default' : 'secondary'} className="bg-green-100 text-green-700">
                      Available
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  <Link 
                    to={feature.path}
                    className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
                  >
                    <span>Explore Tool</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
