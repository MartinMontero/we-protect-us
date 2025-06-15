
import React from 'react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Info, BookOpen } from 'lucide-react';

interface ContextualTooltipProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  historicalExample?: string;
  learnMoreAction?: () => void;
}

export const ContextualTooltip: React.FC<ContextualTooltipProps> = ({
  trigger,
  title,
  description,
  historicalExample,
  learnMoreAction
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {trigger}
        </TooltipTrigger>
        <TooltipContent className="max-w-80 p-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">{title}</h4>
            <p className="text-xs text-gray-600">{description}</p>
            {historicalExample && (
              <div className="border-t pt-2">
                <p className="text-xs text-blue-600 italic">{historicalExample}</p>
              </div>
            )}
            {learnMoreAction && (
              <button
                onClick={learnMoreAction}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
              >
                <BookOpen className="w-3 h-3" />
                Learn more
              </button>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Predefined contextual tooltips for common actions
export const FoodShareTooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ContextualTooltip
    trigger={children}
    title="Community Food Sharing"
    description="Food sharing builds food sovereignty and reduces waste while strengthening community bonds."
    historicalExample="Similar to Oakland's community fridges network, which has served over 50,000 meals since 2020."
  />
);

export const SkillExchangeTooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ContextualTooltip
    trigger={children}
    title="Skill Exchange Networks"
    description="Time banking and skill sharing create alternative economies based on reciprocity rather than profit."
    historicalExample="Like Jane Addams' Hull House skill exchanges in 1889 Chicago, building immigrant community solidarity."
  />
);

export const ResourceSharingTooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ContextualTooltip
    trigger={children}
    title="Community Resource Libraries"
    description="Shared resources reduce individual costs and environmental impact while building trust networks."
    historicalExample="Inspired by Berkeley's Tool Library, serving 2,000+ members since 1979."
  />
);

export const ConflictResolutionTooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ContextualTooltip
    trigger={children}
    title="Restorative Justice"
    description="Community-centered conflict resolution heals relationships and addresses root causes."
    historicalExample="Drawing from Indigenous practices and models like Oakland's Community Cabins program."
  />
);
