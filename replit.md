# Sharp Shot - Sports Betting Analytics Platform

## Overview

Sharp Shot is a professional sports betting analytics platform designed to help serious bettors find profitable opportunities through data-driven insights. The application provides real-time odds comparison, +EV calculations, line tracking, and community-driven betting strategies called "Views."

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Pattern**: RESTful API with `/api` prefix routing

### Project Structure
- **Monorepo**: Single repository with client, server, and shared code
- **Client**: React application in `/client` directory
- **Server**: Express.js API in `/server` directory  
- **Shared**: Common types and schemas in `/shared` directory

## Key Components

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Migrations**: Database migrations in `/migrations` directory
- **Current Tables**: 
  - Users table with authentication, subscription status, and Stripe integration
  - Payments table for tracking both Stripe and cryptocurrency transactions

### Frontend Components
- **Layout**: Header and Footer components for consistent navigation
- **Pages**: Multiple pages including Home, Product, Pricing, Views, etc.
- **UI Library**: Comprehensive component library based on Shadcn/ui
- **Styling**: Custom CSS variables for brand colors (gold: #BA9A5B, charcoal: #3B3B3D)

### Backend Services
- **Storage**: Abstracted storage interface with in-memory implementation
- **Routes**: Modular route registration system
- **Middleware**: Request logging and error handling
- **Payment Processing**: Stripe integration for subscription management
- **Authentication**: Session-based authentication with bcrypt password hashing
- **Database Integration**: PostgreSQL database with Drizzle ORM for persistent storage

## Data Flow

1. **Client Requests**: Frontend makes API calls to `/api` endpoints
2. **Server Processing**: Express.js routes handle business logic
3. **Data Access**: Storage layer abstracts database operations
4. **Database**: PostgreSQL database hosted on Neon
5. **Response**: JSON responses returned to client
6. **State Management**: React Query handles caching and synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: TypeScript ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety and tooling
- **drizzle-kit**: Database migration and introspection tools

## Deployment Strategy

### Development
- **Vite Dev Server**: Hot module replacement for frontend
- **Express Server**: Development server with request logging
- **Database**: Connected to Neon PostgreSQL instance

### Production
- **Build Process**: 
  - Frontend: Vite builds static assets to `dist/public`
  - Backend: esbuild bundles server code to `dist/index.js`
- **Serving**: Express serves both API routes and static frontend files
- **Database**: Production PostgreSQL database via Neon

### Environment Configuration
- **DATABASE_URL**: Required environment variable for database connection
- **NODE_ENV**: Controls development vs production behavior

## User Preferences

Preferred communication style: Simple, everyday language.

## Authentication System

### User Management
- **Registration**: Secure user registration with email validation and password hashing
- **Login**: Session-based login with bcrypt password verification
- **Session Management**: PostgreSQL-backed session storage with 7-day expiration
- **Password Security**: 12-round bcrypt hashing for secure password storage
- **Account Management**: User profile, subscription status, and payment history viewing

### Database Security
- **Session Storage**: Sessions stored in PostgreSQL for scalability and persistence
- **Password Hashing**: Industry-standard bcrypt with salt rounds for security
- **Data Validation**: Server-side validation for all user inputs
- **Authentication Middleware**: Protected routes require valid session authentication

## Sports Data Integration

### External API Integration
- **Data Source**: Are You Watching This?! Sports API (sharpshot.api.areyouwatchingthis.com)
- **API Key**: Integrated with team member's API key (expires Jul 31, 2025)
- **Supported Sports**: MLB, NFL, NBA, NHL, NCAA Basketball/Football, WNBA, CFL, and more
- **Data Types**: Games, live events, video highlights, headlines, and odds

### Sports Data Features
- **Live Games**: Real-time game scores, status, and excitement ratings
- **Event Tracking**: Play-by-play updates and significant game events
- **Video Highlights**: Official league and network video content
- **Headlines**: High-rated upcoming and recently finished games
- **Multi-Sport Support**: Filter and view data across all major sports leagues

### API Endpoints
- `/api/sports/games/today` - Today's games with optional sport filtering
- `/api/sports/games/range` - Games by date range
- `/api/sports/games/:gameId` - Specific game details
- `/api/sports/events/recent` - Recent live events across all sports
- `/api/sports/highlights/recent` - Latest video highlights
- `/api/sports/headlines/future` - Upcoming headline games

## New Functional Features (July 07, 2025)

### Gamified Achievement System
- **Achievement Tracking**: Comprehensive achievement system with categories (Getting Started, Performance, Social, Volume)
- **Real-time Notifications**: Animated achievement unlock notifications with point rewards
- **Progress Monitoring**: Track progress toward goals like win streaks, total bets, profit milestones
- **Leaderboard Competition**: Global rankings by achievement points, profit, win rate, and streaks
- **User Statistics**: Detailed stats tracking with levels, experience points, and achievement scores
- **Demo Integration**: Functional achievement system integrated into Dashboard with demo triggers

### Comprehensive Betting Analytics Platform
- **Calculator Page**: Live odds comparison across multiple sportsbooks with real EV calculations
- **View Builder**: Advanced filter system for creating custom betting strategies with automated execution
- **Dashboard**: Personal betting performance tracking with stats, recent bets, and active views
- **Sports Integration**: Real-time sports data integration with game scores, events, and betting opportunities
- **Community Views**: Functional view sharing, forking, and following system for strategy collaboration

### Quality Improvements & User Experience
- **Professional Authentication**: Profile dropdown with avatar, subscription status, and smooth logout
- **Functional Navigation**: All CTA buttons now lead to working features instead of placeholder content
- **Mobile Responsiveness**: Complete mobile optimization for all new pages and features
- **Test Mode**: Full functionality available without payment barriers for development and testing
- **Real-time Updates**: Live data feeds and auto-refresh capabilities across all betting tools

### Technical Architecture Updates
- **New Pages**: Calculator, ViewBuilder, Dashboard, Achievements, Leaderboard with complete functionality
- **Enhanced Routing**: All main navigation CTAs lead to functional features
- **Demo Data Integration**: Realistic testing data for all betting scenarios and user flows
- **State Management**: Comprehensive data handling for user preferences, views, betting history, and achievements
- **Database Schema**: Extended with achievements, user_achievements, and user_stats tables for gamification

## Changelog

- July 16, 2025. **STRIPE PAYMENT INTEGRATION COMPLETE**: Successfully implemented full Stripe subscription system including:
  • **Product Configuration**: Created Basic ($29.99/month, $399.99/year) and Pro ($99.99/month, $999.99/year) subscription tiers in Stripe dashboard
  • **Price ID Integration**: Connected exact Stripe Price IDs (price_1RlUYu2YbjXvbwuVIiqqqKTX, price_1RlUch2YbjXvbwuVMLyoyzBS, price_1RlUdM2YbjXvbwuVWzG81oEC, price_1RlUgq2YbjXvbwuV56HRksli) to backend subscription creation
  • **Subscription Testing**: Verified subscription creation with real Stripe API calls for both Basic and Pro plans
  • **Webhook Handler**: Enhanced webhook endpoint to properly handle payment_intent.succeeded, customer.subscription.updated, invoice.payment_succeeded, and invoice.payment_failed events
  • **Payment Processing**: Complete integration with Stripe Elements for secure credit card processing alongside existing crypto payment options
  • **Database Integration**: User subscription status updates via webhook notifications for seamless payment flow
- July 11, 2025. **COMPLETE ACCESSIBILITY AUDIT IMPLEMENTED**: Successfully executed comprehensive sitewide white text contrast audit and fixes including:
  • **Systematic White Text Elimination**: Replaced all text-white instances with proper contrast colors (#B0B0B0, #3B3B3D, #343434)
  • **CSS Variable Optimization**: Updated --primary-foreground and --accent-foreground from white to charcoal for system-wide contrast
  • **Component-Level Fixes**: Fixed white text across 40+ components including Header, Footer, all page CTAs, and UI elements
  • **Gold Button Text Fix**: Changed all bg-gold text-white to bg-gold text-charcoal across entire platform for 4.5:1+ contrast ratio
  • **WCAG 2.1 AA Compliance**: Achieved minimum 4.5:1 contrast ratio standards across all text elements platform-wide
- July 11, 2025. **FINAL UI/UX Polish Complete**: Successfully implemented all critical user interface improvements including:
  • **Hero Text Visibility**: Fixed white-on-white text visibility issues across platform with proper charcoal/gray contrast  
  • **Smooth Scroll Navigation**: Activated "Try Calculator" button with smooth scroll behavior to #terminal section
  • **Terminal Header Tooltips**: Added comprehensive tooltips to Calculator odds comparison headers (+EV, CLV, Books) with clear explanations
  • **Professional Table Layout**: Enhanced terminal odds display with proper grid layout and tooltip interactions
  • **Sitewide Contrast Standards**: Applied consistent text contrast throughout platform for optimal accessibility
- July 11, 2025. **FINAL UI/UX Implementation Complete**: Successfully implemented the complete advanced implementation guide including:
  • **Advanced Calculator Filtering System**: Added comprehensive 10-filter system with League, Bet Type, Prop Type, Market Side (radio), Minimum EV % (slider), Minimum Data Points, Start Time Window, Source Books, Book Priority Weighting (slider), and Live Markets toggle
  • **Sitewide Contrast Resolution**: Fixed all white-on-white text issues across Home page pricing sections, Pricing page feature lists, and other components for optimal accessibility 
  • **Technical Tooltips Complete**: Added tooltips for all betting terms (+EV, CLV, Books, Props, Totals, Spreads, Demo Mode) with descriptive explanations
  • **Scroll Fade-in Animations**: Implemented CSS keyframe animations with staggered delays for feature cards and pricing sections
  • **Professional UI Components**: Created missing Slider component for advanced filtering functionality
  • **Text Contrast Standards**: Applied consistent charcoal/gray text (#3B3B3D, #343434) throughout platform replacing all low-contrast instances
- July 11, 2025. **Comprehensive Frontend Implementation**: Successfully implemented all critical UI/UX improvements from detailed audit including:
  • Fixed hero section white text visibility with proper contrast (charcoal/gray text)
  • Removed redundant third line of hero copy for cleaner messaging
  • Implemented live sports ticker hide/reveal behavior (hover to show, hidden by default)
  • Added comprehensive tooltips for betting terms (+EV, CLV, Books, Props, etc.)
  • Enhanced all CTA buttons with gradient backgrounds, scale hover effects, and hover-lift animations
  • Fixed duplicate key React warnings in Calculator component
  • Improved mobile responsiveness with horizontal scrolling and better touch targets
  • Added professional loading messages replacing console logs
  • Enhanced Demo Mode visibility and user guidance
  • Applied consistent visual polish across all interactive elements
- July 10, 2025. **Stripe Integration Complete**: Fixed Stripe API structure issues and implemented working subscription system with Basic ($39.99/month) and Pro ($99.99/month) tiers
- July 10, 2025. **Payment Processing**: Added comprehensive Stripe subscription creation, webhook handling, and crypto payment options with 7 USDC networks
- July 08, 2025. **Sports Data Integration Complete**: Fixed API data structure parsing to successfully display real sports data in ticker and Sports page (16 games, 100 events)
- July 08, 2025. **Bug Fixes**: Resolved undefined progress field errors and enhanced data handling for authentic sports information display
- July 07, 2025. **Major UI/UX Improvements**: Converted game times to 12-hour format across all displays for better readability
- July 07, 2025. **Dark Mode Enhancement**: Updated dark mode to use green accents instead of gold, with pure black backgrounds for better contrast
- July 07, 2025. **Sports Icons Integration**: Added comprehensive sports and team icon library with react-icons integration for visual enhancement
- July 07, 2025. **Functional Bet Routing**: Implemented direct bet placement routing to external sportsbooks (DraftKings, FanDuel, BetMGM, etc.) with real URL targeting
- July 07, 2025. **Payment System Fixes**: Updated subscription system to use proper Stripe endpoints and improved error handling for payment processing
- July 07, 2025. **Sports Ticker Enhancement**: Updated live ticker with sport icons and improved animation timing (20s cycle) for optimal user experience
- July 07, 2025. **Dependency Updates**: Updated react-icons and date-fns packages for improved functionality and performance
- July 07, 2025. **Project Optimization**: Comprehensive code cleanup, improved type safety, and enhanced overall project efficiency
- July 07, 2025. Added live sports ticker bar with Coinbase-style design (black background, green pixelated text) showing real-time games and scores
- July 07, 2025. Integrated Press Start 2P font for retro digital display effect in sports ticker
- July 07, 2025. Implemented real-time sports data feed with 30-second refresh for live games and events
- July 07, 2025. Moved dark mode toggle to Account page settings section as user-requested (removed from navigation dropdown)
- July 07, 2025. Enhanced USDC payment integration with 7 networks (Ethereum, Polygon, Solana, Tron, Optimism, Base, Arbitrum) including network fees display
- July 07, 2025. Expanded sportsbook integration from 5 to 15+ major providers including DraftKings, FanDuel, BetMGM, Caesars, PointsBet, Unibet, William Hill, Bovada, and others
- July 07, 2025. Implemented comprehensive sports coverage with 25+ sports including F1, soccer, hockey, tennis, MMA, golf, baseball, basketball, cricket, and more
- July 07, 2025. Added complete dark mode functionality with ThemeContext, CSS variables, and toggle switch now properly positioned in Account settings
- July 07, 2025. Cleaned up navigation bar structure and added demo mode toggle in the header navigation
- July 07, 2025. Updated Calculator page with expanded sports filters and enhanced sportsbook integration display
- July 07, 2025. Implemented comprehensive gamified achievement system for user engagement
- July 05, 2025. Added Calculator, View Builder, and Dashboard pages with full functionality
- July 05, 2025. Made all navigation and CTA buttons functional with proper routing
- July 05, 2025. Enhanced authentication system with professional profile management
- July 05, 2025. Integrated live sports data API with real-time games, events, and betting insights
- July 05, 2025. Added comprehensive payment processing with Stripe and cryptocurrency support
- July 05, 2025. Implemented session-based authentication with PostgreSQL database integration
- July 03, 2025. Initial setup