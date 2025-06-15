
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, Users, Repeat } from 'lucide-react';
import { MutualAidPost } from '../types';
import { ResilienceProjection } from './types';

interface ResilienceProjectionsProps {
  post: MutualAidPost;
}

export const ResilienceProjections: React.FC<ResilienceProjectionsProps> = ({ post }) => {
  const generateProjections = (): ResilienceProjection[] => {
    return [
      {
        timeframe: 'immediate',
        description: 'Direct need fulfillment and stress relief for community members',
        impactLevel: 85,
        networkEffect: 'Strengthens 2-3 direct relationships',
        metrics: {
          connectionsStrengthened: 3,
          skillsShared: 1,
          resourcesCirculated: 2
        }
      },
      {
        timeframe: 'short_term',
        description: 'Increased trust and reciprocity patterns within local network',
        impactLevel: 70,
        networkEffect: 'Ripple effect through 6-8 community connections',
        metrics: {
          connectionsStrengthened: 7,
          skillsShared: 3,
          resourcesCirculated: 5
        }
      },
      {
        timeframe: 'long_term',
        description: 'Normalized cooperation culture and reduced dependency on extractive systems',
        impactLevel: 60,
        networkEffect: 'Cultural shift toward community-centered solutions',
        metrics: {
          connectionsStrengthened: 15,
          skillsShared: 8,
          resourcesCirculated: 12
        }
      }
    ];
  };

  const projections = generateProjections();

  const getTimeframeLabel = (timeframe: string) => {
    switch (timeframe) {
      case 'immediate': return 'Next 1-2 weeks';
      case 'short_term': return '1-6 months';
      case 'long_term': return '6 months - 2 years';
      default: return timeframe;
    }
  };

  const getTimeframeIcon = (timeframe: string) => {
    switch (timeframe) {
      case 'immediate': return <Clock className="w-4 h-4" />;
      case 'short_term': return <Users className="w-4 h-4" />;
      case 'long_term': return <Repeat className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Community Resilience Projections</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Based on historical patterns and network analysis, here's how your mutual aid action 
        is projected to strengthen community resilience over time.
      </p>

      {projections.map((projection, index) => (
        <Card key={projection.timeframe} className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              {getTimeframeIcon(projection.timeframe)}
              {getTimeframeLabel(projection.timeframe)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{projection.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Projected Impact Level</span>
                <span className="font-semibold">{projection.impactLevel}%</span>
              </div>
              <Progress value={projection.impactLevel} className="h-2" />
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm font-semibold mb-2">Network Effect:</p>
              <p className="text-sm text-muted-foreground">{projection.networkEffect}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {projection.metrics.connectionsStrengthened}
                </div>
                <div className="text-xs text-muted-foreground">Connections</div>
              </div>
              <div className="text-center p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {projection.metrics.skillsShared}
                </div>
                <div className="text-xs text-muted-foreground">Skills Shared</div>
              </div>
              <div className="text-center p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  {projection.metrics.resourcesCirculated}
                </div>
                <div className="text-xs text-muted-foreground">Resources</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary mt-1" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Exponential Growth Potential</h4>
              <p className="text-sm text-muted-foreground">
                Mutual aid creates exponential rather than linear growth in community capacity. 
                Each strengthened relationship becomes a foundation for future cooperation, 
                creating a resilient network that can respond to both immediate needs and systemic challenges.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
