import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTerminalFilters } from './store';

export function ActiveFilterChips() {
  const {
    leagues, markets, propTypes, ouMode, timing,
    oddsMin, oddsMax, evThreshold, minSamples, query,
    removeLeague, removeMarket, removePropType,
    setOuMode, setTiming, setEvThreshold, setMinSamples, setQuery,
    setOddsMin, setOddsMax, resetAll
  } = useTerminalFilters();

  // Determine which filters are active (non-default)
  const hasActiveFilters = 
    leagues.length > 0 ||
    markets.length > 0 ||
    propTypes.length > 0 ||
    ouMode !== 'all' ||
    timing !== 'all' ||
    oddsMin !== -100000 ||
    oddsMax !== 100000 ||
    evThreshold > 0 ||
    minSamples > 0 ||
    query.length > 0;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="px-4 py-2 bg-muted/30 border-b">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-muted-foreground" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          Active Filters:
        </span>
        
        {/* League chips */}
        {leagues.map((league) => (
          <Badge key={league} variant="secondary" className="gap-1 text-xs">
            {league}
            <button
              onClick={() => removeLeague(league)}
              className="ml-1 hover:text-destructive"
              aria-label={`Remove ${league} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        
        {/* Market chips */}
        {markets.map((market) => (
          <Badge key={market} variant="secondary" className="gap-1 text-xs">
            {market}
            <button
              onClick={() => removeMarket(market)}
              className="ml-1 hover:text-destructive"
              aria-label={`Remove ${market} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        
        {/* Prop type chips */}
        {propTypes.map((propType) => (
          <Badge key={propType} variant="secondary" className="gap-1 text-xs">
            {propType}
            <button
              onClick={() => removePropType(propType)}
              className="ml-1 hover:text-destructive"
              aria-label={`Remove ${propType} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        
        {/* O/U Mode chip */}
        {ouMode !== 'all' && (
          <Badge variant="secondary" className="gap-1 text-xs">
            {ouMode === 'over' ? 'Over Only' : 'Under Only'}
            <button
              onClick={() => setOuMode('all')}
              className="ml-1 hover:text-destructive"
              aria-label="Remove Over/Under filter"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        
        {/* Timing chip */}
        {timing !== 'all' && (
          <Badge variant="secondary" className="gap-1 text-xs">
            {timing === 'prematch' ? 'Prematch Only' : 'Live Only'}
            <button
              onClick={() => setTiming('all')}
              className="ml-1 hover:text-destructive"
              aria-label="Remove timing filter"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        
        {/* Odds range chip */}
        {(oddsMin !== -100000 || oddsMax !== 100000) && (
          <Badge variant="secondary" className="gap-1 text-xs">
            Odds: {oddsMin} to {oddsMax}
            <button
              onClick={() => {
                setOddsMin(-100000);
                setOddsMax(100000);
              }}
              className="ml-1 hover:text-destructive"
              aria-label="Remove odds range filter"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        
        {/* EV threshold chip */}
        {evThreshold > 0 && (
          <Badge variant="secondary" className="gap-1 text-xs">
            +EV ≥ {evThreshold}%
            <button
              onClick={() => setEvThreshold(0)}
              className="ml-1 hover:text-destructive"
              aria-label="Remove EV threshold filter"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        
        {/* Min samples chip */}
        {minSamples > 0 && (
          <Badge variant="secondary" className="gap-1 text-xs">
            Min Data: {minSamples}
            <button
              onClick={() => setMinSamples(0)}
              className="ml-1 hover:text-destructive"
              aria-label="Remove minimum samples filter"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        
        {/* Search query chip */}
        {query.length > 0 && (
          <Badge variant="secondary" className="gap-1 text-xs">
            Search: "{query.length > 20 ? query.substring(0, 20) + '...' : query}"
            <button
              onClick={() => setQuery('')}
              className="ml-1 hover:text-destructive"
              aria-label="Remove search filter"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        
        {/* Clear all button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={resetAll}
          className="text-xs text-muted-foreground hover:text-foreground ml-2"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
}