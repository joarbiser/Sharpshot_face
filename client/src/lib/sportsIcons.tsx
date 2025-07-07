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
    'mlb': <SiMlb size={size} className="text-blue-600" />,
    'nba': <SiNba size={size} className="text-red-600" />,
    'nfl': <Target size={size} className="text-blue-800" />,
    'nhl': <Trophy size={size} className="text-orange-600" />,
    'wnba': <SiNba size={size} className="text-orange-500" />,
    'soccer': <Target size={size} className="text-green-600" />,
    'football': <Target size={size} className="text-green-600" />,
    'tennis': <Zap size={size} className="text-yellow-600" />,
    'golf': <Star size={size} className="text-green-700" />,
    'boxing': <Trophy size={size} className="text-red-700" />,
    'mma': <Trophy size={size} className="text-red-700" />,
    'cricket': <Target size={size} className="text-blue-500" />,
    'hockey': <Trophy size={size} className="text-blue-600" />,
    'basketball': <SiNba size={size} className="text-orange-600" />,
    'baseball': <SiMlb size={size} className="text-blue-500" />,
  };
  
  return iconMap[sport?.toLowerCase()] || <Trophy size={size} className="text-gray-600" />;
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