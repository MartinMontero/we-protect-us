
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type UserRole = 'super_admin' | 'admin' | 'moderator' | 'user';

export const useRoles = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setUserRole('user');
      setLoading(false);
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.rpc('get_user_role');

      if (error) {
        console.error('Error fetching user role:', error);
        setUserRole('user');
      } else {
        setUserRole((data as UserRole) || 'user');
      }
    } catch (err) {
      console.error('Error fetching user role:', err);
      setUserRole('user');
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (requiredRole: UserRole): boolean => {
    const roleHierarchy: Record<UserRole, number> = {
      user: 0,
      moderator: 1,
      admin: 2,
      super_admin: 3,
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  };

  const assignRole = async (userId: string, role: UserRole) => {
    if (!user || !hasPermission('admin')) {
      throw new Error('Insufficient permissions');
    }

    try {
      const { error } = await supabase.rpc('assign_user_role', {
        target_user_id: userId,
        new_role: role,
        assigner_id: user.id,
      });

      if (error) throw error;
    } catch (err) {
      console.error('Error assigning role:', err);
      throw err;
    }
  };

  return {
    userRole,
    loading,
    hasPermission,
    assignRole,
    refetch: fetchUserRole,
  };
};
