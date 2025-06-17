
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const AdminTestAccount: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const createTestAdmin = async () => {
    setCreating(true);
    try {
      // First try to sign up the test admin
      const { data, error } = await supabase.auth.signUp({
        email: 'admin@test.com',
        password: 'testadmin123',
        options: {
          data: {
            pseudonym: 'Test Admin',
            full_name: 'Test Admin'
          }
        }
      });

      if (error) {
        console.error('Error creating test admin:', error);
        toast({
          title: "Error",
          description: `Failed to create test admin: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        // Now assign admin role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: data.user.id,
            role: 'admin',
            assigned_by: data.user.id
          });

        if (roleError) {
          console.error('Error assigning admin role:', roleError);
        }

        toast({
          title: "Success",
          description: "Test admin account created: admin@test.com / testadmin123",
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Create Test Admin Account</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={createTestAdmin} 
          disabled={creating}
          className="w-full"
        >
          {creating ? 'Creating...' : 'Create Test Admin'}
        </Button>
        <p className="text-sm text-gray-600 mt-2">
          This will create: admin@test.com / testadmin123
        </p>
      </CardContent>
    </Card>
  );
};
