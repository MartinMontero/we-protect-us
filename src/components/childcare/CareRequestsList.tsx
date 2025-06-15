
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, AlertTriangle, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface CareRequest {
  id: string;
  requesting_parent_id: string;
  start_time: string;
  end_time: string;
  location_address: string;
  care_instructions: string;
  points_offered: number;
  status: string;
  last_minute_request: boolean;
  profiles: {
    pseudonym: string;
    verification_status: string;
  };
}

export const CareRequestsList: React.FC = () => {
  const [requests, setRequests] = useState<CareRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadCareRequests();
  }, []);

  const loadCareRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('care_requests')
        .select(`
          *,
          profiles:requesting_parent_id(pseudonym, verification_status)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      toast({
        title: "Error loading requests",
        description: "Failed to load care requests.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (requestId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('care_requests')
        .update({ 
          caregiver_id: user.id, 
          status: 'accepted' 
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Request accepted",
        description: "You've accepted this care request. The parent will be notified.",
      });

      loadCareRequests();
    } catch (error) {
      toast({
        title: "Error accepting request",
        description: "Failed to accept the request.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading care requests...</div>;
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No open care requests at the moment.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5" />
                {request.profiles?.pseudonym || 'Anonymous Parent'}
                {request.profiles?.verification_status === 'approved' && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Star className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                {request.last_minute_request && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Urgent
                  </Badge>
                )}
                <Badge variant="outline" className="font-semibold">
                  {request.points_offered} points
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{format(new Date(request.start_time), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>
                  {format(new Date(request.start_time), 'h:mm a')} - 
                  {format(new Date(request.end_time), 'h:mm a')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="truncate">{request.location_address}</span>
              </div>
            </div>

            {request.care_instructions && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Instructions:</strong> {request.care_instructions}
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <Button 
                onClick={() => acceptRequest(request.id)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Accept Request
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
