
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Contrast } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'high-contrast' as const, label: 'High Contrast', icon: Contrast },
  ];

  return (
    <div className="flex items-center space-x-1">
      {themeOptions.map((option) => {
        const Icon = option.icon;
        return (
          <Button
            key={option.value}
            variant={theme === option.value ? "default" : "ghost"}
            size="sm"
            onClick={() => setTheme(option.value)}
            aria-label={`Switch to ${option.label} theme`}
            aria-pressed={theme === option.value}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
};
