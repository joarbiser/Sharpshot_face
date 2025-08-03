// API routes for content engine integration

import { Router } from 'express';
import { SportsContentEngine } from '../index';
import { ContentScheduler } from '../schedulers/ContentScheduler';
import { Logger } from '../utils/Logger';

const router = Router();
const logger = new Logger();
const contentEngine = new SportsContentEngine();
const scheduler = new ContentScheduler(contentEngine);

/**
 * Generate content on demand
 */
router.post('/generate/:type', async (req, res) => {
  try {
    const { type } = req.params;
    logger.info(`API request to generate ${type} content`);

    switch (type) {
      case 'daily':
        await contentEngine.generateDailyContent();
        break;
      case 'weekly':
        await contentEngine.generateWeeklyContent();
        break;
      case 'all':
        await contentEngine.generateDailyContent();
        await contentEngine.generateWeeklyContent();
        break;
      default:
        return res.status(400).json({ 
          error: 'Invalid content type. Use: daily, weekly, or all' 
        });
    }

    res.json({ 
      success: true, 
      message: `${type} content generated successfully`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('API content generation failed:', error);
    res.status(500).json({ 
      error: 'Content generation failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Control content scheduling
 */
router.post('/schedule/:action', async (req, res) => {
  try {
    const { action } = req.params;
    logger.info(`API request to ${action} scheduling`);

    switch (action) {
      case 'start':
        scheduler.startScheduledGeneration();
        res.json({ 
          success: true, 
          message: 'Content generation schedules started',
          status: scheduler.getStatus()
        });
        break;

      case 'stop':
        scheduler.stopScheduledGeneration();
        res.json({ 
          success: true, 
          message: 'All schedules stopped',
          status: scheduler.getStatus()
        });
        break;

      default:
        return res.status(400).json({ 
          error: 'Invalid action. Use: start or stop' 
        });
    }
  } catch (error) {
    logger.error('API scheduling control failed:', error);
    res.status(500).json({ 
      error: 'Scheduling control failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Get scheduler status
 */
router.get('/schedule/status', (req, res) => {
  try {
    const status = scheduler.getStatus();
    res.json({ 
      success: true, 
      status,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('API status check failed:', error);
    res.status(500).json({ 
      error: 'Status check failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Get available content types and info
 */
router.get('/info', (req, res) => {
  res.json({
    success: true,
    info: {
      name: 'Sports Content Engine',
      version: '1.0.0',
      description: 'Automated sports content generation system',
      contentTypes: [
        'Game Previews',
        'Game Recaps', 
        'Player News',
        'Team Weekly Summaries',
        'League Statistics',
        'Betting Insights',
        'Niche Stories & Trends'
      ],
      endpoints: {
        'POST /generate/:type': 'Generate content (daily/weekly/all)',
        'POST /schedule/:action': 'Control scheduling (start/stop)',
        'GET /schedule/status': 'Get scheduler status',
        'GET /info': 'Get engine information'
      }
    },
    timestamp: new Date().toISOString()
  });
});

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export { router as contentEngineRoutes };