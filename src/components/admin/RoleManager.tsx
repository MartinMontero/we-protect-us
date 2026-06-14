
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Users, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useRoles, UserRole } from '@/hooks/useRoles';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserWithRole {
  user_id: string;
  pseudonym: string;
  avatar_url?: string;
  role: UserRole;
  assigned_at: string;
}

export const RoleManager: React.FC = () => {
  const { t } = useLanguage();
  const [usersWithRoles, setUsersWithRoles] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { hasPermission, assignRole } = useRoles();
  const { toast } = useToast();

  useEffect(() => {
    if (hasPermission('admin')) {
      fetchUsersWithRoles();
    }
  }, [hasPermission]);

  const fetchUsersWithRoles = async () => {
    try {
      setError(null);
      const { data, error } = await supabase.rpc('get_users_with_roles');

      if (error) throw error;

      const mappedUsers: UserWithRole[] = (data || []).map((item) => ({
        user_id: item.user_id,
        pseudonym: item.pseudonym || 'Unknown',
        avatar_url: undefined,
        role: item.role as UserRole,
        assigned_at: item.assigned_at,
      }));

      setUsersWithRoles(mappedUsers);
    } catch (error) {
      console.error('Error fetching users with roles:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users with roles';
      setError(errorMessage);
      toast({
        title: t('common.error'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUsersWithRoles();
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await assignRole(userId, newRole);
      await fetchUsersWithRoles();
      
      toast({
        title: t('admin.role_updated'),
        description: t('admin.role_update_success'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('admin.role_update_error'),
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200';
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
      case 'moderator': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'user': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (!hasPermission('admin')) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {t('admin.insufficient_permissions')}
            </AlertDescription>
          </Alert>
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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {t('admin.roles')}
          </CardTitle>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {t('common.refresh')}
        </Button>
      </CardHeader>
      <CardContent>
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {usersWithRoles.map((user) => (
            <div key={user.user_id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
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
                  <div className="text-sm text-gray-500 dark:text-gray-400">
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
                    onValueChange={(value) => handleRoleChange(user.user_id, value as UserRole)}
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

          {usersWithRoles.length === 0 && !error && (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('admin.no_role_assignments')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('admin.no_users_assigned')}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
