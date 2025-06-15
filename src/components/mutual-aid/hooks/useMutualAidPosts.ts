
import { useState, useEffect } from 'react';
import { MutualAidPost } from '../types';

export const useMutualAidPosts = () => {
  const [posts, setPosts] = useState<MutualAidPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching mutual aid posts...');
        
        const mockPosts: MutualAidPost[] = [
          {
            id: '1',
            title: 'Food Assistance Needed',
            description: 'Family needs groceries for the week',
            latitude: 37.7749,
            longitude: -122.4194,
            type: 'request',
            category: 'food',
            urgency: 'high',
            created_at: new Date().toISOString(),
            user_id: 'user1',
            status: 'active',
            time_commitment_hours: 2,
            radius_km: 5,
            profiles: {
              pseudonym: 'CommunityMember1',
              vulnerability_factors: ['single_parent', 'low_income']
            }
          },
          {
            id: '2',
            title: 'Offering Transportation',
            description: 'Can provide rides to medical appointments',
            latitude: 37.7849,
            longitude: -122.4094,
            type: 'offer',
            category: 'transportation',
            urgency: 'low',
            created_at: new Date().toISOString(),
            user_id: 'user2',
            status: 'active',
            time_commitment_hours: 1,
            radius_km: 10,
            profiles: {
              pseudonym: 'HelpingHand',
              vulnerability_factors: []
            }
          }
        ];

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setPosts(mockPosts);
        console.log('Posts loaded successfully:', mockPosts.length);
      } catch (error) {
        console.error('Error fetching mutual aid posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading };
};
