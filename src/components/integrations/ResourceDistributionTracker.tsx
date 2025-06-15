
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, MapPin, Clock, QrCode, Camera } from 'lucide-react';
import { useResourceDistribution, ResourceDistribution } from '@/hooks/useIntegrations';
import { supabase } from '@/integrations/supabase/client';

export const ResourceDistributionTracker: React.FC = () => {
  const { updateDistributionStatus } = useResourceDistribution();
  const [distributions, setDistributions] = useState<ResourceDistribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDistributions();
  }, []);

  const fetchDistributions = async () => {
    try {
      const { data, error } = await supabase
        .from('resource_distributions')
        .select(`
          *,
          community_resource:community_resources!resource_id(resource_name, resource_type),
          donor_profile:profiles!donor_id(full_name, pseudonym),
          recipient_profile:profiles!recipient_id(full_name, pseudonym)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Transform the data to match our interface
      const transformedDistributions: ResourceDistribution[] = (data || []).map(dist => ({
        id: dist.id,
        resource_id: dist.resource_id,
        donor_id: dist.donor_id,
        recipient_id: dist.recipient_id,
        volunteer_id: dist.volunteer_id,
        qr_code: dist.qr_code || '',
        status: dist.status,
        scheduled_pickup_at: dist.scheduled_pickup_at,
        scheduled_delivery_at: dist.scheduled_delivery_at,
        pickup_location_lat: dist.pickup_location_lat,
        pickup_location_lng: dist.pickup_location_lng,
        delivery_location_lat: dist.delivery_location_lat,
        delivery_location_lng: dist.delivery_location_lng,
        verification_photo_url: dist.verification_photo_url,
        created_at: dist.created_at,
        community_resource: dist.community_resource && 
          typeof dist.community_resource === 'object' &&
          'resource_name' in dist.community_resource
          ? {
              resource_name: dist.community_resource.resource_name || '',
              resource_type: dist.community_resource.resource_type || ''
            }
          : null,
        donor_profile: dist.donor_profile && 
          typeof dist.donor_profile === 'object' &&
          'full_name' in dist.donor_profile
          ? {
              full_name: dist.donor_profile.full_name || '',
              pseudonym: dist.donor_profile.pseudonym || ''
            }
          : null,
        recipient_profile: dist.recipient_profile && 
          typeof dist.recipient_profile === 'object' &&
          'full_name' in dist.recipient_profile
          ? {
              full_name: dist.recipient_profile.full_name || '',
              pseudonym: dist.recipient_profile.pseudonym || ''
            }
          : null
      }));

      setDistributions(transformedDistributions);
    } catch (error) {
      console.error('Error fetching distributions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'picked_up': return 'bg-yellow-100 text-yellow-800';
      case 'in_transit': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (distributionId: string, newStatus: string) => {
    const updates: any = {};
    
    if (newStatus === 'picked_up') {
      updates.picked_up_at = new Date().toISOString();
    } else if (newStatus === 'delivered') {
      updates.delivered_at = new Date().toISOString();
    }

    await updateDistributionStatus(distributionId, newStatus, updates);
    fetchDistributions();
  };

  const generateQRCode = (qrCode: string) => {
    // In a real implementation, this would generate a QR code image
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qrCode)}`;
    return qrUrl;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading distributions...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Resource Distribution Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {distributions.filter(d => d.status === 'scheduled').length}
              </div>
              <div className="text-sm text-gray-600">Scheduled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {distributions.filter(d => d.status === 'picked_up').length}
              </div>
              <div className="text-sm text-gray-600">In Transit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {distributions.filter(d => d.status === 'delivered').length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{distributions.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {distributions.map((distribution) => (
          <Card key={distribution.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {distribution.community_resource?.resource_name || 'Unknown Resource'}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">From:</span>
                      <span>{distribution.donor_profile?.full_name || distribution.donor_profile?.pseudonym || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">To:</span>
                      <span>{distribution.recipient_profile?.full_name || distribution.recipient_profile?.pseudonym || 'Anonymous'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <Badge className={getStatusColor(distribution.status)}>
                    {distribution.status.replace('_', ' ')}
                  </Badge>
                  {distribution.qr_code && (
                    <div className="mt-2">
                      <img
                        src={generateQRCode(distribution.qr_code)}
                        alt="Distribution QR Code"
                        className="w-16 h-16 mx-auto"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Pickup Location</div>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{distribution.pickup_location_lat.toFixed(4)}, {distribution.pickup_location_lng.toFixed(4)}</span>
                  </div>
                  {distribution.scheduled_pickup_at && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(distribution.scheduled_pickup_at).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Delivery Location</div>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{distribution.delivery_location_lat.toFixed(4)}, {distribution.delivery_location_lng.toFixed(4)}</span>
                  </div>
                  {distribution.scheduled_delivery_at && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(distribution.scheduled_delivery_at).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {distribution.verification_photo_url && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">Verification Photo</div>
                  <img
                    src={distribution.verification_photo_url}
                    alt="Delivery verification"
                    className="w-32 h-24 object-cover rounded border"
                  />
                </div>
              )}

              <div className="flex gap-2">
                {distribution.status === 'scheduled' && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusUpdate(distribution.id, 'picked_up')}
                  >
                    Mark as Picked Up
                  </Button>
                )}
                {distribution.status === 'picked_up' && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusUpdate(distribution.id, 'delivered')}
                  >
                    Mark as Delivered
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <QrCode className="w-4 h-4 mr-2" />
                  View QR Code
                </Button>
                <Button size="sm" variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {distributions.length === 0 && (
          <Card className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Active Distributions</h3>
            <p className="text-gray-600">
              No resource distributions are currently being tracked.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
