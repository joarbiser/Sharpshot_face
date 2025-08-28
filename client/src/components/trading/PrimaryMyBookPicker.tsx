import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, BookOpen, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMyBook } from '@/contexts/MyBookContext';

interface Sportsbook {
  id: string;
  name: string;
  displayName: string;
  logoUrl: string;
}

interface PrimaryMyBookPickerProps {
  books: Sportsbook[];
  className?: string;
}

export function PrimaryMyBookPicker({ books, className = '' }: PrimaryMyBookPickerProps) {
  const { selectedBookId, recentBookIds, setSelectedBookId } = useMyBook();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard shortcuts and navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'b' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Only trigger if not in an input field
        if (e.target instanceof HTMLElement && 
            ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
          return;
        }
        e.preventDefault();
        setIsOpen(true);
      }
      
      if (isOpen) {
        if (e.key === 'Escape') {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setFocusedIndex(prev => Math.min(prev + 1, allSelectableBooks.length - 1));
        }
        
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 1, -1));
        }
        
        if (e.key === 'Enter' && focusedIndex >= 0) {
          e.preventDefault();
          const book = allSelectableBooks[focusedIndex];
          if (book) {
            handleBookSelect(book.id);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex]);

  // Reset focused index when search changes
  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchTerm]);

  // Auto-focus search input when picker opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const selectedBook = selectedBookId ? books.find(book => book.id === selectedBookId) : null;

  // Organize books into sections
  const { recentBooks, allSelectableBooks, filteredBooks } = useMemo(() => {
    const filteredBooks = books.filter(book =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const recentBooks = recentBookIds
      .map(id => books.find(book => book.id === id))
      .filter((book): book is Sportsbook => book !== undefined)
      .filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // For keyboard navigation, create a flat list of all selectable books
    const allSelectableBooks = [
      ...recentBooks,
      ...filteredBooks.filter(book => !recentBookIds.includes(book.id))
    ];

    return { recentBooks, allSelectableBooks, filteredBooks };
  }, [books, recentBookIds, searchTerm]);

  const handleBookSelect = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsOpen(false);
    setSearchTerm('');
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  };

  const handleReset = () => {
    setSelectedBookId(null);
    setIsOpen(false);
    setSearchTerm('');
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  };

  const TriggerButton = () => {
    const hasSelection = !!selectedBook;
    
    return (
      <Button 
        ref={triggerRef}
        variant="outline" 
        className={`relative gap-2 h-12 px-4 font-semibold text-base focus:ring-2 focus:ring-[#D8AC35] hover:bg-muted/80 transition-all duration-200 ${
          !hasSelection ? 'animate-pulse-gentle border-[#D8AC35]/50' : 'border-border'
        } ${className}`}
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
        aria-label={hasSelection ? `My Book: ${selectedBook.name}` : 'Select your sportsbook'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {selectedBook ? (
          <>
            <img 
              src={selectedBook.logoUrl} 
              alt={selectedBook.name} 
              className="w-5 h-5 rounded"
            />
            <span className="hidden sm:inline font-bold">My Book:</span>
            <span className="font-bold text-[#D8AC35]">{selectedBook.displayName}</span>
          </>
        ) : (
          <>
            <BookOpen className="h-5 w-5" />
            <span className="hidden sm:inline font-bold">Select My Book</span>
            <span className="sm:hidden font-bold">My Book</span>
          </>
        )}
      </Button>
    );
  };

  const BookListItem = ({ book, isRecent = false, index }: { 
    book: Sportsbook; 
    isRecent?: boolean; 
    index: number;
  }) => (
    <button
      onClick={() => handleBookSelect(book.id)}
      className={`w-full px-4 py-3 text-left hover:bg-muted/80 flex items-center gap-3 transition-colors ${
        selectedBookId === book.id ? 'bg-muted' : ''
      } ${focusedIndex === index ? 'bg-muted/60 ring-2 ring-[#D8AC35]' : ''}`}
      role="option"
      aria-selected={selectedBookId === book.id}
      tabIndex={-1}
    >
      <img 
        src={book.logoUrl} 
        alt={book.name} 
        className="w-8 h-8 rounded flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm truncate" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            {book.displayName}
          </span>
          {selectedBookId === book.id && (
            <Badge 
              variant="outline" 
              className="px-2 py-0 text-xs border-[#D8AC35] text-[#D8AC35] flex-shrink-0"
              style={{ boxShadow: '0 0 8px rgba(216, 172, 53, 0.2)' }}
            >
              Selected
            </Badge>
          )}
          {isRecent && selectedBookId !== book.id && (
            <Badge 
              variant="secondary" 
              className="px-2 py-0 text-xs text-muted-foreground flex-shrink-0"
            >
              Recent
            </Badge>
          )}
        </div>
        <div className="text-xs text-muted-foreground truncate">{book.name}</div>
      </div>
    </button>
  );

  const BookList = ({ onSelect, onReset }: { onSelect: (id: string) => void; onReset: () => void }) => (
    <div className="w-full max-w-[520px]">
      {/* Search Header */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          />
        </div>
      </div>
      
      {/* Book Lists */}
      <ScrollArea className="max-h-[60vh]">
        <div role="listbox" aria-label="Sportsbook options">
          {filteredBooks.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground text-sm">
              {books.length === 0 ? 'No books available' : 'No books found'}
            </div>
          ) : (
            <>
              {/* Recent Books Section */}
              {recentBooks.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/30">
                    Recently Used
                  </div>
                  {recentBooks.map((book, i) => (
                    <BookListItem
                      key={`recent-${book.id}`}
                      book={book}
                      isRecent={true}
                      index={i}
                    />
                  ))}
                </div>
              )}

              {/* All Books Section */}
              <div>
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/30">
                  All Books
                </div>
                {filteredBooks
                  .filter(book => !recentBookIds.includes(book.id))
                  .map((book, i) => (
                    <BookListItem
                      key={`all-${book.id}`}
                      book={book}
                      index={recentBooks.length + i}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t flex justify-between items-center">
        <button
          onClick={onReset}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Clear Selection
        </button>
        <span className="text-xs text-muted-foreground">
          Press B to open • ↑↓ to navigate • Enter to select
        </span>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <TriggerButton />
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[90vh]">
          <SheetHeader>
            <SheetTitle style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Select My Book
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <BookList onSelect={handleBookSelect} onReset={handleReset} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <TriggerButton />
          </PopoverTrigger>
          <PopoverContent 
            className="p-0 w-auto" 
            align="end" 
            side="bottom"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <BookList onSelect={handleBookSelect} onReset={handleReset} />
          </PopoverContent>
        </Popover>
      </TooltipTrigger>
      <TooltipContent>
        <p>{selectedBook ? `Selected: ${selectedBook.name}` : 'Start here: pick your sportsbook to populate My Odds'}</p>
        <p className="text-xs text-muted-foreground">Keyboard shortcut: B</p>
      </TooltipContent>
    </Tooltip>
  );
}

// CSS for pulse animation (add to global styles)
const pulseKeyframes = `
@keyframes pulse-gentle {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(216, 172, 53, 0.4);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(216, 172, 53, 0.1);
  }
}

.animate-pulse-gentle {
  animation: pulse-gentle 4s ease-in-out infinite;
}
`;