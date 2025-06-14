
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Plus, HandHeart, Gift } from 'lucide-react';

const MutualAid = () => {
  const requests = [
    {
      type: 'request',
      title: 'Need help with grocery pickup',
      category: 'Transportation',
      community: 'Downtown Neighbors',
      time: '2 hours ago'
    },
    {
      type: 'offer',
      title: 'Free homemade meals available',
      category: 'Food',
      community: 'Green Valley Co-op',
      time: '4 hours ago'
    },
    {
      type: 'request',
      title: 'Looking for childcare swap',
      category: 'Childcare',
      community: 'Riverside Mutual Aid',
      time: '1 day ago'
    }
  ];

  return (
    <main id="main-content" className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mutual Aid</h1>
          <p className="text-muted-foreground">
            Share resources and support each other in your community
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post Request
          </Button>
          <Button variant="outline">
            <Gift className="mr-2 h-4 w-4" />
            Offer Help
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request, index) => (
            <Card key={index} className="transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-full ${
                    request.type === 'offer' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {request.type === 'offer' ? (
                      <Gift className="h-4 w-4" />
                    ) : (
                      <HandHeart className="h-4 w-4" />
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.type === 'offer'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {request.type === 'offer' ? 'Offering' : 'Requesting'}
                  </span>
                </div>
                <CardTitle className="text-lg">{request.title}</CardTitle>
                <CardDescription>
                  {request.category} • {request.community}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{request.time}</span>
                  <Button size="sm">
                    {request.type === 'offer' ? 'Accept' : 'Offer Help'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MutualAid;
