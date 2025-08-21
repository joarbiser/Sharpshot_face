// src/lib/xmlApiService.ts
// XML API service for AreYouWatchingThis sports data

import { DOMParser } from '@xmldom/xmldom';

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
 * Parse XML string to DOM Document (server-safe)
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
    // Use mock data for development - replace with real API call when credentials are available
    const useMockData = true; // Set to false when real API is available
    
    if (useMockData) {
      // Use inline mock data to avoid import issues
      const MOCK_XML = `<?xml version="1.0" encoding="UTF-8"?>
<games>
  <game>
    <id>586657</id>
    <home>Tampa Bay Rays</home>
    <away>Boston Red Sox</away>
    <sport>Baseball</sport>
    <league>MLB</league>
    <startTime>2025-08-21T19:10:00Z</startTime>
    <status>scheduled</status>
    <homeScore>0</homeScore>
    <awayScore>0</awayScore>
  </game>
  <game>
    <id>586658</id>
    <home>New York Yankees</home>
    <away>Toronto Blue Jays</away>
    <sport>Baseball</sport>
    <league>MLB</league>
    <startTime>2025-08-21T19:05:00Z</startTime>
    <status>scheduled</status>
    <homeScore>0</homeScore>
    <awayScore>0</awayScore>
  </game>
  <game>
    <id>586659</id>
    <home>Los Angeles Lakers</home>
    <away>Golden State Warriors</away>
    <sport>Basketball</sport>
    <league>NBA</league>
    <startTime>2025-08-21T20:00:00Z</startTime>
    <status>scheduled</status>
    <homeScore>0</homeScore>
    <awayScore>0</awayScore>
  </game>
</games>`;
      
      const xmlDoc = parseXML(MOCK_XML);
      console.log('✅ Using inline mock XML data for development');
      
      const games: GameData[] = [];
      const gameElements = xmlDoc.getElementsByTagName('game');
      console.log(`📊 Found ${gameElements.length} game elements in mock data`);
      
      for (let i = 0; i < gameElements.length; i++) {
        const gameEl = gameElements[i] as Element;
        const game: GameData = {
          id: getXMLText(gameEl.getElementsByTagName('id')[0] as Element),
          home: getXMLText(gameEl.getElementsByTagName('home')[0] as Element),
          away: getXMLText(gameEl.getElementsByTagName('away')[0] as Element),
          sport: getXMLText(gameEl.getElementsByTagName('sport')[0] as Element),
          league: getXMLText(gameEl.getElementsByTagName('league')[0] as Element),
          startTime: getXMLText(gameEl.getElementsByTagName('startTime')[0] as Element),
          status: getXMLText(gameEl.getElementsByTagName('status')[0] as Element),
          homeScore: getXMLNumber(gameEl.getElementsByTagName('homeScore')[0] as Element),
          awayScore: getXMLNumber(gameEl.getElementsByTagName('awayScore')[0] as Element)
        };
        
        if (game.id && game.home && game.away) {
          games.push(game);
        }
      }
      
      return games;
    }
    
    // Real API call
    const response = await fetch(`${BASE_URL}/api/games.xml?key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const xmlDoc = parseXML(xmlText);
    
    // Check for API errors using getElementsByTagName (server-safe)
    const errorElements = xmlDoc.getElementsByTagName('error');
    if (errorElements.length > 0) {
      throw new Error(`API Error: ${getXMLText(errorElements[0] as Element)}`);
    }
    
    const games: GameData[] = [];
    const gameElements = xmlDoc.getElementsByTagName('game');
    
    for (let i = 0; i < gameElements.length; i++) {
      const gameEl = gameElements[i] as Element;
      const game: GameData = {
        id: getXMLText(gameEl.getElementsByTagName('id')[0] as Element),
        home: getXMLText(gameEl.getElementsByTagName('home')[0] as Element),
        away: getXMLText(gameEl.getElementsByTagName('away')[0] as Element),
        sport: getXMLText(gameEl.getElementsByTagName('sport')[0] as Element),
        league: getXMLText(gameEl.getElementsByTagName('league')[0] as Element),
        startTime: getXMLText(gameEl.getElementsByTagName('startTime')[0] as Element),
        status: getXMLText(gameEl.getElementsByTagName('status')[0] as Element),
        homeScore: getXMLNumber(gameEl.getElementsByTagName('homeScore')[0] as Element),
        awayScore: getXMLNumber(gameEl.getElementsByTagName('awayScore')[0] as Element)
      };
      
      if (game.id && game.home && game.away) {
        games.push(game);
      }
    }
    
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
    // Use mock data for development - replace with real API call when credentials are available
    const useMockData = true; // Set to false when real API is available
    
    if (useMockData) {
      // Use inline mock data to avoid import issues
      const MOCK_XML = `<?xml version="1.0" encoding="UTF-8"?>
<odds>
  <odd>
    <book>DraftKings</book>
    <market>moneyline</market>
    <side>home</side>
    <odds>1.91</odds>
  </odd>
  <odd>
    <book>FanDuel</book>
    <market>moneyline</market>
    <side>home</side>
    <odds>1.87</odds>
  </odd>
  <odd>
    <book>DraftKings</book>
    <market>moneyline</market>
    <side>away</side>
    <odds>1.95</odds>
  </odd>
  <odd>
    <book>FanDuel</book>
    <market>moneyline</market>
    <side>away</side>
    <odds>1.99</odds>
  </odd>
  <odd>
    <book>BetMGM</book>
    <market>spread</market>
    <side>home</side>
    <line>-1.5</line>
    <odds>1.87</odds>
  </odd>
  <odd>
    <book>Caesars</book>
    <market>spread</market>
    <side>home</side>
    <line>-1.5</line>
    <odds>1.93</odds>
  </odd>
  <odd>
    <book>BetMGM</book>
    <market>spread</market>
    <side>away</side>
    <line>1.5</line>
    <odds>1.89</odds>
  </odd>
  <odd>
    <book>Caesars</book>
    <market>spread</market>
    <side>away</side>
    <line>1.5</line>
    <odds>1.91</odds>
  </odd>
</odds>`;
      
      const xmlDoc = parseXML(MOCK_XML);
      console.log(`✅ Using inline mock odds XML for game ${gameId}`);
      
      const odds: OddsData[] = [];
      const oddsElements = xmlDoc.getElementsByTagName('odd');
      
      for (let i = 0; i < oddsElements.length; i++) {
        const oddsEl = oddsElements[i] as Element;
        const oddsData: OddsData = {
          gameId,
          book: getXMLText(oddsEl.getElementsByTagName('book')[0] as Element),
          market: getXMLText(oddsEl.getElementsByTagName('market')[0] as Element),
          side: getXMLText(oddsEl.getElementsByTagName('side')[0] as Element),
          line: getXMLNumber(oddsEl.getElementsByTagName('line')[0] as Element),
          odds: getXMLNumber(oddsEl.getElementsByTagName('odds')[0] as Element)
        };
        
        if (oddsData.book && oddsData.market && oddsData.odds > 0) {
          odds.push(oddsData);
        }
      }
      
      return odds;
    }
    
    // Real API call
    const response = await fetch(`${BASE_URL}/api/odds.xml?gameID=${gameId}&key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const xmlDoc = parseXML(xmlText);
    
    // Check for API errors using getElementsByTagName (server-safe)
    const errorElements = xmlDoc.getElementsByTagName('error');
    if (errorElements.length > 0) {
      throw new Error(`API Error: ${getXMLText(errorElements[0] as Element)}`);
    }
    
    const odds: OddsData[] = [];
    const oddsElements = xmlDoc.getElementsByTagName('odds');
    
    for (let i = 0; i < oddsElements.length; i++) {
      const oddsEl = oddsElements[i] as Element;
      const oddsData: OddsData = {
        gameId,
        book: getXMLText(oddsEl.getElementsByTagName('book')[0] as Element),
        market: getXMLText(oddsEl.getElementsByTagName('market')[0] as Element),
        side: getXMLText(oddsEl.getElementsByTagName('side')[0] as Element),
        line: getXMLNumber(oddsEl.getElementsByTagName('line')[0] as Element),
        odds: getXMLNumber(oddsEl.getElementsByTagName('odds')[0] as Element)
      };
      
      if (oddsData.book && oddsData.market && oddsData.odds > 0) {
        odds.push(oddsData);
      }
    }
    
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
        console.log(`🔄 Processing game: ${game.home} vs ${game.away} (ID: ${game.id})`);
        const gameOdds = await fetchOddsForGame(game.id);
        console.log(`Fetched ${gameOdds.length} odds for game ${game.home} vs ${game.away}`);
        
        if (gameOdds.length === 0) {
          console.log(`⚠️ No odds found for ${game.home} vs ${game.away}, skipping`);
          continue;
        }
        
        // Group odds by market type and side
        const marketGroups = new Map<string, OddsData[]>();
        
        console.log(`🎯 Processing ${gameOdds.length} odds for ${game.home} vs ${game.away}`);
        gameOdds.forEach((odds, index) => {
          console.log(`📋 Odds ${index + 1}: ${odds.book} - ${odds.market} - ${odds.side} - ${odds.odds} - Line: ${odds.line || 'none'}`);
          const key = `${odds.market}-${odds.side}-${odds.line || 'noLine'}`;
          if (!marketGroups.has(key)) {
            marketGroups.set(key, []);
          }
          marketGroups.get(key)!.push(odds);
        });
        
        console.log(`📊 Created ${marketGroups.size} market groups from ${gameOdds.length} odds`);
        
        // Create opportunities for each market
        marketGroups.forEach((oddsGroup, marketKey) => {
          console.log(`📊 Market ${marketKey}: ${oddsGroup.length} odds entries`);
          if (oddsGroup.length < 2) {
            console.log(`⚠️ Skipping ${marketKey} - need at least 2 books, got ${oddsGroup.length}`);
            return; // Need at least 2 books for comparison
          }
          
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