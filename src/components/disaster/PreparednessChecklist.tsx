import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Package, AlertTriangle, Plus, Home, Heart, Wrench, Radio, BookOpen, Lightbulb } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PreparednessItem {
  id: string;
  category: string;
  item_name: string;
  recommended_quantity?: string;
  current_quantity?: string;
  expiration_date?: string;
  location_stored?: string;
  notes?: string;
  checked: boolean;
  last_checked_date?: string;
}

const categories = [
  { id: 'water', name: 'Water', icon: Package, color: 'bg-blue-100 text-blue-800' },
  { id: 'food', name: 'Food', icon: Package, color: 'bg-green-100 text-green-800' },
  { id: 'medical', name: 'Medical', icon: Heart, color: 'bg-red-100 text-red-800' },
  { id: 'tools', name: 'Tools', icon: Wrench, color: 'bg-orange-100 text-orange-800' },
  { id: 'communication', name: 'Communication', icon: Radio, color: 'bg-purple-100 text-purple-800' },
  { id: 'shelter', name: 'Shelter', icon: Home, color: 'bg-indigo-100 text-indigo-800' },
  { id: 'documents', name: 'Documents', icon: BookOpen, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'lighting', name: 'Lighting', icon: Lightbulb, color: 'bg-pink-100 text-pink-800' },
  { id: 'sanitation', name: 'Sanitation', icon: Package, color: 'bg-gray-100 text-gray-800' }
];

const defaultItems = {
  water: [
    { name: '1 gallon per person per day (3-day minimum)', recommended: '3 gallons per person' },
    { name: 'Water purification tablets', recommended: '1 bottle' },
    { name: 'Portable water filter', recommended: '1 unit' }
  ],
  food: [
    { name: 'Non-perishable food (3-day supply)', recommended: '9 meals per person' },
    { name: 'Can opener (manual)', recommended: '1 unit' },
    { name: 'Pet food (if applicable)', recommended: '3 days supply' }
  ],
  medical: [
    { name: 'First aid kit', recommended: '1 comprehensive kit' },
    { name: 'Prescription medications', recommended: '7 days supply' },
    { name: 'Emergency medications (insulin, etc.)', recommended: 'As needed' }
  ],
  tools: [
    { name: 'Flashlight', recommended: '1 per person' },
    { name: 'Battery-powered radio', recommended: '1 unit' },
    { name: 'Multi-tool or Swiss Army knife', recommended: '1 unit' },
    { name: 'Duct tape', recommended: '1 roll' },
    { name: 'Plastic sheeting', recommended: '10x10 feet' }
  ],
  communication: [
    { name: 'Cell phone chargers/power bank', recommended: '1 per phone' },
    { name: 'Two-way radios', recommended: '1 pair' },
    { name: 'Emergency contact list', recommended: '1 copy' }
  ]
};

