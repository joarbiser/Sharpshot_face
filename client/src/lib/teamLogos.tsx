// Team logo components using ESPN and external APIs for comprehensive team coverage
import { ShieldIcon, Trophy } from "lucide-react";

// Comprehensive team logo mappings using external APIs
const getESPNLogoUrl = (teamId: string, sport: string = 'nfl') => {
  return `https://a.espncdn.com/i/teamlogos/${sport}/500/${teamId}.png`;
};

const getTheSportsDBLogoUrl = (teamName: string) => {
  const cleanName = teamName.replace(/\s+/g, '_').toLowerCase();
  return `https://www.thesportsdb.com/images/media/team/badge/${cleanName}.png`;
};

const getApiSportsLogoUrl = (teamId: string) => {
  return `https://media.api-sports.io/football/teams/${teamId}.png`;
};

// NFL Team mappings with ESPN IDs
const nflTeams: { [key: string]: { id: string; name: string; city: string } } = {
  'cardinals': { id: 'ari', name: 'Cardinals', city: 'Arizona' },
  'falcons': { id: 'atl', name: 'Falcons', city: 'Atlanta' },
  'ravens': { id: 'bal', name: 'Ravens', city: 'Baltimore' },
  'bills': { id: 'buf', name: 'Bills', city: 'Buffalo' },
  'panthers': { id: 'car', name: 'Panthers', city: 'Carolina' },
  'bears': { id: 'chi', name: 'Bears', city: 'Chicago' },
  'bengals': { id: 'cin', name: 'Bengals', city: 'Cincinnati' },
  'browns': { id: 'cle', name: 'Browns', city: 'Cleveland' },
  'cowboys': { id: 'dal', name: 'Cowboys', city: 'Dallas' },
  'broncos': { id: 'den', name: 'Broncos', city: 'Denver' },
  'lions': { id: 'det', name: 'Lions', city: 'Detroit' },
  'packers': { id: 'gb', name: 'Packers', city: 'Green Bay' },
  'texans': { id: 'hou', name: 'Texans', city: 'Houston' },
  'colts': { id: 'ind', name: 'Colts', city: 'Indianapolis' },
  'jaguars': { id: 'jax', name: 'Jaguars', city: 'Jacksonville' },
  'chiefs': { id: 'kc', name: 'Chiefs', city: 'Kansas City' },
  'raiders': { id: 'lv', name: 'Raiders', city: 'Las Vegas' },
  'chargers': { id: 'lac', name: 'Chargers', city: 'Los Angeles' },
  'rams': { id: 'lar', name: 'Rams', city: 'Los Angeles' },
  'dolphins': { id: 'mia', name: 'Dolphins', city: 'Miami' },
  'vikings': { id: 'min', name: 'Vikings', city: 'Minnesota' },
  'patriots': { id: 'ne', name: 'Patriots', city: 'New England' },
  'saints': { id: 'no', name: 'Saints', city: 'New Orleans' },
  'giants': { id: 'nyg', name: 'Giants', city: 'New York' },
  'jets': { id: 'nyj', name: 'Jets', city: 'New York' },
  'eagles': { id: 'phi', name: 'Eagles', city: 'Philadelphia' },
  'steelers': { id: 'pit', name: 'Steelers', city: 'Pittsburgh' },
  'commanders': { id: 'was', name: 'Commanders', city: 'Washington' },
  '49ers': { id: 'sf', name: '49ers', city: 'San Francisco' },
  'seahawks': { id: 'sea', name: 'Seahawks', city: 'Seattle' },
  'buccaneers': { id: 'tb', name: 'Buccaneers', city: 'Tampa Bay' },
  'titans': { id: 'ten', name: 'Titans', city: 'Tennessee' }
};

