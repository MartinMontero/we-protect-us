
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OverviewMetrics } from './privacy/OverviewMetrics';
import { ComplianceSection } from './privacy/ComplianceSection';
import { EncryptionMap } from './privacy/EncryptionMap';

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
      
      {/* Technical Implementation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Implementation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Signal Protocol Implementation</h4>
              <ul className="text-sm space-y-1">
                <li>• Double Ratchet algorithm for forward secrecy</li>
                <li>• X3DH key agreement protocol</li>
                <li>• PreKey distribution via community nodes</li>
                <li>• Message padding for metadata protection</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Homomorphic Encryption</h4>
              <ul className="text-sm space-y-1">
                <li>• CKKS scheme for time bank calculations</li>
                <li>• Encrypted aggregation without decryption</li>
                <li>• Privacy-preserving analytics</li>
                <li>• Community-verified computations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
