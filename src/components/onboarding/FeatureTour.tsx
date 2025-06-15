
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';

interface TourStep {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface FeatureTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
}

export const FeatureTour: React.FC<FeatureTourProps> = ({ steps, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen || steps.length === 0) return null;

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      
      {/* Tour tooltip */}
      <Card className="fixed z-50 max-w-sm bg-white shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="text-xs">
              {currentStep + 1} of {steps.length}
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.content}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back
            </Button>
            
            <Button size="sm" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

// Hook for managing feature tours
export const useFeatureTour = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState<TourStep[]>([]);

  const startTour = (tourSteps: TourStep[]) => {
    setSteps(tourSteps);
    setIsOpen(true);
  };

  const endTour = () => {
    setIsOpen(false);
    setSteps([]);
  };

  return {
    isOpen,
    steps,
    startTour,
    endTour
  };
};
