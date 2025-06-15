
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Server } from 'lucide-react';

export const TechnicalDetails: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          Technical Implementation Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Server className="w-4 h-4" />
              Signal Protocol Implementation
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Double Ratchet algorithm for forward secrecy</li>
              <li>• X3DH key agreement protocol</li>
              <li>• PreKey distribution via community nodes</li>
              <li>• Message padding for metadata protection</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Homomorphic Encryption
            </h4>
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
  );
};
