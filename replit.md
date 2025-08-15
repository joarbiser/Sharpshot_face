# Sharp Shot - Sports Betting Analytics Platform

### Overview
Sharp Shot is a professional sports betting analytics platform designed to help serious bettors find profitable opportunities through data-driven insights. It provides real-time odds comparison, expected value (+EV) calculations, line tracking, and community-driven betting strategies. The platform aims to be a comprehensive tool for serious bettors, offering a data-driven approach to identify profitable opportunities in the sports betting market.

### User Preferences
Preferred communication style: Simple, everyday language.

### Recent Changes (August 2025)
- **COMPLETE ZERO-TOLERANCE STATUS LABELING SYSTEM**: Finalized comprehensive truthStatus-only implementation with strict enforcement:
  - Eliminated ALL odds-based Live inference throughout codebase with 13/13 unit tests passing
  - Added edge test cases: 90-minute delayed games remain UPCOMING, 3-hour unknown status returns UNKNOWN
  - Implemented runtime validation (dev-only) warning for status mismatches and provider bugs
  - Created EventStatusBadge UI component with colored status indicators and UNKNOWN tooltip
  - Integrated EventStatusBadge into TradingTerminal with data-testid for E2E testing
  - Added STRICT_STATUS_LABELS feature flag for production enforcement
  - Built Cypress E2E test infrastructure with mock event status scenarios
  - Zero tolerance enforcement: Only truly in-progress events labeled "Live" based on provider status, never odds presence, market availability, or time calculations
