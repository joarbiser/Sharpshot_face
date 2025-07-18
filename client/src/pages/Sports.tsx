import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, TrendingUp, Play, Users, Trophy, Globe, AlertCircle, Star } from "lucide-react";
import type { Game, Event, Asset } from "@shared/schema";
import { SPORTS_LIST, SPORTS_CATEGORIES } from '@/lib/sports';
import { formatInUserTimezone, getUserTimezone, formatGameTime, getTimeUntilGame, TimezoneInfo } from '@/lib/timezone';
import { getTeamLogo } from '@/lib/teamLogos';
import { getSportsbookLogo } from '@/lib/sportsbookLogos';

const SPORTS = SPORTS_LIST;

export default function Sports() {
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("today");
  const [userTimezone, setUserTimezone] = useState<TimezoneInfo | null>(null);

  useEffect(() => {
    // Get user's timezone on component mount
    setUserTimezone(getUserTimezone());
  }, []);

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
          <Badge variant="secondary" className="uppercase text-xs">
            {game.sport}
          </Badge>
          <Badge className={`${getProgressColor(game.progress || game.timeLeft)} text-charcoal`}>
            {game.progress || game.timeLeft || 'Scheduled'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Teams */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getTeamLogo(game.team1Name || game.awayTeamName, game.sport)}
                <span className="font-semibold">{game.team1City} {game.team1Name || game.awayTeamName}</span>
                {game.team1Ranking && (
                  <Badge variant="outline" className="text-xs">
                    #{game.team1Ranking}
                  </Badge>
                )}
              </div>
              {game.team1Score !== undefined && (
                <span className="text-2xl font-bold">{game.team1Score}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getTeamLogo(game.team2Name || game.homeTeamName, game.sport)}
                <span className="font-semibold">{game.team2City} {game.team2Name || game.homeTeamName}</span>
                {game.team2Ranking && (
                  <Badge variant="outline" className="text-xs">
                    #{game.team2Ranking}
                  </Badge>
                )}
              </div>
              {game.team2Score !== undefined && (
                <span className="text-2xl font-bold">{game.team2Score}</span>
              )}
            </div>
          </div>

          {/* Game Info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
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
              <span className="text-sm">Excitement:</span>
              <span className={`font-bold ${getPointsColor(game.points)}`}>
                {game.points}/100
              </span>
              <Badge variant="outline" className="text-xs">
                {game.pointsLevel}
              </Badge>
            </div>
          </div>

          {/* Rationale */}
          {game.rationale && (
            <p className="text-sm text-gray-600 italic">{game.rationale}</p>
          )}

          {/* Location */}
          {game.location && (
            <p className="text-sm text-gray-500 flex items-center">
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
              <Badge variant="secondary" className="uppercase text-xs">
                {event.sport}
              </Badge>
              <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
            </div>
            <p className="text-sm">{event.message}</p>
            {event.team1Score !== undefined && event.team2Score !== undefined && (
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm font-medium">
                  {event.team1Score} - {event.team2Score}
                </span>
                {event.timeLeft && (
                  <span className="text-xs text-gray-500">({event.timeLeft})</span>
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

  const HighlightCard = ({ highlight }: { highlight: Asset }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{highlight.title}</CardTitle>
        <CardDescription className="text-sm">
          {highlight.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span className="text-sm">
              {Math.round(highlight.duration / 1000)}s
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {highlight.type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  const HeadlineCard = ({ game }: { game: Game }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="flex items-center gap-1">
              {getTeamLogo(game.awayTeamName || game.team1Name, game.sport)}
              <span className="text-sm">{game.awayTeamName || game.team1Name}</span>
            </div>
            <span className="text-sm text-muted-foreground">vs</span>
            <div className="flex items-center gap-1">
              {getTeamLogo(game.homeTeamName || game.team2Name, game.sport)}
              <span className="text-sm">{game.homeTeamName || game.team2Name}</span>
            </div>
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {game.sport}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>
              {userTimezone ? 
                formatInUserTimezone(game.date, userTimezone.timezone) : 
                formatGameTime(game.date)
              }
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">
              Score: {game.awayScore || game.team1Score} - {game.homeScore || game.team2Score}
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {game.gameStatus || game.progress || 'Final'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-secondary">Live Sports Data</h1>
          <p className="text-muted-foreground text-lg">
            Real-time games, events, and highlights from {SPORTS_LIST.length}+ sports leagues worldwide
          </p>
          
          {/* Timezone Display */}
          {userTimezone && (
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span>
                All times shown in your timezone: {userTimezone.timezone} ({userTimezone.abbreviation})
              </span>
            </div>
          )}
          
          <div className="flex justify-center gap-4 mt-6">
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
                <SelectItem value="all">All Sports</SelectItem>
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
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
    </div>
  );
}