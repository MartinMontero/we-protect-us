
import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useAuth } from '@/contexts/AuthContext';
import { useMutualAidPosts } from '@/hooks/useMutualAidPosts';
import { useMutualAidData } from './hooks/useMutualAidData';
import { MapMarker } from './components/MapMarker';
import { PostDetails } from './components/PostDetails';
import { LoadingSpinner } from './components/LoadingSpinner';
import { initializeLeafletIcons } from './utils/mapUtils';
import { MutualAidPost } from '@/types/mutualAid';
import 'leaflet/dist/leaflet.css';

// Initialize leaflet icons
initializeLeafletIcons();

export const MutualAidMap: React.FC = () => {
  const { user } = useAuth();
  const authenticatedData = useMutualAidPosts();
  const mockData = useMutualAidData();
  
  // Use authenticated data if user is logged in, otherwise use mock data
  const { posts, loading } = user ? authenticatedData : mockData;
  
  const [selectedPost, setSelectedPost] = useState<MutualAidPost | null>(null);

  const handleMarkerClick = (post: MutualAidPost) => {
    setSelectedPost(post);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Validate posts and filter out invalid ones
  const validPosts = Array.isArray(posts) ? posts.filter(post => {
    if (!post || typeof post.id !== 'string') {
      console.warn('Invalid post: missing id', post);
      return false;
    }
    
    if (typeof post.location_lat !== 'number' || typeof post.location_lng !== 'number') {
      console.warn('Invalid post: missing or invalid coordinates', post);
      return false;
    }
    
    if (isNaN(post.location_lat) || isNaN(post.location_lng)) {
      console.warn('Invalid post: NaN coordinates', post);
      return false;
    }
    
    return true;
  }) : [];

  console.log('MutualAidMap render - validPosts:', validPosts.length);

  return (
    <div className="h-full w-full relative">
      <div className="h-[400px] w-full rounded-lg overflow-hidden">
        <MapContainer
          center={[37.7749, -122.4194]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {validPosts.map((post) => (
            <MapMarker
              key={post.id}
              post={post}
              onPostClick={handleMarkerClick}
            />
          ))}
        </MapContainer>
      </div>

      {selectedPost && (
        <PostDetails 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
      
      {!user && (
        <div className="absolute top-4 right-4 bg-blue-100 border border-blue-300 rounded-lg p-3 text-sm text-blue-800">
          <p className="font-semibold">Demo Mode</p>
          <p>Sign in to see real mutual aid posts</p>
        </div>
      )}
    </div>
  );
};
