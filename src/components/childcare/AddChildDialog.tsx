
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Calendar, Heart, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AddChildDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChildAdded: () => void;
}

export const AddChildDialog: React.FC<AddChildDialogProps> = ({
  open,
  onOpenChange,
  onChildAdded,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    birthDate: '',
    gender: '',
    allergies: '',
    medicalConditions: '',
    dietaryRestrictions: '',
    favoriteActivities: '',
    emergencyInstructions: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to add child profiles.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('children')
        .insert({
          parent_id: user.id,
          first_name: formData.firstName,
          birth_date: formData.birthDate,
          gender: formData.gender || null,
          allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
          medical_conditions: formData.medicalConditions ? formData.medicalConditions.split(',').map(s => s.trim()) : [],
          dietary_restrictions: formData.dietaryRestrictions ? formData.dietaryRestrictions.split(',').map(s => s.trim()) : [],
          favorite_activities: formData.favoriteActivities ? formData.favoriteActivities.split(',').map(s => s.trim()) : [],
          emergency_instructions: formData.emergencyInstructions || null,
        });

      if (error) throw error;

      toast({
        title: "Child profile created",
        description: `${formData.firstName}'s profile has been added successfully.`,
      });

      onOpenChange(false);
      onChildAdded();
      setFormData({
        firstName: '',
        birthDate: '',
        gender: '',
        allergies: '',
        medicalConditions: '',
        dietaryRestrictions: '',
        favoriteActivities: '',
        emergencyInstructions: '',
      });
    } catch (error) {
      toast({
        title: "Error creating profile",
        description: "Failed to create child profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Add Child Profile
          </DialogTitle>
          <DialogDescription>
            Create a secure profile with medical and care information
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                First Name *
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Birth Date *
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Medical Information */}
          <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-semibold">Medical & Safety Information</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies (comma-separated)</Label>
              <Input
                id="allergies"
                placeholder="e.g., peanuts, shellfish, dairy"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medical">Medical Conditions (comma-separated)</Label>
              <Input
                id="medical"
                placeholder="e.g., asthma, diabetes, ADHD"
                value={formData.medicalConditions}
                onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency">Emergency Instructions</Label>
              <Textarea
                id="emergency"
                placeholder="Important medical info, emergency procedures, medications..."
                value={formData.emergencyInstructions}
                onChange={(e) => setFormData({ ...formData, emergencyInstructions: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dietary">Dietary Restrictions (comma-separated)</Label>
              <Input
                id="dietary"
                placeholder="e.g., vegetarian, gluten-free, kosher"
                value={formData.dietaryRestrictions}
                onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activities" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Favorite Activities (comma-separated)
              </Label>
              <Input
                id="activities"
                placeholder="e.g., reading, playground, art, music"
                value={formData.favoriteActivities}
                onChange={(e) => setFormData({ ...formData, favoriteActivities: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Add Child'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
