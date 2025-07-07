import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, Zap, Users, Crown, Medal, Award } from "lucide-react";
import { type UserStats, type User } from "@shared/schema";

// Mock leaderboard data for demonstration
const mockLeaderboard = [
  {
    user: {
      id: 1,
      username: "BettingPro",
      email: "pro@example.com",
      password: "hashedpassword",
      subscriptionStatus: "active",
      subscriptionPlan: "pro",
      subscriptionPeriod: "monthly",
      stripeCustomerId: "cus_123",
      stripeSubscriptionId: "sub_123",
      subscriptionEndsAt: new Date("2025-08-01"),
      createdAt: new Date(),
    },
    stats: {
      id: 1,
      userId: 1,
      totalBets: 247,
      totalWins: 158,
      totalEV: "1245.67",
      totalProfit: "8234.56",
      bestStreak: 15,
      currentStreak: 7,
      viewsCreated: 12,
      viewsShared: 34,
      achievementPoints: 3250,
      level: 12,
      experiencePoints: 8900,
      lastActiveAt: new Date(),
      updatedAt: new Date(),
    }
  },
  {
    user: {
      id: 2,
      username: "SharpMind",
      email: "sharp@example.com",
      password: "hashedpassword",
      subscriptionStatus: "active",
      subscriptionPlan: "starter",
      subscriptionPeriod: "annual",
      stripeCustomerId: "cus_456",
      stripeSubscriptionId: "sub_456",
      subscriptionEndsAt: new Date("2026-01-01"),
      createdAt: new Date(),
    },
    stats: {
      id: 2,
      userId: 2,
      totalBets: 189,
      totalWins: 124,
      totalEV: "987.43",
      totalProfit: "6789.23",
      bestStreak: 12,
      currentStreak: 0,
      viewsCreated: 8,
      viewsShared: 23,
      achievementPoints: 2980,
      level: 10,
      experiencePoints: 7650,
      lastActiveAt: new Date(),
      updatedAt: new Date(),
    }
  },
  {
    user: {
      id: 3,
      username: "EdgeHunter",
      email: "edge@example.com",
      password: "hashedpassword",
      subscriptionStatus: "active",
      subscriptionPlan: "pro",
      subscriptionPeriod: "monthly",
      stripeCustomerId: "cus_789",
      stripeSubscriptionId: "sub_789",
      subscriptionEndsAt: new Date("2025-08-15"),
      createdAt: new Date(),
    },
    stats: {
      id: 3,
      userId: 3,
      totalBets: 156,
      totalWins: 89,
      totalEV: "756.89",
      totalProfit: "5432.10",
      bestStreak: 9,
      currentStreak: 4,
      viewsCreated: 15,
      viewsShared: 45,
      achievementPoints: 2750,
      level: 9,
      experiencePoints: 6200,
      lastActiveAt: new Date(),
      updatedAt: new Date(),
    }
  },
  {
    user: {
      id: 4,
      username: "ValueBetter",
      email: "value@example.com",
      password: "hashedpassword",
      subscriptionStatus: "active",
      subscriptionPlan: "starter",
      subscriptionPeriod: "monthly",
      stripeCustomerId: "cus_101",
      stripeSubscriptionId: "sub_101",
      subscriptionEndsAt: new Date("2025-08-01"),
      createdAt: new Date(),
    },
    stats: {
      id: 4,
      userId: 4,
      totalBets: 134,
      totalWins: 78,
      totalEV: "643.21",
      totalProfit: "4321.87",
      bestStreak: 8,
      currentStreak: 2,
      viewsCreated: 6,
      viewsShared: 18,
      achievementPoints: 2100,
      level: 8,
      experiencePoints: 5100,
      lastActiveAt: new Date(),
      updatedAt: new Date(),
    }
  },
  {
    user: {
      id: 5,
      username: "BankrollBuilder",
      email: "builder@example.com",
      password: "hashedpassword",
      subscriptionStatus: "active",
      subscriptionPlan: "pro",
      subscriptionPeriod: "annual",
      stripeCustomerId: "cus_202",
      stripeSubscriptionId: "sub_202",
      subscriptionEndsAt: new Date("2026-03-01"),
      createdAt: new Date(),
    },
    stats: {
      id: 5,
      userId: 5,
      totalBets: 112,
      totalWins: 67,
      totalEV: "534.56",
      totalProfit: "3456.78",
      bestStreak: 6,
      currentStreak: 1,
      viewsCreated: 4,
      viewsShared: 12,
      achievementPoints: 1850,
      level: 7,
      experiencePoints: 4200,
      lastActiveAt: new Date(),
      updatedAt: new Date(),
    }
  },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
    case 2: return <Medal className="h-6 w-6 text-gray-400" />;
    case 3: return <Award className="h-6 w-6 text-amber-600" />;
    default: return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    case 2: return "bg-gradient-to-r from-gray-300 to-gray-500";
    case 3: return "bg-gradient-to-r from-amber-400 to-amber-600";
    default: return "bg-gradient-to-r from-gray-200 to-gray-300";
  }
};

