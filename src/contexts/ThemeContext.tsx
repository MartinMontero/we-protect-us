
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'high-contrast';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return 'light';
    }
    
    const saved = localStorage.getItem('csf-theme');
    if (saved && ['light', 'dark', 'high-contrast'].includes(saved)) {
      return saved as Theme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'high-contrast');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Store theme preference
    localStorage.setItem('csf-theme', theme);
  }, [theme]);

  const value = React.useMemo(() => ({
    theme,
    setTheme
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
