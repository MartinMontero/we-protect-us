
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, MapPin } from 'lucide-react';
import { MutualAidPost } from '../types';

interface PostDetailsProps {
  post: MutualAidPost;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{post.title}</span>
          <div className="flex gap-2">
            <Badge variant={post.type === 'request' ? 'destructive' : 'default'}>
              {post.type}
            </Badge>
            <Badge variant="outline">{post.urgency}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">{post.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.profiles?.pseudonym}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.time_commitment_hours}h</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{post.radius_km}km radius</span>
          </div>
          <Badge variant="secondary">{post.category}</Badge>
        </div>
        {post.profiles?.vulnerability_factors?.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-1">Vulnerability considerations:</p>
            <div className="flex flex-wrap gap-1">
              {post.profiles.vulnerability_factors.map((factor, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
