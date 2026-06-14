
import React from 'react';
import { Spinner } from '@/components/ui/spinner';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <Spinner size="md" className="border-blue-600" />
    </div>
  );
};
