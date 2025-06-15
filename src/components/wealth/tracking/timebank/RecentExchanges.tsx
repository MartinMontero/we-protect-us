
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight } from 'lucide-react';

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
            <div key={transaction.id} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{transaction.from}</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="font-medium">{transaction.to}</span>
                </div>
                <Badge 
                  variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                >
                  {transaction.status}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{transaction.skill}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{transaction.hours} hours</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                {transaction.date}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
