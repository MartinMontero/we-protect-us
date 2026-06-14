
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, MapPin, Clock, Target, ExternalLink } from 'lucide-react';
import { OrganizingCaseStudy } from '../types';

export const OrganizingCaseStudies: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<'all' | 'housing' | 'labor' | 'environment'>('all');

  const caseStudies: OrganizingCaseStudy[] = [
    {
      id: 'mission_cove',
      title: 'Mission Cove Community Land Trust',
      location: 'San Francisco, CA',
      timeframe: '2018-2023',
      context: 'Residents organized to prevent displacement and maintain affordable housing in gentrifying neighborhood.',
      tactics: [
        'Door-to-door organizing',
        'Community assemblies',
        'Policy advocacy',
        'Direct action',
        'Coalition building'
      ],
      outcomes: [
        '85 units preserved as affordable housing',
        'Community land trust established',
        'Resident ownership secured',
        'Anti-displacement policies adopted'
      ],
      lessons: [
        'Long-term organizing builds lasting power',
        'Legal strategies need grassroots backing',
        'Community ownership prevents speculation',
        'Multi-racial coalitions essential for success'
      ],
      relevanceScore: 92,
      sources: [
        'Mission Housing Development Corporation reports',
        'SF Anti-Displacement Coalition archives',
        'Community interviews and testimonials'
      ]
    },
    {
      id: 'warehouse_workers',
      title: 'Warehouse Workers United Victory',
      location: 'Inland Empire, CA',
      timeframe: '2020-2024',
      context: 'Amazon and logistics workers organized for better working conditions and union recognition.',
      tactics: [
        'Workplace organizing',
        'Community support campaigns',
        'Media strategy',
        'Strike actions',
        'Legal challenges'
      ],
      outcomes: [
        'First Amazon warehouse union in California',
        'Improved safety protocols',
        'Wage increases for 2,000+ workers',
        'Model for other warehouse campaigns'
      ],
      lessons: [
        'Worker-community alliances strengthen campaigns',
        'Technology can amplify organizing efforts',
        'Corporate accountability requires sustained pressure',
        'Worker leadership development is crucial'
      ],
      relevanceScore: 88,
      sources: [
        'Warehouse Worker Resource Center reports',
        'Labor union documentation',
        'Worker testimony archives'
      ]
    },
    {
      id: 'green_transition',
      title: 'Just Transition Energy Campaign',
      location: 'Richmond, CA',
      timeframe: '2019-2025',
      context: 'Community organizes for renewable energy transition while protecting refinery workers.',
      tactics: [
        'Research and policy development',
        'Community education campaigns',
        'Worker retraining programs',
        'Electoral organizing',
        'Corporate engagement'
      ],
      outcomes: [
        'City commitment to 100% renewable energy',
        'Green jobs training program established',
        'Pollution reduction targets set',
        'Worker transition fund created'
      ],
      lessons: [
        'Environmental and labor justice can align',
        'Community expertise guides policy',
        'Investment in workers prevents opposition',
        'Long-term vision motivates participation'
      ],
      relevanceScore: 85,
      sources: [
        'Richmond Progressive Alliance documentation',
        'Environmental justice reports',
        'City council meeting records'
      ]
    }
  ];

  const filteredStudies = filterBy === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => 
        study.tactics.some(tactic => 
          tactic.toLowerCase().includes(filterBy) || 
          study.context.toLowerCase().includes(filterBy)
        )
      );

  const currentStudy = selectedStudy 
    ? caseStudies.find(study => study.id === selectedStudy)
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Historical Organizing Case Studies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filter Controls */}
        <div className="flex gap-2">
          {['all', 'housing', 'labor', 'environment'].map((filter) => (
            <Button
              key={filter}
              variant={filterBy === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterBy(filter as 'all' | 'housing' | 'labor' | 'environment')}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>

        {/* Case Studies List */}
        <div className="space-y-3">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedStudy === study.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedStudy(selectedStudy === study.id ? null : study.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">{study.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {study.relevanceScore}% relevant
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {study.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {study.timeframe}
                </div>
              </div>
              
              <p className="text-xs text-gray-700">{study.context}</p>
            </div>
          ))}
        </div>

        {/* Detailed Case Study View */}
        {currentStudy && (
          <div className="p-4 border rounded-lg bg-white space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{currentStudy.title}</h4>
              <Button size="sm" variant="outline" className="gap-1">
                <ExternalLink className="w-3 h-3" />
                Full Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Context & Tactics */}
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm mb-1">Context</h5>
                  <p className="text-xs text-gray-700">{currentStudy.context}</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-sm mb-1">Organizing Tactics</h5>
                  <div className="flex flex-wrap gap-1">
                    {currentStudy.tactics.map((tactic) => (
                      <Badge key={tactic} variant="secondary" className="text-xs">
                        {tactic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outcomes & Lessons */}
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm mb-1">Key Outcomes</h5>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {currentStudy.outcomes.map((outcome, index) => (
                      <li key={index}>• {outcome}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-sm mb-1">Lessons Learned</h5>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {currentStudy.lessons.map((lesson, index) => (
                      <li key={index}>• {lesson}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-sm mb-1">Sources</h5>
              <ul className="text-xs text-gray-600 space-y-1">
                {currentStudy.sources.map((source, index) => (
                  <li key={index}>• {source}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 text-purple-600 mt-0.5" />
            <div className="text-sm text-purple-800">
              <strong>Learning from History:</strong> These case studies provide concrete examples 
              of successful organizing strategies, tactics, and coalition-building approaches.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
