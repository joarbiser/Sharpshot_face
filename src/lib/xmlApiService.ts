// src/lib/xmlApiService.ts
// XML API service for AreYouWatchingThis sports data

const API_KEY = '3e8b23fdd1b6030714b9320484d7367b';
const BASE_URL = 'https://api.areyouwatchingthis.com';

export interface GameData {
  id: string;
  home: string;
  away: string;
  sport: string;
  league: string;
  startTime: string;
  status: string;
  awayScore?: number;
  homeScore?: number;
}

export interface OddsData {
  gameId: string;
  book: string;
  market: string;
  side: string;
  line?: number;
  odds: number; // decimal odds
}

export interface ProcessedOpportunity {
  id: string;
  event: GameData;
  market: {
    type: string; // moneyline, spread, total, run line, team total
    side: string; // home, away, over, under
    line?: number; // spread line, total line
  };
  myPrice: {
    odds: number; // decimal odds
    book: string;
  };
  fieldPrices: Array<{
    odds: number; // decimal odds
    book: string;
  }>;
  evPercent?: number;
  impliedProb: number;
}

/**
 * Parse XML string to DOM Document
 */
function parseXML(xmlString: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, 'text/xml');
}

/**
 * Get text content from XML element
 */
function getXMLText(element: Element | null, defaultValue: string = ''): string {
  return element?.textContent?.trim() || defaultValue;
}

/**
 * Get number from XML element
 */
function getXMLNumber(element: Element | null, defaultValue: number = 0): number {
  const text = getXMLText(element);
  return text ? parseFloat(text) || defaultValue : defaultValue;
}

/**
 * Fetch and parse games from XML API
 */
export async function fetchGames(): Promise<GameData[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/games.xml?key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const xmlDoc = parseXML(xmlText);
    
    // Check for API errors
    const error = xmlDoc.querySelector('error');
    if (error) {
      throw new Error(`API Error: ${getXMLText(error)}`);
    }
    
    const games: GameData[] = [];
    const gameElements = xmlDoc.querySelectorAll('game');
    
    gameElements.forEach(gameEl => {
      const game: GameData = {
        id: getXMLText(gameEl.querySelector('id')),
        home: getXMLText(gameEl.querySelector('home')),
        away: getXMLText(gameEl.querySelector('away')),
        sport: getXMLText(gameEl.querySelector('sport')),
        league: getXMLText(gameEl.querySelector('league')),
        startTime: getXMLText(gameEl.querySelector('startTime')),
        status: getXMLText(gameEl.querySelector('status')),
        homeScore: getXMLNumber(gameEl.querySelector('homeScore')),
        awayScore: getXMLNumber(gameEl.querySelector('awayScore'))
      };
      
      if (game.id && game.home && game.away) {
        games.push(game);
      }
    });
    
    return games;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
}

/**
 * Fetch odds for a specific game
 */
export async function fetchOddsForGame(gameId: string): Promise<OddsData[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/odds.xml?gameID=${gameId}&key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const xmlDoc = parseXML(xmlText);
    
    // Check for API errors
    const error = xmlDoc.querySelector('error');
    if (error) {
      throw new Error(`API Error: ${getXMLText(error)}`);
    }
    
    const odds: OddsData[] = [];
    const oddsElements = xmlDoc.querySelectorAll('odds');
    
    oddsElements.forEach(oddsEl => {
      const oddsData: OddsData = {
        gameId,
        book: getXMLText(oddsEl.querySelector('book')),
        market: getXMLText(oddsEl.querySelector('market')),
        side: getXMLText(oddsEl.querySelector('side')),
        line: getXMLNumber(oddsEl.querySelector('line')),
        odds: getXMLNumber(oddsEl.querySelector('odds'))
      };
      
      if (oddsData.book && oddsData.market && oddsData.odds > 0) {
        odds.push(oddsData);
      }
    });
    
    return odds;
  } catch (error) {
    console.error(`Error fetching odds for game ${gameId}:`, error);
    throw error;
  }
}

/**
 * Convert American odds to decimal odds
 */
export function americanToDecimal(americanOdds: number): number {
  if (americanOdds > 0) {
    return (americanOdds / 100) + 1;
  } else {
    return (100 / Math.abs(americanOdds)) + 1;
  }
}

/**
 * Convert decimal odds to American odds
 */
export function decimalToAmerican(decimalOdds: number): number {
  if (decimalOdds >= 2.0) {
    return Math.round((decimalOdds - 1) * 100);
  } else {
    return Math.round(-100 / (decimalOdds - 1));
  }
}

/**
 * Calculate implied probability from American odds
 */
export function calculateImpliedProbability(americanOdds: number): number {
  if (americanOdds > 0) {
    return 100 / (americanOdds + 100);
  } else {
    return Math.abs(americanOdds) / (Math.abs(americanOdds) + 100);
  }
}

/**
 * Calculate Expected Value following Pinnacle formula
 */
export function calculateEV(impliedProbability: number, americanOdds: number, stake: number = 100): number {
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
  return (ev / stake) * 100; // Return as percentage
}

/**
 * Get sport name from league
 */
