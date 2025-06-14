
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MutualAidPost {
  id: string;
  title: string;
  description: string;
  type: string; // Changed from 'request' | 'offer' to string to match database
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

export const MutualAidMap: React.FC = () => {
  const [posts, setPosts] = useState<MutualAidPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<MutualAidPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMutualAidPosts();
  }, []);

  const fetchMutualAidPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('mutual_aid_posts')
        .select(`
          *,
          profiles (
            pseudonym,
            vulnerability_factors
          )
        `)
        .eq('status', 'open')
        .not('location_lat', 'is', null)
        .not('location_lng', 'is', null);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching mutual aid posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMarkerColor = (type: string, urgency: string) => {
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

  const createCustomIcon = (type: string, urgency: string) => {
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
      popupAnchor: [1, -34],
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[37.7749, -122.4194]} // San Francisco default
        zoom={12}
        style={{ height: '400px', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {posts.map((post) => (
          <React.Fragment key={post.id}>
            <Marker
              position={[post.location_lat, post.location_lng]}
              icon={createCustomIcon(post.type, post.urgency)}
              eventHandlers={{
                click: () => setSelectedPost(post),
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
        ))}
      </MapContainer>

      {selectedPost && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedPost.title}</span>
              <div className="flex gap-2">
                <Badge variant={selectedPost.type === 'request' ? 'destructive' : 'default'}>
                  {selectedPost.type}
                </Badge>
                <Badge variant="outline">{selectedPost.urgency}</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">{selectedPost.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{selectedPost.profiles?.pseudonym}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{selectedPost.time_commitment_hours}h</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{selectedPost.radius_km}km radius</span>
              </div>
              <Badge variant="secondary">{selectedPost.category}</Badge>
            </div>
            {selectedPost.profiles?.vulnerability_factors?.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Vulnerability considerations:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedPost.profiles.vulnerability_factors.map((factor, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
