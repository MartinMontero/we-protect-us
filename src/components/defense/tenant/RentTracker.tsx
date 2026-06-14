
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type RentRecord = Tables<'rent_tracking'> & {
  rental_properties: { address: string | null; landlord_name: string | null } | null;
};

export const RentTracker: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rentRecords, setRentRecords] = useState<RentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (user) {
      fetchRentRecords();
    }
  }, [user]);

  const fetchRentRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('rent_tracking')
        .select(`
          *,
          rental_properties (
            address,
            landlord_name
          )
        `)
        .eq('tenant_id', user?.id ?? '');

      if (error) throw error;
      setRentRecords(data || []);
    } catch (error) {
      console.error('Error fetching rent records:', error);
      toast({
        title: "Error",
        description: "Failed to load rent tracking data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateRentIncrease = (record: RentRecord) => {
    const notices = Array.isArray(record.rent_increase_notices) ? record.rent_increase_notices : [];
    if (notices.length > 0) {
      const lastIncrease = notices[notices.length - 1] as any;
      return ((lastIncrease.new_rent - record.monthly_rent) / record.monthly_rent * 100).toFixed(1);
    }
    return null;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading rent data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your Rent Tracking</h3>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      {/* Rent Increase Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="w-5 h-5" />
            Rent Increase Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-orange-700">
            Track and document all rent increases. California law limits annual increases to 5% + inflation (max 10%).
            Document everything for potential tenant union organizing.
          </p>
        </CardContent>
      </Card>

      {/* Rent Records */}
      <div className="grid gap-4">
        {rentRecords.map((record) => {
          const increasePercent = calculateRentIncrease(record);
          const notices = Array.isArray(record.rent_increase_notices) ? record.rent_increase_notices : [];
          
          return (
            <Card key={record.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{record.rental_properties?.address}</h4>
                    <p className="text-sm text-gray-600">
                      Unit {record.unit_number} • Landlord: {record.rental_properties?.landlord_name}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-medium">${record.monthly_rent}/month</span>
                      </div>
                      {increasePercent && (
                        <Badge variant={parseFloat(increasePercent) > 10 ? "destructive" : "secondary"}>
                          +{increasePercent}% increase
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Lease Period</p>
                    <p className="text-sm">
                      {record.lease_start_date ? new Date(record.lease_start_date).toLocaleDateString() : ''} - 
                      {record.lease_end_date ? new Date(record.lease_end_date).toLocaleDateString() : ''}
                    </p>
                  </div>
                </div>

                {notices.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h5 className="text-sm font-medium mb-2">Recent Increases</h5>
                    <div className="space-y-2">
                      {notices.slice(-2).map((notice: any, index: number) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{new Date(notice.notice_date).toLocaleDateString()}</span>
                          <Badge variant="outline">
                            ${notice.old_rent} → ${notice.new_rent}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {rentRecords.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Start Tracking Your Rent</h3>
            <p className="text-gray-600 mb-4">
              Monitor rent increases and build documentation for tenant organizing
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              Add Your First Property
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