const getUserInitials = (username: string) => {
  return username.slice(0, 2).toUpperCase();
};

export default function Leaderboard() {
  const [selectedTab, setSelectedTab] = useState("points");

  // In a real app, we would fetch data from the API
  const leaderboard = mockLeaderboard;

  const getSortedLeaderboard = () => {
    switch (selectedTab) {
      case "points":
        return [...leaderboard].sort((a, b) => b.stats.achievementPoints - a.stats.achievementPoints);
      case "profit":
        return [...leaderboard].sort((a, b) => parseFloat(b.stats.totalProfit) - parseFloat(a.stats.totalProfit));
      case "winrate":
        return [...leaderboard].sort((a, b) => 
          (b.stats.totalWins / b.stats.totalBets) - (a.stats.totalWins / a.stats.totalBets)
        );
      case "streak":
        return [...leaderboard].sort((a, b) => b.stats.bestStreak - a.stats.bestStreak);
      default:
        return leaderboard;
    }
  };

  const sortedLeaderboard = getSortedLeaderboard();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">See how you stack up against other sharp bettors</p>
        </div>

        {/* Leaderboard Categories */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="points" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Points
            </TabsTrigger>
            <TabsTrigger value="profit" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Profit
            </TabsTrigger>
            <TabsTrigger value="winrate" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Win Rate
            </TabsTrigger>
            <TabsTrigger value="streak" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Best Streak
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="space-y-4">
              {sortedLeaderboard.map((entry, index) => {
                const rank = index + 1;
                const winRate = ((entry.stats.totalWins / entry.stats.totalBets) * 100).toFixed(1);
                
                let displayValue = "";
                switch (selectedTab) {
                  case "points":
                    displayValue = entry.stats.achievementPoints.toLocaleString();
                    break;
                  case "profit":
                    displayValue = `$${parseFloat(entry.stats.totalProfit).toLocaleString()}`;
                    break;
                  case "winrate":
                    displayValue = `${winRate}%`;
                    break;
                  case "streak":
                    displayValue = entry.stats.bestStreak.toString();
                    break;
                }

                return (
                  <Card key={entry.user.id} className={`${rank <= 3 ? 'ring-2 ring-gold' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-gold to-yellow-600">
                            {getRankIcon(rank)}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`/api/placeholder/40/40`} />
                              <AvatarFallback className="bg-blue-500 text-white">
                                {getUserInitials(entry.user.username)}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">{entry.user.username}</h3>
                                <Badge variant="secondary">
                                  Level {entry.stats.level}
                                </Badge>
                                {entry.user.subscriptionPlan === "pro" && (
                                  <Badge className="bg-gold text-white">Pro</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{entry.stats.totalBets} bets</span>
                                <span>{winRate}% win rate</span>
                                <span>{entry.stats.viewsCreated} views</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{displayValue}</div>
                          <div className="text-sm text-gray-600">
                            {selectedTab === "points" && "Achievement Points"}
                            {selectedTab === "profit" && "Total Profit"}
                            {selectedTab === "winrate" && "Win Rate"}
                            {selectedTab === "streak" && "Best Streak"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gold" />
                Top Performer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {sortedLeaderboard[0]?.user.username}
              </div>
              <div className="text-sm text-gray-600">
                {sortedLeaderboard[0]?.stats.achievementPoints.toLocaleString()} points
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Highest Profit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ${parseFloat(leaderboard[0]?.stats.totalProfit || "0").toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                {leaderboard[0]?.user.username}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {leaderboard.length}
              </div>
              <div className="text-sm text-gray-600">
                Active Members
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}