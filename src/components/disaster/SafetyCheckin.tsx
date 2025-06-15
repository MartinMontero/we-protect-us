
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, AlertTriangle, Users, MapPin, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useOfflineSync } from '@/hooks/useOfflineSync';

interface SafetyStatus {
  id: string;
  user_id: string;
  status: 'safe' | 'needs_help' | 'evacuated' | 'sheltering' | 'unknown';
  location_description?: string;
  medical_emergency: boolean;
  additional_info?: string;
  created_at: string;
}

export const SafetyCheckin: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isOnline, storeOfflineData } = useOfflineSync();
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<SafetyStatus['status']>('safe');

  const { data: recentCheckins } = useQuery({
    queryKey: ['safety-checkins'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('safety_checkins')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as SafetyStatus[];
    },
    enabled: isOnline
  });

  const checkinMutation = useMutation({
    mutationFn: async (data: {
      status: SafetyStatus['status'];
      location_description?: string;
      additional_info?: string;
      medical_emergency: boolean;
    }) => {
      if (!user) throw new Error('Not authenticated');
      
      const checkinData = {
        user_id: user.id,
        status: data.status,
        location_description: data.location_description,
        additional_info: data.additional_info,
        medical_emergency: data.medical_emergency,
        contact_method: 'app'
      };

      if (isOnline) {
        const { data: result, error } = await supabase
          .from('safety_checkins')
          .insert(checkinData)
          .select()
          .single();
        
        if (error) throw error;
        return result;
      } else {
        // Store offline
        const session = await supabase.auth.getSession();
        await storeOfflineData('checkin', checkinData, session.data.session?.access_token || '');
        return checkinData;
      }
    },
    onSuccess: () => {
      if (isOnline) {
        queryClient.invalidateQueries({ queryKey: ['safety-checkins'] });
      }
      toast({
        title: "Safety Status Updated",
        description: isOnline ? "Your safety check-in has been recorded." : "Check-in saved offline and will sync when connected.",
      });
      setLocation('');
      setAdditionalInfo('');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update safety status",
        variant: "destructive",
      });
    }
  });

  const handleCheckin = () => {
    checkinMutation.mutate({
      status: selectedStatus,
      location_description: location || undefined,
      additional_info: additionalInfo || undefined,
      medical_emergency: selectedStatus === 'needs_help'
    });
  };

  const statusColors = {
    safe: 'bg-green-100 text-green-800 border-green-200',
    needs_help: 'bg-red-100 text-red-800 border-red-200',
    evacuated: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    sheltering: 'bg-blue-100 text-blue-800 border-blue-200',
    unknown: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const statusIcons = {
    safe: CheckCircle,
    needs_help: AlertTriangle,
    evacuated: MapPin,
    sheltering: Users,
    unknown: Clock
  };

  return (
    <Card className="border-2 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          Quick Safety Check-in
          {!isOnline && (
            <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
              Offline Mode
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Check-in Form */}
          <div className="space-y-4">
            <div>
              <label className="text-lg font-medium mb-3 block">Current Status</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(statusColors).map(([status, colorClass]) => {
                  const IconComponent = statusIcons[status as keyof typeof statusIcons];
                  return (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      className={`h-16 flex flex-col items-center gap-1 ${
                        selectedStatus === status ? '' : colorClass
                      }`}
                      onClick={() => setSelectedStatus(status as SafetyStatus['status'])}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm capitalize">
                        {status.replace('_', ' ')}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-lg font-medium mb-2 block">Current Location</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Describe your current location..."
                className="h-12"
              />
            </div>

            <div>
              <label className="text-lg font-medium mb-2 block">Additional Information</label>
              <Textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Any additional details about your situation..."
                rows={3}
              />
            </div>

            <Button 
              onClick={handleCheckin}
              disabled={checkinMutation.isPending}
              className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
            >
              {checkinMutation.isPending ? 'Checking In...' : 'Submit Safety Check-in'}
            </Button>
          </div>

          {/* Recent Community Check-ins */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Community Check-ins</h3>
            {!isOnline && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 text-sm">
                  You're offline. Recent check-ins will load when connection is restored.
                </p>
              </div>
            )}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentCheckins?.map((checkin) => {
                const IconComponent = statusIcons[checkin.status];
                return (
                  <div key={checkin.id} className="p-3 border rounded-lg bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={statusColors[checkin.status]}>
                        <IconComponent className="w-3 h-3 mr-1" />
                        {checkin.status.replace('_', ' ')}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(checkin.created_at).toLocaleString()}
                      </span>
                    </div>
                    {checkin.location_description && (
                      <p className="text-sm text-gray-700 mb-1">
                        📍 {checkin.location_description}
                      </p>
                    )}
                    {checkin.additional_info && (
                      <p className="text-sm text-gray-600">
                        {checkin.additional_info}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
