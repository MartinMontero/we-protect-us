
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
  Sparkles,
  CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Community Ownership',
    description: 'Track democratic governance and cooperative principles in action.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Comprehensive privacy architecture with transparent data practices.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Heart,
    title: 'Accessibility First',
    description: 'WCAG compliant design ensuring everyone can participate.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: BarChart3,
    title: 'Impact Analytics',
    description: 'Measure community impact with beautiful, actionable insights.',
    color: 'from-orange-500 to-red-500'
  }
];

const metrics = [
  { label: 'Active Communities', value: '247', change: '+12%' },
  { label: 'Members Served', value: '15.2K', change: '+23%' },
  { label: 'Privacy Score', value: '98%', change: '+5%' },
  { label: 'Accessibility', value: '100%', change: 'Stable' }
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Empowering Community-Driven Technology</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 animate-fade-in">
              Build Communities
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                That Truly Serve
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 leading-relaxed animate-fade-in">
              A comprehensive platform for democratic governance, privacy-first architecture, 
              and inclusive community building. Monitor compliance, track impact, and ensure 
              your technology serves everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg" 
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Explore Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/reports')}
                className="border-2 px-8 py-4 text-lg rounded-xl hover:bg-slate-50 transition-all duration-200"
              >
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-slate-900 mb-2">{metric.value}</div>
                  <div className="text-sm text-slate-600 mb-1">{metric.label}</div>
                  <div className="text-xs text-green-600 font-medium">{metric.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need for 
              <span className="text-blue-600"> Community Excellence</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Comprehensive tools and insights to build technology that truly serves communities
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
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
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
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join hundreds of communities already using our platform to build more democratic, 
            inclusive, and impactful technology.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};
