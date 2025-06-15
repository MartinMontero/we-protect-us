
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Megaphone, Shield, Users, Info, CheckCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface EmergencyAlert {
  id: string;
  alert_type: 'warning' | 'evacuation' | 'shelter' | 'all_clear' | 'resource_request' | 'safety_check' | 'information';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  affected_areas: string[];
  expiration_time?: string;
  created_at: string;
}

export const EmergencyAlerts: React.FC = () => {
  const { data: alerts } = useQuery({
    queryKey: ['emergency-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('emergency_alerts')
        .select('*')
        .gte('expiration_time', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data as EmergencyAlert[];
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  const alertIcons = {
    warning: AlertTriangle,
    evacuation: Users,
    shelter: Shield,
    all_clear: CheckCircle,
    resource_request: Megaphone,
    safety_check: Users,
    information: Info
  };

  const severityColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    critical: 'bg-red-100 text-red-800 border-red-200'
  };

  const typeColors = {
    warning: 'bg-yellow-50 border-yellow-200',
    evacuation: 'bg-red-50 border-red-200',
    shelter: 'bg-blue-50 border-blue-200',
    all_clear: 'bg-green-50 border-green-200',
    resource_request: 'bg-purple-50 border-purple-200',
    safety_check: 'bg-indigo-50 border-indigo-200',
    information: 'bg-gray-50 border-gray-200'
  };

  if (!alerts?.length) {
    return (
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-green-800 font-medium">No active emergency alerts</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => {
        const IconComponent = alertIcons[alert.alert_type];
        return (
          <Card 
            key={alert.id} 
            className={`border-2 ${typeColors[alert.alert_type]} shadow-lg`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${severityColors[alert.severity]}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{alert.title}</h3>
                    <Badge className={severityColors[alert.severity]}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      {alert.alert_type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-700 mb-3 text-lg leading-relaxed">
                    {alert.message}
                  </p>
                  
                  {alert.affected_areas.length > 0 && (
                    <div className="mb-3">
                      <span className="font-semibold text-gray-900">Affected Areas: </span>
                      <span className="text-gray-700">
                        {alert.affected_areas.join(', ')}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(alert.created_at).toLocaleString()}
                      {alert.expiration_time && (
                        <span className="ml-2">
                          • Expires: {new Date(alert.expiration_time).toLocaleString()}
                        </span>
                      )}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Share
                      </Button>
                      <Button size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
