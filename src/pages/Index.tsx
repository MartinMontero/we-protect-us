
import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { CTASection } from '@/components/home/CTASection';

const Index: React.FC = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <FeaturesGrid />
      <CTASection />
    </main>
  );
};

export default Index;
