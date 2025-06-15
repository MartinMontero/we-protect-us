
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  X, 
  Book, 
  Users, 
  Shield, 
  Heart,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface QuickStartGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickStartGuide: React.FC<QuickStartGuideProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('basics');

  if (!isOpen) return null;

  const tabs = [
    { id: 'basics', label: 'Platform Basics', icon: Book },
    { id: 'organizing', label: 'Start Organizing', icon: Users },
    { id: 'security', label: 'Stay Safe', icon: Shield },
    { id: 'community', label: 'Build Community', icon: Heart }
  ];

  const content = {
    basics: {
      title: 'Platform Basics',
      items: [
        'This platform is community-owned and operated',
        'Your privacy and security are our top priorities',
        'All features are designed for real organizing work',
        'Use your pseudonym to protect your identity',
        'Connect with verified community members'
      ]
    },
    organizing: {
      title: 'Start Organizing',
      items: [
        'Join existing campaigns in your area',
        'Create working groups around shared interests',
        'Use consensus tools for democratic decision-making',
        'Coordinate events and actions through the platform',
        'Share resources and skills with neighbors'
      ]
    },
    security: {
      title: 'Stay Safe',
      items: [
        'Always use your pseudonym, not your real name',
        'Enable two-factor authentication on your account',
        'Be cautious about sharing location information',
        'Report suspicious behavior to moderators',
        'Keep organizing activities secure and private'
      ]
    },
    community: {
      title: 'Build Community',
      items: [
        'Respond to mutual aid requests when you can',
        'Share your skills and knowledge with others',
        'Participate in community discussions',
        'Attend local events and meetings',
        'Help newcomers get started on the platform'
      ]
    }
  };

  const activeContent = content[activeTab as keyof typeof content];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Quick Start Guide
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-1/3 border-r p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-100 text-red-700 border-red-200'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {activeContent.title}
              </h3>
              
              <div className="space-y-3 mb-6">
                {activeContent.items.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              
              {activeTab === 'security' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Security Reminder
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Remember: This platform is designed for community organizing. 
                    Always prioritize operational security and protect sensitive information.
                  </p>
                </div>
              )}
              
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Community
                </Button>
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Full Documentation
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
