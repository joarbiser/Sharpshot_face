import { useState, useCallback, useMemo } from 'react';
import { Search, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTerminalFilters, MOCK_LEAGUES, MOCK_MARKETS, MOCK_PROP_TYPES, MOCK_BOOKS, formatOddsWithProbability } from './store';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useState(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  });

  return debouncedValue;
}

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function SegmentedControl({ options, value, onChange, className = '' }: SegmentedControlProps) {
  return (
    <div className={`inline-flex rounded-md border bg-muted p-1 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
            value === option.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
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
          className="justify-between min-w-[140px]"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          {displayValue}
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

interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
}

function NumberStepper({ value, onChange, min = 0, max = 50, step = 1, label }: NumberStepperProps) {
  return (
    <div className="flex items-center gap-2">
      <Label className="text-sm font-medium whitespace-nowrap" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
        {label}
      </Label>
      <div className="flex items-center border rounded">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          className="px-2 py-1 hover:bg-muted transition-colors text-sm"
          disabled={value <= min}
        >
          −
        </button>
        <span className="px-3 py-1 min-w-[3rem] text-center text-sm font-mono">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          className="px-2 py-1 hover:bg-muted transition-colors text-sm"
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

  const selectedBookName = useMemo(() => {
    return myBook ? MOCK_BOOKS.find(book => book === myBook) || myBook : null;
  }, [myBook]);

  return (
    <div className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b">
      <div className="px-4 py-3">
        {/* Desktop: Single row, Mobile: Wraps */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Left Group - Dropdowns */}
          <div className="flex items-center gap-3 flex-wrap">
            <MultiSelect
              options={MOCK_LEAGUES}
              selected={leagues}
              onSelectionChange={setLeagues}
              placeholder="All Leagues"
              label="Leagues"
            />
            
            <MultiSelect
              options={MOCK_MARKETS}
              selected={markets}
              onSelectionChange={setMarkets}
              placeholder="All Markets"
              label="Markets"
            />
            
            <MultiSelect
              options={MOCK_PROP_TYPES}
              selected={propTypes}
              onSelectionChange={setPropTypes}
              placeholder="All Props"
              label="Props"
            />
            
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium whitespace-nowrap" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                O/U:
              </Label>
              <SegmentedControl
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'over', label: 'Over' },
                  { value: 'under', label: 'Under' }
                ]}
                value={ouMode}
                onChange={(value) => setOuMode(value as 'all' | 'over' | 'under')}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium whitespace-nowrap" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Timing:
              </Label>
              <SegmentedControl
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'prematch', label: 'Pre' },
                  { value: 'live', label: 'Live' }
                ]}
                value={timing}
                onChange={(value) => setTiming(value as 'all' | 'prematch' | 'live')}
              />
            </div>
          </div>

          <Separator orientation="vertical" className="hidden md:block h-8" />

          {/* Middle Group - Range & Threshold */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="space-y-2 min-w-[200px]">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  Odds Range
                </Label>
                <div className="text-xs text-muted-foreground font-mono">
                  {oddsMin} to {oddsMax}
                </div>
              </div>
              <Slider
                min={-1000}
                max={1000}
                step={25}
                value={[oddsMin, oddsMax]}
                onValueChange={handleOddsRangeChange}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatOddsWithProbability(oddsMin)}</span>
                <span>{formatOddsWithProbability(oddsMax)}</span>
              </div>
            </div>
            
            <div className="space-y-2 min-w-[160px]">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  +EV Threshold
                </Label>
                <Badge variant="outline" className="text-xs font-mono">
                  {evThreshold}%
                </Badge>
              </div>
              <Slider
                min={0}
                max={20}
                step={0.5}
                value={[evThreshold]}
                onValueChange={(values) => setEvThreshold(values[0])}
                className="py-2"
              />
            </div>
            
            <NumberStepper
              value={minSamples}
              onChange={setMinSamples}
              min={0}
              max={50}
              label="Min Data"
            />
          </div>

          <Separator orientation="vertical" className="hidden lg:block h-8" />

          {/* Right Group - Book + Actions */}
          <div className="flex items-center gap-3 flex-wrap ml-auto">
            {/* My Book Selector - Primary */}
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                My Book:
              </Label>
              <Select value={myBook || 'none'} onValueChange={(value) => setMyBook(value === 'none' ? null : value)}>
                <SelectTrigger className="min-w-[120px] border-2 border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Select Book" />
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
            
            <Button
              variant="ghost"
              size="sm"
              onClick={resetAll}
              className="gap-2"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              <RotateCcw className="h-4 w-4" />
              Reset Filters
            </Button>
            
            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events, props..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}