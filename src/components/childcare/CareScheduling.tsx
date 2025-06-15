
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, AlertTriangle, Plus } from 'lucide-react';
import { CreateCareRequestDialog } from './CreateCareRequestDialog';
import { CareRequestsList } from './CareRequestsList';
import { MyCareSessionsDialog } from './MyCareSessionsDialog';

export const CareScheduling: React.FC = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showSessionsDialog, setShowSessionsDialog] = useState(false);

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" />
              Request Care
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Schedule childcare with trusted community members
            </p>
            <Button 
              onClick={() => setShowCreateDialog(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Create Request
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              My Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              View your upcoming care sessions
            </p>
            <Button 
              onClick={() => setShowSessionsDialog(true)}
              variant="outline" 
              className="w-full border-blue-200"
            >
              View Sessions
            </Button>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Last Minute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Urgent care requests (within 4 hours)
            </p>
            <Button variant="outline" className="w-full border-orange-200">
              View Urgent
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Care Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Available Care Requests</CardTitle>
          <CardDescription>
            Help community members by offering childcare services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CareRequestsList />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateCareRequestDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
      <MyCareSessionsDialog 
        open={showSessionsDialog} 
        onOpenChange={setShowSessionsDialog} 
      />
    </div>
  );
};
