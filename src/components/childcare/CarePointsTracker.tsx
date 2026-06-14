
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, TrendingUp, Calendar, Award, Plus, Minus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type PointsTransaction = Tables<'care_points_transactions'>;

interface PointsStats {
  current_balance: number;
  points_earned: number;
  points_spent: number;
  recent_transactions: PointsTransaction[];
}

export const CarePointsTracker: React.FC = () => {
  const [stats, setStats] = useState<PointsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPointsData();
  }, []);

  const loadPointsData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get current balance from profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('care_points_balance')
        .eq('id', user.id)
        .single();

      // Get recent transactions
      const { data: transactions } = await supabase
        .from('care_points_transactions')
        .select('*')
        .eq('member_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (transactions) {
        const earned = transactions
          .filter(t => t.points_change > 0)
          .reduce((sum, t) => sum + t.points_change, 0);
        
        const spent = Math.abs(transactions
          .filter(t => t.points_change < 0)
          .reduce((sum, t) => sum + t.points_change, 0));

        setStats({
          current_balance: profile?.care_points_balance || 0,
          points_earned: earned,
          points_spent: spent,
          recent_transactions: transactions || [],
        });
      }
    } catch (error) {
      toast({
        title: "Error loading points",
        description: "Failed to load care points data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earned': return 'text-green-600';
      case 'spent': return 'text-red-600';
      case 'bonus': return 'text-blue-600';
      case 'penalty': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getTransactionIcon = (change: number) => {
    return change > 0 ? (
      <Plus className="w-4 h-4 text-green-600" />
    ) : (
      <Minus className="w-4 h-4 text-red-600" />
    );
  };

  if (loading) {
    return <div className="text-center py-8">Loading care points...</div>;
  }

  if (!stats) {
    return <div className="text-center py-8">No points data available.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.current_balance} points
            </div>
            <p className="text-sm text-gray-600">
              Equal to {stats.current_balance} hours of care
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Points Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.points_earned}
            </div>
            <p className="text-sm text-gray-600">
              From providing childcare
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              Points Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-2">
              {stats.points_spent}
            </div>
            <p className="text-sm text-gray-600">
              On receiving childcare
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Points System Explanation */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Award className="w-5 h-5" />
            How Care Points Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800">Earning Points:</h4>
              <ul className="space-y-1 text-blue-700">
                <li>• 1 point per hour of childcare provided</li>
                <li>• Bonus points for last-minute care</li>
                <li>• Extra points for special needs care</li>
                <li>• Community activity participation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800">Spending Points:</h4>
              <ul className="space-y-1 text-blue-700">
                <li>• 1 point per hour of care received</li>
                <li>• Emergency care requests cost more</li>
                <li>• Weekend/evening premium rates</li>
                <li>• Group activity participation fees</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your latest care points activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recent_transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No transactions yet. Start by providing or requesting childcare!
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recent_transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.points_change)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {Math.abs(transaction.points_change)} points
                        </span>
                        <Badge 
                          variant="outline" 
                          className={getTransactionColor(transaction.transaction_type)}
                        >
                          {transaction.transaction_type}
                        </Badge>
                      </div>
                      {transaction.description && (
                        <p className="text-sm text-gray-600">{transaction.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${getTransactionColor(transaction.transaction_type)}`}>
                      {transaction.points_change > 0 ? '+' : ''}{transaction.points_change}
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaction.created_at ? format(new Date(transaction.created_at), 'MMM d, h:mm a') : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Points Balance Alert */}
      {stats.current_balance < 5 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h3 className="font-semibold text-orange-900 mb-2">Low Points Balance</h3>
                <p className="text-sm text-orange-800 mb-3">
                  Your care points balance is running low. Consider providing childcare to earn more points 
                  or participate in community activities.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    Offer Care to Earn Points
                  </Badge>
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    Join Group Activities
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
