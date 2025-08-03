# Sports Content Engine

A comprehensive, automated sports content generation system built for the Sharp Shot sports betting analytics platform. This module generates authentic, data-driven sports content including game previews, recaps, player news, betting insights, and more.

## 🎯 Features

### Content Types Generated
- **Game Previews**: Detailed previews for upcoming games with betting lines, team analysis, and key factors
- **Game Recaps**: Comprehensive summaries of completed games with scores, highlights, and key statistics  
- **Player News**: Injury updates, performance highlights, and milestone tracking
- **Team Weekly Summaries**: Weekly recaps and previews for all teams
- **League Statistics**: Top performers, standings, and trend analysis
- **Betting Insights**: Best bets, upset alerts, and spread analysis
- **Niche Stories**: Location-based player features, draft analysis, home/away trends

### Key Capabilities
- **Real Data Integration**: Uses live sports APIs and existing platform data
- **Automated Scheduling**: Configurable content generation schedules
- **Error Handling**: Graceful fallbacks for missing or incomplete data
- **Modular Architecture**: Clean separation of concerns with extensible design
- **Multiple Output Formats**: Markdown files with structured, readable content

## 🚀 Quick Start

### Run Demo
```bash
cd content_engine
npm run demo
```

### Generate Content Manually
```bash
# Generate all content types
npm run generate

# Generate daily content only (previews, recaps, player news, stats)
npm run generate:daily

# Generate weekly content only (team summaries, betting insights, niche stories)
npm run generate:weekly
```

### Scheduled Generation
```bash
# Start automated content generation schedules
npm run schedule:start

# Check scheduler status
npm run schedule:status

# Stop all schedules
npm run schedule:stop
```

## 📁 Project Structure

```
content_engine/
├── index.ts                    # Main engine entry point
├── types/ContentTypes.ts       # TypeScript interfaces and types
├── services/DataService.ts     # Sports data fetching and processing
├── generators/ContentGenerator.ts # Content creation logic
├── schedulers/ContentScheduler.ts # Automated scheduling system
├── utils/Logger.ts            # Logging utility
├── api/routes.ts              # Express API routes
├── demo/runDemo.ts            # Demonstration script
├── cli.ts                     # Command-line interface
├── output/                    # Generated content files
└── README.md                  # This file
```

## 🔧 Configuration

The engine uses environment variables for configuration:

- `SPORTS_API_KEY`: API key for sports data service
- `NODE_ENV`: Environment setting (development/production)

## 📊 Data Sources

- **Primary**: "Are You Watching This?!" Sports API
- **Fallback**: Synthetic data with realistic patterns
- **Integration**: Uses existing Sharp Shot platform data when available

## 🎛️ API Integration

The content engine provides REST API endpoints for integration:

```javascript
// Generate content on demand
POST /api/content-engine/generate/:type

// Control scheduling
POST /api/content-engine/schedule/:action
GET /api/content-engine/schedule/status

// Engine information
GET /api/content-engine/info
GET /api/content-engine/health
```

## 📝 Generated Content Examples

### Game Preview
```markdown
# Game Preview: Los Angeles Lakers vs Boston Celtics

**Date:** January 15, 2024
**Time:** 8:00 PM ET
**League:** NBA
**Venue:** TD Garden

## Betting Lines
- **Spread:** Lakers +3.5
- **Over/Under:** 225.5
- **Moneyline:** Lakers +150 | Celtics -180

## Matchup Analysis
This NBA matchup features Lakers taking on Celtics...
```

### Player News
```markdown
# Player Update: LeBron James

**Player:** LeBron James
**Team:** Los Angeles Lakers
**Date:** January 15, 2024
**Update Type:** Performance

## Performance Highlight
LeBron James delivered an outstanding performance...
```

## 🔄 Scheduling

The content engine supports automated generation:

- **Daily Content**: Every 6 hours (game previews, recaps, player news, league stats)
- **Weekly Content**: Sundays at midnight (team summaries, betting insights, niche stories)  
- **Player News**: Every 2 hours (injury updates, performance highlights)

## 🛡️ Error Handling

- Graceful handling of API failures
- Fallback content generation when data is unavailable
- Comprehensive logging for debugging
- No crashes from individual content generation failures

## 🔌 Integration with Sharp Shot

This module is designed as a standalone system that:
- Doesn't modify existing Sharp Shot code
- Uses existing API endpoints when available
- Saves content to dedicated output directory
- Provides API routes for frontend integration

## 📈 Future Enhancements

- Real-time content updates via WebSocket
- AI-powered content personalization
- Multi-language content generation
- Advanced analytics and performance metrics
- Social media integration for content distribution

## 🤝 Contributing

The content engine is designed for easy extension:

1. Add new content types in `ContentTypes.ts`
2. Implement generators in `ContentGenerator.ts`
3. Update data fetching in `DataService.ts`
4. Add scheduling in `ContentScheduler.ts`

## 📄 License

MIT License - Built for Sharp Shot Sports Analytics Platform