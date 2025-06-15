
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventMobilization } from '@/components/organizing/EventMobilization';
import { ConsensusTools } from '@/components/organizing/ConsensusTools';
import { WorkingGroups } from '@/components/organizing/WorkingGroups';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Users, Vote } from 'lucide-react';

const Organizing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Action Coordination Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Tools for secure organizing, consensus building, and collaborative action
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Action
        </Button>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events" className="gap-2">
            <Calendar className="w-4 h-4" />
            Event Mobilization
          </TabsTrigger>
          <TabsTrigger value="consensus" className="gap-2">
            <Vote className="w-4 h-4" />
            Consensus Tools
          </TabsTrigger>
          <TabsTrigger value="workgroups" className="gap-2">
            <Users className="w-4 h-4" />
            Working Groups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <EventMobilization />
        </TabsContent>

        <TabsContent value="consensus" className="space-y-4">
          <ConsensusTools />
        </TabsContent>

        <TabsContent value="workgroups" className="space-y-4">
          <WorkingGroups />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Organizing;
