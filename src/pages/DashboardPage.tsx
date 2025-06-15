
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Heart,
  ChevronRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const dashboardMetrics = [
  {
    title: 'Community Health',
    value: '94%',
    change: '+2%',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Privacy Score',
    value: '98%',
    change: '+1%',
    icon: Shield,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Accessibility',
    value: '96%',
    change: 'Stable',
    icon: Heart,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Growth Rate',
    value: '23%',
    change: '+5%',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
];

const recentActivity = [
  {
    title: 'Privacy Policy Updated',
    description: 'New data retention policies implemented',
    time: '2 hours ago',
    status: 'completed'
  },
  {
    title: 'Accessibility Audit',
    description: 'WCAG 2.1 AA compliance verified',
    time: '1 day ago',
    status: 'completed'
  },
  {
    title: 'Community Vote',
    description: 'New feature proposal under review',
    time: '2 days ago',
    status: 'pending'
  }
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-slate-600">
            Here's what's happening with your community today.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <Icon className={`w-5 h-5 ${metric.color}`} />
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      {metric.change}
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-slate-600">
                      {metric.title}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Community Progress Overview
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate('/reports')}
                  >
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">Democratic Governance</span>
                    <span className="text-slate-600">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">Privacy Architecture</span>
                    <span className="text-slate-600">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">Accessibility Compliance</span>
                    <span className="text-slate-600">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">Community Engagement</span>
                    <span className="text-slate-600">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                      <div className="flex-shrink-0 mt-1">
                        {activity.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 mb-1">
                          {activity.title}
                        </p>
                        <p className="text-xs text-slate-600 mb-2">
                          {activity.description}
                        </p>
                        <p className="text-xs text-slate-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200"
                  onClick={() => navigate('/reports')}
                >
                  <Shield className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium">Run Privacy Audit</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-200 transition-colors duration-200"
                  onClick={() => navigate('/reports')}
                >
                  <Heart className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-medium">Check Accessibility</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-200 transition-colors duration-200"
                  onClick={() => navigate('/reports')}
                >
                  <Users className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium">Community Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
