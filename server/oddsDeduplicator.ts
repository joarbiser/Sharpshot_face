// Comprehensive odds deduplication and management service
export class OddsDeduplicator {
  private static instance: OddsDeduplicator;
  private processedGames = new Map<string, { timestamp: number; opportunities: any[] }>();
  private readonly CACHE_DURATION = 60000; // 1 minute cache
  private readonly CLEANUP_INTERVAL = 300000; // 5 minutes

  constructor() {
    // Clean up old entries periodically
    setInterval(() => this.cleanupOldEntries(), this.CLEANUP_INTERVAL);
  }

  static getInstance(): OddsDeduplicator {
    if (!OddsDeduplicator.instance) {
      OddsDeduplicator.instance = new OddsDeduplicator();
    }
    return OddsDeduplicator.instance;
  }

  private cleanupOldEntries(): void {
    const now = Date.now();
    const entries = Array.from(this.processedGames.entries());
    for (const [gameId, data] of entries) {
      if (now - data.timestamp > this.CACHE_DURATION * 5) { // Keep for 5x cache duration
        this.processedGames.delete(gameId);
      }
    }
  }

  // Check if game was recently processed
  isRecentlyProcessed(gameId: string): boolean {
    const cached = this.processedGames.get(gameId);
    if (!cached) return false;
    
    const age = Date.now() - cached.timestamp;
    return age < this.CACHE_DURATION;
  }

  // Cache processed game results
  cacheGameResult(gameId: string, opportunities: any[]): void {
    this.processedGames.set(gameId, {
      timestamp: Date.now(),
      opportunities
    });
  }

  // Get cached opportunities if available
  getCachedOpportunities(gameId: string): any[] | null {
    const cached = this.processedGames.get(gameId);
    if (!cached || !this.isRecentlyProcessed(gameId)) {
      return null;
    }
    return cached.opportunities;
  }

  // Deduplicate sportsbooks with comprehensive logic
  deduplicateSportsbooks(books: any[], marketType: string): any[] {
    const uniqueBooks = new Map<string, any>();
    
    books.forEach(book => {
      // Normalize provider name by removing spaces, special chars, converting to lowercase
      const normalizedProvider = book.provider
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ''); // Remove all non-alphanumeric characters
      
      // Create unique signature based on odds to catch true duplicates
      let oddsSignature = '';
      if (marketType === 'moneyline') {
        oddsSignature = `${Math.round(book.moneyLine1 * 1000)}_${Math.round(book.moneyLine2 * 1000)}`;
      } else if (marketType === 'spread') {
        oddsSignature = `${book.spread}_${Math.round(book.spreadLine1 * 1000)}_${Math.round(book.spreadLine2 * 1000)}`;
      } else if (marketType === 'total') {
        oddsSignature = `${book.overUnder}_${Math.round(book.overUnderLineOver * 1000)}_${Math.round(book.overUnderLineUnder * 1000)}`;
      }

      const uniqueKey = `${normalizedProvider}_${oddsSignature}`;
      
      // Only keep if we haven't seen this exact combination
      if (!uniqueBooks.has(normalizedProvider)) {
        uniqueBooks.set(normalizedProvider, {
          ...book,
          originalProvider: book.provider,
          uniqueSignature: uniqueKey,
          normalizedName: normalizedProvider
        });
      }
    });

    return Array.from(uniqueBooks.values());
  }

  // Final deduplication across all opportunities
  deduplicateOpportunities(opportunities: any[]): any[] {
    const uniqueOpps = new Map<string, any>();
    
    opportunities.forEach(opp => {
      // Create comprehensive key to identify true duplicates
      const key = `${opp.game.toLowerCase().replace(/\s+/g, '')}_${opp.market}_${opp.line?.toString().toLowerCase() || 'none'}`;
      const existing = uniqueOpps.get(key);
      
      if (!existing) {
        uniqueOpps.set(key, opp);
      } else {
        // Keep the opportunity with higher EV or more sportsbooks
        const currentBooksCount = opp.oddsComparison?.length || 0;
        const existingBooksCount = existing.oddsComparison?.length || 0;
        
        if (opp.ev > existing.ev || currentBooksCount > existingBooksCount) {
          uniqueOpps.set(key, opp);
        }
      }
    });

    return Array.from(uniqueOpps.values());
  }

  // Get fresh games to process (avoiding recently processed ones)
  getFreshGames(allGames: any[]): any[] {
    return allGames.filter(game => !this.isRecentlyProcessed(game.gameID));
  }

  // Clear cache for immediate fresh data when needed
  clearCache(): void {
    this.processedGames.clear();
  }
}