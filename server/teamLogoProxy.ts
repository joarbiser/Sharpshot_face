// Team Logo Proxy Service for Server-Side API Calls
// This handles CORS and rate limiting for external team logo APIs

import express from 'express';

interface TeamLogoProxyConfig {
  cacheTimeout: number;
  maxRequestsPerMinute: number;
}

class TeamLogoProxyService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private requestCounts = new Map<string, number>();
  private config: TeamLogoProxyConfig;

  constructor(config: TeamLogoProxyConfig = { cacheTimeout: 3600000, maxRequestsPerMinute: 100 }) {
    this.config = config;
  }

  // TheSportsDB proxy endpoint
  async proxyTheSportsDB(teamName: string): Promise<any> {
    const cacheKey = `thesportsdb-${teamName}`;
    
    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.config.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(teamName)}`
      );
      
      if (!response.ok) {
        throw new Error(`TheSportsDB API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      
      return data;
    } catch (error) {
      console.error('TheSportsDB proxy error:', error);
      throw error;
    }
  }

  // ESPN proxy endpoint
  async proxyESPNLogo(teamId: string, sport: string): Promise<string> {
    const cacheKey = `espn-${teamId}-${sport}`;
    
    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.config.cacheTimeout) {
      return cached.data;
    }

    const sportPaths: { [key: string]: string } = {
      'soccer': 'soccer/500',
      'football': 'nfl/500',
      'basketball': 'nba/500',
      'baseball': 'mlb/500',
      'hockey': 'nhl/500'
    };

    const sportPath = sportPaths[sport.toLowerCase()] || 'soccer/500';
    const logoUrl = `https://a.espncdn.com/i/teamlogos/${sportPath}/${teamId}.png`;

    // Cache the URL
    this.cache.set(cacheKey, { data: logoUrl, timestamp: Date.now() });
    
    return logoUrl;
  }

  // OpenLigaDB proxy endpoint
  async proxyOpenLigaDB(league: string = 'bl1', season: string = '2024'): Promise<any> {
    const cacheKey = `openligadb-${league}-${season}`;
    
    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.config.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(
        `https://api.openligadb.de/getavailableteams/${league}/${season}`
      );
      
      if (!response.ok) {
        throw new Error(`OpenLigaDB API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      
      return data;
    } catch (error) {
      console.error('OpenLigaDB proxy error:', error);
      throw error;
    }
  }

  // Clear cache method
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache statistics
  getCacheStats(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }

  // Rate limiting check
  private checkRateLimit(ip: string): boolean {
    const key = `rateLimit-${ip}`;
    const count = this.requestCounts.get(key) || 0;
    
    if (count >= this.config.maxRequestsPerMinute) {
      return false;
    }
    
    this.requestCounts.set(key, count + 1);
    
    // Reset count after 1 minute
    setTimeout(() => {
      this.requestCounts.delete(key);
    }, 60000);
    
    return true;
  }
}

// Export singleton instance
export const teamLogoProxyService = new TeamLogoProxyService();

// Express route handlers
export const setupTeamLogoRoutes = (app: express.Application) => {
  // TheSportsDB proxy
  app.get('/api/team-logos/thesportsdb/:teamName', async (req, res) => {
    const { teamName } = req.params;
    
    try {
      const data = await teamLogoProxyService.proxyTheSportsDB(teamName);
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ESPN logo proxy
  app.get('/api/team-logos/espn/:sport/:teamId', async (req, res) => {
    const { sport, teamId } = req.params;
    
    try {
      const logoUrl = await teamLogoProxyService.proxyESPNLogo(teamId, sport);
      res.json({ logoUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // OpenLigaDB proxy
  app.get('/api/team-logos/openligadb/:league/:season?', async (req, res) => {
    const { league, season = '2024' } = req.params;
    
    try {
      const data = await teamLogoProxyService.proxyOpenLigaDB(league, season);
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Cache management
  app.get('/api/team-logos/cache/stats', (req, res) => {
    const stats = teamLogoProxyService.getCacheStats();
    res.json(stats);
  });

  app.post('/api/team-logos/cache/clear', (req, res) => {
    teamLogoProxyService.clearCache();
    res.json({ success: true, message: 'Cache cleared' });
  });
};