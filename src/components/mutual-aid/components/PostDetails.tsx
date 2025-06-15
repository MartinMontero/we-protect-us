
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, MapPin, MessageSquare } from 'lucide-react';
import { MutualAidPost } from '../types';
import { PerspectivesTrigger } from '../perspectives/PerspectivesTrigger';

interface PostDetailsProps {
  post: MutualAidPost;
  onClose: () => void;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post, onClose }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">{post.title}</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{post.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant={post.type === 'request' ? 'destructive' : 'default'}>
            {post.type}
          </Badge>
          <Badge variant="outline">{post.category}</Badge>
          <Badge variant="secondary">{post.urgency}</Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.profiles?.pseudonym || 'Anonymous'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.time_commitment_hours} hours</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Within {post.radius_km}km</span>
          </div>
        </div>

        {post.profiles?.vulnerability_factors && post.profiles.vulnerability_factors.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-blue-800 mb-1">Priority Support</p>
            <p className="text-xs text-blue-700">
              This request prioritizes vulnerable community members
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
