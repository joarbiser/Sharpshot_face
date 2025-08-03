// Demo script to showcase the sports content engine

import { SportsContentEngine } from '../index';
import { ContentScheduler } from '../schedulers/ContentScheduler';
import { Logger } from '../utils/Logger';

async function runContentEngineDemo(): Promise<void> {
  const logger = new Logger();
  logger.info('='.repeat(60));
  logger.info('SPORTS CONTENT ENGINE DEMO STARTING');
  logger.info('='.repeat(60));

  try {
    // Initialize the content engine
    const contentEngine = new SportsContentEngine();
    logger.info('Content engine initialized successfully');

    // Run immediate content generation
    logger.info('Generating sample content...');
    
    // Generate daily content (previews, recaps, player news, league stats)
    logger.info('Generating daily content...');
    await contentEngine.generateDailyContent();
    
    // Generate weekly content (team recaps, betting insights, niche stories)
    logger.info('Generating weekly content...');
    await contentEngine.generateWeeklyContent();

    logger.info('Sample content generation completed!');
    logger.info('Check the content_engine/output/ directory for generated files.');

    // Demo scheduler functionality
    logger.info('Testing scheduler functionality...');
    const scheduler = new ContentScheduler(contentEngine);
    
    // Show scheduler status
    const status = scheduler.getStatus();
    logger.info('Scheduler status:', status);
    
    // Start schedules for 10 seconds demo
    scheduler.startScheduledGeneration();
    logger.info('Schedules started for demonstration (will stop in 10 seconds)');
    
    setTimeout(() => {
      scheduler.stopScheduledGeneration();
      logger.info('Demo schedules stopped');
    }, 10000);

    logger.info('='.repeat(60));
    logger.info('SPORTS CONTENT ENGINE DEMO COMPLETED');
    logger.info('='.repeat(60));
    
    // Show what was generated
    logger.info('Generated content includes:');
    logger.info('- Game previews for upcoming matches');
    logger.info('- Game recaps for completed games');  
    logger.info('- Player news and performance updates');
    logger.info('- League-wide statistics summaries');
    logger.info('- Team weekly recaps');
    logger.info('- Betting insights and recommendations');
    logger.info('- Niche storylines and trends');
    
    logger.info('All content is saved as markdown files in content_engine/output/');
    
  } catch (error) {
    logger.error('Demo failed:', error);
    process.exit(1);
  }
}

// Export for external use
export { runContentEngineDemo };

// Run demo if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runContentEngineDemo().catch(console.error);
}