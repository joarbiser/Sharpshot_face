import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calculator as CalculatorIcon, Target, AlertCircle, ExternalLink, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { getSportsbookLogo } from '@/lib/sportsbookLogos';
import { routeToBet } from "@/lib/betRouting";
import { formatInUserTimezone, getUserTimezone, TimezoneInfo } from '@/lib/timezone';

interface SportsbookOdds {
  sportsbook: string;
  odds: number;
  ev: number;
  isMainBook?: boolean;
}

interface BettingOpportunity {
  id: string;
  sport: string;
  game: string;
  market: string;
  betType: string;
  line: string;
  mainBookOdds: number;
  ev: number;
  hit: number;
  gameTime: string;
  confidence: string;
  oddsComparison: SportsbookOdds[];
}

export default function Calculator() {
  const [selectedSport, setSelectedSport] = useState("all");
  const [minEV, setMinEV] = useState("3");
  const [opportunities, setOpportunities] = useState<BettingOpportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [userTimezone, setUserTimezone] = useState<TimezoneInfo | null>(null);
  const [mainSportsbook, setMainSportsbook] = useState("DraftKings");

  useEffect(() => {
    setUserTimezone(getUserTimezone());
  }, []);

  // Mock opportunities data - sorted by EV (highest first)
  const mockOpportunities: BettingOpportunity[] = [
    {
      id: "1",
      sport: "MLB",
      game: "San Diego Padres vs Arizona Diamondbacks",
      market: "Total Runs",
      betType: "Over 5.5",
      line: "1st Half",
      mainBookOdds: -111,
      ev: 19.42,
      hit: 58.99,
      gameTime: "4h 15m",
      confidence: "High",
      oddsComparison: [
        { sportsbook: "DraftKings", odds: -111, ev: 19.42, isMainBook: true },
        { sportsbook: "PointsBet", odds: -152, ev: 0 },
        { sportsbook: "FanDuel", odds: -175, ev: -8.2 },
        { sportsbook: "Caesars", odds: -155, ev: -2.1 }
      ]
    },
    {
      id: "2", 
      sport: "MLB",
      game: "Toronto Blue Jays vs Colorado Rockies",
      market: "Team Total",
      betType: "Colorado Rockies Over 4.5",
      line: "Team Total",
      mainBookOdds: 115,
      ev: 1.44,
      hit: 47.16,
      gameTime: "3h 45m",
      confidence: "Medium",
      oddsComparison: [
        { sportsbook: "DraftKings", odds: 115, ev: 1.44, isMainBook: true },
        { sportsbook: "FanDuel", odds: -105, ev: -2.3 },
        { sportsbook: "BetMGM", odds: -117, ev: -5.8 },
        { sportsbook: "PointsBet", odds: 105, ev: 0.8 }
      ]
    },
    {
      id: "3",
      sport: "MLB", 
      game: "Toronto Blue Jays vs Colorado Rockies",
      market: "Run Line",
      betType: "Colorado Rockies +3.5",
      line: "Run Line +3.5",
      mainBookOdds: -294,
      ev: -8.44,
      hit: 74.29,
      gameTime: "3h 45m", 
      confidence: "Low",
      oddsComparison: [
        { sportsbook: "DraftKings", odds: -294, ev: -8.44, isMainBook: true },
        { sportsbook: "PointsBet", odds: -308, ev: -12.1 },
        { sportsbook: "Caesars", odds: -375, ev: -18.7 },
        { sportsbook: "BetMGM", odds: -360, ev: -16.2 }
      ]
    }
  ].sort((a, b) => b.ev - a.ev);

  // Helper function to get EV color based on value
  const getEVColor = (ev: number) => {
    if (ev >= 8) return "bg-green-500 text-white";
    if (ev >= 5) return "bg-green-400 text-white";  
    if (ev >= 3) return "bg-green-300 text-black";
    if (ev >= 1) return "bg-yellow-300 text-black";
    if (ev >= 0) return "bg-yellow-200 text-black";
    if (ev >= -3) return "bg-orange-300 text-black";
    if (ev >= -5) return "bg-red-300 text-black";
    return "bg-red-500 text-white";
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filteredOpportunities = mockOpportunities.filter(opp => 
        (selectedSport === "all" || opp.sport === selectedSport) &&
        opp.ev >= parseFloat(minEV)
      );
      setOpportunities(filteredOpportunities);
      setLoading(false);
    }, 500);
  }, [selectedSport, minEV]);

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  // Calculate average odds from competitor books (excluding main book)
  const calculateFieldAverage = (oddsComparison: SportsbookOdds[]) => {
    const competitorOdds = oddsComparison.filter(book => !book.isMainBook);
    if (competitorOdds.length === 0) return 0;
    
    const sum = competitorOdds.reduce((acc, book) => acc + book.odds, 0);
    return Math.round(sum / competitorOdds.length);
  };

  // Get competitor sportsbook names (excluding main book)
  const getCompetitorBooks = (oddsComparison: SportsbookOdds[]) => {
    return oddsComparison
      .filter(book => !book.isMainBook)
      .map(book => book.sportsbook)
      .slice(0, 4); // Show first 4 competitors
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "High": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Sharp Shot Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Real-time odds comparison and EV calculation across 40+ sportsbooks
          </p>
          
          {userTimezone && (
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                Game times shown in your timezone: {userTimezone.timezone} ({userTimezone.abbreviation})
              </span>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500 max-w-2xl mx-auto">
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> You're viewing live odds. Sign up to track and save your betting strategy.
            </p>
          </div>
        </div>

        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="opportunities">Live Opportunities</TabsTrigger>
            <TabsTrigger value="calculator">EV Calculator</TabsTrigger>
            <TabsTrigger value="comparison">Odds Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-6">
            {/* High-Tech Wall Street Trading Terminal Design */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-gradient-to-r from-black to-gray-900 px-10 py-8 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-7 w-7 text-[#00ff41]" />
                      <h2 className="text-3xl font-bold tracking-wide">SHARP SHOT TRADING TERMINAL</h2>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse"></div>
                      <span className="text-gray-300 font-mono">LIVE MARKET DATA</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-sm text-gray-400 font-mono">
                      {new Date().toLocaleTimeString()} EST
                    </div>
                    <div className="w-3 h-3 bg-[#00ff41] rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Market Stats Dashboard */}
              <div className="bg-gradient-to-r from-gray-900 to-black px-10 py-10 border-b border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  <div className="text-center">
                    <div className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">BOOKS SCANNED</div>
                    <div className="text-4xl font-bold font-mono text-white">47</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">+EV SIGNALS</div>
                    <div className="text-4xl font-bold font-mono text-[#00ff41]">1,247</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">AVG CLV</div>
                    <div className="text-4xl font-bold font-mono text-[#D8AC35]">+4.2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-3">WIN RATE</div>
                    <div className="text-4xl font-bold font-mono text-[#00ff41]">67.8%</div>
                  </div>
                </div>
              </div>

              {/* Terminal Control Panel */}
              <div className="bg-black px-10 py-8 border-b border-gray-700">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="space-y-3">
                    <div className="text-[#00ff41] text-sm font-mono uppercase tracking-wider mb-2">PRIMARY BOOK</div>
                    <Select value={mainSportsbook} onValueChange={setMainSportsbook}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white font-mono h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="DraftKings" className="text-white font-mono">DraftKings</SelectItem>
                        <SelectItem value="FanDuel" className="text-white font-mono">FanDuel</SelectItem>
                        <SelectItem value="BetMGM" className="text-white font-mono">BetMGM</SelectItem>
                        <SelectItem value="Caesars" className="text-white font-mono">Caesars</SelectItem>
                        <SelectItem value="PointsBet" className="text-white font-mono">PointsBet</SelectItem>
                        <SelectItem value="Rebet" className="text-white font-mono">Rebet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-[#00ff41] text-sm font-mono uppercase tracking-wider mb-2">MARKET FILTER</div>
                    <Select value={selectedSport} onValueChange={setSelectedSport}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white font-mono h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="all" className="text-white font-mono">ALL MARKETS</SelectItem>
                        <SelectItem value="NFL" className="text-white font-mono">NFL</SelectItem>
                        <SelectItem value="NBA" className="text-white font-mono">NBA</SelectItem>
                        <SelectItem value="MLB" className="text-white font-mono">MLB</SelectItem>
                        <SelectItem value="NHL" className="text-white font-mono">NHL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="text-[#00ff41] text-sm font-mono uppercase tracking-wider mb-2">EV THRESHOLD</div>
                    <div className="flex items-center space-x-4">
                      <Slider
                        min={-10}
                        max={20}
                        step={0.1}
                        value={[parseFloat(minEV)]}
                        onValueChange={(value) => setMinEV(value[0].toString())}
                        className="flex-1"
                      />
                      <span className="text-[#00ff41] font-mono text-lg font-bold min-w-16">{minEV}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-[#00ff41] text-sm font-mono uppercase tracking-wider mb-2">STATUS</div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-[#00ff41] rounded-full animate-pulse"></div>
                      <span className="text-[#00ff41] font-mono text-lg">SCANNING LIVE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trading Data Grid */}
              <div className="bg-gradient-to-b from-black to-gray-900">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gray-700 border-t-[#00ff41] rounded-full animate-spin"></div>
                      <div className="w-12 h-12 border-4 border-gray-800 border-t-[#D8AC35] rounded-full animate-spin absolute top-2 left-2" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                    </div>
                    <p className="text-[#00ff41] font-mono text-sm mt-4 animate-pulse">ANALYZING MARKET CONDITIONS...</p>
                    <p className="text-gray-400 font-mono text-xs mt-1">Scanning 47 sportsbooks for arbitrage opportunities</p>
                  </div>
                ) : (
                  <div className="p-10">
                    {/* Trading Grid Header */}
                    <div className="grid grid-cols-9 gap-6 text-sm font-mono uppercase tracking-wider text-gray-400 border-b border-gray-700 pb-4 mb-6">
                      <div className="col-span-1">EVENT</div>
                      <div className="col-span-1">LEAGUE</div>
                      <div className="col-span-1">TYPE</div>
                      <div className="col-span-1">MARKET</div>
                      <div className="col-span-1">BOOK</div>
                      <div className="col-span-1">PROB</div>
                      <div className="col-span-1">EV%</div>
                      <div className="col-span-1">ODDS</div>
                      <div className="col-span-1">FIELD</div>
                    </div>
                    
                    {opportunities.map((opp, index) => {
                      const fieldAverage = calculateFieldAverage(opp.oddsComparison);
                      
                      return (
                        <div key={`${opp.id}-${index}`} className="grid grid-cols-9 gap-6 items-center py-5 px-4 rounded-lg border-l-4 border-l-[#00ff41] bg-gradient-to-r from-gray-900/50 to-transparent hover:from-gray-800/50 transition-all duration-300 mb-4">
                          <div className="col-span-1 font-mono text-sm text-white">{opp.game}</div>
                          <div className="col-span-1 font-mono text-sm text-gray-300">{opp.sport}</div>
                          <div className="col-span-1 font-mono text-sm text-gray-300">{opp.betType}</div>
                          <div className="col-span-1 font-mono text-sm text-gray-300">{opp.line}</div>
                          <div className="col-span-1 font-mono text-sm text-[#00ff41]">{mainSportsbook}</div>
                          <div className="col-span-1 font-mono text-sm text-white">{opp.hit.toFixed(1)}%</div>
                          <div className={`col-span-1 font-mono text-sm font-bold px-3 py-2 rounded text-center ${
                            opp.ev >= 8 ? 'bg-[#00ff41] text-black' :
                            opp.ev >= 5 ? 'bg-green-600 text-white' :
                            opp.ev >= 3 ? 'bg-green-500 text-white' :
                            opp.ev >= 1 ? 'bg-yellow-500 text-black' :
                            opp.ev >= 0 ? 'bg-yellow-400 text-black' :
                            'bg-red-500 text-white'
                          }`}>
                            {opp.ev > 0 ? '+' : ''}{opp.ev.toFixed(1)}%
                          </div>
                          <div className="col-span-1">
                            <div className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-center">
                              <div className="font-mono text-sm text-[#00ff41] font-bold">{formatOdds(opp.mainBookOdds)}</div>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex gap-2 justify-start">
                              {/* Field Average */}
                              <div className="flex flex-col items-center space-y-2">
                                <div className="text-xs text-gray-400 font-mono uppercase h-6 flex items-center justify-center">AVG</div>
                                <div className="bg-[#D8AC35] text-black rounded-lg px-3 py-1 text-xs font-bold font-mono text-center">
                                  {formatOdds(fieldAverage)}
                                </div>
                              </div>
                              {/* Competitor Books */}
                              {opp.oddsComparison.slice(1, 3).map((comp, idx) => (
                                <div key={idx} className="flex flex-col items-center space-y-2">
                                  <div className="h-6 flex items-center justify-center">
                                    {getSportsbookLogo(comp.sportsbook)}
                                  </div>
                                  <div className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-1 text-xs font-mono text-center">
                                    {formatOdds(comp.odds)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalculatorIcon className="h-5 w-5" />
                  Professional EV Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Professional Calculator Interface matching the design */}
                <div className="bg-gray-900 text-white rounded-lg p-6">
                  {/* Header with stats */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">SHARP SHOT CALCULATOR</h2>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">LIVE</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-gray-400 text-sm font-semibold mb-2">BOOKS</div>
                      <div className="text-4xl font-bold">47</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-sm font-semibold mb-2">+EV FOUND</div>
                      <div className="text-4xl font-bold text-green-500">1,247</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-sm font-semibold mb-2">AVG CLV</div>
                      <div className="text-4xl font-bold text-[#D8AC35]">+4.2%</div>
                    </div>
                  </div>

                  {/* Live Opportunities */}
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                      <div className="text-white">
                        <span className="font-semibold">LAL vs GSW</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-300">O225.5</span>
                      </div>
                      <div className="bg-green-500 text-black px-3 py-1 rounded font-bold text-sm">
                        +8.3%
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                      <div className="text-white">
                        <span className="font-semibold">MIA vs BOS</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-300">U112.5</span>
                      </div>
                      <div className="bg-green-500 text-black px-3 py-1 rounded font-bold text-sm">
                        +6.1%
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                      <div className="text-white">
                        <span className="font-semibold">DAL -3.5</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-300">1H</span>
                      </div>
                      <div className="bg-green-500 text-black px-3 py-1 rounded font-bold text-sm">
                        +4.7%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Traditional Calculator Below */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="american-odds">American Odds</Label>
                      <Input id="american-odds" type="number" placeholder="-110" />
                    </div>
                    <div>
                      <Label htmlFor="true-probability">True Probability (%)</Label>
                      <Input id="true-probability" type="number" placeholder="52.4" />
                    </div>
                    <div>
                      <Label htmlFor="stake">Stake ($)</Label>
                      <Input id="stake" type="number" placeholder="100" />
                    </div>
                    <Button className="w-full bg-[#D8AC35] text-black hover:bg-[#D8AC35]/90">
                      Calculate EV
                    </Button>
                  </div>
                  <div className="col-span-2 p-6 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-4">Expected Value Result</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Implied Probability:</strong> 52.38%</p>
                      <p><strong>Expected Value:</strong> <span className="text-green-600 font-bold">+$2.18</span></p>
                      <p><strong>EV Percentage:</strong> <span className="text-green-600 font-bold">+2.18%</span></p>
                      <p><strong>Long-term Profit:</strong> $21.80 per 100 bets</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Odds Comparison - Sample Bet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg font-semibold text-sm border-b mb-4">
                  <div>Sportsbook</div>
                  <div>Odds</div>
                  <div>+EV</div>
                  <div>Action</div>
                </div>

                <div className="space-y-4">
                  {opportunities.length > 0 && opportunities[0].oddsComparison.map((comp, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg items-center">
                      <div className="flex items-center gap-2">
                        {getSportsbookLogo(comp.sportsbook)}
                        <span className="font-semibold">{comp.sportsbook}</span>
                        {comp.isMainBook && <Badge className="bg-blue-100 text-blue-800">Your Book</Badge>}
                      </div>
                      <div className="font-bold">{formatOdds(comp.odds)}</div>
                      <div className={`font-semibold ${comp.ev >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {comp.ev >= 0 ? '+' : ''}{comp.ev}%
                      </div>
                      <div className="text-sm text-gray-600">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="hover:bg-[#D8AC35] hover:text-black transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Bet
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}