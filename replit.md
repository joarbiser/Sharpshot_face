# Sharp Shot - Sports Betting Analytics Platform

### Overview
Sharp Shot is a professional sports betting analytics platform designed to help serious bettors find profitable opportunities through data-driven insights. It provides real-time odds comparison, expected value (+EV) calculations, line tracking, and community-driven betting strategies. The platform aims to be a comprehensive tool for serious bettors, offering a data-driven approach to identify profitable opportunities in the sports betting market.

### User Preferences
Preferred communication style: Simple, everyday language.

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
    - **Homepage Design**: Revamped homepage with high-end sports betting app aesthetic.
    - **Navigation**: Professional sticky header with dropdown menus and integrated theme toggle.
    - **Typography & Layout**: Large, bold headlines, clean button designs with hover animations, and responsive color schemes.
    - **Interactive Elements**: Hover effects with scale transformations and smooth transitions.
    - Comprehensive component library based on Shadcn/ui.
    - Mobile responsiveness for all pages and features.
    - Professional authentication with profile dropdown and avatar.
    - Smooth scroll navigation and animated achievement notifications.
    - Consistent text contrast for accessibility (WCAG 2.1 AA compliant).
    - Use of Press Start 2P font for retro digital display effects in the sports ticker.
    - Comprehensive gold branding system (#D8AC35) applied consistently throughout the UI.

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
- **Database Layer**: Drizzle ORM for type-safe operations and schema definitions (Users, Payments, Password Reset Tokens).
- **Authentication System**: Session-based authentication with bcrypt hashing, email validation, and PostgreSQL-backed session storage.
- **Sports Data Integration**: Real-time sports data integration.
- **Payment Processing**: Integrated with Stripe for subscriptions and supports cryptocurrency payments.
- **Team Logo Service**: Multi-API integration for comprehensive team logo coverage with caching and proxy.
- **Betting Analytics Platform**:
    - **Trading Terminal** (`/trading-terminal`): Real-time betting opportunity feed with four categories (All, +EV, Arbitrage, Middling). Features market filters, EV thresholds, sportsbook selection, and team logo integration. Includes comprehensive devigging system for fair probability calculation.
    - **Preset Terminal** (`/preset-terminal`): Advanced strategy builder with book weighting, preset sharing, and performance tracking.
    - **Advanced Analytics**: Implied probability, arbitrage stake calculations, middling detection, and comprehensive bet categorization based on Sharp Shot's methodology.
    - **Opportunity Engine**: Processes live betting opportunities with guardrails and priority-based sorting (EV > Arbitrage > Middling).
    - **Mathematical Framework**: Pure TypeScript library (`src/lib/tradingMath.ts`) for odds conversion, no-vig fair probability calculations, EV detection, arbitrage, middling analysis, and risk management (Kelly criterion).
    - **Data Integrity**: Comprehensive launch validation system with 7-day demo enforcement and 30-second data freshness requirements. Zero-tolerance status labeling system for event status.
    - **Deduplication**: Dual-layer duplicate sportsbook elimination (server and client-side).

- **Navigation Architecture**: Simplified header navigation with two main tabs (Trading Terminal, Preset Terminal).
- **Data Flow**: Client requests to `/api` endpoints, processed by Express.js routes, accessing data via storage layer and Neon PostgreSQL, returning JSON responses to the client, with React Query managing state.

#### Sports Content Engine Module
- **Purpose**: Generates authentic sports content (previews, recaps, news, insights, analysis).
- **Implementation**: Standalone module in `/content_engine/` with RESTful API endpoints.
- **Features**: Real data integration, automated scheduling, production-ready TypeScript, and structured markdown output.
- **Isolation**: Completely isolated from existing codebase.

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