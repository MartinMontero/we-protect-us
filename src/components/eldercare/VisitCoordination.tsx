
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, Bell, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type VisitRequest = Tables<'visit_requests'> & {
  elder_profiles?: { full_name: string } | null;
  volunteer_profiles?: { full_name: string } | null;
};

export const VisitCoordination: React.FC = () => {
  const [visits, setVisits] = useState<VisitRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newVisit, setNewVisit] = useState({
    elder_id: '',
    visit_type: '',
    scheduled_date: '',
    duration_minutes: 60,
    location_type: 'elder_home',
    location_address: '',
    description: '',
    urgency_level: 'medium'
  });
  const { toast } = useToast();

  const visitTypes = [
    { value: 'social', label: 'Social Visit', icon: '👥', color: 'bg-blue-100 text-blue-800' },
    { value: 'errands', label: 'Errands', icon: '🛒', color: 'bg-green-100 text-green-800' },
    { value: 'medical_appointment', label: 'Medical Appointment', icon: '🏥', color: 'bg-red-100 text-red-800' },
    { value: 'tech_help', label: 'Tech Support', icon: '💻', color: 'bg-purple-100 text-purple-800' },
    { value: 'emergency', label: 'Emergency', icon: '🚨', color: 'bg-red-200 text-red-900' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High Priority', color: 'bg-orange-100 text-orange-800' },
    { value: 'emergency', label: 'Emergency', color: 'bg-red-100 text-red-800' }
  ];

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('visit_requests')
        .select(`
          *,
          elder_profiles!inner(full_name),
          volunteer_profiles(full_name)
        `)
        .or(`requested_by.eq.${user.id},elder_profiles.elder_id.eq.${user.id},volunteer_profiles.volunteer_id.eq.${user.id}`)
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setVisits(data || []);
    } catch (error) {
      console.error('Error loading visits:', error);
    } finally {
      setLoading(false);
    }
  };

  const createVisit = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('visit_requests')
        .insert({
          ...newVisit,
          requested_by: user.id,
          scheduled_date: new Date(newVisit.scheduled_date).toISOString()
        });

      if (error) throw error;

      toast({
        title: "Visit request created",
        description: "Your visit request has been submitted and volunteers will be notified.",
      });

      setShowCreateForm(false);
      setNewVisit({
        elder_id: '',
        visit_type: '',
        scheduled_date: '',
        duration_minutes: 60,
        location_type: 'elder_home',
        location_address: '',
        description: '',
        urgency_level: 'medium'
      });
      loadVisits();
    } catch (error) {
      toast({
        title: "Error creating visit",
        description: "Failed to create visit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'assigned': return <User className="w-5 h-5 text-blue-600" />;
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress': return <Bell className="w-5 h-5 text-purple-600" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-700" />;
      case 'cancelled': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getVisitTypeInfo = (type: string) => {
    return visitTypes.find(vt => vt.value === type) || visitTypes[0];
  };

  const getUrgencyInfo = (level: string) => {
    return urgencyLevels.find(ul => ul.value === level) || urgencyLevels[1];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="w-10 h-10 text-blue-600" />
            Visit Coordination
          </h2>
          <p className="text-xl text-gray-600 mt-2">
            Schedule, manage, and track visits with caring volunteers
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          size="lg"
          className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700"
        >
          <Calendar className="w-6 h-6 mr-2" />
          Request Visit
        </Button>
      </div>

      {showCreateForm && (
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-2xl font-bold text-blue-800">Create Visit Request</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-lg font-medium">Visit Type</Label>
                <Select value={newVisit.visit_type} onValueChange={(value) => setNewVisit(prev => ({ ...prev, visit_type: value }))}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select visit type" />
                  </SelectTrigger>
                  <SelectContent>
                    {visitTypes.map(type => (
                      <SelectItem key={type.value} value={type.value} className="text-lg">
                        {type.icon} {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Urgency Level</Label>
                <Select value={newVisit.urgency_level} onValueChange={(value) => setNewVisit(prev => ({ ...prev, urgency_level: value }))}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map(level => (
                      <SelectItem key={level.value} value={level.value} className="text-lg">
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={newVisit.scheduled_date}
                  onChange={(e) => setNewVisit(prev => ({ ...prev, scheduled_date: e.target.value }))}
                  className="h-12 text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Duration (minutes)</Label>
                <Input
                  type="number"
                  min="30"
                  max="480"
                  step="30"
                  value={newVisit.duration_minutes}
                  onChange={(e) => setNewVisit(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) || 60 }))}
                  className="h-12 text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Location Type</Label>
                <Select value={newVisit.location_type} onValueChange={(value) => setNewVisit(prev => ({ ...prev, location_type: value }))}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elder_home" className="text-lg">Elder's Home</SelectItem>
                    <SelectItem value="community_center" className="text-lg">Community Center</SelectItem>
                    <SelectItem value="medical_facility" className="text-lg">Medical Facility</SelectItem>
                    <SelectItem value="virtual" className="text-lg">Virtual Visit</SelectItem>
                    <SelectItem value="public_space" className="text-lg">Public Space</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Address</Label>
                <Input
                  value={newVisit.location_address}
                  onChange={(e) => setNewVisit(prev => ({ ...prev, location_address: e.target.value }))}
                  className="h-12 text-lg"
                  placeholder="Enter location address"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-medium">Description</Label>
              <Textarea
                value={newVisit.description}
                onChange={(e) => setNewVisit(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-24 text-lg"
                placeholder="Describe what kind of help or companionship is needed..."
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={createVisit}
                disabled={loading}
                size="lg"
                className="flex-1 h-12 text-lg bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Creating...' : 'Create Visit Request'}
              </Button>
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
                size="lg"
                className="h-12 text-lg border-2"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visits.map((visit) => {
          const visitTypeInfo = getVisitTypeInfo(visit.visit_type ?? '');
          const urgencyInfo = getUrgencyInfo(visit.urgency_level ?? '');
          
          return (
            <Card key={visit.id} className="border-2 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">{visitTypeInfo.icon}</span>
                    {visitTypeInfo.label}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(visit.status ?? '')}
                    <span className="text-lg font-semibold capitalize">
                      {(visit.status ?? '').replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-2">
                  <Badge className={`text-lg p-2 ${visitTypeInfo.color}`}>
                    {visitTypeInfo.label}
                  </Badge>
                  <Badge className={`text-lg p-2 ${urgencyInfo.color}`}>
                    {urgencyInfo.label}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-medium">
                      {format(new Date(visit.scheduled_date), 'MMMM d, yyyy')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-lg">
                      {format(new Date(visit.scheduled_date), 'h:mm a')} ({visit.duration_minutes} minutes)
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <span className="text-lg">
                      {(visit.location_type ?? '').replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      {visit.location_address && ` - ${visit.location_address}`}
                    </span>
                  </div>
                  
                  {visit.elder_profiles && (
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-orange-600" />
                      <span className="text-lg">Elder: {visit.elder_profiles.full_name}</span>
                    </div>
                  )}
                  
                  {visit.volunteer_profiles && (
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-teal-600" />
                      <span className="text-lg">Volunteer: {visit.volunteer_profiles.full_name}</span>
                    </div>
                  )}
                </div>

                {visit.description && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg text-gray-700">{visit.description}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button size="lg" className="flex-1 h-12 text-lg bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {visit.status === 'pending' ? 'Accept' : 'Update'}
                  </Button>
                  <Button variant="outline" size="lg" className="h-12 text-lg border-2">
                    <Bell className="w-5 h-5 mr-2" />
                    Notify
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {visits.length === 0 && !loading && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No visits scheduled</h3>
            <p className="text-xl text-gray-500">Create your first visit request to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
