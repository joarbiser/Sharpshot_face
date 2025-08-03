#!/usr/bin/env node
// CLI for Sports Content Engine

import { SportsContentEngine } from './index';
import { ContentScheduler } from './schedulers/ContentScheduler';
import { runContentEngineDemo } from './demo/runDemo';
import { Logger } from './utils/Logger';

const logger = new Logger();

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'demo':
        await runContentEngineDemo();
        break;

      case 'generate':
        const type = args[1] || 'all';
        await generateContent(type);
        break;

      case 'schedule':
        const action = args[1];
        await scheduleContent(action);
        break;

      case 'help':
      default:
        showHelp();
        break;
    }
  } catch (error) {
    logger.error('CLI command failed:', error);
    process.exit(1);
  }
}

async function generateContent(type: string) {
  logger.info(`Generating ${type} content...`);
  const contentEngine = new SportsContentEngine();

  switch (type) {
    case 'daily':
      await contentEngine.generateDailyContent();
      break;
    case 'weekly':
      await contentEngine.generateWeeklyContent();
      break;
    case 'all':
    default:
      await contentEngine.generateDailyContent();
      await contentEngine.generateWeeklyContent();
      break;
  }

  logger.info(`${type} content generation completed!`);
  logger.info('Check content_engine/output/ for generated files');
}

async function scheduleContent(action: string) {
  const contentEngine = new SportsContentEngine();
  const scheduler = new ContentScheduler(contentEngine);

  switch (action) {
    case 'start':
      scheduler.startScheduledGeneration();
      logger.info('Content generation schedules started');
      logger.info('Press Ctrl+C to stop');
      
      // Keep process alive
      process.on('SIGINT', () => {
        scheduler.stopScheduledGeneration();
        process.exit(0);
      });
      break;

    case 'stop':
      scheduler.stopScheduledGeneration();
      logger.info('All schedules stopped');
      break;

    case 'status':
      const status = scheduler.getStatus();
      logger.info('Scheduler status:', status);
      break;

    default:
      logger.error('Invalid schedule action. Use: start, stop, or status');
      break;
  }
}

function showHelp() {
  console.log(`
Sports Content Engine CLI

Usage:
  npm run content-engine demo         - Run demonstration
  npm run content-engine generate     - Generate all content
  npm run content-engine generate daily   - Generate daily content only
  npm run content-engine generate weekly  - Generate weekly content only
  npm run content-engine schedule start   - Start scheduled generation
  npm run content-engine schedule stop    - Stop scheduled generation
  npm run content-engine schedule status  - Show schedule status
  npm run content-engine help        - Show this help

Generated content is saved to: content_engine/output/

Content Types Generated:
- Game previews and recaps
- Player news and performance updates
- Team weekly summaries
- League-wide statistics
- Betting insights and recommendations
- Niche storylines and trends
`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as runCLI };