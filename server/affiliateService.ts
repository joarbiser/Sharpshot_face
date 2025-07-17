import { storage } from './storage';
import { AFFILIATE_SPORTSBOOKS, AffiliateConfig, calculateAffiliateRevenue } from '@shared/affiliateConfig';
import { AffiliateClick, AffiliateConversion, AffiliateMetric } from '@shared/affiliateSchema';

export class AffiliateService {
  
  // Track affiliate click
  async trackClick(data: {
    userId?: number;
    sessionId: string;
    sportsbookId: string;
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
  }): Promise<AffiliateClick> {
    const clickData = {
      ...data,
      status: 'clicked' as const,
    };
    
    return await storage.createAffiliateClick(clickData);
  }

  // Track conversion (signup)
  async trackConversion(data: {
    clickId: number;
    userId?: number;
    sportsbookId: string;
    sportsbookUserId?: string;
    metadata?: any;
  }): Promise<AffiliateConversion> {
    const conversionData = {
      ...data,
      isActive: true,
    };
    
    // Update click status
    await storage.updateAffiliateClick(data.clickId, {
      status: 'converted',
      convertedAt: new Date(),
    });
    
    return await storage.createAffiliateConversion(conversionData);
  }

  // Track deposit and calculate commission
  async trackDeposit(data: {
    conversionId: number;
    depositAmount: number;
    isFirstDeposit: boolean;
  }): Promise<void> {
    const conversion = await storage.getAffiliateConversion(data.conversionId);
    if (!conversion) return;

    const sportsbook = AFFILIATE_SPORTSBOOKS.find(book => book.id === conversion.sportsbookId);
    if (!sportsbook) return;

    const commission = calculateAffiliateRevenue(sportsbook, 1, data.depositAmount);
    
    const updates: any = {
      totalDeposits: (parseFloat(conversion.totalDeposits || '0') + data.depositAmount).toString(),
      totalCommission: (parseFloat(conversion.totalCommission || '0') + commission).toString(),
    };

    if (data.isFirstDeposit) {
      updates.firstDepositDate = new Date();
      updates.firstDepositAmount = data.depositAmount.toString();
    }

    await storage.updateAffiliateConversion(data.conversionId, updates);
    
    // Update click with commission earned
    if (conversion.clickId) {
      await storage.updateAffiliateClick(conversion.clickId, {
        status: 'deposited',
        depositAmount: data.depositAmount.toString(),
        commissionEarned: commission.toString(),
      });
    }
  }

  // Generate affiliate URLs with tracking
  generateAffiliateUrl(sportsbookId: string, userId?: number, sessionId?: string): string {
    const sportsbook = AFFILIATE_SPORTSBOOKS.find(book => book.id === sportsbookId);
    if (!sportsbook) return '';

    const baseUrl = sportsbook.affiliateUrl;
    const params = new URLSearchParams({
      source: 'sharpshot',
      medium: 'calculator',
      campaign: 'odds_comparison',
    });

    if (userId) params.append('user_id', userId.toString());
    if (sessionId) params.append('session_id', sessionId);
    if (sportsbook.promoCode) params.append('promo', sportsbook.promoCode);

    return `${baseUrl}?${params.toString()}`;
  }

