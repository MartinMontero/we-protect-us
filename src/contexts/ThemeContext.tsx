
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
    const saved = localStorage.getItem('csf-theme');
    if (saved && ['light', 'dark', 'high-contrast'].includes(saved)) {
      return saved as Theme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Remove all theme classes from both root and body
    root.classList.remove('light', 'dark', 'high-contrast');
    body.classList.remove('light', 'dark', 'high-contrast');
    
    // Add current theme class to both root and body
    root.classList.add(theme);
    body.classList.add(theme);
    
    // Apply theme-specific styles to body
    if (theme === 'dark') {
      body.style.backgroundColor = 'hsl(240 10% 3.9%)';
      body.style.color = 'hsl(0 0% 98%)';
    } else if (theme === 'high-contrast') {
      body.style.backgroundColor = 'hsl(0 0% 100%)';
      body.style.color = 'hsl(0 0% 0%)';
    } else {
      body.style.backgroundColor = 'hsl(0 0% 100%)';
      body.style.color = 'hsl(240 10% 3.9%)';
    }
    
    // Store theme preference
    localStorage.setItem('csf-theme', theme);
  }, [theme]);

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
