
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ToolCard } from './ToolCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ToolGridProps {
  filters: {
    category: string;
    condition: string;
    availability: string;
    search: string;
    nearMe: boolean;
  };
}

export const ToolGrid: React.FC<ToolGridProps> = ({ filters }) => {
  const { data: tools, isLoading, error } = useQuery({
    queryKey: ['tools', filters],
    queryFn: async () => {
      let query = supabase
        .from('tools')
        .select(`
          *,
          owner:profiles(pseudonym),
          reservations:tool_reservations!inner(*)
        `);

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters.condition) {
        query = query.eq('condition', filters.condition);
      }
      
      if (filters.availability === 'available') {
        query = query.eq('availability_status', true);
      } else if (filters.availability === 'unavailable') {
        query = query.eq('availability_status', false);
      }
      
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading tools. Please try again.</p>
      </div>
    );
  }

  if (!tools || tools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No tools found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
};
