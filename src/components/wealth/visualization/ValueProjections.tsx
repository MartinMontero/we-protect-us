
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  Building,
  Leaf,
  Heart,
  Target
} from 'lucide-react';

export const ValueProjections: React.FC = () => {
  const [timeHorizon, setTimeHorizon] = useState<'1year' | '5year' | '10year' | '20year'>('5year');

  const projectionScenarios = {
    '1year': {
      wealthRetained: 180000,
      cooperativeJobs: 45,
      communityOwnership: 12,
      carbonReduction: 850,
      socialCohesion: 78
    },
    '5year': {
      wealthRetained: 2400000,
      cooperativeJobs: 340,
      communityOwnership: 67,
      carbonReduction: 12000,
      socialCohesion: 89
    },
    '10year': {
      wealthRetained: 8900000,
      cooperativeJobs: 890,
      communityOwnership: 89,
      carbonReduction: 45000,
      socialCohesion: 94
    },
    '20year': {
      wealthRetained: 28000000,
      cooperativeJobs: 2100,
      communityOwnership: 95,
      carbonReduction: 120000,
      socialCohesion: 97
    }
  };

  const intergenerationalImpacts = [
    {
      generation: 'Children (0-18)',
      currentImpact: 'Limited resources, educational gaps',
      projectedBenefit: 'Quality education, stable housing, mentorship',
      keyMetrics: { education: 85, health: 78, opportunities: 92 }
    },
    {
      generation: 'Young Adults (19-35)',
      currentImpact: 'High debt, job insecurity, housing stress',
      projectedBenefit: 'Cooperative jobs, affordable housing, peer support',
      keyMetrics: { employment: 89, housing: 76, community: 94 }
    },
    {
      generation: 'Adults (36-55)',
      currentImpact: 'Financial strain, work-life balance issues',
      projectedBenefit: 'Ownership stakes, flexible work, mutual aid',
      keyMetrics: { ownership: 67, flexibility: 82, support: 88 }
    },
    {
      generation: 'Elders (55+)',
      currentImpact: 'Retirement insecurity, isolation',
      projectedBenefit: 'Community care, wisdom sharing, dignity',
      keyMetrics: { security: 91, engagement: 86, care: 93 }
    }
  ];

  const solidarityMetrics = [
    {
      metric: 'Community Wealth Index',
      current: 42,
      projected: 78,
      description: 'Measures local ownership and wealth circulation'
    },
    {
      metric: 'Democratic Participation',
      current: 35,
      projected: 85,
      description: 'Percentage engaging in community decision-making'
    },
    {
      metric: 'Mutual Aid Capacity',
      current: 58,
      projected: 92,
      description: 'Community ability to support members in crisis'
    },
    {
      metric: 'Economic Resilience',
      current: 47,
      projected: 89,
      description: 'Ability to withstand external economic shocks'
    }
  ];

  const currentProjection = projectionScenarios[timeHorizon];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Intergenerational Value Projections
          </CardTitle>
          <div className="flex gap-2">
            {(['1year', '5year', '10year', '20year'] as const).map((horizon) => (
              <Button
                key={horizon}
                size="sm"
                variant={timeHorizon === horizon ? 'default' : 'outline'}
                onClick={() => setTimeHorizon(horizon)}
              >
                {horizon.replace('year', ' Year').replace('1 ', '1 ')}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Key Impact Projections */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">
                ${(currentProjection.wealthRetained / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-gray-600">Wealth Retained</div>
            </Card>

            <Card className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">
                {currentProjection.cooperativeJobs.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Cooperative Jobs</div>
            </Card>

            <Card className="p-4 text-center">
              <Building className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">
                {currentProjection.communityOwnership}%
              </div>
              <div className="text-xs text-gray-600">Community Ownership</div>
            </Card>

            <Card className="p-4 text-center">
              <Leaf className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">
                {(currentProjection.carbonReduction / 1000).toFixed(0)}t
              </div>
              <div className="text-xs text-gray-600">CO2 Reduction</div>
            </Card>

            <Card className="p-4 text-center">
              <Heart className="w-6 h-6 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold text-red-600">
                {currentProjection.socialCohesion}%
              </div>
              <div className="text-xs text-gray-600">Social Cohesion</div>
            </Card>
          </div>

          {/* Intergenerational Impact Analysis */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Intergenerational Impact Analysis
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {intergenerationalImpacts.map((impact, index) => (
                <Card key={index} className="p-4">
                  <div className="mb-3">
                    <h5 className="font-medium">{impact.generation}</h5>
                    <div className="text-sm text-gray-600 mt-1">
                      Current: {impact.currentImpact}
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      Projected: {impact.projectedBenefit}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {Object.entries(impact.keyMetrics).map(([metric, value]) => (
                      <div key={metric}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{metric}</span>
                          <span>{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Solidarity Economy Metrics */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600" />
              Solidarity Economy Progress
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {solidarityMetrics.map((metric, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium">{metric.metric}</h5>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Current: {metric.current}%</div>
                      <div className="text-sm font-medium text-green-600">Target: {metric.projected}%</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Current Progress</span>
                      <span>{metric.current}%</span>
                    </div>
                    <Progress value={metric.current} className="h-2 bg-gray-200">
                      <div 
                        className="h-full bg-blue-600 rounded-l" 
                        style={{ width: `${metric.current}%` }}
                      />
                    </Progress>
                    
                    <div className="flex justify-between text-xs">
                      <span>Projected ({timeHorizon.replace('year', ' year')})</span>
                      <span>{metric.projected}%</span>
                    </div>
                    <Progress value={metric.projected} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-center">
              <h4 className="font-medium text-lg mb-2">Building Our Economic Future</h4>
              <p className="text-gray-600 mb-4">
                These projections are achievable through coordinated community action. 
                Every cooperative, every local purchase, every act of mutual aid contributes to this vision.
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline">View Action Plan</Button>
                <Button>Start Contributing</Button>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
