import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TerminalFiltersState {
  // Filter selections
  leagues: string[];
  markets: string[];
  propTypes: string[];
  ouMode: 'all' | 'over' | 'under';
  timing: 'all' | 'prematch' | 'live';
  
  // Numeric filters
  oddsMin: number;
  oddsMax: number;
  evThreshold: number;
  minSamples: number;
  
  // Book and search
  myBook: string | null;
  query: string;
  
  // UI state
  dismissedMyBookTip: boolean;
}

interface TerminalFiltersActions {
  // Setters
  setLeagues: (leagues: string[]) => void;
  setMarkets: (markets: string[]) => void;
  setPropTypes: (propTypes: string[]) => void;
  setOuMode: (mode: 'all' | 'over' | 'under') => void;
  setTiming: (timing: 'all' | 'prematch' | 'live') => void;
  setOddsMin: (min: number) => void;
  setOddsMax: (max: number) => void;
  setEvThreshold: (threshold: number) => void;
  setMinSamples: (samples: number) => void;
  setMyBook: (book: string | null) => void;
  setQuery: (query: string) => void;
  dismissTip: () => void;
  
  // Array helpers
  addLeague: (league: string) => void;
  removeLeague: (league: string) => void;
  addMarket: (market: string) => void;
  removeMarket: (market: string) => void;
  addPropType: (propType: string) => void;
  removePropType: (propType: string) => void;
  
  // Reset
  resetAll: () => void;
}

const defaultState: TerminalFiltersState = {
  leagues: [],
  markets: [],
  propTypes: [],
  ouMode: 'all',
  timing: 'all',
  oddsMin: -500,
  oddsMax: 500,
  evThreshold: 0,
  minSamples: 0,
  myBook: null,
  query: '',
  dismissedMyBookTip: false,
};

export const useTerminalFilters = create<TerminalFiltersState & TerminalFiltersActions>()(
  persist(
    (set, get) => ({
      // State
      ...defaultState,
      
      // Actions
      setLeagues: (leagues) => set({ leagues }),
      setMarkets: (markets) => set({ markets }),
      setPropTypes: (propTypes) => set({ propTypes }),
      setOuMode: (ouMode) => set({ ouMode }),
      setTiming: (timing) => set({ timing }),
      setOddsMin: (oddsMin) => {
        const { oddsMax } = get();
        // Ensure min <= max
        set({ oddsMin: Math.min(oddsMin, oddsMax) });
      },
      setOddsMax: (oddsMax) => {
        const { oddsMin } = get();
        // Ensure min <= max
        set({ oddsMax: Math.max(oddsMax, oddsMin) });
      },
      setEvThreshold: (evThreshold) => set({ evThreshold }),
      setMinSamples: (minSamples) => set({ minSamples }),
      setMyBook: (myBook) => set({ myBook }),
      setQuery: (query) => set({ query }),
      dismissTip: () => set({ dismissedMyBookTip: true }),
      
      // Array helpers
      addLeague: (league) => set((state) => ({
        leagues: state.leagues.includes(league) ? state.leagues : [...state.leagues, league]
      })),
      removeLeague: (league) => set((state) => ({
        leagues: state.leagues.filter(l => l !== league)
      })),
      addMarket: (market) => set((state) => ({
        markets: state.markets.includes(market) ? state.markets : [...state.markets, market]
      })),
      removeMarket: (market) => set((state) => ({
        markets: state.markets.filter(m => m !== market)
      })),
      addPropType: (propType) => set((state) => ({
        propTypes: state.propTypes.includes(propType) ? state.propTypes : [...state.propTypes, propType]
      })),
      removePropType: (propType) => set((state) => ({
        propTypes: state.propTypes.filter(pt => pt !== propType)
      })),
      
      // Reset
      resetAll: () => set(defaultState),
    }),
    {
      name: 'terminal-filters',
      partialize: (state) => ({
        leagues: state.leagues,
        markets: state.markets,
        propTypes: state.propTypes,
        ouMode: state.ouMode,
        timing: state.timing,
        evThreshold: state.evThreshold,
        minSamples: state.minSamples,
        myBook: state.myBook,
        dismissedMyBookTip: state.dismissedMyBookTip,
        // Don't persist query or odds range
      }),
    }
  )
);

// Mock data as specified
export const MOCK_LEAGUES = ['NFL', 'NCAAF', 'NBA', 'NCAAB', 'MLB', 'NHL', 'EPL', 'UFC', 'WNBA', 'MLS'];
export const MOCK_MARKETS = ['Moneyline', 'Spread', 'Total', 'Team Total', 'Alt Spread', 'Alt Total'];
export const MOCK_PROP_TYPES = ['Player Props', 'Team Props', 'Game Props'];
export const MOCK_BOOKS = ['DK', 'FD', 'MGM', 'PB', 'CAES', 'WB', 'BR', 'PN', 'SB', 'BX'];

// Utility functions
export const formatOddsWithProbability = (odds: number): string => {
  const probability = oddsToImpliedProbability(odds);
  return `${probability.toFixed(1)}%`;
};

export const oddsToImpliedProbability = (odds: number): number => {
  if (odds > 0) {
    return (100 / (odds + 100)) * 100;
  } else {
    return (Math.abs(odds) / (Math.abs(odds) + 100)) * 100;
  }
};