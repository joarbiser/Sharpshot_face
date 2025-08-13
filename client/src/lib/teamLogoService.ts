// Comprehensive Team Logo Service
// Integrates multiple APIs for maximum team logo coverage

export interface TeamLogoResponse {
  logoUrl: string;
  source: 'espn' | 'thesportsdb' | 'fifa' | 'openligadb' | 'fallback';
  teamName: string;
  league?: string;
  country?: string;
}

class TeamLogoService {
  private cache = new Map<string, TeamLogoResponse>();
  private readonly baseUrls = {
    espn: 'https://a.espncdn.com/i/teamlogos',
    thesportsdb: 'https://www.thesportsdb.com/api/v1/json/3',
    fifa: 'https://api.fifa.com/api/v3',
    openligadb: 'https://api.openligadb.de'
  };

  // ESPN Logo URLs by sport and team ID
  private getESPNLogoUrl(teamId: string, sport: string): string {
    const sportMapping: { [key: string]: string } = {
      'soccer': 'soccer/500',
      'football': 'nfl/500',
      'basketball': 'nba/500', 
      'baseball': 'mlb/500',
      'hockey': 'nhl/500'
    };
    
    const sportPath = sportMapping[sport.toLowerCase()] || 'soccer/500';
    return `${this.baseUrls.espn}/${sportPath}/${teamId}.png`;
  }

  // TheSportsDB team search (using server proxy to avoid CORS)
  private async searchTheSportsDB(teamName: string, league?: string): Promise<TeamLogoResponse | null> {
    try {
      // Use server proxy to avoid CORS issues
      const searchUrl = `/api/team-logos/search?team=${encodeURIComponent(teamName)}&source=thesportsdb`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      if (data?.teams && data.teams.length > 0) {
        const team = data.teams[0];
        if (team.strTeamBadge || team.strTeamLogo) {
          return {
            logoUrl: team.strTeamBadge || team.strTeamLogo,
            source: 'thesportsdb',
            teamName: team.strTeam,
            league: team.strLeague,
            country: team.strCountry
          };
        }
      }
    } catch (error) {
      console.warn('TheSportsDB API error:', error);
    }
    return null;
  }

  // FIFA API integration for international teams (using server proxy)
  private async searchFIFA(teamName: string): Promise<TeamLogoResponse | null> {
    try {
      // Use server proxy to avoid CORS issues
      const searchUrl = `/api/team-logos/search?team=${encodeURIComponent(teamName)}&source=fifa`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      if (data?.results && data.results.length > 0) {
        const team = data.results[0];
        if (team.pictureUrl) {
          return {
            logoUrl: team.pictureUrl,
            source: 'fifa',
            teamName: team.name,
            country: team.country?.name
          };
        }
      }
    } catch (error) {
      console.warn('FIFA API error:', error);
    }
    return null;
  }

  // OpenLigaDB for German/European leagues (using server proxy)
  private async searchOpenLigaDB(teamName: string): Promise<TeamLogoResponse | null> {
    try {
      // Use server proxy to avoid CORS issues
      const searchUrl = `/api/team-logos/search?team=${encodeURIComponent(teamName)}&source=openligadb`;
      const response = await fetch(searchUrl);
      const teams = await response.json();
      
      const team = teams.find((t: any) => 
        t.teamName?.toLowerCase().includes(teamName.toLowerCase()) ||
        t.shortName?.toLowerCase().includes(teamName.toLowerCase())
      );
      
      if (team && team.teamIconUrl) {
        return {
          logoUrl: team.teamIconUrl,
          source: 'openligadb',
          teamName: team.teamName,
          league: 'Bundesliga'
        };
      }
    } catch (error) {
      console.warn('OpenLigaDB API error:', error);
    }
    return null;
  }

