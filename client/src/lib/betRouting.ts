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

export const routeToBet = (betDetails: BetDetails): void => {
  const baseUrl = sportsbookUrls[betDetails.sportsbook.toLowerCase()];
  
  if (!baseUrl) {
    // Fallback to generic search
    window.open(`https://www.google.com/search?q=${betDetails.sportsbook}+${betDetails.team}+betting`, '_blank');
    return;
  }

  // Construct the URL based on sportsbook
  let targetUrl = baseUrl;
  
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