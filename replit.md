# Sharp Shot - Sports Betting Analytics Platform

### Overview
Sharp Shot is a professional sports betting analytics platform designed to help serious bettors find profitable opportunities through data-driven insights. It provides real-time odds comparison, expected value (+EV) calculations, line tracking, and community-driven betting strategies called "Views." The platform aims to be a comprehensive tool for serious bettors, offering a data-driven approach to identify profitable opportunities in the sports betting market.

### User Preferences
Preferred communication style: Simple, everyday language.

### Recent Changes
- **Comprehensive UI & Functionality Upgrade (Aug 2025)**: Implemented categorized bet opportunities with filterable tabs (+EV, Arbitrage, Middling) including smart classification logic and interactive bet counts. Fixed vertical alignment across all columns using consistent min-h-[40px] containers and flex items-center. Added sportsbook logos header row with horizontal scrolling support and keyboard navigation (arrow keys). Implemented responsive dynamic sizing with min-w-[80px] flex-shrink-0 containers. Added professional refresh button with loading states and proper Sharp Shot branding. Enhanced field comparison with overflow-x-auto scrolling and 8 sportsbook display slots. All changes maintain existing structure while adding modular improvements.
- **Enhanced Calculator Accuracy & Presentation (Aug 2025)**: Fixed critical sports data filtering to prevent cross-sport market contamination (e.g., NBA player props in NFL games). Implemented sport-specific market normalization (Basketball → NBA, Football → NFL) with comprehensive sport coverage (NBA, NFL, MLB, NHL, NCAAB, NCAAF). Enhanced book column to display actual sportsbook names instead of "ALL BOOKS" placeholder. Replaced placeholder dots with authentic sportsbook logos in field comparison section. Improved alignment and spacing for professional trading terminal aesthetic. All EV percentages now consistently rounded to 1 decimal place maximum.
- **Comprehensive FAQ Page (Aug 2025)**: Created dedicated FAQ page at `/faq` with comprehensive Q&A covering platform usage, betting concepts (+EV, arbitrage, middling), pricing, affiliate program, technical support, and tax information. Integrated into main navigation and footer for easy access. Redesigned with modern, techy, centered layout featuring gradient hero section, monospace typography, glowing accent colors, and glass-morphism design elements for professional aesthetic.
- **Pricing Display Update (Aug 2025)**: Updated pricing page to show "Save two months" instead of dollar amounts for both Pro and Unlimited annual plans, providing clearer savings messaging.
- **Pricing Tiers Update: Basic/Pro → Pro/Unlimited (Aug 2025)**: Restructured pricing tiers from Basic ($59.99) and Pro ($99.99) to Pro ($59.99) and Unlimited ($99.99). Pro tier includes +EV calculator and 2 saved presets. Unlimited tier adds arbitrage, middling, all profitable bets calculators, and unlimited shareable presets.
- **Terminology Update: Views → Presets (Aug 2025)**: Changed all user-facing references from "Views" to "Presets" across the entire platform including pricing page, product features, navigation menus, and FAQ sections. Updated terminology provides clearer understanding that these are saved betting strategy configurations rather than visual displays.
- **Trading Terminal Green Accent (Aug 2025)**: Applied consistent bright green (#10B981/green-400) accent color throughout pricing section and trading terminal elements, replacing previous green variants for unified brand consistency and professional trading platform aesthetic.
- **Dark/Light Mode Interface (Aug 2025)**: Implemented comprehensive dark/light mode theming with sun/moon toggle buttons in navigation header. Features include persistent theme storage in localStorage, smooth color transitions, semantic CSS variables, and professional interface that adapts to user preference for optimal viewing in any lighting condition.
- **Brand Assets Integration (Jan 2025)**: Integrated official Sharp Shot logo variants across the platform including header, footer, and authentication pages. Logo features star and leaf design with gold primary color and white/black alternatives for different backgrounds and dark mode compatibility.
- **Brand Color Standardization (Jan 2025)**: Unified all gold color values across the platform to use consistent Sharp Shot brand gold (#D8AC35). Updated CSS variables, utility classes, component styles, email templates, and all hardcoded color values to ensure brand consistency in buttons, icons, text highlights, and UI elements.

### System Architecture

#### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting both light and dark modes. Light mode: 60% white/background, 30% charcoal/secondary, 10% gold/accent (#D8AC35). Dark mode: Black backgrounds with green accents for professional nighttime usage.
- **Build Tool**: Vite for development and production builds
- **UI/UX Decisions**:
    - **Theme-Aware Interface (Aug 2025)**: Complete dark/light mode implementation with toggle buttons, showcased prominently on homepage with side-by-side interface previews and professional theming throughout.
    - **Modern Homepage Design (Updated Jan 2025)**: Completely revamped homepage with high-end sports betting app aesthetic featuring smooth, clean layouts, full-screen hero sections, and professional branding.
    - **Sticky Navigation**: Professional header with dropdown menus, proper spacing, modern button styling, and integrated theme toggle functionality.
    - **Typography & Layout**: Large, bold headlines with generous spacing, clean button designs with hover animations, and responsive color schemes that adapt to theme preference.
    - **Interactive Elements**: Hover effects with scale transformations, smooth transitions (duration-300), and responsive design patterns.
    - Comprehensive component library based on Shadcn/ui.
    - Mobile responsiveness for all pages and features.
    - Professional authentication with profile dropdown and avatar.
    - Smooth scroll navigation and animated achievement unlock notifications.
    - Consistent text contrast (charcoal/gray text) for accessibility (WCAG 2.1 AA compliant).
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
- **Database Layer**: Drizzle ORM for type-safe operations, centralized schema definitions, and migrations. Includes tables for Users, Payments, Achievements, User Achievements, and User Stats.
- **Authentication System**: Session-based authentication with bcrypt password hashing (12 rounds), email validation, and PostgreSQL-backed session storage with 7-day expiration. Includes user registration, login, and account management (profile, subscription, payment history).
- **Sports Data Integration**:
    - Integration with "Are You Watching This?!" Sports API for real-time sports data.
    - Supports MLB, NFL, NBA, NHL, NCAA Basketball/Football, WNBA, CFL, and more, across 25+ sports including F1, soccer, hockey, tennis, MMA, golf, baseball, basketball, and cricket.
    - Provides live games, event tracking, video highlights, and headlines.
    - API Endpoints: `/api/sports/games/today`, `/api/sports/games/range`, `/api/sports/games/:gameId`, `/api/sports/events/recent`, `/api/sports/highlights/recent`, `/api/sports/headlines/future`.
- **Payment Processing**: Integrated with Stripe for subscription management (Pro and Unlimited tiers) and supports cryptocurrency payments (USDC across 7 networks: Ethereum, Polygon, Solana, Tron, Optimism, Base, Arbitrum).
- **Gamified Achievement System**: Tracks achievements across categories (Getting Started, Performance, Social, Volume) with real-time notifications, point rewards, progress monitoring, and leaderboard competition.
- **Betting Analytics Platform**: Includes a Calculator page for live odds comparison and EV calculations, a Preset Builder for creating custom betting strategies, a Dashboard for personal performance tracking, and Community Presets for sharing and collaborating on strategies.
- **Data Flow**: Client requests to `/api` endpoints, processed by Express.js routes, accessing data via storage layer and Neon PostgreSQL, returning JSON responses to the client, with React Query managing state.

### Sports Content Engine Module

The platform now includes a comprehensive content generation engine located in `/content_engine/`:

- **Complete Implementation**: Standalone module generating authentic sports content including game previews, recaps, player news, betting insights, and statistical analysis
- **Real Data Integration**: Uses live sports APIs with graceful fallback mechanisms and error handling
- **Automated Scheduling**: Configurable content generation schedules (daily every 6 hours, weekly on Sundays, player news every 2 hours)
- **API Integration**: RESTful endpoints at `/api/content-engine/*` for external interaction
- **Production Ready**: Full TypeScript implementation with comprehensive error handling, logging, and monitoring
- **Output Management**: Structured markdown files organized by content type in `/content_engine/output/`
- **CLI Interface**: Command-line tools for manual content generation and schedule management
- **Zero Interference**: Completely isolated from existing codebase with no conflicts or dependencies

### External Dependencies

- **@neondatabase/serverless**: Serverless PostgreSQL driver for database connectivity.
- **drizzle-orm**: TypeScript ORM for database operations.
- **@tanstack/react-query**: For server state management and data synchronization.
- **@radix-ui/***: Headless UI component primitives used with Shadcn/ui.
- **tailwindcss**: Utility-first CSS framework for styling.
- **vite**: Build tool and development server.
- **typescript**: For type safety and tooling.
- **drizzle-kit**: Database migration and introspection tools.
- **Are You Watching This?! Sports API**: External data source for sports statistics and real-time game data.
- **Stripe**: For subscription management and payment processing.
- **react-icons**: For sports and team icon integration.
- **date-fns**: For date manipulation and formatting.