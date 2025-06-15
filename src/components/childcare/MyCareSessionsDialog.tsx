
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface MyCareSessionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CareSession {
  id: string;
  scheduled_start: string;
  scheduled_end: string;
  status: string;
  care_requests: {
    location_address: string;
  } | null;
  profiles: {
    pseudonym: string;
  } | null;
}

export const MyCareSessionsDialog: React.FC<MyCareSessionsDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [sessions, setSessions] = useState<CareSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      loadMySessions();
    }
  }, [open]);

  const loadMySessions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('care_sessions')
        .select(`
          *,
          care_requests(location_address),
          profiles:parent_id(pseudonym)
        `)
        .eq('caregiver_id', user.id)
        .gte('scheduled_start', new Date().toISOString())
        .order('scheduled_start', { ascending: true });

      if (error) throw error;
      
      // Transform data to match interface
      const transformedData: CareSession[] = (data || []).map(item => ({
        ...item,
        care_requests: Array.isArray(item.care_requests) ? item.care_requests[0] : item.care_requests,
        profiles: Array.isArray(item.profiles) ? item.profiles[0] : item.profiles
      }));
      
      setSessions(transformedData);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>My Care Sessions</DialogTitle>
          <DialogDescription>
            Your upcoming and current childcare sessions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">Loading sessions...</div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No upcoming care sessions.
            </div>
          ) : (
            sessions.map((session) => (
              <div key={session.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{session.profiles?.pseudonym}</span>
                  </div>
                  <Badge className={getStatusColor(session.status)}>
                    {session.status.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(session.scheduled_start), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {format(new Date(session.scheduled_start), 'h:mm a')} - 
                      {format(new Date(session.scheduled_end), 'h:mm a')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <MapPin className="w-4 h-4" />
                    <span>{session.care_requests?.location_address}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
