import type { Game, Event, Asset, Team, Odds } from '@shared/schema';

const API_BASE_URL = 'https://sharpshot.api.areyouwatchingthis.com/api';
const API_KEY = '3e8b23fdd1b6030714b9320484d7367b';

export class SportsDataService {
  private async makeApiCall(endpoint: string, params: Record<string, string | number> = {}): Promise<any> {
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    
    // Add API key to all requests
    url.searchParams.append('apiKey', API_KEY);
    
    // Add other parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    console.log(`Making API call to: ${url.toString()}`);
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Sports API error: ${response.status} - ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log(`API response for ${endpoint}:`, typeof result, result ? Object.keys(result).slice(0, 5) : 'null');
    return result;
  }

  // Get today's games, optionally filtered by sport
  async getTodaysGames(sport?: string): Promise<Game[]> {
    try {
      const params: Record<string, string> = {};
      if (sport) {
        params.sport = sport;
      }
      
      const data = await this.makeApiCall('games.json', params);
      console.log('Games API raw response structure:', Object.keys(data || {}));
      
      // Debug what we actually got
      if (data && typeof data === 'object') {
        console.log('API response keys:', Object.keys(data));
        
        // Check for various possible structures
        if (data.data && Array.isArray(data.data)) {
          console.log('Found games in data.data:', data.data.length);
          return data.data;
        }
        if (data.games && Array.isArray(data.games)) {
          console.log('Found games in data.games:', data.games.length);
          return data.games;
        }
        if (data.results && Array.isArray(data.results)) {
          console.log('Found games in data.results:', data.results.length);
          return data.results;
        }
        if (Array.isArray(data)) {
          console.log('Data is direct array:', data.length);
          return data;
        }
        
        // If it's a direct object with game properties, check if the whole response is one game
        if (data.gameID) {
          console.log('Single game object detected');
          return [data];
        }
      }
      
      console.log('No games structure found, data:', typeof data);
      return [];
    } catch (error) {
      console.error('Error fetching games:', error);
      return [];
    }
  }

  // Get games by date range
  async getGamesByDateRange(startDate: string, endDate: string, sport?: string): Promise<Game[]> {
    const params: Record<string, string> = {
      startDate: new Date(startDate).getTime().toString(),
      endDate: new Date(endDate).getTime().toString(),
    };
    
    if (sport) {
      params.sport = sport;
    }
    
    const data = await this.makeApiCall('games.json', params);
    return data.games || [];
  }

  // Get a specific game by ID
  async getGameById(gameID: string): Promise<Game | null> {
    const data = await this.makeApiCall('games.json', { gameID });
    return data.games && data.games.length > 0 ? data.games[0] : null;
  }

  // Get games for a specific team
  async getTeamGames(teamID: string, startDate?: string, endDate?: string): Promise<Game[]> {
    const params: Record<string, string> = { teamID };
    
    if (startDate) {
      params.startDate = new Date(startDate).getTime().toString();
    }
    if (endDate) {
      params.endDate = new Date(endDate).getTime().toString();
    }
    
    const data = await this.makeApiCall('games.json', params);
    return data.games || [];
  }

  // Get live events for a game
  async getGameEvents(gameID: string): Promise<Event[]> {
    const data = await this.makeApiCall('events.json', { gameID, full: 'true' });
    return data.events || [];
  }

