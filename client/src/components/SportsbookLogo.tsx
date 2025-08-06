import { cn } from "@/lib/utils";

interface SportsbookLogoProps {
  sportsbook: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Mapping of sportsbook names to their logo files (matching API names exactly)
const SPORTSBOOK_LOGO_FILES: Record<string, string> = {
  'FanDuel': '/booklogos/fanduel.png',
  'DraftKings': '/booklogos/draftkings.png', 
  'Caesars': '/booklogos/ceasars.png',
  'BetRivers': '/booklogos/betrivers.png',
  'ESPN BET': '/booklogos/espnbet.png',
  'ESPNBET': '/booklogos/espnbet.png', // Alternative API name
  'Fanatics': '/booklogos/fanatics.png',
  'BetOnline': '/booklogos/betonline.jpg',
  'Bovada': '/booklogos/bovada.jpg',
  'PuntNow': '/booklogos/puntnow.png',
  'Sportszino': '/booklogos/sportszino.jpg',
  'SportTrade': '/booklogos/sporttrade.jpg'
};

// SVG Sportsbook Logos (fallback for books without image files)
const SPORTSBOOK_LOGOS: Record<string, React.ComponentType<{ className?: string }>> = {
  'DraftKings': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#FF6600"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[20px] font-bold">DK</text>
    </svg>
  ),
  'FanDuel': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#1E3A8A"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[20px] font-bold">FD</text>
    </svg>
  ),
  'BetMGM': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#B8860B"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[16px] font-bold">MGM</text>
    </svg>
  ),
  'Caesars': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#DC2626"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">CZR</text>
    </svg>
  ),
  'PointsBet': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#EF4444"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">PB</text>
    </svg>
  ),
  'Barstool': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#000000"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">BS</text>
    </svg>
  ),
  'WynnBET': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#7C3AED"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[16px] font-bold">WYN</text>
    </svg>
  ),
  'Unibet': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#10B981"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">UNI</text>
    </svg>
  ),
  'BetRivers': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#0891B2"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">BR</text>
    </svg>
  ),
  'SuperDraft': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#F59E0B"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">SD</text>
    </svg>
  ),
  'PrizePicks': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#8B5CF6"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">PP</text>
    </svg>
  ),
  'Underdog': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#059669"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">UD</text>
    </svg>
  ),
  'Bet365': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#FBBF24"/>
      <text x="50" y="55" textAnchor="middle" className="fill-black text-[16px] font-bold">365</text>
    </svg>
  ),
  'William Hill': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#1E40AF"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">WH</text>
    </svg>
  ),
  'Betway': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#16A34A"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">BW</text>
    </svg>
  ),
  'Hard Rock': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#374151"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">HR</text>
    </svg>
  ),
  'ESPN BET': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#DC2626"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[16px] font-bold">ESPN</text>
    </svg>
  ),
  'Fliff': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="8" fill="#EC4899"/>
      <text x="50" y="55" textAnchor="middle" className="fill-white text-[18px] font-bold">FLF</text>
    </svg>
  )
};

export function SportsbookLogo({ sportsbook, size = "md", className }: SportsbookLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-10 h-10"
  };

  // First check if we have an image file for this sportsbook
  const logoFile = SPORTSBOOK_LOGO_FILES[sportsbook];
  if (logoFile) {
    return (
      <img
        src={logoFile}
        alt={`${sportsbook} logo`}
        className={cn(
          "object-contain rounded",
          sizeClasses[size],
          className
        )}
        onError={(e) => {
          // If image fails to load, hide the element
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  // Fallback to SVG logos for books without image files
  const LogoComponent = SPORTSBOOK_LOGOS[sportsbook];
  if (LogoComponent) {
    return <LogoComponent className={cn(sizeClasses[size], className)} />;
  }

  // Skip rendering if no logo file and no SVG fallback
  return null;
}

// Dot version for smaller displays
export function SportsbookDot({ sportsbook, size = "md" }: { sportsbook: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  // Color mapping for dot indicators
  const colorMapping: Record<string, string> = {
    'DraftKings': 'bg-orange-500',
    'FanDuel': 'bg-blue-600',
    'BetMGM': 'bg-yellow-600',
    'Caesars': 'bg-red-600',
    'PointsBet': 'bg-red-500',
    'Barstool': 'bg-black',
    'WynnBET': 'bg-purple-600',
    'Unibet': 'bg-green-500',
    'BetRivers': 'bg-cyan-600',
    'SuperDraft': 'bg-amber-500',
    'PrizePicks': 'bg-purple-500',
    'Underdog': 'bg-emerald-600',
    'Bet365': 'bg-yellow-400',
    'William Hill': 'bg-blue-700',
    'Betway': 'bg-green-600',
    'Hard Rock': 'bg-gray-600',
    'ESPN BET': 'bg-red-600',
    'Fliff': 'bg-pink-500'
  };

  return (
    <div 
      className={cn(
        "rounded-full",
        sizeClasses[size],
        colorMapping[sportsbook] || 'bg-gray-500'
      )}
      title={sportsbook}
    />
  );
}