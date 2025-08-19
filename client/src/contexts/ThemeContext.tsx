import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme from localStorage or default to light
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      return savedTheme || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    const body = document.body;
    
    // Support both class-based (existing) and data-theme (new glass system)
    root.classList.remove('light', 'dark');
    root.removeAttribute('data-theme');
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
    
    // Use CSS variables for background instead of inline styles
    root.style.removeProperty('background-color');
    body.style.removeProperty('background-color');
    body.style.removeProperty('color');
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    console.log('Theme applied:', theme, 'Dark class present:', root.classList.contains('dark'));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}