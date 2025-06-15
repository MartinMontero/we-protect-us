
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MutualAidPost } from '@/hooks/useMutualAidPosts';
import { Clock, MapPin, User, Heart, HandHeart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: MutualAidPost;
  onRespond?: (post: MutualAidPost) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onRespond }) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      food: 'bg-green-100 text-green-800',
      housing: 'bg-blue-100 text-blue-800',
      transportation: 'bg-purple-100 text-purple-800',
      childcare: 'bg-pink-100 text-pink-800',
      healthcare: 'bg-red-100 text-red-800',
      education: 'bg-indigo-100 text-indigo-800',
      technology: 'bg-gray-100 text-gray-800',
      labor: 'bg-orange-100 text-orange-800',
      financial: 'bg-yellow-100 text-yellow-800',
      emotional_support: 'bg-teal-100 text-teal-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {post.type === 'request' ? (
              <Heart className="w-5 h-5 text-red-600" />
            ) : (
              <HandHeart className="w-5 h-5 text-green-600" />
            )}
            <h3 className="font-semibold text-lg">{post.title}</h3>
          </div>
          <div className="flex gap-2">
            <Badge className={getUrgencyColor(post.urgency)}>
              {post.urgency}
            </Badge>
            <Badge className={getCategoryColor(post.category)}>
              {post.category.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.profiles?.pseudonym || 'Anonymous'}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </div>
          {post.time_commitment_hours && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.time_commitment_hours}h
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 mb-4">{post.description}</p>
        
        {post.skills_needed && post.skills_needed.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Skills needed:</p>
            <div className="flex flex-wrap gap-1">
              {post.skills_needed.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {post.profiles?.vulnerability_factors && post.profiles.vulnerability_factors.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Priority factors:</p>
            <div className="flex flex-wrap gap-1">
              {post.profiles.vulnerability_factors.map((factor) => (
                <Badge key={factor} variant="secondary" className="text-xs">
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Badge variant={post.status === 'open' ? 'default' : 'secondary'}>
            {post.status}
          </Badge>
          
          {post.status === 'open' && onRespond && (
            <Button 
              onClick={() => onRespond(post)}
              variant={post.type === 'request' ? 'default' : 'outline'}
              size="sm"
            >
              {post.type === 'request' ? 'Offer Help' : 'Request This'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
