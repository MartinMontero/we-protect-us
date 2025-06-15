
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { ProfileSetup } from '@/components/profile/ProfileSetup';

const OnboardingPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, redirect to auth page
    if (!authLoading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
      return;
    }

    // If user has completed profile setup (has bio), redirect to dashboard
    if (!profileLoading && profile && profile.bio && profile.bio.trim() !== '') {
      console.log('Profile already complete, redirecting to dashboard');
      navigate('/dashboard');
      return;
    }
  }, [user, profile, authLoading, profileLoading, navigate]);

  const handleProfileCreated = () => {
    console.log('Profile creation completed, redirecting to dashboard');
    navigate('/dashboard');
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50 dark:from-blue-950 dark:to-red-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 dark:from-blue-950 dark:to-red-950 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to We Protect Us!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Let's set up your community profile to get started
          </p>
        </div>
        
        <ProfileSetup onProfileCreated={handleProfileCreated} />
      </div>
    </div>
  );
};

export default OnboardingPage;
