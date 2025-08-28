import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MyBookContextType {
  selectedBookId: string | null;
  setSelectedBookId: (bookId: string | null) => void;
}

const MyBookContext = createContext<MyBookContextType | undefined>(undefined);

const STORAGE_KEY = 'ss:selectedBookId';

export function MyBookProvider({ children }: { children: ReactNode }) {
  const [selectedBookId, setSelectedBookIdState] = useState<string | null>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored !== 'null') {
      setSelectedBookIdState(stored);
    }
  }, []);

  // Update localStorage when selectedBookId changes
  const setSelectedBookId = (bookId: string | null) => {
    setSelectedBookIdState(bookId);
    if (bookId === null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, bookId);
    }
  };

  return (
    <MyBookContext.Provider value={{ selectedBookId, setSelectedBookId }}>
      {children}
    </MyBookContext.Provider>
  );
}

export function useMyBook() {
  const context = useContext(MyBookContext);
  if (context === undefined) {
    throw new Error('useMyBook must be used within a MyBookProvider');
  }
  return context;
}