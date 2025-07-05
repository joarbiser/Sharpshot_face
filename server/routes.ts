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

  // Authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Authentication required" });
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
  app.post("/api/create-subscription", requireAuth, async (req: any, res) => {
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

      // Define price based on plan and period
      const prices = {
        starter: { monthly: 3999, annual: 39999 }, // $39.99/month, $399.99/year
        pro: { monthly: 9999, annual: 99999 }, // $99.99/month, $999.99/year
      };

      const amount = prices[planType as keyof typeof prices][period as keyof typeof prices.starter];

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Sharp Shot ${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan`,
            },
            unit_amount: amount,
            recurring: {
              interval: period === 'annual' ? 'year' : 'month',
            },
          },
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      // Update user with subscription info
      await storage.updateUserStripeInfo(userId, stripeCustomerId, subscription.id);
      await storage.updateUser(userId, {
        subscriptionPlan: planType,
        subscriptionPeriod: period,
        subscriptionStatus: 'pending',
      });

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
        // Update payment status
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        // Update subscription status
        console.log('Subscription updated:', subscription.id);
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
      res.json({ games });
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
      res.json({ events });
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

  const httpServer = createServer(app);

  return httpServer;
}
