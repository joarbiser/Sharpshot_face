// Content Generator - Creates human-readable sports content

import { DataService } from '../services/DataService';
import { Game, Player, Team, LeagueStats, BettingData, NicheData } from '../types/ContentTypes';
import { Logger } from '../utils/Logger';

export class ContentGenerator {
  private dataService: DataService;
  private logger: Logger;

  constructor(dataService: DataService) {
    this.dataService = dataService;
    this.logger = new Logger();
  }

  /**
   * Generate game preview content
   */
  async generateGamePreview(game: Game): Promise<string> {
    const date = new Date(game.date).toLocaleDateString();
    const time = game.time || 'TBD';
    
    let content = `# Game Preview: ${game.team1City} ${game.team1Name} vs ${game.team2City} ${game.team2Name}\n\n`;
    content += `**Date:** ${date}\n`;
    content += `**Time:** ${time}\n`;
    content += `**League:** ${game.league}\n`;
    content += `**Sport:** ${game.sport}\n\n`;
    
    if (game.venue) {
      content += `**Venue:** ${game.venue}\n\n`;
    }
    
    if (game.odds) {
      content += `## Betting Lines\n\n`;
      content += `- **Spread:** ${game.team1City} ${game.odds.spread > 0 ? '+' : ''}${game.odds.spread}\n`;
      content += `- **Over/Under:** ${game.odds.overUnder}\n`;
      content += `- **Moneyline:** ${game.team1City} ${game.odds.moneyline1} | ${game.team2City} ${game.odds.moneyline2}\n\n`;
    }
    
    content += `## Matchup Analysis\n\n`;
    content += `This ${game.sport} matchup features ${game.team1City} ${game.team1Name} taking on ${game.team2City} ${game.team2Name}. `;
    content += `Both teams will be looking to secure a crucial victory in this ${game.league} contest.\n\n`;
    
    if (game.weather) {
      content += `**Weather:** ${game.weather}\n\n`;
    }
    
    content += `## Key Factors to Watch\n\n`;
    content += `- Home field advantage for the hosting team\n`;
    content += `- Recent form and momentum heading into the game\n`;
    content += `- Key player matchups and injury reports\n`;
    content += `- Historical head-to-head performance\n\n`;
    
    content += `*Preview generated on ${new Date().toLocaleString()}*\n`;
    
    return content;
  }

  /**
   * Generate game recap content
   */
  async generateGameRecap(game: Game): Promise<string> {
    const date = new Date(game.date).toLocaleDateString();
    const finalScore = `${game.team1Score} - ${game.team2Score}`;
    const winner = (game.team1Score || 0) > (game.team2Score || 0) 
      ? `${game.team1City} ${game.team1Name}` 
      : `${game.team2City} ${game.team2Name}`;
    
    let content = `# Game Recap: ${game.team1City} ${game.team1Name} vs ${game.team2City} ${game.team2Name}\n\n`;
    content += `**Final Score:** ${finalScore}\n`;
    content += `**Winner:** ${winner}\n`;
    content += `**Date:** ${date}\n`;
    content += `**League:** ${game.league}\n\n`;
    
    content += `## Game Summary\n\n`;
    content += `${winner} secured a victory with a final score of ${finalScore} in this ${game.league} matchup. `;
    
    const marginOfVictory = Math.abs((game.team1Score || 0) - (game.team2Score || 0));
    if (marginOfVictory <= 3) {
      content += `It was a closely contested game decided by just ${marginOfVictory} point${marginOfVictory !== 1 ? 's' : ''}.\n\n`;
    } else if (marginOfVictory >= 20) {
      content += `The game turned into a dominant performance with a ${marginOfVictory}-point margin of victory.\n\n`;
    } else {
      content += `The winning team controlled the game with a solid ${marginOfVictory}-point victory.\n\n`;
    }
    
    if (game.highlights && game.highlights.length > 0) {
      content += `## Game Highlights\n\n`;
      game.highlights.forEach((highlight, index) => {
        content += `${index + 1}. ${highlight}\n`;
      });
      content += `\n`;
    }
    
    if (game.keyStats) {
      content += `## Key Statistics\n\n`;
      Object.entries(game.keyStats).forEach(([stat, value]) => {
        content += `- **${stat}:** ${value}\n`;
      });
      content += `\n`;
    }
    
    content += `## Impact\n\n`;
    content += `This result will have implications for both teams' standings and playoff positioning in the ${game.league}.\n\n`;
    
    content += `*Recap generated on ${new Date().toLocaleString()}*\n`;
    
    return content;
  }