// NBA Team mappings
const nbaTeams: { [key: string]: { id: string; name: string; city: string } } = {
  'hawks': { id: 'atl', name: 'Hawks', city: 'Atlanta' },
  'celtics': { id: 'bos', name: 'Celtics', city: 'Boston' },
  'nets': { id: 'bkn', name: 'Nets', city: 'Brooklyn' },
  'hornets': { id: 'cha', name: 'Hornets', city: 'Charlotte' },
  'bulls': { id: 'chi', name: 'Bulls', city: 'Chicago' },
  'cavaliers': { id: 'cle', name: 'Cavaliers', city: 'Cleveland' },
  'mavericks': { id: 'dal', name: 'Mavericks', city: 'Dallas' },
  'nuggets': { id: 'den', name: 'Nuggets', city: 'Denver' },
  'pistons': { id: 'det', name: 'Pistons', city: 'Detroit' },
  'warriors': { id: 'gs', name: 'Warriors', city: 'Golden State' },
  'rockets': { id: 'hou', name: 'Rockets', city: 'Houston' },
  'pacers': { id: 'ind', name: 'Pacers', city: 'Indiana' },
  'clippers': { id: 'lac', name: 'Clippers', city: 'LA Clippers' },
  'lakes': { id: 'lal', name: 'Lakers', city: 'Los Angeles' },
  'grizzlies': { id: 'mem', name: 'Grizzlies', city: 'Memphis' },
  'heat': { id: 'mia', name: 'Heat', city: 'Miami' },
  'bucks': { id: 'mil', name: 'Bucks', city: 'Milwaukee' },
  'timberwolves': { id: 'min', name: 'Timberwolves', city: 'Minnesota' },
  'pelicans': { id: 'no', name: 'Pelicans', city: 'New Orleans' },
  'knicks': { id: 'ny', name: 'Knicks', city: 'New York' },
  'thunder': { id: 'okc', name: 'Thunder', city: 'Oklahoma City' },
  'magic': { id: 'orl', name: 'Magic', city: 'Orlando' },
  '76ers': { id: 'phi', name: '76ers', city: 'Philadelphia' },
  'suns': { id: 'phx', name: 'Suns', city: 'Phoenix' },
  'blazers': { id: 'por', name: 'Trail Blazers', city: 'Portland' },
  'kings': { id: 'sac', name: 'Kings', city: 'Sacramento' },
  'spurs': { id: 'sa', name: 'Spurs', city: 'San Antonio' },
  'raptors': { id: 'tor', name: 'Raptors', city: 'Toronto' },
  'jazz': { id: 'utah', name: 'Jazz', city: 'Utah' },
  'wizards': { id: 'was', name: 'Wizards', city: 'Washington' }
};

// MLB Team mappings
const mlbTeams: { [key: string]: { id: string; name: string; city: string } } = {
  'diamondbacks': { id: 'ari', name: 'Diamondbacks', city: 'Arizona' },
  'braves': { id: 'atl', name: 'Braves', city: 'Atlanta' },
  'orioles': { id: 'bal', name: 'Orioles', city: 'Baltimore' },
  'red_sox': { id: 'bos', name: 'Red Sox', city: 'Boston' },
  'cubs': { id: 'chc', name: 'Cubs', city: 'Chicago' },
  'white_sox': { id: 'cws', name: 'White Sox', city: 'Chicago' },
  'reds': { id: 'cin', name: 'Reds', city: 'Cincinnati' },
  'guardians': { id: 'cle', name: 'Guardians', city: 'Cleveland' },
  'rockies': { id: 'col', name: 'Rockies', city: 'Colorado' },
  'tigers': { id: 'det', name: 'Tigers', city: 'Detroit' },
  'astros': { id: 'hou', name: 'Astros', city: 'Houston' },
  'royals': { id: 'kc', name: 'Royals', city: 'Kansas City' },
  'angels': { id: 'laa', name: 'Angels', city: 'Los Angeles' },
  'dodgers': { id: 'lad', name: 'Dodgers', city: 'Los Angeles' },
  'marlins': { id: 'mia', name: 'Marlins', city: 'Miami' },
  'brewers': { id: 'mil', name: 'Brewers', city: 'Milwaukee' },
  'twins': { id: 'min', name: 'Twins', city: 'Minnesota' },
  'mets': { id: 'nym', name: 'Mets', city: 'New York' },
  'yankees': { id: 'nyy', name: 'Yankees', city: 'New York' },
  'athletics': { id: 'oak', name: 'Athletics', city: 'Oakland' },
  'phillies': { id: 'phi', name: 'Phillies', city: 'Philadelphia' },
  'pirates': { id: 'pit', name: 'Pirates', city: 'Pittsburgh' },
  'padres': { id: 'sd', name: 'Padres', city: 'San Diego' },
  'giants': { id: 'sf', name: 'Giants', city: 'San Francisco' },
  'mariners': { id: 'sea', name: 'Mariners', city: 'Seattle' },
  'cardinals': { id: 'stl', name: 'Cardinals', city: 'St. Louis' },
  'rays': { id: 'tb', name: 'Rays', city: 'Tampa Bay' },
  'rangers': { id: 'tex', name: 'Rangers', city: 'Texas' },
  'blue_jays': { id: 'tor', name: 'Blue Jays', city: 'Toronto' },
  'nationals': { id: 'was', name: 'Nationals', city: 'Washington' }
};

