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
- **Database Layer**: Drizzle ORM for type-safe operations and schema definitions. Includes tables for Users, Payments, Achievements, User Achievements, and User Stats.
- **Authentication System**: Session-based authentication with bcrypt password hashing, email validation, and PostgreSQL-backed session storage. Includes user registration, login, and account management.
- **Sports Data Integration**: Integration with "Are You Watching This?!" Sports API for real-time sports data across various sports.
- **Payment Processing**: Integrated with Stripe for subscription management (Pro and Unlimited tiers) and supports cryptocurrency payments (USDC across 7 networks).
- **Gamified Achievement System**: Tracks achievements across categories with real-time notifications, point rewards, progress monitoring, and leaderboard.
- **Betting Analytics Platform**: Includes a Calculator page for live odds comparison and EV calculations, a Preset Builder for creating custom betting strategies, a Dashboard for personal performance tracking, and Community Presets for sharing.
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