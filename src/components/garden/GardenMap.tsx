
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlotDetailsDialog } from './PlotDetailsDialog';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface GardenPlot {
  id: string;
  plot_number: string;
  size_sqft: number;
  sun_exposure: string;
  soil_type: string;
  status: string;
  current_gardener_id: string | null;
  assigned_date: string | null;
  coordinates: any;
  notes: string | null;
  water_access: boolean;
  raised_bed: boolean;
  current_gardener?: {
    pseudonym: string;
  };
  current_plantings?: Array<{
    crop_name: string;
    variety: string | null;
    planted_date: string;
  }>;
}

export const GardenMap: React.FC = () => {
  const [selectedPlot, setSelectedPlot] = useState<GardenPlot | null>(null);
  const [showPlotDialog, setShowPlotDialog] = useState(false);

  const { data: plots, isLoading } = useQuery({
    queryKey: ['garden-plots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('garden_plots')
        .select(`
          *,
          current_gardener:profiles(pseudonym),
          current_plantings(crop_name, variety, planted_date)
        `);
      if (error) throw error;
      return data as GardenPlot[];
    }
  });

  const getPlotColor = (status: string) => {
    switch (status) {
      case 'available': return '#22c55e'; // green
      case 'assigned': return '#3b82f6'; // blue
      case 'reserved': return '#f59e0b'; // amber
      case 'maintenance': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'assigned': return 'secondary';
      case 'reserved': return 'outline';
      case 'maintenance': return 'destructive';
      default: return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading garden map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <h3 className="font-semibold text-gray-900">Plot Status:</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Assigned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded"></div>
                <span className="text-sm">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Maintenance</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <div className="h-96 rounded-lg overflow-hidden border">
        <MapContainer
          center={[37.7749, -122.4194]}
          zoom={18}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {plots?.map((plot) => {
            if (!plot.coordinates) return null;
            
            const coordinates = plot.coordinates.coordinates[0].map((coord: number[]) => [coord[1], coord[0]]);
            
            return (
              <Polygon
                key={plot.id}
                positions={coordinates}
                pathOptions={{
                  color: getPlotColor(plot.status),
                  fillColor: getPlotColor(plot.status),
                  fillOpacity: 0.6,
                  weight: 2
                }}
                eventHandlers={{
                  click: () => {
                    setSelectedPlot(plot);
                    setShowPlotDialog(true);
                  }
                }}
              >
                <Popup>
                  <div className="p-2 min-w-48">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Plot {plot.plot_number}</h4>
                      <Badge variant={getStatusBadgeVariant(plot.status)}>
                        {plot.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><strong>Size:</strong> {plot.size_sqft} sq ft</p>
                      <p><strong>Sun:</strong> {plot.sun_exposure.replace('_', ' ')}</p>
                      <p><strong>Soil:</strong> {plot.soil_type}</p>
                      {plot.current_gardener && (
                        <p><strong>Gardener:</strong> {plot.current_gardener.pseudonym}</p>
                      )}
                      {plot.current_plantings && plot.current_plantings.length > 0 && (
                        <div>
                          <strong>Growing:</strong>
                          <ul className="ml-2">
                            {plot.current_plantings.slice(0, 3).map((planting, idx) => (
                              <li key={idx} className="text-xs">
                                • {planting.crop_name} {planting.variety && `(${planting.variety})`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => {
                        setSelectedPlot(plot);
                        setShowPlotDialog(true);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </Popup>
              </Polygon>
            );
          })}
        </MapContainer>
      </div>

      {/* Plot Details Dialog */}
      <PlotDetailsDialog 
        plot={selectedPlot}
        open={showPlotDialog}
        onOpenChange={setShowPlotDialog}
      />
    </div>
  );
};
