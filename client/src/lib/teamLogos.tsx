// Team logos library using external image sources
import React from 'react';

// Get team logo from external sources (ESPN CDN, TheSportsDB, etc.)
export const getTeamLogo = (teamName: string | undefined, sport: string): React.ReactNode => {
  if (!teamName) return null;
  
  const logoUrl = getTeamLogoUrl(teamName, sport);
  
  if (!logoUrl) {
    // Return generic sport icon if no logo found
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-gray-600">
          {sport?.toUpperCase().slice(0, 2)}
        </span>
      </div>
    );
  }
  
  return (
    <img 
      src={logoUrl}
      alt={`${teamName} logo`}
      className="w-8 h-8 rounded-full object-cover"
      onError={(e) => {
        // Fallback to generic icon if image fails to load
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};

// Get team logo URL from various sources
export const getTeamLogoUrl = (teamName: string, sport: string): string | null => {
  const normalizedName = teamName.toLowerCase().replace(/\s+/g, '');
  const sportLower = sport.toLowerCase();
  
  // ESPN CDN URLs for major teams
  const espnLogos: Record<string, string> = {
    // NFL Teams
    'chiefs': 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png',
    'kansascitychiefs': 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png',
    'bills': 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png',
    'buffalobills': 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png',
    'patriots': 'https://a.espncdn.com/i/teamlogos/nfl/500/ne.png',
    'newenglandpatriots': 'https://a.espncdn.com/i/teamlogos/nfl/500/ne.png',
    'dolphins': 'https://a.espncdn.com/i/teamlogos/nfl/500/mia.png',
    'miamidolphins': 'https://a.espncdn.com/i/teamlogos/nfl/500/mia.png',
    'jets': 'https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png',
    'newyorkjets': 'https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png',
    'ravens': 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png',
    'baltimoreravens': 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png',
    'steelers': 'https://a.espncdn.com/i/teamlogos/nfl/500/pit.png',
    'pittsburghsteelers': 'https://a.espncdn.com/i/teamlogos/nfl/500/pit.png',
    'browns': 'https://a.espncdn.com/i/teamlogos/nfl/500/cle.png',
    'clevelandbrowns': 'https://a.espncdn.com/i/teamlogos/nfl/500/cle.png',
    'bengals': 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png',
    'cincinnatibengals': 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png',
    'titans': 'https://a.espncdn.com/i/teamlogos/nfl/500/ten.png',
    'tennesseetitans': 'https://a.espncdn.com/i/teamlogos/nfl/500/ten.png',
    'colts': 'https://a.espncdn.com/i/teamlogos/nfl/500/ind.png',
    'indianapoliscolts': 'https://a.espncdn.com/i/teamlogos/nfl/500/ind.png',
    'jaguars': 'https://a.espncdn.com/i/teamlogos/nfl/500/jax.png',
    'jacksonvillejaguars': 'https://a.espncdn.com/i/teamlogos/nfl/500/jax.png',
    'texans': 'https://a.espncdn.com/i/teamlogos/nfl/500/hou.png',
    'houstontexans': 'https://a.espncdn.com/i/teamlogos/nfl/500/hou.png',
    'broncos': 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png',
    'denverbroncos': 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png',
    'chargers': 'https://a.espncdn.com/i/teamlogos/nfl/500/lac.png',
    'losangeleschargers': 'https://a.espncdn.com/i/teamlogos/nfl/500/lac.png',
    'raiders': 'https://a.espncdn.com/i/teamlogos/nfl/500/lv.png',
    'lasvegasraiders': 'https://a.espncdn.com/i/teamlogos/nfl/500/lv.png',
    
    // NBA Teams
    'lakers': 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
    'losangeleslakers': 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
    'warriors': 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png',
    'goldenstatewarriors': 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png',
    'celtics': 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
    'bostonceltics': 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
    'heat': 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png',
    'miamiheat': 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png',
    'knicks': 'https://a.espncdn.com/i/teamlogos/nba/500/ny.png',
    'newyorkknicks': 'https://a.espncdn.com/i/teamlogos/nba/500/ny.png',
    'nets': 'https://a.espncdn.com/i/teamlogos/nba/500/bkn.png',
    'brooklynnets': 'https://a.espncdn.com/i/teamlogos/nba/500/bkn.png',
    'bulls': 'https://a.espncdn.com/i/teamlogos/nba/500/chi.png',
    'chicagobulls': 'https://a.espncdn.com/i/teamlogos/nba/500/chi.png',
    'sixers': 'https://a.espncdn.com/i/teamlogos/nba/500/phi.png',
    'philadelphia76ers': 'https://a.espncdn.com/i/teamlogos/nba/500/phi.png',
    'pacers': 'https://a.espncdn.com/i/teamlogos/nba/500/ind.png',
    'indianapacers': 'https://a.espncdn.com/i/teamlogos/nba/500/ind.png',
    
    // MLB Teams
    'yankees': 'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png',
    'newyorkyankees': 'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png',
    'dodgers': 'https://a.espncdn.com/i/teamlogos/mlb/500/lad.png',
    'losangelesdodgers': 'https://a.espncdn.com/i/teamlogos/mlb/500/lad.png',
    'redsox': 'https://a.espncdn.com/i/teamlogos/mlb/500/bos.png',
    'bostonredsox': 'https://a.espncdn.com/i/teamlogos/mlb/500/bos.png',
    'astros': 'https://a.espncdn.com/i/teamlogos/mlb/500/hou.png',
    'houstonastros': 'https://a.espncdn.com/i/teamlogos/mlb/500/hou.png',
    'mets': 'https://a.espncdn.com/i/teamlogos/mlb/500/nym.png',
    'newyorkmets': 'https://a.espncdn.com/i/teamlogos/mlb/500/nym.png',
    'braves': 'https://a.espncdn.com/i/teamlogos/mlb/500/atl.png',
    'atlantabraves': 'https://a.espncdn.com/i/teamlogos/mlb/500/atl.png',
    
    // NHL Teams
    'rangers': 'https://a.espncdn.com/i/teamlogos/nhl/500/nyr.png',
    'newyorkrangers': 'https://a.espncdn.com/i/teamlogos/nhl/500/nyr.png',
    'bruins': 'https://a.espncdn.com/i/teamlogos/nhl/500/bos.png',
    'bostonbruins': 'https://a.espncdn.com/i/teamlogos/nhl/500/bos.png',
    'penguins': 'https://a.espncdn.com/i/teamlogos/nhl/500/pit.png',
    'pittsburghpenguins': 'https://a.espncdn.com/i/teamlogos/nhl/500/pit.png',
    'lightning': 'https://a.espncdn.com/i/teamlogos/nhl/500/tb.png',
    'tampaybaylightning': 'https://a.espncdn.com/i/teamlogos/nhl/500/tb.png',
    'panthers': 'https://a.espncdn.com/i/teamlogos/nhl/500/fla.png',
    'floridapanthers': 'https://a.espncdn.com/i/teamlogos/nhl/500/fla.png',
    'oilers': 'https://a.espncdn.com/i/teamlogos/nhl/500/edm.png',
    'edmontonoilers': 'https://a.espncdn.com/i/teamlogos/nhl/500/edm.png',
    'hurricanes': 'https://a.espncdn.com/i/teamlogos/nhl/500/car.png',
    'carolinahurricanes': 'https://a.espncdn.com/i/teamlogos/nhl/500/car.png',
    'capitals': 'https://a.espncdn.com/i/teamlogos/nhl/500/wsh.png',
    'washingtoncapitals': 'https://a.espncdn.com/i/teamlogos/nhl/500/wsh.png',
    'mapleleafs': 'https://a.espncdn.com/i/teamlogos/nhl/500/tor.png',
    'torontomapleleafs': 'https://a.espncdn.com/i/teamlogos/nhl/500/tor.png',
    'senators': 'https://a.espncdn.com/i/teamlogos/nhl/500/ott.png',
    'ottawasenators': 'https://a.espncdn.com/i/teamlogos/nhl/500/ott.png',
    'canadiens': 'https://a.espncdn.com/i/teamlogos/nhl/500/mtl.png',
    'montrealcanadiens': 'https://a.espncdn.com/i/teamlogos/nhl/500/mtl.png',
  };

  // Check if we have a direct match
  if (espnLogos[normalizedName]) {
    return espnLogos[normalizedName];
  }

  // Try to find a partial match
  const partialMatch = Object.keys(espnLogos).find(key => 
    key.includes(normalizedName) || normalizedName.includes(key)
  );
  
  if (partialMatch) {
    return espnLogos[partialMatch];
  }

  // Return null if no match found
  return null;
};