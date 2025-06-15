
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  Shield, 
  Vote, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Zap,
  Apple,
  Wrench
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
  action: {
    label: string;
    path: string;
  };
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to We Protect Us',
    description: 'A platform built by and for communities organizing for liberation, mutual aid, and collective care.',
    icon: Users,
    features: [
      'Community-owned and democratically governed',
      'Privacy-focused and secure',
      'Built for real organizing work',
      'Free and open-source'
    ],
    action: {
      label: 'Get Started',
      path: '/dashboard'
    }
  },
  {
    id: 'mutual-aid',
    title: 'Mutual Aid Networks',
    description: 'Connect with neighbors to share resources, skills, and support during times of need.',
    icon: Heart,
    features: [
      'Post and respond to resource requests',
      'Share skills and services',
      'Build trust networks',
      'Coordinate community support'
    ],
    action: {
      label: 'Explore Mutual Aid',
      path: '/mutual-aid'
    }
  },
  {
    id: 'community-defense',
    title: 'Community Defense',
    description: 'Organize against displacement, environmental threats, and defend our communities.',
    icon: Shield,
    features: [
      'Anti-displacement organizing',
      'Tenant union coordination',
      'Environmental justice campaigns',
      'Legal support networks'
    ],
    action: {
      label: 'Join Defense Efforts',
      path: '/community-defense'
    }
  },
  {
    id: 'organizing',
    title: 'Democratic Organizing',
    description: 'Tools for consensus building, event mobilization, and collaborative action.',
    icon: Vote,
    features: [
      'Consensus decision-making tools',
      'Event mobilization platform',
      'Working group coordination',
      'Digital hand signals'
    ],
    action: {
      label: 'Start Organizing',
      path: '/organizing'
    }
  },
  {
    id: 'resources',
    title: 'Essential Resources',
    description: 'Access vital community resources for food security, energy democracy, and tool sharing.',
    icon: Zap,
    features: [
      'Food security mapping',
      'Solar coordination networks',
      'Community tool libraries',
      'Emergency preparedness'
    ],
    action: {
      label: 'Explore Resources',
      path: '/food-security'
    }
  }
];

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  const handleFinish = () => {
    navigate('/dashboard');
  };

  const handleExplore = (path: string) => {
    navigate(path);
  };

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              You're Ready to Organize!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-gray-600">
              Welcome to the movement, {user?.user_metadata?.pseudonym || 'comrade'}! 
              You now have access to all the tools you need to build community power.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handleFinish}
                className="bg-red-600 hover:bg-red-700"
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleExplore('/mutual-aid')}
              >
                Start with Mutual Aid
              </Button>
            </div>
            
            <p className="text-sm text-gray-500">
              Remember: This platform is built by and for our communities. 
              Your privacy and security are our priorities.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-sm">
              Step {currentStep + 1} of {onboardingSteps.length}
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip Tour
            </Button>
          </div>
          <Progress value={progress} className="mb-6" />
        </CardHeader>
        
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content Side */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Icon className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                  <p className="text-gray-600 mt-2">{step.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Key Features:</h3>
                <ul className="space-y-2">
                  {step.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                onClick={() => handleExplore(step.action.path)}
                variant="outline"
                className="w-full"
              >
                {step.action.label}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            {/* Visual Side */}
            <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-lg p-8 text-center">
              <Icon className="w-24 h-24 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                Join thousands of organizers already using these tools to build community power.
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Previous
            </Button>
            
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {onboardingSteps.length}
            </span>
            
            <Button onClick={handleNext}>
              {currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
