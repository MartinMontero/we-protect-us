
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Droplets, Sun, Mountain, User, Sprout } from 'lucide-react';
import { format } from 'date-fns';

interface PlotDetailsDialogProps {
  plot: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PlotDetailsDialog: React.FC<PlotDetailsDialogProps> = ({
  plot,
  open,
  onOpenChange
}) => {
  if (!plot) return null;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'assigned': return 'secondary';
      case 'reserved': return 'outline';
      case 'maintenance': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Plot {plot.plot_number}
            <Badge variant={getStatusBadgeVariant(plot.status)}>
              {plot.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Plot Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Size:</strong> {plot.size_sqft} sq ft
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">
                    <strong>Sun:</strong> {plot.sun_exposure.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-amber-600" />
                  <span className="text-sm">
                    <strong>Soil:</strong> {plot.soil_type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">
                    <strong>Water:</strong> {plot.water_access ? 'Available' : 'Not available'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant={plot.raised_bed ? 'default' : 'secondary'}>
                  {plot.raised_bed ? 'Raised Bed' : 'Ground Level'}
                </Badge>
              </div>

              {plot.notes && (
                <div>
                  <strong className="text-sm">Notes:</strong>
                  <p className="text-sm text-gray-600 mt-1">{plot.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Current Gardener */}
          {plot.current_gardener && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Current Gardener
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{plot.current_gardener.pseudonym}</span>
                  {plot.assigned_date && (
                    <span className="text-sm text-gray-500">
                      Since {format(new Date(plot.assigned_date), 'MMM d, yyyy')}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Current Plantings */}
          {plot.current_plantings && plot.current_plantings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sprout className="w-5 h-5" />
                  Current Plantings
                </CardTitle>
                <CardDescription>
                  What's currently growing in this plot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plot.current_plantings.map((planting: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{planting.crop_name}</p>
                        {planting.variety && (
                          <p className="text-sm text-gray-600">Variety: {planting.variety}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Planted {format(new Date(planting.planted_date), 'MMM d')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
