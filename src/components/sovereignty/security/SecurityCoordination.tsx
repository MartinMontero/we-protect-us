
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { LocationConsent } from './LocationConsent';
import { EncryptionSimulator } from './EncryptionSimulator';
import { LegalRightsEducation } from './LegalRightsEducation';
import { Shield, MapPin, Lock, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

interface SecurityCoordinationProps {
  securityMode: 'standard' | 'high_risk';
}

export const SecurityCoordination: React.FC<SecurityCoordinationProps> = ({ securityMode }) => {
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);
  const [metadataScrubbing, setMetadataScrubbing] = useState(securityMode === 'high_risk');

  const securityFeatures = [
    {
      title: 'End-to-End Encryption',
      description: 'Signal Protocol simulation for secure communications',
      enabled: encryptionEnabled,
      critical: true,
      icon: Lock
    },
    {
      title: 'Metadata Scrubbing',
      description: 'Remove identifying information from shared content',
      enabled: metadataScrubbing,
      critical: securityMode === 'high_risk',
      icon: Shield
    },
    {
      title: 'Consent-Based Location',
      description: 'Granular control over location data sharing',
      enabled: locationSharing,
      critical: false,
      icon: MapPin
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Status
            <Badge variant={securityMode === 'high_risk' ? 'destructive' : 'secondary'}>
              {securityMode === 'high_risk' ? 'High Risk Mode' : 'Standard Mode'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {securityFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`p-4 border rounded-lg ${
                    feature.enabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Icon className={`w-5 h-5 ${feature.enabled ? 'text-green-600' : 'text-gray-400'}`} />
                    {feature.enabled ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : feature.critical ? (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    ) : null}
                  </div>
                  <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">
                      {feature.enabled ? 'Active' : 'Disabled'}
                    </span>
                    {feature.critical && !feature.enabled && (
                      <Badge variant="destructive" className="text-xs">Critical</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Security Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LocationConsent 
          enabled={locationSharing}
          onToggle={setLocationSharing}
          securityMode={securityMode}
        />
        
        <EncryptionSimulator 
          enabled={encryptionEnabled}
          onToggle={setEncryptionEnabled}
          securityMode={securityMode}
        />
      </div>

      {/* Legal Rights Education */}
      <LegalRightsEducation securityMode={securityMode} />
    </div>
  );
};
