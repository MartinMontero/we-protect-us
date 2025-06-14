
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, Users, Plus } from 'lucide-react';

const Community = () => {
  return (
    <main id="main-content" className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Map</h1>
          <p className="text-muted-foreground">
            Discover and connect with local community networks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map placeholder */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="mr-2 h-5 w-5" />
                Interactive Community Map
              </CardTitle>
              <CardDescription>
                Visualization of trust networks and community connections coming soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">D3.js visualization will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Local Communities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Downtown Neighbors</h4>
                    <p className="text-sm text-muted-foreground">42 members</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Green Valley Co-op</h4>
                    <p className="text-sm text-muted-foreground">38 members</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Riverside Mutual Aid</h4>
                    <p className="text-sm text-muted-foreground">27 members</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Community;
