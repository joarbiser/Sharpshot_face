import { useState, useCallback, useMemo } from 'react';
import { Search, RotateCcw, Check, BookOpen, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useTerminalFilters, MOCK_LEAGUES, MOCK_MARKETS, MOCK_PROP_TYPES, MOCK_BOOKS, formatOddsWithProbability } from './store';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useState(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  });

  return debouncedValue;
}

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder: string;
  label: string;
}

function MultiSelect({ options, selected, onSelectionChange, placeholder, label }: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleSelection = (option: string) => {
    if (selected.includes(option)) {
      onSelectionChange(selected.filter(item => item !== option));
    } else {
      onSelectionChange([...selected, option]);
    }
  };

  const displayValue = selected.length === 0 
    ? placeholder 
    : `${label} (${selected.length})`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between h-10 rounded-xl"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          {displayValue}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => toggleSelection(option)}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center justify-center w-4 h-4">
                    {selected.includes(option) && <Check className="h-3 w-3" />}
                  </div>
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
}

function NumberInput({ value, onChange, min = 0, max = 50, step = 1, label }: NumberInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(Math.max(min, Math.min(max, newValue)));
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        {label}
      </Label>
      <div className="flex items-center border rounded-xl h-10 w-24">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          className="px-2 py-2 hover:bg-muted transition-colors text-sm flex-1"
          disabled={value <= min}
        >
          −
        </button>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          className="w-12 text-center text-sm font-mono bg-transparent border-none outline-none"
          min={min}
          max={max}
        />
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          className="px-2 py-2 hover:bg-muted transition-colors text-sm flex-1"
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function FilterBar() {
  const {
    leagues, markets, propTypes, ouMode, timing,
    oddsMin, oddsMax, evThreshold, minSamples, myBook, query,
    setLeagues, setMarkets, setPropTypes, setOuMode, setTiming,
    setOddsMin, setOddsMax, setEvThreshold, setMinSamples, setMyBook, setQuery,
    resetAll
  } = useTerminalFilters();

  const debouncedQuery = useDebounce(query, 300);

  // Handle odds range slider
  const handleOddsRangeChange = (values: number[]) => {
    setOddsMin(values[0]);
    setOddsMax(values[1]);
  };

  return (
    <div 
      className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b"
      data-testid="filter-bar"
    >
      <div className="px-4 py-4">
        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-12 gap-3 items-end min-h-[56px]">
          
          {/* Column 1-3: My Book (Primary emphasis) */}
          <div className="col-span-3 space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              My Book
            </Label>
            <div data-testid="my-book-select">
              <Select value={myBook || 'none'} onValueChange={(value) => setMyBook(value === 'none' ? null : value)}>
                <SelectTrigger className="h-10 rounded-xl border-2 border-primary/20 focus:border-primary bg-primary/5">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <SelectValue placeholder="Select Sportsbook" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None Selected</SelectItem>
                  {MOCK_BOOKS.map((book) => (
                    <SelectItem key={book} value={book}>
                      {book}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Column 4-6: League */}
          <div className="col-span-3 space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              League
            </Label>
            <MultiSelect
              options={MOCK_LEAGUES}
              selected={leagues}
              onSelectionChange={setLeagues}
              placeholder="All Leagues"
              label="Leagues"
            />
          </div>
          
          {/* Column 7-8: Market */}
          <div className="col-span-2 space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Market
            </Label>
            <MultiSelect
              options={MOCK_MARKETS}
              selected={markets}
              onSelectionChange={setMarkets}
              placeholder="All Markets"
              label="Markets"
            />
          </div>
          
          {/* Column 9-10: Prop Type */}
          <div className="col-span-2 space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Prop Type
            </Label>
            <MultiSelect
              options={MOCK_PROP_TYPES}
              selected={propTypes}
              onSelectionChange={setPropTypes}
              placeholder="All Props"
              label="Props"
            />
          </div>
          
          {/* Column 11: O/U */}
          <div className="col-span-1 space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              O/U
            </Label>
            <ToggleGroup
              type="single"
              value={ouMode}
              onValueChange={(value) => value && setOuMode(value as 'all' | 'over' | 'under')}
              className="justify-start h-10"
            >
              <ToggleGroupItem value="all" aria-label="All Over/Under" className="text-xs rounded-l-xl">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="over" aria-label="Over only" className="text-xs">
                Over
              </ToggleGroupItem>
              <ToggleGroupItem value="under" aria-label="Under only" className="text-xs rounded-r-xl">
                Under
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          {/* Column 12: Timing */}
          <div className="col-span-1 space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Timing
            </Label>
            <ToggleGroup
              type="single"
              value={timing}
              onValueChange={(value) => value && setTiming(value as 'all' | 'prematch' | 'live')}
              className="justify-start h-10"
            >
              <ToggleGroupItem value="all" aria-label="All timing" className="text-xs rounded-l-xl">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="prematch" aria-label="Prematch only" className="text-xs">
                Pre
              </ToggleGroupItem>
              <ToggleGroupItem value="live" aria-label="Live only" className="text-xs rounded-r-xl">
                Live
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Row B: Secondary Controls */}
        <div className="grid grid-cols-12 gap-3 items-end mt-4">
          
          {/* Column 1-6: Odds Range */}
          <div className="col-span-6 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Odds Range
              </Label>
              <div className="text-xs text-muted-foreground font-mono">
                {oddsMin} to {oddsMax}
              </div>
            </div>
            <div className="space-y-1">
              <Slider
                min={-1000}
                max={1000}
                step={25}
                value={[oddsMin, oddsMax]}
                onValueChange={handleOddsRangeChange}
                className="py-2"
                aria-valuetext={`Odds from ${oddsMin} to ${oddsMax}`}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatOddsWithProbability(oddsMin)}</span>
                <span>{formatOddsWithProbability(oddsMax)}</span>
              </div>
            </div>
          </div>
          
          {/* Column 7-8: EV Threshold */}
          <div className="col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                EV Threshold
              </Label>
              <Badge variant="outline" className="text-xs font-mono">
                ≥ {evThreshold}%
              </Badge>
            </div>
            <Slider
              min={0}
              max={20}
              step={0.5}
              value={[evThreshold]}
              onValueChange={(values) => setEvThreshold(values[0])}
              className="py-2"
              aria-valuetext={`Expected value threshold ${evThreshold} percent`}
            />
          </div>
          
          {/* Column 9: Min Data */}
          <div className="col-span-1">
            <NumberInput
              value={minSamples}
              onChange={setMinSamples}
              min={0}
              max={50}
              label="Min Data"
            />
          </div>
          
          {/* Column 10: Search (expands to fill remaining space) */}
          <div className="col-span-2 space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Events, props..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 h-10 rounded-xl"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              />
            </div>
          </div>
          
          {/* Column 11-12: Reset (Right aligned) */}
          <div className="col-span-1 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetAll}
              className="gap-2 h-10 rounded-xl"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}