import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Eye, BarChart3, Filter, Plus, Zap, Target, Trophy, Clock } from "lucide-react";

const presetsData = [
  {
    id: "preset_001",
    title: "1H NBA Totals | CLV > 4%",
    creator: "TheHandle",
    description: "First half totals with strong closing line value in NBA games",
    ev: 4.8,
    winRate: 67,
    followers: 217,
    volume: 24,
    roi: 12.4,
    confidence: "High",
    category: "Totals",
    sport: "NBA",
    lastUpdated: "2h ago",
    active: true
  },
  {
    id: "preset_002", 
    title: "MLB Unders – Early Games",
    creator: "BetBot_3000",
    description: "Under bets on early MLB games with specific weather conditions",
    ev: 3.5,
    winRate: 74,
    followers: 108,
    volume: 18,
    roi: 8.9,
    confidence: "Medium",
    category: "Totals",
    sport: "MLB",
    lastUpdated: "45m ago",
    active: true
  },
  {
    id: "preset_003",
    title: "Road Dog Alt Lines",
    creator: "edgefinder",
    description: "Road underdogs +7.5 or higher in divisional games",
    ev: 5.4,
    winRate: 61,
    followers: 2100,
    volume: 31,
    roi: 15.2,
    confidence: "High",
    category: "Spreads",
    sport: "NFL",
    lastUpdated: "1h ago",
    active: true
  },
  {
    id: "preset_004",
    title: "Prime Time Props",
    creator: "primetime",
    description: "Player props in nationally televised games with high volume",
    ev: 7.1,
    winRate: 69,
    followers: 934,
    volume: 42,
    roi: 18.7,
    confidence: "High",
    category: "Props",
    sport: "NFL",
    lastUpdated: "20m ago",
    active: true
  },
  {
    id: "preset_005",
    title: "Weather Edge",
    creator: "weatherbet", 
    description: "Outdoor games with wind 15+ mph, target adjusted totals",
    ev: 9.3,
    winRate: 78,
    followers: 567,
    volume: 12,
    roi: 22.1,
    confidence: "Very High",
    category: "Totals",
    sport: "NFL",
    lastUpdated: "3h ago",
    active: true
  },
  {
    id: "preset_006",
    title: "Closing Steam",
    creator: "steamchaser",
    description: "Lines that moved 2+ points in the last 30 minutes",
    ev: 11.2,
    winRate: 72,
    followers: 1800,
    volume: 56,
    roi: 25.8,
    confidence: "Very High", 
    category: "Live",
    sport: "All",
    lastUpdated: "5m ago",
    active: true
  }
];

export default function Views() {
  const [activeTab, setActiveTab] = useState("trending");
  const [activeSport, setActiveSport] = useState("all");

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "Very High": return "text-green-400 bg-green-400/10";
      case "High": return "text-blue-400 bg-blue-400/10";
      case "Medium": return "text-yellow-400 bg-yellow-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  const getEVColor = (ev: number) => {
    if (ev >= 10) return "text-green-400";
    if (ev >= 7) return "text-blue-400"; 
    if (ev >= 5) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Terminal Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">PRESET TERMINAL</h1>
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                LIVE DATA
              </Badge>
            </div>
            <Link href="/view-builder">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                <Plus className="w-4 h-4" />
                Create Preset
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Presets</p>
                  <p className="text-2xl font-bold text-foreground">247</p>
                </div>
                <Eye className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. EV</p>
                  <p className="text-2xl font-bold text-green-400">+7.2%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Followers</p>
                  <p className="text-2xl font-bold text-foreground">12.4k</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-blue-400">71%</p>
                </div>
                <Trophy className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-4">
                <TabsList className="grid grid-cols-4 w-fit">
                  <TabsTrigger value="trending" className="gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="ev" className="gap-2">
                    <Zap className="w-4 h-4" />
                    Highest EV
                  </TabsTrigger>
                  <TabsTrigger value="followed" className="gap-2">
                    <Users className="w-4 h-4" />
                    Most Followed
                  </TabsTrigger>
                  <TabsTrigger value="new" className="gap-2">
                    <Clock className="w-4 h-4" />
                    New
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Badge 
                    variant={activeSport === "all" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setActiveSport("all")}
                  >
                    All Sports
                  </Badge>
                  <Badge 
                    variant={activeSport === "nfl" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setActiveSport("nfl")}
                  >
                    NFL
                  </Badge>
                  <Badge 
                    variant={activeSport === "nba" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setActiveSport("nba")}
                  >
                    NBA
                  </Badge>
                  <Badge 
                    variant={activeSport === "mlb" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setActiveSport("mlb")}
                  >
                    MLB
                  </Badge>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Presets Grid */}
        <div className="grid gap-6">
          {presetsData.map((preset) => (
            <Card key={preset.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{preset.title}</h3>
                        <Badge className={`${getConfidenceColor(preset.confidence)} border-0`}>
                          {preset.confidence}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{preset.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>@{preset.creator}</span>
                        <span>•</span>
                        <span>{preset.sport}</span>
                        <span>•</span>
                        <span>{preset.category}</span>
                        <span>•</span>
                        <span>Updated {preset.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getEVColor(preset.ev)}`}>
                        +{preset.ev}%
                      </div>
                      <div className="text-xs text-muted-foreground">EV</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{preset.winRate}%</div>
                      <div className="text-xs text-muted-foreground">Win Rate</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">+{preset.roi}%</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{preset.volume}</div>
                      <div className="text-xs text-muted-foreground">Volume</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {preset.followers > 1000 ? `${(preset.followers/1000).toFixed(1)}k` : preset.followers}
                      </div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`w-3 h-3 rounded-full mx-auto ${preset.active ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                      <div className="text-xs text-muted-foreground">Status</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link href="/calculator" className="flex-1">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Results
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                      <Users className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Ready to Build Your Edge?</h3>
            <p className="text-muted-foreground mb-6">Create custom presets with our advanced filtering tools and share your strategies with the community.</p>
            <Link href="/view-builder">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                <Plus className="w-4 h-4" />
                Start Building
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
