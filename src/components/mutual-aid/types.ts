
export interface MutualAidPost {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  type: 'request' | 'offer';
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  user_id: string;
  status: 'active' | 'fulfilled' | 'expired';
  contact_info?: string;
  tags?: string[];
}

export interface MapMarkerProps {
  post: MutualAidPost;
  onPostClick: (post: MutualAidPost) => void;
}

export interface PostDetailsProps {
  post: MutualAidPost;
  onClose: () => void;
}
