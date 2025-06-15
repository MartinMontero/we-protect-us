
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Calculator, 
  Video, 
  Award, 
  Clock,
  Star,
  TrendingUp,
  Users,
  Lightbulb
} from 'lucide-react';

export const EnergyEducation: React.FC = () => {
  const educationContent = [
    {
      id: 1,
      title: "Understanding Your Utility Bill",
      category: "bill_analysis",
      skillLevel: "beginner",
      author: "Energy Literacy Project",
      estimatedHours: 1,
      helpfulVotes: 24,
      difficultyRating: 2,
      tags: ["utility", "savings", "analysis"]
    },
    {
      id: 2,
      title: "Solar Panel Installation Basics",
      category: "solar",
      skillLevel: "intermediate",
      author: "Community Solar Group",
      estimatedHours: 3,
      helpfulVotes: 18,
      difficultyRating: 4,
      tags: ["solar", "installation", "DIY"]
    },
    {
      id: 3,
      title: "Home Energy Audit Checklist",
      category: "efficiency",
      skillLevel: "beginner",
      author: "Efficiency Experts",
      estimatedHours: 2,
      helpfulVotes: 31,
      difficultyRating: 2,
      tags: ["audit", "efficiency", "checklist"]
    }
  ];

  const calculators = [
    {
      id: 1,
      name: "Solar Savings Calculator",
      description: "Estimate your potential solar savings based on your location and energy usage",
      icon: Calculator,
      category: "solar"
    },
    {
      id: 2,
      name: "Utility Rate Comparison",
      description: "Compare energy rates and plans from different providers",
      icon: TrendingUp,
      category: "rates"
    },
    {
      id: 3,
      name: "Carbon Footprint Tracker",
      description: "Track and reduce your household's carbon emissions",
      icon: Lightbulb,
      category: "environment"
    }
  ];

  const trainingPrograms = [
    {
      id: 1,
      title: "Community Solar Ambassador",
      provider: "Solar Education Cooperative",
      duration: "6 weeks",
      cost: "Free",
      nextStart: "March 15, 2024",
      enrolled: 12,
      maxEnrollment: 20,
      skills: ["Solar basics", "Community organizing", "Financial modeling"]
    },
    {
      id: 2,
      title: "Energy Efficiency Specialist",
      provider: "Green Jobs Training Center",
      duration: "12 weeks",
      cost: "$500 (scholarships available)",
      nextStart: "April 1, 2024",
      enrolled: 8,
      maxEnrollment: 15,
      skills: ["Energy auditing", "Weatherization", "Building science"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Energy Education & Tools</h2>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <BookOpen className="w-4 h-4 mr-2" />
          Contribute Content
        </Button>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Learning Content</TabsTrigger>
          <TabsTrigger value="tools">Analysis Tools</TabsTrigger>
          <TabsTrigger value="training">Training Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4">
            {educationContent.map((content) => (
              <Card key={content.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        {content.title}
                      </CardTitle>
                      <p className="text-gray-600">By {content.author}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{content.helpfulVotes} helpful</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {content.skillLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{content.estimatedHours}h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Difficulty:</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < content.difficultyRating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{content.category}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Topics:</p>
                      <div className="flex flex-wrap gap-1">
                        {content.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Start Learning</Button>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4 mr-1" />
                      Watch Video
                    </Button>
                    <Button variant="outline" size="sm">Download PDF</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <Card key={calc.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-blue-600" />
                      {calc.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{calc.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm">Open Tool</Button>
                      <Button variant="outline" size="sm">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Your Energy Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1,234 kWh</div>
                  <div className="text-sm text-gray-600">This Month</div>
                  <div className="text-sm text-green-600">-15% vs last month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$156</div>
                  <div className="text-sm text-gray-600">Estimated Bill</div>
                  <div className="text-sm text-green-600">$23 saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2.1</div>
                  <div className="text-sm text-gray-600">Tons CO₂</div>
                  <div className="text-sm text-green-600">-0.3 vs last month</div>
                </div>
              </div>
              <Button className="w-full mt-4">View Detailed Analysis</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid gap-4">
            {trainingPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-orange-600" />
                        {program.title}
                      </CardTitle>
                      <p className="text-gray-600">{program.provider}</p>
                    </div>
                    <Badge variant="outline">{program.cost}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{program.enrolled}/{program.maxEnrollment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{program.nextStart}</span>
                    </div>
                    <div className="text-sm">
                      <Progress 
                        value={(program.enrolled / program.maxEnrollment) * 100} 
                        className="w-full h-2"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Skills you'll learn:</p>
                    <div className="flex flex-wrap gap-1">
                      {program.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Enroll Now</Button>
                    <Button variant="outline" size="sm">View Curriculum</Button>
                    <Button variant="outline" size="sm">Contact Provider</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
