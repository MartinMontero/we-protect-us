
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import LearningDashboard from '@/components/skills/LearningDashboard';
import { SkillMarketplace } from '@/components/skills/SkillMarketplace';
import KnowledgeBase from '@/components/skills/KnowledgeBase';
import { ProjectShowcase } from '@/components/skills/ProjectShowcase';

const SkillsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community Skills & Learning</h1>
        <p className="text-muted-foreground">
          Share knowledge, learn together, and build collective expertise
        </p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search skills, courses, or projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="marketplace">Skill Exchange</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <LearningDashboard />
        </TabsContent>

        <TabsContent value="marketplace">
          <SkillMarketplace searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="knowledge">
          <KnowledgeBase />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectShowcase searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillsPage;
