
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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

interface HistoricalContextProps {
  category?: string;
}

export const HistoricalContext: React.FC<HistoricalContextProps> = ({ category }) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, [category]);

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

  return (
    <div className="space-y-4">
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
    </div>
  );
};
