
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  Shield, 
  BarChart3, 
  ArrowRight,
  Map,
  DollarSign,
  AlertTriangle,
  Handshake
} from 'lucide-react';

const quickActions = [
  {
    title: 'Find Mutual Aid',
    description: 'Connect with neighbors offering and requesting support',
    icon: Heart,
    path: '/mutual-aid',
    color: 'from-pink-500 to-red-500'
  },
  {
    title: 'Security Training',
    description: 'Learn surveillance detection and community defense',
    icon: Shield,
    path: '/security-governance',
    color: 'from-red-500 to-orange-500'
  },
  {
    title: 'Community Wealth',
    description: 'Track solidarity economy and resource sharing',
    icon: DollarSign,
    path: '/community-wealth',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Democratic Organizing',
    description: 'Participate in transparent community governance',
    icon: Users,
    path: '/organizing',
    color: 'from-blue-500 to-purple-500'
  }
];

const recentActivity = [
  { type: 'mutual-aid', message: '15 new mutual aid requests in your area', time: '2 hours ago' },
  { type: 'security', message: 'Security training session scheduled for tomorrow', time: '4 hours ago' },
  { type: 'governance', message: 'New community proposal: Neighborhood Garden Project', time: '6 hours ago' },
  { type: 'economy', message: 'Local time bank exchange completed', time: '1 day ago' }
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Dashboard</h1>
          <p className="text-xl text-gray-600">Your hub for mutual aid, organizing, and community power building</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${action.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Recent Community Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>

          {/* Community Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Your Community Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Active Mutual Aid</span>
                  </div>
                  <span className="text-green-600 font-semibold">23 requests</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Security Training</span>
                  </div>
                  <span className="text-blue-600 font-semibold">Next: Tomorrow</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Handshake className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Active Proposals</span>
                  </div>
                  <span className="text-purple-600 font-semibold">4 voting</span>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/reports')}
                className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-600 text-white"
              >
                View Full Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
