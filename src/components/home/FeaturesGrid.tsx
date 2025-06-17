
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Utensils, 
  Shield, 
  Users, 
  Zap, 
  BookOpen,
  Wrench,
  Sprout
} from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Mutual Aid Networks',
    description: 'Connect with neighbors to share resources, skills, and support during times of need.',
    href: '/mutual-aid',
    color: 'text-red-600'
  },
  {
    icon: Utensils,
    title: 'Food Security',
    description: 'Community gardens, food distribution networks, and agricultural resource sharing.',
    href: '/food-security',
    color: 'text-green-600'
  },
  {
    icon: Shield,
    title: 'Community Defense',
    description: 'Tenant organizing, anti-displacement campaigns, and community protection strategies.',
    href: '/community-defense',
    color: 'text-blue-600'
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'Tools for organizing, consensus building, and strengthening neighborhood connections.',
    href: '/community',
    color: 'text-purple-600'
  },
  {
    icon: Zap,
    title: 'Energy Democracy',
    description: 'Solar cooperatives, energy audits, and community-controlled renewable projects.',
    href: '/energy-democracy',
    color: 'text-yellow-600'
  },
  {
    icon: BookOpen,
    title: 'Skills & Education',
    description: 'Peer-to-peer learning, skill sharing, and community education programs.',
    href: '/skills',
    color: 'text-indigo-600'
  },
  {
    icon: Wrench,
    title: 'Tool Library',
    description: 'Share tools and equipment with your community to reduce costs and waste.',
    href: '/tool-library',
    color: 'text-orange-600'
  },
  {
    icon: Sprout,
    title: 'Community Garden',
    description: 'Coordinate plot management, harvest sharing, and gardening knowledge.',
    href: '/community-garden',
    color: 'text-emerald-600'
  }
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Essential Tools for <span className="text-red-600">Community Power</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Everything your community needs to build mutual aid networks, organize for justice, and create lasting change
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-3 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors mb-4 ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Button asChild variant="outline" className="w-full group-hover:bg-red-50 group-hover:border-red-200">
                    <Link to={feature.href}>
                      Explore Tool
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