export const PreparednessChecklist: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState('water');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    item_name: '',
    recommended_quantity: '',
    current_quantity: '',
    expiration_date: '',
    location_stored: '',
    notes: ''
  });

  const { data: household } = useQuery({
    queryKey: ['user-household'],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('households')
        .select('*')
        .eq('primary_contact_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    }
  });

  const { data: items = [] } = useQuery({
    queryKey: ['preparedness-items', household?.id],
    queryFn: async () => {
      if (!household?.id) return [];
      const { data, error } = await supabase
        .from('preparedness_items')
        .select('*')
        .eq('household_id', household.id)
        .order('item_name');
      
      if (error) throw error;
      return data as PreparednessItem[];
    },
    enabled: !!household?.id
  });

  const addItemMutation = useMutation({
    mutationFn: async (item: typeof newItem) => {
      if (!household?.id) throw new Error('No household found');
      
      const { data, error } = await supabase
        .from('preparedness_items')
        .insert({
          household_id: household.id,
          category: selectedCategory,
          ...item,
          expiration_date: item.expiration_date || null
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preparedness-items'] });
      setNewItem({
        item_name: '',
        recommended_quantity: '',
        current_quantity: '',
        expiration_date: '',
        location_stored: '',
        notes: ''
      });
      setShowAddForm(false);
      toast({
        title: "Item Added",
        description: "Preparedness item has been added to your checklist.",
      });
    }
  });

  const toggleItemMutation = useMutation({
    mutationFn: async ({ id, checked }: { id: string; checked: boolean }) => {
      const { error } = await supabase
        .from('preparedness_items')
        .update({ 
          checked,
          last_checked_date: checked ? new Date().toISOString().split('T')[0] : null
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preparedness-items'] });
    }
  });

  const categoryItems = items.filter(item => item.category === selectedCategory);
  const categoryInfo = categories.find(cat => cat.id === selectedCategory);
  const IconComponent = categoryInfo?.icon || Package;

  const getExpirationStatus = (expirationDate?: string) => {
    if (!expirationDate) return null;
    
    const expiry = new Date(expirationDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'expired', color: 'bg-red-100 text-red-800', text: 'Expired' };
    if (diffDays <= 30) return { status: 'warning', color: 'bg-yellow-100 text-yellow-800', text: `${diffDays} days left` };
    return { status: 'good', color: 'bg-green-100 text-green-800', text: 'Good' };
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Package className="w-6 h-6 text-green-600" />
            Household Preparedness Checklist
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-3 lg:grid-cols-5 gap-2 h-auto p-2">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            const categoryItemsCount = items.filter(item => item.category === category.id);
            const checkedCount = categoryItemsCount.filter(item => item.checked).length;
            
            return (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex flex-col items-center gap-1 h-16 relative"
              >
                <CategoryIcon className="w-5 h-5" />
                <span className="text-sm">{category.name}</span>
                {categoryItemsCount.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {checkedCount}/{categoryItemsCount.length}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <category.icon className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">{category.name} Supplies</h3>
                  </div>
                  <Button 
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Item Form */}
                {showAddForm && (
                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Item Name *</label>
                          <Input
                            value={newItem.item_name}
                            onChange={(e) => setNewItem(prev => ({ ...prev, item_name: e.target.value }))}
                            placeholder="Enter item name..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Recommended Quantity</label>
                          <Input
                            value={newItem.recommended_quantity}
                            onChange={(e) => setNewItem(prev => ({ ...prev, recommended_quantity: e.target.value }))}
                            placeholder="e.g., 3 gallons, 1 week supply..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Current Quantity</label>
                          <Input
                            value={newItem.current_quantity}
                            onChange={(e) => setNewItem(prev => ({ ...prev, current_quantity: e.target.value }))}
                            placeholder="What you currently have..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Expiration Date</label>
                          <Input
                            type="date"
                            value={newItem.expiration_date}
                            onChange={(e) => setNewItem(prev => ({ ...prev, expiration_date: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Storage Location</label>
                          <Input
                            value={newItem.location_stored}
                            onChange={(e) => setNewItem(prev => ({ ...prev, location_stored: e.target.value }))}
                            placeholder="Where is this stored?"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Notes</label>
                          <Textarea
                            value={newItem.notes}
                            onChange={(e) => setNewItem(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Additional notes..."
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => addItemMutation.mutate(newItem)}
                          disabled={!newItem.item_name || addItemMutation.isPending}
                        >
                          Add Item
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Existing Items */}
                <div className="space-y-3">
                  {categoryItems.map((item) => {
                    const expirationStatus = getExpirationStatus(item.expiration_date);
                    
                    return (
                      <Card key={item.id} className={`p-4 ${item.checked ? 'bg-green-50' : ''}`}>
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={(checked) => 
                              toggleItemMutation.mutate({ id: item.id, checked: !!checked })
                            }
                            className="mt-1"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}>
                                {item.item_name}
                              </h4>
                              {expirationStatus && (
                                <Badge className={expirationStatus.color}>
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {expirationStatus.text}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                              {item.recommended_quantity && (
                                <div>
                                  <span className="font-medium">Recommended:</span> {item.recommended_quantity}
                                </div>
                              )}
                              {item.current_quantity && (
                                <div>
                                  <span className="font-medium">Current:</span> {item.current_quantity}
                                </div>
                              )}
                              {item.location_stored && (
                                <div>
                                  <span className="font-medium">Location:</span> {item.location_stored}
                                </div>
                              )}
                              {item.last_checked_date && (
                                <div>
                                  <span className="font-medium">Last checked:</span> {item.last_checked_date}
                                </div>
                              )}
                            </div>
                            
                            {item.notes && (
                              <p className="text-sm text-gray-600 mt-2">{item.notes}</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* Default recommendations if no items exist */}
                {categoryItems.length === 0 && defaultItems[category.id as keyof typeof defaultItems] && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Recommended items for {category.name}:</h4>
                    {defaultItems[category.id as keyof typeof defaultItems].map((item, index) => (
                      <Card key={index} className="p-3 border-dashed border-gray-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Recommended: {item.recommended}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setNewItem(prev => ({
                                ...prev,
                                item_name: item.name,
                                recommended_quantity: item.recommended
                              }));
                              setShowAddForm(true);
                            }}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
