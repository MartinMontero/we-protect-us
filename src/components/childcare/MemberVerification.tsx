
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle, XCircle, Clock, FileText, Users, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VerificationStatus {
  verification_status: string;
  documents_submitted: boolean;
  references_verified: number;
  background_check_completed: boolean;
  skill_badges: number;
}

export const MemberVerification: React.FC = () => {
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadVerificationStatus();
  }, []);

  const loadVerificationStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get profile verification status
      const { data: profile } = await supabase
        .from('profiles')
        .select('verification_status')
        .eq('id', user.id)
        .single();

      // Get detailed verification info
      const { data: verification } = await supabase
        .from('member_verification')
        .select('*')
        .eq('member_id', user.id)
        .single();

      // Get skill badges count
      const { data: badges } = await supabase
        .from('member_skill_badges')
        .select('id')
        .eq('member_id', user.id);

      setStatus({
        verification_status: profile?.verification_status || 'pending',
        documents_submitted: verification?.documents_submitted || false,
        references_verified: verification?.references_verified || 0,
        background_check_completed: verification?.background_check_completed || false,
        skill_badges: badges?.length || 0,
      });
    } catch (error) {
      toast({
        title: "Error loading verification",
        description: "Failed to load verification status.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getVerificationProgress = () => {
    if (!status) return 0;
    let progress = 0;
    if (status.documents_submitted) progress += 25;
    if (status.references_verified >= 3) progress += 25;
    if (status.background_check_completed) progress += 25;
    if (status.skill_badges > 0) progress += 25;
    return progress;
  };

  const getStatusColor = (statusStr: string) => {
    switch (statusStr) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading verification status...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Verification Status
          </CardTitle>
          <CardDescription>
            Complete verification to access the full childcare cooperation system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Current Status:</span>
            <Badge className={getStatusColor(status?.verification_status || 'pending')}>
              {status?.verification_status?.replace('_', ' ').toUpperCase() || 'PENDING'}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Verification Progress</span>
              <span>{getVerificationProgress()}%</span>
            </div>
            <Progress value={getVerificationProgress()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5" />
              Documents
              {status?.documents_submitted ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Clock className="w-5 h-5 text-yellow-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Submit required identification and consent forms
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                {status?.documents_submitted ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400" />
                )}
                Government ID
              </li>
              <li className="flex items-center gap-2">
                {status?.documents_submitted ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400" />
                )}
                Liability Waiver
              </li>
            </ul>
            {!status?.documents_submitted && (
              <Button className="w-full mt-4" variant="outline">
                Upload Documents
              </Button>
            )}
          </CardContent>
        </Card>

        {/* References */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5" />
              References ({status?.references_verified || 0}/3)
              {(status?.references_verified || 0) >= 3 ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Clock className="w-5 h-5 text-yellow-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Provide 3 character references who can vouch for your childcare abilities
            </p>
            <div className="space-y-2">
              <Progress value={((status?.references_verified || 0) / 3) * 100} className="h-2" />
              <p className="text-xs text-gray-500">
                {status?.references_verified || 0} of 3 references verified
              </p>
            </div>
            {(status?.references_verified || 0) < 3 && (
              <Button className="w-full mt-4" variant="outline">
                Add References
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Background Check */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="w-5 h-5" />
              Background Check
              {status?.background_check_completed ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Clock className="w-5 h-5 text-yellow-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Complete a secure background check through our verified partner
            </p>
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-xs text-gray-600">
                • Criminal history check
                • Child abuse registry check
                • Identity verification
              </p>
            </div>
            {!status?.background_check_completed && (
              <Button className="w-full" variant="outline">
                Start Background Check
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Skill Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="w-5 h-5" />
              Skill Badges ({status?.skill_badges || 0})
              {(status?.skill_badges || 0) > 0 ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Clock className="w-5 h-5 text-yellow-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Earn badges to show your qualifications and build trust
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>CPR Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>First Aid</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Infant Care</span>
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Badges
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Need Help with Verification?</h3>
              <p className="text-sm text-blue-800 mb-3">
                Our verification process ensures the safety of all children in our community. 
                Contact support if you need assistance with any step.
              </p>
              <Button variant="outline" className="border-blue-300 text-blue-700">
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
