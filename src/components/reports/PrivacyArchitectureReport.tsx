
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, Lock, Key, Database, Download, CheckCircle, AlertTriangle } from 'lucide-react';

export const PrivacyArchitectureReport: React.FC = () => {
  const dataSovereigntyCompliance = [
    {
      category: 'Data Localization',
      status: 'compliant',
      details: 'All user data stored in community-controlled infrastructure',
      score: 95
    },
    {
      category: 'User Consent',
      status: 'compliant',
      details: 'Granular consent management implemented',
      score: 92
    },
    {
      category: 'Data Portability',
      status: 'compliant',
      details: 'Full data export functionality available',
      score: 88
    },
    {
      category: 'Right to Deletion',
      status: 'warning',
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
      {/* Header with Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy Architecture Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{overallScore}%</div>
              <div className="text-sm text-gray-600">Overall Compliance Score</div>
              <Progress value={overallScore} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-sm text-gray-600">Encryption Protocols Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Community Data Sovereignty</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="w-3 h-3" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="w-3 h-3" />
              Export JSON
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Sovereignty Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Sovereignty Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataSovereigntyCompliance.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{item.category}</h4>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={item.status === 'compliant' ? 'default' : 'destructive'}
                      className="gap-1"
                    >
                      {item.status === 'compliant' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <AlertTriangle className="w-3 h-3" />
                      )}
                      {item.status === 'compliant' ? 'Compliant' : 'Needs Attention'}
                    </Badge>
                    <span className="text-sm font-medium">{item.score}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{item.details}</p>
                <Progress value={item.score} className="mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Encryption Implementation Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Encryption Implementation Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Component</th>
                  <th className="text-left p-3">Encryption Method</th>
                  <th className="text-left p-3">Key Management</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {encryptionMap.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 font-medium">{item.component}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="gap-1">
                        <Key className="w-3 h-3" />
                        {item.encryption}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{item.keyManagement}</td>
                    <td className="p-3">
                      <Badge variant="default" className="gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

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
