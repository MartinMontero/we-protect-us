
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  full_name: string;
  pseudonym: string;
  email?: string;
  avatar_url?: string;
  created_at: string;
  last_sign_in_at?: string;
  skills?: string[];
  time_bank_hours?: number;
  status: 'active' | 'suspended' | 'pending';
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedUsers: User[] = (data || []).map(profile => ({
        id: profile.id,
        full_name: profile.pseudonym || 'Unknown', // Use pseudonym as display name
        pseudonym: profile.pseudonym || 'Anonymous',
        email: profile.phone_number || 'N/A', // Use phone_number since email doesn't exist
        avatar_url: profile.profile_image_url || undefined,
        created_at: profile.created_at,
        last_sign_in_at: profile.updated_at, // Use updated_at as last activity
        skills: profile.skills || [],
        time_bank_hours: profile.time_bank_hours || 0,
        status: 'active', // Default status since not in profiles table
      }));

      setUsers(mappedUsers);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, status: User['status']) => {
    try {
      // Since status doesn't exist in profiles table, we'll just update the local state
      // In a real implementation, you'd add a status column to the profiles table
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status } : user
      ));
    } catch (err) {
      console.error('Error updating user status:', err);
      throw err;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    updateUserStatus,
    deleteUser,
  };
};
