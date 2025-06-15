
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';

interface ToolFiltersProps {
  filters: {
    category: string;
    condition: string;
    availability: string;
    search: string;
    nearMe: boolean;
  };
  onFiltersChange: (filters: any) => void;
}

const categories = [
  { value: 'power_tools', label: 'Power Tools' },
  { value: 'garden_equipment', label: 'Garden Equipment' },
  { value: 'kitchen_appliances', label: 'Kitchen Appliances' },
  { value: 'camping_gear', label: 'Camping Gear' },
  { value: 'party_supplies', label: 'Party Supplies' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'hand_tools', label: 'Hand Tools' },
  { value: 'cleaning_equipment', label: 'Cleaning Equipment' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'sports_recreation', label: 'Sports & Recreation' },
  { value: 'home_improvement', label: 'Home Improvement' },
  { value: 'art_craft', label: 'Art & Craft' }
];

const conditions = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'needs_repair', label: 'Needs Repair' }
];

export const ToolFilters: React.FC<ToolFiltersProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search tools..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category */}
        <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Condition */}
        <Select value={filters.condition} onValueChange={(value) => updateFilter('condition', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Condition</SelectItem>
            {conditions.map((cond) => (
              <SelectItem key={cond.value} value={cond.value}>
                {cond.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Availability */}
        <Select value={filters.availability} onValueChange={(value) => updateFilter('availability', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available Now</SelectItem>
            <SelectItem value="all">All Tools</SelectItem>
            <SelectItem value="unavailable">Currently Borrowed</SelectItem>
          </SelectContent>
        </Select>

        {/* Near Me */}
        <Button
          variant={filters.nearMe ? "default" : "outline"}
          onClick={() => updateFilter('nearMe', !filters.nearMe)}
          className="flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          Near Me
        </Button>
      </div>
    </div>
  );
};
