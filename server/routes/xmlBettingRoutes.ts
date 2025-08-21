// server/routes/xmlBettingRoutes.ts
// Server routes for XML betting data

import { Router } from 'express';
import { fetchBettingOpportunities, deduplicateOpportunities } from '../../src/lib/xmlApiService';

const router = Router();

// Cache for betting opportunities
let cachedOpportunities: any[] = [];
let lastFetch = 0;
const CACHE_DURATION = 30000; // 30 seconds

/**
 * Get betting opportunities from XML API
 */
router.get('/xml-opportunities', async (req, res) => {
  try {
    const now = Date.now();
    
    // Use cached data if available and fresh
    if (cachedOpportunities.length > 0 && (now - lastFetch) < CACHE_DURATION) {
      console.log('Returning cached XML opportunities:', cachedOpportunities.length);
      return res.json(cachedOpportunities);
    }
    
    console.log('Fetching fresh XML opportunities from API...');
    
    // Fetch fresh data
    const opportunities = await fetchBettingOpportunities();
    const deduplicatedOpportunities = deduplicateOpportunities(opportunities);
    
    // Update cache
    cachedOpportunities = deduplicatedOpportunities;
    lastFetch = now;
    
    console.log(`Fetched ${opportunities.length} opportunities, deduplicated to ${deduplicatedOpportunities.length}`);
    
    res.json(deduplicatedOpportunities);
    
  } catch (error) {
    console.error('Error fetching XML opportunities:', error);
    res.status(500).json({ 
      error: 'Failed to fetch betting opportunities',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get terminal stats for XML data
 */
router.get('/xml-terminal-stats', async (req, res) => {
  try {
    const now = Date.now();
    
    // Use cached data if available
    if (cachedOpportunities.length === 0 || (now - lastFetch) >= CACHE_DURATION) {
      try {
        const opportunities = await fetchBettingOpportunities();
        cachedOpportunities = deduplicateOpportunities(opportunities);
        lastFetch = now;
      } catch (error) {
        console.error('Error refreshing opportunities for stats:', error);
        // Continue with cached data if available
      }
    }
    
    const stats = {
      totalOpportunities: cachedOpportunities.length,
      positiveEVCount: cachedOpportunities.filter(opp => (opp.evPercent ?? 0) > 0).length,
      liveGamesCount: cachedOpportunities.filter(opp => opp.event?.status === 'live').length,
      averageEV: cachedOpportunities.length > 0 ? 
        cachedOpportunities.reduce((sum, opp) => sum + (opp.evPercent ?? 0), 0) / cachedOpportunities.length : 0,
      lastUpdated: new Date(lastFetch).toISOString(),
      categories: {
        all: cachedOpportunities.length,
        positiveEV: cachedOpportunities.filter(opp => (opp.evPercent ?? 0) > 0).length,
        arbitrage: cachedOpportunities.filter(opp => (opp.evPercent ?? 0) > 5).length,
        middling: cachedOpportunities.filter(opp => (opp.evPercent ?? 0) > 2 && (opp.evPercent ?? 0) < 5).length
      },
      sports: [...new Set(cachedOpportunities.map(opp => 
        opp.event?.sport || opp.event?.league || 'Unknown'
      ))].map(sport => ({
        name: sport,
        count: cachedOpportunities.filter(opp => 
          (opp.event?.sport || opp.event?.league) === sport
        ).length
      })),
      books: [...new Set(cachedOpportunities.map(opp => opp.myPrice?.book).filter(Boolean))].map(book => ({
        name: book,
        count: cachedOpportunities.filter(opp => opp.myPrice?.book === book).length
      }))
    };
    
    res.json(stats);
    
  } catch (error) {
    console.error('Error calculating terminal stats:', error);
    res.status(500).json({ 
      error: 'Failed to calculate terminal stats',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Force refresh the cache
 */
router.post('/xml-refresh', async (req, res) => {
  try {
    console.log('Force refreshing XML opportunities cache...');
    
    const opportunities = await fetchBettingOpportunities();
    const deduplicatedOpportunities = deduplicateOpportunities(opportunities);
    
    cachedOpportunities = deduplicatedOpportunities;
    lastFetch = Date.now();
    
    console.log(`Force refresh completed: ${deduplicatedOpportunities.length} opportunities`);
    
    res.json({ 
      success: true,
      count: deduplicatedOpportunities.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error force refreshing XML opportunities:', error);
    res.status(500).json({ 
      error: 'Failed to refresh opportunities',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Test XML API connectivity
 */
router.get('/xml-test', async (req, res) => {
  try {
    const { fetchGames } = await import('../../src/lib/xmlApiService');
    
    console.log('Testing XML API connectivity...');
    const games = await fetchGames();
    
    res.json({
      success: true,
      message: 'XML API connection successful',
      gameCount: games.length,
      sampleGames: games.slice(0, 3).map(game => ({
        id: game.id,
        matchup: `${game.away} @ ${game.home}`,
        sport: game.sport,
        league: game.league,
        status: game.status
      })),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('XML API test failed:', error);
    res.status(500).json({
      success: false,
      error: 'XML API test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;