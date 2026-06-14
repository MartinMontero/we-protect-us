
import React, { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  DollarSign,
  Repeat,
  Target,
  BarChart3,
  Play,
  RotateCcw
} from 'lucide-react';

export const InvestmentSimulator: React.FC = () => {
  const [scenario, setScenario] = useState({
    investmentAmount: 10000,
    timeHorizon: 5,
    communityRetention: 80,
    cooperativeCount: 3,
    memberParticipation: 60,
    mutualAidCapacity: 40
  });

  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof calculateProjections> | null>(null);

  const investmentTypes = [
    {
      name: 'Community Loan Fund',
      description: 'Low-interest loans for local businesses and cooperatives',
      multiplier: 2.3,
      retention: 85,
      socialImpact: 'high'
    },
    {
      name: 'Worker Cooperative',
      description: 'Direct investment in employee-owned businesses',
      multiplier: 3.1,
      retention: 92,
      socialImpact: 'very high'
    },
    {
      name: 'Community Land Trust',
      description: 'Permanently affordable housing development',
      multiplier: 1.8,
      retention: 95,
      socialImpact: 'high'
    },
    {
      name: 'Local Currency Fund',
      description: 'Support community currency circulation',
      multiplier: 4.2,
      retention: 88,
      socialImpact: 'medium'
    }
  ];

  const calculateProjections = () => {
    const baseMultiplier = scenario.communityRetention / 100 * 2.5;
    const cooperativeBonus = scenario.cooperativeCount * 0.3;
    const participationBonus = scenario.memberParticipation / 100 * 0.5;
    
    const totalMultiplier = baseMultiplier + cooperativeBonus + participationBonus;
    
    const economicImpact = scenario.investmentAmount * totalMultiplier;
    const jobsCreated = Math.floor(economicImpact / 45000); // $45k per job
    const wealthRetained = economicImpact * (scenario.communityRetention / 100);
    const cooperativeMembers = scenario.cooperativeCount * 25; // avg 25 members per co-op
    
    return {
      totalEconomicImpact: economicImpact,
      wealthRetained,
      jobsCreated,
      cooperativeMembers,
      multiplierEffect: totalMultiplier,
      yearlyGrowth: Math.pow(1.12, scenario.timeHorizon) * scenario.investmentAmount,
      socialCohesionIndex: (scenario.memberParticipation + scenario.mutualAidCapacity) / 2
    };
  };

  const runSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      setResults(calculateProjections());
      setIsRunning(false);
    }, 1500); // Simulate processing time
  };

  const resetSimulation = () => {
    setResults(null);
    setScenario({
      investmentAmount: 10000,
      timeHorizon: 5,
      communityRetention: 80,
      cooperativeCount: 3,
      memberParticipation: 60,
      mutualAidCapacity: 40
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Community Investment Simulator</h3>
        <Button onClick={resetSimulation} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Investment Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="investment">Initial Investment Amount</Label>
              <div className="flex items-center gap-2">
                <span className="text-lg">$</span>
                <Input
                  id="investment"
                  type="number"
                  value={scenario.investmentAmount}
                  onChange={(e) => setScenario(prev => ({
                    ...prev,
                    investmentAmount: parseInt(e.target.value) || 0
                  }))}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Time Horizon: {scenario.timeHorizon} years</Label>
              <Slider
                value={[scenario.timeHorizon]}
                onValueChange={([value]) => setScenario(prev => ({ ...prev, timeHorizon: value }))}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Community Retention Rate: {scenario.communityRetention}%</Label>
              <Slider
                value={[scenario.communityRetention]}
                onValueChange={([value]) => setScenario(prev => ({ ...prev, communityRetention: value }))}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Number of Cooperatives: {scenario.cooperativeCount}</Label>
              <Slider
                value={[scenario.cooperativeCount]}
                onValueChange={([value]) => setScenario(prev => ({ ...prev, cooperativeCount: value }))}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Member Participation: {scenario.memberParticipation}%</Label>
              <Slider
                value={[scenario.memberParticipation]}
                onValueChange={([value]) => setScenario(prev => ({ ...prev, memberParticipation: value }))}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Mutual Aid Capacity: {scenario.mutualAidCapacity}%</Label>
              <Slider
                value={[scenario.mutualAidCapacity]}
                onValueChange={([value]) => setScenario(prev => ({ ...prev, mutualAidCapacity: value }))}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            <Button 
              onClick={runSimulation} 
              disabled={isRunning} 
              className="w-full gap-2"
            >
              {isRunning ? (
                <>
                  <Spinner size="sm" className="border-white" />
                  Running Simulation...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Simulation
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Projected Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">
                      ${Math.round(results.totalEconomicImpact).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Economic Impact</div>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">
                      ${Math.round(results.wealthRetained).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Wealth Retained</div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-purple-600">
                      {results.jobsCreated}
                    </div>
                    <div className="text-sm text-gray-600">Jobs Created</div>
                  </div>

                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Target className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold text-orange-600">
                      {results.cooperativeMembers}
                    </div>
                    <div className="text-sm text-gray-600">Co-op Members</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Multiplier Effect:</span>
                    <span className="text-lg font-bold">{results.multiplierEffect.toFixed(1)}x</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Projected Growth ({scenario.timeHorizon} years):</span>
                    <span className="text-lg font-bold text-green-600">
                      ${Math.round(results.yearlyGrowth).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Social Cohesion Index:</span>
                    <span className="text-lg font-bold text-purple-600">
                      {Math.round(results.socialCohesionIndex)}%
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium mb-2">Key Insights</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Every $1 invested generates ${results.multiplierEffect.toFixed(1)} in community value</li>
                    <li>• {Math.round((results.wealthRetained / results.totalEconomicImpact) * 100)}% of wealth stays in the community</li>
                    <li>• Investment creates sustainable employment for {results.jobsCreated} people</li>
                    <li>• Democratic ownership extends to {results.cooperativeMembers} community members</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Set your parameters and run the simulation to see projected outcomes</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Investment Type Comparisons */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Type Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {investmentTypes.map((type, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">{type.name}</h5>
                <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Multiplier:</span>
                    <span className="font-medium">{type.multiplier}x</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Retention:</span>
                    <span className="font-medium">{type.retention}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Social Impact:</span>
                    <Badge 
                      variant={type.socialImpact === 'very high' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {type.socialImpact}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
