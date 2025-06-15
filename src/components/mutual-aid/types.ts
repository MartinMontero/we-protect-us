
export interface MutualAidPost {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  urgency: string;
  location_lat: number;
  location_lng: number;
  radius_km: number;
  time_commitment_hours: number;
  profiles: {
    pseudonym: string;
    vulnerability_factors: string[];
  };
}
