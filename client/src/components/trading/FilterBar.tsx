import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Search, RotateCcw, Filter } from 'lucide-react';

export interface FilterState {
  leagues: string[];
  markets: string[];
  livePreMatch: 'all' | 'live' | 'prematch';
  oddsRange: [number, number];
  myBooks: string[];
  evThreshold: number;
  search: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  availableLeagues: string[];
  availableBooks: string[];
  className?: string;
}

const MARKET_OPTIONS = [
  { value: 'all', label: 'All Markets' },
  { value: 'moneyline', label: 'Moneyline' },
  { value: 'spread', label: 'Spread' },
  { value: 'total', label: 'Total' },
  { value: 'player_props', label: 'Player Props' }
];

export function FilterBar({ 
  filters, 
  onFiltersChange, 
  onReset, 
  availableLeagues, 
  availableBooks,
  className = ''
}: FilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleLeague = (league: string) => {
    const newLeagues = filters.leagues.includes(league)
      ? filters.leagues.filter(l => l !== league)
      : [...filters.leagues, league];
    updateFilter('leagues', newLeagues);
  };

  const toggleBook = (book: string) => {
    const newBooks = filters.myBooks.includes(book)
      ? filters.myBooks.filter(b => b !== book)
      : [...filters.myBooks, book];
    updateFilter('myBooks', newBooks);
  };

  return (
    <div className={`space-y-4 p-4 bg-muted/20 rounded-lg border ${className}`}>
      {/* Primary Filters Row */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams or events..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Market Selector */}
        <Select value={filters.markets[0] || 'all'} onValueChange={(value) => updateFilter('markets', [value])}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MARKET_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Live/Prematch Toggle */}
        <Select value={filters.livePreMatch} onValueChange={(value: any) => updateFilter('livePreMatch', value)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="prematch">Pre-match</SelectItem>
          </SelectContent>
        </Select>

        {/* EV Threshold */}
        <div className="flex items-center gap-2 min-w-[140px]">
          <span className="text-sm text-muted-foreground">EV%:</span>
          <div className="flex-1 px-2">
            <Slider
              value={[filters.evThreshold]}
              onValueChange={(value) => updateFilter('evThreshold', value[0])}
              min={-20}
              max={20}
              step={0.1}
              className="w-full [&_[role=slider]]:cursor-grab [&_[role=slider]:active]:cursor-grabbing"
            />
          </div>
          <span className="text-sm font-mono min-w-[40px]">
            {filters.evThreshold > 0 ? '+' : ''}{filters.evThreshold.toFixed(1)}%
          </span>
        </div>

        {/* Advanced Filters Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-muted-foreground hover:text-foreground"
        >
          <Filter className="h-4 w-4 mr-1" />
          {showAdvanced ? 'Hide' : 'More'}
        </Button>

        {/* Reset */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-4 pt-4 border-t">
          {/* Leagues */}
          <div>
            <label className="text-sm font-medium mb-2 block">Leagues</label>
            <div className="flex flex-wrap gap-2">
              {availableLeagues.map(league => (
                <Button
                  key={league}
                  variant={filters.leagues.includes(league) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleLeague(league)}
                  className="h-7 px-2"
                >
                  {league.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* My Books */}
          <div>
            <label className="text-sm font-medium mb-2 block">My Books</label>
            <div className="flex flex-wrap gap-2">
              {availableBooks.slice(0, 10).map(book => (
                <Button
                  key={book}
                  variant={filters.myBooks.includes(book) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleBook(book)}
                  className="h-7 px-2"
                >
                  {book}
                </Button>
              ))}
            </div>
          </div>

          {/* Odds Range */}
          <div>
            <label className="text-sm font-medium mb-2 block">Odds Range</label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                placeholder="Min"
                value={filters.oddsRange[0] === -Infinity ? '' : filters.oddsRange[0]}
                onChange={(e) => {
                  const val = e.target.value === '' ? -Infinity : Number(e.target.value);
                  updateFilter('oddsRange', [val, filters.oddsRange[1]]);
                }}
                className="w-24"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.oddsRange[1] === Infinity ? '' : filters.oddsRange[1]}
                onChange={(e) => {
                  const val = e.target.value === '' ? Infinity : Number(e.target.value);
                  updateFilter('oddsRange', [filters.oddsRange[0], val]);
                }}
                className="w-24"
              />
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {(filters.leagues.length > 0 || filters.myBooks.length > 0 || filters.search) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active:</span>
          {filters.search && (
            <Badge variant="secondary" className="text-xs">
              Search: "{filters.search}"
            </Badge>
          )}
          {filters.leagues.map(league => (
            <Badge key={league} variant="secondary" className="text-xs">
              {league}
            </Badge>
          ))}
          {filters.myBooks.map(book => (
            <Badge key={book} variant="secondary" className="text-xs flex items-center gap-1">
              <span className="font-bold">
                {book.slice(0, 3).toUpperCase()}
              </span>
              <span>{book}</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}