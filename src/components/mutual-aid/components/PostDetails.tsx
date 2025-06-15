
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, MapPin, MessageSquare, Tag, Calendar, X } from 'lucide-react';
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

  const statusColors = {
    open: 'bg-green-100 text-green-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    fulfilled: 'bg-blue-100 text-blue-800',
    expired: 'bg-gray-100 text-gray-800'
  };

  const formatCategory = (category: string) => {
    return category.replace('_', ' ').charAt(0).toUpperCase() + category.replace('_', ' ').slice(1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl">{post.title}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge className={typeColors[post.type]} variant="secondary">
              {post.type}
            </Badge>
            <Badge variant="outline">{formatCategory(post.category)}</Badge>
            <Badge className={urgencyColors[post.urgency]} variant="secondary">
              {post.urgency}
            </Badge>
            <Badge className={statusColors[post.status]} variant="secondary">
              {post.status}
            </Badge>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{post.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.profiles?.pseudonym || 'Anonymous'}</span>
            </div>
            
            {post.time_commitment_hours && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.time_commitment_hours} hours needed</span>
              </div>
            )}
            
            {post.radius_km && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Within {post.radius_km}km radius</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Created {formatDate(post.created_at)}</span>
            </div>
          </div>

          {post.skills_needed && post.skills_needed.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Skills Needed</h3>
              <div className="flex flex-wrap gap-2">
                {post.skills_needed.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {post.profiles?.vulnerability_factors && post.profiles.vulnerability_factors.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Priority Support</h3>
              <p className="text-blue-700 text-sm">
                This request prioritizes vulnerable community members including: {post.profiles.vulnerability_factors.join(', ')}
              </p>
            </div>
          )}

          {post.contact_info && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p className="text-sm">{post.contact_info}</p>
            </div>
          )}

          {post.expires_at && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Expires</h3>
              <p className="text-yellow-700 text-sm">
                {formatDate(post.expires_at)}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button className="flex-1 gap-2">
              <MessageSquare className="w-4 h-4" />
              Respond to {post.type === 'request' ? 'Request' : 'Offer'}
            </Button>
            <PerspectivesTrigger post={post} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