  /**
   * Generate player news content
   */
  async generatePlayerNews(playerUpdate: { playerID: string; type: string; data: any }): Promise<string> {
    const { type, data } = playerUpdate;
    const playerName = data.playerName || 'Unknown Player';
    const team = data.team || 'Unknown Team';
    const date = new Date(data.date).toLocaleDateString();
    
    let content = `# Player Update: ${playerName}\n\n`;
    content += `**Player:** ${playerName}\n`;
    content += `**Team:** ${team}\n`;
    content += `**Date:** ${date}\n`;
    content += `**Update Type:** ${type.charAt(0).toUpperCase() + type.slice(1)}\n\n`;
    
    switch (type) {
      case 'injury':
        content += `## Injury Report\n\n`;
        content += `${playerName} has sustained an injury that may affect their availability for upcoming games. `;
        content += `The team medical staff is evaluating the situation and will provide updates on the player's status.\n\n`;
        break;
        
      case 'performance':
        content += `## Performance Highlight\n\n`;
        content += `${playerName} delivered an outstanding performance in their recent game. `;
        if (data.stats && Object.keys(data.stats).length > 0) {
          content += `Key statistics from the performance:\n\n`;
          Object.entries(data.stats).forEach(([stat, value]) => {
            content += `- **${stat}:** ${value}\n`;
          });
          content += `\n`;
        }
        break;
        
      case 'transaction':
        content += `## Team Transaction\n\n`;
        content += `${playerName} is involved in a team transaction that will impact their playing status. `;
        content += `This move reflects the team's strategic planning for the current and upcoming seasons.\n\n`;
        break;
        
      default:
        content += `## General Update\n\n`;
        content += `${playerName} has been in the news recently. `;
        if (data.description) {
          content += `${data.description}\n\n`;
        }
    }
    
    if (data.event) {
      content += `**Event Details:** ${data.event}\n\n`;
    }
    
    content += `## Analysis\n\n`;
    content += `This development will be closely monitored by fans and fantasy sports players alike. `;
    content += `The impact on ${team}'s performance and ${playerName}'s season outlook will become clearer in the coming days.\n\n`;
    
    content += `*Update generated on ${new Date().toLocaleString()}*\n`;
    
    return content;
  }

  /**
   * Generate team weekly recap
   */
  async generateTeamWeeklyRecap(team: Team): Promise<string> {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    
    let content = `# Weekly Team Recap: ${team.city} ${team.name}\n\n`;
    content += `**Team:** ${team.city} ${team.name}\n`;
    content += `**League:** ${team.league}\n`;
    content += `**Week Ending:** ${new Date().toLocaleDateString()}\n\n`;
    
    if (team.record) {
      content += `**Current Record:** ${team.record.wins}-${team.record.losses}`;
      if (team.record.ties) content += `-${team.record.ties}`;
      content += `\n\n`;
    }
    
    content += `## Week in Review\n\n`;
    
    if (team.recentGames && team.recentGames.length > 0) {
      content += `### Recent Games\n\n`;
      team.recentGames.slice(0, 3).forEach((game, index) => {
        const opponent = game.team1Name === team.name 
          ? `${game.team2City} ${game.team2Name}`
          : `${game.team1City} ${game.team1Name}`;
        const result = this.getGameResult(game, team);
        content += `${index + 1}. vs ${opponent} - ${result}\n`;
      });
      content += `\n`;
    } else {
      content += `The ${team.city} ${team.name} had a quiet week with no completed games.\n\n`;
    }
    
    if (team.upcomingGames && team.upcomingGames.length > 0) {
      content += `### Upcoming Games\n\n`;
      team.upcomingGames.slice(0, 3).forEach((game, index) => {
        const opponent = game.team1Name === team.name 
          ? `${game.team2City} ${game.team2Name}`
          : `${game.team1City} ${game.team1Name}`;
        const date = new Date(game.date).toLocaleDateString();
        content += `${index + 1}. vs ${opponent} - ${date}\n`;
      });
      content += `\n`;
    }
    
    if (team.keyPlayers && team.keyPlayers.length > 0) {
      content += `### Key Players This Week\n\n`;
      team.keyPlayers.slice(0, 3).forEach((player, index) => {
        content += `${index + 1}. **${player.name}** (${player.position})\n`;
      });
      content += `\n`;
    }
    
    if (team.trends) {
      content += `### Team Trends\n\n`;
      Object.entries(team.trends).forEach(([trend, value]) => {
        content += `- **${trend}:** ${value}\n`;
      });
      content += `\n`;
    }
    
    content += `## Outlook\n\n`;
    content += `The ${team.city} ${team.name} continues to develop their season strategy. `;
    content += `Upcoming games will be crucial for their positioning in the ${team.league} standings.\n\n`;
    
    content += `*Recap generated on ${new Date().toLocaleString()}*\n`;
    
    return content;
  }

