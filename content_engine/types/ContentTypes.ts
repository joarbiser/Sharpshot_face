// Content Types and Interfaces for Sports Content Engine

export enum ContentTypes {
  GAME_PREVIEW = 'game_preview',
  GAME_RECAP = 'game_recap',
  PLAYER_NEWS = 'player_news',
  TEAM_WEEKLY = 'team_weekly',
  LEAGUE_STATS = 'league_stats',
  BETTING_INSIGHTS = 'betting_insights',
  NICHE_STORIES = 'niche_stories'
}

export interface Game {
  gameID: string;
  sport: string;
  league: string;
  date: string;
  time: string;
  status: string;
  team1Name: string;
  team1City: string;
  team1Score?: number;
  team2Name: string;
  team2City: string;
  team2Score?: number;
  venue?: string;
  weather?: string;
  odds?: {
    spread: number;
    overUnder: number;
    moneyline1: number;
    moneyline2: number;
  };
  keyStats?: Record<string, any>;
  highlights?: string[];
}

export interface Player {
  playerID: string;
  name: string;
  team: string;
  position: string;
  stats: Record<string, number>;
  injuryStatus?: string;
  recentPerformance?: Performance[];
  milestones?: Milestone[];
}

export interface Performance {
  gameID: string;
  date: string;
  stats: Record<string, number>;
  highlights: string[];
}

export interface Milestone {
  type: string;
  description: string;
  date: string;
  value: number;
}

export interface Team {
  id: string;
  name: string;
  city: string;
  sport: string;
  league: string;
  record?: {
    wins: number;
    losses: number;
    ties?: number;
  };
  recentGames?: Game[];
  upcomingGames?: Game[];
  keyPlayers?: Player[];
  trends?: Record<string, any>;
}

export interface LeagueStats {
  sport: string;
  league: string;
  topPerformers: {
    category: string;
    players: Array<{
      player: Player;
      value: number;
    }>;
  }[];
  teamStandings: Team[];
  trends: Record<string, any>;
}

export interface BettingData {
  bestBets: Array<{
    game: Game;
    betType: string;
    recommendation: string;
    confidence: number;
    reasoning: string;
  }>;
  upsetAlerts: Array<{
    game: Game;
    underdog: string;
    reasoning: string;
  }>;
  trendAnalysis: Record<string, any>;
}

export interface NicheData {
  playersByLocation: Record<string, Player[]>;
  draftAnalysis: Record<string, any>;
  milestoneTrackers: Array<{
    player: Player;
    milestone: string;
    progress: number;
  }>;
  homeAwayTrends: Record<string, any>;
  rookieUpdates: Player[];
}

export interface ContentTemplate {
  type: ContentTypes;
  title: string;
  sections: string[];
  requiredData: string[];
}

export interface GeneratedContent {
  id: string;
  type: ContentTypes;
  title: string;
  content: string;
  metadata: {
    generatedAt: Date;
    dataSource: string;
    gameIds?: string[];
    playerIds?: string[];
    teamIds?: string[];
  };
  tags: string[];
}