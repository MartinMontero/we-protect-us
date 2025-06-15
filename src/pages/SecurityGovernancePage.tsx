
import React from 'react';
import { AnarchoSyndicalistGovernance } from '@/components/security/AnarchoSyndicalistGovernance';

export const SecurityGovernancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Revolutionary Security & Governance
          </h1>
          <p className="text-xl text-gray-600">
            Training systems for community self-defense, democratic governance, and restorative justice
          </p>
        </div>
        
        <AnarchoSyndicalistGovernance />
      </div>
    </div>
  );
};