// NHL Team mappings
const nhlTeams: { [key: string]: { id: string; name: string; city: string } } = {
  'ducks': { id: 'ana', name: 'Ducks', city: 'Anaheim' },
  'coyotes': { id: 'ari', name: 'Coyotes', city: 'Arizona' },
  'bruins': { id: 'bos', name: 'Bruins', city: 'Boston' },
  'sabres': { id: 'buf', name: 'Sabres', city: 'Buffalo' },
  'flames': { id: 'cgy', name: 'Flames', city: 'Calgary' },
  'hurricanes': { id: 'car', name: 'Hurricanes', city: 'Carolina' },
  'blackhawks': { id: 'chi', name: 'Blackhawks', city: 'Chicago' },
  'avalanche': { id: 'col', name: 'Avalanche', city: 'Colorado' },
  'blue_jackets': { id: 'cbj', name: 'Blue Jackets', city: 'Columbus' },
  'stars': { id: 'dal', name: 'Stars', city: 'Dallas' },
  'red_wings': { id: 'det', name: 'Red Wings', city: 'Detroit' },
  'oilers': { id: 'edm', name: 'Oilers', city: 'Edmonton' },
  'panthers': { id: 'fla', name: 'Panthers', city: 'Florida' },
  'kings': { id: 'lak', name: 'Kings', city: 'Los Angeles' },
  'wild': { id: 'min', name: 'Wild', city: 'Minnesota' },
  'canadiens': { id: 'mtl', name: 'Canadiens', city: 'Montreal' },
  'predators': { id: 'nsh', name: 'Predators', city: 'Nashville' },
  'devils': { id: 'njd', name: 'Devils', city: 'New Jersey' },
  'islanders': { id: 'nyi', name: 'Islanders', city: 'New York' },
  'rangers': { id: 'nyr', name: 'Rangers', city: 'New York' },
  'senators': { id: 'ott', name: 'Senators', city: 'Ottawa' },
  'flyers': { id: 'phi', name: 'Flyers', city: 'Philadelphia' },
  'penguins': { id: 'pit', name: 'Penguins', city: 'Pittsburgh' },
  'sharks': { id: 'sjs', name: 'Sharks', city: 'San Jose' },
  'kraken': { id: 'sea', name: 'Kraken', city: 'Seattle' },
  'blues': { id: 'stl', name: 'Blues', city: 'St. Louis' },
  'lightning': { id: 'tbl', name: 'Lightning', city: 'Tampa Bay' },
  'maple_leafs': { id: 'tor', name: 'Maple Leafs', city: 'Toronto' },
  'canucks': { id: 'van', name: 'Canucks', city: 'Vancouver' },
  'golden_knights': { id: 'vgk', name: 'Golden Knights', city: 'Vegas' },
  'capitals': { id: 'was', name: 'Capitals', city: 'Washington' },
  'jets': { id: 'wpg', name: 'Jets', city: 'Winnipeg' }
};

// Soccer/Football Team mappings (Premier League, MLS, etc.)
const soccerTeams: { [key: string]: { id: string; name: string; city: string } } = {
  // Premier League
  'arsenal': { id: 'arsenal', name: 'Arsenal', city: 'London' },
  'chelsea': { id: 'chelsea', name: 'Chelsea', city: 'London' },
  'manchester_united': { id: 'man_utd', name: 'Manchester United', city: 'Manchester' },
  'manchester_city': { id: 'man_city', name: 'Manchester City', city: 'Manchester' },
  'liverpool': { id: 'liverpool', name: 'Liverpool', city: 'Liverpool' },
  'tottenham': { id: 'tottenham', name: 'Tottenham', city: 'London' },
  'newcastle': { id: 'newcastle', name: 'Newcastle United', city: 'Newcastle' },
  'west_ham': { id: 'west_ham', name: 'West Ham United', city: 'London' },
  'brighton': { id: 'brighton', name: 'Brighton', city: 'Brighton' },
  'crystal_palace': { id: 'crystal_palace', name: 'Crystal Palace', city: 'London' },
  
  // MLS
  'lafc': { id: 'lafc', name: 'LAFC', city: 'Los Angeles' },
  'la_galaxy': { id: 'la_galaxy', name: 'LA Galaxy', city: 'Los Angeles' },
  'inter_miami': { id: 'inter_miami', name: 'Inter Miami', city: 'Miami' },
  'atlanta_united': { id: 'atlanta_utd', name: 'Atlanta United', city: 'Atlanta' },
  'seattle_sounders': { id: 'seattle', name: 'Seattle Sounders', city: 'Seattle' },
  'portland_timbers': { id: 'portland', name: 'Portland Timbers', city: 'Portland' },
  'new_york_city': { id: 'nycfc', name: 'New York City FC', city: 'New York' },
  'new_york_red_bulls': { id: 'ny_red_bulls', name: 'New York Red Bulls', city: 'New York' },
  'toronto_fc': { id: 'toronto', name: 'Toronto FC', city: 'Toronto' },
  'montreal_impact': { id: 'montreal', name: 'CF Montreal', city: 'Montreal' },
  
  // International
  'real_madrid': { id: 'real_madrid', name: 'Real Madrid', city: 'Madrid' },
  'barcelona': { id: 'barcelona', name: 'FC Barcelona', city: 'Barcelona' },
  'bayern_munich': { id: 'bayern', name: 'Bayern Munich', city: 'Munich' },
  'psg': { id: 'psg', name: 'Paris Saint-Germain', city: 'Paris' },
  'juventus': { id: 'juventus', name: 'Juventus', city: 'Turin' },
  'ac_milan': { id: 'ac_milan', name: 'AC Milan', city: 'Milan' },
  'inter_milan': { id: 'inter_milan', name: 'Inter Milan', city: 'Milan' }
};

