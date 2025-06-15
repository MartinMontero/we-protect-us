
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Unlock, Key, Shield, AlertCircle } from 'lucide-react';

interface EncryptionSimulatorProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  securityMode: 'standard' | 'high_risk';
}

export const EncryptionSimulator: React.FC<EncryptionSimulatorProps> = ({ 
  enabled, 
  onToggle, 
  securityMode 
}) => {
  const [demoMessage, setDemoMessage] = useState('Meeting at community garden at 3pm');
  const [isEncrypted, setIsEncrypted] = useState(false);

  // Simple simulation of encryption (not real encryption!)
  const simulateEncryption = (text: string): string => {
    return btoa(text).split('').reverse().join('').substring(0, 40) + '...';
  };

  const protocolFeatures = [
    {
      feature: 'Forward Secrecy',
      description: 'New keys for each message',
      active: enabled,
      critical: true
    },
    {
      feature: 'Identity Verification',
      description: 'Verify contact authenticity',
      active: enabled,
      critical: securityMode === 'high_risk'
    },
    {
      feature: 'Message Padding',
      description: 'Hide message length patterns',
      active: enabled && securityMode === 'high_risk',
      critical: false
    },
    {
      feature: 'Disappearing Messages',
      description: 'Auto-delete after timer',
      active: enabled,
      critical: false
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Signal Protocol Simulation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">End-to-End Encryption</h4>
            <p className="text-sm text-gray-600">Secure communication protocol</p>
          </div>
          <Switch checked={enabled} onCheckedChange={onToggle} />
        </div>

        {enabled && (
          <>
            {/* Protocol Features */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Protocol Features</h4>
              <div className="grid grid-cols-2 gap-2">
                {protocolFeatures.map((item) => (
                  <div
                    key={item.feature}
                    className={`p-2 border rounded-lg text-xs ${
                      item.active ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{item.feature}</span>
                      {item.active ? (
                        <Shield className="w-3 h-3 text-green-600" />
                      ) : item.critical ? (
                        <AlertCircle className="w-3 h-3 text-red-500" />
                      ) : (
                        <div className="w-3 h-3 bg-gray-300 rounded-full" />
                      )}
                    </div>
                    <div className="text-gray-600">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Encryption Demo */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Encryption Demo</h4>
              <div className="space-y-2">
                <Textarea
                  placeholder="Type a message to see encryption simulation..."
                  value={demoMessage}
                  onChange={(e) => setDemoMessage(e.target.value)}
                  className="text-sm"
                  rows={2}
                />
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEncrypted(!isEncrypted)}
                    className="gap-1"
                  >
                    {isEncrypted ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    {isEncrypted ? 'Decrypt' : 'Encrypt'}
                  </Button>
                </div>

                <div className="p-3 bg-gray-50 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">
                      {isEncrypted ? 'Encrypted Message' : 'Plain Text'}
                    </span>
                    <Badge variant={isEncrypted ? 'default' : 'secondary'} className="text-xs">
                      {isEncrypted ? 'Secure' : 'Vulnerable'}
                    </Badge>
                  </div>
                  <code className="text-sm text-gray-700 break-all">
                    {isEncrypted ? simulateEncryption(demoMessage) : demoMessage}
                  </code>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <strong>Educational Note:</strong> This simulates Signal Protocol features. 
                  Real implementations use complex cryptographic algorithms for maximum security.
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
