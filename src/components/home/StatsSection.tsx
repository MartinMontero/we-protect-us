
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Shield, Zap } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '2,500+',
    label: 'Community Members',
    description: 'Neighbors supporting each other'
  },
  {
    icon: Heart,
    value: '850+',
    label: 'Mutual Aid Requests',
    description: 'Fulfilled in the last month'
  },
  {
    icon: Shield,
    value: '45+',
    label: 'Defense Campaigns',
    description: 'Protecting our communities'
  },
  {
    icon: Zap,
    value: '120+',
    label: 'Solar Installations',
    description: 'Community energy projects'
  }
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Building <span className="text-red-600">Community Power</span> Together
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Real communities organizing for liberation, mutual aid, and collective defense
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center border-0 shadow-sm">
                <CardContent className="pt-8">
                  <div className="inline-flex p-3 rounded-full bg-red-100 text-red-600 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-medium text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
