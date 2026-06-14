
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Clock, DollarSign, Network, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type SolidarityMetrics = Tables<'solidarity_metrics'>;

export const SolidarityProjections: React.FC = () => {
  const [metrics, setMetrics] = useState<SolidarityMetrics[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<SolidarityMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
    // Update metrics daily
    const interval = setInterval(updateDailyMetrics, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      // Get historical metrics
      const { data: historical, error: historicalError } = await supabase
        .from('solidarity_metrics')
        .select('*')
        .order('date', { ascending: true })
        .limit(30);

      if (historicalError) throw historicalError;
      setMetrics(historical || []);
      
      // Get current day metrics
      const today = new Date().toISOString().split('T')[0];
      const currentDay = historical?.find(m => m.date === today);
      setCurrentMetrics(currentDay || null);

    } catch (error) {
      console.error('Error fetching solidarity metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDailyMetrics = async () => {
    try {
      const { error } = await supabase.rpc('update_solidarity_metrics');
      if (error) throw error;
      fetchMetrics(); // Refresh after update
    } catch (error) {
      console.error('Error updating metrics:', error);
    }
  };

  const calculateProjections = () => {
    if (metrics.length < 2) return null;
    
    const recent = metrics.slice(-7); // Last 7 days
    const avgGrowth = {
      hours: recent.reduce((acc, m, i) => i > 0 ? acc + ((m.total_hours_exchanged ?? 0) - (recent[i-1]?.total_hours_exchanged ?? 0)) : acc, 0) / Math.max(recent.length - 1, 1),
      participants: recent.reduce((acc, m, i) => i > 0 ? acc + ((m.active_participants ?? 0) - (recent[i-1]?.active_participants ?? 0)) : acc, 0) / Math.max(recent.length - 1, 1),
      wealth: recent.reduce((acc, m, i) => i > 0 ? acc + ((m.wealth_circulated ?? 0) - (recent[i-1]?.wealth_circulated ?? 0)) : acc, 0) / Math.max(recent.length - 1, 1),
    };

    const current = currentMetrics || recent[recent.length - 1];
    
    return {
      oneMonth: {
        hours: Math.max(0, (current.total_hours_exchanged ?? 0) + (avgGrowth.hours * 30)),
        participants: Math.max(0, (current.active_participants ?? 0) + (avgGrowth.participants * 30)),
        wealth: Math.max(0, (current.wealth_circulated ?? 0) + (avgGrowth.wealth * 30)),
      },
      oneYear: {
        hours: Math.max(0, (current.total_hours_exchanged ?? 0) + (avgGrowth.hours * 365)),
        participants: Math.max(0, (current.active_participants ?? 0) + (avgGrowth.participants * 365)),
        wealth: Math.max(0, (current.wealth_circulated ?? 0) + (avgGrowth.wealth * 365)),
      }
    };
  };

  const projections = calculateProjections();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Wealth</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${currentMetrics?.wealth_circulated?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Hours × $15 living wage equivalent
            </p>
            {projections && (
              <div className="mt-2 text-xs">
                <div>1 month: ${projections.oneMonth.wealth.toLocaleString()}</div>
                <div>1 year: ${projections.oneYear.wealth.toLocaleString()}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Liberated</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {currentMetrics?.total_hours_exchanged?.toFixed(1) || 0}h
            </div>
            <p className="text-xs text-muted-foreground">
              Community labor exchange
            </p>
            {projections && (
              <div className="mt-2 text-xs">
                <div>1 month: {projections.oneMonth.hours.toFixed(1)}h</div>
                <div>1 year: {projections.oneYear.hours.toFixed(1)}h</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trust Network</CardTitle>
            <Network className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {currentMetrics?.trust_network_size || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Density: {((currentMetrics?.network_density || 0) * 100).toFixed(1)}%
            </p>
            <Progress 
              value={(currentMetrics?.network_density || 0) * 100} 
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Vulnerability Support Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-500 mb-2">
            {((currentMetrics?.vulnerability_support_ratio || 0) * 100).toFixed(1)}%
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Percentage of community members with identified vulnerabilities receiving active support
          </p>
          <Progress 
            value={(currentMetrics?.vulnerability_support_ratio || 0) * 100} 
            className="h-3"
          />
          <p className="text-xs text-gray-500 mt-2">
            Goal: 100% of vulnerable community members supported
          </p>
        </CardContent>
      </Card>

      {metrics.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Community Growth Trajectory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: any, name: string) => [
                    typeof value === 'number' ? value.toFixed(2) : value,
                    name === 'total_hours_exchanged' ? 'Hours Exchanged' :
                    name === 'active_participants' ? 'Active Participants' :
                    name === 'wealth_circulated' ? 'Wealth Circulated ($)' : name
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="total_hours_exchanged" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  name="Hours Exchanged"
                />
                <Line 
                  type="monotone" 
                  dataKey="active_participants" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  name="Active Participants"
                />
                <Line 
                  type="monotone" 
                  dataKey="wealth_circulated" 
                  stroke="#16a34a" 
                  strokeWidth={2}
                  name="Wealth Circulated"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
