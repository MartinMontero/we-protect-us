
export interface MutualAidPost {
  id: string;
  title: string;
  description: string;
  location_lat?: number;
  location_lng?: number;
  type: 'request' | 'offer';
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  updated_at: string;
  user_id: string;
  status: 'open' | 'in_progress' | 'fulfilled' | 'expired';
  contact_info?: string;
  tags?: string[];
  time_commitment_hours?: number;
  radius_km?: number;
  skills_needed?: string[];
  expires_at?: string;
  profiles?: {
    pseudonym?: string;
    vulnerability_factors?: string[];
  };
}

export interface MapMarkerProps {
  post: MutualAidPost;
  onPostClick: (post: MutualAidPost) => void;
}

export interface PostDetailsProps {
  post: MutualAidPost;
  onClose: () => void;
}

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