export function getSportName(league: string): string {
  if (!league) return 'Unknown';
  
  const leagueLower = league.toLowerCase();
  
  if (leagueLower.includes('nfl') || leagueLower.includes('football')) return 'Football';
  if (leagueLower.includes('nba') || leagueLower.includes('basketball')) return 'Basketball';
  if (leagueLower.includes('mlb') || leagueLower.includes('baseball')) return 'Baseball';
  if (leagueLower.includes('nhl') || leagueLower.includes('hockey')) return 'Hockey';
  if (leagueLower.includes('soccer') || leagueLower.includes('fifa') || leagueLower.includes('uefa')) return 'Soccer';
  if (leagueLower.includes('tennis')) return 'Tennis';
  if (leagueLower.includes('golf')) return 'Golf';
  if (leagueLower.includes('mma') || leagueLower.includes('ufc')) return 'MMA';
  if (leagueLower.includes('boxing')) return 'Boxing';
  if (leagueLower.includes('racing') || leagueLower.includes('f1') || leagueLower.includes('nascar')) return 'Racing';
  if (leagueLower.includes('esports') || leagueLower.includes('lol') || leagueLower.includes('csgo')) return 'Esports';
  
  return league;
}

/**
 * Format bet type properly
 */
export function formatBetType(side: string, type: string, line?: number): string {
  const typeLC = type.toLowerCase();
  
  if (typeLC === 'moneyline') {
    return side === 'home' ? 'Home ML' : 'Away ML';
  }
  
  if (typeLC === 'spread' || typeLC === 'point spread') {
    if (line !== undefined) {
      return side === 'home' ? `Home ${line > 0 ? '+' : ''}${line}` : `Away ${line > 0 ? '+' : ''}${line}`;
    }
    return side === 'home' ? 'Home Spread' : 'Away Spread';
  }
  
  if (typeLC === 'total' || typeLC === 'over/under') {
    if (line !== undefined) {
      return side === 'over' ? `Over ${line}` : `Under ${line}`;
    }
    return side === 'over' ? 'Over' : 'Under';
  }
  
  return `${side} ${type}`;
}

/**
 * Process betting opportunities from games and odds data
 */
export async function fetchBettingOpportunities(): Promise<ProcessedOpportunity[]> {
  try {
    // Fetch all games
    const games = await fetchGames();
    console.log(`Fetched ${games.length} games from XML API`);
    
    const opportunities: ProcessedOpportunity[] = [];
    
    // Process each game
    for (const game of games.slice(0, 10)) { // Limit to 10 games for performance
      try {
        const gameOdds = await fetchOddsForGame(game.id);
        console.log(`Fetched ${gameOdds.length} odds for game ${game.home} vs ${game.away}`);
        
        // Group odds by market type and side
        const marketGroups = new Map<string, OddsData[]>();
        
        gameOdds.forEach(odds => {
          const key = `${odds.market}-${odds.side}-${odds.line || 'noLine'}`;
          if (!marketGroups.has(key)) {
            marketGroups.set(key, []);
          }
          marketGroups.get(key)!.push(odds);
        });
        
        // Create opportunities for each market
        marketGroups.forEach((oddsGroup, marketKey) => {
          if (oddsGroup.length < 2) return; // Need at least 2 books for comparison
          
          // Sort by odds (best odds first)
          oddsGroup.sort((a, b) => b.odds - a.odds);
          
          const bestOdds = oddsGroup[0];
          const otherOdds = oddsGroup.slice(1);
          
          // Calculate EV (simplified - would need proper fair probability calculation)
          const impliedProb = 1 / bestOdds.odds;
          const americanOdds = decimalToAmerican(bestOdds.odds);
          const evPercent = calculateEV(impliedProb, americanOdds);
          
          const opportunity: ProcessedOpportunity = {
            id: `${game.id}-${marketKey}-${bestOdds.book}`,
            event: game,
            market: {
              type: bestOdds.market,
              side: bestOdds.side,
              line: bestOdds.line
            },
            myPrice: {
              odds: bestOdds.odds,
              book: bestOdds.book
            },
            fieldPrices: otherOdds.map(odds => ({
              odds: odds.odds,
              book: odds.book
            })),
            evPercent,
            impliedProb: impliedProb * 100
          };
          
          opportunities.push(opportunity);
        });
        
      } catch (error) {
        console.error(`Error processing game ${game.id}:`, error);
      }
    }
    
    console.log(`Created ${opportunities.length} betting opportunities`);
    return opportunities;
    
  } catch (error) {
    console.error('Error fetching betting opportunities:', error);
    throw error;
  }
}

/**
 * Deduplicate opportunities
 */
export function deduplicateOpportunities(opportunities: ProcessedOpportunity[]): ProcessedOpportunity[] {
  const uniqueOpportunities = opportunities.filter((opp, index, arr) => {
    const key = `${opp.event?.home}-${opp.event?.away}-${opp.market?.type}-${opp.market?.side}-${opp.market?.line}`;
    return arr.findIndex(o => 
      `${o.event?.home}-${o.event?.away}-${o.market?.type}-${o.market?.side}-${o.market?.line}` === key
    ) === index;
  });
  
  return uniqueOpportunities;
}