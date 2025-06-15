
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ResourceFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterChange: (value: string) => void;
}

export const ResourceFilters: React.FC<ResourceFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange
}) => {
  return (
    <div className="flex gap-4 mb-6">
      <Input 
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1"
      />
      <Select value={filterType} onValueChange={onFilterChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Resources</SelectItem>
          <SelectItem value="fridge">Community Fridges</SelectItem>
          <SelectItem value="toolshed">Tool Libraries</SelectItem>
          <SelectItem value="library">Book Libraries</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
