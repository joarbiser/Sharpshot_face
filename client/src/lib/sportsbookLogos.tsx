// Sportsbook logos library
import React from 'react';

export const getSportsbookLogo = (sportsbookName: string): React.ReactNode => {
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