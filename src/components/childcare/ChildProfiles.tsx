
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, User, AlertTriangle, Heart, Calendar } from 'lucide-react';
import { AddChildDialog } from './AddChildDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Child {
  id: string;
  first_name: string;
  birth_date: string;
  allergies: string[];
  medical_conditions: string[];
  dietary_restrictions: string[];
  favorite_activities: string[];
  emergency_instructions: string;
}

export const ChildProfiles: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', user.id)
        .order('birth_date', { ascending: false });

      if (error) throw error;
      setChildren(data || []);
    } catch (error) {
      toast({
        title: "Error loading children",
        description: "Failed to load child profiles.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  if (loading) {
    return <div className="text-center py-8">Loading child profiles...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Child Profiles</h2>
          <p className="text-gray-600">Manage your children's information and medical details</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Child
        </Button>
      </div>

      {/* Children Grid */}
      {children.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No children added yet</h3>
            <p className="text-gray-600 mb-4">
              Add your child's profile to start using the childcare cooperation system
            </p>
            <Button onClick={() => setShowAddDialog(true)}>
              Add Your First Child
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => (
            <Card key={child.id} className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {child.first_name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {calculateAge(child.birth_date)} years old
                  <span className="text-xs">({format(new Date(child.birth_date), 'MMM d, yyyy')})</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Medical Alerts */}
                {(child.allergies?.length > 0 || child.medical_conditions?.length > 0) && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium text-sm">Medical Alerts</span>
                    </div>
                    <div className="space-y-1">
                      {child.allergies?.map((allergy, index) => (
                        <Badge key={index} variant="destructive" className="mr-1">
                          Allergy: {allergy}
                        </Badge>
                      ))}
                      {child.medical_conditions?.map((condition, index) => (
                        <Badge key={index} variant="secondary" className="mr-1 bg-orange-100 text-orange-800">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dietary Restrictions */}
                {child.dietary_restrictions?.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Heart className="w-4 h-4" />
                      <span className="font-medium text-sm">Dietary</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {child.dietary_restrictions.map((restriction, index) => (
                        <Badge key={index} variant="outline" className="border-blue-200">
                          {restriction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Favorite Activities */}
                {child.favorite_activities?.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600">
                      <Heart className="w-4 h-4" />
                      <span className="font-medium text-sm">Loves</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {child.favorite_activities.slice(0, 3).map((activity, index) => (
                        <Badge key={index} variant="outline" className="border-green-200">
                          {activity}
                        </Badge>
                      ))}
                      {child.favorite_activities.length > 3 && (
                        <Badge variant="outline" className="border-gray-200">
                          +{child.favorite_activities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Emergency Instructions */}
                {child.emergency_instructions && (
                  <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                    <p className="text-xs font-medium text-red-800 mb-1">Emergency Instructions:</p>
                    <p className="text-xs text-red-700">{child.emergency_instructions}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddChildDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onChildAdded={loadChildren}
      />
    </div>
  );
};
