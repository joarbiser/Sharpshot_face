// Sportsbook logos library
import React from 'react';

// Color mapping for sportsbook dots
export const getSportsbookColor = (sportsbookName: string | undefined): string => {
  if (!sportsbookName) return '#6B7280'; // gray-500 default
  const normalizedName = sportsbookName.toLowerCase().replace(/\s+/g, '');
  
  switch (normalizedName) {
    case 'draftkings':
      return '#53D337'; // Green
    case 'fanduel':
      return '#1E3A8A'; // Blue
    case 'betmgm':
      return '#B8860B'; // Dark goldenrod
    case 'caesars':
      return '#8B0000'; // Dark red
    case 'pointsbet':
      return '#FF6B35'; // Orange
    case 'unibet':
      return '#17A2B8'; // Teal
    case 'williamhill':
      return '#0D47A1'; // Dark blue
    case 'bovada':
      return '#000000'; // Black
    case 'bet365':
      return '#FFD23F'; // Yellow
    case 'barstool':
      return '#FF1493'; // Deep pink
    case 'wynn':
      return '#800080'; // Purple
    case 'wynnbet':
      return '#800080'; // Purple
    case 'superbook':
      return '#FF4500'; // Orange red
    case 'betrivers':
      return '#1E88E5'; // Blue
    default:
      return '#6B7280'; // gray-500 fallback
  }
};

// Component for sportsbook dot with tooltip
interface SportsbookDotProps {
  sportsbook: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SportsbookDot: React.FC<SportsbookDotProps> = ({ 
  sportsbook, 
  size = 'md' 
}) => {
  const color = getSportsbookColor(sportsbook);
  const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  
  return (
    <div className="group relative">
      <div 
        className={`${sizeClass} rounded-full cursor-pointer transition-transform hover:scale-110`}
        style={{ backgroundColor: color }}
      />
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
          {sportsbook}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export const getSportsbookLogo = (sportsbookName: string | undefined): React.ReactNode => {
  if (!sportsbookName) return null;
  const normalizedName = sportsbookName.toLowerCase().replace(/\s+/g, '');
  
  switch (normalizedName) {
    case 'draftkings':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#53D337"/>
          <path d="M6 8h12v2H6zm0 4h8v2H6zm0 4h10v2H6z" fill="#000000"/>
        </svg>
      );
      
    case 'fanduel':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#1E3A8A"/>
          <circle cx="12" cy="12" r="6" fill="#FFFFFF"/>
          <circle cx="12" cy="12" r="3" fill="#1E3A8A"/>
        </svg>
      );
      
    case 'betmgm':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#B8860B"/>
          <path d="M6 6h12l-2 12H8l-2-12z" fill="#FFD700"/>
        </svg>
      );
      
    case 'caesars':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#8B0000"/>
          <path d="M6 8h12v8H6z" fill="#FFD700"/>
          <path d="M8 10h8v4H8z" fill="#8B0000"/>
        </svg>
      );
      
    case 'pointsbet':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#FF6B35"/>
          <polygon points="12,6 18,12 12,18 6,12" fill="#FFFFFF"/>
        </svg>
      );
      
    case 'unibet':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#17A2B8"/>
          <path d="M6 8h12v8H6z" fill="#FFFFFF"/>
          <text x="12" y="14" textAnchor="middle" fontSize="8" fill="#17A2B8">U</text>
        </svg>
      );
      
    case 'williamhill':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0D47A1"/>
          <path d="M6 8h12v8H6z" fill="#FFFFFF"/>
          <text x="12" y="14" textAnchor="middle" fontSize="6" fill="#0D47A1">WH</text>
        </svg>
      );
      
    case 'bovada':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#000000"/>
          <path d="M6 8h12v8H6z" fill="#FF0000"/>
        </svg>
      );
      
    case 'betrivers':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#1565C0"/>
          <path d="M6 8h12l-6 8-6-8z" fill="#FFFFFF"/>
        </svg>
      );
      
    case 'barstool':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#FF69B4"/>
          <path d="M6 8h12v8H6z" fill="#000000"/>
        </svg>
      );
      
    case 'wynnbet':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#8B4513"/>
          <path d="M6 8h12v8H6z" fill="#FFD700"/>
        </svg>
      );
      
    case 'sugarhouse':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#E91E63"/>
          <path d="M6 8h12v8H6z" fill="#FFFFFF"/>
        </svg>
      );
      
    case 'betway':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#00C851"/>
          <path d="M6 8h12v8H6z" fill="#000000"/>
        </svg>
      );
      
    case 'tipico':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#FF5722"/>
          <circle cx="12" cy="12" r="6" fill="#FFFFFF"/>
        </svg>
      );
      
    case 'foxbet':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#FF5722"/>
          <path d="M6 8h12v8H6z" fill="#FFFFFF"/>
          <text x="12" y="14" textAnchor="middle" fontSize="8" fill="#FF5722">F</text>
        </svg>
      );
      
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#6B7280"/>
          <path d="M6 8h12v8H6z" fill="#FFFFFF"/>
          <circle cx="12" cy="12" r="2" fill="#6B7280"/>
        </svg>
      );
  }
};