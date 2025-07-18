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