import { Book, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTerminalFilters } from './store';

export function TipCardMyBook() {
  const { myBook, dismissedMyBookTip, dismissTip } = useTerminalFilters();
  
  // Only show when myBook is null and tip hasn't been dismissed
  if (myBook !== null || dismissedMyBookTip) {
    return null;
  }

  const handleSelectMyBook = () => {
    // Focus the My Book select dropdown (scroll to FilterBar)
    const filterBar = document.querySelector('[data-testid="filter-bar"]');
    if (filterBar) {
      filterBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Try to focus the select trigger
      const selectTrigger = filterBar.querySelector('[data-testid="my-book-select"] button');
      if (selectTrigger) {
        (selectTrigger as HTMLElement).focus();
        (selectTrigger as HTMLElement).click();
      }
    }
  };

  return (
    <Card className="mb-4 border-primary/20 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-0.5">
              <Book className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Pick 'My Book' to personalize odds and EV.
              </p>
              <p className="text-xs text-muted-foreground">
                Data still loads without it.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleSelectMyBook}
              className="text-xs"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Select My Book
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={dismissTip}
              className="p-1 h-8 w-8"
              aria-label="Dismiss tip"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}