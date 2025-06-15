
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useRoles, UserRole } from '@/hooks/useRoles';
import { useToast } from '@/hooks/use-toast';

interface UserWithRole {
  id: string;
  pseudonym: string;
  avatar_url?: string;
  role: UserRole;
  assigned_at: string;
}

export const RoleManager: React.FC = () => {
  const [usersWithRoles, setUsersWithRoles] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const { hasPermission, assignRole } = useRoles();
  const { toast } = useToast();

  useEffect(() => {
    if (hasPermission('admin')) {
      fetchUsersWithRoles();
    }
  }, [hasPermission]);

  const fetchUsersWithRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          assigned_at,
          profiles:user_id(pseudonym, avatar_url)
        `)
        .order('assigned_at', { ascending: false });

      if (error) throw error;

      const mappedUsers: UserWithRole[] = (data || []).map(item => ({
        id: item.user_id,
        pseudonym: (item.profiles as any)?.pseudonym || 'Unknown',
        avatar_url: (item.profiles as any)?.avatar_url,
        role: item.role as UserRole,
        assigned_at: item.assigned_at,
      }));

      setUsersWithRoles(mappedUsers);
    } catch (error) {
      console.error('Error fetching users with roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await assignRole(userId, newRole);
      await fetchUsersWithRoles();
      
      toast({
        title: "Role Updated",
        description: "User role has been successfully updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      case 'moderator': return 'bg-yellow-100 text-yellow-800';
      case 'user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!hasPermission('admin')) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            You don't have permission to manage user roles.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Role Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {usersWithRoles.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.pseudonym}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Users className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{user.pseudonym}</div>
                  <div className="text-sm text-gray-500">
                    Assigned: {new Date(user.assigned_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={getRoleBadgeColor(user.role)}>
                  {user.role.replace('_', ' ')}
                </Badge>
                
                {hasPermission('super_admin') && (
                  <Select
                    value={user.role}
                    onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          ))}

          {usersWithRoles.length === 0 && (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Role Assignments</h3>
              <p className="text-gray-600">
                No users have been assigned specific roles yet.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
