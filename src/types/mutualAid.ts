
// Unified type definitions for mutual aid system
export type PostType = 'request' | 'offer';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export type FulfillmentStatus = 'open' | 'in_progress' | 'fulfilled' | 'expired';

export type NeedCategory = 
  | 'food' 
  | 'housing' 
  | 'transportation' 
  | 'childcare' 
  | 'healthcare'
  | 'education' 
  | 'technology' 
  | 'labor' 
  | 'financial' 
  | 'emotional_support';

export interface MutualAidPost {
  id: string;
  user_id: string;
  type: PostType;
  title: string;
  description: string;
  category: NeedCategory;
  urgency: UrgencyLevel;
  status: FulfillmentStatus;
  location_lat?: number;
  location_lng?: number;
  radius_km?: number;
  time_commitment_hours?: number;
  skills_needed?: string[];
  contact_info?: string;
  tags?: string[];
  expires_at?: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    pseudonym?: string;
    vulnerability_factors?: string[];
  };
}

export interface CreatePostData {
  type: PostType;
  title: string;
  description: string;
  category: NeedCategory;
  urgency?: UrgencyLevel;
  location_lat?: number;
  location_lng?: number;
  radius_km?: number;
  time_commitment_hours?: number;
  skills_needed?: string[];
  contact_info?: string;
  tags?: string[];
  expires_at?: string;
}

export interface UpdatePostData extends Partial<CreatePostData> {
  status?: FulfillmentStatus;
}

export interface MapMarkerProps {
  post: MutualAidPost;
  onPostClick: (post: MutualAidPost) => void;
}

export interface PostDetailsProps {
  post: MutualAidPost;
  onClose: () => void;
}
