
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, MessageSquare, AlertCircle } from 'lucide-react';
import { useRealtime } from '@/hooks/useRealtime';
import { supabase } from '@/integrations/supabase/client';

interface RealtimeEvent {
  id: string;
  type: 'user_activity' | 'content_update' | 'system_alert';
  message: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'error';
}

export const RealtimeDashboard: React.FC = () => {
  const [events, setEvents] = useState<RealtimeEvent[]>([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'warning' | 'error'>('healthy');

  // Listen to user activity
  useRealtime({
    table: 'profiles',
    event: 'UPDATE',
    onUpdate: (payload) => {
      const newEvent: RealtimeEvent = {
        id: Date.now().toString(),
        type: 'user_activity',
        message: `User ${payload.new.pseudonym || 'Unknown'} updated their profile`,
        timestamp: new Date(),
        severity: 'info',
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 19)]);
    },
  });

  // Listen to content updates
  useRealtime({
    table: 'mutual_aid_posts',
    event: '*',
    onInsert: (payload) => {
      const newEvent: RealtimeEvent = {
        id: Date.now().toString(),
        type: 'content_update',
        message: `New post created: ${payload.new.title}`,
        timestamp: new Date(),
        severity: 'info',
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 19)]);
    },
    onUpdate: (payload) => {
      const newEvent: RealtimeEvent = {
        id: Date.now().toString(),
        type: 'content_update',
        message: `Post updated: ${payload.new.title}`,
        timestamp: new Date(),
        severity: 'info',
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 19)]);
    },
  });

  // Active users = distinct members who posted in the last 24h (real signal),
  // refreshed periodically.
  useEffect(() => {
    let cancelled = false;

    const fetchActiveUsers = async () => {
      const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
      const { data } = await supabase
        .from('mutual_aid_posts')
        .select('user_id')
        .gte('created_at', since)
        .limit(1000);
      if (!cancelled) {
        setActiveUsers(new Set((data ?? []).map((p) => p.user_id)).size);
      }
    };

    fetchActiveUsers();
    const interval = setInterval(fetchActiveUsers, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const getEventIcon = (type: RealtimeEvent['type']) => {
    switch (type) {
      case 'user_activity': return <Users className="w-4 h-4" />;
      case 'content_update': return <MessageSquare className="w-4 h-4" />;
      case 'system_alert': return <AlertCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: RealtimeEvent['severity']) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{events.length}</div>
                <div className="text-sm text-gray-600">Live Events</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertCircle className={`w-5 h-5 ${
                systemHealth === 'healthy' ? 'text-green-600' : 
                systemHealth === 'warning' ? 'text-yellow-600' : 'text-red-600'
              }`} />
              <div>
                <div className={`text-2xl font-bold ${
                  systemHealth === 'healthy' ? 'text-green-600' : 
                  systemHealth === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {systemHealth.toUpperCase()}
                </div>
                <div className="text-sm text-gray-600">System Status</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Events Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Live Activity Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {events.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="mt-1">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.type.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {event.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{event.message}</p>
                </div>
              </div>
            ))}

            {events.length === 0 && (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Live Events</h3>
                <p className="text-gray-600">
                  Real-time events will appear here as they happen.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
