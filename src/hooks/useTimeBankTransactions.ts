
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TimeBankTransaction {
  id: string;
  giver_id: string;
  receiver_id: string;
  hours: number;
  description: string;
  created_at: string;
  giver_profile?: {
    full_name: string;
    avatar_url: string;
  } | null;
  receiver_profile?: {
    full_name: string;
    avatar_url: string;
  } | null;
}

export const useTimeBankTransactions = () => {
  const [transactions, setTransactions] = useState<TimeBankTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('time_bank_transactions')
        .select(`
          *,
          giver_profile:giver_id(pseudonym, avatar_url),
          receiver_profile:receiver_id(pseudonym, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const mappedTransactions: TimeBankTransaction[] = (data || []).map(transaction => {
        const giverProfile = transaction.giver_profile && 
          transaction.giver_profile !== null &&
          typeof transaction.giver_profile === 'object' &&
          'pseudonym' in transaction.giver_profile
          ? {
              full_name: transaction.giver_profile.pseudonym || 'Unknown',
              avatar_url: transaction.giver_profile.avatar_url || ''
            }
          : null;

        const receiverProfile = transaction.receiver_profile &&
          transaction.receiver_profile !== null &&
          typeof transaction.receiver_profile === 'object' &&
          'pseudonym' in transaction.receiver_profile
          ? {
              full_name: transaction.receiver_profile.pseudonym || 'Unknown',
              avatar_url: transaction.receiver_profile.avatar_url || ''
            }
          : null;

        return {
          id: transaction.id,
          giver_id: transaction.giver_id,
          receiver_id: transaction.receiver_id,
          hours: transaction.hours,
          description: transaction.description,
          created_at: transaction.created_at,
          giver_profile: giverProfile,
          receiver_profile: receiverProfile,
        };
      });

      setTransactions(mappedTransactions);
      setError(null);
    } catch (err) {
      console.error('Error fetching time bank transactions:', err);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
  };
};
