
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface EmailPasswordFormProps {
  mode: 'signin' | 'signup';
  email: string;
  password: string;
  pseudonym: string;
  showPassword: boolean;
  loading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onPseudonymChange: (pseudonym: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const EmailPasswordForm: React.FC<EmailPasswordFormProps> = ({
  mode,
  email,
  password,
  pseudonym,
  showPassword,
  loading,
  onEmailChange,
  onPasswordChange,
  onPseudonymChange,
  onTogglePassword,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === 'signup' && (
        <div className="space-y-2">
          <Label htmlFor="signup-pseudonym">Community Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="signup-pseudonym"
              type="text"
              placeholder="How you'd like to be known"
              value={pseudonym}
              onChange={(e) => onPseudonymChange(e.target.value)}
              className="pl-10"
              required
              disabled={loading}
            />
          </div>
          <p className="text-xs text-gray-500">
            This is how other community members will see you
          </p>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor={`${mode}-email`}>Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id={`${mode}-email`}
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="pl-10"
            required
            disabled={loading}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${mode}-password`}>Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id={`${mode}-password`}
            type={showPassword ? "text" : "password"}
            placeholder={mode === 'signin' ? "Your password" : "Choose a strong password"}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="pl-10 pr-10"
            required
            minLength={mode === 'signup' ? 6 : undefined}
            disabled={loading}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {mode === 'signup' && (
          <p className="text-xs text-gray-500">
            Must be at least 6 characters long
          </p>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-red-600 hover:bg-red-700"
        disabled={loading}
      >
        {loading 
          ? (mode === 'signin' ? "Signing in..." : "Creating account...") 
          : (mode === 'signin' ? "Sign In" : "Create Account")
        }
      </Button>
    </form>
  );
};
