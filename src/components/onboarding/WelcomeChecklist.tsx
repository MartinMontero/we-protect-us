
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Users, 
  Heart, 
  MessageCircle, 
  Shield,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  completed: boolean;
}

export const WelcomeChecklist: React.FC = () => {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Add your skills, location, and interests to connect with neighbors',
      icon: User,
      path: '/profile',
      completed: false
    },
    {
      id: 'mutual-aid',
      title: 'Explore Mutual Aid',
      description: 'See what resources your community is sharing',
      icon: Heart,
      path: '/mutual-aid',
      completed: false
    },
    {
      id: 'join-group',
      title: 'Join a Working Group',
      description: 'Connect with others organizing around shared interests',
      icon: Users,
      path: '/organizing',
      completed: false
    },
    {
      id: 'first-post',
      title: 'Make Your First Post',
      description: 'Share a resource or skill with your community',
      icon: MessageCircle,
      path: '/mutual-aid',
      completed: false
    },
    {
      id: 'security',
      title: 'Learn About Security',
      description: 'Understand how we protect your privacy and data',
      icon: Shield,
      path: '/community-sovereignty',
      completed: false
    }
  ]);

  const handleItemClick = (item: ChecklistItem) => {
    // Mark as completed
    setChecklist(prev => 
      prev.map(checkItem => 
        checkItem.id === item.id 
          ? { ...checkItem, completed: true }
          : checkItem
      )
    );
    
    // Navigate to the path
    navigate(item.path);
  };

  const completedCount = checklist.filter(item => item.completed).length;
  const progressPercent = (completedCount / checklist.length) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Getting Started
          </CardTitle>
          <Badge variant={completedCount === checklist.length ? "default" : "secondary"}>
            {completedCount}/{checklist.length} completed
          </Badge>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-red-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {checklist.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id}
              className={`flex items-center space-x-4 p-3 rounded-lg border transition-all cursor-pointer hover:bg-gray-50 ${
                item.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
              }`}
              onClick={() => handleItemClick(item)}
            >
              <div className={`flex-shrink-0 p-2 rounded-full ${
                item.completed ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Icon className={`w-4 h-4 ${
                  item.completed ? 'text-green-600' : 'text-gray-600'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium ${
                  item.completed ? 'text-green-900' : 'text-gray-900'
                }`}>
                  {item.title}
                </h4>
                <p className={`text-sm ${
                  item.completed ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {item.description}
                </p>
              </div>
              
              <div className="flex-shrink-0">
                {item.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
          );
        })}
        
        {completedCount === checklist.length && (
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium text-green-900">
              Great job! You're ready to organize with your community.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
