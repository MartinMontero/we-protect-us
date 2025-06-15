
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Gift, Calendar, Heart, Cake, PartyPopper, Bell, Plus, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface CelebrationReminder {
  id: string;
  celebration_type: string;
  title: string;
  celebration_date: string;
  description: string;
  reminder_days_before: number[];
  is_recurring: boolean;
  recurring_interval: string;
  elder_profiles?: { full_name: string };
}

export const CelebrationReminders: React.FC = () => {
  const [reminders, setReminders] = useState<CelebrationReminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    elder_id: '',
    celebration_type: '',
    title: '',
    celebration_date: '',
    description: '',
    reminder_days_before: [7, 3, 1],
    is_recurring: false,
    recurring_interval: 'yearly'
  });
  const { toast } = useToast();

  const celebrationTypes = [
    { value: 'birthday', label: 'Birthday', icon: '🎂', color: 'bg-pink-100 text-pink-800' },
    { value: 'anniversary', label: 'Anniversary', icon: '💕', color: 'bg-red-100 text-red-800' },
    { value: 'holiday', label: 'Holiday', icon: '🎄', color: 'bg-green-100 text-green-800' },
    { value: 'personal_milestone', label: 'Personal Milestone', icon: '🏆', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'family_event', label: 'Family Event', icon: '👨‍👩‍👧‍👦', color: 'bg-blue-100 text-blue-800' }
  ];

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('celebration_reminders')
        .select(`
          *,
          elder_profiles!inner(full_name)
        `)
        .or(`elder_profiles.elder_id.eq.${user.id},notification_recipients.cs.{${user.id}}`)
        .order('celebration_date', { ascending: true });

      if (error) throw error;
      setReminders(data || []);
    } catch (error) {
      console.error('Error loading reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const createReminder = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('celebration_reminders')
        .insert({
          ...newReminder,
          celebration_date: new Date(newReminder.celebration_date).toISOString().split('T')[0],
          notification_recipients: [user.id]
        });

      if (error) throw error;

      toast({
        title: "Celebration reminder created",
        description: "You'll receive notifications before this special day!",
      });

      setShowCreateForm(false);
      setNewReminder({
        elder_id: '',
        celebration_type: '',
        title: '',
        celebration_date: '',
        description: '',
        reminder_days_before: [7, 3, 1],
        is_recurring: false,
        recurring_interval: 'yearly'
      });
      loadReminders();
    } catch (error) {
      toast({
        title: "Error creating reminder",
        description: "Failed to create celebration reminder. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCelebrationTypeInfo = (type: string) => {
    return celebrationTypes.find(ct => ct.value === type) || celebrationTypes[0];
  };

  const getDaysUntilCelebration = (date: string) => {
    const celebrationDate = new Date(date);
    const today = new Date();
    const diffTime = celebrationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Sample data for demonstration
  const sampleReminders: CelebrationReminder[] = [
    {
      id: '1',
      celebration_type: 'birthday',
      title: "Margaret's 85th Birthday",
      celebration_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days from now
      description: 'A wonderful celebration for Margaret who loves gardening and classical music.',
      reminder_days_before: [7, 3, 1],
      is_recurring: true,
      recurring_interval: 'yearly',
      elder_profiles: { full_name: 'Margaret Smith' }
    },
    {
      id: '2',
      celebration_type: 'anniversary',
      title: '60th Wedding Anniversary',
      celebration_date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 20 days from now
      description: 'Diamond anniversary celebration for John and Mary.',
      reminder_days_before: [14, 7, 3, 1],
      is_recurring: true,
      recurring_interval: 'yearly',
      elder_profiles: { full_name: 'John & Mary Johnson' }
    }
  ];

  // Use sample data if no reminders loaded
  const displayReminders = reminders.length > 0 ? reminders : sampleReminders;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Gift className="w-10 h-10 text-pink-600" />
            Celebration Reminders
          </h2>
          <p className="text-xl text-gray-600 mt-2">
            Never miss a special moment - birthdays, anniversaries, and milestones
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          size="lg"
          className="h-14 px-8 text-lg bg-pink-600 hover:bg-pink-700"
        >
          <Plus className="w-6 h-6 mr-2" />
          Add Celebration
        </Button>
      </div>

      {showCreateForm && (
        <Card className="border-2 border-pink-200 shadow-lg">
          <CardHeader className="bg-pink-50">
            <CardTitle className="text-2xl font-bold text-pink-800">Create Celebration Reminder</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-lg font-medium">Celebration Type</Label>
                <Select value={newReminder.celebration_type} onValueChange={(value) => setNewReminder(prev => ({ ...prev, celebration_type: value }))}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select celebration type" />
                  </SelectTrigger>
                  <SelectContent>
                    {celebrationTypes.map(type => (
                      <SelectItem key={type.value} value={type.value} className="text-lg">
                        {type.icon} {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Celebration Date</Label>
                <Input
                  type="date"
                  value={newReminder.celebration_date}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, celebration_date: e.target.value }))}
                  className="h-12 text-lg"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-lg font-medium">Title</Label>
                <Input
                  value={newReminder.title}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                  className="h-12 text-lg"
                  placeholder="e.g., Margaret's 85th Birthday"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-medium">Description</Label>
              <Textarea
                value={newReminder.description}
                onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-24 text-lg"
                placeholder="Special notes about this celebration..."
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="is_recurring"
                checked={newReminder.is_recurring}
                onChange={(e) => setNewReminder(prev => ({ ...prev, is_recurring: e.target.checked }))}
                className="w-5 h-5"
              />
              <Label htmlFor="is_recurring" className="text-lg">
                Recurring celebration (happens every year)
              </Label>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={createReminder}
                disabled={loading}
                size="lg"
                className="flex-1 h-12 text-lg bg-pink-600 hover:bg-pink-700"
              >
                {loading ? 'Creating...' : 'Create Reminder'}
              </Button>
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
                size="lg"
                className="h-12 text-lg border-2"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayReminders.map((reminder) => {
          const typeInfo = getCelebrationTypeInfo(reminder.celebration_type);
          const daysUntil = getDaysUntilCelebration(reminder.celebration_date);
          const isUpcoming = daysUntil <= 7 && daysUntil >= 0;
          const isPast = daysUntil < 0;
          
          return (
            <Card key={reminder.id} className={`border-2 shadow-lg hover:shadow-xl transition-shadow ${isUpcoming ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'}`}>
              <CardHeader className={`${isUpcoming ? 'bg-yellow-100' : 'bg-gradient-to-r from-pink-50 to-purple-50'}`}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">{typeInfo.icon}</span>
                    {reminder.title}
                  </CardTitle>
                  <Badge className={typeInfo.color}>
                    {typeInfo.label}
                  </Badge>
                </div>
                
                {isUpcoming && (
                  <div className="flex items-center gap-2 mt-2">
                    <Bell className="w-5 h-5 text-orange-600" />
                    <span className="text-lg font-semibold text-orange-800">
                      {daysUntil === 0 ? 'Today!' : `${daysUntil} days away`}
                    </span>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-medium">
                      {format(new Date(reminder.celebration_date), 'MMMM d, yyyy')}
                    </span>
                  </div>
                  
                  {reminder.elder_profiles && (
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-red-600" />
                      <span className="text-lg">
                        {reminder.elder_profiles.full_name}
                      </span>
                    </div>
                  )}
                  
                  {reminder.is_recurring && (
                    <div className="flex items-center gap-3">
                      <PartyPopper className="w-5 h-5 text-purple-600" />
                      <span className="text-lg">Annual celebration</span>
                    </div>
                  )}
                </div>

                {reminder.description && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg text-gray-700">{reminder.description}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-lg font-medium">Reminder Schedule:</span>
                  <div className="flex flex-wrap gap-2">
                    {reminder.reminder_days_before.map((days, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {days === 1 ? '1 day before' : `${days} days before`}
                      </Badge>
                    ))}
                  </div>
                </div>

                {!isPast && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      size="lg"
                      className="flex-1 h-12 text-lg bg-pink-600 hover:bg-pink-700"
                    >
                      <Bell className="w-5 h-5 mr-2" />
                      Set Reminder
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 text-lg border-2"
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      Plan Celebration
                    </Button>
                  </div>
                )}

                {isPast && (
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <span className="text-lg text-gray-600">
                      This celebration has passed
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {displayReminders.length === 0 && !loading && (
        <Card className="text-center py-12">
          <CardContent>
            <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No celebrations scheduled</h3>
            <p className="text-xl text-gray-500">Add your first celebration reminder to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
