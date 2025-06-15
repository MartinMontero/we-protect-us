
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Shield, 
  Heart, 
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { AccessibilityReport } from '@/components/reports/AccessibilityReport';
import { CommunityOwnershipReport } from '@/components/reports/CommunityOwnershipReport';
import { PrivacyArchitectureReport } from '@/components/reports/PrivacyArchitectureReport';

const reportSummary = [
  {
    title: 'Community Ownership',
    score: '87%',
    status: 'Good',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Democratic governance and cooperative principles'
  },
  {
    title: 'Privacy Architecture',
    score: '98%',
    status: 'Excellent',
    icon: Shield,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Data protection and privacy compliance'
  },
  {
    title: 'Accessibility',
    score: '96%',
    status: 'Excellent',
    icon: Heart,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'WCAG 2.1 compliance and inclusive design'
  }
];

export const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Community Reports
            </h1>
            <p className="text-slate-600">
              Comprehensive insights into your community's health and compliance
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white border rounded-xl p-1 shadow-sm">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-lg transition-all duration-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-lg transition-all duration-200"
            >
              Community
            </TabsTrigger>
            <TabsTrigger 
              value="privacy" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-lg transition-all duration-200"
            >
              Privacy
            </TabsTrigger>
            <TabsTrigger 
              value="accessibility" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-lg transition-all duration-200"
            >
              Accessibility
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reportSummary.map((report, index) => {
                const Icon = report.icon;
                return (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${report.bgColor}`}>
                          <Icon className={`w-6 h-6 ${report.color}`} />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900">
                            {report.score}
                          </div>
                          <div className={`text-sm font-medium ${report.color}`}>
                            {report.status}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">
                          {report.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {report.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Detailed Overview */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-slate-600 leading-relaxed mb-6">
                  Your community demonstrates strong performance across all key metrics. 
                  The privacy architecture scores exceptionally well at 98%, with robust 
                  data protection measures and transparent consent management.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Key Strengths</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Excellent privacy compliance (98%)
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Strong accessibility standards (96%)
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Active democratic participation
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Areas for Improvement</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        Enhance community voting participation
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        Streamline governance processes
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        Expand accessibility testing coverage
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <CommunityOwnershipReport />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacyArchitectureReport />
          </TabsContent>

          <TabsContent value="accessibility">
            <AccessibilityReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
