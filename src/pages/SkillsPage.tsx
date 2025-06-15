
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ProjectShowcase } from '@/components/skills/ProjectShowcase';
import { KnowledgeBase } from '@/components/skills/KnowledgeBase';
import { SkillMarketplace } from '@/components/skills/SkillMarketplace';
import { CourseCreator } from '@/components/skills/CourseCreator';
import { LearningDashboard } from '@/components/skills/LearningDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const SkillsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t, isRTL } = useLanguage();

  return (
    <div className={`container mx-auto py-8 px-4 ${isRTL ? 'rtl' : ''}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('skills.title')}</h1>
        <p className="text-gray-600 mb-6">{t('skills.description')}</p>
        
        <div className="relative">
          <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`} />
          <Input
            placeholder={t('common.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${isRTL ? 'pr-10' : 'pl-10'} max-w-md`}
          />
        </div>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="marketplace">{t('skills.skill_marketplace')}</TabsTrigger>
          <TabsTrigger value="projects">{t('skills.project_showcase')}</TabsTrigger>
          <TabsTrigger value="knowledge">{t('skills.knowledge_base')}</TabsTrigger>
          <TabsTrigger value="courses">{t('skills.learning_courses')}</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace">
          <SkillMarketplace searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectShowcase searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="knowledge">
          <KnowledgeBase searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="courses">
          <CourseCreator searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="dashboard">
          <LearningDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillsPage;
