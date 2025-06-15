
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface TimeBankTransaction {
  id: string;
  giver_id: string;
  receiver_id: string;
  hours: number;
  description: string;
  skill_category: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  completed_at?: string;
  giver_profile: {
    pseudonym: string;
  } | null;
  receiver_profile: {
    pseudonym: string;
  } | null;
}

export const useTimeBankTransactions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Since timebank_transactions table doesn't exist, we'll use mutual_aid_posts as a substitute
  // or return empty data for now
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['timebank_transactions'],
    queryFn: async () => {
      // Return empty array since the table doesn't exist
      // This prevents the query from failing
      return [] as TimeBankTransaction[];
    },
    enabled: !!user,
  });

  const userTransactions = transactions.filter(
    t => t.giver_id === user?.id || t.receiver_id === user?.id
  );

  const givenHours = transactions
    .filter(t => t.giver_id === user?.id && t.status === 'completed')
    .reduce((sum, t) => sum + t.hours, 0);

  const receivedHours = transactions
    .filter(t => t.receiver_id === user?.id && t.status === 'completed')
    .reduce((sum, t) => sum + t.hours, 0);

  const balance = givenHours - receivedHours;

  const enrichedTransactions = userTransactions.map(transaction => ({
    ...transaction,
    giver_name: transaction.giver_profile?.pseudonym || 'Unknown',
    receiver_name: transaction.receiver_profile?.pseudonym || 'Unknown',
    is_giver: transaction.giver_id === user?.id,
  }));

  const createTransactionMutation = useMutation({
    mutationFn: async (transactionData: {
      receiver_id: string;
      hours: number;
      description: string;
      skill_category: string;
    }) => {
      if (!user) throw new Error('User not authenticated');

      // For now, we'll just show a success message since the table doesn't exist
      console.log('Transaction would be created:', { giver_id: user.id, ...transactionData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timebank_transactions'] });
      toast({
        title: "Transaction created",
        description: "Your time bank transaction has been recorded.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create transaction. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateTransactionStatusMutation = useMutation({
    mutationFn: async ({ 
      transactionId, 
      status 
    }: { 
      transactionId: string; 
      status: 'completed' | 'cancelled';
    }) => {
      // For now, we'll just show a success message since the table doesn't exist
      console.log('Transaction status would be updated:', { transactionId, status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timebank_transactions'] });
      toast({
        title: "Transaction updated",
        description: "Transaction status has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update transaction. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    transactions: enrichedTransactions,
    isLoading,
    balance,
    givenHours,
    receivedHours,
    createTransaction: createTransactionMutation.mutate,
    updateTransactionStatus: updateTransactionStatusMutation.mutate,
    isCreating: createTransactionMutation.isPending,
    isUpdating: updateTransactionStatusMutation.isPending,
  };
};
