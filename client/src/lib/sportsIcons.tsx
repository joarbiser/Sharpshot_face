import { 
  SiMlb, 
  SiNba
} from 'react-icons/si';
import { 
  Trophy,
  Zap,
  Target,
  Star
} from 'lucide-react';

export const getSportIcon = (sport: string, size = 20) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'mlb': <SiMlb size={size} className="text-gold" />,
    'nba': <SiNba size={size} className="text-gold" />,
    'nfl': <Target size={size} className="text-gold" />,
    'nhl': <Trophy size={size} className="text-gold" />,
    'wnba': <SiNba size={size} className="text-gold-light" />,
    'soccer': <Target size={size} className="text-gold" />,
    'football': <Target size={size} className="text-gold" />,
    'tennis': <Zap size={size} className="text-gold" />,
    'golf': <Star size={size} className="text-gold" />,
    'boxing': <Trophy size={size} className="text-gold-dark" />,
    'mma': <Trophy size={size} className="text-gold-dark" />,
    'cricket': <Target size={size} className="text-gold" />,
    'hockey': <Trophy size={size} className="text-gold" />,
    'basketball': <SiNba size={size} className="text-gold" />,
    'baseball': <SiMlb size={size} className="text-gold" />,
  };
  
  return iconMap[sport?.toLowerCase()] || <Trophy size={size} className="text-gold" />;
};

export const getTeamLogo = (teamName: string, size = 24) => {
  // For now, return sport icons - can be enhanced with actual team logos
  const teamMap: { [key: string]: JSX.Element } = {
    'astros': <SiMlb size={size} className="text-orange-600" />,
    'guardians': <SiMlb size={size} className="text-red-600" />,
    'rangers': <SiMlb size={size} className="text-blue-600" />,
    'angels': <SiMlb size={size} className="text-red-500" />,
    'diamondbacks': <SiMlb size={size} className="text-red-800" />,
    'padres': <SiMlb size={size} className="text-yellow-600" />,
    'phillies': <SiMlb size={size} className="text-red-700" />,
    'giants': <SiMlb size={size} className="text-orange-500" />,
    'wings': <SiNba size={size} className="text-red-600" />,
    'mercury': <SiNba size={size} className="text-purple-600" />,
  };
  
  return teamMap[teamName?.toLowerCase()] || <Trophy size={size} className="text-gray-600" />;
};