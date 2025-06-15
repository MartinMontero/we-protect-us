
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { ToolMap } from '@/components/tools/ToolMap';
import { AddToolDialog } from '@/components/tools/AddToolDialog';
import { ToolFilters } from '@/components/tools/ToolFilters';
import { Button } from '@/components/ui/button';
import { Plus, Map, Grid } from 'lucide-react';

export const ToolLibrary: React.FC = () => {
  const [showAddTool, setShowAddTool] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    condition: '',
    availability: 'available',
    search: '',
    nearMe: false
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Tool Library</h1>
            <p className="text-xl text-gray-600">Share tools, build community, save money</p>
          </div>
          <Button 
            onClick={() => setShowAddTool(true)}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Tool
          </Button>
        </div>

        {/* Filters */}
        <ToolFilters filters={filters} onFiltersChange={setFilters} />

        {/* Main Content */}
        <Tabs defaultValue="grid" className="mt-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <Grid className="w-4 h-4" />
              Grid View
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Map View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="mt-6">
            <ToolGrid filters={filters} />
          </TabsContent>
          
          <TabsContent value="map" className="mt-6">
            <ToolMap filters={filters} />
          </TabsContent>
        </Tabs>

        {/* Add Tool Dialog */}
        <AddToolDialog 
          open={showAddTool} 
          onOpenChange={setShowAddTool}
        />
      </div>
    </div>
  );
};
