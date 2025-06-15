
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, AlertTriangle, Users, RefreshCw } from 'lucide-react';

interface Insight {
  id: string;
  type: 'trend' | 'anomaly' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  action?: string;
}

export const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = async () => {
    setLoading(true);
    
    // Simulate AI-generated insights based on platform data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const sampleInsights: Insight[] = [
      {
        id: '1',
        type: 'trend',
        title: 'Increasing Mutual Aid Requests',
        description: 'Food assistance requests have increased by 34% this week compared to last week, particularly in the downtown area.',
        confidence: 87,
        impact: 'high',
        action: 'Consider mobilizing additional food distribution volunteers for downtown area',
      },
      {
        id: '2',
        type: 'anomaly',
        title: 'Unusual Time Bank Activity',
        description: 'Time bank transactions show an unusual spike in childcare hours during weekday mornings.',
        confidence: 92,
        impact: 'medium',
        action: 'Investigate if this indicates a community need or opportunity',
      },
      {
        id: '3',
        type: 'recommendation',
        title: 'Optimize Volunteer Matching',
        description: 'AI analysis suggests 15% better volunteer-need matching could be achieved by considering skill proximity and availability patterns.',
        confidence: 78,
        impact: 'medium',
        action: 'Implement enhanced matching algorithm',
      },
      {
        id: '4',
        type: 'prediction',
        title: 'Resource Shortage Prediction',
        description: 'Based on current trends, the community may face a shortage of transportation assistance next month.',
        confidence: 73,
        impact: 'high',
        action: 'Start recruiting transportation volunteers now',
      },
    ];

    setInsights(sampleInsights);
    setLoading(false);
  };

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'trend': return <TrendingUp className="w-4 h-4" />;
      case 'anomaly': return <AlertTriangle className="w-4 h-4" />;
      case 'recommendation': return <Brain className="w-4 h-4" />;
      case 'prediction': return <Users className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Insight['type']) => {
    switch (type) {
      case 'trend': return 'bg-blue-100 text-blue-800';
      case 'anomaly': return 'bg-yellow-100 text-yellow-800';
      case 'recommendation': return 'bg-green-100 text-green-800';
      case 'prediction': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: Insight['impact']) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Insights & Recommendations
          </CardTitle>
          <Button
            variant="outline"
            onClick={generateInsights}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <Badge className={getTypeColor(insight.type)}>
                          {insight.type}
                        </Badge>
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{insight.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Confidence: {insight.confidence}%
                        </div>
                        {insight.action && (
                          <Button size="sm" variant="outline">
                            Take Action
                          </Button>
                        )}
                      </div>
                      
                      {insight.action && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                          <strong>Recommended Action:</strong> {insight.action}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