  // Get recent events across all sports
  async getRecentEvents(count: number = 100): Promise<Event[]> {
    try {
      const data = await this.makeApiCall('events.json', { count: count.toString() });
      console.log('Events API raw response structure:', Object.keys(data || {}));
      
      // Debug what we actually got
      if (data && typeof data === 'object') {
        console.log('Events API response keys:', Object.keys(data));
        
        // Check for various possible structures
        if (data.data && Array.isArray(data.data)) {
          console.log('Found events in data.data:', data.data.length);
          return data.data;
        }
        if (data.events && Array.isArray(data.events)) {
          console.log('Found events in data.events:', data.events.length);
          return data.events;
        }
        if (data.results && Array.isArray(data.results)) {
          console.log('Found events in data.results:', data.results.length);
          return data.results;
        }
        if (Array.isArray(data)) {
          console.log('Events data is direct array:', data.length);
          return data;
        }
        
        // If it's a direct object with event properties, check if the whole response is one event
        if (data.eventID) {
          console.log('Single event object detected');
          return [data];
        }
      }
      
      console.log('No events structure found, data:', typeof data);
      return [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  // Get video highlights for a game
  async getGameHighlights(gameID: string): Promise<Asset[]> {
    const data = await this.makeApiCall('assets.json', { gameID });
    return data.assets || [];
  }

  // Get highlights for a team
  async getTeamHighlights(teamID: string): Promise<Asset[]> {
    const data = await this.makeApiCall('assets.json', { teamID });
    return data.assets || [];
  }

  // Get recent highlights by sport using the assets API endpoint
  async getRecentHighlights(sport?: string): Promise<Asset[]> {
    try {
      const params: Record<string, string> = {};
      if (sport && sport !== 'all') {
        params.sport = sport;
      }
      
      const data = await this.makeApiCall('assets.json', params);
      
      if (data && data.results && Array.isArray(data.results)) {
        return data.results.slice(0, 15).map((asset: any) => {
          let videoUrl = null;
          let videoType = 'VIDEO';
          
          // Skip Max URLs and create alternative YouTube links
          if (asset.url && !asset.url.includes('max.com')) {
            videoUrl = asset.url;
            if (asset.url.includes('youtube.com') || asset.url.includes('youtu.be')) {
              videoType = 'YOUTUBE';
            } else if (asset.url.includes('vimeo.com')) {
              videoType = 'VIMEO';
            }
          } else {
            // Create YouTube search URL as fallback for Max videos
            const searchQuery = encodeURIComponent(`${asset.title} highlights sports`);
            videoUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
            videoType = 'YOUTUBE_SEARCH';
          }
          
          return {
            assetID: asset.assetID,
            title: asset.title || 'Video Highlight',
            description: asset.description || 'Game highlight video',
            duration: asset.duration || 120000,
            type: videoType,
            gameID: asset.gameID,
            sport: asset.sport || sport,
            date: asset.date,
            url: videoUrl,
            thumbnailUrl: asset.thumbnailUrl || `https://img.youtube.com/vi/${asset.assetID}/maxresdefault.jpg`
          };
        });
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching highlights:', error);
      return [];
    }
  }

  // Get recent headlines for finished games using the headlines API endpoint
  async getRecentHeadlines(sport?: string): Promise<any[]> {
    try {
      const params: Record<string, string> = { past: 'true' };
      if (sport && sport !== 'all') {
        params.sport = sport;
      }
      
      const data = await this.makeApiCall('headlines.json', params);
      
      if (data && data.results && Array.isArray(data.results)) {
        return data.results.filter((game: any) => {
          // Ensure we have valid team names and meaningful content
          return game.team1Name && game.team2Name;
        });
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching recent headlines:', error);
      return [];
    }
  }

  // Get future headline games
  async getFutureHeadlines(sport?: string): Promise<Game[]> {
    try {
      const params: Record<string, string> = { future: 'true' };
      if (sport) {
        params.sport = sport;
      }
      
      const data = await this.makeApiCall('headlines.json', params);
      
      // The API returns an array directly or wrapped
      if (Array.isArray(data)) {
        return data;
      }
      
      return data.games || [];
    } catch (error) {
      console.error('Error fetching future headlines:', error);
      return [];
    }
  }

  // Get past headline games
  async getPastHeadlines(sport?: string): Promise<Game[]> {
    const params: Record<string, string> = { past: 'true' };
    if (sport) {
      params.sport = sport;
    }
    
    const data = await this.makeApiCall('headlines.json', params);
    return data.games || [];
  }

  // Get odds for a game (from gambling API if available)
  async getGameOdds(gameID: string): Promise<Odds[]> {
    try {
      const data = await this.makeApiCall('odds.json', { gameID });
      
      // Process the odds data structure properly
      if (data && data.results && Array.isArray(data.results)) {
        console.log(`Found ${data.results.length} odds entries for game ${gameID}`);
        return data.results.map((oddsEntry: any) => ({
          bookieID: oddsEntry.bookieID || oddsEntry.id || 'unknown',
          bookieName: oddsEntry.bookieName || oddsEntry.name || 'Unknown Book',
          spread: oddsEntry.spread || null,
          moneyline1: oddsEntry.moneyline1 || oddsEntry.ml1 || null,
          moneyline2: oddsEntry.moneyline2 || oddsEntry.ml2 || null,
          overUnder: oddsEntry.overUnder || oddsEntry.total || null,
          overOdds: oddsEntry.overOdds || oddsEntry.over || null,
          underOdds: oddsEntry.underOdds || oddsEntry.under || null,
          lastUpdated: oddsEntry.lastUpdated || new Date().toISOString()
        }));
      }
      
      return data.odds || [];
    } catch (error) {
      // Odds endpoint might not be available, return empty array
      console.warn(`Odds endpoint not available for game ${gameID}:`, error);
      return [];
    }
  }

  // NEW: Get all available leagues/sports from the API
  async getAllAvailableLeagues(): Promise<string[]> {
    try {
      // Get a comprehensive list of all games to extract unique sports/leagues
      const data = await this.makeApiCall('games.json', {});
      
      if (data && data.results && Array.isArray(data.results)) {
        const uniqueSports = new Set<string>();
        
        data.results.forEach((game: any) => {
          if (game.sport) {
            uniqueSports.add(game.sport.toLowerCase());
          }
          if (game.league) {
            uniqueSports.add(game.league.toLowerCase());
          }
        });
        
        const availableLeagues = Array.from(uniqueSports);
        console.log('Available leagues from API:', availableLeagues);
        return availableLeagues;
      }
      
      return ['mlb', 'nba', 'nfl', 'nhl', 'soccer', 'mma']; // fallback
    } catch (error) {
      console.error('Error fetching available leagues:', error);
      return ['mlb', 'nba', 'nfl', 'nhl', 'soccer', 'mma']; // fallback
    }
  }

  // Get supported sports
  async getSupportedSports(): Promise<string[]> {
    // Based on the API docs, these are the main sports supported
    return [
      'mlb', 'nfl', 'nba', 'nhl', 'ncaab', 'ncaaf', 'wnba', 'cfl', 'afl',
      'ahl', 'ncaah', 'ncaabw', 'nbdl', 'golf', 'racing'
    ];
  }
}

export const sportsDataService = new SportsDataService();