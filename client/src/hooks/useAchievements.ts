import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type Achievement, type UserAchievement, type UserStats } from "@shared/schema";

// Mock achievements data for demo
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
];

interface AchievementProgress {
  [achievementId: number]: number;
}

export function useAchievements(userId?: number) {
  const queryClient = useQueryClient();
  const [achievementProgress, setAchievementProgress] = useState<AchievementProgress>({
    1: 1,  // First Blood - completed
    2: 7,  // Sharp Shooter - 7/10
    3: 3,  // Community Builder - 3/5
    4: 567, // Profit Machine - $567/$1000
    5: 47,  // High Roller - 47/100
  });

  // In a real app, these would fetch from the API
  const { data: achievements = mockAchievements } = useQuery({
    queryKey: ["/api/achievements"],
    enabled: false, // Using mock data for demo
  });

  const { data: userAchievements = [] } = useQuery<UserAchievement[]>({
    queryKey: ["/api/achievements/user", userId],
    enabled: !!userId && false, // Using mock data for demo
  });

  const checkAndUnlockAchievements = useCallback((
    actionType: string,
    currentStats: Partial<UserStats>
  ) => {
    const newlyUnlocked: Achievement[] = [];

    achievements.forEach(achievement => {
      const currentProgress = achievementProgress[achievement.id] || 0;
      let newProgress = currentProgress;

      // Update progress based on action type
      switch (achievement.id) {
        case 1: // First Blood - place first bet
          if (actionType === "place_bet" && currentStats.totalBets! >= 1) {
            newProgress = 1;
          }
          break;
        case 2: // Sharp Shooter - win streak
          if (actionType === "win_bet" && currentStats.currentStreak! >= 10) {
            newProgress = currentStats.currentStreak!;
          }
          break;
        case 3: // Community Builder - create views
          if (actionType === "create_view" && currentStats.viewsCreated! >= 5) {
            newProgress = currentStats.viewsCreated!;
          }
          break;
        case 4: // Profit Machine - total profit
          if (currentStats.totalProfit) {
            newProgress = parseFloat(currentStats.totalProfit);
          }
          break;
        case 5: // High Roller - total bets
          if (currentStats.totalBets) {
            newProgress = currentStats.totalBets;
          }
          break;
      }

      // Check if achievement should be unlocked
      if (newProgress >= achievement.requirement && currentProgress < achievement.requirement) {
        newlyUnlocked.push(achievement);
      }

      // Update progress
      if (newProgress !== currentProgress) {
        setAchievementProgress(prev => ({
          ...prev,
          [achievement.id]: newProgress
        }));
      }
    });

    return newlyUnlocked;
  }, [achievements, achievementProgress]);

  const updateProgressMutation = useMutation({
    mutationFn: async ({ achievementId, progress }: { achievementId: number, progress: number }) => {
      // In a real app, this would call the API
      // return apiRequest("POST", "/api/achievements/progress", { userId, achievementId, progress });
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements/user", userId] });
    },
  });

  const unlockAchievementMutation = useMutation({
    mutationFn: async ({ achievementId }: { achievementId: number }) => {
      // In a real app, this would call the API
      // return apiRequest("POST", "/api/achievements/unlock", { userId, achievementId });
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements/user", userId] });
    },
  });

  const getUserAchievementProgress = useCallback((achievementId: number) => {
    return achievementProgress[achievementId] || 0;
  }, [achievementProgress]);

  const isAchievementUnlocked = useCallback((achievementId: number) => {
    const achievement = achievements.find(a => a.id === achievementId);
    const progress = achievementProgress[achievementId] || 0;
    return achievement ? progress >= achievement.requirement : false;
  }, [achievements, achievementProgress]);

  return {
    achievements,
    userAchievements,
    checkAndUnlockAchievements,
    updateProgress: updateProgressMutation.mutate,
    unlockAchievement: unlockAchievementMutation.mutate,
    getUserAchievementProgress,
    isAchievementUnlocked,
    isLoading: false, // In real app: achievements.isLoading || userAchievements.isLoading
  };
}