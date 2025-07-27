// Comprehensive sports list for the platform
export const SPORTS_LIST = [
  // Major US Sports
  { id: 'nfl', name: 'NFL', category: 'American Football', icon: '🏈' },
  { id: 'nba', name: 'NBA', category: 'Basketball', icon: '🏀' },
  { id: 'mlb', name: 'MLB', category: 'Baseball', icon: '⚾' },
  { id: 'nhl', name: 'NHL', category: 'Hockey', icon: '🏒' },
  { id: 'wnba', name: 'WNBA', category: 'Basketball', icon: '🏀' },
  { id: 'mls', name: 'MLS', category: 'Soccer', icon: '⚽' },
  
  // College Sports
  { id: 'ncaaf', name: 'NCAA Football', category: 'American Football', icon: '🏈' },
  { id: 'ncaab', name: 'NCAA Basketball', category: 'Basketball', icon: '🏀' },
  { id: 'ncaaw', name: 'NCAA Women\'s Basketball', category: 'Basketball', icon: '🏀' },
  
  // International Soccer
  { id: 'epl', name: 'Premier League', category: 'Soccer', icon: '⚽' },
  { id: 'laliga', name: 'La Liga', category: 'Soccer', icon: '⚽' },
  { id: 'bundesliga', name: 'Bundesliga', category: 'Soccer', icon: '⚽' },
  { id: 'seriea', name: 'Serie A', category: 'Soccer', icon: '⚽' },
  { id: 'ligue1', name: 'Ligue 1', category: 'Soccer', icon: '⚽' },
  { id: 'ucl', name: 'UEFA Champions League', category: 'Soccer', icon: '⚽' },
  { id: 'worldcup', name: 'FIFA World Cup', category: 'Soccer', icon: '⚽' },
  
  // Tennis
  { id: 'atp', name: 'ATP Tour', category: 'Tennis', icon: '🎾' },
  { id: 'wta', name: 'WTA Tour', category: 'Tennis', icon: '🎾' },
  { id: 'wimbledon', name: 'Wimbledon', category: 'Tennis', icon: '🎾' },
  { id: 'usopen_tennis', name: 'US Open Tennis', category: 'Tennis', icon: '🎾' },
  { id: 'frenchopen', name: 'French Open', category: 'Tennis', icon: '🎾' },
  { id: 'australianopen', name: 'Australian Open', category: 'Tennis', icon: '🎾' },
  
  // Motor Sports
  { id: 'f1', name: 'Formula 1', category: 'Motor Sports', icon: '🏎️' },
  { id: 'nascar', name: 'NASCAR', category: 'Motor Sports', icon: '🏁' },
  { id: 'indycar', name: 'IndyCar', category: 'Motor Sports', icon: '🏎️' },
  { id: 'motogp', name: 'MotoGP', category: 'Motor Sports', icon: '🏍️' },
  
  // Combat Sports
  { id: 'ufc', name: 'UFC', category: 'MMA', icon: '🥊' },
  { id: 'boxing', name: 'Boxing', category: 'Boxing', icon: '🥊' },
  { id: 'bellator', name: 'Bellator MMA', category: 'MMA', icon: '🥊' },
  
  // Golf
  { id: 'pga', name: 'PGA Tour', category: 'Golf', icon: '⛳' },
  { id: 'lpga', name: 'LPGA Tour', category: 'Golf', icon: '⛳' },
  { id: 'masters', name: 'The Masters', category: 'Golf', icon: '⛳' },
  { id: 'usopen_golf', name: 'US Open Golf', category: 'Golf', icon: '⛳' },
  
  // Olympics & International
  { id: 'olympics', name: 'Olympics', category: 'Multi-Sport', icon: '🏅' },
  { id: 'rugby', name: 'Rugby', category: 'Rugby', icon: '🏉' },
  { id: 'cricket', name: 'Cricket', category: 'Cricket', icon: '🏏' },
  { id: 'afl', name: 'AFL', category: 'Australian Football', icon: '🏈' },
  
  // Esports
  { id: 'lol', name: 'League of Legends', category: 'Esports', icon: '🎮' },
  { id: 'csgo', name: 'CS:GO', category: 'Esports', icon: '🎮' },
  { id: 'dota2', name: 'Dota 2', category: 'Esports', icon: '🎮' },
  { id: 'valorant', name: 'Valorant', category: 'Esports', icon: '🎮' },
  
  // Other Sports
  { id: 'table_tennis', name: 'Table Tennis', category: 'Table Tennis', icon: '🏓' },
  { id: 'badminton', name: 'Badminton', category: 'Badminton', icon: '🏸' },
  { id: 'volleyball', name: 'Volleyball', category: 'Volleyball', icon: '🏐' },
  { id: 'handball', name: 'Handball', category: 'Handball', icon: '🤾' },
  { id: 'cycling', name: 'Cycling', category: 'Cycling', icon: '🚴' },
  { id: 'swimming', name: 'Swimming', category: 'Swimming', icon: '🏊' },
  { id: 'track_field', name: 'Track & Field', category: 'Athletics', icon: '🏃' },
  { id: 'skiing', name: 'Skiing', category: 'Winter Sports', icon: '⛷️' },
  { id: 'snowboarding', name: 'Snowboarding', category: 'Winter Sports', icon: '🏂' },
  { id: 'curling', name: 'Curling', category: 'Winter Sports', icon: '🥌' },
  { id: 'figure_skating', name: 'Figure Skating', category: 'Winter Sports', icon: '⛸️' },
];

export const SPORTS_CATEGORIES = [
  'All',
  'Trending',
  'New',
  'Most Followed',
  'NFL',
  'NBA',
  'Props',
  'Totals',
  'American Football',
  'Basketball', 
  'Baseball',
  'Hockey',
  'Soccer',
  'Tennis'
];

export const MAJOR_SPORTSBOOKS = [
  { id: 'draftkings', name: 'DraftKings', color: '#FF6B00' },
  { id: 'fanduel', name: 'FanDuel', color: '#0066CC' },
  { id: 'betmgm', name: 'BetMGM', color: '#FFD700' },
  { id: 'caesars', name: 'Caesars', color: '#B8860B' },
  { id: 'pointsbet', name: 'PointsBet', color: '#FF0000' },
  { id: 'barstool', name: 'Barstool', color: '#FF1493' },
  { id: 'wynnbet', name: 'WynnBET', color: '#8B0000' },
  { id: 'unibet', name: 'Unibet', color: '#32CD32' },
  { id: 'betrivers', name: 'BetRivers', color: '#4169E1' },
  { id: 'superdraft', name: 'SuperDraft', color: '#FF4500' },
  { id: 'prizepicks', name: 'PrizePicks', color: '#9370DB' },
  { id: 'underdog', name: 'Underdog', color: '#FF69B4' },
  { id: 'bet365', name: 'Bet365', color: '#006400' },
  { id: 'williamhill', name: 'William Hill', color: '#8B4513' },
  { id: 'betway', name: 'Betway', color: '#FF8C00' },
  { id: 'hardrock', name: 'Hard Rock', color: '#8B008B' },
  { id: 'espnbet', name: 'ESPN BET', color: '#FF0000' },
  { id: 'fliff', name: 'Fliff', color: '#00CED1' }
];