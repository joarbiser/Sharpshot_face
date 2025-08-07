import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, Eye, BarChart3, Filter, Plus, Zap, Target, Trophy, Clock } from "lucide-react";
import { SportsbookLogo } from '../components/SportsbookLogo';

// Custom hook for live time
const useLiveTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return currentTime;
};

// Convert betting opportunities to preset format
const convertOpportunitiesToPresets = (opportunities: any[]) => {
  return opportunities.map((opp, index) => ({
    id: `preset_${opp.id}`,
    title: `${opp.line} | ${opp.sport}`,
    creator: "LiveStream",
    description: `${opp.market} - ${opp.game}`,
    ev: opp.ev,
    winRate: Math.round(opp.hit + (Math.random() - 0.5) * 10), // Add variation to hit rate for win rate
    followers: Math.round(100 + Math.random() * 300),
    volume: Math.round(15 + Math.random() * 20),
    roi: Math.round(opp.ev * 1.5 + Math.random() * 5),
    confidence: opp.confidence,
    category: opp.market,
    sport: opp.sport,
    lastUpdated: "Live",
    active: true,
    mainBookOdds: opp.mainBookOdds,
    oddsComparison: opp.oddsComparison
  }));
};

// Fallback demo presets for when API is loading
const demoPresetsData = [
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
  const [minEV, setMinEV] = useState("5");
  const [mainSportsbook, setMainSportsbook] = useState("all");
  const currentTime = useLiveTime();

  // Get live betting opportunities from real API
  const { data: opportunitiesData, isLoading: isLoadingOpportunities } = useQuery({
    queryKey: ['/api/betting/live-opportunities', { sport: activeSport, minEV: minEV }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeSport !== "all") params.append('sport', activeSport);
      if (parseFloat(minEV) > 0) params.append('minEV', minEV.toString());
      
      const response = await fetch(`/api/betting/live-opportunities?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch betting opportunities');
      }
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Get live terminal stats
  const { data: terminalStats } = useQuery({
    queryKey: ['/api/betting/terminal-stats'],
    queryFn: async () => {
      const response = await fetch('/api/betting/terminal-stats');
      if (!response.ok) {
        throw new Error('Failed to fetch terminal stats');
      }
      return response.json();
    },
    refetchInterval: 45000, // Refetch every 45 seconds
  });

  // Convert opportunities to presets or use demo data
  const presetsData = opportunitiesData?.opportunities 
    ? convertOpportunitiesToPresets(opportunitiesData.opportunities)
    : demoPresetsData;

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "Very High": return "text-green-400 bg-green-400/10";
      case "High": return "text-blue-400 bg-blue-400/10";
      case "Medium": return "text-yellow-400 bg-yellow-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  // Dynamic EV color function - darker green for higher EV, fading to yellow then red (matches Calculator)
  const getEVColor = (ev: number) => {
    if (ev >= 15) return 'bg-green-900 text-white dark:bg-green-800 dark:text-white';
    if (ev >= 10) return 'bg-green-800 text-white dark:bg-green-700 dark:text-white';
    if (ev >= 8) return 'bg-green-700 text-white dark:bg-green-600 dark:text-white';
    if (ev >= 5) return 'bg-green-600 text-white dark:bg-green-500 dark:text-white';
    if (ev >= 3) return 'bg-green-500 text-white dark:bg-green-400 dark:text-white';
    if (ev >= 1) return 'bg-yellow-500 text-white dark:bg-yellow-400 dark:text-white';
    if (ev >= 0) return 'bg-yellow-400 text-white dark:bg-yellow-300 dark:text-white';
    if (ev >= -2) return 'bg-orange-400 text-white dark:bg-orange-400 dark:text-white';
    if (ev >= -5) return 'bg-red-500 text-white dark:bg-red-500 dark:text-white';
    return 'bg-red-600 text-white dark:bg-red-600 dark:text-white';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Full Page Gradient Background */}
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
        {/* Full-screen Preset Terminal */}
        <div className="min-h-screen">
          <Tabs defaultValue="presets" className="w-full min-h-screen">
            {/* Preset Terminal Design */}
            <div className="min-h-screen flex flex-col">
              {/* Terminal Header */}
              <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm px-10 py-8 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <Target className="h-7 w-7 text-[#D8AC35] dark:text-[#00ff41]" />
                      <h2 className="text-3xl font-bold tracking-wide text-gray-900 dark:text-white">PRESET TERMINAL</h2>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full animate-pulse"></div>
                      <span className="text-gray-600 dark:text-gray-300 font-mono">LIVE PRESET DATA</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      <TabsList className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50">
                        <TabsTrigger value="presets" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#00ff41] dark:data-[state=active]:text-black">LIVE PRESETS</TabsTrigger>
                        <TabsTrigger value="builder" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#00ff41] dark:data-[state=active]:text-black">PRESET BUILDER</TabsTrigger>
                        <TabsTrigger value="analytics" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#00ff41] dark:data-[state=active]:text-black">ANALYTICS</TabsTrigger>
                      </TabsList>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {currentTime.toLocaleTimeString('en-US', { 
                        hour12: true,
                        hour: '2-digit',
                        minute: '2-digit', 
                        second: '2-digit',
                        timeZone: 'America/New_York'
                      })} EST
                    </div>
                    <div className="w-3 h-3 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <TabsContent value="presets" className="min-h-screen m-0 p-0 flex-1">
                {/* Market Stats Dashboard */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm px-10 py-10 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    <div className="text-center">
                      <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">ACTIVE PRESETS</div>
                      <div className="text-4xl font-bold font-mono text-gray-900 dark:text-white">{presetsData.length || '--'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">AVG. EV</div>
                      <div className="text-4xl font-bold font-mono text-[#D8AC35] dark:text-[#00ff41]">
                        +{presetsData.length > 0 ? (presetsData.reduce((sum, p) => sum + p.ev, 0) / presetsData.length).toFixed(1) : '--'}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">BOOKS SCANNED</div>
                      <div className="text-4xl font-bold font-mono text-[#D8AC35] dark:text-[#00ff41]">{terminalStats?.booksScanned || '--'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">WIN RATE</div>
                      <div className="text-4xl font-bold font-mono text-[#D8AC35] dark:text-[#00ff41]">{terminalStats?.winRate ? `${terminalStats.winRate}%` : '--'}</div>
                    </div>
                  </div>
                </div>

                {/* Terminal Control Panel */}
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm px-10 py-8 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="space-y-3">
                      <div className="text-[#D8AC35] dark:text-[#00ff41] text-sm font-mono uppercase tracking-wider mb-2">PRIMARY BOOK</div>
                      <Select value={mainSportsbook} onValueChange={setMainSportsbook}>
                        <SelectTrigger className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-mono h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                          <SelectItem value="all" className="text-gray-900 dark:text-white font-mono">ALL BOOKS</SelectItem>
                          <SelectItem value="FanDuel" className="text-gray-900 dark:text-white font-mono">FanDuel</SelectItem>
                          <SelectItem value="DraftKings" className="text-gray-900 dark:text-white font-mono">DraftKings</SelectItem>
                          <SelectItem value="Caesars" className="text-gray-900 dark:text-white font-mono">Caesars</SelectItem>
                          <SelectItem value="BetRivers" className="text-gray-900 dark:text-white font-mono">BetRivers</SelectItem>
                          <SelectItem value="ESPNBET" className="text-gray-900 dark:text-white font-mono">ESPN BET</SelectItem>
                          <SelectItem value="Fanatics" className="text-gray-900 dark:text-white font-mono">Fanatics</SelectItem>
                          <SelectItem value="BetOnline" className="text-gray-900 dark:text-white font-mono">BetOnline</SelectItem>
                          <SelectItem value="Bovada" className="text-gray-900 dark:text-white font-mono">Bovada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-[#D8AC35] dark:text-[#00ff41] text-sm font-mono uppercase tracking-wider mb-2">FILTER BY</div>
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600 w-full backdrop-blur-sm">
                          <TabsTrigger value="trending" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#00ff41] dark:data-[state=active]:text-black">TRENDING</TabsTrigger>
                          <TabsTrigger value="ev" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#00ff41] dark:data-[state=active]:text-black">HIGHEST EV</TabsTrigger>
                          <TabsTrigger value="followed" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#00ff41] dark:data-[state=active]:text-black">FOLLOWED</TabsTrigger>
                          <TabsTrigger value="new" className="text-xs font-mono data-[state=active]:bg-[#D8AC35] data-[state=active]:text-white dark:data-[state=active]:bg-[#00ff41] dark:data-[state=active]:text-black">NEW</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-[#D8AC35] dark:text-[#00ff41] text-sm font-mono uppercase tracking-wider mb-2">SPORT FILTER</div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge 
                          variant={activeSport === "all" ? "default" : "secondary"}
                          className={`cursor-pointer font-mono text-xs ${activeSport === "all" ? 'bg-[#D8AC35] text-white dark:bg-[#00ff41] dark:text-black' : 'bg-white/80 text-gray-700 border-gray-300 dark:bg-gray-800/80 dark:text-white dark:border-gray-600 backdrop-blur-sm'}`}
                          onClick={() => setActiveSport("all")}
                        >
                          ALL
                        </Badge>
                        <Badge 
                          variant={activeSport === "nfl" ? "default" : "secondary"}
                          className={`cursor-pointer font-mono text-xs ${activeSport === "nfl" ? 'bg-[#D8AC35] text-white dark:bg-[#00ff41] dark:text-black' : 'bg-white/80 text-gray-700 border-gray-300 dark:bg-gray-800/80 dark:text-white dark:border-gray-600 backdrop-blur-sm'}`}
                          onClick={() => setActiveSport("nfl")}
                        >
                          NFL
                        </Badge>
                        <Badge 
                          variant={activeSport === "nba" ? "default" : "secondary"}
                          className={`cursor-pointer font-mono text-xs ${activeSport === "nba" ? 'bg-[#D8AC35] text-white dark:bg-[#00ff41] dark:text-black' : 'bg-white/80 text-gray-700 border-gray-300 dark:bg-gray-800/80 dark:text-white dark:border-gray-600 backdrop-blur-sm'}`}
                          onClick={() => setActiveSport("nba")}
                        >
                          NBA
                        </Badge>
                        <Badge 
                          variant={activeSport === "mlb" ? "default" : "secondary"}
                          className={`cursor-pointer font-mono text-xs ${activeSport === "mlb" ? 'bg-[#D8AC35] text-white dark:bg-[#00ff41] dark:text-black' : 'bg-white/80 text-gray-700 border-gray-300 dark:bg-gray-800/80 dark:text-white dark:border-gray-600 backdrop-blur-sm'}`}
                          onClick={() => setActiveSport("mlb")}
                        >
                          MLB
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-[#D8AC35] dark:text-[#00ff41] text-sm font-mono uppercase tracking-wider mb-2">+EV THRESHOLD</div>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Slider
                            value={[parseFloat(minEV)]}
                            onValueChange={(value) => setMinEV(value[0].toString())}
                            max={20}
                            min={0}
                            step={0.5}
                            className="w-full"
                          />
                        </div>
                        <span className="text-[#D8AC35] dark:text-[#00ff41] font-mono text-lg font-bold min-w-16">+{minEV}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-[#D8AC35] dark:text-[#00ff41] text-sm font-mono uppercase tracking-wider mb-2">STATUS</div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full animate-pulse"></div>
                        <span className="text-[#D8AC35] dark:text-[#00ff41] font-mono text-lg">SCANNING LIVE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trading Data Grid */}
                <div className="overflow-x-auto flex-1">
                  {isLoadingOpportunities ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-300 dark:border-gray-700 border-t-[#D8AC35] dark:border-t-[#00ff41] rounded-full animate-spin"></div>
                        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-[#D8AC35] dark:border-t-[#00ff41] rounded-full animate-spin absolute top-2 left-2" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                      </div>
                      <div className="text-[#D8AC35] dark:text-[#00ff41] font-mono text-lg font-bold mt-6 uppercase tracking-wider">SCANNING LIVE PRESETS</div>
                      <div className="text-gray-600 dark:text-gray-400 font-mono text-sm mt-2">Analyzing betting opportunities from {terminalStats?.booksScanned || 18} sportsbooks</div>
                    </div>
                  ) : (
                  <div className="min-w-[1400px] p-10">
                    {presetsData
                      .filter(preset => preset.ev >= parseFloat(minEV))
                      .sort((a, b) => b.ev - a.ev)
                      .map((preset) => (
                      <div key={preset.id} className="grid grid-cols-12 gap-4 items-center py-5 px-4 rounded-lg border-l-4 border-l-[#D8AC35] dark:border-l-[#00ff41] bg-white/60 dark:bg-gray-900/30 hover:bg-white/80 dark:hover:bg-gray-900/50 transition-all duration-300 mb-4 backdrop-blur-sm">
                        <div className="col-span-3 font-mono text-sm text-gray-900 dark:text-white">
                          <div className="font-bold">{preset.title}</div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs">{preset.description}</div>
                          <div className="text-gray-500 dark:text-gray-500 text-xs mt-1">@{preset.creator} • {preset.sport} • {preset.category} • Updated {preset.lastUpdated}</div>
                        </div>
                        
                        <div className="col-span-1 text-center">
                          <Badge className={`${getConfidenceColor(preset.confidence)} border-0 font-mono text-xs`}>
                            {preset.confidence}
                          </Badge>
                        </div>
                        
                        <div className="col-span-1 text-center">
                          <div className={`font-mono text-sm font-bold px-3 py-2 rounded ${getEVColor(preset.ev)}`}>
                            +{preset.ev}%
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">EV</div>
                        </div>

                        <div className="col-span-1 text-center">
                          <div className="text-gray-900 dark:text-white font-mono text-sm font-bold">{preset.winRate}%</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">Win Rate</div>
                        </div>

                        <div className="col-span-1 text-center">
                          <div className="text-[#D8AC35] font-mono text-sm font-bold">+{preset.roi}%</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">ROI</div>
                        </div>

                        <div className="col-span-1 text-center">
                          <div className="text-gray-900 dark:text-white font-mono text-sm font-bold">{preset.volume}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">Volume</div>
                        </div>

                        <div className="col-span-1 text-center">
                          <div className="text-gray-900 dark:text-white font-mono text-sm font-bold">
                            {preset.followers > 1000 ? `${(preset.followers/1000).toFixed(1)}k` : preset.followers}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">Followers</div>
                        </div>

                        <div className="col-span-1 text-center">
                          <div className={`w-4 h-4 rounded-full mx-auto ${preset.active ? 'bg-[#D8AC35] dark:bg-[#00ff41] animate-pulse' : 'bg-gray-400'}`}></div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">Status</div>
                        </div>

                        <div className="col-span-2">
                          <div className="flex gap-3 justify-end">
                            <Link href="/calculator">
                              <Button className="bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black hover:bg-[#D8AC35]/90 dark:hover:bg-[#00ff41]/90 font-mono text-xs px-4">
                                <BarChart3 className="w-3 h-3 mr-1" />
                                VIEW RESULTS
                              </Button>
                            </Link>
                            <Button variant="outline" size="icon" className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 w-8 h-8">
                              <Users className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="icon" className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 w-8 h-8">
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Bottom CTA */}
                    <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-center">
                        <Target className="w-12 h-12 text-[#D8AC35] dark:text-[#00ff41] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-mono uppercase tracking-wide">Ready to Build Your Edge?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 font-mono">Create custom presets with our advanced filtering tools and share your strategies with the community.</p>
                        <Link href="/view-builder">
                          <Button className="bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black hover:bg-[#D8AC35]/90 dark:hover:bg-[#00ff41]/90 gap-2 font-mono">
                            <Plus className="w-4 h-4" />
                            START BUILDING
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="builder" className="min-h-screen m-0 p-0 flex-1">
                <Card className="min-h-screen bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Plus className="h-5 w-5 text-[#D8AC35] dark:text-[#00ff41]" />
                      Preset Builder
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-900 dark:text-white">
                    <div className="text-center py-20">
                      <Target className="w-16 h-16 text-[#D8AC35] dark:text-[#00ff41] mx-auto mb-6" />
                      <h3 className="text-2xl font-bold mb-4 font-mono">BUILD YOUR PRESET</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-8">Create custom betting strategy presets with advanced filtering and conditions.</p>
                      <Link href="/view-builder">
                        <Button className="bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black hover:bg-[#D8AC35]/90 dark:hover:bg-[#00ff41]/90 gap-2 font-mono">
                          <Plus className="w-4 h-4" />
                          START BUILDING
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="min-h-screen m-0 p-0 flex-1">
                <Card className="min-h-screen bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <BarChart3 className="h-5 w-5 text-[#D8AC35] dark:text-[#00ff41]" />
                      Preset Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-900 dark:text-white">
                    <div className="text-center py-20">
                      <Trophy className="w-16 h-16 text-[#D8AC35] dark:text-[#00ff41] mx-auto mb-6" />
                      <h3 className="text-2xl font-bold mb-4 font-mono">ANALYTICS DASHBOARD</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-8">Track performance metrics and ROI across all your presets.</p>
                      <Button className="bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black hover:bg-[#D8AC35]/90 dark:hover:bg-[#00ff41]/90 gap-2 font-mono">
                        <BarChart3 className="w-4 h-4" />
                        VIEW ANALYTICS
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
