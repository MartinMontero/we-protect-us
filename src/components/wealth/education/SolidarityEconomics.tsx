
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  Users,
  TrendingUp,
  Heart,
  Lightbulb
} from 'lucide-react';

export const SolidarityEconomics: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const lessons = [
    {
      id: '1',
      title: 'What is Solidarity Economy?',
      duration: 8,
      difficulty: 'beginner' as const,
      topics: ['basic concepts', 'historical context', 'core principles'],
      completed: false,
      interactive: true,
      description: 'Learn the fundamental principles of people-centered economics',
      completionRate: 89
    },
    {
      id: '2',
      title: 'Cooperative Principles & Practice',
      duration: 12,
      difficulty: 'beginner' as const,
      topics: ['7 cooperative principles', 'democratic governance', 'member benefits'],
      completed: true,
      interactive: true,
      description: 'Deep dive into how cooperatives operate democratically',
      completionRate: 76
    },
    {
      id: '3',
      title: 'Community Currencies & Local Exchange',
      duration: 15,
      difficulty: 'intermediate' as const,
      topics: ['time banking', 'local currencies', 'mutual credit'],
      completed: false,
      interactive: true,
      description: 'Alternative currencies that keep wealth circulating locally',
      completionRate: 62
    },
    {
      id: '4',
      title: 'Mutual Aid vs. Charity',
      duration: 10,
      difficulty: 'beginner' as const,
      topics: ['power dynamics', 'reciprocity', 'community building'],
      completed: true,
      interactive: true,
      description: 'Understanding the distinction between aid models',
      completionRate: 81
    },
    {
      id: '5',
      title: 'Community Land Trusts',
      duration: 18,
      difficulty: 'intermediate' as const,
      topics: ['land speculation', 'affordability', 'community control'],
      completed: false,
      interactive: true,
      description: 'Permanently affordable housing through community ownership',
      completionRate: 58
    },
    {
      id: '6',
      title: 'Worker Ownership Models',
      duration: 20,
      difficulty: 'advanced' as const,
      topics: ['conversion process', 'financing', 'governance structures'],
      completed: false,
      interactive: true,
      description: 'Transitioning businesses to worker ownership',
      completionRate: 44
    }
  ];

  const learningPaths = [
    {
      name: 'Community Organizer Track',
      lessons: ['1', '4', '5'],
      description: 'Essential knowledge for community organizing and mutual aid',
      estimatedTime: 36
    },
    {
      name: 'Cooperative Developer Track',
      lessons: ['1', '2', '6'],
      description: 'Start and develop worker and community cooperatives',
      estimatedTime: 40
    },
    {
      name: 'Local Economy Track',
      lessons: ['1', '3', '5'],
      description: 'Build local economic resilience and wealth retention',
      estimatedTime: 41
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedLessons = lessons.filter(l => l.completed).length;
  const totalProgress = (completedLessons / lessons.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Solidarity Economics 101</h3>
        <div className="text-sm text-gray-600">
          {completedLessons} of {lessons.length} lessons completed
        </div>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-lg">Your Learning Journey</h4>
              <p className="text-gray-600">Building knowledge for community economic transformation</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{Math.round(totalProgress)}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
          <Progress value={totalProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Learning Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <h4 className="font-medium col-span-full">Choose Your Learning Path</h4>
        {learningPaths.map((path, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <h5 className="font-medium mb-2">{path.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{path.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {path.estimatedTime} min
                </div>
                <Button size="sm" variant="outline">
                  Start Path
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Individual Lessons */}
      <div className="space-y-3">
        <h4 className="font-medium">All Lessons</h4>
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {lesson.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Play className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium">{lesson.title}</h5>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(lesson.difficulty)}>
                        {lesson.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {lesson.duration} min
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {lesson.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {lesson.interactive && (
                        <Badge variant="secondary" className="text-xs">
                          <Lightbulb className="w-3 h-3 mr-1" />
                          Interactive
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        {lesson.completionRate}% completion rate
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant={lesson.completed ? "outline" : "default"}
                  onClick={() => setActiveLesson(lesson.id)}
                >
                  {lesson.completed ? 'Review' : 'Start'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Learning Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Community Learning Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-gray-600">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">89%</div>
              <div className="text-sm text-gray-600">Avg Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">34</div>
              <div className="text-sm text-gray-600">Study Groups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">156</div>
              <div className="text-sm text-gray-600">Projects Started</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" className="gap-2">
          <Users className="w-4 h-4" />
          Join Study Group
        </Button>
        <Button variant="outline" className="gap-2">
          <Heart className="w-4 h-4" />
          Find Learning Partner
        </Button>
        <Button className="gap-2">
          <TrendingUp className="w-4 h-4" />
          Track Progress
        </Button>
      </div>
    </div>
  );
};