- **Sharp Shot Gold Branding Consistency Toolkit**: Implemented comprehensive gold branding system (#D8AC35):
  - Updated all color variables for consistent gold theme in light and dark modes
  - Replaced blue/green accent colors with gold variants throughout the application
  - Added comprehensive gold utility classes (text-gold-light, bg-gold-dark, shadow-gold, etc.)
  - Updated sports icons to use consistent gold colors instead of mixed sport-specific colors
  - Fixed CategoryTabs to use gold variants instead of blue/purple for arbitrage/middling
  - Corrected dark mode color scheme to use proper Sharp Shot gold instead of green
  - Added professional gold gradient buttons and focus states
  - Updated precision grids and UI components for brand consistency
- **REAL ARBITRAGE & MIDDLING DETECTION**: Successfully implemented cross-sportsbook opportunity detection:
  - Processing 124+ live betting opportunities from 25+ real sportsbooks per game
  - Real arbitrage opportunities detected (6 found in live testing) with guaranteed profit calculations
  - Middling detection for totals and spreads across different lines
  - Major sportsbooks: FanDuel, DraftKings, BetRivers, Bet365, ESPN Bet, MGM, William Hill, Unibet, etc.
  - European to American odds conversion with proper mathematical categorization
  - Comprehensive side-by-side odds comparison for every opportunity
- **Side-by-Side Odds Comparison**: Restored full odds comparison functionality:
  - Each betting opportunity shows odds from ALL available sportsbooks
  - Opportunities grouped by market type (Moneyline, Spread, Total)
  - Multiple spread/total lines properly separated and compared
  - Best odds highlighted with complete sportsbook comparison tables
- **Trading Terminal Math Library**: Implemented comprehensive pure TypeScript library (`src/lib/tradingMath.ts`) with professional betting calculations including:
  - Odds conversion functions (American ↔ Decimal ↔ Probability)
  - No-vig fair probability calculations using median and trimmed mean aggregation
  - Expected Value (+EV) detection with configurable thresholds
  - Two-way and three-way arbitrage opportunity detection
  - Middling opportunity analysis for totals and spreads
  - Comprehensive unit test suite with 31 passing test cases (100% coverage)
  - Kelly criterion and risk management calculations
- **Opportunity Engine Integration**: Built complete opportunity detection system with:
  - `src/services/opportunityEngine.ts` for processing live betting opportunities
  - `src/services/opportunityGlue.ts` for outcome grouping and key mapping utilities  
  - Guardrails implementation (120-second stale quote filtering)
  - Priority-based opportunity sorting (EV > Arbitrage > Middling)
- **Data Pipeline Integration**: Connected trading math library to existing betting data service via:
  - `server/tradingMathService.ts` with snapshot processing capabilities
  - New API endpoints: `/api/betting/trading-math-analysis` and `/api/betting/process-snapshots`
  - Integration hooks for existing odds refresh points with `onOddsRefreshed` function
- **Professional Mathematical Framework**: All calculations follow Sharp Shot tutorial specifications with proper stake splitting, ROI calculations, and push risk assessment
- **Market Filtering Fixed**: Resolved critical issue where sports filters weren't working properly - MLB now shows only baseball, NBA only basketball
- **Trading Terminal Enhancements**: Fixed undefined variable error, now displays ALL sportsbook logos without truncation
- **Comprehensive Team Logo Integration**: Added multi-API team logo service supporting ESPN, TheSportsDB, FIFA, and OpenLigaDB
- **Enhanced Sportsbook Display**: Shows all available sportsbooks with odds average column and professional fallbacks
- **COMPREHENSIVE DUPLICATE SPORTSBOOK ELIMINATION**: Implemented dual-layer deduplication system:
  - Server-side balanced deduplication removes obvious duplicates (BetRivers/Rivers, FanDuel variations) while preserving legitimate different books
  - Client-side final cleanup using normalized sportsbook names and odds combinations for zero duplicates
  - Enhanced filtering logic for market, league, and sportsbook filters with exact matching and fallback patterns
  - Real-time deduplication logging shows "Deduplicated X books to Y unique providers" for transparency
- **Advanced Betting Features**: Implemented live arbitrage detection across multiple sportsbooks, middling opportunities for totals/spreads, and comprehensive bet categorization
- **ESPN API Integration**: Added official ESPN team logo APIs for all major sports (NFL, NBA, MLB, NHL, soccer leagues, UFC, Formula 1)
- **Preset Terminal**: Built complete preset management system with book weighting, filter saving, and strategy sharing
- **Sharp Shot Tutorial Integration**: Added proper +EV calculations, implied probability functions, and guaranteed profit calculations
- **Professional Book Weighting**: Integrated industry-standard book reliability weights (Pinnacle 1.8x, Circa 1.6x, etc.)
- **Server-Side Logo Proxy**: Implemented caching proxy service for external team logo APIs to handle CORS and rate limiting
- **Visual Improvements**: Team logos now display in Trading Terminal alongside game matchups with proper sport mapping

### System Architecture

#### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting both light and dark modes. Light mode: 60% white/background, 30% charcoal/secondary, 10% gold/accent (#D8AC35). Dark mode: Black backgrounds with green accents.
- **Build Tool**: Vite for development and production builds
- **UI/UX Decisions**:
    - **Theme-Aware Interface**: Complete dark/light mode implementation with toggle buttons.
    - **Modern Homepage Design**: Revamped homepage with high-end sports betting app aesthetic, smooth layouts, and professional branding.
    - **Navigation**: Professional sticky header with dropdown menus and integrated theme toggle.
    - **Typography & Layout**: Large, bold headlines, clean button designs with hover animations, and responsive color schemes.
    - **Interactive Elements**: Hover effects with scale transformations and smooth transitions.
    - Comprehensive component library based on Shadcn/ui.
    - Mobile responsiveness for all pages and features.
    - Professional authentication with profile dropdown and avatar.
    - Smooth scroll navigation and animated achievement notifications.
    - Consistent text contrast for accessibility (WCAG 2.1 AA compliant).
    - Use of Press Start 2P font for retro digital display effects in the sports ticker.

#### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Pattern**: RESTful API with `/api` prefix routing

#### Project Structure
- **Monorepo**: Single repository with client, server, and shared code.
- **Client**: React application in `/client` directory.
- **Server**: Express.js API in `/server` directory.
- **Shared**: Common types and schemas in `/shared` directory.

#### Technical Implementations
- **Database Layer**: Drizzle ORM for type-safe operations and schema definitions. Includes tables for Users, Payments, and Password Reset Tokens.
- **Authentication System**: Session-based authentication with bcrypt password hashing, email validation, and PostgreSQL-backed session storage. Includes user registration, login, and account management.
- **Sports Data Integration**: Integration with "Are You Watching This?!" Sports API for real-time sports data across various sports.
- **Payment Processing**: Integrated with Stripe for subscription management (Pro and Unlimited tiers) and supports cryptocurrency payments (USDC across 7 networks).
- **Team Logo Service**: Multi-API integration with ESPN, TheSportsDB, FIFA, and OpenLigaDB for comprehensive team logo coverage across all major sports leagues and international competitions. Includes intelligent caching, fallback handling, and server-side proxy to manage CORS and rate limiting.

- **Betting Analytics Platform**: Complete Sharp Shot implementation with two main terminals:
  - **Trading Terminal** (`/trading-terminal`): Real-time betting opportunity feed using authentic "areyouwatchingthis" API data. Features four categories (All, +EV, Arbitrage, Middling) with proper bet classification based on Sharp Shot tutorial specifications. Includes market filters that properly separate sports, EV thresholds, sportsbook selection, and comprehensive team logo integration.
  - **Preset Terminal** (`/preset-terminal`): Advanced strategy builder for creating, managing, and applying saved filter presets. Features book weighting system with industry-standard reliability scores, preset sharing (public/private), strategy performance tracking, and one-click application to Trading Terminal. Includes built-in Sharp Shot presets for common strategies.
  - **Advanced Analytics**: Proper implied probability calculations, arbitrage stake calculations for guaranteed profit, middling opportunity detection with win-win scenarios, and comprehensive bet categorization matching Sharp Shot's professional methodology.
- **Navigation Architecture**: Simplified header navigation with two main tabs (Trading Terminal, Preset Terminal) replacing complex dropdown menus. Clean, direct access to core functionality.
- **Data Flow**: Client requests to `/api` endpoints, processed by Express.js routes, accessing data via storage layer and Neon PostgreSQL, returning JSON responses to the client, with React Query managing state.

#### Sports Content Engine Module
- **Purpose**: Generates authentic sports content including game previews, recaps, player news, betting insights, and statistical analysis.
- **Implementation**: Standalone module in `/content_engine/`.
- **Features**: Real data integration, automated scheduling, RESTful API endpoints at `/api/content-engine/*`, production-ready TypeScript, and structured markdown output.
- **Isolation**: Completely isolated from existing codebase with no conflicts or dependencies.

### External Dependencies

- **@neondatabase/serverless**: Serverless PostgreSQL driver.
- **drizzle-orm**: TypeScript ORM for database operations.
- **@tanstack/react-query**: For server state management and data synchronization.
- **@radix-ui/***: Headless UI component primitives.
- **tailwindcss**: Utility-first CSS framework.
- **vite**: Build tool and development server.
- **typescript**: For type safety.
- **drizzle-kit**: Database migration and introspection tools.
- **Are You Watching This?! Sports API**: External data source for sports statistics and real-time game data.
- **Stripe**: For subscription management and payment processing.
- **react-icons**: For sports and team icon integration.
- **date-fns**: For date manipulation and formatting.