  /**
   * Generate league statistics content
   */
  async generateLeagueStats(stats: LeagueStats): Promise<string> {
    let content = `# League Statistics Summary\n\n`;
    content += `**Sport:** ${stats.sport}\n`;
    content += `**League:** ${stats.league}\n`;
    content += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    
    if (stats.topPerformers && stats.topPerformers.length > 0) {
      content += `## Top Performers\n\n`;
      stats.topPerformers.forEach(category => {
        content += `### ${category.category}\n\n`;
        category.players.slice(0, 5).forEach((performer, index) => {
          content += `${index + 1}. **${performer.player.name}** (${performer.player.team}) - ${performer.value}\n`;
        });
        content += `\n`;
      });
    }
    
    if (stats.teamStandings && stats.teamStandings.length > 0) {
      content += `## Team Standings\n\n`;
      stats.teamStandings.slice(0, 10).forEach((team, index) => {
        const record = team.record ? `${team.record.wins}-${team.record.losses}` : 'N/A';
        content += `${index + 1}. **${team.city} ${team.name}** - ${record}\n`;
      });
      content += `\n`;
    }
    
    if (stats.trends && Object.keys(stats.trends).length > 0) {
      content += `## League Trends\n\n`;
      Object.entries(stats.trends).forEach(([trend, value]) => {
        content += `- **${trend}:** ${value}\n`;
      });
      content += `\n`;
    }
    
    content += `## Analysis\n\n`;
    content += `The current statistics reflect the competitive landscape across ${stats.league}. `;
    content += `These numbers will continue to evolve as the season progresses and more games are completed.\n\n`;
    
    content += `*Statistics compiled on ${new Date().toLocaleString()}*\n`;
    
    return content;
  }

  /**
   * Generate betting content
   */
  async generateBettingContent(bettingData: BettingData): Promise<string> {
    let content = `# Weekly Betting Insights\n\n`;
    content += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    
    if (bettingData.bestBets && bettingData.bestBets.length > 0) {
      content += `## Best Bets of the Week\n\n`;
      bettingData.bestBets.forEach((bet, index) => {
        content += `### ${index + 1}. ${bet.game.team1City} ${bet.game.team1Name} vs ${bet.game.team2City} ${bet.game.team2Name}\n\n`;
        content += `**Recommendation:** ${bet.recommendation}\n`;
        content += `**Confidence:** ${bet.confidence}%\n`;
        content += `**Reasoning:** ${bet.reasoning}\n`;
        content += `**Game Date:** ${new Date(bet.game.date).toLocaleDateString()}\n\n`;
      });
    }
    
    if (bettingData.upsetAlerts && bettingData.upsetAlerts.length > 0) {
      content += `## Upset Alerts\n\n`;
      bettingData.upsetAlerts.forEach((alert, index) => {
        content += `### ${index + 1}. ${alert.underdog} Upset Potential\n\n`;
        content += `**Game:** ${alert.game.team1City} ${alert.game.team1Name} vs ${alert.game.team2City} ${alert.game.team2Name}\n`;
        content += `**Underdog:** ${alert.underdog}\n`;
        content += `**Alert Reason:** ${alert.reasoning}\n`;
        content += `**Game Date:** ${new Date(alert.game.date).toLocaleDateString()}\n\n`;
      });
    }
    
    if (bettingData.trendAnalysis && Object.keys(bettingData.trendAnalysis).length > 0) {
      content += `## Betting Trends Analysis\n\n`;
      Object.entries(bettingData.trendAnalysis).forEach(([trend, value]) => {
        content += `- **${trend}:** ${value}\n`;
      });
      content += `\n`;
    }
    
    content += `## Disclaimer\n\n`;
    content += `All betting insights are for entertainment purposes only. Please gamble responsibly and within your means. `;
    content += `Past performance does not guarantee future results.\n\n`;
    
    content += `*Insights generated on ${new Date().toLocaleString()}*\n`;
    
    return content;
  }

