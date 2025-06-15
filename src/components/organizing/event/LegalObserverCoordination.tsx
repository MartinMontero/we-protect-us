
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Eye, Shield, Phone, AlertTriangle, CheckCircle } from 'lucide-react';

export const LegalObserverCoordination: React.FC = () => {
  const [observerMode, setObserverMode] = useState(false);
  const [autoRecord, setAutoRecord] = useState(false);

  const observers = [
    {
      id: '1',
      name: 'Jordan K.',
      status: 'active',
      location: 'Main entrance',
      contacts: 3,
      incidents: 0
    },
    {
      id: '2',
      name: 'Alex M.',
      status: 'standby',
      location: 'North side',
      contacts: 1,
      incidents: 1
    }
  ];

  const emergencyContacts = [
    { name: 'Legal Hotline', number: '(555) 123-KNOW', type: 'primary' },
    { name: 'Jail Support', number: '(555) 456-BAIL', type: 'support' },
    { name: 'Emergency Dispatch', number: '(555) 789-HELP', type: 'emergency' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Legal Observer Coordination
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm">Observer Mode</h4>
              <p className="text-xs text-gray-600">Activate legal observation protocols</p>
            </div>
            <Switch checked={observerMode} onCheckedChange={setObserverMode} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm">Auto-Record</h4>
              <p className="text-xs text-gray-600">Automatic incident documentation</p>
            </div>
            <Switch checked={autoRecord} onCheckedChange={setAutoRecord} />
          </div>
        </div>

        {observerMode && (
          <>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Active Observers</h4>
              {observers.map((observer) => (
                <div key={observer.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{observer.name}</span>
                    <Badge variant={observer.status === 'active' ? 'default' : 'secondary'}>
                      {observer.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                    <span>📍 {observer.location}</span>
                    <span>📞 {observer.contacts} contacts</span>
                    <span className={observer.incidents > 0 ? 'text-red-600' : 'text-green-600'}>
                      {observer.incidents === 0 ? '✓ No incidents' : `⚠️ ${observer.incidents} incidents`}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Emergency Contacts</h4>
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="font-medium text-sm">{contact.name}</span>
                    <p className="text-xs text-gray-600">{contact.number}</p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Phone className="w-3 h-3" />
                    Call
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1 gap-1">
                <AlertTriangle className="w-3 h-3" />
                Report Incident
              </Button>
              <Button size="sm" variant="outline" className="flex-1 gap-1">
                <CheckCircle className="w-3 h-3" />
                Check In
              </Button>
            </div>
          </>
        )}

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Legal Protection:</strong> Observers document police interactions, 
              provide witness support, and coordinate legal aid when needed.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
