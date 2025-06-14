
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Heart, Map, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { csfDB } from '@/utils/indexedDB';

const Index = () => {
  useEffect(() => {
    // Initialize IndexedDB on app load
    csfDB.init().catch(console.error);
    
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  const features = [
    {
      icon: Users,
      title: 'Community Networks',
      description: 'Connect with neighbors and build stronger local communities',
      href: '/community',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Mutual Aid',
      description: 'Share resources and support each other in times of need',
      href: '/mutual-aid',
      color: 'text-red-600'
    },
    {
      icon: Map,
      title: 'Local Discovery',
      description: 'Find community resources and events near you',
      href: '/community',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Trust Network',
      description: 'Build reputation through verified community interactions',
      href: '/settings',
      color: 'text-purple-600'
    },
    {
      icon: Zap,
      title: 'Offline First',
      description: 'Access your community even without internet connection',
      href: '/settings',
      color: 'text-yellow-600'
    },
    {
      icon: Globe,
      title: 'Federated Communities',
      description: 'Connect local networks while maintaining autonomy',
      href: '/community',
      color: 'text-indigo-600'
    }
  ];

  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Building Stronger{' '}
            <span className="text-primary">Communities</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect with neighbors, share resources, and create lasting solidarity through our decentralized community platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/community">
                <Map className="mr-2 h-5 w-5" />
                Explore Community
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link to="/mutual-aid">
                <Heart className="mr-2 h-5 w-5" />
                Find Mutual Aid
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Community-Centered Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with privacy, accessibility, and community autonomy at the core
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" className="w-full">
                      <Link to={feature.href}>
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Strengthen Your Community?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of neighbors building more resilient, connected communities
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link to="/community">
              <Users className="mr-2 h-5 w-5" />
              Get Started
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Index;