  // Main method to get team logo with fallback chain
  async getTeamLogo(
    teamName: string, 
    sport: string = 'soccer', 
    league?: string,
    country?: string
  ): Promise<TeamLogoResponse> {
    const cacheKey = `${teamName}-${sport}-${league || ''}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let result: TeamLogoResponse | null = null;

    // Try ESPN API first via server proxy
  try {
    const espnResult = await this.searchESPN(teamName, sport, league);
    if (espnResult) {
      this.cache.set(cacheKey, espnResult);
      return espnResult;
    }
  } catch (error) {
    console.warn('ESPN API search failed:', error);
  }

    // Try TheSportsDB if ESPN failed
    if (!result) {
      result = await this.searchTheSportsDB(teamName, league);
    }

    // Try FIFA for international teams
    if (!result && (country || league?.toLowerCase().includes('world') || league?.toLowerCase().includes('international'))) {
      result = await this.searchFIFA(teamName);
    }

    // Try OpenLigaDB for German/European teams
    if (!result && (country?.toLowerCase().includes('germany') || league?.toLowerCase().includes('bundesliga'))) {
      result = await this.searchOpenLigaDB(teamName);
    }

    // Fallback to a default logo service
    if (!result) {
      result = {
        logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=random&color=fff&size=128&font-size=0.4`,
        source: 'fallback',
        teamName
      };
    }

    // Cache the result
    this.cache.set(cacheKey, result);
    return result;
  }

  // ESPN team ID mappings for soccer
  private getSoccerTeamESPNId(teamName: string, league?: string): string | null {
    const cleanName = teamName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    
    // Premier League mappings
    const premierLeague: { [key: string]: string } = {
      'arsenal': '359',
      'chelsea': '363',
      'manchester_united': '360',
      'manchester_city': '382',
      'liverpool': '364',
      'tottenham': '367',
      'newcastle': '361',
      'west_ham': '371',
      'brighton': '331',
      'crystal_palace': '384'
    };

    // MLS mappings
    const mls: { [key: string]: string } = {
      'lafc': '11002',
      'la_galaxy': '9678',
      'inter_miami': '11032',
      'atlanta_united': '10999',
      'seattle_sounders': '9726',
      'portland_timbers': '9767',
      'new_york_city': '9668',
      'new_york_red_bulls': '9776'
    };

    // Champions League / International
    const international: { [key: string]: string } = {
      'real_madrid': '86',
      'barcelona': '83',
      'bayern_munich': '132',
      'psg': '160',
      'juventus': '111',
      'ac_milan': '103',
      'inter_milan': '110'
    };

    // Check appropriate league first
    if (league?.toLowerCase().includes('premier')) {
      return premierLeague[cleanName] || null;
    }
    if (league?.toLowerCase().includes('mls')) {
      return mls[cleanName] || null;
    }
    if (league?.toLowerCase().includes('champions') || league?.toLowerCase().includes('international')) {
      return international[cleanName] || null;
    }

    // Check all mappings if league not specified
    return premierLeague[cleanName] || mls[cleanName] || international[cleanName] || null;
  }

  // ESPN API search method
  private async searchESPN(teamName: string, sport: string = 'soccer', league?: string): Promise<TeamLogoResponse | null> {
    try {
      // Use server proxy to avoid CORS issues
      const searchUrl = `/api/team-logos/search?team=${encodeURIComponent(teamName)}&source=espn&sport=${sport}`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      if (data?.logoUrl) {
        return {
          logoUrl: data.logoUrl,
          source: 'espn',
          teamName: data.teamName || teamName,
          league: data.league || league
        };
      }
    } catch (error) {
      console.warn('ESPN API search error:', error);
    }
    return null;
  }

  // Clear cache method
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache size
  getCacheSize(): number {
    return this.cache.size;
  }
}

// Export singleton instance
export const teamLogoService = new TeamLogoService();

// React hook for easy usage
import { useState, useEffect } from 'react';

export function useTeamLogo(teamName: string, sport: string = 'soccer', league?: string, country?: string) {
  const [logoData, setLogoData] = useState<TeamLogoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teamName) return;

    setLoading(true);
    setError(null);

    teamLogoService.getTeamLogo(teamName, sport, league, country)
      .then(setLogoData)
      .catch(err => {
        setError(err.message);
        setLogoData({
          logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=random&color=fff&size=128&font-size=0.4`,
          source: 'fallback',
          teamName
        });
      })
      .finally(() => setLoading(false));
  }, [teamName, sport, league, country]);

  return { logoData, loading, error };
}