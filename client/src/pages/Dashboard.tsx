import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Target, 
  Settings, 
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

interface DashboardStats {
  totalEV: number;
  activeViews: number;
  weeklyProfit: number;
  winRate: number;
  totalBets: number;
  avgEV: number;
}

interface RecentBet {
  id: string;
  game: string;
  bet: string;
  stake: number;
  odds: number;
  ev: number;
  status: 'pending' | 'won' | 'lost';
  result?: number;
  date: string;
}

interface ActiveView {
  id: string;
  name: string;
  opportunities: number;
  avgEV: number;
  lastUpdated: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEV: 127.45,
    activeViews: 8,
    weeklyProfit: 284.50,
    winRate: 67.3,
    totalBets: 156,
    avgEV: 4.2
  });

  const [recentBets] = useState<RecentBet[]>([
    {
      id: "1",
      game: "Chiefs vs Bills",
      bet: "Josh Allen Passing Yards Over 274.5",
      stake: 100,
      odds: -108,
      ev: 4.7,
      status: 'won',
      result: 127.78,
      date: "2 hours ago"
    },
    {
      id: "2",
      game: "Lakers vs Celtics",
      bet: "Lakers +3.5",
      stake: 150,
      odds: -110,
      ev: 3.2,
      status: 'pending',
      date: "4 hours ago"
    },
    {
      id: "3",
      game: "Yankees vs Red Sox",
      bet: "Over 9.5",
      stake: 75,
      odds: +105,
      ev: 5.8,
      status: 'won',
      result: 96.25,
      date: "1 day ago"
    },
    {
      id: "4",
      game: "Rangers vs Bruins",
      bet: "Rangers ML",
      stake: 50,
      odds: +150,
      ev: 6.1,
      status: 'lost',
      result: -50,
      date: "2 days ago"
    }
  ]);

  const [activeViews] = useState<ActiveView[]>([
    {
      id: "1",
      name: "High EV NBA Props",
      opportunities: 12,
      avgEV: 5.8,
      lastUpdated: "2 minutes ago"
    },
    {
      id: "2",
      name: "MLB Early Games",
      opportunities: 7,
      avgEV: 4.2,
      lastUpdated: "5 minutes ago"
    },
    {
      id: "3",
      name: "NFL Live Betting",
      opportunities: 3,
      avgEV: 7.1,
      lastUpdated: "8 minutes ago"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won': return <CheckCircle className="h-4 w-4" />;
      case 'lost': return <AlertTriangle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your betting performance overview.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/view-builder">
              <Button className="bg-gold text-white hover:bg-gold/90">
                <Settings className="h-4 w-4 mr-2" />
                Create View
              </Button>
            </Link>
            <Link href="/calculator">
              <Button variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Calculator
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total EV</p>
                  <p className="text-2xl font-bold text-green-600">+${stats.totalEV}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Weekly Profit</p>
                  <p className="text-2xl font-bold text-green-600">+${stats.weeklyProfit}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Win Rate</p>
                  <p className="text-2xl font-bold">{stats.winRate}%</p>
                </div>
                <Target className="h-8 w-8 text-gold" />
              </div>
              <Progress value={stats.winRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Views</p>
                  <p className="text-2xl font-bold">{stats.activeViews}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bets">Recent Bets</TabsTrigger>
            <TabsTrigger value="views">Active Views</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Bets Placed</span>
                      <span className="font-semibold">{stats.totalBets}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average EV</span>
                      <span className="font-semibold text-green-600">+{stats.avgEV}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Best Bet This Week</span>
                      <span className="font-semibold">+11.2% EV</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Profit This Month</span>
                      <span className="font-semibold text-green-600">+$1,247.30</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/calculator">
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Find Live Opportunities
                    </Button>
                  </Link>
                  <Link href="/view-builder">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Create New View
                    </Button>
                  </Link>
                  <Link href="/sports">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Today's Games
                    </Button>
                  </Link>
                  <Link href="/views">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Browse Community Views
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Betting Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBets.map((bet) => (
                    <div key={bet.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{bet.game}</h4>
                          <Badge className={getStatusColor(bet.status)}>
                            {getStatusIcon(bet.status)}
                            <span className="ml-1 capitalize">{bet.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{bet.bet}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Stake: ${bet.stake}</span>
                          <span>Odds: {bet.odds > 0 ? `+${bet.odds}` : bet.odds}</span>
                          <span>EV: +{bet.ev}%</span>
                          <span>{bet.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {bet.result && (
                          <p className={`font-semibold ${bet.result > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {bet.result > 0 ? '+' : ''}${bet.result}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="views" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Active Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeViews.map((view) => (
                    <div key={view.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{view.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{view.opportunities} opportunities</span>
                          <span>Avg EV: +{view.avgEV}%</span>
                          <span>Updated {view.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href="/calculator">
                          <Button size="sm" variant="outline">View Results</Button>
                        </Link>
                        <Link href="/view-builder">
                          <Button size="sm" variant="outline">Edit</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Sport Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>NFL</span>
                        <span className="text-green-600">+$127.45 (72% WR)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NBA</span>
                        <span className="text-green-600">+$89.30 (65% WR)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>MLB</span>
                        <span className="text-green-600">+$67.75 (58% WR)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Market Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Player Props</span>
                        <span className="text-green-600">+$98.20 (69% WR)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Spreads</span>
                        <span className="text-green-600">+$76.50 (63% WR)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Totals</span>
                        <span className="text-green-600">+$54.80 (61% WR)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}