interface TeamLogoProps {
  teamName: string;
  sport?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getTeamMapping = (sport: string = 'nfl') => {
  switch (sport.toLowerCase()) {
    case 'nfl':
    case 'football':
    case 'american_football':
      return nflTeams;
    case 'nba':
    case 'basketball':
      return nbaTeams;
    case 'mlb':
    case 'baseball':
      return mlbTeams;
    case 'nhl':
    case 'hockey':
    case 'ice_hockey':
      return nhlTeams;
    case 'soccer':
    case 'football_soccer':
    case 'mls':
    case 'premier_league':
    case 'fifa':
      return soccerTeams;
    default:
      return nflTeams;
  }
};

export const TeamLogo: React.FC<TeamLogoProps> = ({ 
  teamName, 
  sport = 'nfl', 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  // Handle undefined/null teamName
  if (!teamName) {
    return <Trophy className={sizeClasses[size]} />;
  }

  // Clean team name for matching
  const cleanTeamName = teamName.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');

  const teamMapping = getTeamMapping(sport);
  const teamData = teamMapping[cleanTeamName];

  if (!teamData) {
    // Fallback to generic logo for unknown teams
    return (
      <div className={`${sizeClasses[size]} flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded ${className}`}>
        <ShieldIcon className="w-4 h-4 text-gray-500" />
      </div>
    );
  }

  const logoUrl = getESPNLogoUrl(teamData.id, sport.toLowerCase());

  return (
    <img
      src={logoUrl}
      alt={`${teamData.city} ${teamData.name} logo`}
      className={`${sizeClasses[size]} object-contain ${className}`}
      onError={(e) => {
        // Fallback to TheSportsDB if ESPN fails
        const target = e.target as HTMLImageElement;
        if (!target.src.includes('thesportsdb.com')) {
          target.src = getTheSportsDBLogoUrl(teamName);
        } else {
          // Final fallback to shield icon
          target.style.display = 'none';
          const fallback = target.nextSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }
      }}
    />
  );
};

// Helper function to get team logo URL for external use
export const getTeamLogoUrl = (teamName: string, sport: string = 'nfl'): string => {
  const cleanTeamName = teamName.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');

  const teamMapping = getTeamMapping(sport);
  const teamData = teamMapping[cleanTeamName];

  if (!teamData) {
    return getTheSportsDBLogoUrl(teamName);
  }

  return getESPNLogoUrl(teamData.id, sport.toLowerCase());
};

// Enhanced soccer team logo URL for better coverage  
export const getSoccerTeamLogoUrl = (teamName: string): string => {
  const cleanTeamName = teamName.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');

  const soccerMapping = soccerTeams[cleanTeamName];
  
  if (soccerMapping) {
    // Try ESPN first for major teams
    return `https://a.espncdn.com/i/teamlogos/soccer/500/${soccerMapping.id}.png`;
  }
  
  // Fallback to TheSportsDB
  return getTheSportsDBLogoUrl(teamName);
};

// Export team mappings for external use
export { nflTeams, nbaTeams, mlbTeams, nhlTeams, soccerTeams };

export default TeamLogo;