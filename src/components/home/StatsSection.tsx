
import React from 'react';
import { Users, Heart, Shield, Zap } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '2,500+',
      label: 'Active Members',
      description: 'Building community power together'
    },
    {
      icon: Heart,
      value: '15,000+',
      label: 'Mutual Aid Exchanges',
      description: 'Resources shared and neighbors helped'
    },
    {
      icon: Shield,
      value: '150+',
      label: 'Communities Defended',
      description: 'From displacement and environmental harm'
    },
    {
      icon: Zap,
      value: '500MW',
      label: 'Community Solar',
      description: 'Renewable energy coordinated'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Community Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real numbers from real communities organizing for liberation and mutual aid
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    {stat.label}
                  </div>
                  <p className="text-sm text-gray-600">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
