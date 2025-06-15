
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface Transaction {
  id: string;
  from: string;
  to: string;
  skill: string;
  hours: number;
  date: string;
  status: string;
}

interface RecentExchangesProps {
  transactions: Transaction[];
}

export const RecentExchanges: React.FC<RecentExchangesProps> = ({ transactions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Exchanges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{transaction.skill}</span>
                  {transaction.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <div className="text-xs text-gray-600">
                  {transaction.from} → {transaction.to}
                </div>
                <div className="text-xs text-gray-500">
                  {transaction.hours} hours • {transaction.date}
                </div>
              </div>
              <Badge 
                variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {transaction.status === 'completed' ? 'Complete' : 'In Progress'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
