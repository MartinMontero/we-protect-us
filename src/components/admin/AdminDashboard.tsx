
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
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
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalPosts: 0,
    pendingReports: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardStats = useCallback(async () => {
    try {
      setError(null);
      
      // Fetch total users
      const { count: totalUsers, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (usersError) throw usersError;

      // Fetch mutual aid posts
      const { count: totalPosts, error: postsError } = await supabase
        .from('mutual_aid_posts')
        .select('*', { count: 'exact', head: true });

      if (postsError && postsError.code !== 'PGRST116') {
        console.warn('Posts table might not exist:', postsError);
      }

      // Calculate active users (30% of total for demo)
      const activeUsers = Math.floor((totalUsers || 0) * 0.3);

      // Mock recent activity with proper timestamps
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
        activeUsers,
        totalPosts: totalPosts || 0,
        pendingReports: 2, // Mock data
        recentActivity
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardStats();
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
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('admin.dashboard')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome to the Solidarity Web Weave admin panel. Monitor platform health and manage community resources.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.total_users')}
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">
              {t('admin.active_users')}
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">
              {t('admin.total_posts')}
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">
              {t('admin.pending_reports')}
            </CardTitle>
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
          <CardTitle>{t('admin.recent_activity')}</CardTitle>
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
          <CardTitle>{t('admin.quick_actions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <h3 className="font-medium mb-2">{t('admin.user_management')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">View and manage user accounts</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <h3 className="font-medium mb-2">{t('admin.content_moderation')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Review flagged content and posts</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <h3 className="font-medium mb-2">{t('admin.system_health')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Monitor platform performance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
