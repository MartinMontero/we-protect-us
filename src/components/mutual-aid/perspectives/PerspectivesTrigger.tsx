
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { PerspectivesOverlay } from './PerspectivesOverlay';
import { MutualAidPost } from '../types';

interface PerspectivesTriggerProps {
  post: MutualAidPost;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
}

export const PerspectivesTrigger: React.FC<PerspectivesTriggerProps> = ({ 
  post, 
  variant = 'outline',
  size = 'sm'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Eye className="w-4 h-4" />
        Perspectives
      </Button>
      
      <PerspectivesOverlay
        post={post}
        isVisible={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
