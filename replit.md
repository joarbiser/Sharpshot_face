# Sharp Shot - Sports Betting Analytics Platform

### Overview
Sharp Shot is a professional sports betting analytics platform designed to help serious bettors find profitable opportunities through data-driven insights. It provides real-time odds comparison, expected value (+EV) calculations, line tracking, and community-driven betting strategies. The platform aims to be a comprehensive tool for serious bettors, offering a data-driven approach to identify profitable opportunities in the sports betting market.

### Recent Changes (August 2025)
- **Navigation Restructure**: Added About page to Resources dropdown with new order: Memberships, About, FAQ, Tutorials, Glossary, Support
- **About Page Enhancement**: Complete redesign with sophisticated glassmorphism layout, full-width responsiveness, and perfect text alignment across two-column sections
- **Simplified Site Structure**: Streamlined site architecture to focus on core functionality and user support resources
- **Resource Page Consistency**: Applied unified styling across all resource pages (Contact, Learn, FAQ, Login) matching the memberships page design with gradient backgrounds, glassmorphism cards, and Sharp Shot gold accents for cohesive brand experience
- **Landing Page Box Theme**: Applied consistent glassmorphism card design across entire homepage, matching About page styling with rounded borders, subtle backgrounds, hover effects, and color-coded section badges
- **CTA Routing Update**: Updated "Access Trading Terminal" button to route to pricing page for non-signed-in users, improving conversion funnel
- **Scroll Animation Fix**: Implemented purely vertical scroll animations, removing horizontal staggered timing for better UX consistency
- **Dramatic Typography Pattern**: Applied experimental "wrong" hierarchy styling site-wide where category labels/tags become the main dramatic headers with italic, skewed Saira Condensed styling, while traditional headings become supporting subtext - user's preferred approach over conventional typography hierarchy

### User Preferences
Preferred communication style: Simple, everyday language.
**UI/UX Preferences**:
- Minimal, techy design aesthetic over chunky/bold elements
- Transparent surfaces with subtle hover effects rather than bold background changes
- Text-only buttons without icons for clean appearance
- Professional copy that avoids overstating user base size
- **Typography Preference**: "Wrong" hierarchy with dramatic italic, skewed styling - small tags/categories become the main bold headers with Saira Condensed italic, skewed styling, while traditional headings become smaller subtext

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
    - **Navigation**: Professional sticky header with dropdown menus and integrated theme toggle. Modernized 3-column layout (left: terminals, center: logo, right: auth/resources).
    - **Typography & Layout**: Large, bold headlines, clean button designs with hover animations, and responsive color schemes. Standardized font sizing: 16pt minimum for desktop (`text-base`), 14pt for mobile (`text-sm`).
    - **Interactive Elements**: Hover effects with scale transformations and smooth transitions. Modern outlined CTA buttons with fill animations ("Unlock Free Access").
    - Comprehensive component library based on Shadcn/ui.
    - Mobile responsiveness for all pages and features.
    - Professional authentication with profile dropdown and avatar.
    - Smooth scroll navigation and animated achievement notifications.
    - Consistent text contrast for accessibility (WCAG 2.1 AA compliant).
    - Use of Press Start 2P font for retro digital display effects in the sports ticker.
    - Comprehensive gold branding system (#D8AC35) applied consistently throughout the UI.
    - **Minimal Chip Button System**: Replaced chunky hero CTAs with sleek "command chip" components featuring transparent surfaces, pill shapes, and subtle micro-interactions. Primary variant uses Sharp Shot gold with icon slide animations removed per user preference.
    - **Modern Footer Design**: Transformed footer from heavy gray block to system UI interface panel matching header aesthetic. Features minimal separator line, terminal icons, command-line tagline, uppercase section labels with tracking-widest, and ghost button styling for seamless top-to-bottom design consistency.

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