  // Get affiliate performance metrics
  async getPerformanceMetrics(sportsbookId?: string, startDate?: Date, endDate?: Date): Promise<{
    totalClicks: number;
    totalConversions: number;
    totalRevenue: number;
    totalCommission: number;
    conversionRate: number;
    avgDepositAmount: number;
    topSportsbooks: Array<{
      sportsbookId: string;
      name: string;
      clicks: number;
      conversions: number;
      revenue: number;
      commission: number;
    }>;
  }> {
    const metrics = await storage.getAffiliateMetrics(sportsbookId, startDate, endDate);
    
    const totals = metrics.reduce((acc, metric) => ({
      totalClicks: acc.totalClicks + metric.clicks,
      totalConversions: acc.totalConversions + metric.conversions,
      totalRevenue: acc.totalRevenue + parseFloat(metric.revenue || '0'),
      totalCommission: acc.totalCommission + parseFloat(metric.commission || '0'),
    }), {
      totalClicks: 0,
      totalConversions: 0,
      totalRevenue: 0,
      totalCommission: 0,
    });

    const conversionRate = totals.totalClicks > 0 ? (totals.totalConversions / totals.totalClicks) * 100 : 0;
    const avgDepositAmount = totals.totalConversions > 0 ? totals.totalRevenue / totals.totalConversions : 0;

    // Group by sportsbook for top performers
    const sportsbookMetrics = metrics.reduce((acc, metric) => {
      const existing = acc.find(item => item.sportsbookId === metric.sportsbookId);
      const sportsbook = AFFILIATE_SPORTSBOOKS.find(book => book.id === metric.sportsbookId);
      
      if (existing) {
        existing.clicks += metric.clicks;
        existing.conversions += metric.conversions;
        existing.revenue += parseFloat(metric.revenue || '0');
        existing.commission += parseFloat(metric.commission || '0');
      } else {
        acc.push({
          sportsbookId: metric.sportsbookId,
          name: sportsbook?.name || metric.sportsbookId,
          clicks: metric.clicks,
          conversions: metric.conversions,
          revenue: parseFloat(metric.revenue || '0'),
          commission: parseFloat(metric.commission || '0'),
        });
      }
      return acc;
    }, [] as Array<{
      sportsbookId: string;
      name: string;
      clicks: number;
      conversions: number;
      revenue: number;
      commission: number;
    }>);

    return {
      ...totals,
      conversionRate,
      avgDepositAmount,
      topSportsbooks: sportsbookMetrics.sort((a, b) => b.revenue - a.revenue),
    };
  }

  // Get sportsbook with best commission rate for given bet amount
  getBestCommissionSportsbook(betAmount: number = 100): AffiliateConfig | null {
    const activeSportsbooks = AFFILIATE_SPORTSBOOKS.filter(book => book.isActive);
    if (activeSportsbooks.length === 0) return null;

    return activeSportsbooks.reduce((best, current) => {
      const bestRevenue = calculateAffiliateRevenue(best, 1, betAmount);
      const currentRevenue = calculateAffiliateRevenue(current, 1, betAmount);
      return currentRevenue > bestRevenue ? current : best;
    });
  }

  // Get recommended sportsbooks for user
  getRecommendedSportsbooks(count: number = 3): AffiliateConfig[] {
    return AFFILIATE_SPORTSBOOKS
      .filter(book => book.isActive)
      .sort((a, b) => {
        // Priority: commission rate, then signup bonus, then priority
        const aScore = (a.commissionRate * 0.4) + (a.signupBonus * 0.0001) + (a.priority * 0.1);
        const bScore = (b.commissionRate * 0.4) + (b.signupBonus * 0.0001) + (b.priority * 0.1);
        return bScore - aScore;
      })
      .slice(0, count);
  }

  // Update daily metrics
  async updateDailyMetrics(date: Date = new Date()): Promise<void> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    for (const sportsbook of AFFILIATE_SPORTSBOOKS) {
      const clicks = await storage.getAffiliateClicksCount(sportsbook.id, startOfDay, endOfDay);
      const conversions = await storage.getAffiliateConversionsCount(sportsbook.id, startOfDay, endOfDay);
      const revenue = await storage.getAffiliateRevenue(sportsbook.id, startOfDay, endOfDay);
      const commission = revenue * (sportsbook.commissionRate / 100);

      await storage.upsertAffiliateMetric({
        sportsbookId: sportsbook.id,
        date: startOfDay,
        clicks,
        conversions,
        deposits: conversions, // Assuming all conversions lead to deposits
        revenue: revenue.toString(),
        commission: commission.toString(),
        conversionRate: clicks > 0 ? (conversions / clicks) : 0,
        avgDepositAmount: conversions > 0 ? (revenue / conversions).toString() : '0',
      });
    }
  }
}

export const affiliateService = new AffiliateService();