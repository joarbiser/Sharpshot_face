// Team Logo Component with Multi-API Integration
import React from 'react';
import { useTeamLogo } from '@/lib/teamLogoService';

interface TeamLogoProps {
  teamName: string;
  sport?: string;
  league?: string;
  country?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showFallback?: boolean;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({
  teamName,
  sport = 'soccer',
  league,
  country,
  size = 'md',
  className = '',
  showFallback = true
}) => {
  const { logoData, loading, error } = useTeamLogo(teamName, sport, league, country);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const sizeClass = sizeClasses[size];

  if (loading) {
    return (
      <div className={`${sizeClass} ${className} bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex items-center justify-center`}>
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
      </div>
    );
  }

  if (error && !showFallback) {
    return (
      <div className={`${sizeClass} ${className} bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center`}>
        <span className="text-xs text-gray-500">?</span>
      </div>
    );
  }

  return (
    <div className={`${sizeClass} ${className} relative`} title={`${teamName} (${logoData?.source})`}>
      <img
        src={logoData?.logoUrl}
        alt={`${teamName} logo`}
        className={`${sizeClass} object-contain rounded border border-gray-200 dark:border-gray-600 bg-white p-0.5`}
        onError={(e) => {
          if (showFallback) {
            const img = e.target as HTMLImageElement;
            img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName.slice(0, 2))}&background=random&color=fff&size=64&font-size=0.6`;
          }
        }}
      />
      {/* Source indicator for debugging */}
      {process.env.NODE_ENV === 'development' && logoData?.source && (
        <div className="absolute -bottom-1 -right-1 w-2 h-2 text-xs bg-blue-500 rounded-full" 
             title={`Source: ${logoData.source}`}>
        </div>
      )}
    </div>
  );
};

// Enhanced Team Logo with additional info
export const TeamLogoWithInfo: React.FC<TeamLogoProps & { showName?: boolean; showSource?: boolean }> = ({
  showName = false,
  showSource = false,
  ...props
}) => {
  const { logoData, loading } = useTeamLogo(props.teamName, props.sport, props.league, props.country);

  return (
    <div className="flex items-center space-x-2">
      <TeamLogo {...props} />
      {showName && !loading && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {logoData?.teamName || props.teamName}
          </span>
          {showSource && logoData?.source && (
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              via {logoData.source}
            </span>
          )}
        </div>
      )}
    </div>
  );
};