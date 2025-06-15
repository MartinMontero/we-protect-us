
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  pendingReports: number;
  recentActivity: ActivityItem[];
}

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalPosts: 0,
    pendingReports: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch mutual aid posts
      const { count: totalPosts } = await supabase
        .from('mutual_aid_posts')
        .select('*', { count: 'exact', head: true });

      // Mock recent activity for now
      const recentActivity: ActivityItem[] = [
        {
          id: '1',
          type: 'user_signup',
          description: 'New user registered',
          timestamp: new Date().toISOString(),
          status: 'success'
        },
        {
          id: '2',
          type: 'post_created',
          description: 'New mutual aid post created',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'success'
        },
        {
          id: '3',
          type: 'system_alert',
          description: 'High server load detected',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: 'warning'
        }
      ];

      setStats({
        totalUsers: totalUsers || 0,
        activeUsers: Math.floor((totalUsers || 0) * 0.3), // Mock 30% active
        totalPosts: totalPosts || 0,
        pendingReports: 2, // Mock data
        recentActivity
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup':
        return <Users className="w-4 h-4" />;
      case 'post_created':
        return <Activity className="w-4 h-4" />;
      case 'system_alert':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to the Solidarity Web Weave admin panel. Monitor platform health and manage community resources.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReports}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {getStatusBadge(activity.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <h3 className="font-medium mb-2">User Management</h3>
              <p className="text-sm text-gray-600">View and manage user accounts</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <h3 className="font-medium mb-2">Content Moderation</h3>
              <p className="text-sm text-gray-600">Review flagged content and posts</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <h3 className="font-medium mb-2">System Health</h3>
              <p className="text-sm text-gray-600">Monitor platform performance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
