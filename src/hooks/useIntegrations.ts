
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export interface IntegrationConfig {
  id: string;
  service_name: string;
  api_endpoint: string;
  api_key_name: string;
  is_enabled: boolean;
  configuration: Record<string, any>;
  health_status: string;
  last_health_check: string;
}

export interface VolunteerMatch {
  id: string;
  need_id: string;
  volunteer_id: string;
  match_score: number;
  factors: Record<string, any>;
  status: string;
  created_at: string;
}

export interface ResourceDistribution {
  id: string;
  resource_id: string;
  donor_id: string;
  recipient_id: string;
  volunteer_id: string;
  qr_code: string;
  status: string;
  scheduled_pickup_at: string;
  scheduled_delivery_at: string;
}

export const useIntegrations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const { data, error } = await supabase
        .from('integration_config')
        .select('*')
        .order('service_name');

      if (error) throw error;
      setIntegrations(data || []);
    } catch (error) {
      console.error('Error fetching integrations:', error);
      toast({
        title: "Error",
        description: "Failed to load integration status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateIntegration = async (serviceName: string, config: Partial<IntegrationConfig>) => {
    try {
      const { error } = await supabase
        .from('integration_config')
        .update({
          ...config,
          updated_at: new Date().toISOString(),
        })
        .eq('service_name', serviceName);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${serviceName} integration updated`,
      });

      fetchIntegrations();
    } catch (error) {
      console.error('Error updating integration:', error);
      toast({
        title: "Error",
        description: "Failed to update integration",
        variant: "destructive",
      });
    }
  };

  return {
    integrations,
    loading,
    fetchIntegrations,
    updateIntegration,
  };
};

export const useVolunteerMatching = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const generateMatches = async (needId: string) => {
    try {
      // This would call an edge function to calculate matches
      const response = await fetch('/api/volunteer-matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({ needId }),
      });

      if (!response.ok) throw new Error('Failed to generate matches');

      const matches = await response.json();
      
      toast({
        title: "Success",
        description: `Generated ${matches.length} volunteer matches`,
      });

      return matches;
    } catch (error) {
      console.error('Error generating matches:', error);
      toast({
        title: "Error",
        description: "Failed to generate volunteer matches",
        variant: "destructive",
      });
      return [];
    }
  };

  const acceptMatch = async (matchId: string) => {
    try {
      const { error } = await supabase
        .from('volunteer_matches')
        .update({
          status: 'accepted',
          accepted_at: new Date().toISOString(),
        })
        .eq('id', matchId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Volunteer match accepted",
      });
    } catch (error) {
      console.error('Error accepting match:', error);
      toast({
        title: "Error",
        description: "Failed to accept match",
        variant: "destructive",
      });
    }
  };

  return {
    generateMatches,
    acceptMatch,
  };
};

export const useResourceDistribution = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const createDistribution = async (data: {
    resourceId: string;
    recipientId: string;
    volunteerId?: string;
    pickupLocation: { lat: number; lng: number };
    deliveryLocation: { lat: number; lng: number };
    scheduledPickup: string;
    scheduledDelivery: string;
  }) => {
    try {
      const qrCode = `QR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const { data: distribution, error } = await supabase
        .from('resource_distributions')
        .insert({
          resource_id: data.resourceId,
          donor_id: user?.id,
          recipient_id: data.recipientId,
          volunteer_id: data.volunteerId,
          qr_code: qrCode,
          pickup_location_lat: data.pickupLocation.lat,
          pickup_location_lng: data.pickupLocation.lng,
          delivery_location_lat: data.deliveryLocation.lat,
          delivery_location_lng: data.deliveryLocation.lng,
          scheduled_pickup_at: data.scheduledPickup,
          scheduled_delivery_at: data.scheduledDelivery,
          status: 'scheduled',
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Resource distribution scheduled",
      });

      return distribution;
    } catch (error) {
      console.error('Error creating distribution:', error);
      toast({
        title: "Error",
        description: "Failed to schedule distribution",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateDistributionStatus = async (distributionId: string, status: string, updates: any = {}) => {
    try {
      const { error } = await supabase
        .from('resource_distributions')
        .update({
          status,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', distributionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Distribution status updated",
      });
    } catch (error) {
      console.error('Error updating distribution:', error);
      toast({
        title: "Error",
        description: "Failed to update distribution",
        variant: "destructive",
      });
    }
  };

  return {
    createDistribution,
    updateDistributionStatus,
  };
};
