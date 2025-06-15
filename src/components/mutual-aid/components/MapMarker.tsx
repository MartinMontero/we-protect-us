
import React from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import { Badge } from '@/components/ui/badge';
import { Clock, User, MapPin } from 'lucide-react';
import { MutualAidPost } from '../types';
import { createCustomIcon, getMarkerColor } from '../utils/mapUtils';

interface MapMarkerProps {
  post: MutualAidPost;
  onMarkerClick: (post: MutualAidPost) => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ post, onMarkerClick }) => {
  return (
    <React.Fragment key={post.id}>
      <Marker
        position={[post.location_lat, post.location_lng]}
        icon={createCustomIcon(post.type, post.urgency)}
        eventHandlers={{
          click: () => onMarkerClick(post),
        }}
      >
        <Popup>
          <div className="p-2 max-w-xs">
            <h3 className="font-semibold text-sm mb-1">{post.title}</h3>
            <p className="text-xs text-gray-600 mb-2">{post.description}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              <Badge variant={post.type === 'request' ? 'destructive' : 'default'} className="text-xs">
                {post.type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {post.category}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {post.urgency}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <User className="w-3 h-3" />
              <span>{post.profiles?.pseudonym}</span>
            </div>
          </div>
        </Popup>
      </Marker>
      
      {post.radius_km && (
        <Circle
          center={[post.location_lat, post.location_lng]}
          radius={post.radius_km * 1000}
          pathOptions={{
            color: getMarkerColor(post.type, post.urgency),
            fillColor: getMarkerColor(post.type, post.urgency),
            fillOpacity: 0.1,
            weight: 1,
          }}
        />
      )}
    </React.Fragment>
  );
};
