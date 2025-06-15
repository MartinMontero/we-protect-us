
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrustGraph } from './TrustGraph';
import { HistoricalArchive } from './HistoricalArchive';
import { ResilienceProjections } from './ResilienceProjections';
import { PerspectiveInsight, MutualAidPost } from '../types';
import { Eye, TrendingUp, BookOpen, Network, X } from 'lucide-react';

interface PerspectivesOverlayProps {
  post: MutualAidPost;
  isVisible: boolean;
  onClose: () => void;
}

export const PerspectivesOverlay: React.FC<PerspectivesOverlayProps> = ({
  post,
  isVisible,
  onClose
}) => {
  const [activeView, setActiveView] = useState<'trust' | 'historical' | 'resilience'>('trust');
  const [insights, setInsights] = useState<PerspectiveInsight[]>([]);

  useEffect(() => {
    if (isVisible) {
      generateInsights();
    }
  }, [post, isVisible]);

  const generateInsights = async () => {
    // Generate contextual insights based on post data
    const trustInsight: PerspectiveInsight = {
      type: 'trust_economics',
      title: 'Trust Economics Analysis',
      description: `This ${post.type} creates measurable social capital and community resilience`,
      metrics: {
        socialCapitalGain: calculateSocialCapitalGain(post),
        networkStrengthening: calculateNetworkStrengthening(post),
        communityResiliencePoints: calculateResiliencePoints(post),
        equivalentMarketCost: calculateMarketCost(post),
        corporateProfitRedirection: calculateProfitRedirection(post)
      },
      confidence: 0.85
    };

    setInsights([trustInsight]);
  };

  const calculateSocialCapitalGain = (post: MutualAidPost): number => {
    let baseGain = 5.2;
    if (post.profiles?.vulnerability_factors?.length > 0) baseGain += 2.1;
    if (post.urgency === 'critical') baseGain += 1.5;
    if (post.time_commitment_hours > 2) baseGain += 1.0;
    return Math.round(baseGain * 10) / 10;
  };

  const calculateNetworkStrengthening = (post: MutualAidPost): number => {
    return Math.floor(Math.random() * 6) + 3; // 3-8 connections
  };

  const calculateResiliencePoints = (post: MutualAidPost): number => {
    let points = 6.5;
    if (post.category === 'food') points += 2.8;
    if (post.category === 'housing') points += 3.2;
    if (post.category === 'care') points += 2.1;
    return Math.round(points * 10) / 10;
  };

  const calculateMarketCost = (post: MutualAidPost): number => {
    const baseCosts = {
      food: 80,
      housing: 200,
      care: 120,
      transportation: 45,
      education: 150,
      tools: 90
    };
    return baseCosts[post.category as keyof typeof baseCosts] || 75;
  };

  const calculateProfitRedirection = (post: MutualAidPost): number => {
    return Math.round(calculateMarketCost(post) * 0.3);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Mutual Aid Perspectives</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-muted-foreground">{post.description}</p>
          </div>

          <div className="flex gap-2 mb-6">
            <Button
              variant={activeView === 'trust' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('trust')}
              className="gap-2"
            >
              <Network className="w-4 h-4" />
              Trust Economics
            </Button>
            <Button
              variant={activeView === 'historical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('historical')}
              className="gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Historical Parallels
            </Button>
            <Button
              variant={activeView === 'resilience' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('resilience')}
              className="gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Resilience Projections
            </Button>
          </div>

          {activeView === 'trust' && (
            <div className="space-y-6">
              {insights[0]?.metrics && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="w-5 h-5" />
                      Trust Economics Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {insights[0].metrics.communityResiliencePoints}
                        </div>
                        <div className="text-xs text-muted-foreground">Community Resilience Points</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          ${insights[0].metrics.equivalentMarketCost}
                        </div>
                        <div className="text-xs text-muted-foreground">Equivalent Market Cost</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {insights[0].metrics.networkStrengthening}
                        </div>
                        <div className="text-xs text-muted-foreground">Connections Strengthened</div>
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="text-sm">
                        <strong>Corporate Profit Redirection:</strong> ${insights[0].metrics.corporateProfitRedirection} kept in community instead of extracted
                      </p>
                    </div>

                    <Badge variant="secondary" className="w-fit">
                      {Math.round(insights[0].confidence * 100)}% Confidence
                    </Badge>
                  </CardContent>
                </Card>
              )}
              
              <TrustGraph postId={post.id} />
            </div>
          )}

          {activeView === 'historical' && (
            <HistoricalArchive category={post.category} type={post.type} />
          )}

          {activeView === 'resilience' && (
            <ResilienceProjections post={post} />
          )}
        </div>
      </div>
    </div>
  );
};
