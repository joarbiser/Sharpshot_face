import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Target, Zap, Users, Star, Lock, CheckCircle } from "lucide-react";
import { type Achievement, type UserAchievement, type UserStats } from "@shared/schema";

// Mock data for demonstration
const mockAchievements: Achievement[] = [
  {
    id: 1,
    name: "First Blood",
    description: "Place your first bet",
    category: "getting_started",
    icon: "target",
    points: 100,
    requirement: 1,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Sharp Shooter",
    description: "Win 10 bets in a row",
    category: "performance",
    icon: "zap",
    points: 500,
    requirement: 10,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Community Builder",
    description: "Create 5 public views",
    category: "social",
    icon: "users",
    points: 300,
    requirement: 5,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Profit Machine",
    description: "Earn $1000 in total profit",
    category: "performance",
    icon: "trophy",
    points: 1000,
    requirement: 1000,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 5,
    name: "High Roller",
    description: "Place 100 bets",
    category: "volume",
    icon: "star",
    points: 750,
    requirement: 100,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 6,
    name: "Strategy Master",
    description: "Create 10 different betting strategies",
    category: "social",
    icon: "target",
    points: 400,
    requirement: 10,
    isActive: true,
    createdAt: new Date(),
  },
];

const mockUserAchievements: UserAchievement[] = [
  {
    id: 1,
    userId: 1,
    achievementId: 1,
    progress: 1,
    unlockedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 1,
    achievementId: 2,
    progress: 7,
    unlockedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    userId: 1,
    achievementId: 3,
    progress: 3,
    unlockedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockUserStats: UserStats = {
  id: 1,
  userId: 1,
  totalBets: 47,
  totalWins: 23,
  totalEV: "245.67",
  totalProfit: "1234.56",
  bestStreak: 8,
  currentStreak: 3,
  viewsCreated: 3,
  viewsShared: 12,
  achievementPoints: 1650,
  level: 5,
  experiencePoints: 3250,
  lastActiveAt: new Date(),
  updatedAt: new Date(),
};

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "target": return Target;
    case "zap": return Zap;
    case "users": return Users;
    case "trophy": return Trophy;
    case "star": return Star;
    default: return Target;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "getting_started": return "bg-blue-500";
    case "performance": return "bg-green-500";
    case "social": return "bg-purple-500";
    case "volume": return "bg-orange-500";
    default: return "bg-gray-500";
  }
};

const getCategoryName = (category: string) => {
  switch (category) {
    case "getting_started": return "Getting Started";
    case "performance": return "Performance";
    case "social": return "Social";
    case "volume": return "Volume";
    default: return "Other";
  }
};

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // In a real app, we would fetch data from the API
  const achievements = mockAchievements;
  const userAchievements = mockUserAchievements;
  const userStats = mockUserStats;

  const getUserAchievementProgress = (achievementId: number) => {
    const userAchievement = userAchievements.find(ua => ua.achievementId === achievementId);
    return userAchievement?.progress || 0;
  };

  const isAchievementUnlocked = (achievementId: number) => {
    const userAchievement = userAchievements.find(ua => ua.achievementId === achievementId);
    return userAchievement?.unlockedAt !== null;
  };

  const filteredAchievements = selectedCategory === "all" 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const categories = [...new Set(achievements.map(a => a.category))];
  const unlockedCount = achievements.filter(a => isAchievementUnlocked(a.id)).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
          <p className="text-gray-600">Track your progress and earn rewards for your betting expertise</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Level</p>
                  <p className="text-2xl font-bold text-gold">{userStats.level}</p>
                </div>
                <Trophy className="h-8 w-8 text-gold" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Achievement Points</p>
                  <p className="text-2xl font-bold text-green-600">{userStats.achievementPoints.toLocaleString()}</p>
                </div>
                <Star className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unlocked</p>
                  <p className="text-2xl font-bold text-blue-600">{unlockedCount}/{achievements.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="text-2xl font-bold text-purple-600">{userStats.experiencePoints.toLocaleString()}</p>
                </div>
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {getCategoryName(category)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map(achievement => {
                const progress = getUserAchievementProgress(achievement.id);
                const isUnlocked = isAchievementUnlocked(achievement.id);
                const progressPercentage = (progress / achievement.requirement) * 100;
                const IconComponent = getIconComponent(achievement.icon);
                
                return (
                  <Card key={achievement.id} className={`relative ${isUnlocked ? 'ring-2 ring-gold' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${getCategoryColor(achievement.category)} ${!isUnlocked ? 'opacity-50' : ''}`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className={`text-lg ${!isUnlocked ? 'text-gray-500' : ''}`}>
                              {achievement.name}
                            </CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {achievement.points} pts
                            </Badge>
                          </div>
                        </div>
                        {isUnlocked ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Lock className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className={`text-sm mb-4 ${!isUnlocked ? 'text-gray-500' : 'text-gray-700'}`}>
                        {achievement.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className={`font-medium ${isUnlocked ? 'text-green-600' : 'text-gray-700'}`}>
                            {progress}/{achievement.requirement}
                          </span>
                        </div>
                        <Progress 
                          value={progressPercentage} 
                          className="h-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}