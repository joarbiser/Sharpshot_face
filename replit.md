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

## Changelog

Changelog:
- July 05, 2025. Integrated live sports data API with real-time games, events, and betting insights
- July 05, 2025. Added comprehensive payment processing with Stripe and cryptocurrency support
- July 05, 2025. Implemented session-based authentication with PostgreSQL database integration
- July 03, 2025. Initial setup