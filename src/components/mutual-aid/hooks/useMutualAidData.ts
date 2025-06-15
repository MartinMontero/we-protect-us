
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MutualAidPost } from '@/types/mutualAid';

// Hook for components that need mock data when user is not authenticated
export const useMutualAidData = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<MutualAidPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      loadMockData();
    }
  }, [user]);

  const loadMockData = async () => {
    try {
      console.log('Loading mock mutual aid data...');
      
      const mockPosts: MutualAidPost[] = [
        {
          id: '1',
          user_id: 'user1',
          title: 'Food Assistance Needed',
          description: 'Family needs groceries for the week. Any help would be greatly appreciated.',
          type: 'request',
          category: 'food',
          urgency: 'high',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: 'open',
          time_commitment_hours: 2,
          radius_km: 5,
          location_lat: 37.7749,
          location_lng: -122.4194,
          profiles: {
            pseudonym: 'CommunityMember1',
            vulnerability_factors: ['single_parent', 'low_income']
          }
        },
        {
          id: '2',
          user_id: 'user2',
          title: 'Offering Transportation',
          description: 'Can provide rides to medical appointments. Vehicle is wheelchair accessible.',
          type: 'offer',
          category: 'transportation',
          urgency: 'low',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: 'open',
          time_commitment_hours: 1,
          radius_km: 10,
          location_lat: 37.7849,
          location_lng: -122.4094,
          profiles: {
            pseudonym: 'HelpingHand',
            vulnerability_factors: []
          }
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(mockPosts);
      console.log('Mock posts loaded successfully:', mockPosts.length);
    } catch (error) {
      console.error('Error loading mock mutual aid posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading };
};
