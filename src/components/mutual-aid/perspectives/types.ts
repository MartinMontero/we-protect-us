
export interface TrustEconomicsMetrics {
  socialCapitalGain: number;
  networkStrengthening: number;
  communityResiliencePoints: number;
  equivalentMarketCost: number;
  corporateProfitRedirection: number;
}

export interface HistoricalParallel {
  id: string;
  title: string;
  timeframe: string;
  location: string;
  description: string;
  outcomes: string[];
  relevanceScore: number;
  sourceUrl?: string;
}

export interface ResilienceProjection {
  timeframe: 'immediate' | 'short_term' | 'long_term';
  description: string;
  impactLevel: number;
  networkEffect: string;
  metrics: {
    connectionsStrengthened: number;
    skillsShared: number;
    resourcesCirculated: number;
  };
}

export interface PerspectiveInsight {
  type: 'trust_economics' | 'historical_parallel' | 'resilience_projection';
  title: string;
  description: string;
  metrics?: TrustEconomicsMetrics;
  historicalData?: HistoricalParallel[];
  projections?: ResilienceProjection[];
  confidence: number;
}
