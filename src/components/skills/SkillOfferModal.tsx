
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SkillOfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SkillOfferModal: React.FC<SkillOfferModalProps> = ({ 
  open, 
  onOpenChange 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Offer a Skill</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>Skill offering form will be implemented here.</p>
          <Button onClick={() => onOpenChange(false)} className="mt-4">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
