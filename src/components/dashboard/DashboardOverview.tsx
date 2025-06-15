
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Shield, 
  Users, 
  AlertTriangle, 
  Apple, 
  Zap, 
  ArrowRight,
  Clock,
  CheckCircle,
  MapPin,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardCard {
  title: string;
  icon: React.ElementType;
  path: string;
  status: 'active' | 'urgent' | 'normal';
  stats?: {
    label: string;
    value: number;
    total?: number;
  };
  recentActivity?: string;
  color: string;
}

const DashboardOverview = () => {
  const dashboardCards: DashboardCard[] = [
    {
      title: 'Emergency Preparedness',
      icon: AlertTriangle,
      path: '/disaster-preparedness',
      status: 'urgent',
      stats: { label: 'Active Alerts', value: 2 },
      recentActivity: 'Weather warning issued 2 hours ago',
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'Mutual Aid Network',
      icon: Heart,
      path: '/mutual-aid',
      status: 'active',
      stats: { label: 'Open Requests', value: 12, total: 45 },
      recentActivity: 'New help request posted 30 min ago',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Food Security',
      icon: Apple,
      path: '/food-security',
      status: 'normal',
      stats: { label: 'Food Assets', value: 8 },
      recentActivity: 'Community garden harvest ready',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Community Defense',
      icon: Shield,
      path: '/community-defense',
      status: 'normal',
      stats: { label: 'Active Campaigns', value: 3 },
      recentActivity: 'Tenant meeting scheduled for Friday',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Energy Democracy',
      icon: Zap,
      path: '/energy-democracy',
      status: 'normal',
      stats: { label: 'Solar Projects', value: 5 },
      recentActivity: 'New solar installation completed',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Tool Library',
      icon: Users,
      path: '/tool-library',
      status: 'active',
      stats: { label: 'Available Tools', value: 24, total: 30 },
      recentActivity: 'Drill returned by Maria S.',
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Community Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor and coordinate mutual aid, community defense, and solidarity efforts
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-2xl font-bold">234</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Requests Fulfilled</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-2xl font-bold">2.3h</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Trust Network</p>
                <p className="text-2xl font-bold">89%</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${card.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className={getStatusColor(card.status)}>
                    {card.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-red-600 transition-colors">
                  {card.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {card.stats && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{card.stats.label}</span>
                      <span className="font-bold">
                        {card.stats.value}
                        {card.stats.total && `/${card.stats.total}`}
                      </span>
                    </div>
                    {card.stats.total && (
                      <Progress 
                        value={(card.stats.value / card.stats.total) * 100} 
                        className="h-2"
                      />
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{card.recentActivity}</span>
                </div>
                
                <Button asChild className="w-full group-hover:bg-red-600 transition-colors">
                  <Link to={card.path} className="flex items-center justify-center gap-2">
                    View Platform
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Recent Community Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Heart className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-medium">New mutual aid request</p>
                <p className="text-sm text-gray-600">
                  Community member needs help with groceries - Mission District
                </p>
                <p className="text-xs text-gray-500 mt-1">30 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <p className="font-medium">Weather alert issued</p>
                <p className="text-sm text-gray-600">
                  High wind warning for Bay Area - check emergency supplies
                </p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Apple className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium">Community harvest ready</p>
                <p className="text-sm text-gray-600">
                  Tomatoes and squash available at 24th Street Garden
                </p>
                <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
