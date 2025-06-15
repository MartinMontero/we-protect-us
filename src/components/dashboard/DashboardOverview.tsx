
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WelcomeChecklist } from '@/components/onboarding/WelcomeChecklist';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Users, 
  AlertTriangle, 
  Calendar,
  MessageCircle,
  ArrowRight,
  Plus,
  TrendingUp
} from 'lucide-react';

const DashboardOverview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is new (you might want to store this in user profile)
  const isNewUser = true; // This would come from user data
  
  const quickActions = [
    {
      title: 'Post Mutual Aid Request',
      description: 'Share what you need or offer help',
      icon: Heart,
      action: () => navigate('/mutual-aid'),
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Join Defense Campaign',
      description: 'Get involved in community organizing',
      icon: Shield,
      action: () => navigate('/community-defense'),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Find Local Events',
      description: 'Connect with neighbors at events',
      icon: Calendar,
      action: () => navigate('/organizing'),
      color: 'bg-green-100 text-green-600'
    }
  ];

  const recentActivity = [
    {
      type: 'mutual-aid',
      title: 'New resource request in your area',
      time: '2 hours ago',
      urgent: false
    },
    {
      type: 'defense',
      title: 'Eviction defense action tomorrow',
      time: '4 hours ago',
      urgent: true
    },
    {
      type: 'event',
      title: 'Community meeting this weekend',
      time: '1 day ago',
      urgent: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.user_metadata?.pseudonym || 'Comrade'}!
        </h1>
        <p className="text-gray-600">
          Your community organizing dashboard. Stay connected, build power, protect each other.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* New User Checklist */}
          {isNewUser && (
            <WelcomeChecklist />
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Card 
                      key={index}
                      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={action.action}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${action.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {action.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {action.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Community Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === 'mutual-aid' && <Heart className="w-5 h-5 text-red-600" />}
                      {activity.type === 'defense' && <Shield className="w-5 h-5 text-blue-600" />}
                      {activity.type === 'event' && <Calendar className="w-5 h-5 text-green-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                    {activity.urgent && (
                      <Badge variant="destructive" className="flex-shrink-0">
                        Urgent
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Community Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">12</div>
                <p className="text-sm text-gray-600">People helped</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <p className="text-sm text-gray-600">Active campaigns</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">8</div>
                <p className="text-sm text-gray-600">Events attended</p>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Alerts */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="w-5 h-5" />
                Emergency Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-orange-700 mb-3">
                No active emergency alerts in your area.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-orange-300 text-orange-700"
                onClick={() => navigate('/disaster-preparedness')}
              >
                View Preparedness Resources
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
