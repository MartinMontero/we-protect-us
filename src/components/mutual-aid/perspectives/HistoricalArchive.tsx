
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { HistoricalParallel } from './types';

interface HistoricalArchiveProps {
  category: string;
  type: string;
}

export const HistoricalArchive: React.FC<HistoricalArchiveProps> = ({ category, type }) => {
  const [parallels, setParallels] = useState<HistoricalParallel[]>([]);

  useEffect(() => {
    loadHistoricalParallels();
  }, [category, type]);

  const loadHistoricalParallels = () => {
    // Mock historical data - in real implementation, this would come from a database
    const mockParallels: HistoricalParallel[] = [
      {
        id: '1',
        title: 'Black Panther Party Free Breakfast Program',
        timeframe: '1969-1980s',
        location: 'Oakland, California',
        description: 'Community-led program that fed thousands of children daily, demonstrating how mutual aid addresses immediate needs while building political consciousness.',
        outcomes: [
          'Fed over 20,000 children daily at its peak',
          'Influenced federal school breakfast programs',
          'Built community organizing capacity',
          'Created sustainable volunteer networks'
        ],
        relevanceScore: 0.95,
        sourceUrl: 'https://www.blackpast.org/african-american-history/black-panther-party-free-breakfast-children-program-1969-1980/'
      },
      {
        id: '2',
        title: 'Highlander Folk School Resource Sharing',
        timeframe: '1932-present',
        location: 'Tennessee',
        description: 'Educational cooperative that shared knowledge, tools, and strategies across racial and class lines during the Civil Rights Movement.',
        outcomes: [
          'Trained key civil rights leaders',
          'Developed popular education methods',
          'Created cross-racial solidarity networks',
          'Sustained movement through resource sharing'
        ],
        relevanceScore: 0.87,
        sourceUrl: 'https://www.highlandercenter.org/'
      },
      {
        id: '3',
        title: 'Cooperation Jackson Urban Farming',
        timeframe: '2013-present',
        location: 'Jackson, Mississippi',
        description: 'Cooperative network combining urban agriculture, tool libraries, and community land trusts to build economic democracy.',
        outcomes: [
          'Established multiple community gardens',
          'Created cooperative businesses',
          'Developed community land ownership',
          'Built food sovereignty infrastructure'
        ],
        relevanceScore: 0.91,
        sourceUrl: 'https://cooperationjackson.org/'
      }
    ];

    // Filter based on category and type relevance
    const filtered = mockParallels.filter(parallel => {
      if (category === 'food' && parallel.title.toLowerCase().includes('food')) return true;
      if (category === 'food' && parallel.title.toLowerCase().includes('breakfast')) return true;
      if (category === 'education' && parallel.title.toLowerCase().includes('education')) return true;
      if (type === 'offer' && parallel.description.toLowerCase().includes('sharing')) return true;
      return parallel.relevanceScore > 0.8;
    });

    setParallels(filtered);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Learning from Movement History</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6">
        Your mutual aid action connects to a rich history of community solidarity. 
        These historical examples show how similar efforts have created lasting change.
      </p>

      {parallels.map((parallel) => (
        <Card key={parallel.id} className="transition-all hover:shadow-md">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{parallel.title}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {Math.round(parallel.relevanceScore * 100)}% relevant
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {parallel.timeframe}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {parallel.location}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{parallel.description}</p>
            
            <div>
              <h4 className="font-semibold text-sm mb-2">Key Outcomes:</h4>
              <ul className="text-sm space-y-1">
                {parallel.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {parallel.sourceUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={parallel.sourceUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Learn More
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Continuum Thinking:</strong> These examples exist on a spectrum of community organizing approaches, 
            from immediate mutual aid to long-term institutional change. Your action contributes to this continuum 
            of building community power and self-determination.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
