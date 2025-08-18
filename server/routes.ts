import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import { insertPaymentSchema, insertUserSchema, passwordResetRequestSchema, passwordResetSchema } from "@shared/schema";
import { sportsDataService } from "./sportsDataService";
import { bettingDataService } from "./bettingDataService";
import { OddsDeduplicator } from './oddsDeduplicator';
import { contentEngineRoutes } from "../content_engine/api/routes";
import { emailService } from "./emailService";
import { setupTeamLogoRoutes } from "./teamLogoProxy";
import launchStatusRoutes from './routes/launchStatus';
import enhancedOpportunitiesRoutes from './routes/enhancedOpportunities';


// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_...", {
  apiVersion: "2025-06-30.basil",
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

  // Authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    req.userId = req.session.userId;
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

  // Password reset routes
  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      
      // Validate request body
      const validation = passwordResetRequestSchema.safeParse({ email });
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid email address",
          details: validation.error.errors 
        });
      }

      // Check if user exists
      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Don't reveal if user exists or not for security
        return res.json({ 
          message: "If an account with that email exists, we've sent a password reset link." 
        });
      }

      // Clean up expired tokens
      await storage.deleteExpiredPasswordResetTokens();

      // Generate secure reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

      // Store reset token in database
      await storage.createPasswordResetToken({
        userId: user.id,
        token: resetToken,
        expiresAt,
        used: false
      });

      // Send password reset email
      await emailService.sendPasswordResetEmail(email, resetToken);

      res.json({ 
        message: "If an account with that email exists, we've sent a password reset link." 
      });
    } catch (error: any) {
      console.error('Forgot password error:', error);
      res.status(500).json({ error: "Failed to process password reset request" });
    }
  });

  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      
      // Validate request body
      const validation = passwordResetSchema.safeParse({ token, newPassword });
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid reset token or password",
          details: validation.error.errors 
        });
      }

      // Find valid reset token
      const resetToken = await storage.getPasswordResetToken(token);
      if (!resetToken) {
        return res.status(400).json({ 
          error: "Invalid or expired reset token" 
        });
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update user password
      await storage.updateUserPassword(resetToken.userId, hashedPassword);

      // Mark token as used
      await storage.markPasswordResetTokenUsed(resetToken.id);

      res.json({ 
        message: "Password has been reset successfully" 
      });
    } catch (error: any) {
      console.error('Reset password error:', error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  });

  app.get("/api/auth/verify-reset-token/:token", async (req, res) => {
    try {
      const { token } = req.params;
      
      if (!token) {
        return res.status(400).json({ error: "Reset token is required" });
      }

      // Check if reset token is valid
      const resetToken = await storage.getPasswordResetToken(token);
      
      if (!resetToken) {
        return res.status(400).json({ 
          error: "Invalid or expired reset token",
          valid: false 
        });
      }

      res.json({ 
        valid: true,
        message: "Reset token is valid" 
      });
    } catch (error: any) {
      console.error('Verify reset token error:', error);
      res.status(500).json({ error: "Failed to verify reset token" });
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
        stripePaymentId: (subscription.latest_invoice as any)?.payment_intent?.id,
        cryptoPaymentId: null,
        paymentMethod: 'stripe',
        amount: (amount / 100).toString(),
        currency: 'usd',
        status: 'pending',
      });

      res.json({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
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

  // Get player props endpoint - REAL PLAYER PROPS FROM BETTING SERVICE
  app.get("/api/betting/player-props", async (req, res) => {
    try {
      console.log('🎯 FETCHING REAL PLAYER PROPS from betting service...');
      
      // Get real player props from the betting data service
      const playerPropOpportunities = await bettingDataService.getPlayerProps();
      
      console.log(`✅ PLAYER PROPS: Found ${playerPropOpportunities.length} real opportunities`);
      
      res.json({
        opportunities: playerPropOpportunities,
        total: playerPropOpportunities.length,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error fetching player props:', error);
      res.status(500).json({ 
        error: 'Failed to fetch player props',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Sportsbooks endpoint - returns the complete list of integrated sportsbooks
  app.get("/api/betting/sportsbooks", async (req, res) => {
    try {
      const sportsbooks = bettingDataService.SPORTSBOOKS || [];
      res.json({ 
        sportsbooks,
        count: sportsbooks.length,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error fetching sportsbooks:", error);
      res.status(500).json({ error: "Failed to fetch sportsbooks" });
    }
  });

  // Get all props (players, teams, games) endpoint
  app.get("/api/betting/all-props", async (req, res) => {
    try {
      const { gameID } = req.query;
      
      console.log('Fetching all props with gameID:', gameID);
      
      const allProps = await sportsDataService.getAllProps(gameID as string);
      
      console.log(`Found ${allProps.length} total props/futures`);
      
      res.json({
        props: allProps,
        total: allProps.length,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error fetching all props:', error);
      res.status(500).json({ 
        error: 'Failed to fetch props',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
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

  // Helper function to format game titles
  const formatGameTitle = (game: any): string => {
    const team1 = game.team1Name || 'Team A';
    const team2 = game.team2Name || 'Team B';
    const score1 = game.team1Score || 0;
    const score2 = game.team2Score || 0;
    
    if (game.status === 'final' || game.status === 'finished') {
      return `${team1} ${score1} - ${score2} ${team2}`;
    } else if (game.status === 'live' || game.status === 'in_progress') {
      return `${team1} ${score1} - ${score2} ${team2} (Live)`;
    } else {
      return `${team1} vs ${team2}`;
    }
  };

  // Helper function to format game descriptions
  const formatGameDescription = (game: any): string => {
    const sport = game.sport ? game.sport.toUpperCase() : 'Sports';
    const status = game.status || 'scheduled';
    const date = new Date(game.date).toLocaleDateString();
    const time = new Date(game.date).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    if (status === 'final' || status === 'finished') {
      return `${sport} - Final Score from ${date}`;
    } else if (status === 'live' || status === 'in_progress') {
      return `${sport} - Live Game`;
    } else {
      return `${sport} - ${date} at ${time}`;
    }
  };

  // Get recent headlines for finished games
  app.get("/api/sports/headlines/recent", async (req, res) => {
    try {
      const { sport } = req.query;
      const games = await sportsDataService.getRecentHeadlines(sport as string);
      
      // Format the headlines to remove confusing data and ensure clean display
      const headlines = games.map((game: any) => ({
        id: game.gameID || `game-${Date.now()}-${Math.random()}`,
        title: formatGameTitle(game),
        description: formatGameDescription(game),
        sport: game.sport || 'Sports',
        date: game.date,
        teams: {
          away: game.team1Name || 'Team 1',
          home: game.team2Name || 'Team 2'
        },
        score: {
          away: game.team1Score || 0,
          home: game.team2Score || 0
        },
        status: game.status || 'scheduled'
      }));
      
      console.log('Recent headlines response:', headlines ? headlines.length : 0, 'headlines');
      res.json({ headlines: headlines || [] });
    } catch (error: any) {
      console.error('Error fetching recent headlines:', error);
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
      
      // Format highlights to remove confusing data
      const formattedHighlights = highlights.map(highlight => ({
        ...highlight,
        title: highlight.title || formatGameTitle(highlight),
        description: highlight.description || formatGameDescription(highlight)
      }));
      
      res.json({ highlights: formattedHighlights });
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
  // LIVE BETTING OPPORTUNITIES - Real data from sports API
  app.get("/api/betting/live-opportunities", async (req, res) => {
    try {
      const { sport, minEV } = req.query;
      const opportunities = await bettingDataService.getLiveBettingOpportunities(
        sport as string, 
        minEV ? parseFloat(minEV as string) : undefined
      );
      
      // Debug category distribution for frontend filtering troubleshooting
      const categoryCount = opportunities.reduce((acc: any, opp) => {
        acc[opp.category || 'unknown'] = (acc[opp.category || 'unknown'] || 0) + 1;
        return acc;
      }, {});
      
      console.log('Live betting opportunities response:', opportunities.length, 'opportunities');
      console.log('Category distribution:', categoryCount);
      res.json({ opportunities });
    } catch (error: any) {
      console.error('Error fetching live betting opportunities:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // New endpoint for upcoming betting opportunities
  app.get("/api/betting/upcoming-opportunities", async (req, res) => {
    try {
      const { sport, minEV } = req.query;
      const opportunities = await bettingDataService.getUpcomingBettingOpportunities();
      
      // Apply filters if provided
      let filteredOpportunities = opportunities;
      
      if (sport && sport !== 'all') {
        filteredOpportunities = filteredOpportunities.filter(opp => 
          opp.sport.toLowerCase().includes(sport.toString().toLowerCase())
        );
      }
      
      if (minEV && parseFloat(minEV as string) > 0) {
        filteredOpportunities = filteredOpportunities.filter(opp => 
          opp.ev >= parseFloat(minEV as string)
        );
      }
      
      // Debug category distribution
      const categoryCount = filteredOpportunities.reduce((acc: any, opp) => {
        acc[opp.category || 'unknown'] = (acc[opp.category || 'unknown'] || 0) + 1;
        return acc;
      }, {});
      
      console.log('Upcoming betting opportunities response:', filteredOpportunities.length, 'opportunities');
      console.log('Category distribution:', categoryCount);
      res.json({ opportunities: filteredOpportunities });
    } catch (error: any) {
      console.error('Error fetching upcoming betting opportunities:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // TRADING TERMINAL STATS - Real live statistics
  // Cache clearing endpoint for immediate fresh data
  app.post('/api/betting/clear-cache', async (req, res) => {
    try {
      const deduplicator = OddsDeduplicator.getInstance();
      deduplicator.clearCache();
      console.log('Betting odds cache cleared for immediate fresh data');
      res.json({ success: true, message: 'Cache cleared successfully' });
    } catch (error: any) {
      console.error('Error clearing betting cache:', error);
      res.status(500).json({ error: 'Failed to clear cache' });
    }
  });

  app.get("/api/betting/terminal-stats", async (req, res) => {
    try {
      const stats = await bettingDataService.getTerminalStats();
      res.json(stats);
    } catch (error: any) {
      console.error('Error fetching terminal stats:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // NEW: Trading math analysis endpoint
  app.get("/api/betting/trading-math-analysis", async (req, res) => {
    try {
      const { sport, targetBook } = req.query;
      const games = await sportsDataService.getTodaysGames(sport as string);
      
      // Import and use trading math service
      const { tradingMathService } = await import('./tradingMathService');
      const analysis = tradingMathService.processLiveBettingData(games);
      
      res.json({
        analysis: analysis.opportunities,
        stats: analysis.stats,
        targetBook: targetBook || 'DraftKings',
        tradingMathEnabled: true
      });
    } catch (error: any) {
      console.error('Error in trading math analysis:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // NEW: Process outcome snapshots endpoint (for integration with existing odds refresh)
  app.post("/api/betting/process-snapshots", async (req, res) => {
    try {
      const { snapshots, targetBook } = req.body;
      
      if (!Array.isArray(snapshots)) {
        return res.status(400).json({ error: 'snapshots must be an array' });
      }
      
      const { tradingMathService } = await import('./tradingMathService');
      const result = tradingMathService.processOutcomeSnapshots(snapshots, targetBook || 'DraftKings');
      
      res.json({
        opportunities: result.opportunities,
        stats: result.stats,
        processedAt: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Error processing snapshots:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // SPORTSBOOK LOGOS AND INFO
  app.get("/api/betting/sportsbooks", async (req, res) => {
    try {
      const { BettingDataService } = await import("./bettingDataService");
      res.json({ sportsbooks: BettingDataService.SPORTSBOOKS });
    } catch (error: any) {
      console.error('Error fetching sportsbooks:', error);
      res.status(500).json({ error: error.message });
    }
  });


  // Content Engine API integration
  app.use('/api/content-engine', contentEngineRoutes);

  // Team Logo Proxy Routes
  setupTeamLogoRoutes(app);

  // PRESET TERMINAL ROUTES
  // Get user presets
  app.get("/api/presets/user", async (req, res) => {
    try {
      // For now, return empty array - in production this would query the database
      res.json([]);
    } catch (error: any) {
      console.error('Error fetching user presets:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get community presets
  app.get("/api/presets/community", async (req, res) => {
    try {
      // For now, return empty array - in production this would query the database
      res.json([]);
    } catch (error: any) {
      console.error('Error fetching community presets:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Create new preset
  app.post("/api/presets", async (req, res) => {
    try {
      const presetData = req.body;
      // In production, this would save to database
      res.json({ success: true, preset: { ...presetData, id: Date.now().toString() } });
    } catch (error: any) {
      console.error('Error creating preset:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Clone preset
  app.post("/api/presets/:id/clone", async (req, res) => {
    try {
      const { id } = req.params;
      // In production, this would clone the preset in database
      res.json({ success: true, clonedId: `${id}-clone-${Date.now()}` });
    } catch (error: any) {
      console.error('Error cloning preset:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // 🚨 LAUNCH STATUS ROUTES - Real-time launch readiness validation
  app.use('/api', launchStatusRoutes);
  app.use('/api/enhanced', enhancedOpportunitiesRoutes);

  const httpServer = createServer(app);

  return httpServer;
}
