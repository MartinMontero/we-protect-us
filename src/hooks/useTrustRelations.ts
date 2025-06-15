
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export interface TrustRelation {
  id: string;
  from_user_id: string;
  to_user_id: string;
  trust_level?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useTrustRelations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [relations, setRelations] = useState<TrustRelation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTrustRelations();
    }
  }, [user]);

  const fetchTrustRelations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('trust_relations')
        .select('*')
        .or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRelations(data || []);
    } catch (error) {
      console.error('Error fetching trust relations:', error);
      toast({
        title: "Error",
        description: "Failed to load trust relations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTrustRelation = async (toUserId: string, trustLevel: number, notes?: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('trust_relations')
        .insert({
          from_user_id: user.id,
          to_user_id: toUserId,
          trust_level: trustLevel,
          notes: notes,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Trust relation created successfully",
      });

      fetchTrustRelations();
      return data;
    } catch (error) {
      console.error('Error creating trust relation:', error);
      toast({
        title: "Error",
        description: "Failed to create trust relation",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateTrustRelation = async (id: string, trustLevel: number, notes?: string) => {
    try {
      const { data, error } = await supabase
        .from('trust_relations')
        .update({
          trust_level: trustLevel,
          notes: notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Trust relation updated successfully",
      });

      fetchTrustRelations();
      return data;
    } catch (error) {
      console.error('Error updating trust relation:', error);
      toast({
        title: "Error",
        description: "Failed to update trust relation",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    relations,
    loading,
    fetchTrustRelations,
    createTrustRelation,
    updateTrustRelation,
  };
};
