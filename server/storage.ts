import { 
  users, 
  payments, 
  achievements, 
  userAchievements, 
  userStats,
  affiliateClicks,
  affiliateConversions,
  affiliateMetrics,
  type User, 
  type InsertUser, 
  type Payment, 
  type InsertPayment,
  type Achievement,
  type InsertAchievement,
  type UserAchievement,
  type InsertUserAchievement,
  type UserStats,
  type InsertUserStats,
  type AffiliateClick,
  type InsertAffiliateClick,
  type AffiliateConversion,
  type InsertAffiliateConversion,
  type AffiliateMetric,
  type InsertAffiliateMetric,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User>;
  updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: number, updates: Partial<Payment>): Promise<Payment>;
  getPaymentsByUserId(userId: number): Promise<Payment[]>;
  
  // Achievement System
  getAllAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: number): Promise<UserAchievement[]>;
  getUserStats(userId: number): Promise<UserStats | undefined>;
  createUserStats(stats: InsertUserStats): Promise<UserStats>;
  updateUserStats(userId: number, updates: Partial<UserStats>): Promise<UserStats>;
  unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement>;
  updateAchievementProgress(userId: number, achievementId: number, progress: number): Promise<UserAchievement>;
  getAchievementLeaderboard(limit?: number): Promise<Array<{ user: User; stats: UserStats }>>;
  
  // Affiliate Marketing System
  createAffiliateClick(click: InsertAffiliateClick): Promise<AffiliateClick>;
  updateAffiliateClick(id: number, updates: Partial<AffiliateClick>): Promise<AffiliateClick>;
  getAffiliateClick(id: number): Promise<AffiliateClick | undefined>;
  createAffiliateConversion(conversion: InsertAffiliateConversion): Promise<AffiliateConversion>;
  updateAffiliateConversion(id: number, updates: Partial<AffiliateConversion>): Promise<AffiliateConversion>;
  getAffiliateConversion(id: number): Promise<AffiliateConversion | undefined>;
  getAffiliateMetrics(sportsbookId?: string, startDate?: Date, endDate?: Date): Promise<AffiliateMetric[]>;
  upsertAffiliateMetric(metric: InsertAffiliateMetric): Promise<AffiliateMetric>;
  getAffiliateClicksCount(sportsbookId: string, startDate: Date, endDate: Date): Promise<number>;
  getAffiliateConversionsCount(sportsbookId: string, startDate: Date, endDate: Date): Promise<number>;
  getAffiliateRevenue(sportsbookId: string, startDate: Date, endDate: Date): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User> {
    return this.updateUser(userId, { stripeCustomerId });
  }

  async updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    return this.updateUser(userId, { 
      stripeCustomerId, 
      stripeSubscriptionId,
      subscriptionStatus: "active" 
    });
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const [payment] = await db
      .insert(payments)
      .values(insertPayment)
      .returning();
    return payment;
  }

  async updatePayment(id: number, updates: Partial<Payment>): Promise<Payment> {
    const [payment] = await db
      .update(payments)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    
    if (!payment) {
      throw new Error(`Payment with id ${id} not found`);
    }
    return payment;
  }

  async getPaymentsByUserId(userId: number): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.userId, userId));
  }

  // Achievement System Methods
  async getAllAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements).where(eq(achievements.isActive, true));
  }

  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return await db.select().from(userAchievements).where(eq(userAchievements.userId, userId));
  }

  async getUserStats(userId: number): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats;
  }

  async createUserStats(stats: InsertUserStats): Promise<UserStats> {
    const [created] = await db.insert(userStats).values(stats).returning();
    return created;
  }

  async updateUserStats(userId: number, updates: Partial<UserStats>): Promise<UserStats> {
    const [updated] = await db
      .update(userStats)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userStats.userId, userId))
      .returning();
    return updated;
  }

  async unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement> {
    const [unlocked] = await db
      .update(userAchievements)
      .set({ 
        unlockedAt: new Date(),
        updatedAt: new Date()
      })
      .where(and(
        eq(userAchievements.userId, userId),
        eq(userAchievements.achievementId, achievementId)
      ))
      .returning();
    return unlocked;
  }

  async updateAchievementProgress(userId: number, achievementId: number, progress: number): Promise<UserAchievement> {
    // First try to find existing record
    const [existing] = await db
      .select()
      .from(userAchievements)
      .where(and(
        eq(userAchievements.userId, userId),
        eq(userAchievements.achievementId, achievementId)
      ));

    if (existing) {
      // Update existing record
      const [updated] = await db
        .update(userAchievements)
        .set({ progress, updatedAt: new Date() })
        .where(and(
          eq(userAchievements.userId, userId),
          eq(userAchievements.achievementId, achievementId)
        ))
        .returning();
      return updated;
    } else {
      // Create new record
      const [created] = await db
        .insert(userAchievements)
        .values({
          userId,
          achievementId,
          progress,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();
      return created;
    }
  }

  async getAchievementLeaderboard(limit = 10): Promise<Array<{ user: User; stats: UserStats }>> {
    const results = await db
      .select({
        user: users,
        stats: userStats
      })
      .from(userStats)
      .innerJoin(users, eq(users.id, userStats.userId))
      .orderBy(sql`${userStats.achievementPoints} DESC`)
      .limit(limit);
    
    return results;
  }

  // Affiliate Marketing System Implementation
  async createAffiliateClick(insertClick: InsertAffiliateClick): Promise<AffiliateClick> {
    const [click] = await db
      .insert(affiliateClicks)
      .values(insertClick)
      .returning();
    return click;
  }

  async updateAffiliateClick(id: number, updates: Partial<AffiliateClick>): Promise<AffiliateClick> {
    const [click] = await db
      .update(affiliateClicks)
      .set(updates)
      .where(eq(affiliateClicks.id, id))
      .returning();
    
    if (!click) {
      throw new Error(`Affiliate click with id ${id} not found`);
    }
    return click;
  }

  async getAffiliateClick(id: number): Promise<AffiliateClick | undefined> {
    const [click] = await db.select().from(affiliateClicks).where(eq(affiliateClicks.id, id));
    return click || undefined;
  }

  async createAffiliateConversion(insertConversion: InsertAffiliateConversion): Promise<AffiliateConversion> {
    const [conversion] = await db
      .insert(affiliateConversions)
      .values(insertConversion)
      .returning();
    return conversion;
  }

  async updateAffiliateConversion(id: number, updates: Partial<AffiliateConversion>): Promise<AffiliateConversion> {
    const [conversion] = await db
      .update(affiliateConversions)
      .set(updates)
      .where(eq(affiliateConversions.id, id))
      .returning();
    
    if (!conversion) {
      throw new Error(`Affiliate conversion with id ${id} not found`);
    }
    return conversion;
  }

  async getAffiliateConversion(id: number): Promise<AffiliateConversion | undefined> {
    const [conversion] = await db.select().from(affiliateConversions).where(eq(affiliateConversions.id, id));
    return conversion || undefined;
  }

  async getAffiliateMetrics(sportsbookId?: string, startDate?: Date, endDate?: Date): Promise<AffiliateMetric[]> {
    let query = db.select().from(affiliateMetrics);
    
    const conditions = [];
    if (sportsbookId) {
      conditions.push(eq(affiliateMetrics.sportsbookId, sportsbookId));
    }
    if (startDate) {
      conditions.push(sql`${affiliateMetrics.date} >= ${startDate.toISOString()}`);
    }
    if (endDate) {
      conditions.push(sql`${affiliateMetrics.date} <= ${endDate.toISOString()}`);
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    return await query;
  }

  async upsertAffiliateMetric(insertMetric: InsertAffiliateMetric): Promise<AffiliateMetric> {
    const existing = await db.select().from(affiliateMetrics)
      .where(and(
        eq(affiliateMetrics.sportsbookId, insertMetric.sportsbookId),
        eq(affiliateMetrics.date, insertMetric.date)
      ));

    if (existing.length > 0) {
      const [metric] = await db
        .update(affiliateMetrics)
        .set({ ...insertMetric, updatedAt: new Date() })
        .where(eq(affiliateMetrics.id, existing[0].id))
        .returning();
      return metric;
    } else {
      const [metric] = await db
        .insert(affiliateMetrics)
        .values(insertMetric)
        .returning();
      return metric;
    }
  }

  async getAffiliateClicksCount(sportsbookId: string, startDate: Date, endDate: Date): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(affiliateClicks)
      .where(and(
        eq(affiliateClicks.sportsbookId, sportsbookId),
        sql`${affiliateClicks.clickedAt} >= ${startDate.toISOString()}`,
        sql`${affiliateClicks.clickedAt} <= ${endDate.toISOString()}`
      ));
    
    return result[0]?.count || 0;
  }

  async getAffiliateConversionsCount(sportsbookId: string, startDate: Date, endDate: Date): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(affiliateConversions)
      .where(and(
        eq(affiliateConversions.sportsbookId, sportsbookId),
        sql`${affiliateConversions.signupDate} >= ${startDate.toISOString()}`,
        sql`${affiliateConversions.signupDate} <= ${endDate.toISOString()}`
      ));
    
    return result[0]?.count || 0;
  }

  async getAffiliateRevenue(sportsbookId: string, startDate: Date, endDate: Date): Promise<number> {
    const result = await db
      .select({ 
        totalRevenue: sql<string>`COALESCE(SUM(CAST(total_deposits AS DECIMAL)), 0)` 
      })
      .from(affiliateConversions)
      .where(and(
        eq(affiliateConversions.sportsbookId, sportsbookId),
        sql`${affiliateConversions.signupDate} >= ${startDate.toISOString()}`,
        sql`${affiliateConversions.signupDate} <= ${endDate.toISOString()}`
      ));
    
    return parseFloat(result[0]?.totalRevenue || '0');
  }
}

export const storage = new DatabaseStorage();
