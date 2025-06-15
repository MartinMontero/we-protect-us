
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Plus, Camera, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TenantIssue {
  id: string;
  issue_type: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'escalated';
  priority_level: number;
  date_reported: string;
  documentation: any[];
  rental_properties?: {
    address: string;
  };
}

export const RepairRequests: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [issues, setIssues] = useState<TenantIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);

  useEffect(() => {
    if (user) {
      fetchIssues();
    }
  }, [user]);

  const fetchIssues = async () => {
    try {
      const { data, error } = await supabase
        .from('tenant_issues')
        .select(`
          *,
          rental_properties (
            address
          )
        `)
        .eq('reporter_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIssues(data || []);
    } catch (error) {
      console.error('Error fetching issues:', error);
      toast({
        title: "Error",
        description: "Failed to load repair requests",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: number) => {
    if (priority >= 4) return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (priority >= 3) return <Clock className="w-4 h-4 text-yellow-500" />;
    return <Clock className="w-4 h-4 text-green-500" />;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading repair requests...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Repair & Maintenance Issues</h3>
        <Button onClick={() => setShowReportForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Report Issue
        </Button>
      </div>

      {/* Documentation Guide */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Camera className="w-5 h-5" />
            Documentation Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Take photos with timestamps of all issues</li>
            <li>• Send written requests to landlord (email/text)</li>
            <li>• Keep records of all communications</li>
            <li>• Document health and safety impacts</li>
            <li>• Track response times for pattern analysis</li>
          </ul>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="grid gap-4">
        {issues.map((issue) => (
          <Card key={issue.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  {getPriorityIcon(issue.priority_level)}
                  <div>
                    <h4 className="font-semibold">{issue.issue_type}</h4>
                    <p className="text-sm text-gray-600">{issue.rental_properties?.address}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(issue.status)}>
                    {issue.status.replace('_', ' ')}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(issue.date_reported).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-3">{issue.description}</p>

              {issue.documentation?.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{issue.documentation.length} document(s) attached</span>
                </div>
              )}

              <div className="flex justify-end mt-3">
                <Button variant="outline" size="sm">
                  Update Status
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {issues.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Issues Reported</h3>
            <p className="text-gray-600 mb-4">
              Document maintenance issues to build a case for tenant organizing
            </p>
            <Button onClick={() => setShowReportForm(true)}>
              Report Your First Issue
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
