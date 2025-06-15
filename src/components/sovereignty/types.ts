
export interface CommunityMember {
  id: string;
  pseudonym: string;
  delegations: string[];
  participationLevel: 'observer' | 'participant' | 'facilitator' | 'coordinator';
  consentSettings: {
    locationSharing: boolean;
    directMessaging: boolean;
    proposalNotifications: boolean;
  };
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  category: 'resource_allocation' | 'governance' | 'security' | 'education';
  status: 'draft' | 'discussion' | 'voting' | 'implemented' | 'archived';
  createdBy: string;
  coCreators: string[];
  votes: {
    support: number;
    oppose: number;
    abstain: number;
  };
  delegatedVotes: Record<string, number>;
  deadline: Date;
  consensusThreshold: number;
}

export interface PowerMapNode {
  id: string;
  name: string;
  type: 'individual' | 'organization' | 'institution' | 'resource';
  influence: number;
  accessibility: number;
  alignment: 'supportive' | 'neutral' | 'opposed' | 'unknown';
  connections: string[];
  position: { x: number; y: number };
}

export interface ConflictResolution {
  id: string;
  title: string;
  participants: string[];
  status: 'reported' | 'mediation' | 'circle' | 'resolved' | 'ongoing';
  principles: string[];
  agreements: string[];
  facilitator?: string;
  createdAt: Date;
}

export interface OrganizingCaseStudy {
  id: string;
  title: string;
  location: string;
  timeframe: string;
  context: string;
  tactics: string[];
  outcomes: string[];
  lessons: string[];
  relevanceScore: number;
  sources: string[];
}

export interface ResourceSovereigntyData {
  category: 'food' | 'housing' | 'energy' | 'healthcare' | 'education' | 'finance';
  corporateControl: number;
  communityOwnership: number;
  cooperativeNetworks: number;
  mutualAidCapacity: number;
  trends: {
    month: string;
    value: number;
  }[];
}
