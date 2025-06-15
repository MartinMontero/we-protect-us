import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MutualAidPost } from '../types';
import { PostDetails } from './PostDetails';

interface MapMarkerProps {
  post: MutualAidPost;
  onPostClick: (post: MutualAidPost) => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ post, onPostClick }) => {
  const createCustomIcon = (type: string, urgency: string) => {
    const getMarkerColor = (type: string, urgency: string): string => {
      if (type === 'request') {
        switch (urgency) {
          case 'critical': return '#dc2626';
          case 'high': return '#ea580c';
          case 'medium': return '#d97706';
          default: return '#65a30d';
        }
      }
      return '#2563eb';
    };

    const color = getMarkerColor(type, urgency);
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
          <path fill="${color}" stroke="#fff" stroke-width="2" d="M12.5 0C5.6 0 0 5.6 0 12.5S12.5 41 12.5 41s12.5-23.9 12.5-28.5S19.4 0 12.5 0z"/>
          <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
          <text x="12.5" y="16" text-anchor="middle" font-size="10" fill="${color}">
            ${type === 'request' ? 'R' : 'O'}
          </text>
        </svg>
      `)}`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
  };

  return (
    <Marker
      position={[post.location_lat, post.location_lng]}
      icon={createCustomIcon(post.type, post.urgency)}
      eventHandlers={{
        click: () => onPostClick(post)
      }}
    >
      <Popup>
        <PostDetails 
          post={post} 
          onClose={() => {/* popup closes automatically */}} 
        />
      </Popup>
    </Marker>
  );
};
