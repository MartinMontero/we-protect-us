
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
      navigate('/auth');
      return;
    }

    // If user has completed profile setup, redirect to dashboard
    if (!profileLoading && profile && profile.bio) {
      navigate('/dashboard');
      return;
    }
  }, [user, profile, authLoading, profileLoading, navigate]);

  const handleProfileCreated = () => {
    navigate('/dashboard');
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to We Protect Us!
          </h1>
          <p className="text-xl text-gray-600">
            Let's set up your community profile to get started
          </p>
        </div>
        
        <ProfileSetup onProfileCreated={handleProfileCreated} />
      </div>
    </div>
  );
};

export default OnboardingPage;
