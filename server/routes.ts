import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import bcrypt from "bcrypt";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import { insertPaymentSchema } from "@shared/schema";
import { sportsDataService } from "./sportsDataService";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_...", {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: 7 * 24 * 60 * 60, // 7 days in seconds
  });

  app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'sharp-shot-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    },
  }));

  // Authentication middleware with demo mode support
  const requireAuth = (req: any, res: any, next: any) => {
    // Allow demo mode - check for demo flag in query params or headers
    const isDemoMode = req.query.demo === 'true' || req.headers['x-demo-mode'] === 'true';
    
    if (!req.session.userId && !isDemoMode) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    // Set demo user context if in demo mode
    if (isDemoMode && !req.session.userId) {
      req.demoMode = true;
      req.userId = 'demo-user-1';
    } else {
      req.userId = req.session.userId;
    }
    
    next();
  };

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Validate password strength
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = await storage.createUser({ 
        username, 
        email, 
        password: hashedPassword 
      });
      
      res.status(201).json({ 
        message: "User created successfully", 
        user: { id: user.id, username: user.username, email: user.email } 
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req: any, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Set session
      req.session.userId = user.id;
      req.session.username = user.username;

      res.json({ 
        message: "Login successful", 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionPlan: user.subscriptionPlan 
        } 
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/auth/logout", (req: any, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ error: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req: any, res) => {
    try {
      if (req.demoMode) {
        // Return demo user data with active subscription
        const demoUser = {
          id: 'demo-user-1',
          username: 'Demo User',
          email: 'demo@sharpshot.com',
          subscriptionStatus: 'active',
          subscriptionPlan: 'professional',
          subscriptionPeriod: 'monthly',
          subscriptionEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          createdAt: new Date().toISOString(),
          stripeCustomerId: null,
          stripeSubscriptionId: null
        };
        return res.json({ user: demoUser });
      }
      
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionPlan: user.subscriptionPlan,
          subscriptionPeriod: user.subscriptionPeriod,
          subscriptionEndsAt: user.subscriptionEndsAt
        } 
      });
    } catch (error: any) {
      console.error('Get user error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Stripe subscription routes
  app.post("/api/get-or-create-subscription", requireAuth, async (req: any, res) => {
    try {
      const { planType, period } = req.body;
      const userId = req.session.userId;
      
      if (!userId || !planType || !period) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create or retrieve Stripe customer
      let stripeCustomerId = user.stripeCustomerId;
      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email || user.username + "@example.com",
          name: user.username,
        });
        stripeCustomerId = customer.id;
        await storage.updateStripeCustomerId(userId, stripeCustomerId);
      }

      // Define Stripe Price IDs for each plan and period
      const priceIds = {
        basic: { 
          monthly: process.env.STRIPE_BASIC_MONTHLY_PRICE_ID || 'price_1RlUYu2YbjXvbwuVIiqqqKTX', // Basic Monthly $29.99
          annual: process.env.STRIPE_BASIC_ANNUAL_PRICE_ID || 'price_1RlUch2YbjXvbwuVMLyoyzBS'    // Basic Annual $399.99
        },
        pro: { 
          monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || 'price_1RlUdM2YbjXvbwuVWzG81oEC',    // Pro Monthly $99.99
          annual: process.env.STRIPE_PRO_ANNUAL_PRICE_ID || 'price_1RlUgq2YbjXvbwuV56HRksli'       // Pro Annual $999.99
        }
      };

      const planPrices = priceIds[planType as keyof typeof priceIds];
      if (!planPrices) {
        return res.status(400).json({ error: "Invalid plan type" });
      }

      const priceId = planPrices[period as keyof typeof planPrices];
      if (!priceId) {
        return res.status(400).json({ error: "Invalid billing period" });
      }

      // Create subscription using the Price ID from your Stripe dashboard
      const subscription = await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{
          price: priceId,
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          userId: userId.toString(),
          planType,
          period,
        },
      });

      // Update user with subscription info
      await storage.updateUserStripeInfo(userId, stripeCustomerId, subscription.id);
      await storage.updateUser(userId, {
        subscriptionPlan: planType,
        subscriptionPeriod: period,
        subscriptionStatus: 'pending',
      });

      // Calculate amount for payment record
      const priceAmounts = {
        basic: { monthly: 2999, annual: 39999 },
        pro: { monthly: 9999, annual: 99999 }
      };
      const amount = priceAmounts[planType as keyof typeof priceAmounts][period as keyof typeof priceAmounts[keyof typeof priceAmounts]];

      // Create payment record
      await storage.createPayment({
        userId,
        stripePaymentId: subscription.latest_invoice?.payment_intent?.id,
        cryptoPaymentId: null,
        paymentMethod: 'stripe',
        amount: (amount / 100).toString(),
        currency: 'usd',
        status: 'pending',
      });

      res.json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
      });
    } catch (error: any) {
      console.error('Subscription creation error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Stripe webhook handler
  app.post('/api/webhooks/stripe', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET || '');
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Payment succeeded:', paymentIntent.id);
        
        // Update payment status in database
        try {
          // Find payment by stripe payment ID and update status
          const payments = await storage.getPaymentsByUserId(0); // This needs to be improved
          // For now, just log the success
          console.log('Payment intent succeeded, should update payment status');
        } catch (error) {
          console.error('Error updating payment status:', error);
        }
        break;
        
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        console.log('Subscription updated:', subscription.id, 'Status:', subscription.status);
        
        // Update user subscription status
        try {
          const userId = subscription.metadata?.userId;
          if (userId) {
            await storage.updateUser(parseInt(userId), {
              subscriptionStatus: subscription.status === 'active' ? 'active' : 'pending'
            });
            console.log('Updated user subscription status for user:', userId);
          }
        } catch (error) {
          console.error('Error updating subscription status:', error);
        }
        break;
        
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('Invoice payment succeeded:', invoice.id);
        
        // Activate subscription
        try {
          const subscriptionId = invoice.subscription;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const userId = subscription.metadata?.userId;
          
          if (userId) {
            await storage.updateUser(parseInt(userId), {
              subscriptionStatus: 'active'
            });
            console.log('Activated subscription for user:', userId);
          }
        } catch (error) {
          console.error('Error activating subscription:', error);
        }
        break;
        
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        console.log('Invoice payment failed:', failedInvoice.id);
        
        // Update subscription status to failed
        try {
          const subscriptionId = failedInvoice.subscription;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const userId = subscription.metadata?.userId;
          
          if (userId) {
            await storage.updateUser(parseInt(userId), {
              subscriptionStatus: 'failed'
            });
            console.log('Set subscription to failed for user:', userId);
          }
        } catch (error) {
          console.error('Error updating failed subscription:', error);
        }
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  });

  // Cryptocurrency payment routes
  app.post("/api/create-crypto-payment", requireAuth, async (req: any, res) => {
    try {
      const { planType, period, cryptoAddress, cryptoAmount, cryptoCurrency } = req.body;
      const userId = req.session.userId;
      
      if (!userId || !planType || !period || !cryptoAddress || !cryptoAmount || !cryptoCurrency) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create payment record for crypto
      const payment = await storage.createPayment({
        userId,
        stripePaymentId: null,
        cryptoPaymentId: `crypto_${Date.now()}`,
        paymentMethod: 'crypto',
        amount: cryptoAmount,
        currency: cryptoCurrency,
        status: 'pending',
      });

      // Update user subscription info
      await storage.updateUser(userId, {
        subscriptionPlan: planType,
        subscriptionPeriod: period,
        subscriptionStatus: 'pending',
      });

      res.json({
        paymentId: payment.id,
        cryptoPaymentId: payment.cryptoPaymentId,
        status: 'pending',
        message: 'Please send the specified amount to the provided address',
      });
    } catch (error: any) {
      console.error('Crypto payment creation error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get user subscription status
  app.get("/api/user/subscription", requireAuth, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        subscriptionStatus: user.subscriptionStatus,
        subscriptionPlan: user.subscriptionPlan,
        subscriptionPeriod: user.subscriptionPeriod,
        subscriptionEndsAt: user.subscriptionEndsAt,
      });
    } catch (error: any) {
      console.error('Get subscription error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get user payment history
  app.get("/api/user/payments", requireAuth, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const payments = await storage.getPaymentsByUserId(userId);
      
      res.json(payments);
    } catch (error: any) {
      console.error('Get payments error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Sports Data API Routes
  
  // Get today's games
  app.get("/api/sports/games/today", async (req, res) => {
    try {
      const { sport } = req.query;
      const games = await sportsDataService.getTodaysGames(sport as string);
      console.log('Today\'s games response:', games ? games.length : 0, 'games');
      res.json({ games: games || [] });
    } catch (error: any) {
      console.error('Error fetching today\'s games:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get games by date range
  app.get("/api/sports/games/range", async (req, res) => {
    try {
      const { startDate, endDate, sport } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: "Start date and end date are required" });
      }
      
      const games = await sportsDataService.getGamesByDateRange(
        startDate as string,
        endDate as string,
        sport as string
      );
      res.json({ games });
    } catch (error: any) {
      console.error('Error fetching games by date range:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get specific game by ID
  app.get("/api/sports/games/:gameId", async (req, res) => {
    try {
      const { gameId } = req.params;
      const game = await sportsDataService.getGameById(gameId);
      
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
      
      res.json({ game });
    } catch (error: any) {
      console.error('Error fetching game:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get team games
  app.get("/api/sports/teams/:teamId/games", async (req, res) => {
    try {
      const { teamId } = req.params;
      const { startDate, endDate } = req.query;
      
      const games = await sportsDataService.getTeamGames(
        teamId,
        startDate as string,
        endDate as string
      );
      res.json({ games });
    } catch (error: any) {
      console.error('Error fetching team games:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get live events for a game
  app.get("/api/sports/games/:gameId/events", async (req, res) => {
    try {
      const { gameId } = req.params;
      const events = await sportsDataService.getGameEvents(gameId);
      res.json({ events });
    } catch (error: any) {
      console.error('Error fetching game events:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get recent events across all sports
  app.get("/api/sports/events/recent", async (req, res) => {
    try {
      const { count = 100 } = req.query;
      const events = await sportsDataService.getRecentEvents(Number(count));
      console.log('Recent events response:', events ? events.length : 0, 'events');
      res.json({ events: events || [] });
    } catch (error: any) {
      console.error('Error fetching recent events:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get game highlights
  app.get("/api/sports/games/:gameId/highlights", async (req, res) => {
    try {
      const { gameId } = req.params;
      const highlights = await sportsDataService.getGameHighlights(gameId);
      res.json({ highlights });
    } catch (error: any) {
      console.error('Error fetching game highlights:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get team highlights
  app.get("/api/sports/teams/:teamId/highlights", async (req, res) => {
    try {
      const { teamId } = req.params;
      const highlights = await sportsDataService.getTeamHighlights(teamId);
      res.json({ highlights });
    } catch (error: any) {
      console.error('Error fetching team highlights:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get recent highlights by sport
  app.get("/api/sports/highlights/recent", async (req, res) => {
    try {
      const { sport } = req.query;
      const highlights = await sportsDataService.getRecentHighlights(sport as string);
      res.json({ highlights });
    } catch (error: any) {
      console.error('Error fetching recent highlights:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get future headline games
  app.get("/api/sports/headlines/future", async (req, res) => {
    try {
      const { sport } = req.query;
      const headlines = await sportsDataService.getFutureHeadlines(sport as string);
      res.json({ headlines });
    } catch (error: any) {
      console.error('Error fetching future headlines:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get past headline games
  app.get("/api/sports/headlines/past", async (req, res) => {
    try {
      const { sport } = req.query;
      const headlines = await sportsDataService.getPastHeadlines(sport as string);
      res.json({ headlines });
    } catch (error: any) {
      console.error('Error fetching past headlines:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get game odds (if available)
  app.get("/api/sports/games/:gameId/odds", async (req, res) => {
    try {
      const { gameId } = req.params;
      const odds = await sportsDataService.getGameOdds(gameId);
      res.json({ odds });
    } catch (error: any) {
      console.error('Error fetching game odds:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get supported sports
  app.get("/api/sports/supported", async (req, res) => {
    try {
      const sports = await sportsDataService.getSupportedSports();
      res.json({ sports });
    } catch (error: any) {
      console.error('Error fetching supported sports:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Demo Betting Odds and Opportunities API
  app.get("/api/demo/betting-opportunities", async (req, res) => {
    try {
      const opportunities = [
        {
          id: "opp-1",
          sport: "NBA",
          game: "Lakers vs Warriors",
          market: "Player Props",
          betType: "Points",
          line: "LeBron James Over 25.5 Points",
          bestOdds: -110,
          ev: 8.7,
          maxBet: 500,
          sportsbook: "DraftKings",
          gameTime: "2025-01-08T03:00:00Z",
          confidence: "High",
          odds: [
            { sportsbook: "DraftKings", odds: -110, ev: 8.7, maxBet: 500 },
            { sportsbook: "FanDuel", odds: -115, ev: 6.2, maxBet: 300 },
            { sportsbook: "BetMGM", odds: -108, ev: 9.1, maxBet: 400 },
            { sportsbook: "Caesars", odds: -112, ev: 7.8, maxBet: 350 },
            { sportsbook: "PointsBet", odds: -118, ev: 5.1, maxBet: 250 },
            { sportsbook: "Barstool", odds: -113, ev: 7.2, maxBet: 300 },
            { sportsbook: "WynnBET", odds: -116, ev: 6.0, maxBet: 275 },
            { sportsbook: "Unibet", odds: -109, ev: 8.9, maxBet: 450 },
            { sportsbook: "BetRivers", odds: -114, ev: 6.8, maxBet: 325 },
            { sportsbook: "SuperDraft", odds: -120, ev: 4.2, maxBet: 200 },
            { sportsbook: "PrizePicks", odds: -111, ev: 8.1, maxBet: 350 },
            { sportsbook: "Underdog", odds: -107, ev: 9.5, maxBet: 400 },
            { sportsbook: "Bet365", odds: -115, ev: 6.5, maxBet: 500 },
            { sportsbook: "William Hill", odds: -117, ev: 5.8, maxBet: 300 },
            { sportsbook: "Betway", odds: -113, ev: 7.4, maxBet: 375 },
            { sportsbook: "Hard Rock", odds: -119, ev: 4.8, maxBet: 225 },
            { sportsbook: "ESPN BET", odds: -114, ev: 6.9, maxBet: 400 },
            { sportsbook: "Fliff", odds: -121, ev: 3.9, maxBet: 150 }
          ]
        },
        {
          id: "opp-2",
          sport: "NFL",
          game: "Chiefs vs Bills",
          market: "Game Props",
          betType: "Total",
          line: "Under 48.5 Points",
          bestOdds: +105,
          ev: 12.4,
          maxBet: 750,
          sportsbook: "BetMGM",
          gameTime: "2025-01-08T01:00:00Z",
          confidence: "Very High",
          odds: [
            { sportsbook: "BetMGM", odds: +105, ev: 12.4, maxBet: 750 },
            { sportsbook: "DraftKings", odds: +102, ev: 11.1, maxBet: 600 },
            { sportsbook: "FanDuel", odds: +100, ev: 9.8, maxBet: 500 },
            { sportsbook: "Caesars", odds: +98, ev: 8.9, maxBet: 450 },
            { sportsbook: "PointsBet", odds: +107, ev: 13.2, maxBet: 800 },
            { sportsbook: "Barstool", odds: +101, ev: 10.5, maxBet: 525 },
            { sportsbook: "WynnBET", odds: +99, ev: 9.2, maxBet: 475 },
            { sportsbook: "Unibet", odds: +106, ev: 12.8, maxBet: 700 },
            { sportsbook: "BetRivers", odds: +103, ev: 11.7, maxBet: 650 },
            { sportsbook: "SuperDraft", odds: +95, ev: 7.8, maxBet: 300 },
            { sportsbook: "PrizePicks", odds: +104, ev: 12.1, maxBet: 600 },
            { sportsbook: "Underdog", odds: +108, ev: 14.0, maxBet: 850 },
            { sportsbook: "Bet365", odds: +100, ev: 9.8, maxBet: 550 },
            { sportsbook: "William Hill", odds: +97, ev: 8.5, maxBet: 425 },
            { sportsbook: "Betway", odds: +102, ev: 11.3, maxBet: 575 },
            { sportsbook: "Hard Rock", odds: +96, ev: 8.1, maxBet: 350 },
            { sportsbook: "ESPN BET", odds: +103, ev: 11.8, maxBet: 625 },
            { sportsbook: "Fliff", odds: +93, ev: 6.9, maxBet: 250 },
            { sportsbook: "PointsBet", odds: +108, ev: 13.2, maxBet: 400 }
          ]
        },
        {
          id: "opp-3",
          sport: "NHL",
          game: "Bruins vs Rangers",
          market: "Moneyline",
          betType: "Game Winner",
          line: "Boston Bruins ML",
          bestOdds: +145,
          ev: 15.3,
          maxBet: 300,
          sportsbook: "FanDuel",
          gameTime: "2025-01-08T02:00:00Z",
          confidence: "High",
          odds: [
            { sportsbook: "FanDuel", odds: +145, ev: 15.3, maxBet: 300 },
            { sportsbook: "DraftKings", odds: +142, ev: 14.1, maxBet: 250 },
            { sportsbook: "BetMGM", odds: +140, ev: 13.5, maxBet: 400 },
            { sportsbook: "Caesars", odds: +138, ev: 12.8, maxBet: 350 }
          ]
        },
        {
          id: "opp-4",
          sport: "NBA",
          game: "Celtics vs Heat",
          market: "Player Props",
          betType: "Assists",
          line: "Jayson Tatum Over 6.5 Assists",
          bestOdds: +120,
          ev: 18.6,
          maxBet: 400,
          sportsbook: "PointsBet",
          gameTime: "2025-01-08T04:30:00Z",
          confidence: "Very High",
          odds: [
            { sportsbook: "PointsBet", odds: +120, ev: 18.6, maxBet: 400 },
            { sportsbook: "DraftKings", odds: +115, ev: 16.4, maxBet: 300 },
            { sportsbook: "FanDuel", odds: +118, ev: 17.5, maxBet: 350 },
            { sportsbook: "BetMGM", odds: +112, ev: 15.2, maxBet: 250 }
          ]
        },
        {
          id: "opp-5",
          sport: "NFL",
          game: "Cowboys vs Packers",
          market: "Spread",
          betType: "Point Spread",
          line: "Dallas Cowboys +3.5",
          bestOdds: -105,
          ev: 6.8,
          maxBet: 600,
          sportsbook: "Caesars",
          gameTime: "2025-01-08T05:00:00Z",
          confidence: "Medium",
          odds: [
            { sportsbook: "Caesars", odds: -105, ev: 6.8, maxBet: 600 },
            { sportsbook: "DraftKings", odds: -108, ev: 5.9, maxBet: 500 },
            { sportsbook: "FanDuel", odds: -110, ev: 4.7, maxBet: 450 },
            { sportsbook: "BetMGM", odds: -107, ev: 6.1, maxBet: 550 }
          ]
        }
      ];

      res.json({ opportunities });
    } catch (error: any) {
      console.error('Error fetching demo betting opportunities:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Demo sportsbook odds comparison
  app.get("/api/demo/sportsbook-odds", async (req, res) => {
    try {
      const { game, market } = req.query;
      
      const oddsData = {
        game: game || "Lakers vs Warriors",
        market: market || "Moneyline",
        odds: [
          {
            sportsbook: "DraftKings",
            lakers: -145,
            warriors: +125,
            over: -110,
            under: -110,
            spread_lakers: -2.5,
            spread_odds_lakers: -110,
            spread_warriors: +2.5,
            spread_odds_warriors: -110,
            lastUpdated: new Date().toISOString()
          },
          {
            sportsbook: "FanDuel",
            lakers: -142,
            warriors: +122,
            over: -108,
            under: -112,
            spread_lakers: -2.5,
            spread_odds_lakers: -108,
            spread_warriors: +2.5,
            spread_odds_warriors: -112,
            lastUpdated: new Date().toISOString()
          },
          {
            sportsbook: "BetMGM",
            lakers: -148,
            warriors: +128,
            over: -112,
            under: -108,
            spread_lakers: -2.5,
            spread_odds_lakers: -112,
            spread_warriors: +2.5,
            spread_odds_warriors: -108,
            lastUpdated: new Date().toISOString()
          },
          {
            sportsbook: "Caesars",
            lakers: -140,
            warriors: +120,
            over: -115,
            under: -105,
            spread_lakers: -2.5,
            spread_odds_lakers: -115,
            spread_warriors: +2.5,
            spread_odds_warriors: -105,
            lastUpdated: new Date().toISOString()
          },
          {
            sportsbook: "PointsBet",
            lakers: -150,
            warriors: +130,
            over: -105,
            under: -115,
            spread_lakers: -2.5,
            spread_odds_lakers: -105,
            spread_warriors: +2.5,
            spread_odds_warriors: -115,
            lastUpdated: new Date().toISOString()
          }
        ]
      };

      res.json(oddsData);
    } catch (error: any) {
      console.error('Error fetching demo sportsbook odds:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Achievement System Routes
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error: any) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ error: "Failed to fetch achievements" });
    }
  });

  app.get("/api/achievements/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userAchievements = await storage.getUserAchievements(userId);
      res.json(userAchievements);
    } catch (error: any) {
      console.error("Error fetching user achievements:", error);
      res.status(500).json({ error: "Failed to fetch user achievements" });
    }
  });

  app.get("/api/stats/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      let stats = await storage.getUserStats(userId);
      
      if (!stats) {
        // Create default stats for user if they don't exist
        stats = await storage.createUserStats({
          userId,
          totalBets: 0,
          totalWins: 0,
          totalEV: "0.00",
          totalProfit: "0.00",
          bestStreak: 0,
          currentStreak: 0,
          viewsCreated: 0,
          viewsShared: 0,
          achievementPoints: 0,
          level: 1,
          experiencePoints: 0,
          lastActiveAt: new Date(),
        });
      }
      
      res.json(stats);
    } catch (error: any) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ error: "Failed to fetch user stats" });
    }
  });

  app.post("/api/achievements/progress", async (req, res) => {
    try {
      const { userId, achievementId, progress } = req.body;
      const userAchievement = await storage.updateAchievementProgress(userId, achievementId, progress);
      res.json(userAchievement);
    } catch (error: any) {
      console.error("Error updating achievement progress:", error);
      res.status(500).json({ error: "Failed to update achievement progress" });
    }
  });

  app.post("/api/achievements/unlock", async (req, res) => {
    try {
      const { userId, achievementId } = req.body;
      const userAchievement = await storage.unlockAchievement(userId, achievementId);
      res.json(userAchievement);
    } catch (error: any) {
      console.error("Error unlocking achievement:", error);
      res.status(500).json({ error: "Failed to unlock achievement" });
    }
  });

  app.get("/api/leaderboard", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const leaderboard = await storage.getAchievementLeaderboard(limit);
      res.json(leaderboard);
    } catch (error: any) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  app.put("/api/stats/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const updates = req.body;
      const stats = await storage.updateUserStats(userId, updates);
      res.json(stats);
    } catch (error: any) {
      console.error("Error updating user stats:", error);
      res.status(500).json({ error: "Failed to update user stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
