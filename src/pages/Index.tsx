
import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { StatsSection } from '@/components/home/StatsSection';
import { CTASection } from '@/components/home/CTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesGrid />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default Index;
