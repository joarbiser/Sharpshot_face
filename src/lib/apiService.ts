// src/lib/apiService.ts
// API service for AreYouWatchingThis sports betting data

export interface GameData {
  id: string;
  home: string;
  away: string;
  sport: string;
  league: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'ended';
  homeScore?: number;
  awayScore?: number;
}

export interface OddsData {
  gameId: string;
  sportsbook: string;
  market: 'moneyline' | 'spread' | 'total';
  side: 'home' | 'away' | 'over' | 'under';
  line?: number;
  odds: number; // decimal odds
  timestamp: string;
}

export interface ProcessedOpportunity {
  id: string;
  event: GameData;
  market: {
    type: string;
    side: string;
    line?: number;
  };
  myPrice: {
    odds: number;
    book: string;
  };
  fieldPrices: Array<{
    odds: number;
    book: string;
  }>;
  evPercent: number;
  impliedProb: number;
}

class APIService {
  private readonly baseUrl = 'https://sharpshot.api.areyouwatchingthis.com/api';
  private readonly apiKey = '3e8b23fdd1b6030714b9320484d7367b';

  /**
   * Parse XML response to extract game data
   */
  private parseGamesXML(xmlString: string): GameData[] {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlString, 'text/xml');
      const games = doc.querySelectorAll('game');
      
