
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Info, BookOpen, MessageSquare, Lightbulb, Users, Target } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface CaseStudy {
  id: string;
  title: string;
  organization: string;
  time_period: string;
  location: string;
  description: string;
  key_principles: string[];
  outcomes: string[];
  lessons: string[];
  relevance_score: number;
  tags: string[];
}

interface ReflectionPrompt {
  type: string;
  text: string;
}

interface CommunityLensProps {
  postId?: string;
  postType?: 'request' | 'offer';
  category?: string;
}

export const CommunityLens: React.FC<CommunityLensProps> = ({ postId, postType, category }) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [reflectionPrompts, setReflectionPrompts] = useState<ReflectionPrompt[]>([]);
  const [selectedReflection, setSelectedReflection] = useState<string>('');
  const [reflectionResponse, setReflectionResponse] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
    generateReflectionPrompts();
  }, [category, postType]);

  const fetchCaseStudies = async () => {
    try {
      let query = supabase
        .from('case_studies')
        .select('*')
        .order('relevance_score', { ascending: false })
        .limit(3);

      // Filter by relevant tags if category is provided
      if (category) {
        query = query.contains('tags', [category]);
      }

      const { data, error } = await query;
      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReflectionPrompts = () => {
    const basePrompts = [
      {
        type: 'sovereignty',
        text: 'How does this exchange strengthen community sovereignty and self-determination?'
      },
      {
        type: 'vulnerability',
        text: 'What vulnerabilities does this address, and how might it prevent future crises?'
      },
      {
        type: 'network',
        text: 'How might this interaction expand trust networks and community resilience?'
      },
      {
        type: 'economic',
        text: 'What alternative economic relationships does this create outside of capitalist markets?'
      },
      {
        type: 'power',
        text: 'How does this shift power dynamics and challenge existing hierarchies?'
      }
    ];

    // Customize prompts based on post type and category
    let customPrompts = [...basePrompts];
    
    if (postType === 'request') {
      customPrompts.push({
        type: 'need',
        text: 'What systemic conditions created this need, and how can community action address root causes?'
      });
    }

    if (postType === 'offer') {
      customPrompts.push({
        type: 'abundance',
        text: 'How does sharing this resource demonstrate community abundance over artificial scarcity?'
      });
    }

    if (category === 'food') {
      customPrompts.push({
        type: 'food_sovereignty',
        text: 'How does this contribute to food sovereignty and challenge corporate food systems?'
      });
    }

    setReflectionPrompts(customPrompts);
  };

  const saveReflection = async () => {
    if (!selectedReflection || !reflectionResponse.trim()) return;
    
    try {
      const { error } = await supabase
        .from('reflections')
        .insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          mutual_aid_post_id: postId,
          prompt_type: selectedReflection,
          prompt_text: reflectionPrompts.find(p => p.type === selectedReflection)?.text || '',
          response: reflectionResponse
        });

      if (error) throw error;
      
      setReflectionResponse('');
      setSelectedReflection('');
    } catch (error) {
      console.error('Error saving reflection:', error);
    }
  };

  const getImpactScenarios = () => {
    return [
      {
        title: 'Immediate Impact',
        description: 'Direct needs met, immediate stress relief for community members',
        icon: <Target className="w-4 h-4" />
      },
      {
        title: 'Network Effect',
        description: 'Trust relationships formed, social capital increased, future cooperation enabled',
        icon: <Users className="w-4 h-4" />
      },
      {
        title: 'Systemic Change',
        description: 'Alternative economic patterns normalized, dependency on exploitative systems reduced',
        icon: <Lightbulb className="w-4 h-4" />
      }
    ];
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Info className="w-4 h-4" />
          Community Lens
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Community Impact Analysis
          </DialogTitle>
          <DialogDescription>
            Explore the deeper implications of this mutual aid exchange
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="impact" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="impact">Impact Scenarios</TabsTrigger>
            <TabsTrigger value="history">Historical Context</TabsTrigger>
            <TabsTrigger value="reflection">Reflection</TabsTrigger>
          </TabsList>

          <TabsContent value="impact" className="space-y-4">
            <div className="grid gap-4">
              {getImpactScenarios().map((scenario, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {scenario.icon}
                      {scenario.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{scenario.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Learn from Movement History</h3>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {caseStudies.map((study) => (
                  <Card key={study.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{study.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{study.organization}</span>
                        <span>•</span>
                        <span>{study.time_period}</span>
                        <span>•</span>
                        <span>{study.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm">{study.description}</p>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Principles:</h4>
                        <div className="flex flex-wrap gap-1">
                          {study.key_principles.map((principle, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {principle}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Outcomes:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {study.outcomes.map((outcome, index) => (
                            <li key={index}>• {outcome}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Lessons:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {study.lessons.map((lesson, index) => (
                            <li key={index}>• {lesson}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-2">
                        {study.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reflection" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Reflective Questions</h3>
            </div>

            <div className="space-y-3">
              {reflectionPrompts.map((prompt) => (
                <Card 
                  key={prompt.type}
                  className={`cursor-pointer transition-colors ${
                    selectedReflection === prompt.type ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedReflection(prompt.type)}
                >
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">{prompt.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedReflection && (
              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-semibold">Your Reflection:</h4>
                <Textarea
                  placeholder="Share your thoughts on how this exchange contributes to community solidarity..."
                  value={reflectionResponse}
                  onChange={(e) => setReflectionResponse(e.target.value)}
                  rows={4}
                />
                <Button onClick={saveReflection} disabled={!reflectionResponse.trim()}>
                  Save Reflection
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
