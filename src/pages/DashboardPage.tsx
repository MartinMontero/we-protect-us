
import React from 'react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import CommunityChat from '@/components/messaging/CommunityChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Bell } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Dashboard */}
        <div className="lg:col-span-3">
          <DashboardOverview />
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <NotificationCenter />
          
          {/* Quick Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Community Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CommunityChat />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
