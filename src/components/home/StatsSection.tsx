
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Clock, Shield } from 'lucide-react';

const stats = [
  {
    icon: Users,
    label: 'Active Communities',
    value: '50+',
    description: 'Communities using our platform',
    color: 'text-blue-600'
  },
  {
    icon: Heart,
    label: 'Mutual Aid Requests',
    value: '1,200+',
    description: 'Requests fulfilled this month',
    color: 'text-red-600'
  },
  {
    icon: Clock,
    label: 'Hours Shared',
    value: '5,400',
    description: 'Community hours exchanged',
    color: 'text-green-600'
  },
  {
    icon: Shield,
    label: 'Defense Campaigns',
    value: '25',
    description: 'Active organizing campaigns',
    color: 'text-purple-600'
  }
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Growing Movement Impact
          </h2>
          <p className="text-lg text-gray-600">
            Real numbers from real communities building power together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-full bg-gray-100 mb-4`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-medium text-gray-700 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500">
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
