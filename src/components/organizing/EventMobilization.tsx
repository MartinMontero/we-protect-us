
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { EncryptedLocationShare } from './event/EncryptedLocationShare';
import { LegalObserverCoordination } from './event/LegalObserverCoordination';
import { Calendar, MapPin, Shield, Eye, Clock, Users } from 'lucide-react';

export const EventMobilization: React.FC = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [secureMode, setSecureMode] = useState(false);

  const activeEvents = [
    {
      id: '1',
      title: 'Community Defense Training',
      date: '2025-01-20',
      time: '10:00 AM',
      location: 'Community Center',
      attendees: 23,
      securityLevel: 'standard',
      status: 'active'
    },
    {
      id: '2',
      title: 'Housing Justice Action',
      date: '2025-01-25',
      time: '2:00 PM',
      location: 'City Hall',
      attendees: 67,
      securityLevel: 'high',
      status: 'planning'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Event Creation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Create Mobilization Event
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Title</label>
              <Input
                placeholder="Community action title..."
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Security Mode</label>
              <div className="flex items-center space-x-2">
                <Switch checked={secureMode} onCheckedChange={setSecureMode} />
                <span className="text-sm">{secureMode ? 'High Security' : 'Standard'}</span>
                <Shield className={`w-4 h-4 ${secureMode ? 'text-red-500' : 'text-gray-500'}`} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description & Goals</label>
            <Textarea
              placeholder="Describe the action, objectives, and important details..."
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows={3}
            />
          </div>

          <Button className="w-full">Create Event</Button>
        </CardContent>
      </Card>

      {/* Active Events */}
      <Card>
        <CardHeader>
          <CardTitle>Active Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                    <Badge variant={event.securityLevel === 'high' ? 'destructive' : 'outline'}>
                      {event.securityLevel} security
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Share</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EncryptedLocationShare securityMode={secureMode ? 'high_risk' : 'standard'} />
        <LegalObserverCoordination />
      </div>
    </div>
  );
};
