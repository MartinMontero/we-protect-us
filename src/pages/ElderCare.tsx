
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, Calendar, Phone, Home, BookOpen, Gift } from 'lucide-react';
import { ElderProfileForm } from '@/components/eldercare/ElderProfileForm';
import { VolunteerProfileForm } from '@/components/eldercare/VolunteerProfileForm';
import { VisitCoordination } from '@/components/eldercare/VisitCoordination';
import { SupportMatching } from '@/components/eldercare/SupportMatching';
import { SocialEngagement } from '@/components/eldercare/SocialEngagement';
import { ResourceDirectory } from '@/components/eldercare/ResourceDirectory';
import { CelebrationReminders } from '@/components/eldercare/CelebrationReminders';

export default function ElderCare() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Heart className="w-12 h-12 text-red-500" />
            Elder Care Network
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting seniors with caring volunteers for social support, practical assistance, and meaningful connections.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 h-16 mb-8 bg-white shadow-lg rounded-xl">
            <TabsTrigger 
              value="dashboard" 
              className="text-lg font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Home className="w-6 h-6 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="profiles" 
              className="text-lg font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Users className="w-6 h-6 mr-2" />
              Profiles
            </TabsTrigger>
            <TabsTrigger 
              value="matching" 
              className="text-lg font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Heart className="w-6 h-6 mr-2" />
              Matching
            </TabsTrigger>
            <TabsTrigger 
              value="visits" 
              className="text-lg font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Calendar className="w-6 h-6 mr-2" />
              Visits
            </TabsTrigger>
            <TabsTrigger 
              value="social" 
              className="text-lg font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Users className="w-6 h-6 mr-2" />
              Social
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="text-lg font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <BookOpen className="w-6 h-6 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger 
              value="celebrations" 
              className="text-lg font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Gift className="w-6 h-6 mr-2" />
              Celebrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-blue-700">Elder Profiles</CardTitle>
                  <CardDescription className="text-lg">
                    Manage elder care preferences and needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={() => setActiveTab("profiles")}
                    size="lg"
                    className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700"
                  >
                    <Users className="w-6 h-6 mr-2" />
                    Manage Profiles
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-green-700">Support Matching</CardTitle>
                  <CardDescription className="text-lg">
                    Connect with compatible volunteers
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={() => setActiveTab("matching")}
                    size="lg"
                    className="w-full h-14 text-lg bg-green-600 hover:bg-green-700"
                  >
                    <Heart className="w-6 h-6 mr-2" />
                    Find Matches
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-purple-700">Visit Coordination</CardTitle>
                  <CardDescription className="text-lg">
                    Schedule and manage visits
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={() => setActiveTab("visits")}
                    size="lg"
                    className="w-full h-14 text-lg bg-purple-600 hover:bg-purple-700"
                  >
                    <Calendar className="w-6 h-6 mr-2" />
                    Schedule Visits
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-orange-700">Social Activities</CardTitle>
                  <CardDescription className="text-lg">
                    Join group activities and events
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={() => setActiveTab("social")}
                    size="lg"
                    className="w-full h-14 text-lg bg-orange-600 hover:bg-orange-700"
                  >
                    <Users className="w-6 h-6 mr-2" />
                    Social Hub
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-teal-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-teal-700">Resources</CardTitle>
                  <CardDescription className="text-lg">
                    Find local senior services
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={() => setActiveTab("resources")}
                    size="lg"
                    className="w-full h-14 text-lg bg-teal-600 hover:bg-teal-700"
                  >
                    <BookOpen className="w-6 h-6 mr-2" />
                    Browse Resources
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-pink-700">Celebrations</CardTitle>
                  <CardDescription className="text-lg">
                    Never miss special occasions
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={() => setActiveTab("celebrations")}
                    size="lg"
                    className="w-full h-14 text-lg bg-pink-600 hover:bg-pink-700"
                  >
                    <Gift className="w-6 h-6 mr-2" />
                    View Celebrations
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profiles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Elder Profile</h2>
                <ElderProfileForm />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Volunteer Profile</h2>
                <VolunteerProfileForm />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="matching">
            <SupportMatching />
          </TabsContent>

          <TabsContent value="visits">
            <VisitCoordination />
          </TabsContent>

          <TabsContent value="social">
            <SocialEngagement />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceDirectory />
          </TabsContent>

          <TabsContent value="celebrations">
            <CelebrationReminders />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
