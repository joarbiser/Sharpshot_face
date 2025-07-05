import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, TrendingUp, Play, Users, Trophy } from "lucide-react";
import type { Game, Event, Asset } from "@shared/schema";

const SPORTS = [
  { id: "all", name: "All Sports" },
  { id: "mlb", name: "MLB" },
  { id: "nfl", name: "NFL" },
  { id: "nba", name: "NBA" },
  { id: "nhl", name: "NHL" },
  { id: "ncaab", name: "NCAA Basketball" },
  { id: "ncaaf", name: "NCAA Football" },
];

export default function Sports() {
  const [selectedSport, setSelectedSport] = useState("all");
  const [activeTab, setActiveTab] = useState("today");

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

  // Fetch recent highlights
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
    enabled: activeTab === "highlights",
  });

  // Fetch future headlines
  const { data: futureHeadlines, isLoading: headlinesLoading } = useQuery({
    queryKey: ["/api/sports/headlines/future", selectedSport],
    queryFn: async () => {
      const url = selectedSport === "all"
        ? "/api/sports/headlines/future"
        : `/api/sports/headlines/future?sport=${selectedSport}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch future headlines");
      return response.json();
    },
    enabled: activeTab === "headlines",
  });

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return timeString;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const getProgressColor = (progress: string) => {
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
          <Badge className={`${getProgressColor(game.progress)} text-white`}>
            {game.progress}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Teams */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{game.team1City} {game.team1Name}</span>
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
                <span className="font-semibold">{game.team2City} {game.team2Name}</span>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sports Dashboard</h1>
          <p className="text-gray-600">
            Live sports data, scores, and betting insights powered by real-time analytics
          </p>
        </div>

        {/* Sport Filter */}
        <div className="mb-6">
          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select sport" />
            </SelectTrigger>
            <SelectContent>
              {SPORTS.map((sport) => (
                <SelectItem key={sport.id} value={sport.id}>
                  {sport.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            {highlightsLoading ? (
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
            {headlinesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {futureHeadlines?.headlines?.map((game: Game) => (
                  <GameCard key={game.gameID} game={game} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}