import { apiRequest } from './queryClient';

interface BetDetails {
  sportsbook: string;
  gameId: string;
  betType: string;
  team?: string;
  line?: string;
}

const sportsbookUrls: { [key: string]: string } = {
  'draftkings': 'https://sportsbook.draftkings.com',
  'fanduel': 'https://sportsbook.fanduel.com',
  'betmgm': 'https://sports.betmgm.com',
  'caesars': 'https://sportsbook.caesars.com',
  'pointsbet': 'https://pointsbet.com',
  'unibet': 'https://unibet.com/us',
  'williamhill': 'https://williamhill.us',
  'bovada': 'https://www.bovada.lv',
  'bet365': 'https://www.bet365.com',
  'barstool': 'https://www.barstoolsportsbook.com',
  'betrivers': 'https://www.betrivers.com',
  'superbook': 'https://www.superbook.com',
  'wynnbet': 'https://www.wynnbet.com',
  'hardrock': 'https://www.hardrocksportsbook.com',
  'espnbet': 'https://espnbet.com',
};

// Track affiliate click and get affiliate URL
export const trackAffiliateClick = async (sportsbookId: string): Promise<string> => {
  try {
    // Track the click for affiliate commission
    await apiRequest('POST', '/api/affiliate/click', {
      sportsbookId,
      referrer: window.location.href
    });

    // Get the affiliate URL with tracking
    const response = await apiRequest('GET', `/api/affiliate/url/${sportsbookId}`);
    return response.url || sportsbookUrls[sportsbookId] || '';
  } catch (error) {
    console.error('Error tracking affiliate click:', error);
    // Fallback to direct URL if tracking fails
    return sportsbookUrls[sportsbookId] || '';
  }
};

export const routeToBet = async (betDetails: BetDetails): Promise<void> => {
  const baseUrl = sportsbookUrls[betDetails.sportsbook.toLowerCase()];
  
  if (!baseUrl) {
    // Fallback to generic search
    window.open(`https://www.google.com/search?q=${betDetails.sportsbook}+${betDetails.team}+betting`, '_blank');
    return;
  }

  try {
    // Get affiliate URL with tracking
    const affiliateUrl = await trackAffiliateClick(betDetails.sportsbook.toLowerCase());
    
    // Construct the URL based on sportsbook
    let targetUrl = affiliateUrl;
    
    // Add specific routing for major sportsbooks
    switch (betDetails.sportsbook.toLowerCase()) {
      case 'draftkings':
        targetUrl += `/sportsbook/featured`;
        break;
      case 'fanduel':
        targetUrl += `/navigation/nba` ; // Can be dynamic based on sport
        break;
      case 'betmgm':
        targetUrl += `/en/sports`;
        break;
      case 'caesars':
        targetUrl += `/us/bet`;
        break;
      default:
        // Use base URL for other sportsbooks
        break;
    }

    // Open in new tab
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Error routing to bet:', error);
    // Fallback to direct URL
    let targetUrl = baseUrl;
    
    switch (betDetails.sportsbook.toLowerCase()) {
      case 'draftkings':
        targetUrl += `/sportsbook/featured`;
        break;
      case 'fanduel':
        targetUrl += `/navigation/nba`;
        break;
      case 'betmgm':
        targetUrl += `/en/sports`;
        break;
      case 'caesars':
        targetUrl += `/us/bet`;
        break;
      default:
        break;
    }
    
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }
};

export const getSportsbookDisplayName = (sportsbook: string): string => {
  const displayNames: { [key: string]: string } = {
    'draftkings': 'DraftKings',
    'fanduel': 'FanDuel',
    'betmgm': 'BetMGM',
    'caesars': 'Caesars',
    'pointsbet': 'PointsBet',
    'unibet': 'Unibet',
    'williamhill': 'William Hill',
    'bovada': 'Bovada',
    'bet365': 'Bet365',
    'barstool': 'Barstool',
    'betrivers': 'BetRivers',
    'superbook': 'SuperBook',
    'wynnbet': 'WynnBET',
    'hardrock': 'Hard Rock',
    'espnbet': 'ESPN BET',
  };
  
  return displayNames[sportsbook.toLowerCase()] || sportsbook;
};