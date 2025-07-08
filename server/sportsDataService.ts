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
    
    return await response.json();
  }

  // Get today's games, optionally filtered by sport
  async getTodaysGames(sport?: string): Promise<Game[]> {
    try {
      const params: Record<string, string> = {};
      if (sport) {
        params.sport = sport;
      }
      
      const data = await this.makeApiCall('games.json', params);
      console.log('Games API response data type:', typeof data, 'length:', Array.isArray(data) ? data.length : 'not array');
      
      // The API returns an array directly, not wrapped in { games: [] }
      if (Array.isArray(data)) {
        console.log('Returning', data.length, 'games directly from array');
        return data;
      }
      
      // If it's wrapped in a games property
      if (data && data.games && Array.isArray(data.games)) {
        console.log('Returning', data.games.length, 'games from data.games');
        return data.games;
      }
      
      console.log('No games found, trying alternative endpoint...');
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
      console.log('Events API response data type:', typeof data, 'length:', Array.isArray(data) ? data.length : 'not array');
      
      // The API returns an array directly, not wrapped in { events: [] }
      if (Array.isArray(data)) {
        console.log('Returning', data.length, 'events directly from array');
        return data;
      }
      
      // If it's wrapped in an events property
      if (data && data.events && Array.isArray(data.events)) {
        console.log('Returning', data.events.length, 'events from data.events');
        return data.events;
      }
      
      console.log('No events found in response');
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

  // Get recent highlights by sport
  async getRecentHighlights(sport?: string): Promise<Asset[]> {
    try {
      const params: Record<string, string> = {};
      if (sport) {
        params.sport = sport;
      }
      
      const data = await this.makeApiCall('assets.json', params);
      
      // The API returns an array directly or wrapped
      if (Array.isArray(data)) {
        return data;
      }
      
      return data.assets || [];
    } catch (error) {
      console.error('Error fetching highlights:', error);
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
      return data.odds || [];
    } catch (error) {
      // Odds endpoint might not be available, return empty array
      console.warn('Odds endpoint not available:', error);
      return [];
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