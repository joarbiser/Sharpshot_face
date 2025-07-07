import { createContext, useContext, useState } from 'react';

interface DemoModeContextType {
  demoMode: boolean;
  toggleDemoMode: () => void;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const [demoMode, setDemoMode] = useState(true);

  const toggleDemoMode = () => {
    setDemoMode(prev => !prev);
  };

  return (
    <DemoModeContext.Provider value={{ demoMode, toggleDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
}