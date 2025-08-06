import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Clear any existing dark theme from localStorage and force light mode
    localStorage.removeItem('theme');
    setTheme('light');
    console.log('Forced theme to light mode, cleared localStorage');
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    const body = document.body;
    
    root.classList.remove('light', 'dark');
    if (theme === 'dark') {
      root.classList.add('dark');
    }
    
    // Apply full page background and text color
    if (theme === 'dark') {
      body.style.backgroundColor = '#000000';
      body.style.color = '#ffffff';
    } else {
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#000000';
    }
    
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