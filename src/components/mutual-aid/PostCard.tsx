
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, Heart } from 'lucide-react';
import { MutualAidPost } from './types';

interface PostCardProps {
  post: MutualAidPost;
  onViewDetails: (post: MutualAidPost) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onViewDetails }) => {
  const urgencyColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800'
  };

  const typeColors = {
    request: 'bg-blue-100 text-blue-800',
    offer: 'bg-purple-100 text-purple-800'
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
          <div className="flex gap-1 flex-shrink-0">
            <Badge className={urgencyColors[post.urgency]} variant="secondary">
              {post.urgency}
            </Badge>
            <Badge className={typeColors[post.type]} variant="secondary">
              {post.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-gray-600 line-clamp-3">{post.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {post.category}
          </Badge>
          {post.skills_needed && post.skills_needed.length > 0 && (
            post.skills_needed.slice(0, 2).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            {post.time_commitment_hours && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.time_commitment_hours}h</span>
              </div>
            )}
            {post.location_lat && post.location_lng && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{post.radius_km}km</span>
              </div>
            )}
          </div>
          <span>{formatTimeAgo(post.created_at)}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{post.profiles?.pseudonym || 'Anonymous'}</span>
            {post.profiles?.vulnerability_factors && post.profiles.vulnerability_factors.length > 0 && (
              <Heart className="w-4 h-4 text-red-500" />
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(post)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
