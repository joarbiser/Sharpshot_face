import type { Express } from 'express';

interface TeamLogoResponse {
  logoUrl: string;
  source: string;
  teamName: string;
  league?: string;
  country?: string;
}

export function setupTeamLogoRoutes(app: Express) {
  // Team logo search proxy to handle CORS issues
  app.get('/api/team-logos/search', async (req, res) => {
    const { team, source } = req.query;
    
    if (!team || !source) {
      return res.status(400).json({ error: 'Team name and source are required' });
    }

    try {
      let result: TeamLogoResponse | null = null;

      switch (source) {
        case 'espn':
          result = await searchESPN(team as string, req.query.sport as string);
          break;
        case 'thesportsdb':
          result = await searchTheSportsDB(team as string);
          break;
        case 'fifa':
          result = await searchFIFA(team as string);
          break;
        case 'openligadb':
          result = await searchOpenLigaDB(team as string);
          break;
        default:
          return res.status(400).json({ error: 'Invalid source' });
      }

      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'Team logo not found' });
      }
    } catch (error) {
      console.error('Team logo search error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}

// ESPN team logo search using the provided APIs
async function searchESPN(teamName: string, sport?: string): Promise<TeamLogoResponse | null> {
  try {
    // Map sport to ESPN API endpoints
    const sportMapping: { [key: string]: string } = {
      'football': 'football/nfl',
      'basketball': 'basketball/nba', 
      'baseball': 'baseball/mlb',
      'hockey': 'hockey/nhl',
      'soccer': 'soccer/eng.1', // Default to Premier League
      'mma': 'mma/ufc',
      'racing': 'racing/f1'
    };
    
    const apiPath = sportMapping[sport?.toLowerCase() || 'football'] || 'football/nfl';
    const searchUrl = `https://site.api.espn.com/apis/site/v2/sports/${apiPath}/teams`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (data?.sports?.[0]?.leagues?.[0]?.teams) {
      const teams = data.sports[0].leagues[0].teams;
      const team = teams.find((t: any) => 
        t.team?.displayName?.toLowerCase().includes(teamName.toLowerCase()) ||
        t.team?.name?.toLowerCase().includes(teamName.toLowerCase()) ||
        t.team?.abbreviation?.toLowerCase().includes(teamName.toLowerCase())
      );
      
      if (team?.team?.logos?.[0]?.href) {
        return {
          logoUrl: team.team.logos[0].href,
          source: 'espn',
          teamName: team.team.displayName,
          league: team.team.league?.name
        };
      }
    }
  } catch (error) {
    console.warn('ESPN API error:', error);
  }
  return null;
}

// TheSportsDB team search
async function searchTheSportsDB(teamName: string): Promise<TeamLogoResponse | null> {
  try {
    const searchUrl = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(teamName)}`;
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

// FIFA API integration for international teams
async function searchFIFA(teamName: string): Promise<TeamLogoResponse | null> {
  try {
    // FIFA teams endpoint (Note: This may require API key in production)
    const searchUrl = `https://api.fifa.com/api/v3/teams?name=${encodeURIComponent(teamName)}`;
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

// OpenLigaDB for German/European leagues
async function searchOpenLigaDB(teamName: string): Promise<TeamLogoResponse | null> {
  try {
    const searchUrl = `https://api.openligadb.de/getavailableteams/bl1/2024`;
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