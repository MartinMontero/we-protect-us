
export interface TimeBank {
  id: string;
  participantId: string;
  participantName: string;
  skillsOffered: string[];
  skillsNeeded: string[];
  hoursAvailable: number;
  hoursUsed: number;
  trustScore: number;
  verifications: SkillVerification[];
}

export interface SkillVerification {
  id: string;
  skill: string;
  verifiedBy: string;
  rating: number;
  completedTasks: number;
  verificationDate: Date;
}

export interface CommunityTransaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  currency: 'hours' | 'community_currency' | 'usd';
  description: string;
  category: 'skill_exchange' | 'goods' | 'services' | 'investment';
  timestamp: Date;
  cooperativeId?: string;
}

export interface CommunityCooperative {
  id: string;
  name: string;
  type: 'worker' | 'housing' | 'credit_union' | 'consumer' | 'multi_stakeholder';
  members: number;
  totalAssets: number;
  monthlyRevenue: number;
  profitSharing: 'equal' | 'hours_worked' | 'investment_based';
  democraticVoting: boolean;
  sustainabilityScore: number;
}

export interface WealthFlow {
  category: string;
  inflow: number;
  outflow: number;
  netFlow: number;
  extractionRisk: 'low' | 'medium' | 'high';
  trends: { month: string; value: number }[];
}

export interface EconomicLesson {
  id: string;
  title: string;
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  interactive: boolean;
  completionRate: number;
}
