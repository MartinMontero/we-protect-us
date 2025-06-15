
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface ToolMapProps {
  filters: any;
}

export const ToolMap: React.FC<ToolMapProps> = ({ filters }) => {
  return (
    <Card className="h-96">
      <CardContent className="p-6 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Map View Coming Soon</h3>
          <p>Interactive map showing tool locations will be available here.</p>
        </div>
      </CardContent>
    </Card>
  );
};
