
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

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={12}
        style={{ height: '400px', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {posts && posts.length > 0 && posts.map((post) => (
          <MapMarker
            key={post.id}
            post={post}
            onPostClick={handleMarkerClick}
          />
        ))}
      </MapContainer>

      {selectedPost && (
        <PostDetails 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </div>
  );
};
