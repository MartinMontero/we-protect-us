import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Package, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ResourceDistribution {
  id: string;
  resource_type: string;
  quantity: number;
  distribution_date: string;
  status: string;
  donor_id: string;
  recipient_id: string;
  donor_profile?: {
    full_name: string;
    pseudonym: string;
  } | null;
  recipient_profile?: {
    full_name: string;
    pseudonym: string;
  } | null;
}

export const ResourceDistributionTracker: React.FC = () => {
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
          donor_profile:profiles!donor_id(full_name, pseudonym),
          recipient_profile:profiles!recipient_id(full_name, pseudonym)
        `)
        .order('distribution_date', { ascending: false })
        .limit(20);

      if (error) throw error;

      const mappedDistributions: ResourceDistribution[] = (data || []).map(dist => {
        // Safely extract donor profile
        const donorProfile = dist.donor_profile && 
          typeof dist.donor_profile === 'object' &&
          dist.donor_profile !== null &&
          'full_name' in dist.donor_profile
          ? dist.donor_profile as { full_name: string; pseudonym: string }
          : null;

        // Safely extract recipient profile  
        const recipientProfile = dist.recipient_profile &&
          typeof dist.recipient_profile === 'object' &&
          dist.recipient_profile !== null &&
          'full_name' in dist.recipient_profile
          ? dist.recipient_profile as { full_name: string; pseudonym: string }
          : null;

        return {
          id: dist.id,
          resource_type: dist.resource_type,
          quantity: dist.quantity,
          distribution_date: dist.distribution_date,
          status: dist.status,
          donor_id: dist.donor_id,
          recipient_id: dist.recipient_id,
          donor_profile: donorProfile,
          recipient_profile: recipientProfile,
        };
      });

      setDistributions(mappedDistributions);
    } catch (error) {
      console.error('Error fetching distributions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalDistributions = distributions.length;
  const completedDistributions = distributions.filter(d => d.status === 'completed').length;
  const pendingDistributions = distributions.filter(d => d.status === 'pending').length;

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading resource distributions...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Resource Distribution Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalDistributions}</div>
              <div className="text-sm text-gray-600">Total Distributions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedDistributions}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingDistributions}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {completedDistributions > 0 ? ((completedDistributions / totalDistributions) * 100).toFixed(0) : 0}%
              </div>
              <div className="text-sm text-gray-600">Success Rate</div>
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
                    {distribution.resource_type} - {distribution.quantity} units
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>From: {distribution.donor_profile?.full_name || distribution.donor_profile?.pseudonym || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>To: {distribution.recipient_profile?.full_name || distribution.recipient_profile?.pseudonym || 'Anonymous'}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Distribution Date: {new Date(distribution.distribution_date).toLocaleDateString()}
                  </div>
                </div>

                <div className="text-right">
                  <Badge className={getStatusColor(distribution.status)}>
                    {distribution.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {distributions.length === 0 && (
          <Card className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Resource Distributions</h3>
            <p className="text-gray-600 mb-4">
              No resource distributions have been recorded yet.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
