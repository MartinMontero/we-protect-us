
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Thermometer, Droplets, Sprout, Clock } from 'lucide-react';
import { addDays, format, startOfYear } from 'date-fns';

const HARDINESS_ZONE = '9b'; // San Francisco area

const CROP_CALENDAR = {
  spring: [
    { name: 'Lettuce', plantWeeks: [8, 10, 12], daysToMaturity: 45, companion: ['Carrots', 'Radishes'] },
    { name: 'Peas', plantWeeks: [6, 8, 10], daysToMaturity: 60, companion: ['Carrots', 'Lettuce'] },
    { name: 'Carrots', plantWeeks: [8, 10, 12, 14], daysToMaturity: 70, companion: ['Peas', 'Lettuce'] },
    { name: 'Radishes', plantWeeks: [8, 10, 12, 14, 16], daysToMaturity: 30, companion: ['Carrots'] },
    { name: 'Spinach', plantWeeks: [6, 8, 10, 12], daysToMaturity: 40, companion: ['Lettuce'] },
  ],
  summer: [
    { name: 'Tomatoes', plantWeeks: [16, 18], daysToMaturity: 80, companion: ['Basil', 'Peppers'] },
    { name: 'Peppers', plantWeeks: [16, 18, 20], daysToMaturity: 70, companion: ['Tomatoes', 'Basil'] },
    { name: 'Basil', plantWeeks: [16, 18, 20, 22], daysToMaturity: 60, companion: ['Tomatoes'] },
    { name: 'Squash', plantWeeks: [18, 20, 22], daysToMaturity: 50, companion: ['Beans'] },
    { name: 'Beans', plantWeeks: [16, 18, 20, 22], daysToMaturity: 55, companion: ['Squash', 'Corn'] },
  ],
  fall: [
    { name: 'Kale', plantWeeks: [28, 30, 32], daysToMaturity: 55, companion: ['Brussels Sprouts'] },
    { name: 'Brussels Sprouts', plantWeeks: [24, 26], daysToMaturity: 90, companion: ['Kale'] },
    { name: 'Broccoli', plantWeeks: [26, 28, 30], daysToMaturity: 70, companion: ['Cabbage'] },
    { name: 'Cabbage', plantWeeks: [26, 28], daysToMaturity: 75, companion: ['Broccoli'] },
    { name: 'Beets', plantWeeks: [28, 30, 32, 34], daysToMaturity: 55, companion: ['Carrots'] },
  ],
  winter: [
    { name: 'Garlic', plantWeeks: [42, 44], daysToMaturity: 240, companion: ['Roses'] },
    { name: 'Onions', plantWeeks: [4, 6, 44, 46], daysToMaturity: 120, companion: ['Carrots'] },
    { name: 'Fava Beans', plantWeeks: [44, 46, 48], daysToMaturity: 90, companion: ['Peas'] },
  ]
};

export const SeasonalPlanning: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState('spring');
  const currentDate = new Date();
  const currentWeek = Math.floor((currentDate.getTime() - startOfYear(currentDate).getTime()) / (7 * 24 * 60 * 60 * 1000));

  const getSeasonFromWeek = (week: number) => {
    if (week >= 6 && week <= 18) return 'spring';
    if (week >= 19 && week <= 35) return 'summer';
    if (week >= 36 && week <= 48) return 'fall';
    return 'winter';
  };

  const currentSeason = getSeasonFromWeek(currentWeek);

  const isPlantingTime = (plantWeeks: number[]) => {
    return plantWeeks.some(week => Math.abs(week - currentWeek) <= 1);
  };

  const getWeekDate = (weekNumber: number) => {
    return format(addDays(startOfYear(currentDate), weekNumber * 7), 'MMM d');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Seasonal Planning</h2>
        <p className="text-gray-600">
          Hardiness Zone {HARDINESS_ZONE} • Week {currentWeek} ({currentSeason})
        </p>
      </div>

      <Tabs value={selectedSeason} onValueChange={setSelectedSeason} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="spring" className="flex items-center gap-2">
            <Sprout className="w-4 h-4" />
            Spring
          </TabsTrigger>
          <TabsTrigger value="summer" className="flex items-center gap-2">
            <Thermometer className="w-4 h-4" />
            Summer
          </TabsTrigger>
          <TabsTrigger value="fall" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Fall
          </TabsTrigger>
          <TabsTrigger value="winter" className="flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            Winter
          </TabsTrigger>
        </TabsList>

        {Object.entries(CROP_CALENDAR).map(([season, crops]) => (
          <TabsContent key={season} value={season}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((crop, index) => (
                <Card key={index} className={`${
                  isPlantingTime(crop.plantWeeks) ? 'ring-2 ring-green-500 ring-offset-2' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{crop.name}</CardTitle>
                      {isPlantingTime(crop.plantWeeks) && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          Plant Now!
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      {crop.daysToMaturity} days to maturity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Planting Windows
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {crop.plantWeeks.map((week, idx) => (
                          <Badge 
                            key={idx} 
                            variant={Math.abs(week - currentWeek) <= 1 ? 'default' : 'outline'}
                            className="text-xs"
                          >
                            Week {week} ({getWeekDate(week)})
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center gap-2">
                        <Sprout className="w-4 h-4" />
                        Companion Plants
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {crop.companion.map((companion, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {companion}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Harvest in {crop.daysToMaturity} days</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Current Week Recommendations */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-lg text-green-800">This Week's Recommendations</CardTitle>
          <CardDescription className="text-green-700">
            Based on Week {currentWeek} in Hardiness Zone {HARDINESS_ZONE}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(CROP_CALENDAR).map(([season, crops]) =>
              crops
                .filter(crop => isPlantingTime(crop.plantWeeks))
                .map((crop, index) => (
                  <div key={`${season}-${index}`} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                    <div>
                      <p className="font-medium text-green-800">{crop.name}</p>
                      <p className="text-sm text-green-600">
                        Perfect time to plant • Ready in {crop.daysToMaturity} days
                      </p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Plan Planting
                    </Button>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
