import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { SocialAuthButtons } from './SocialAuthButtons';
import { EmailPasswordForm } from './EmailPasswordForm';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudonym, setPseudonym] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      navigate('/onboarding');
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !pseudonym) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create your account.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            pseudonym: pseudonym.trim(),
            full_name: pseudonym.trim(),
          },
          emailRedirectTo: `${window.location.origin}/onboarding`
        }
      });

      if (error) {
        console.error('Signup error:', error);
        
        if (error.message.includes('already registered')) {
          toast({
            title: "Account Already Exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive",
          });
        } else if (error.message.includes('Invalid email')) {
          toast({
            title: "Invalid Email",
            description: "Please enter a valid email address.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup Error",
            description: error.message || "Failed to create account. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user && !data.user.email_confirmed_at) {
        toast({
          title: "Check Your Email",
          description: "We've sent you a confirmation email. Please check your inbox and click the confirmation link to activate your account.",
        });
      } else if (data.user) {
        toast({
          title: "Account Created!",
          description: "Welcome to We Protect Us! Setting up your profile...",
        });
      }
    } catch (error: any) {
      console.error('Unexpected signup error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Invalid Credentials",
            description: "The email or password you entered is incorrect. Please check and try again.",
            variant: "destructive",
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Confirmed",
            description: "Please check your email and click the confirmation link before signing in.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign In Error",
            description: error.message || "Failed to sign in. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        console.log('Sign in successful:', data.user.id);
        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });
      }
    } catch (error: any) {
      console.error('Unexpected signin error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/onboarding`
        }
      });

      if (error) {
        console.error(`${provider} auth error:`, error);
        toast({
          title: "Authentication Error",
          description: `Failed to sign in with ${provider}. ${error.message}`,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error(`Unexpected ${provider} auth error:`, error);
      toast({
        title: "Error",
        description: `An unexpected error occurred with ${provider} authentication.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50 dark:from-blue-950 dark:to-red-950 p-4">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome to We Protect Us</CardTitle>
            <CardDescription>
              Join our community of mutual aid and solidarity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              {/* Social Auth Options */}
              <div className="mt-6">
                <SocialAuthButtons onSocialAuth={handleSocialAuth} loading={loading} />
              </div>

              <div className="my-6">
                <Separator className="relative">
                  <span className="absolute inset-x-0 top-1/2 flex justify-center transform -translate-y-1/2">
                    <span className="px-4 text-sm text-muted-foreground bg-card">or</span>
                  </span>
                </Separator>
              </div>
              
              <TabsContent value="signin">
                <EmailPasswordForm
                  mode="signin"
                  email={email}
                  password={password}
                  pseudonym={pseudonym}
                  showPassword={showPassword}
                  loading={loading}
                  onEmailChange={setEmail}
                  onPasswordChange={setPassword}
                  onPseudonymChange={setPseudonym}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onSubmit={handleSignIn}
                />
              </TabsContent>
              
              <TabsContent value="signup">
                <EmailPasswordForm
                  mode="signup"
                  email={email}
                  password={password}
                  pseudonym={pseudonym}
                  showPassword={showPassword}
                  loading={loading}
                  onEmailChange={setEmail}
                  onPasswordChange={setPassword}
                  onPseudonymChange={setPseudonym}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onSubmit={handleSignUp}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;
