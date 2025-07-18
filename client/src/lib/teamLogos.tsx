// Team logos library for major sports leagues
import React from 'react';

// SVG team logos for major sports
export const getTeamLogo = (teamName: string | undefined, sport: string): React.ReactNode => {
  if (!teamName) return null;
  const normalizedName = teamName.toLowerCase().replace(/\s+/g, '');
  
  // NFL Teams
  if (sport?.toLowerCase() === 'nfl') {
    switch (normalizedName) {
      case 'chiefs': case 'kansascitychiefs':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#E31837"/>
            <path d="M8 10h8l-2 6h-4l-2-6z" fill="#FFB612"/>
          </svg>
        );
      case 'bills': case 'buffalobills':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#00338D"/>
            <path d="M8 8h8v8h-8z" fill="#C60C30"/>
          </svg>
        );
      case 'patriots': case 'newenglandpatriots':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#002244"/>
            <path d="M6 10l6-2 6 2v6l-6 2-6-2v-6z" fill="#C60C30"/>
          </svg>
        );
      case 'cowboys': case 'dallascowboys':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#041E42"/>
            <polygon points="12,6 16,12 12,18 8,12" fill="#869397"/>
          </svg>
        );
      case 'packers': case 'greenbaypackers':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#203731"/>
            <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#FFB612">G</text>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#8B4513"/>
            <ellipse cx="12" cy="12" rx="8" ry="4" fill="#D2691E"/>
          </svg>
        );
    }
  }
  
  // NBA Teams
  if (sport?.toLowerCase() === 'nba') {
    switch (normalizedName) {
      case 'lakers': case 'losangeleslakers':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#552583"/>
            <path d="M8 8h8v8h-8z" fill="#FDB927"/>
          </svg>
        );
      case 'celtics': case 'bostonceltics':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#007A33"/>
            <path d="M6 6h12l-2 12h-8l-2-12z" fill="#BA9653"/>
          </svg>
        );
      case 'warriors': case 'goldenstatewarriors':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#1D428A"/>
            <path d="M8 8h8v8h-8z" fill="#FFC72C"/>
          </svg>
        );
      case 'heat': case 'miamiheat':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#98002E"/>
            <path d="M8 8l8 4-8 4v-8z" fill="#F9A01B"/>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#FF8C00"/>
            <circle cx="12" cy="12" r="3" fill="#8B4513"/>
          </svg>
        );
    }
  }
  
  // MLB Teams
  if (sport?.toLowerCase() === 'mlb') {
    switch (normalizedName) {
      case 'yankees': case 'newyorkyankees':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#132448"/>
            <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#C4CED4">NY</text>
          </svg>
        );
      case 'dodgers': case 'losangelesdodgers':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#005A9C"/>
            <path d="M8 8h8v8h-8z" fill="#FFFFFF"/>
          </svg>
        );
      case 'redsox': case 'bostonredsox':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#BD3039"/>
            <path d="M8 8h8v8h-8z" fill="#0C2340"/>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#228B22"/>
            <circle cx="12" cy="12" r="6" fill="#FFFFFF"/>
            <circle cx="12" cy="12" r="3" fill="#FF0000"/>
          </svg>
        );
    }
  }
  
  // NHL Teams
  if (sport?.toLowerCase() === 'nhl') {
    switch (normalizedName) {
      case 'rangers': case 'newyorkrangers':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#0038A8"/>
            <path d="M8 8h8v8h-8z" fill="#CE1126"/>
          </svg>
        );
      case 'bruins': case 'bostonbruins':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#FFB81C"/>
            <path d="M8 8h8v8h-8z" fill="#000000"/>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#000080"/>
            <ellipse cx="12" cy="12" rx="8" ry="3" fill="#C0C0C0"/>
          </svg>
        );
    }
  }
  
  // Generic sport logo
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#6B7280"/>
      <path d="M8 8h8v8h-8z" fill="#FFFFFF"/>
    </svg>
  );
};