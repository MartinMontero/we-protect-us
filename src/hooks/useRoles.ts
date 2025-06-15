
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type UserRole = 'super_admin' | 'admin' | 'moderator' | 'user';

interface UserRoleData {
  user_id: string;
  role: UserRole;
  assigned_at: string;
  assigned_by: string;
}

export const useRoles = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserRole();
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .order('assigned_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        // User has no role assigned, default to 'user'
        setUserRole('user');
      } else {
        setUserRole(data.role as UserRole);
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
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role,
          assigned_by: user.id,
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
