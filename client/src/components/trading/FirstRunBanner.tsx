import React from 'react';
import { BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMyBook } from '@/contexts/MyBookContext';

interface FirstRunBannerProps {
  onSelectMyBook: () => void;
}

export function FirstRunBanner({ onSelectMyBook }: FirstRunBannerProps) {
  const { selectedBookId, bannerDismissed, dismissBanner } = useMyBook();

  // Don't show banner if book is selected or banner was dismissed
  if (selectedBookId || bannerDismissed) {
    return null;
  }

  return (
    <div className="bg-[#D8AC35]/10 border border-[#D8AC35]/30 rounded-lg p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <BookOpen className="h-5 w-5 text-[#D8AC35]" />
        <div>
          <p className="text-sm font-medium" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Choose your book to populate My Odds
          </p>
          <p className="text-xs text-muted-foreground">
            Select your preferred sportsbook to see personalized betting opportunities
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          onClick={onSelectMyBook}
          size="sm"
          className="bg-[#D8AC35] hover:bg-[#D8AC35]/90 text-black font-semibold"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Select My Book
        </Button>
        <Button
          onClick={dismissBanner}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}