
import React from 'react';
import { OverviewMetrics } from './privacy/OverviewMetrics';
import { ComplianceSection } from './privacy/ComplianceSection';
import { EncryptionMap } from './privacy/EncryptionMap';
import { TechnicalDetails } from './privacy/TechnicalDetails';

export const PrivacyArchitectureReport: React.FC = () => {
  const dataSovereigntyCompliance = [
    {
      category: 'Data Localization',
      status: 'compliant' as const,
      details: 'All user data stored in community-controlled infrastructure',
      score: 95
    },
    {
      category: 'User Consent',
      status: 'compliant' as const,
      details: 'Granular consent management implemented',
      score: 92
    },
    {
      category: 'Data Portability',
      status: 'compliant' as const,
      details: 'Full data export functionality available',
      score: 88
    },
    {
      category: 'Right to Deletion',
      status: 'warning' as const,
      details: 'Partial implementation - backup retention policy needed',
      score: 75
    }
  ];

  const encryptionMap = [
    {
      component: 'Mutual Aid Posts',
      encryption: 'AES-256',
      keyManagement: 'Community-controlled',
      status: 'active'
    },
    {
      component: 'Location Data',
      encryption: 'End-to-end (Signal Protocol)',
      keyManagement: 'User-controlled',
      status: 'active'
    },
    {
      component: 'Trust Relations',
      encryption: 'AES-256',
      keyManagement: 'Distributed',
      status: 'active'
    },
    {
      component: 'Time Bank Transactions',
      encryption: 'AES-256 + Homomorphic',
      keyManagement: 'Multi-party',
      status: 'active'
    }
  ];

  const overallScore = Math.round(
    dataSovereigntyCompliance.reduce((sum, item) => sum + item.score, 0) / 
    dataSovereigntyCompliance.length
  );

  return (
    <div className="space-y-6">
      <OverviewMetrics overallScore={overallScore} />
      <ComplianceSection items={dataSovereigntyCompliance} />
      <EncryptionMap items={encryptionMap} />
      <TechnicalDetails />
    </div>
  );
};
