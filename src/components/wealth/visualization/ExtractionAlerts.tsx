
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  ExternalLink,
  Eye,
  Target,
  Bell
} from 'lucide-react';

export const ExtractionAlerts: React.FC = () => {
  const [alertLevel, setAlertLevel] = useState<'all' | 'critical' | 'moderate'>('all');

  const extractionAlerts = [
    {
      id: '1',
      type: 'rent_extraction',
      severity: 'critical' as const,
      title: 'Rent Increases Accelerating',
      description: 'Average rent increased 12% this quarter, extracting $45K more monthly from community',
      impact: 'high',
      affectedFamilies: 78,
      suggestedActions: [
        'Organize tenant union',
        'Support community land trust',
        'Advocate for rent control'
      ],
      trend: 'worsening'
    },
    {
      id: '2',
      type: 'corporate_consolidation',
      severity: 'moderate' as const,
      title: 'Local Business Buyouts',
      description: 'Chain stores replacing 3 local businesses, reducing local ownership by 8%',
      impact: 'medium',
      affectedFamilies: 23,
      suggestedActions: [
        'Support existing local businesses',
        'Create cooperative alternatives',
        'Implement local procurement policy'
      ],
      trend: 'stable'
    },
    {
      id: '3',
      type: 'financial_extraction',
      severity: 'moderate' as const,
      title: 'Banking Fee Increases',
      description: 'Major bank raised fees, extracting additional $12K annually from community',
      impact: 'medium',
      affectedFamilies: 156,
      suggestedActions: [
        'Switch to credit union',
        'Promote community banking',
        'Financial literacy workshops'
      ],
      trend: 'improving'
    },
    {
      id: '4',
      type: 'wage_stagnation',
      severity: 'critical' as const,
      title: 'Wage Gap Widening',
      description: 'Local wages 15% below living wage, while housing costs rise faster than income',
      impact: 'high',
      affectedFamilies: 234,
      suggestedActions: [
        'Living wage campaign',
        'Worker cooperative development',
        'Skills training programs'
      ],
      trend: 'worsening'
    }
  ];

  const preventionStrategies = [
    {
      category: 'Community Ownership',
      strategies: [
        'Community land trusts',
        'Worker cooperatives',
        'Community-owned retail',
        'Resident-owned utilities'
      ],
      effectiveness: 85
    },
    {
      category: 'Local Finance',
      strategies: [
        'Community development banks',
        'Local investment funds',
        'Crowdfunding platforms',
        'Time banking systems'
      ],
      effectiveness: 78
    },
    {
      category: 'Policy Advocacy',
      strategies: [
        'Local procurement policies',
        'Anti-displacement ordinances',
        'Community benefit agreements',
        'Progressive taxation'
      ],
      effectiveness: 72
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'worsening': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'improving': return <Shield className="w-4 h-4 text-green-600" />;
      default: return <Eye className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredAlerts = alertLevel === 'all' 
    ? extractionAlerts 
    : extractionAlerts.filter(alert => alert.severity === alertLevel);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Extraction Prevention Alerts
          </CardTitle>
          <div className="flex gap-2">
            {(['all', 'critical', 'moderate'] as const).map((level) => (
              <Button
                key={level}
                size="sm"
                variant={alertLevel === level ? 'default' : 'outline'}
                onClick={() => setAlertLevel(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Active Alerts */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Active Alerts
            </h4>
            {filteredAlerts.map((alert) => (
              <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getTrendIcon(alert.trend)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{alert.title}</h5>
                      <Badge variant="outline" className="text-xs">
                        {alert.affectedFamilies} families
                      </Badge>
                    </div>
                    <AlertDescription className="text-sm mb-3">
                      {alert.description}
                    </AlertDescription>
                    <div className="space-y-2">
                      <div className="text-xs font-medium">Suggested Actions:</div>
                      {alert.suggestedActions.map((action, index) => (
                        <div key={index} className="text-xs bg-white/50 px-2 py-1 rounded flex items-center gap-2">
                          <Target className="w-3 h-3" />
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Alert>
            ))}
          </div>

          {/* Prevention Strategies */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              Prevention Strategies
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {preventionStrategies.map((category, index) => (
                <Card key={index} className="p-4">
                  <div className="mb-3">
                    <h5 className="font-medium">{category.category}</h5>
                    <div className="text-sm text-gray-600">
                      {category.effectiveness}% effective
                    </div>
                  </div>
                  <div className="space-y-2">
                    {category.strategies.map((strategy, strategyIndex) => (
                      <div key={strategyIndex} className="text-sm p-2 bg-gray-50 rounded flex items-center justify-between">
                        <span>{strategy}</span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3">
                    Learn More
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Summary Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">4</div>
              <div className="text-sm text-gray-600">Active Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">$102K</div>
              <div className="text-sm text-gray-600">Monthly Extraction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">491</div>
              <div className="text-sm text-gray-600">Families Affected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600">Active Responses</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
