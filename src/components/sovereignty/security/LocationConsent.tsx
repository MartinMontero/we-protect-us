
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { MapPin, Eye, EyeOff, Users, Clock } from 'lucide-react';

interface LocationConsentProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  securityMode: 'standard' | 'high_risk';
}

export const LocationConsent: React.FC<LocationConsentProps> = ({ 
  enabled, 
  onToggle, 
  securityMode 
}) => {
  const [sharingLevel, setSharingLevel] = useState<'precise' | 'neighborhood' | 'city'>('neighborhood');
  const [timeLimit, setTimeLimit] = useState<'1hour' | '4hours' | '24hours'>('4hours');

  const sharingOptions = [
    {
      level: 'precise' as const,
      label: 'Precise Location',
      description: 'Exact coordinates (±3m)',
      risk: 'high'
    },
    {
      level: 'neighborhood' as const,
      label: 'Neighborhood',
      description: 'General area (±500m)',
      risk: 'medium'
    },
    {
      level: 'city' as const,
      label: 'City Level',
      description: 'City or region only',
      risk: 'low'
    }
  ];

  const timeLimits = [
    { value: '1hour' as const, label: '1 Hour', recommended: securityMode === 'high_risk' },
    { value: '4hours' as const, label: '4 Hours', recommended: securityMode === 'standard' },
    { value: '24hours' as const, label: '24 Hours', recommended: false }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Consent-Based Location Sharing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Enable Location Sharing</h4>
            <p className="text-sm text-gray-600">Share location data with community members</p>
          </div>
          <Switch checked={enabled} onCheckedChange={onToggle} />
        </div>

        {enabled && (
          <>
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Sharing Precision</h4>
              <div className="space-y-2">
                {sharingOptions.map((option) => (
                  <div
                    key={option.level}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      sharingLevel === option.level 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSharingLevel(option.level)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{option.label}</div>
                        <div className="text-xs text-gray-600">{option.description}</div>
                      </div>
                      <Badge 
                        variant={option.risk === 'high' ? 'destructive' : option.risk === 'medium' ? 'default' : 'secondary'}
                      >
                        {option.risk} risk
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Auto-Expire After</h4>
              <div className="grid grid-cols-3 gap-2">
                {timeLimits.map((limit) => (
                  <Button
                    key={limit.value}
                    variant={timeLimit === limit.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeLimit(limit.value)}
                    className="relative"
                  >
                    {limit.label}
                    {limit.recommended && (
                      <Badge className="absolute -top-1 -right-1 text-xs" variant="secondary">
                        Rec
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Eye className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <strong>Privacy Notice:</strong> Location data is encrypted and only visible to 
                  explicitly consented community members. Data automatically expires after the selected time.
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
