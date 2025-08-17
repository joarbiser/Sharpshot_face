// Real-Time Data Monitoring Service
export class RealTimeDataMonitor {
  private static instance: RealTimeDataMonitor;
  private monitoringActive = false;
  private intervalId: NodeJS.Timeout | null = null;
  
  static getInstance(): RealTimeDataMonitor {
    if (!this.instance) {
      this.instance = new RealTimeDataMonitor();
    }
    return this.instance;
  }
  
  // 🚨 START CONTINUOUS DATA MONITORING
  startMonitoring(intervalMs: number = 60000): void { // 1 minute default
    if (this.monitoringActive) {
      console.log('📊 Real-time monitoring already active');
      return;
    }
    
    console.log('🚀 STARTING REAL-TIME DATA MONITORING - Zero tolerance for stale data');
    this.monitoringActive = true;
    
    // Initial check
    this.performDataCheck();
    
    // Set up recurring checks
    this.intervalId = setInterval(() => {
      this.performDataCheck();
    }, intervalMs);
  }
  
  stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.monitoringActive = false;
    console.log('📊 Real-time data monitoring stopped');
  }
  
  private async performDataCheck(): Promise<void> {
    try {
      const { LaunchValidationService } = await import('./launchValidation');
      const { BettingDataService } = await import('./bettingDataService');
      
      // Check demo access first
      const demoCheck = LaunchValidationService.validateDemoAccess();
      if (!demoCheck.isValid) {
        console.error('🚨 DEMO EXPIRED - System access denied');
        return;
      }
      
      // Check data freshness
      const bettingService = new BettingDataService();
      const opportunities = await bettingService.getUpcomingBettingOpportunities().catch(() => []);
      
      const now = Date.now();
      const staleOpportunities = opportunities.filter(opp => {
        if (!opp.gameTime) return false;
        const gameTime = new Date(opp.gameTime).getTime();
        const age = (now - gameTime) / 1000;
        return age > 30; // Older than 30 seconds is considered stale
      });
      
      if (staleOpportunities.length > 0) {
        console.warn(`⚠️  DATA STALENESS DETECTED: ${staleOpportunities.length} stale opportunities found`);
      }
      
      // Validate sportsbook coverage
      const uniqueBooks = new Set();
      opportunities.forEach(opp => {
        if (opp.oddsComparison) {
          opp.oddsComparison.forEach(odds => uniqueBooks.add(odds.sportsbook));
        }
      });
      
      if (uniqueBooks.size < 20) {
        console.error(`🚨 INSUFFICIENT SPORTSBOOKS: Only ${uniqueBooks.size}/20 minimum required`);
      } else {
        console.log(`✅ SPORTSBOOK COVERAGE: ${uniqueBooks.size} active providers`);
      }
      
      console.log(`📊 DATA CHECK: ${opportunities.length} opportunities, ${demoCheck.daysRemaining} days remaining`);
      
    } catch (error) {
      console.error('🚨 DATA MONITORING ERROR:', error);
    }
  }
  
  // Get current monitoring status
  getStatus(): { isActive: boolean; intervalMs: number | null } {
    return {
      isActive: this.monitoringActive,
      intervalMs: this.intervalId ? 60000 : null
    };
  }
}