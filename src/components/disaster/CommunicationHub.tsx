
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Radio, Satellite, Wifi, Phone, Signal, MapPin, Battery, Users, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CommunicationNode {
  id: string;
  node_type: string;
  callsign?: string;
  frequency_bands?: string[];
  coverage_radius_miles?: number;
  location_description: string;
  power_source: string;
  backup_power_hours?: number;
  operational_status: string;
  capabilities?: string[];
  access_level: string;
}

export const CommunicationHub: React.FC = () => {
  const [selectedNodeType, setSelectedNodeType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: nodes = [] } = useQuery({
    queryKey: ['communication-nodes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communication_nodes')
        .select('*')
        .order('location_description');
      
      if (error) throw error;
      return data as CommunicationNode[];
    }
  });

  const nodeIcons = {
    ham_radio: Radio,
    mesh_wifi: Wifi,
    satellite: Satellite,
    cellular_repeater: Signal,
    emergency_phone: Phone
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    standby: 'bg-yellow-100 text-yellow-800',
    maintenance: 'bg-orange-100 text-orange-800',
    offline: 'bg-red-100 text-red-800'
  };

  const powerSourceColors = {
    grid: 'bg-blue-100 text-blue-800',
    battery: 'bg-yellow-100 text-yellow-800',
    generator: 'bg-orange-100 text-orange-800',
    solar: 'bg-green-100 text-green-800'
  };

  const accessLevelColors = {
    public: 'bg-green-100 text-green-800',
    emergency_only: 'bg-yellow-100 text-yellow-800',
    licensed_only: 'bg-orange-100 text-orange-800',
    private: 'bg-red-100 text-red-800'
  };

  const filteredNodes = nodes.filter(node => {
    const matchesSearch = node.location_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.callsign?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedNodeType === 'all' || node.node_type === selectedNodeType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Radio className="w-6 h-6 text-purple-600" />
            Emergency Communication Network
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="network" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="network">Communication Network</TabsTrigger>
          <TabsTrigger value="frequencies">Frequency Guide</TabsTrigger>
          <TabsTrigger value="protocols">Emergency Protocols</TabsTrigger>
          <TabsTrigger value="offline">Offline Options</TabsTrigger>
        </TabsList>

        <TabsContent value="network">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Available Communication Nodes</h3>
                <div className="flex gap-4">
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search nodes..."
                    className="w-64"
                  />
                  <Select value={selectedNodeType} onValueChange={setSelectedNodeType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Node type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="ham_radio">Ham Radio</SelectItem>
                      <SelectItem value="mesh_wifi">Mesh WiFi</SelectItem>
                      <SelectItem value="satellite">Satellite</SelectItem>
                      <SelectItem value="cellular_repeater">Cell Repeater</SelectItem>
                      <SelectItem value="emergency_phone">Emergency Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNodes.map((node) => {
                  const IconComponent = nodeIcons[node.node_type as keyof typeof nodeIcons] || Radio;
                  
                  return (
                    <Card key={node.id} className="border-2 hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <IconComponent className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">
                              {node.node_type.replace('_', ' ').toUpperCase()}
                            </h4>
                            {node.callsign && (
                              <p className="text-sm font-mono text-blue-600">{node.callsign}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <Badge className={statusColors[node.operational_status as keyof typeof statusColors]}>
                            {node.operational_status}
                          </Badge>
                          <Badge className={accessLevelColors[node.access_level as keyof typeof accessLevelColors]}>
                            {node.access_level.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="text-sm space-y-1 mb-3">
                          <p className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {node.location_description}
                          </p>
                          <p className="flex items-center gap-1">
                            <Battery className="w-3 h-3" />
                            {node.power_source}
                            {node.backup_power_hours && ` (${node.backup_power_hours}h backup)`}
                          </p>
                          {node.coverage_radius_miles && (
                            <p className="flex items-center gap-1">
                              <Signal className="w-3 h-3" />
                              {node.coverage_radius_miles} mile range
                            </p>
                          )}
                        </div>
                        
                        {node.frequency_bands && node.frequency_bands.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-gray-600 mb-1">Frequencies:</p>
                            <div className="flex flex-wrap gap-1">
                              {node.frequency_bands.map((freq, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {freq}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {node.capabilities && node.capabilities.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-gray-600 mb-1">Capabilities:</p>
                            <div className="flex flex-wrap gap-1">
                              {node.capabilities.map((capability, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {capability.replace('_', ' ')}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <Button size="sm" className="w-full">
                          Contact Operator
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequencies">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Frequency Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Radio className="w-4 h-4" />
                    Amateur Radio Emergency Frequencies
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="font-mono font-medium">146.52 MHz</span> - National Simplex Calling
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="font-mono font-medium">146.55 MHz</span> - Emergency Coordination
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="font-mono font-medium">3.965 MHz</span> - Regional Emergency Net
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="font-mono font-medium">7.265 MHz</span> - Health & Welfare Net
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Signal className="w-4 h-4" />
                    Public Service Frequencies
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="font-mono font-medium">162.400 MHz</span> - Weather Radio (WX1)
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="font-mono font-medium">162.550 MHz</span> - Weather Radio (WX2)
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="font-mono font-medium">462.675 MHz</span> - FRS Channel 1
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="font-mono font-medium">462.725 MHz</span> - FRS Channel 3
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protocols">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Communication Protocols</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Emergency Radio Protocol
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-red-700">
                    <li>Listen before transmitting</li>
                    <li>Identify yourself with call sign</li>
                    <li>State "Emergency Traffic" if life-threatening</li>
                    <li>Give your location first</li>
                    <li>Describe the emergency briefly</li>
                    <li>Request specific assistance needed</li>
                    <li>Repeat critical information</li>
                  </ol>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Message Priority Levels</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium text-red-600">EMERGENCY:</span> Life threatening</div>
                      <div><span className="font-medium text-orange-600">PRIORITY:</span> Important, time-sensitive</div>
                      <div><span className="font-medium text-yellow-600">WELFARE:</span> Health & welfare inquiries</div>
                      <div><span className="font-medium text-gray-600">ROUTINE:</span> All other traffic</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Phonetic Alphabet</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div>A - Alpha</div><div>N - November</div>
                      <div>B - Bravo</div><div>O - Oscar</div>
                      <div>C - Charlie</div><div>P - Papa</div>
                      <div>D - Delta</div><div>Q - Quebec</div>
                      <div>E - Echo</div><div>R - Romeo</div>
                      <div>F - Foxtrot</div><div>S - Sierra</div>
                      <div>G - Golf</div><div>T - Tango</div>
                      <div>H - Hotel</div><div>U - Uniform</div>
                      <div>I - India</div><div>V - Victor</div>
                      <div>J - Juliet</div><div>W - Whiskey</div>
                      <div>K - Kilo</div><div>X - X-ray</div>
                      <div>L - Lima</div><div>Y - Yankee</div>
                      <div>M - Mike</div><div>Z - Zulu</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offline">
          <Card>
            <CardHeader>
              <CardTitle>Offline Communication Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Wifi className="w-4 h-4" />
                    Mesh Network Setup
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium">Device-to-Device Mesh</p>
                      <p className="text-gray-600">Connect phones directly using apps like Bridgefy or FireChat when cellular is down</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium">WiFi Mesh Networks</p>
                      <p className="text-gray-600">Set up local WiFi hotspots that can relay messages between devices</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium">LoRa Networks</p>
                      <p className="text-gray-600">Long-range, low-power radio communication for text messaging</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Physical Communication Methods
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium">Message Boards</p>
                      <p className="text-gray-600">Community bulletin boards at key locations for posting and finding information</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium">Runner Networks</p>
                      <p className="text-gray-600">Organized messenger systems for carrying information between locations</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium">Visual Signals</p>
                      <p className="text-gray-600">Flags, lights, and smoke signals for basic status communication</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
