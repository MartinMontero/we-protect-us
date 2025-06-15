
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { MapPin, Lock, Eye, EyeOff, Clock, Users } from 'lucide-react';

interface EncryptedLocationShareProps {
  securityMode: 'standard' | 'high_risk';
}

export const EncryptedLocationShare: React.FC<EncryptedLocationShareProps> = ({ securityMode }) => {
  const [locationSharing, setLocationSharing] = useState(false);
  const [shareRadius, setShareRadius] = useState(100);
  const [timeLimit, setTimeLimit] = useState('2hours');

  const sharedLocations = [
    {
      id: '1',
      type: 'meetup_point',
      description: 'Primary gathering location',
      accuracy: 'neighborhood',
      expires: '2 hours',
      sharedWith: 12
    },
    {
      id: '2',
      type: 'safe_space',
      description: 'Emergency shelter point',
      accuracy: 'precise',
      expires: '4 hours',
      sharedWith: 5
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Encrypted Location Sharing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Enable Location Broadcast</h4>
            <p className="text-sm text-gray-600">Share encrypted location data with verified participants</p>
          </div>
          <Switch checked={locationSharing} onCheckedChange={setLocationSharing} />
        </div>

        {locationSharing && (
          <>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Sharing Accuracy</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {['precise', 'neighborhood', 'city'].map((level) => (
                    <Button
                      key={level}
                      variant="outline"
                      size="sm"
                      className="capitalize"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Auto-Expire</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {['1hour', '2hours', '4hours'].map((time) => (
                    <Button
                      key={time}
                      variant={timeLimit === time ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeLimit(time)}
                    >
                      {time.replace('hour', ' hr')}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <strong>Security:</strong> Locations are end-to-end encrypted and automatically 
                  expire. Only verified participants can access coordinates.
                </div>
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Active Location Shares</h4>
          {sharedLocations.map((location) => (
            <div key={location.id} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{location.description}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {location.accuracy}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{location.sharedWith}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Expires in {location.expires}</span>
                <Button size="sm" variant="ghost" className="h-6 px-2">
                  <EyeOff className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
