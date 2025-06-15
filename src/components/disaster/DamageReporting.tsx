import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Camera, MapPin, Users, Wrench, Plus, Search } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface DamageReport {
  id: string;
  incident_type: string;
  severity: 'minor' | 'moderate' | 'major' | 'severe';
  location_description: string;
  description: string;
  safety_hazards?: string[];
  people_affected?: number;
  immediate_needs?: string[];
  access_blocked: boolean;
  utilities_affected?: string[];
  priority_level: number;
  status: string;
  created_at: string;
}

export const DamageReporting: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showReportForm, setShowReportForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const [newReport, setNewReport] = useState({
    incident_type: '',
    severity: 'moderate' as const,
    location_description: '',
    description: '',
    safety_hazards: [] as string[],
    people_affected: 0,
    immediate_needs: [] as string[],
    access_blocked: false,
    utilities_affected: [] as string[],
    priority_level: 3
  });

  const { data: reports = [] } = useQuery({
    queryKey: ['damage-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('damage_reports')
        .select('*')
        .order('priority_level', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as DamageReport[];
    }
  });

  const createReportMutation = useMutation({
    mutationFn: async (report: typeof newReport) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('damage_reports')
        .insert({
          reporter_id: user.id,
          ...report,
          people_affected: report.people_affected || null
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['damage-reports'] });
      setShowReportForm(false);
      setNewReport({
        incident_type: '',
        severity: 'moderate',
        location_description: '',
        description: '',
        safety_hazards: [],
        people_affected: 0,
        immediate_needs: [],
        access_blocked: false,
        utilities_affected: [],
        priority_level: 3
      });
      toast({
        title: "Damage Report Submitted",
        description: "Your damage report has been recorded successfully.",
      });
    }
  });

  const incidentTypes = [
    { value: 'structural', label: 'Structural Damage', icon: '🏗️' },
    { value: 'flooding', label: 'Flooding', icon: '🌊' },
    { value: 'fire', label: 'Fire Damage', icon: '🔥' },
    { value: 'utility', label: 'Utility Outage', icon: '⚡' },
    { value: 'road', label: 'Road/Bridge', icon: '🛣️' },
    { value: 'environmental', label: 'Environmental', icon: '🌳' },
    { value: 'medical', label: 'Medical Emergency', icon: '🏥' },
    { value: 'security', label: 'Security/Safety', icon: '🚨' }
  ];

  const severityColors = {
    minor: 'bg-yellow-100 text-yellow-800',
    moderate: 'bg-orange-100 text-orange-800',
    major: 'bg-red-100 text-red-800',
    severe: 'bg-red-200 text-red-900'
  };

  const statusColors = {
    reported: 'bg-blue-100 text-blue-800',
    assessed: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    unable_to_fix: 'bg-gray-100 text-gray-800'
  };

  const safetyHazardOptions = ['Electrical', 'Gas leak', 'Structural collapse', 'Sharp debris', 'Chemical spill', 'Fire hazard', 'Fall risk', 'Traffic hazard'];
  const immediateNeedOptions = ['Medical attention', 'Evacuation', 'Power restoration', 'Water access', 'Food/supplies', 'Shelter', 'Transportation', 'Communication'];
  const utilityOptions = ['Power', 'Water', 'Gas', 'Internet', 'Phone', 'Sewer'];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.location_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || report.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const handleCheckboxChange = (field: 'safety_hazards' | 'immediate_needs' | 'utilities_affected', value: string, checked: boolean) => {
    setNewReport(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-red-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            Damage Assessment & Recovery
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Damage Reports</h3>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search reports..."
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="minor">Minor</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="major">Major</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => setShowReportForm(!showReportForm)}
                className="bg-red-600 hover:bg-red-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Report Damage
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Report Form */}
          {showReportForm && (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Incident Type *</label>
                    <Select 
                      value={newReport.incident_type} 
                      onValueChange={(value) => setNewReport(prev => ({ ...prev, incident_type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        {incidentTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Severity *</label>
                    <Select 
                      value={newReport.severity} 
                      onValueChange={(value) => setNewReport(prev => ({ ...prev, severity: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minor">Minor</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="major">Major</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location *</label>
                    <Input
                      value={newReport.location_description}
                      onChange={(e) => setNewReport(prev => ({ ...prev, location_description: e.target.value }))}
                      placeholder="Describe the location..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">People Affected</label>
                    <Input
                      type="number"
                      min="0"
                      value={newReport.people_affected}
                      onChange={(e) => setNewReport(prev => ({ ...prev, people_affected: parseInt(e.target.value) || 0 }))}
                      placeholder="Number of people affected"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description *</label>
                  <Textarea
                    value={newReport.description}
                    onChange={(e) => setNewReport(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of the damage..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Safety Hazards</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {safetyHazardOptions.map(hazard => (
                        <div key={hazard} className="flex items-center space-x-2">
                          <Checkbox
                            checked={newReport.safety_hazards.includes(hazard)}
                            onCheckedChange={(checked) => handleCheckboxChange('safety_hazards', hazard, !!checked)}
                          />
                          <label className="text-sm">{hazard}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Immediate Needs</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {immediateNeedOptions.map(need => (
                        <div key={need} className="flex items-center space-x-2">
                          <Checkbox
                            checked={newReport.immediate_needs.includes(need)}
                            onCheckedChange={(checked) => handleCheckboxChange('immediate_needs', need, !!checked)}
                          />
                          <label className="text-sm">{need}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Utilities Affected</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {utilityOptions.map(utility => (
                        <div key={utility} className="flex items-center space-x-2">
                          <Checkbox
                            checked={newReport.utilities_affected.includes(utility)}
                            onCheckedChange={(checked) => handleCheckboxChange('utilities_affected', utility, !!checked)}
                          />
                          <label className="text-sm">{utility}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={newReport.access_blocked}
                    onCheckedChange={(checked) => setNewReport(prev => ({ ...prev, access_blocked: !!checked }))}
                  />
                  <label className="text-sm font-medium">Access to location is blocked</label>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => createReportMutation.mutate(newReport)}
                    disabled={!newReport.incident_type || !newReport.location_description || !newReport.description || createReportMutation.isPending}
                  >
                    Submit Report
                  </Button>
                  <Button variant="outline" onClick={() => setShowReportForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Reports */}
          <div className="space-y-4">
            {filteredReports.map((report) => {
              const incidentInfo = incidentTypes.find(type => type.value === report.incident_type);
              
              return (
                <Card key={report.id} className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{incidentInfo?.icon || '⚠️'}</span>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {incidentInfo?.label || report.incident_type}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {report.location_description}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={severityColors[report.severity]}>
                          {report.severity.toUpperCase()}
                        </Badge>
                        <Badge className={statusColors[report.status as keyof typeof statusColors]}>
                          {report.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline">
                          Priority {report.priority_level}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{report.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {report.safety_hazards && report.safety_hazards.length > 0 && (
                        <div>
                          <p className="font-semibold text-red-700 mb-1">⚠️ Safety Hazards:</p>
                          <div className="flex flex-wrap gap-1">
                            {report.safety_hazards.map((hazard, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {hazard}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {report.immediate_needs && report.immediate_needs.length > 0 && (
                        <div>
                          <p className="font-semibold text-orange-700 mb-1">🚨 Immediate Needs:</p>
                          <div className="flex flex-wrap gap-1">
                            {report.immediate_needs.map((need, index) => (
                              <Badge key={index} className="bg-orange-100 text-orange-800 text-xs">
                                {need}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {report.utilities_affected && report.utilities_affected.length > 0 && (
                        <div>
                          <p className="font-semibold text-blue-700 mb-1">⚡ Utilities Affected:</p>
                          <div className="flex flex-wrap gap-1">
                            {report.utilities_affected.map((utility, index) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                                {utility}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {report.people_affected && report.people_affected > 0 && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {report.people_affected} people affected
                          </span>
                        )}
                        {report.access_blocked && (
                          <span className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="w-3 h-3" />
                            Access blocked
                          </span>
                        )}
                        <span>{new Date(report.created_at).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Camera className="w-3 h-3 mr-1" />
                          Photos
                        </Button>
                        <Button size="sm">
                          <Wrench className="w-3 h-3 mr-1" />
                          Assign Volunteers
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No damage reports found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