      return Array.from(games).map(game => ({
        id: game.getAttribute('id') || '',
        home: game.querySelector('home')?.textContent || '',
        away: game.querySelector('away')?.textContent || '',
        sport: game.querySelector('sport')?.textContent || '',
        league: game.querySelector('league')?.textContent || '',
        startTime: game.querySelector('startTime')?.textContent || '',
        status: this.parseGameStatus(game.querySelector('status')?.textContent || ''),
        homeScore: this.parseScore(game.querySelector('homeScore')?.textContent),
        awayScore: this.parseScore(game.querySelector('awayScore')?.textContent)
      }));
    } catch (error) {
      console.error('Error parsing games XML:', error);
      return [];
    }
  }

  /**
   * Parse XML response to extract odds data
   */
  private parseOddsXML(xmlString: string, gameId: string): OddsData[] {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlString, 'text/xml');
      const odds = doc.querySelectorAll('odd');
      
      return Array.from(odds).map(odd => ({
        gameId,
        sportsbook: odd.querySelector('sportsbook')?.textContent || '',
        market: this.parseMarketType(odd.querySelector('market')?.textContent || ''),
        side: this.parseMarketSide(odd.querySelector('side')?.textContent || ''),
        line: this.parseLine(odd.querySelector('line')?.textContent),
        odds: this.parseDecimalOdds(odd.querySelector('odds')?.textContent || ''),
        timestamp: odd.querySelector('timestamp')?.textContent || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error parsing odds XML:', error);
      return [];
    }
  }

  private parseGameStatus(status: string): 'upcoming' | 'live' | 'ended' {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('live') || statusLower.includes('in-progress')) return 'live';
    if (statusLower.includes('final') || statusLower.includes('ended')) return 'ended';
    return 'upcoming';
  }

  private parseScore(scoreText: string | null | undefined): number | undefined {
    if (!scoreText) return undefined;
    const score = parseInt(scoreText, 10);
    return isNaN(score) ? undefined : score;
  }

  private parseMarketType(market: string): 'moneyline' | 'spread' | 'total' {
    const marketLower = market.toLowerCase();
    if (marketLower.includes('spread') || marketLower.includes('point')) return 'spread';
    if (marketLower.includes('total') || marketLower.includes('over/under')) return 'total';
    return 'moneyline';
  }

  private parseMarketSide(side: string): 'home' | 'away' | 'over' | 'under' {
    const sideLower = side.toLowerCase();
    if (sideLower.includes('away') || sideLower === 'a') return 'away';
    if (sideLower.includes('over') || sideLower === 'o') return 'over';
    if (sideLower.includes('under') || sideLower === 'u') return 'under';
    return 'home';
  }

  private parseLine(lineText: string | null | undefined): number | undefined {
    if (!lineText) return undefined;
    const line = parseFloat(lineText);
    return isNaN(line) ? undefined : line;
  }

  private parseDecimalOdds(oddsText: string): number {
    const odds = parseFloat(oddsText);
    return isNaN(odds) ? 1.0 : odds;
  }

  /**
   * Fetch all games from API
   */
  async fetchGames(): Promise<GameData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/games.xml?apiKey=${this.apiKey}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/xml, text/xml',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const xmlText = await response.text();
      return this.parseGamesXML(xmlText);
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  }

  /**
   * Fetch odds for a specific game
   */
  async fetchOdds(gameId: string): Promise<OddsData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/odds.xml?apiKey=${this.apiKey}&gameID=${gameId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/xml, text/xml',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const xmlText = await response.text();
      return this.parseOddsXML(xmlText, gameId);
    } catch (error) {
      console.error(`Error fetching odds for game ${gameId}:`, error);
      throw error;
    }
  }

  /**
   * Fetch complete betting opportunities
   */
  async fetchBettingOpportunities(): Promise<ProcessedOpportunity[]> {
    try {
      const games = await this.fetchGames();
      const opportunities: ProcessedOpportunity[] = [];

      // Fetch odds for all games in parallel
      const oddsPromises = games.map(game => 
        this.fetchOdds(game.id).catch(error => {
          console.error(`Failed to fetch odds for game ${game.id}:`, error);
          return [];
        })
      );

      const allOdds = await Promise.all(oddsPromises);

      // Process each game's odds
      games.forEach((game, index) => {
        const gameOdds = allOdds[index];
        const processedOpps = this.processGameOpportunities(game, gameOdds);
        opportunities.push(...processedOpps);
      });

      return opportunities;
    } catch (error) {
      console.error('Error fetching betting opportunities:', error);
      throw error;
    }
  }

  /**
   * Process odds data for a single game into betting opportunities
   */
  private processGameOpportunities(game: GameData, odds: OddsData[]): ProcessedOpportunity[] {
    const opportunities: ProcessedOpportunity[] = [];
    const groupedOdds = this.groupOddsByMarket(odds);

    Object.entries(groupedOdds).forEach(([marketKey, marketOdds]) => {
      const [marketType, side, line] = marketKey.split('|');
      
      if (marketOdds.length < 2) return; // Need at least 2 sportsbooks for comparison
      
      // Sort by best odds
      const sortedOdds = marketOdds.sort((a, b) => b.odds - a.odds);
      const bestOdds = sortedOdds[0];
      const fieldOdds = sortedOdds.slice(1);

      // Calculate EV using our enhanced calculation
      const evPercent = this.calculateEVForOpportunity(bestOdds, fieldOdds);
      const impliedProb = this.calculateImpliedProbability(bestOdds.odds);

      opportunities.push({
        id: `${game.id}-${marketKey}-${bestOdds.sportsbook}`,
        event: game,
        market: {
          type: marketType,
          side: side,
          line: line ? parseFloat(line) : undefined
        },
        myPrice: {
          odds: bestOdds.odds,
          book: bestOdds.sportsbook
        },
        fieldPrices: fieldOdds.map(odd => ({
          odds: odd.odds,
          book: odd.sportsbook
        })),
        evPercent,
        impliedProb
      });
    });

    return opportunities;
  }

  private groupOddsByMarket(odds: OddsData[]): Record<string, OddsData[]> {
    return odds.reduce((groups, odd) => {
      const key = `${odd.market}|${odd.side}|${odd.line || ''}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(odd);
      return groups;
    }, {} as Record<string, OddsData[]>);
  }

  private calculateEVForOpportunity(bestOdds: OddsData, fieldOdds: OddsData[]): number {
    // Convert to American odds
    const americanOdds = this.decimalToAmerican(bestOdds.odds);
    
    // Calculate market consensus from field odds
    const allOdds = [bestOdds, ...fieldOdds].map(odd => odd.odds);
    const avgDecimalOdds = allOdds.reduce((sum, odds) => sum + odds, 0) / allOdds.length;
    const fairImpliedProb = 1 / avgDecimalOdds;

    // Use our enhanced EV calculation
    return this.calculateEVPercentage(fairImpliedProb, americanOdds);
  }

  private decimalToAmerican(decimalOdds: number): number {
    if (decimalOdds >= 2.0) {
      return Math.round((decimalOdds - 1) * 100);
    } else {
      return Math.round(-100 / (decimalOdds - 1));
    }
  }

  private calculateImpliedProbability(decimalOdds: number): number {
    return 1 / decimalOdds;
  }

  private calculateEVPercentage(impliedProbability: number, americanOdds: number, stake: number = 100): number {
    // Calculate actual payout based on offered odds
    let actualPayout: number;
    if (americanOdds > 0) {
      actualPayout = (americanOdds / 100) * stake;
    } else {
      actualPayout = stake;
    }
    
    const amountWon = actualPayout - stake;
    const amountLost = stake;
    const probabilityOfLosing = 1 - impliedProbability;
    
    const ev = (impliedProbability * amountWon) - (probabilityOfLosing * amountLost);
    return (ev / stake) * 100;
  }
}

export const apiService = new APIService();