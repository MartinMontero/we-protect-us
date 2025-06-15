
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { AlertTriangle, Radio, Globe, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export const EmergencyModeActivator: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activating, setActivating] = useState(false);
  const [emergencyData, setEmergencyData] = useState({
    emergencyType: '',
    description: '',
    location: { lat: 0, lng: 0 },
    radius: 5,
    ushahidiEnabled: true,
    bridgefyEnabled: true,
    recoveryModeEnabled: true,
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setEmergencyData(prev => ({
          ...prev,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        }));
      });
    }
  };

  const activateEmergencyMode = async () => {
    if (!user || !emergencyData.emergencyType || !emergencyData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setActivating(true);
    try {
      const { data, error } = await supabase
        .from('emergency_activations')
        .insert({
          activated_by: user.id,
          activation_location_lat: emergencyData.location.lat,
          activation_location_lng: emergencyData.location.lng,
          activation_radius_km: emergencyData.radius,
          emergency_type: emergencyData.emergencyType,
          description: emergencyData.description,
          ushahidi_enabled: emergencyData.ushahidiEnabled,
          bridgefy_enabled: emergencyData.bridgefyEnabled,
          recovery_mode_enabled: emergencyData.recoveryModeEnabled,
        })
        .select()
        .single();

      if (error) throw error;

      // Call edge function to activate emergency protocols
      await fetch('/api/emergency/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          activationId: data.id,
          ...emergencyData,
        }),
      });

      toast({
        title: "Emergency Mode Activated",
        description: "All emergency protocols have been activated",
      });

      // Reset form
      setEmergencyData({
        emergencyType: '',
        description: '',
        location: { lat: 0, lng: 0 },
        radius: 5,
        ushahidiEnabled: true,
        bridgefyEnabled: true,
        recoveryModeEnabled: true,
      });
    } catch (error) {
      console.error('Error activating emergency mode:', error);
      toast({
        title: "Error",
        description: "Failed to activate emergency mode",
        variant: "destructive",
      });
    } finally {
      setActivating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          Emergency Mode Activation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyType">Emergency Type</Label>
            <Select
              value={emergencyData.emergencyType}
              onValueChange={(value) => setEmergencyData(prev => ({ ...prev, emergencyType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select emergency type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="natural_disaster">Natural Disaster</SelectItem>
                <SelectItem value="fire">Fire</SelectItem>
                <SelectItem value="medical_emergency">Medical Emergency</SelectItem>
                <SelectItem value="infrastructure_failure">Infrastructure Failure</SelectItem>
                <SelectItem value="security_threat">Security Threat</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="radius">Affected Radius (km)</Label>
            <Input
              id="radius"
              type="number"
              value={emergencyData.radius}
              onChange={(e) => setEmergencyData(prev => ({ ...prev, radius: parseInt(e.target.value) || 5 }))}
              min="1"
              max="50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Emergency Description</Label>
          <Textarea
            id="description"
            value={emergencyData.description}
            onChange={(e) => setEmergencyData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the emergency situation and immediate needs..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Latitude"
              value={emergencyData.location.lat || ''}
              onChange={(e) => setEmergencyData(prev => ({ 
                ...prev, 
                location: { ...prev.location, lat: parseFloat(e.target.value) || 0 }
              }))}
            />
            <Input
              placeholder="Longitude"
              value={emergencyData.location.lng || ''}
              onChange={(e) => setEmergencyData(prev => ({ 
                ...prev, 
                location: { ...prev.location, lng: parseFloat(e.target.value) || 0 }
              }))}
            />
            <Button variant="outline" onClick={getCurrentLocation}>
              Use Current
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Integration Activation</Label>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Ushahidi Crisis Mapping</span>
            </div>
            <Switch
              checked={emergencyData.ushahidiEnabled}
              onCheckedChange={(checked) => setEmergencyData(prev => ({ ...prev, ushahidiEnabled: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4" />
              <span>Bridgefy Mesh Network</span>
            </div>
            <Switch
              checked={emergencyData.bridgefyEnabled}
              onCheckedChange={(checked) => setEmergencyData(prev => ({ ...prev, bridgefyEnabled: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Recovery Volunteer Matching</span>
            </div>
            <Switch
              checked={emergencyData.recoveryModeEnabled}
              onCheckedChange={(checked) => setEmergencyData(prev => ({ ...prev, recoveryModeEnabled: checked }))}
            />
          </div>
        </div>

        <Button 
          onClick={activateEmergencyMode}
          disabled={activating || !emergencyData.emergencyType || !emergencyData.description}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          {activating ? 'Activating...' : 'ACTIVATE EMERGENCY MODE'}
        </Button>
      </CardContent>
    </Card>
  );
};
