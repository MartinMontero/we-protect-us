
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Users, Activity, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  userGrowth: Array<{ date: string; users: number; newUsers: number }>;
  activityData: Array<{ name: string; value: number; color: string }>;
  timeBank: Array<{ date: string; hoursExchanged: number; totalHours: number }>;
  platformHealth: {
    activeUsers: number;
    totalPosts: number;
    completedTransactions: number;
  };
}

const chartConfig = {
  users: {
    label: "Total Users",
    color: "#3b82f6",
  },
  newUsers: {
    label: "New Users",
    color: "#10b981",
  },
  hoursExchanged: {
    label: "Hours Exchanged",
    color: "#f59e0b",
  },
  totalHours: {
    label: "Total Hours",
    color: "#8b5cf6",
  },
};

export const AnalyticsCharts: React.FC = () => {
  const [data, setData] = useState<AnalyticsData>({
    userGrowth: [],
    activityData: [],
    timeBank: [],
    platformHealth: {
      activeUsers: 0,
      totalPosts: 0,
      completedTransactions: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      // Fetch user growth data
      const { data: profiles } = await supabase
        .from('profiles')
        .select('created_at')
        .order('created_at', { ascending: true });

      // Fetch posts data
      const { data: posts } = await supabase
        .from('mutual_aid_posts')
        .select('category, created_at');

      // Fetch time bank transactions
      const { data: transactions } = await supabase
        .from('time_bank_transactions')
        .select('hours, created_at');

      // Process user growth data
      const userGrowthData = generateUserGrowthData(profiles || [], timeRange);
      
      // Process activity data by category instead of post_type
      const activityData = [
        { name: 'Food', value: posts?.filter(p => p.category === 'food').length || 0, color: '#3b82f6' },
        { name: 'Housing', value: posts?.filter(p => p.category === 'housing').length || 0, color: '#10b981' },
        { name: 'Transportation', value: posts?.filter(p => p.category === 'transportation').length || 0, color: '#f59e0b' },
        { name: 'Other', value: posts?.filter(p => !['food', 'housing', 'transportation'].includes(p.category)).length || 0, color: '#8b5cf6' },
      ];

      // Process time bank data
      const timeBankData = generateTimeBankData(transactions || [], timeRange);

      // Calculate platform health metrics
      const platformHealth = {
        activeUsers: profiles?.filter(p => {
          const createdAt = new Date(p.created_at);
          const daysAgo = new Date();
          daysAgo.setDate(daysAgo.getDate() - 30);
          return createdAt > daysAgo;
        }).length || 0,
        totalPosts: posts?.length || 0,
        completedTransactions: transactions?.length || 0,
      };

      setData({
        userGrowth: userGrowthData,
        activityData,
        timeBank: timeBankData,
        platformHealth,
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateUserGrowthData = (profiles: any[], range: string) => {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const data = [];
    let totalUsers = 0;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const newUsersOnDate = profiles.filter(p => {
        const createdDate = new Date(p.created_at).toISOString().split('T')[0];
        return createdDate === dateStr;
      }).length;
      
      totalUsers += newUsersOnDate;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        users: totalUsers,
        newUsers: newUsersOnDate,
      });
    }

    return data;
  };

  const generateTimeBankData = (transactions: any[], range: string) => {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const data = [];
    let totalHours = 0;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const hoursOnDate = transactions
        .filter(t => new Date(t.created_at).toISOString().split('T')[0] === dateStr)
        .reduce((sum, t) => sum + (t.hours || 0), 0);
      
      totalHours += hoursOnDate;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        hoursExchanged: hoursOnDate,
        totalHours,
      });
    }

    return data;
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
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-sm ${
                timeRange === range 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.platformHealth.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.platformHealth.totalPosts}</div>
            <p className="text-xs text-muted-foreground">All categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.platformHealth.completedTransactions}</div>
            <p className="text-xs text-muted-foreground">Time bank exchanges</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="newUsers"
                    stackId="2"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Activity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.activityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Time Bank Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Time Bank Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.timeBank}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="hoursExchanged"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="totalHours"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
