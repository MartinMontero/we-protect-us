
import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMutualAidPosts } from './hooks/useMutualAidPosts';
import { MapMarker } from './components/MapMarker';
import { PostDetails } from './components/PostDetails';
import { LoadingSpinner } from './components/LoadingSpinner';
import { initializeLeafletIcons } from './utils/mapUtils';
import { MutualAidPost } from './types';
import 'leaflet/dist/leaflet.css';

// Initialize leaflet icons
initializeLeafletIcons();

export const MutualAidMap: React.FC = () => {
  const { posts, loading } = useMutualAidPosts();
  const [selectedPost, setSelectedPost] = useState<MutualAidPost | null>(null);

  const handleMarkerClick = (post: MutualAidPost) => {
    setSelectedPost(post);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Ensure we have valid posts array - add safety checks
  const validPosts = Array.isArray(posts) ? posts.filter(post => 
    post && 
    typeof post.id === 'string' && 
    typeof post.location_lat === 'number' && 
    typeof post.location_lng === 'number' &&
    !isNaN(post.location_lat) &&
    !isNaN(post.location_lng)
  ) : [];

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
    </div>
  );
};