  /**
   * Generate niche content
   */
  async generateNicheContent(nicheData: NicheData): Promise<string> {
    let content = `# Weekly Sports Stories & Trends\n\n`;
    content += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    
    if (nicheData.playersByLocation && Object.keys(nicheData.playersByLocation).length > 0) {
      content += `## Players by Location\n\n`;
      Object.entries(nicheData.playersByLocation).forEach(([location, players]) => {
        if (players.length > 0) {
          content += `### ${location}\n\n`;
          players.slice(0, 3).forEach((player: any, index: number) => {
            content += `${index + 1}. **${player.name}** - ${player.recentEvent}\n`;
          });
          content += `\n`;
        }
      });
    }
    
    if (nicheData.milestoneTrackers && nicheData.milestoneTrackers.length > 0) {
      content += `## Milestone Watch\n\n`;
      nicheData.milestoneTrackers.forEach((tracker, index) => {
        content += `### ${index + 1}. ${tracker.player.name} - ${tracker.milestone}\n\n`;
        content += `**Progress:** ${tracker.progress}%\n`;
        content += `**Team:** ${tracker.player.team}\n\n`;
      });
    }
    
    if (nicheData.homeAwayTrends && Object.keys(nicheData.homeAwayTrends).length > 0) {
      content += `## Home vs Away Trends\n\n`;
      Object.entries(nicheData.homeAwayTrends).forEach(([trend, value]) => {
        content += `- **${trend}:** ${value}\n`;
      });
      content += `\n`;
    }
    
    if (nicheData.draftAnalysis && Object.keys(nicheData.draftAnalysis).length > 0) {
      content += `## Draft Analysis\n\n`;
      Object.entries(nicheData.draftAnalysis).forEach(([metric, value]) => {
        content += `- **${metric}:** ${value}\n`;
      });
      content += `\n`;
    }
    
    if (nicheData.rookieUpdates && nicheData.rookieUpdates.length > 0) {
      content += `## Rookie Watch\n\n`;
      nicheData.rookieUpdates.slice(0, 5).forEach((rookie, index) => {
        content += `${index + 1}. **${rookie.name}** (${rookie.team}) - ${rookie.position}\n`;
      });
      content += `\n`;
    }
    
    content += `## Fun Facts\n\n`;
    content += `- Sports continue to provide endless storylines and statistical intrigue\n`;
    content += `- Player connections to their hometowns remain a compelling narrative\n`;
    content += `- Milestone achievements add excitement to every game\n\n`;
    
    content += `*Stories compiled on ${new Date().toLocaleString()}*\n`;
    
    return content;
  }

  /**
   * Get game result for a team
   */
  private getGameResult(game: Game, team: Team): string {
    const isHome = game.team1Name === team.name;
    const teamScore = isHome ? game.team1Score : game.team2Score;
    const opponentScore = isHome ? game.team2Score : game.team1Score;
    
    if (teamScore === undefined || opponentScore === undefined) {
      return 'Game not completed';
    }
    
    const result = teamScore > opponentScore ? 'W' : 'L';
    return `${result} ${teamScore}-${opponentScore}`;
  }
}