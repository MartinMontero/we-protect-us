
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Phone, Mail, Globe, MapPin, Star, Car, Utensils, Heart, Home, DollarSign, Shield, Laptop, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SeniorResource {
  id: string;
  resource_name: string;
  category: string;
  description: string;
  contact_phone: string;
  contact_email: string;
  website_url: string;
  address: string;
  service_area: string[];
  eligibility_requirements: string;
  cost_info: string;
  hours_of_operation: any;
  languages_supported: string[];
  accessibility_features: string[];
  rating: number;
  verified: boolean;
}

export const ResourceDirectory: React.FC = () => {
  const [resources, setResources] = useState<SeniorResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<SeniorResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories', icon: Heart },
    { value: 'transportation', label: 'Transportation', icon: Car },
    { value: 'meals', label: 'Meals & Nutrition', icon: Utensils },
    { value: 'medical', label: 'Medical Services', icon: Heart },
    { value: 'home_maintenance', label: 'Home Maintenance', icon: Home },
    { value: 'benefits', label: 'Benefits & Financial', icon: DollarSign },
    { value: 'social_services', label: 'Social Services', icon: Users },
    { value: 'emergency', label: 'Emergency Services', icon: Shield },
    { value: 'technology', label: 'Technology Support', icon: Laptop }
  ];

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchTerm, selectedCategory]);

  const loadResources = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('senior_resources')
        .select('*')
        .order('resource_name');

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.resource_name.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.service_area.some(area => area.toLowerCase().includes(searchLower))
      );
    }

    setFilteredResources(filtered);
  };

  const getCategoryInfo = (category: string) => {
    return categories.find(cat => cat.value === category) || categories[0];
  };

  const getCategoryIcon = (category: string) => {
    const categoryInfo = getCategoryInfo(category);
    const IconComponent = categoryInfo.icon;
    return <IconComponent className="w-5 h-5" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      transportation: 'bg-blue-100 text-blue-800',
      meals: 'bg-green-100 text-green-800',
      medical: 'bg-red-100 text-red-800',
      home_maintenance: 'bg-orange-100 text-orange-800',
      benefits: 'bg-yellow-100 text-yellow-800',
      social_services: 'bg-purple-100 text-purple-800',
      emergency: 'bg-red-200 text-red-900',
      technology: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  // Sample data for demonstration
  const sampleResources: SeniorResource[] = [
    {
      id: '1',
      resource_name: 'Senior Ride Service',
      category: 'transportation',
      description: 'Door-to-door transportation service for medical appointments, grocery shopping, and social activities.',
      contact_phone: '(555) 123-4567',
      contact_email: 'info@seniorride.org',
      website_url: 'https://seniorride.org',
      address: '123 Main St, Community Center',
      service_area: ['Downtown', 'Westside', 'Eastside'],
      eligibility_requirements: 'Age 60+, limited mobility',
      cost_info: '$5 per trip, sliding scale available',
      hours_of_operation: { monday: '8am-6pm', tuesday: '8am-6pm' },
      languages_supported: ['English', 'Spanish'],
      accessibility_features: ['Wheelchair accessible', 'Walker friendly'],
      rating: 4.5,
      verified: true
    },
    {
      id: '2',
      resource_name: 'Meals on Wheels',
      category: 'meals',
      description: 'Hot, nutritious meals delivered daily to seniors who have difficulty shopping or cooking.',
      contact_phone: '(555) 234-5678',
      contact_email: 'meals@mealsonwheels.org',
      website_url: 'https://mealsonwheels.org',
      address: '456 Community Ave',
      service_area: ['Citywide'],
      eligibility_requirements: 'Age 60+, homebound or limited mobility',
      cost_info: 'Suggested donation $3 per meal',
      hours_of_operation: { monday: '10am-2pm', tuesday: '10am-2pm' },
      languages_supported: ['English', 'Spanish', 'Chinese'],
      accessibility_features: ['Dietary accommodations', 'Cultural meals'],
      rating: 4.8,
      verified: true
    }
  ];

  // Use sample data if no resources loaded
  const displayResources = filteredResources.length > 0 ? filteredResources : sampleResources.filter(resource => {
    if (selectedCategory !== 'all' && resource.category !== selectedCategory) return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return resource.resource_name.toLowerCase().includes(searchLower) ||
             resource.description.toLowerCase().includes(searchLower);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Search className="w-10 h-10 text-blue-600" />
          Senior Resource Directory
        </h2>
        <p className="text-xl text-gray-600">
          Find local services, support, and assistance tailored for seniors
        </p>
      </div>

      {/* Search and Filter Controls */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-lg font-medium">Search Resources</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, description, or area..."
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-lg font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => {
                    const IconComponent = category.icon;
                    return (
                      <SelectItem key={category.value} value={category.value} className="text-lg">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5" />
                          {category.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayResources.map((resource) => (
          <Card key={resource.id} className="border-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  {getCategoryIcon(resource.category)}
                  {resource.resource_name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {resource.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge className={getCategoryColor(resource.category)}>
                    {getCategoryInfo(resource.category).label}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mt-2">
                {renderRating(resource.rating)}
                <span className="text-lg font-semibold ml-2">{resource.rating.toFixed(1)}</span>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-4">
              <p className="text-lg text-gray-700">{resource.description}</p>
              
              <div className="space-y-3">
                {resource.contact_phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <a 
                      href={`tel:${resource.contact_phone}`}
                      className="text-lg text-blue-600 hover:underline"
                    >
                      {resource.contact_phone}
                    </a>
                  </div>
                )}
                
                {resource.contact_email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <a 
                      href={`mailto:${resource.contact_email}`}
                      className="text-lg text-blue-600 hover:underline"
                    >
                      {resource.contact_email}
                    </a>
                  </div>
                )}
                
                {resource.website_url && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-purple-600" />
                    <a 
                      href={resource.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                
                {resource.address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="text-lg">{resource.address}</span>
                  </div>
                )}
              </div>

              {resource.service_area && resource.service_area.length > 0 && (
                <div className="space-y-2">
                  <span className="font-semibold text-lg">Service Areas:</span>
                  <div className="flex flex-wrap gap-2">
                    {resource.service_area.map((area, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {resource.cost_info && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <span className="font-semibold text-lg text-green-800">Cost: </span>
                  <span className="text-lg text-green-700">{resource.cost_info}</span>
                </div>
              )}

              {resource.eligibility_requirements && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <span className="font-semibold text-lg text-blue-800">Eligibility: </span>
                  <span className="text-lg text-blue-700">{resource.eligibility_requirements}</span>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  size="lg"
                  className="flex-1 h-12 text-lg bg-blue-600 hover:bg-blue-700"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 text-lg border-2"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {displayResources.length === 0 && !loading && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No resources found</h3>
            <p className="text-xl text-gray-500">
              Try adjusting your search terms or category filter
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
