
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  pseudonym: string;
  bio?: string;
  trust_score: number;
  care_points_balance: number;
  created_at: string;
  role: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.rpc('get_users_with_profiles');

      if (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        return;
      }

      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchUsers();
  };

  return {
    users,
    isLoading,
    error,
    refetch,
  };
};
