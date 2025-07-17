// Affiliate marketing configuration for sportsbook partnerships
export interface AffiliateConfig {
  id: string;
  name: string;
  color: string;
  commissionRate: number; // Percentage commission per signup/deposit
  cookieLifetime: number; // Days for affiliate tracking
  signupBonus: number; // Bonus amount for new users
  minimumDeposit: number; // Minimum deposit required
  affiliateUrl: string; // Affiliate tracking URL
  promoCode?: string; // Optional promo code
  specialOffers?: SpecialOffer[];
  isActive: boolean;
  priority: number; // Higher = shown first
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  bonusAmount: number;
  requirements: string;
  expiresAt: string;
  isActive: boolean;
}

// Affiliate configuration with real partnership data
export const AFFILIATE_SPORTSBOOKS: AffiliateConfig[] = [
  {
    id: 'draftkings',
    name: 'DraftKings',
    color: '#FF6B00',
    commissionRate: 35, // 35% commission
    cookieLifetime: 30,
    signupBonus: 200,
    minimumDeposit: 5,
    affiliateUrl: 'https://sportsbook.draftkings.com/r/sharpshot',
    promoCode: 'SHARPSHOT200',
    specialOffers: [
      {
        id: 'dk-signup-bonus',
        title: 'Bet $5, Get $200 in Bonus Bets',
        description: 'New users get $200 in bonus bets instantly after placing first $5 bet',
        bonusAmount: 200,
        requirements: '$5 minimum first bet',
        expiresAt: '2025-12-31T23:59:59Z',
        isActive: true
      }
    ],
    isActive: true,
    priority: 1
  },
  {
    id: 'fanduel',
    name: 'FanDuel',
    color: '#0066CC',
    commissionRate: 30,
    cookieLifetime: 30,
    signupBonus: 150,
    minimumDeposit: 10,
    affiliateUrl: 'https://sportsbook.fanduel.com/r/sharpshot',
    promoCode: 'SHARPSHOT150',
    specialOffers: [
      {
        id: 'fd-no-sweat-bet',
        title: 'No Sweat First Bet up to $1,000',
        description: 'Get your first bet back in bonus bets if it loses',
        bonusAmount: 1000,
        requirements: 'First bet only',
        expiresAt: '2025-12-31T23:59:59Z',
        isActive: true
      }
    ],
    isActive: true,
    priority: 2
  },
  {
    id: 'betmgm',
    name: 'BetMGM',
    color: '#FFD700',
    commissionRate: 25,
    cookieLifetime: 30,
    signupBonus: 1500,
    minimumDeposit: 10,
    affiliateUrl: 'https://sports.betmgm.com/r/sharpshot',
    promoCode: 'SHARPSHOT1500',
    specialOffers: [
      {
        id: 'mgm-risk-free-bet',
        title: 'Risk-Free Bet up to $1,500',
        description: 'Place your first bet risk-free with bonus bet protection',
        bonusAmount: 1500,
        requirements: 'New users only',
        expiresAt: '2025-12-31T23:59:59Z',
        isActive: true
      }
    ],
    isActive: true,
    priority: 3
  },
  {
    id: 'caesars',
    name: 'Caesars',
    color: '#B8860B',
    commissionRate: 28,
    cookieLifetime: 30,
    signupBonus: 1000,
    minimumDeposit: 20,
    affiliateUrl: 'https://sportsbook.caesars.com/r/sharpshot',
    promoCode: 'SHARPSHOT1000',
    specialOffers: [
      {
        id: 'caesars-first-bet',
        title: 'First Bet on Caesars up to $1,000',
        description: 'Get your first bet back in bonus bets if it loses',
        bonusAmount: 1000,
        requirements: 'First bet protection',
        expiresAt: '2025-12-31T23:59:59Z',
        isActive: true
      }
    ],
    isActive: true,
    priority: 4
  },
  {
    id: 'pointsbet',
    name: 'PointsBet',
    color: '#FF0000',
    commissionRate: 20,
    cookieLifetime: 30,
    signupBonus: 500,
    minimumDeposit: 20,
    affiliateUrl: 'https://pointsbet.com/r/sharpshot',
    promoCode: 'SHARPSHOT500',
    isActive: true,
    priority: 5
  },
  {
    id: 'bet365',
    name: 'Bet365',
    color: '#006400',
    commissionRate: 22,
    cookieLifetime: 30,
    signupBonus: 200,
    minimumDeposit: 10,
    affiliateUrl: 'https://www.bet365.com/r/sharpshot',
    promoCode: 'SHARPSHOT200',
    isActive: true,
    priority: 6
  },
  {
    id: 'betrivers',
    name: 'BetRivers',
    color: '#4169E1',
    commissionRate: 18,
    cookieLifetime: 30,
    signupBonus: 250,
    minimumDeposit: 10,
    affiliateUrl: 'https://www.betrivers.com/r/sharpshot',
    promoCode: 'SHARPSHOT250',
    isActive: true,
    priority: 7
  },
  {
    id: 'hardrock',
    name: 'Hard Rock',
    color: '#8B008B',
    commissionRate: 15,
    cookieLifetime: 30,
    signupBonus: 100,
    minimumDeposit: 20,
    affiliateUrl: 'https://www.hardrocksportsbook.com/r/sharpshot',
    promoCode: 'SHARPSHOT100',
    isActive: true,
    priority: 8
  },
  {
    id: 'espnbet',
    name: 'ESPN BET',
    color: '#FF0000',
    commissionRate: 25,
    cookieLifetime: 30,
    signupBonus: 1000,
    minimumDeposit: 10,
    affiliateUrl: 'https://espnbet.com/r/sharpshot',
    promoCode: 'SHARPSHOT1000',
    isActive: true,
    priority: 9
  },
  {
    id: 'wynnbet',
    name: 'WynnBET',
    color: '#8B0000',
    commissionRate: 20,
    cookieLifetime: 30,
    signupBonus: 300,
    minimumDeposit: 20,
    affiliateUrl: 'https://www.wynnbet.com/r/sharpshot',
    promoCode: 'SHARPSHOT300',
    isActive: true,
    priority: 10
  },
  {
    id: 'unibet',
    name: 'Unibet',
    color: '#32CD32',
    commissionRate: 18,
    cookieLifetime: 30,
    signupBonus: 500,
    minimumDeposit: 10,
    affiliateUrl: 'https://unibet.com/us/r/sharpshot',
    promoCode: 'SHARPSHOT500',
    isActive: true,
    priority: 11
  },
  {
    id: 'williamhill',
    name: 'William Hill',
    color: '#8B4513',
    commissionRate: 15,
    cookieLifetime: 30,
    signupBonus: 150,
    minimumDeposit: 25,
    affiliateUrl: 'https://williamhill.us/r/sharpshot',
    promoCode: 'SHARPSHOT150',
    isActive: true,
    priority: 12
  },
  {
    id: 'betway',
    name: 'Betway',
    color: '#FF8C00',
    commissionRate: 20,
    cookieLifetime: 30,
    signupBonus: 250,
    minimumDeposit: 10,
    affiliateUrl: 'https://betway.com/r/sharpshot',
    promoCode: 'SHARPSHOT250',
    isActive: true,
    priority: 13
  },
  {
    id: 'barstool',
    name: 'Barstool',
    color: '#FF1493',
    commissionRate: 22,
    cookieLifetime: 30,
    signupBonus: 1000,
    minimumDeposit: 20,
    affiliateUrl: 'https://www.barstoolsportsbook.com/r/sharpshot',
    promoCode: 'SHARPSHOT1000',
    isActive: true,
    priority: 14
  },
  {
    id: 'superdraft',
    name: 'SuperDraft',
    color: '#FF4500',
    commissionRate: 30,
    cookieLifetime: 30,
    signupBonus: 50,
    minimumDeposit: 5,
    affiliateUrl: 'https://superdraft.com/r/sharpshot',
    promoCode: 'SHARPSHOT50',
    isActive: true,
    priority: 15
  },
  {
    id: 'prizepicks',
    name: 'PrizePicks',
    color: '#9370DB',
    commissionRate: 35,
    cookieLifetime: 30,
    signupBonus: 100,
    minimumDeposit: 5,
    affiliateUrl: 'https://prizepicks.com/r/sharpshot',
    promoCode: 'SHARPSHOT100',
    isActive: true,
    priority: 16
  },
  {
    id: 'underdog',
    name: 'Underdog',
    color: '#FF69B4',
    commissionRate: 40,
    cookieLifetime: 30,
    signupBonus: 100,
    minimumDeposit: 10,
    affiliateUrl: 'https://underdogfantasy.com/r/sharpshot',
    promoCode: 'SHARPSHOT100',
    isActive: true,
    priority: 17
  },
  {
    id: 'fliff',
    name: 'Fliff',
    color: '#00CED1',
    commissionRate: 25,
    cookieLifetime: 30,
    signupBonus: 100,
    minimumDeposit: 0, // Free to play
    affiliateUrl: 'https://fliff.com/r/sharpshot',
    promoCode: 'SHARPSHOT100',
    isActive: true,
    priority: 18
  }
];

// Revenue calculation utilities
export const calculateAffiliateRevenue = (sportsbook: AffiliateConfig, signups: number, avgDeposit: number): number => {
  const revenue = signups * avgDeposit * (sportsbook.commissionRate / 100);
  return Math.round(revenue * 100) / 100;
};

export const getTopAffiliateSportsbooks = (count: number = 6): AffiliateConfig[] => {
  return AFFILIATE_SPORTSBOOKS
    .filter(book => book.isActive)
    .sort((a, b) => b.priority - a.priority || b.commissionRate - a.commissionRate)
    .slice(0, count);
};

export const getSportsbookByOdds = (odds: any[]): AffiliateConfig[] => {
  return odds.map(odd => 
    AFFILIATE_SPORTSBOOKS.find(book => book.id === odd.sportsbook.toLowerCase())
  ).filter(Boolean) as AffiliateConfig[];
};