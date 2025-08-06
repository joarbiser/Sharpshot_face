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
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Full Page Gradient Background */}
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
        
        {/* Terminal Header */}
        <div className="text-gray-900 dark:text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-7 h-7 text-[#D8AC35] dark:text-[#00ff41]" />
                  <h1 className="text-3xl font-bold tracking-wide">SHARP SHOT PRESET TERMINAL</h1>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-300 font-mono">LIVE PRESET DATA</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <Link href="/view-builder">
                  <Button className="bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black hover:bg-[#D8AC35]/90 dark:hover:bg-[#00ff41]/90 gap-2 font-mono">
                    <Plus className="w-4 h-4" />
                    CREATE PRESET
                  </Button>
                </Link>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  {new Date().toLocaleTimeString()} EST
                </div>
                <div className="w-3 h-3 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Market Stats Dashboard */}
          <div className="px-10 py-10 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="text-center">
                <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">ACTIVE PRESETS</div>
                <div className="text-4xl font-bold font-mono text-gray-900 dark:text-white">247</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">AVG. EV</div>
                <div className="text-4xl font-bold font-mono text-[#D8AC35] dark:text-[#00ff41]">+7.2%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">TOTAL FOLLOWERS</div>
                <div className="text-4xl font-bold font-mono text-[#D8AC35]">12.4K</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600 dark:text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">SUCCESS RATE</div>
                <div className="text-4xl font-bold font-mono text-[#D8AC35] dark:text-[#00ff41]">71%</div>
              </div>
            </div>
          </div>

          {/* Terminal Control Panel */}
          <div className="px-10 py-8 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                <div className="text-[#D8AC35] dark:text-[#00ff41] text-sm font-mono uppercase tracking-wider mb-2">MIN EV THRESHOLD</div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-900 dark:text-white font-mono text-sm">0%</span>
                  <div className="flex-1 h-2 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm">
                    <div className="h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-[#D8AC35] dark:text-[#00ff41] font-mono text-lg font-bold">5%</span>
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

          {/* Build Your Edge CTA Section */}
          <div className="p-10 pb-6">
            <div className="text-center bg-white/40 dark:bg-gray-900/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 dark:border-gray-700/30">
              <Target className="w-16 h-16 text-[#D8AC35] dark:text-[#00ff41] mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-mono uppercase tracking-wide">Ready to Build Your Edge?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 font-mono max-w-2xl mx-auto">Create custom presets with our advanced filtering tools and share your strategies with the community.</p>
              <Link href="/view-builder">
                <Button className="bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black hover:bg-[#D8AC35]/90 dark:hover:bg-[#00ff41]/90 gap-2 font-mono text-lg px-8 py-3">
                  <Plus className="w-5 h-5" />
                  START BUILDING
                </Button>
              </Link>
            </div>
          </div>

          {/* Public Presets Header */}
          <div className="px-10 pb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-mono uppercase tracking-wide">Public Presets</h3>
            <p className="text-gray-600 dark:text-gray-400 font-mono text-sm mt-1">Community-shared betting strategies and filters</p>
          </div>

          {/* Trading Data Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[1400px] px-10 pb-10 overflow-y-auto">
              {presetsData.map((preset) => (
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
                    <div className={`font-mono text-sm font-bold px-3 py-2 rounded ${
                      preset.ev >= 8 ? 'bg-[#D8AC35] text-white dark:bg-[#00ff41] dark:text-black' :
                      preset.ev >= 5 ? 'bg-green-600 text-white' :
                      preset.ev >= 3 ? 'bg-green-500 text-white' :
                      preset.ev >= 1 ? 'bg-yellow-500 text-black' :
                      'bg-yellow-400 text-black'
                    }`}>
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


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
