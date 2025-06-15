
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Calendar, Trophy, Search, Plus } from 'lucide-react';
import { SkillMarketplace } from '@/components/skills/SkillMarketplace';
import { CourseCreator } from '@/components/skills/CourseCreator';
import { LearningDashboard } from '@/components/skills/LearningDashboard';
import { KnowledgeBase } from '@/components/skills/KnowledgeBase';
import { ProjectShowcase } from '@/components/skills/ProjectShowcase';

export const SkillsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    {
      id: 'marketplace',
      title: 'Skill Exchange',
      icon: Users,
      description: 'Find teachers and learners in your community'
    },
    {
      id: 'courses',
      title: 'Courses',
      icon: BookOpen,
      description: 'Structured learning programs'
    },
    {
      id: 'dashboard',
      title: 'My Learning',
      icon: Calendar,
      description: 'Track your progress and sessions'
    },
    {
      id: 'knowledge',
      title: 'Knowledge Base',
      icon: BookOpen,
      description: 'Community wiki and resources'
    },
    {
      id: 'showcase',
      title: 'Projects',
      icon: Trophy,
      description: 'Share and discover projects'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Learning Hub</h1>
          <p className="text-gray-600">
            Share skills, learn together, and build community knowledge
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.title}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="marketplace">
          <SkillMarketplace searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="courses">
          <CourseCreator />
        </TabsContent>

        <TabsContent value="dashboard">
          <LearningDashboard />
        </TabsContent>

        <TabsContent value="knowledge">
          <KnowledgeBase searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="showcase">
          <ProjectShowcase searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillsPage;
