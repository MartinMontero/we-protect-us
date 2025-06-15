
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, MapPin, MessageSquare, Tag, Calendar } from 'lucide-react';
import { PostDetailsProps } from '@/types/mutualAid';
import { PerspectivesTrigger } from '../perspectives/PerspectivesTrigger';

export const PostDetails: React.FC<PostDetailsProps> = ({ post, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg line-clamp-2">{post.title}</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{post.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <Badge className={typeColors[post.type]} variant="secondary">
            {post.type}
          </Badge>
          <Badge variant="outline">{post.category}</Badge>
          <Badge className={urgencyColors[post.urgency]} variant="secondary">
            {post.urgency}
          </Badge>
          <Badge variant="outline">{post.status}</Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.profiles?.pseudonym || 'Anonymous'}</span>
          </div>
          
          {post.time_commitment_hours && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.time_commitment_hours} hours</span>
            </div>
          )}
          
          {post.radius_km && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Within {post.radius_km}km</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Created {formatDate(post.created_at)}</span>
          </div>
        </div>

        {post.skills_needed && post.skills_needed.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-gray-800 mb-1">Skills Needed</p>
            <div className="flex flex-wrap gap-1">
              {post.skills_needed.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {post.profiles?.vulnerability_factors && post.profiles.vulnerability_factors.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-blue-800 mb-1">Priority Support</p>
            <p className="text-xs text-blue-700">
              This request prioritizes vulnerable community members
            </p>
          </div>
        )}

        {post.expires_at && (
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-yellow-800 mb-1">Expires</p>
            <p className="text-xs text-yellow-700">
              {formatDate(post.expires_at)}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button size="sm" className="flex-1 gap-2">
            <MessageSquare className="w-4 h-4" />
            Respond
          </Button>
          <PerspectivesTrigger post={post} />
        </div>
      </CardContent>
    </Card>
  );
};
