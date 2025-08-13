import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, TrendingUp, Play, Users, Trophy, Globe, AlertCircle, Star, Maximize, X, Volume2, Pause } from "lucide-react";
import type { Game, Event, Asset } from "@shared/schema";
import { SPORTS_LIST, SPORTS_CATEGORIES } from '@/lib/sports';
import { formatInUserTimezone, getUserTimezone, formatGameTime, getTimeUntilGame, TimezoneInfo } from '@/lib/timezone';
import { TeamLogo } from '@/lib/teamLogos';
import { getSportsbookLogo } from '@/lib/sportsbookLogos';

const SPORTS = SPORTS_LIST;

export default function Sports() {
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("today");
  const [userTimezone, setUserTimezone] = useState<TimezoneInfo | null>(null);
  const [fullscreenVideo, setFullscreenVideo] = useState<Asset | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Get user's timezone on component mount
    setUserTimezone(getUserTimezone());
  }, []);

  // Handle escape key for fullscreen exit
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && fullscreenVideo) {
        setFullscreenVideo(null);
        setIsPlaying(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenVideo]);

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // Check if URL is embeddable or can be handled in-app
  const isEmbeddableVideo = (url: string): boolean => {
    if (!url) return false;
    
    // YouTube URLs are embeddable
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return true;
    }
    
    // Vimeo URLs are embeddable
    if (url.includes('vimeo.com')) {
      return true;
    }
    
    // Direct video files are embeddable
    if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
      return true;
    }
    
    // Max URLs - we'll try to embed them in our modal
    if (url.includes('max.com')) {
      return true;
    }
    
    // Other streaming platforms we can attempt to handle
    if (url.includes('hulu.com') || url.includes('netflix.com') || url.includes('amazon.com')) {
      return true;
    }
    
    return false;
  };

  // Get video URL from asset - now handles more platforms
  const getVideoUrl = (asset: Asset): string | null => {
    if (asset.url) {
      // If it's a YouTube URL, extract the video ID and create embed URL
      const videoId = getYouTubeVideoId(asset.url);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
      }
      
      // For Vimeo URLs
      if (asset.url.includes('vimeo.com')) {
        const vimeoId = asset.url.split('/').pop();
        return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
      }
      
      // For direct video files
      if (asset.url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
        return asset.url;
      }
      
      // For Max URLs - return the original URL to be handled in iframe
      if (asset.url.includes('max.com')) {
        return asset.url;
      }
      
      // For other streaming platforms - attempt direct embedding
      if (asset.url.includes('hulu.com') || asset.url.includes('netflix.com') || asset.url.includes('amazon.com')) {
        return asset.url;
      }
      
      // Return the original URL for any other case
      return asset.url;
    }
    
    // If no URL but has assetID, try to construct YouTube URL
    if (asset.assetID && typeof asset.assetID === 'string') {
      return `https://www.youtube.com/embed/${asset.assetID}?autoplay=1&controls=1&rel=0`;
    }
    
    return null;
  };

  // Get external video URL for opening in new tab
  const getExternalVideoUrl = (asset: Asset): string | null => {
    return asset.url || null;
  };

  const playVideo = (highlight: Asset) => {
    const videoUrl = getVideoUrl(highlight);
    
    // Always try to open in modal first
    if (videoUrl) {
      setFullscreenVideo(highlight);
      setIsPlaying(true);
    }
  };

  const closeVideo = () => {
    setFullscreenVideo(null);
    setIsPlaying(false);
  };

  // Check if user is authenticated
  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  // Fetch today's games
  const { data: todayGames, isLoading: todayLoading } = useQuery({
    queryKey: ["/api/sports/games/today", selectedSport],
    queryFn: async () => {
      const url = selectedSport === "all" 
        ? "/api/sports/games/today"
        : `/api/sports/games/today?sport=${selectedSport}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch today's games");
      return response.json();
    },
    enabled: activeTab === "today",
  });

  // Fetch recent events
  const { data: recentEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ["/api/sports/events/recent"],
    queryFn: async () => {
      const response = await fetch("/api/sports/events/recent?count=20");
      if (!response.ok) throw new Error("Failed to fetch recent events");
      return response.json();
    },
    enabled: activeTab === "events",
  });

  // Fetch recent highlights (only for signed-in users)
  const { data: recentHighlights, isLoading: highlightsLoading } = useQuery({
    queryKey: ["/api/sports/highlights/recent", selectedSport],
    queryFn: async () => {
      const url = selectedSport === "all"
        ? "/api/sports/highlights/recent"
        : `/api/sports/highlights/recent?sport=${selectedSport}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch recent highlights");
      return response.json();
    },
    enabled: activeTab === "highlights" && !!user,
  });

  // Fetch recent headlines (only for signed-in users)
  const { data: recentHeadlines, isLoading: headlinesLoading } = useQuery({
    queryKey: ["/api/sports/headlines/recent", selectedSport],
    queryFn: async () => {
      const url = selectedSport === "all"
        ? "/api/sports/headlines/recent"
        : `/api/sports/headlines/recent?sport=${selectedSport}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch recent headlines");
      return response.json();
    },
    enabled: activeTab === "headlines" && !!user,
  });

  const formatTime = (timeString: string) => {
    try {
      return formatInUserTimezone(timeString, 'h:mm a');
    } catch {
      return timeString;
    }
  };

  const formatDate = (dateString: string | number) => {
    try {
      // Handle both string dates and timestamps from the API
      const date = typeof dateString === 'number' ? new Date(dateString) : new Date(dateString);
      return formatInUserTimezone(date, 'MMM d');
    } catch {
      return String(dateString || '');
    }
  };

  const formatDuration = (duration: number | string) => {
    if (!duration) return '';
    
    const durationMs = typeof duration === 'string' ? parseInt(duration) : duration;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressColor = (progress: string) => {
    if (!progress) return 'bg-gray-500';
    switch (progress.toLowerCase()) {
      case 'live':
      case 'in progress':
        return 'bg-red-500';
      case 'final':
      case 'completed':
        return 'bg-green-500';
      case 'scheduled':
      case 'upcoming':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Enhanced HighlightCard component with video playback
  const HighlightCard = ({ highlight }: { highlight: Asset }) => {
    const videoUrl = getVideoUrl(highlight);
    const hasVideo = !!videoUrl;
    
    return (
      <Card 
        className="group hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#D8AC35] dark:hover:border-[#00ff41] overflow-hidden cursor-pointer"
        onClick={() => hasVideo && playVideo(highlight)}
      >
        <div className="relative">
          {/* Video Thumbnail or Placeholder */}
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
            {highlight.thumbnailUrl ? (
              <img 
                src={highlight.thumbnailUrl}
                alt={highlight.title || 'Highlight'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}
            
            {/* Fallback content */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900/90 to-gray-800/90">
              <Play className="w-12 h-12 text-white/80" />
            </div>
            
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </div>
            </div>
            
            {/* Duration badge */}
            {highlight.duration && (
              <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-mono">
                {formatDuration(highlight.duration)}
              </div>
            )}

            {/* Video source indicator */}
            <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
              {highlight.type === 'WARNER_MAX' ? 'MAX' : 
               highlight.type === 'YOUTUBE' ? 'YOUTUBE' : 
               highlight.type || 'VIDEO'}
            </div>

            {/* Fullscreen indicator for all videos */}
            {hasVideo && (
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center">
                  <Maximize className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>
          
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#D8AC35] dark:group-hover:text-[#00ff41] transition-colors">
                {highlight.title || 'Game Highlight'}
              </h3>
              
              {highlight.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {highlight.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(highlight.createdAt || highlight.date || '')}</span>
                </div>
                
                {highlight.views && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{highlight.views.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              {/* Video action button */}
              <Button 
                className="w-full mt-3 bg-[#D8AC35] hover:bg-[#D8AC35]/90 dark:bg-[#00ff41] dark:hover:bg-[#00ff41]/90 text-black"
                size="sm"
                disabled={!hasVideo}
                onClick={(e) => {
                  e.stopPropagation();
                  hasVideo && playVideo(highlight);
                }}
              >
                {hasVideo ? (
                  <>
                    <Play className="w-4 h-4 mr-2" fill="currentColor" />
                    Play Video
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Video Unavailable
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  };

  // Enhanced HeadlineCard component  
  const HeadlineCard = ({ game }: { game: Game }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#D8AC35] dark:hover:border-[#00ff41] overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#D8AC35] dark:group-hover:text-[#00ff41] transition-colors line-clamp-2">
              {game.headline || `${game.awayTeamName} vs ${game.homeTeamName}`}
            </CardTitle>
            
            {game.subheadline && (
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {game.subheadline}
              </CardDescription>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-3">
            <TeamLogo teamName={game.awayTeamName} sport={game.sport} size="sm" />
            <span className="text-xs text-gray-400 dark:text-gray-500">@</span>
            <TeamLogo teamName={game.homeTeamName} sport={game.sport} size="sm" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Game result or score */}
          {(game.awayScore !== null && game.homeScore !== null) && (
            <div className="flex items-center justify-center py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-4 text-center">
                <div className="flex flex-col items-center">
                  <TeamLogo teamName={game.awayTeamName} sport={game.sport} size="md" />
                  <span className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    {game.awayScore}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[60px]">
                    {game.awayTeamName}
                  </span>
                </div>
                
                <div className="flex flex-col items-center px-3">
                  <span className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                    {formatTime(game.gameTime)}
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`${getProgressColor(game.progress)} text-white border-none text-xs px-2 py-1`}
                  >
                    {game.progress || 'Final'}
                  </Badge>
                  <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {formatDate(game.gameTime)}
                  </span>
                </div>
                
                <div className="flex flex-col items-center">
                  <TeamLogo teamName={game.homeTeamName} sport={game.sport} size="md" />
                  <span className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    {game.homeScore}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[60px]">
                    {game.homeTeamName}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Key stats or highlights */}
          {game.keyStats && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Key Stats</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(game.keyStats).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1 px-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">{key}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Bottom info bar */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Trophy className="w-3 h-3" />
              <span>{game.sport?.toUpperCase()}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>{formatTime(game.gameTime)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const getPointsColor = (points: number) => {
    if (points >= 80) return 'text-red-500';
    if (points >= 60) return 'text-orange-500';
    if (points >= 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  const GameCard = ({ game }: { game: Game }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <span className="uppercase text-xs font-medium text-gray-600 dark:text-gray-300">
            {game.sport}
          </span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
            {game.progress || game.timeLeft || 'Scheduled'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Teams */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TeamLogo teamName={game.team1Name || game.awayTeamName} sport={game.sport} size="md" />
                <span className="font-semibold text-gray-900 dark:text-white">{game.team1City} {game.team1Name || game.awayTeamName}</span>
                {game.team1Ranking && (
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    #{game.team1Ranking}
                  </span>
                )}
              </div>
              {game.team1Score !== undefined && (
                <span className="text-2xl font-bold">{game.team1Score}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TeamLogo teamName={game.team2Name || game.homeTeamName} sport={game.sport} size="md" />
                <span className="font-semibold text-gray-900 dark:text-white">{game.team2City} {game.team2Name || game.homeTeamName}</span>
                {game.team2Ranking && (
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    #{game.team2Ranking}
                  </span>
                )}
              </div>
              {game.team2Score !== undefined && (
                <span className="text-2xl font-bold">{game.team2Score}</span>
              )}
            </div>
          </div>

          {/* Game Info */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(game.date)}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(game.time)}
              </span>
            </div>
            {game.timeLeft && (
              <span className="text-red-500 font-medium">{game.timeLeft}</span>
            )}
          </div>

          {/* Excitement Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm text-gray-900 dark:text-white">Excitement:</span>
              <span className={`font-bold ${getPointsColor(game.points)}`}>
                {game.points}/100
              </span>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {game.pointsLevel}
              </span>
            </div>
          </div>

          {/* Rationale */}
          {game.rationale && (
            <p className="text-sm text-gray-600 dark:text-gray-200 italic">{game.rationale}</p>
          )}

          {/* Location */}
          {game.location && (
            <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {game.location}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="uppercase text-xs font-medium text-gray-600 dark:text-gray-300">
                {event.sport}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-300">{formatDate(event.date)}</span>
            </div>
            <p className="text-sm text-gray-900 dark:text-white font-medium">{event.message}</p>
            {event.team1Score !== undefined && event.team2Score !== undefined && (
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm font-medium">
                  {event.team1Score} - {event.team2Score}
                </span>
                {event.timeLeft && (
                  <span className="text-xs text-gray-500 dark:text-gray-300">({event.timeLeft})</span>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getPointsColor(event.points)}`}>
              {event.points}
            </span>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8">Live Scores Data</h1>
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Real-time games, events, and highlights from {SPORTS_LIST.length}+ sports leagues worldwide
          </p>
          
          {/* Timezone Display */}
          {userTimezone && (
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-600 dark:text-gray-200">
              <Globe className="w-4 h-4" />
              <span>
                All times shown in your timezone: {userTimezone.timezone} ({userTimezone.abbreviation})
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 mb-8">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {SPORTS_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scores</SelectItem>
                {SPORTS_LIST
                  .filter(sport => selectedCategory === "All" || sport.category === selectedCategory)
                  .map((sport) => (
                    <SelectItem key={sport.id} value={sport.id}>
                      {sport.icon} {sport.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today's Games</TabsTrigger>
            <TabsTrigger value="events">Live Events</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="headlines">Headlines</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-6">
            {todayLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            ) : todayGames?.games?.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nothing Available at the Moment</h3>
                <p className="text-muted-foreground">
                  No games found for {selectedSport === 'all' ? 'today' : `${selectedSport.toUpperCase()} today`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {todayGames?.games?.map((game: Game) => (
                  <GameCard key={game.gameID} game={game} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            {eventsLoading ? (
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <Skeleton key={i} className="h-20" />
                ))}
              </div>
            ) : recentEvents?.events?.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nothing Available at the Moment</h3>
                <p className="text-muted-foreground">
                  No live events found for {selectedSport === 'all' ? 'any sport' : selectedSport.toUpperCase()}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentEvents?.events?.map((event: Event) => (
                  <EventCard key={event.eventID} event={event} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="highlights" className="mt-6">
            {!user ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
                <p className="text-muted-foreground mb-4">
                  Sign in to access video highlights of recently finished or ongoing games
                </p>
                <Button onClick={() => window.location.href = '/login'}>
                  Sign In
                </Button>
              </div>
            ) : highlightsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-40" />
                ))}
              </div>
            ) : recentHighlights?.highlights?.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nothing Available at the Moment</h3>
                <p className="text-muted-foreground">
                  No highlights found for {selectedSport === 'all' ? 'any sport' : selectedSport.toUpperCase()}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentHighlights?.highlights?.map((highlight: Asset) => (
                  <HighlightCard key={highlight.assetID} highlight={highlight} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="headlines" className="mt-6">
            {!user ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
                <p className="text-muted-foreground mb-4">
                  Sign in to access important headlines for recently finished games
                </p>
                <Button onClick={() => window.location.href = '/login'}>
                  Sign In
                </Button>
              </div>
            ) : headlinesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            ) : recentHeadlines?.headlines?.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nothing Available at the Moment</h3>
                <p className="text-muted-foreground">
                  No headlines found for {selectedSport === 'all' ? 'any sport' : selectedSport.toUpperCase()}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentHeadlines?.headlines?.map((game: Game) => (
                  <HeadlineCard key={game.gameID} game={game} />
                ))}
              </div>
            )}
          </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Fullscreen Video Player Modal */}
      {fullscreenVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={closeVideo}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Video Title */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-4 py-2 rounded">
              <h3 className="text-lg font-semibold">{fullscreenVideo.title || 'Game Highlight'}</h3>
              {fullscreenVideo.description && (
                <p className="text-sm text-gray-300 mt-1">{fullscreenVideo.description}</p>
              )}
            </div>

            {/* Video Player */}
            <div className="w-full h-full flex items-center justify-center">
              {getVideoUrl(fullscreenVideo) ? (
                <div className="w-full h-full relative">
                  {/* For YouTube and Vimeo embeds */}
                  {(fullscreenVideo.url?.includes('youtube.com') || 
                    fullscreenVideo.url?.includes('youtu.be') || 
                    fullscreenVideo.url?.includes('vimeo.com')) && (
                    <iframe
                      src={getVideoUrl(fullscreenVideo)!}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      title={fullscreenVideo.title || 'Video Highlight'}
                    />
                  )}
                  
                  {/* For direct video files */}
                  {fullscreenVideo.url?.match(/\.(mp4|webm|ogg)(\?.*)?$/i) && (
                    <video
                      className="w-full h-full"
                      controls
                      autoPlay
                      playsInline
                      src={fullscreenVideo.url}
                      title={fullscreenVideo.title || 'Video Highlight'}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  
                  {/* For Max and other streaming platforms */}
                  {(fullscreenVideo.url?.includes('max.com') || 
                    fullscreenVideo.url?.includes('hulu.com') || 
                    fullscreenVideo.url?.includes('netflix.com') ||
                    fullscreenVideo.url?.includes('amazon.com')) && (
                    <div className="w-full h-full relative">
                      <iframe
                        src={fullscreenVideo.url}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        title={fullscreenVideo.title || 'Video Highlight'}
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                      />
                      <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-white p-8">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Video Unavailable</h3>
                  <p className="text-gray-400">This video cannot be played at the moment.</p>
                  <Button
                    className="mt-4 bg-[#D8AC35] hover:bg-[#D8AC35]/90 text-black"
                    onClick={closeVideo}
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>

            {/* Escape hint */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm bg-black/50 px-3 py-1 rounded">
              Press ESC to exit fullscreen
            </div>
          </div>
        </div>
      )}
    </div>
  );
}