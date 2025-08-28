import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MyBookContextType {
  selectedBookId: string | null;
  recentBookIds: string[];
  bannerDismissed: boolean;
  setSelectedBookId: (bookId: string | null) => void;
  dismissBanner: () => void;
}

const MyBookContext = createContext<MyBookContextType | undefined>(undefined);

const STORAGE_KEY = 'ss:selectedBookId';
const RECENT_BOOKS_KEY = 'ss:recentBooks';
const BANNER_DISMISSED_KEY = 'ss:bannerDismissed';

export function MyBookProvider({ children }: { children: ReactNode }) {
  const [selectedBookId, setSelectedBookIdState] = useState<string | null>(null);
  const [recentBookIds, setRecentBookIds] = useState<string[]>([]);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedSelected = localStorage.getItem(STORAGE_KEY);
    if (storedSelected && storedSelected !== 'null') {
      setSelectedBookIdState(storedSelected);
    }

    const storedRecent = localStorage.getItem(RECENT_BOOKS_KEY);
    if (storedRecent) {
      try {
        const recentArray = JSON.parse(storedRecent);
        if (Array.isArray(recentArray)) {
          setRecentBookIds(recentArray.slice(0, 5)); // Limit to 5
        }
      } catch (e) {
        console.warn('Failed to parse recent books from localStorage');
      }
    }

    const storedBannerDismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    setBannerDismissed(storedBannerDismissed === 'true');
  }, []);

  // Update localStorage when selectedBookId changes
  const setSelectedBookId = (bookId: string | null) => {
    setSelectedBookIdState(bookId);
    
    if (bookId === null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, bookId);
      
      // Update recent books list
      const newRecent = [bookId, ...recentBookIds.filter(id => id !== bookId)].slice(0, 5);
      setRecentBookIds(newRecent);
      localStorage.setItem(RECENT_BOOKS_KEY, JSON.stringify(newRecent));
      
      // Auto-dismiss banner when first book is selected
      if (!bannerDismissed) {
        dismissBanner();
      }
    }
  };

  const dismissBanner = () => {
    setBannerDismissed(true);
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
  };

  return (
    <MyBookContext.Provider value={{ 
      selectedBookId, 
      recentBookIds, 
      bannerDismissed, 
      setSelectedBookId, 
      dismissBanner 
    }}>
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