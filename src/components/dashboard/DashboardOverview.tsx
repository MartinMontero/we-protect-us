import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { WelcomeChecklist } from '@/components/onboarding/WelcomeChecklist';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight } from 'lucide-react';
import { featureNav, navGroups } from '@/lib/navigation';

const DashboardOverview = () => {
  const { user } = useAuth();
  const displayName =
    user?.user_metadata?.pseudonym || user?.user_metadata?.full_name || 'Comrade';

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {displayName}!</h1>
        <p className="text-white/90">
          Your community organizing hub. Stay connected, build power, protect each other.
        </p>
      </div>

      <WelcomeChecklist />

      {/* Feature directory grouped by purpose */}
      {navGroups.map((group) => {
        const items = featureNav.filter((item) => item.group === group);
        return (
          <section key={group} aria-labelledby={`group-${group}`}>
            <h2
              id={`group-${group}`}
              className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3"
            >
              {group}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.href}
                    className="group transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-primary"
                  >
                    <Link
                      to={item.href}
                      className="block focus:outline-none"
                      aria-label={`${item.label}: ${item.description}`}
                    >
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className="rounded-lg bg-muted p-2.5 text-primary group-hover:bg-accent transition-colors">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground flex items-center justify-between gap-2">
                            {item.label}
                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default DashboardOverview;
