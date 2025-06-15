
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export interface TimeBankTransaction {
  id: string;
  giver_id: string;
  receiver_id: string;
  hours: number;
  skill_category: string;
  description?: string;
  mutual_aid_post_id?: string;
  verified_by?: string;
  created_at: string;
}

export const useTimeBankTransactions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<TimeBankTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('time_bank_transactions')
        .select('*')
        .or(`giver_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Error",
        description: "Failed to load transactions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (
    receiverId: string,
    hours: number,
    skillCategory: string,
    description?: string,
    mutualAidPostId?: string
  ) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('time_bank_transactions')
        .insert({
          giver_id: user.id,
          receiver_id: receiverId,
          hours: hours,
          skill_category: skillCategory,
          description: description,
          mutual_aid_post_id: mutualAidPostId,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Time bank transaction recorded successfully",
      });

      fetchTransactions();
      return data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast({
        title: "Error",
        description: "Failed to record transaction",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    transactions,
    loading,
    fetchTransactions,
    createTransaction,
  };
};
