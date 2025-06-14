
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { Settings as SettingsIcon, User, Shield, Database, Wifi } from 'lucide-react';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <main id="main-content" className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your privacy, accessibility, and community preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>
                Your pseudonymous identity and community preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="pseudonym">Community Pseudonym</Label>
                <Input id="pseudonym" placeholder="Enter your community name" />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Tell your community about yourself" />
              </div>
              <Button>Save Profile</Button>
            </CardContent>
          </Card>

          {/* Privacy & Trust */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Privacy & Trust
              </CardTitle>
              <CardDescription>
                Control your data sharing and trust network visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Share location data</Label>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <Label>Trust network visibility</Label>
                <Button variant="outline" size="sm">Private</Button>
              </div>
              <div className="flex items-center justify-between">
                <Label>Activity history</Label>
                <Button variant="outline" size="sm">Limited</Button>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="mr-2 h-5 w-5" />
                Accessibility
              </CardTitle>
              <CardDescription>
                Customize the interface for your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Theme Preference</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                  >
                    Dark
                  </Button>
                  <Button
                    variant={theme === 'high-contrast' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('high-contrast')}
                  >
                    High Contrast
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Reduce motion</Label>
                <Button variant="outline" size="sm">Auto</Button>
              </div>
            </CardContent>
          </Card>

          {/* Data & Sync */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Data & Sync
              </CardTitle>
              <CardDescription>
                Manage offline data and synchronization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Offline storage</Label>
                  <p className="text-sm text-muted-foreground">2.4 MB used</p>
                </div>
                <Button variant="outline" size="sm">
                  <Database className="mr-2 h-4 w-4" />
                  Manage
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Label>Auto-sync when online</Label>
                <Button variant="outline" size="sm">
                  <Wifi className="mr-2 h-4 w-4" />
                  Enabled
                </Button>
              </div>
              <Button variant="destructive" size="sm">
                Clear local data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Settings;
