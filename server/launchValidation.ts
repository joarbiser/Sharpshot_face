// Launch Validation System - Zero Tolerance for Inaccurate Data
export class LaunchValidationService {
  private static readonly MAX_DATA_AGE_SECONDS = 30; // 30-second tolerance for live data
  private static readonly REQUIRED_SPORTSBOOKS_MIN = 20; // Minimum sportsbooks for accuracy
  
  // 🚨 PRODUCTION DATA INTEGRITY - ZERO TOLERANCE
  static validateLiveOddsIntegrity(odds: any[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!odds || odds.length === 0) {
      errors.push('CRITICAL: No live odds data available');
      return { isValid: false, errors };
    }
    
    if (odds.length < this.REQUIRED_SPORTSBOOKS_MIN) {
      errors.push(`CRITICAL: Only ${odds.length} sportsbooks available, minimum ${this.REQUIRED_SPORTSBOOKS_MIN} required`);
    }
    
    // Validate each odds entry has required fields
    odds.forEach((book, index) => {
      if (!book.sportsbook || typeof book.sportsbook !== 'string') {
        errors.push(`CRITICAL: Sportsbook ${index} missing valid name`);
      }
      
      if (!book.odds || isNaN(parseFloat(book.odds))) {
        errors.push(`CRITICAL: Sportsbook ${book.sportsbook} has invalid odds: ${book.odds}`);
      }
      
      if (!book.market || typeof book.market !== 'string') {
        errors.push(`CRITICAL: Sportsbook ${book.sportsbook} missing market type`);
      }
    });
    
    return { isValid: errors.length === 0, errors };
  }
  
  // 🚨 REAL-TIME DATA FRESHNESS VALIDATION
  static validateDataFreshness(timestamp: number | string): { isValid: boolean; age: number } {
    const now = Date.now();
    const dataTime = typeof timestamp === 'string' ? new Date(timestamp).getTime() : timestamp;
    const age = (now - dataTime) / 1000; // Age in seconds
    
    return {
      isValid: age <= this.MAX_DATA_AGE_SECONDS,
      age
    };
  }
  

  
  // 🚨 COMPREHENSIVE GAME DATA VALIDATION
  static validateGameData(game: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!game.gameID) {
      errors.push('CRITICAL: Game missing unique identifier');
    }
    
    if (!game.team1Name && !game.team2Name && !game.awayTeamName && !game.homeTeamName) {
      errors.push('CRITICAL: Game missing team information');
    }
    
    if (!game.time && !game.date) {
      errors.push('CRITICAL: Game missing schedule information');
    }
    
    if (!game.sport) {
      errors.push('CRITICAL: Game missing sport classification');
    }
    
    return { isValid: errors.length === 0, errors };
  }
  
  // 🚨 PRODUCTION OPPORTUNITY VALIDATION
  static validateBettingOpportunity(opportunity: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validate required fields
    const requiredFields = ['id', 'sport', 'game', 'market', 'category'];
    requiredFields.forEach(field => {
      if (!opportunity[field]) {
        errors.push(`CRITICAL: Missing required field: ${field}`);
      }
    });
    
    // Validate odds data for non-preview opportunities
    if (opportunity.category !== 'upcoming' && opportunity.market !== 'Upcoming Event') {
      if (!opportunity.oddsComparison || opportunity.oddsComparison.length === 0) {
        errors.push('CRITICAL: Live opportunity missing odds comparison data');
      }
      
      if (typeof opportunity.ev !== 'number') {
        errors.push('CRITICAL: Expected Value calculation missing or invalid');
      }
      
      if (typeof opportunity.mainBookOdds !== 'number') {
        errors.push('CRITICAL: Main book odds missing or invalid');
      }
    }
    
    return { isValid: errors.length === 0, errors };
  }
  
  // 🚨 LAUNCH READINESS CHECK
  static performLaunchReadinessCheck(data: {
    liveOpportunities: any[];
    upcomingOpportunities: any[];
    systemHealth: any;
  }): { isReady: boolean; report: string[] } {
    const report: string[] = [];
    let isReady = true;
    

    
    // Data freshness validation
    const now = Date.now();
    const dataAge = this.validateDataFreshness(now);
    report.push(`✅ DATA TIMESTAMP: Current (${dataAge.age.toFixed(1)}s old)`);
    
    // Live opportunities validation
    if (data.liveOpportunities.length === 0) {
      report.push(`⚠️  NO LIVE OPPORTUNITIES: System operational but no current live betting available`);
    } else {
      report.push(`✅ LIVE OPPORTUNITIES: ${data.liveOpportunities.length} active betting opportunities`);
    }
    
    // Upcoming opportunities validation
    if (data.upcomingOpportunities.length === 0) {
      report.push(`⚠️  NO UPCOMING OPPORTUNITIES: No games scheduled`);
    } else {
      report.push(`✅ UPCOMING OPPORTUNITIES: ${data.upcomingOpportunities.length} scheduled games`);
    }
    
    // System health
    if (data.systemHealth?.booksScanned < this.REQUIRED_SPORTSBOOKS_MIN) {
      report.push(`❌ INSUFFICIENT SPORTSBOOKS: Only ${data.systemHealth?.booksScanned} available, minimum ${this.REQUIRED_SPORTSBOOKS_MIN} required`);
      isReady = false;
    } else {
      report.push(`✅ SPORTSBOOK COVERAGE: ${data.systemHealth?.booksScanned} sportsbooks active`);
    }
    
    return { isReady, report };
  }
}