import { pgTable, serial, text, timestamp, integer, boolean, decimal, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Affiliate clicks tracking
export const affiliateClicks = pgTable('affiliate_clicks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'), // Optional - tracks logged in users
  sessionId: text('session_id').notNull(), // Tracks anonymous users
  sportsbookId: text('sportsbook_id').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  clickedAt: timestamp('clicked_at').defaultNow(),
  convertedAt: timestamp('converted_at'), // When user signs up
  depositAmount: decimal('deposit_amount', { precision: 10, scale: 2 }),
  commissionEarned: decimal('commission_earned', { precision: 10, scale: 2 }),
  status: text('status').default('clicked'), // clicked, converted, deposited
});

// Affiliate conversions (signups)
export const affiliateConversions = pgTable('affiliate_conversions', {
  id: serial('id').primaryKey(),
  clickId: integer('click_id').references(() => affiliateClicks.id),
  userId: integer('user_id'), // Reference to users table
  sportsbookId: text('sportsbook_id').notNull(),
  sportsbookUserId: text('sportsbook_user_id'), // User ID from sportsbook
  signupDate: timestamp('signup_date').defaultNow(),
  firstDepositDate: timestamp('first_deposit_date'),
  firstDepositAmount: decimal('first_deposit_amount', { precision: 10, scale: 2 }),
  totalDeposits: decimal('total_deposits', { precision: 10, scale: 2 }).default('0'),
  totalCommission: decimal('total_commission', { precision: 10, scale: 2 }).default('0'),
  isActive: boolean('is_active').default(true),
  metadata: jsonb('metadata'), // Store additional conversion data
});

// Affiliate payouts tracking
export const affiliatePayouts = pgTable('affiliate_payouts', {
  id: serial('id').primaryKey(),
  sportsbookId: text('sportsbook_id').notNull(),
  payoutDate: timestamp('payout_date').defaultNow(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  totalClicks: integer('total_clicks').default(0),
  totalConversions: integer('total_conversions').default(0),
  totalRevenue: decimal('total_revenue', { precision: 10, scale: 2 }).default('0'),
  totalCommission: decimal('total_commission', { precision: 10, scale: 2 }).default('0'),
  payoutAmount: decimal('payout_amount', { precision: 10, scale: 2 }).default('0'),
  status: text('status').default('pending'), // pending, paid, disputed
  payoutMethod: text('payout_method'), // bank_transfer, paypal, crypto
  transactionId: text('transaction_id'),
  notes: text('notes'),
});

// Affiliate performance metrics
export const affiliateMetrics = pgTable('affiliate_metrics', {
  id: serial('id').primaryKey(),
  sportsbookId: text('sportsbook_id').notNull(),
  date: timestamp('date').notNull(),
  clicks: integer('clicks').default(0),
  conversions: integer('conversions').default(0),
  deposits: integer('deposits').default(0),
  revenue: decimal('revenue', { precision: 10, scale: 2 }).default('0'),
  commission: decimal('commission', { precision: 10, scale: 2 }).default('0'),
  conversionRate: decimal('conversion_rate', { precision: 5, scale: 4 }).default('0'), // clicks to conversions
  avgDepositAmount: decimal('avg_deposit_amount', { precision: 10, scale: 2 }).default('0'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Zod schemas for validation
export const insertAffiliateClickSchema = createInsertSchema(affiliateClicks).omit({
  id: true,
  clickedAt: true,
});

export const insertAffiliateConversionSchema = createInsertSchema(affiliateConversions).omit({
  id: true,
  signupDate: true,
});

export const insertAffiliatePayoutSchema = createInsertSchema(affiliatePayouts).omit({
  id: true,
  payoutDate: true,
});

export const insertAffiliateMetricSchema = createInsertSchema(affiliateMetrics).omit({
  id: true,
  updatedAt: true,
});

// TypeScript types
export type InsertAffiliateClick = z.infer<typeof insertAffiliateClickSchema>;
export type AffiliateClick = typeof affiliateClicks.$inferSelect;

export type InsertAffiliateConversion = z.infer<typeof insertAffiliateConversionSchema>;
export type AffiliateConversion = typeof affiliateConversions.$inferSelect;

export type InsertAffiliatePayout = z.infer<typeof insertAffiliatePayoutSchema>;
export type AffiliatePayout = typeof affiliatePayouts.$inferSelect;

export type InsertAffiliateMetric = z.infer<typeof insertAffiliateMetricSchema>;
export type AffiliateMetric = typeof affiliateMetrics.$inferSelect;