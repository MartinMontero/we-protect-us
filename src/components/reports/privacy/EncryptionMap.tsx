
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Key, CheckCircle } from 'lucide-react';

interface EncryptionItem {
  component: string;
  encryption: string;
  keyManagement: string;
  status: string;
}

interface EncryptionMapProps {
  items: EncryptionItem[];
}

export const EncryptionMap: React.FC<EncryptionMapProps> = ({ items }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Encryption Implementation Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Component</th>
                <th className="text-left p-3">Encryption Method</th>
                <th className="text-left p-3">Key Management</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 font-medium">{item.component}</td>
                  <td className="p-3">
                    <Badge variant="outline" className="gap-1">
                      <Key className="w-3 h-3" />
                      {item.encryption}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{item.keyManagement}</td>
                  <td className="p-3">
                    <Badge variant="default" className="gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Active
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
