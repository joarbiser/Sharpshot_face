import { pgTable, text, varchar, serial, integer, boolean, timestamp, numeric, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStatus: text("subscription_status").default("inactive"), // active, inactive, canceled, past_due
  subscriptionPlan: text("subscription_plan"), // starter, pro
  subscriptionPeriod: text("subscription_period"), // monthly, annual
  subscriptionEndsAt: timestamp("subscription_ends_at"),
  resetToken: text("reset_token"),
  resetTokenExpiry: timestamp("reset_token_expiry"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  used: boolean("used").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  stripePaymentId: text("stripe_payment_id"),
  cryptoPaymentId: text("crypto_payment_id"),
  paymentMethod: text("payment_method").notNull(), // stripe, crypto
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("usd"),
  status: text("status").notNull(), // pending, completed, failed, refunded
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});



export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});



export const insertPasswordResetTokenSchema = createInsertSchema(passwordResetTokens).omit({
  id: true,
  createdAt: true,
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const passwordResetSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});



export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

export type InsertPasswordResetToken = z.infer<typeof insertPasswordResetTokenSchema>;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>;
export type PasswordReset = z.infer<typeof passwordResetSchema>;

// Sports data types from the API
export interface Game {
  gameID: string;
  sport: string;
  team1ID: string;
  team1City: string;
  team1Name: string;
  team1Ranking?: number;
  team1Score?: number;
  team2ID: string;
  team2City: string;
  team2Name: string;
  team2Ranking?: number;
  team2Score?: number;
  progress: string;
  timeLeft?: string;
  location?: string;
  points: number;
  highPoints: number;
  pointsLevel: string;
  rationale: string;
  date: string;
  time: string;
  headline?: string;
  headlineDate?: string;
  airings?: Airing[];
  odds?: Odds[];
}

export interface Airing {
  airingID: string;
  gameID: string;
  callSign: string;
  channel: string;
  imageID?: string;
  programID: string;
  startDate: string;
}

export interface Odds {
  bookieID: string;
  bookieName: string;
  spread?: number;
  moneyline1?: number;
  moneyline2?: number;
  overUnder?: number;
  overOdds?: number;
  underOdds?: number;
  lastUpdated: string;
}

export interface Team {
  teamID: string;
  city: string;
  name: string;
  sport: string;
  ranking?: number;
}

export interface Event {
  eventID: string;
  gameID: string;
  sport: string;
  message: string;
  type: string;
  team1Score?: number;
  team2Score?: number;
  progress: string;
  timeLeft?: string;
  points: number;
  playerID?: string;
  date: string;
}

export interface Asset {
  assetID: string;
  title: string;
  description: string;
  gameID: string;
  type: string;
  duration: number;
  url: string;
  thumbnailUrl?: string;
}

// Enhanced betting opportunity interface for trading terminal
export interface BettingOpportunity {
  id: string;
  event: {
    home: string;
    away: string;
    sport: string;
    league: string;
    startTime: string;
    status: string;
    awayScore?: number;
    homeScore?: number;
  };
  market: {
    type: string; // moneyline, spread, total, run line, team total
    side: string; // home, away, over, under
    line?: number; // spread line, total line
    player?: string; // for player props
  };
  myPrice: {
    odds: number; // decimal odds
    book: string;
  };
  fieldPrices: Array<{
    odds: number; // decimal odds
    book: string;
  }>;
  evPercent?: number; // pre-calculated EV from API
  // Legacy fields for backward compatibility
  game?: string;
  bet?: string;
  sportsbook?: string;
  ev?: number;
  category?: 'ev' | 'arbitrage' | 'middling' | 'upcoming' | 'player_props';
  sport?: string;
  league?: string;
  gameTime?: string;
  lastUpdated?: string;
  // Player prop specific fields
  playerName?: string;
  propType?: string;
  propValue?: number;
  propDescription?: string;
}

// Player prop types from areyouwatchingthis API
export interface PlayerProp {
  id: string;
  playerName: string;
  playerId?: string;
  gameId?: string;
  propType: string; // e.g., "Passing Yards", "Points", "Rebounds"
  propValue: number; // The line value (e.g., 250.5 for passing yards)
  odds: number;
  sportsbook: string;
  overUnder: 'over' | 'under';
  sport: string;
  team?: string;
  gameTime?: string;
  lastUpdated: string;
}

// Raw API response structure for player props
export interface PlayerPropApiResponse {
  results: Array<{
    type: string;
    entity: {
      type: string;
      id: string;
      name: string;
    };
    market: string;
    value?: number;
    price?: number;
    price1?: number;
    price2?: number;
    sportsbook: string;
    gameID?: string;
  }>;
  entities?: {
    players?: Array<{
      id: string;
      name: string;
      team?: string;
    }>;
    games?: Array<{
      id: string;
      team1: string;
      team2: string;
      time: string;
    }>;
  };
}
