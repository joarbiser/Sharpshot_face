import React, { useState, useEffect } from 'react';
import { Search, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

interface MyBookPickerProps {
  books: Sportsbook[];
  className?: string;
}

export function MyBookPicker({ books, className = '' }: MyBookPickerProps) {
  const { selectedBookId, setSelectedBookId } = useMyBook();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard shortcuts
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
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const selectedBook = selectedBookId ? books.find(book => book.id === selectedBookId) : null;

  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookSelect = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleReset = () => {
    setSelectedBookId(null);
    setIsOpen(false);
    setSearchTerm('');
  };

  const TriggerButton = () => (
    <Button 
      variant="outline" 
      className={`gap-2 h-10 focus:ring-2 focus:ring-primary hover:bg-muted/80 transition-colors ${className}`}
      style={{ fontFamily: "'Rajdhani', sans-serif" }}
    >
      {selectedBook ? (
        <>
          <img 
            src={selectedBook.logoUrl} 
            alt={selectedBook.name} 
            className="w-4 h-4 rounded"
          />
          <span className="hidden sm:inline">My Book:</span>
          <span className="font-medium">{selectedBook.displayName}</span>
        </>
      ) : (
        <>
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">My Book</span>
        </>
      )}
    </Button>
  );

  const BookList = ({ onSelect, onReset }: { onSelect: (id: string) => void; onReset: () => void }) => (
    <div className="w-80">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          />
        </div>
      </div>
      
      <div className="max-h-[300px] overflow-y-auto">
        {/* Reset option */}
        <button
          onClick={onReset}
          className="w-full px-3 py-2 text-left hover:bg-muted flex items-center gap-3 border-b"
        >
          <div className="w-8 h-8 rounded border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
            <X className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="font-medium text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Clear Selection
            </div>
            <div className="text-xs text-muted-foreground">Remove my book</div>
          </div>
        </button>

        {/* Book options */}
        {filteredBooks.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            {books.length === 0 ? 'No books available' : 'No books found'}
          </div>
        ) : (
          filteredBooks.map(book => (
            <button
              key={book.id}
              onClick={() => onSelect(book.id)}
              className={`w-full px-3 py-2 text-left hover:bg-muted flex items-center gap-3 transition-colors ${
                selectedBookId === book.id ? 'bg-muted' : ''
              }`}
            >
              <img 
                src={book.logoUrl} 
                alt={book.name} 
                className="w-8 h-8 rounded"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    {book.displayName}
                  </span>
                  {selectedBookId === book.id && (
                    <Badge 
                      variant="outline" 
                      className="px-2 py-0 text-xs border-[#D8AC35] text-[#D8AC35]"
                      style={{ boxShadow: '0 0 8px rgba(216, 172, 53, 0.3)' }}
                    >
                      Selected
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{book.name}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <TriggerButton />
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[80vh]">
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
          <PopoverContent className="p-0 w-auto" align="end">
            <BookList onSelect={handleBookSelect} onReset={handleReset} />
          </PopoverContent>
        </Popover>
      </TooltipTrigger>
      <TooltipContent>
        <p>Select your preferred sportsbook</p>
        <p className="text-xs text-muted-foreground">Keyboard shortcut: B</p>
      </TooltipContent>
    </Tooltip>
  );
}