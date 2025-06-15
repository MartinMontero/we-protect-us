import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Users, Clock, MapPin, Plus, Heart, User } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface TransportationOffer {
  id: string;
  vehicle_type: string;
  seats_available: number;
  pet_friendly: boolean;
  wheelchair_accessible: boolean;
  departure_location: string;
  departure_time?: string;
  destination_area?: string;
  status: string;
  special_requirements?: string;
}

interface TransportationRequest {
  id: string;
  pickup_location: string;
  pickup_time_preferred?: string;
  destination_area: string;
  passengers_count: number;
  pets_count: number;
  wheelchair_needed: boolean;
  medical_priority: boolean;
  special_needs?: string;
  status: string;
}

export const TransportationCoordination: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('requests');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const [newOffer, setNewOffer] = useState({
    vehicle_type: '',
    seats_available: 1,
    pet_friendly: false,
    wheelchair_accessible: false,
    departure_location: '',
    departure_time: '',
    destination_area: '',
    special_requirements: ''
  });

  const [newRequest, setNewRequest] = useState({
    pickup_location: '',
    pickup_time_preferred: '',
    destination_area: '',
    passengers_count: 1,
    pets_count: 0,
    wheelchair_needed: false,
    medical_priority: false,
    special_needs: ''
  });

  const { data: offers = [] } = useQuery({
    queryKey: ['transportation-offers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transportation_offers')
        .select('*')
        .eq('status', 'available')
        .order('departure_time');
      
      if (error) throw error;
      return data as TransportationOffer[];
    }
  });

  const { data: requests = [] } = useQuery({
    queryKey: ['transportation-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transportation_requests')
        .select('*')
        .in('status', ['pending', 'assigned'])
        .order('medical_priority', { ascending: false });
      
      if (error) throw error;
      return data as TransportationRequest[];
    }
  });

  const createOfferMutation = useMutation({
    mutationFn: async (offer: typeof newOffer) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('transportation_offers')
        .insert({
          driver_id: user.id,
          ...offer,
          departure_time: offer.departure_time || null
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transportation-offers'] });
      setShowOfferForm(false);
      setNewOffer({
        vehicle_type: '',
        seats_available: 1,
        pet_friendly: false,
        wheelchair_accessible: false,
        departure_location: '',
        departure_time: '',
        destination_area: '',
        special_requirements: ''
      });
      toast({
        title: "Transportation Offer Created",
        description: "Your offer has been posted successfully.",
      });
    }
  });

  const createRequestMutation = useMutation({
    mutationFn: async (request: typeof newRequest) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('transportation_requests')
        .insert({
          requester_id: user.id,
          ...request,
          pickup_time_preferred: request.pickup_time_preferred || null
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transportation-requests'] });
      setShowRequestForm(false);
      setNewRequest({
        pickup_location: '',
        pickup_time_preferred: '',
        destination_area: '',
        passengers_count: 1,
        pets_count: 0,
        wheelchair_needed: false,
        medical_priority: false,
        special_needs: ''
      });
      toast({
        title: "Transportation Request Created",
        description: "Your request has been posted successfully.",
      });
    }
  });

  const vehicleIcons = {
    car: '🚗',
    suv: '🚙',
    truck: '🚚',
    van: '🚐',
    bus: '🚌',
    motorcycle: '🏍️',
    bicycle: '🚲'
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    available: 'bg-green-100 text-green-800',
    assigned: 'bg-blue-100 text-blue-800',
    in_transit: 'bg-purple-100 text-purple-800',
    completed: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Car className="w-6 h-6 text-purple-600" />
            Transportation Coordination
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Transportation Requests
          </TabsTrigger>
          <TabsTrigger value="offers" className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            Available Rides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Transportation Requests</h3>
                <Button 
                  onClick={() => setShowRequestForm(!showRequestForm)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Request Transportation
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Request Form */}
              {showRequestForm && (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Pickup Location *</label>
                        <Input
                          value={newRequest.pickup_location}
                          onChange={(e) => setNewRequest(prev => ({ ...prev, pickup_location: e.target.value }))}
                          placeholder="Where should you be picked up?"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Destination *</label>
                        <Input
                          value={newRequest.destination_area}
                          onChange={(e) => setNewRequest(prev => ({ ...prev, destination_area: e.target.value }))}
                          placeholder="Where do you need to go?"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Preferred Pickup Time</label>
                        <Input
                          type="datetime-local"
                          value={newRequest.pickup_time_preferred}
                          onChange={(e) => setNewRequest(prev => ({ ...prev, pickup_time_preferred: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Number of Passengers</label>
                        <Select 
                          value={newRequest.passengers_count.toString()} 
                          onValueChange={(value) => setNewRequest(prev => ({ ...prev, passengers_count: parseInt(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Number of Pets</label>
                        <Select 
                          value={newRequest.pets_count.toString()} 
                          onValueChange={(value) => setNewRequest(prev => ({ ...prev, pets_count: parseInt(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[0,1,2,3,4,5].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="wheelchair"
                            checked={newRequest.wheelchair_needed}
                            onCheckedChange={(checked) => setNewRequest(prev => ({ ...prev, wheelchair_needed: !!checked }))}
                          />
                          <label htmlFor="wheelchair">Wheelchair accessible vehicle needed</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="medical"
                            checked={newRequest.medical_priority}
                            onCheckedChange={(checked) => setNewRequest(prev => ({ ...prev, medical_priority: !!checked }))}
                          />
                          <label htmlFor="medical">Medical emergency priority</label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Special Needs</label>
                      <Textarea
                        value={newRequest.special_needs}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, special_needs: e.target.value }))}
                        placeholder="Any special requirements or information..."
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => createRequestMutation.mutate(newRequest)}
                        disabled={!newRequest.pickup_location || !newRequest.destination_area || createRequestMutation.isPending}
                      >
                        Submit Request
                      </Button>
                      <Button variant="outline" onClick={() => setShowRequestForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Existing Requests */}
              <div className="space-y-3">
                {requests.map((request) => (
                  <Card key={request.id} className="p-4 border-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={statusColors[request.status as keyof typeof statusColors]}>
                            {request.status}
                          </Badge>
                          {request.medical_priority && (
                            <Badge variant="destructive">
                              <Heart className="w-3 h-3 mr-1" />
                              Medical Priority
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              From: {request.pickup_location}
                            </p>
                            <p className="font-medium flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              To: {request.destination_area}
                            </p>
                          </div>
                          <div>
                            <p><span className="font-medium">Passengers:</span> {request.passengers_count}</p>
                            {request.pets_count > 0 && (
                              <p><span className="font-medium">Pets:</span> {request.pets_count}</p>
                            )}
                            {request.pickup_time_preferred && (
                              <p className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(request.pickup_time_preferred).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {request.wheelchair_needed && (
                            <Badge variant="outline" className="text-xs">♿ Wheelchair Accessible</Badge>
                          )}
                        </div>
                        
                        {request.special_needs && (
                          <p className="text-sm text-gray-600 mt-2">{request.special_needs}</p>
                        )}
                      </div>
                      
                      <Button size="sm" className="ml-4">
                        Offer Ride
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Available Rides</h3>
                <Button 
                  onClick={() => setShowOfferForm(!showOfferForm)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Offer Transportation
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Offer Form */}
              {showOfferForm && (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Vehicle Type *</label>
                        <Select 
                          value={newOffer.vehicle_type} 
                          onValueChange={(value) => setNewOffer(prev => ({ ...prev, vehicle_type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="car">🚗 Car</SelectItem>
                            <SelectItem value="suv">🚙 SUV</SelectItem>
                            <SelectItem value="truck">🚚 Truck</SelectItem>
                            <SelectItem value="van">🚐 Van</SelectItem>
                            <SelectItem value="bus">🚌 Bus</SelectItem>
                            <SelectItem value="motorcycle">🏍️ Motorcycle</SelectItem>
                            <SelectItem value="bicycle">🚲 Bicycle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Available Seats</label>
                        <Select 
                          value={newOffer.seats_available.toString()} 
                          onValueChange={(value) => setNewOffer(prev => ({ ...prev, seats_available: parseInt(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8,10,15,20].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Departure Location *</label>
                        <Input
                          value={newOffer.departure_location}
                          onChange={(e) => setNewOffer(prev => ({ ...prev, departure_location: e.target.value }))}
                          placeholder="Where will you depart from?"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Destination Area</label>
                        <Input
                          value={newOffer.destination_area}
                          onChange={(e) => setNewOffer(prev => ({ ...prev, destination_area: e.target.value }))}
                          placeholder="General destination area"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Departure Time</label>
                        <Input
                          type="datetime-local"
                          value={newOffer.departure_time}
                          onChange={(e) => setNewOffer(prev => ({ ...prev, departure_time: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="pet-friendly"
                            checked={newOffer.pet_friendly}
                            onCheckedChange={(checked) => setNewOffer(prev => ({ ...prev, pet_friendly: !!checked }))}
                          />
                          <label htmlFor="pet-friendly">Pet friendly</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="wheelchair-accessible"
                            checked={newOffer.wheelchair_accessible}
                            onCheckedChange={(checked) => setNewOffer(prev => ({ ...prev, wheelchair_accessible: !!checked }))}
                          />
                          <label htmlFor="wheelchair-accessible">Wheelchair accessible</label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Special Requirements</label>
                      <Textarea
                        value={newOffer.special_requirements}
                        onChange={(e) => setNewOffer(prev => ({ ...prev, special_requirements: e.target.value }))}
                        placeholder="Any special requirements or conditions..."
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => createOfferMutation.mutate(newOffer)}
                        disabled={!newOffer.vehicle_type || !newOffer.departure_location || createOfferMutation.isPending}
                      >
                        Offer Transportation
                      </Button>
                      <Button variant="outline" onClick={() => setShowOfferForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Existing Offers */}
              <div className="space-y-3">
                {offers.map((offer) => (
                  <Card key={offer.id} className="p-4 border-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{vehicleIcons[offer.vehicle_type as keyof typeof vehicleIcons]}</span>
                          <span className="font-semibold">{offer.vehicle_type.toUpperCase()}</span>
                          <Badge className={statusColors[offer.status as keyof typeof statusColors]}>
                            {offer.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              From: {offer.departure_location}
                            </p>
                            {offer.destination_area && (
                              <p className="font-medium flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                To: {offer.destination_area}
                              </p>
                            )}
                          </div>
                          <div>
                            <p><span className="font-medium">Seats:</span> {offer.seats_available}</p>
                            {offer.departure_time && (
                              <p className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(offer.departure_time).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {offer.pet_friendly && (
                            <Badge variant="outline" className="text-xs">🐕 Pet Friendly</Badge>
                          )}
                          {offer.wheelchair_accessible && (
                            <Badge variant="outline" className="text-xs">♿ Wheelchair Accessible</Badge>
                          )}
                        </div>
                        
                        {offer.special_requirements && (
                          <p className="text-sm text-gray-600 mt-2">{offer.special_requirements}</p>
                        )}
                      </div>
                      
                      <Button size="sm" className="ml-4">
                        Request Ride
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
