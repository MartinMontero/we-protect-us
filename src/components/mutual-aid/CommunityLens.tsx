
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ImpactScenarios } from './community-lens/ImpactScenarios';
import { HistoricalContext } from './community-lens/HistoricalContext';
import { ReflectionPrompts } from './community-lens/ReflectionPrompts';

interface CommunityLensProps {
  postId?: string;
  postType?: 'request' | 'offer';
  category?: string;
}

export const CommunityLens: React.FC<CommunityLensProps> = ({ 
  postId, 
  postType, 
  category 
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Info className="w-4 h-4" />
          Community Lens
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Community Impact Analysis
          </DialogTitle>
          <DialogDescription>
            Explore the deeper implications of this mutual aid exchange
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="impact" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="impact">Impact Scenarios</TabsTrigger>
            <TabsTrigger value="history">Historical Context</TabsTrigger>
            <TabsTrigger value="reflection">Reflection</TabsTrigger>
          </TabsList>

          <TabsContent value="impact" className="space-y-4">
            <ImpactScenarios />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <HistoricalContext category={category} />
          </TabsContent>

          <TabsContent value="reflection" className="space-y-4">
            <ReflectionPrompts 
              postId={postId}
              postType={postType}
              category={category}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
