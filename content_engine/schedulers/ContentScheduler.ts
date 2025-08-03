// Content Scheduler - Handles automated content generation

import { SportsContentEngine } from '../index';
import { Logger } from '../utils/Logger';

export class ContentScheduler {
  private contentEngine: SportsContentEngine;
  private logger: Logger;
  private intervals: Map<string, NodeJS.Timeout>;

  constructor(contentEngine: SportsContentEngine) {
    this.contentEngine = contentEngine;
    this.logger = new Logger();
    this.intervals = new Map();
  }

  /**
   * Start all scheduled content generation
   */
  startScheduledGeneration(): void {
    this.logger.info('Starting content generation schedules...');
    
    // Generate daily content every 6 hours
    this.scheduleDaily();
    
    // Generate weekly content every Sunday at midnight
    this.scheduleWeekly();
    
    // Generate player news every 2 hours
    this.schedulePlayerNews();
    
    this.logger.info('All content schedules started successfully');
  }

  /**
   * Stop all scheduled content generation
   */
  stopScheduledGeneration(): void {
    this.logger.info('Stopping all content generation schedules...');
    
    this.intervals.forEach((interval, name) => {
      clearInterval(interval);
      this.logger.info(`Stopped schedule: ${name}`);
    });
    
    this.intervals.clear();
    this.logger.info('All schedules stopped');
  }

  /**
   * Schedule daily content generation
   */
  private scheduleDaily(): void {
    const interval = setInterval(async () => {
      try {
        this.logger.info('Running scheduled daily content generation...');
        await this.contentEngine.generateDailyContent();
        this.logger.info('Scheduled daily content generation completed');
      } catch (error) {
        this.logger.error('Error in scheduled daily content generation:', error);
      }
    }, 6 * 60 * 60 * 1000); // Every 6 hours

    this.intervals.set('daily', interval);
    this.logger.info('Daily content schedule started (every 6 hours)');
  }

  /**
   * Schedule weekly content generation
   */
  private scheduleWeekly(): void {
    const interval = setInterval(async () => {
      const now = new Date();
      // Run on Sundays at midnight
      if (now.getDay() === 0 && now.getHours() === 0) {
        try {
          this.logger.info('Running scheduled weekly content generation...');
          await this.contentEngine.generateWeeklyContent();
          this.logger.info('Scheduled weekly content generation completed');
        } catch (error) {
          this.logger.error('Error in scheduled weekly content generation:', error);
        }
      }
    }, 60 * 60 * 1000); // Check every hour

    this.intervals.set('weekly', interval);
    this.logger.info('Weekly content schedule started (Sundays at midnight)');
  }

  /**
   * Schedule player news generation
   */
  private schedulePlayerNews(): void {
    const interval = setInterval(async () => {
      try {
        this.logger.info('Running scheduled player news generation...');
        // Generate only player news updates
        const playerUpdates = await this.contentEngine['dataService'].getPlayerUpdates();
        for (const update of playerUpdates) {
          const news = await this.contentEngine['contentGenerator'].generatePlayerNews(update);
          await this.contentEngine['saveContent']('player_news', `player_${update.playerID}_${Date.now()}`, news);
        }
        this.logger.info('Scheduled player news generation completed');
      } catch (error) {
        this.logger.error('Error in scheduled player news generation:', error);
      }
    }, 2 * 60 * 60 * 1000); // Every 2 hours

    this.intervals.set('player_news', interval);
    this.logger.info('Player news schedule started (every 2 hours)');
  }

  /**
   * Run immediate content generation
   */
  async runImmediateGeneration(type: 'daily' | 'weekly' | 'all' = 'all'): Promise<void> {
    try {
      this.logger.info(`Running immediate ${type} content generation...`);
      
      if (type === 'daily' || type === 'all') {
        await this.contentEngine.generateDailyContent();
      }
      
      if (type === 'weekly' || type === 'all') {
        await this.contentEngine.generateWeeklyContent();
      }
      
      this.logger.info(`Immediate ${type} content generation completed`);
    } catch (error) {
      this.logger.error(`Error in immediate ${type} content generation:`, error);
      throw error;
    }
  }

  /**
   * Get scheduler status
   */
  getStatus(): { [key: string]: boolean } {
    return {
      daily: this.intervals.has('daily'),
      weekly: this.intervals.has('weekly'),
      player_news: this.intervals.has('player_news')
    };
  }
}