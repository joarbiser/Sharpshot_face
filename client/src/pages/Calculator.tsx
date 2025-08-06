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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Professional Betting Interface
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filter Controls */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-black mb-4">Your Sportsbook</h3>
                    
                    <div>
                      <Label htmlFor="mainBook" className="text-sm font-medium">Main Book</Label>
                      <Select value={mainSportsbook} onValueChange={setMainSportsbook}>
                        <SelectTrigger id="mainBook">
                          <SelectValue placeholder="Select Your Book" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DraftKings">DraftKings</SelectItem>
                          <SelectItem value="FanDuel">FanDuel</SelectItem>
                          <SelectItem value="BetMGM">BetMGM</SelectItem>
                          <SelectItem value="Caesars">Caesars</SelectItem>
                          <SelectItem value="PointsBet">PointsBet</SelectItem>
                          <SelectItem value="Rebet">Rebet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-black mb-4">Market</h3>
                    
                    <div>
                      <Label htmlFor="league" className="text-sm font-medium">League</Label>
                      <Select value={selectedSport} onValueChange={setSelectedSport}>
                        <SelectTrigger id="league">
                          <SelectValue placeholder="All Leagues" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Leagues</SelectItem>
                          <SelectItem value="NFL">NFL</SelectItem>
                          <SelectItem value="NBA">NBA</SelectItem>
                          <SelectItem value="MLB">MLB</SelectItem>
                          <SelectItem value="NHL">NHL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-black mb-4">Signal Strength</h3>
                    
                    <div>
                      <Label htmlFor="minEV" className="text-sm font-medium">Minimum EV %</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Slider
                          id="minEV"
                          min={-10}
                          max={20}
                          step={0.1}
                          value={[parseFloat(minEV)]}
                          onValueChange={(value) => setMinEV(value[0].toString())}
                          className="flex-1"
                        />
                        <span className="min-w-16 text-sm font-mono text-green-600 font-semibold">{minEV}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D8AC35] mb-3"></div>
                    <p className="text-gray-600 text-sm">Scanning 47 sportsbooks for profitable opportunities...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Professional Table Header */}
                    <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-600 border-b pb-2 px-4">
                      <div className="col-span-2">Event Name</div>
                      <div className="col-span-1">League</div>
                      <div className="col-span-1">Prop Type</div>
                      <div className="col-span-1">Market</div>
                      <div className="col-span-1">Sportsbook</div>
                      <div className="col-span-1">Hit</div>
                      <div className="col-span-1">+EV%</div>
                      <div className="col-span-1">Your Odds</div>
                      <div className="col-span-3">Field Comparison</div>
                    </div>
                    
                    {opportunities.map((opp, index) => {
                      const competitorBooks = getCompetitorBooks(opp.oddsComparison);
                      const fieldAverage = calculateFieldAverage(opp.oddsComparison);
                      
                      return (
                        <Card key={`${opp.id}-${index}`} className="border-l-4 border-l-[#D8AC35]">
                          <CardContent className="p-4">
                            {/* Professional Data Row */}
                            <div className="grid grid-cols-12 gap-2 text-sm items-center">
                              <div className="col-span-2 font-medium">{opp.game}</div>
                              <div className="col-span-1">{opp.sport}</div>
                              <div className="col-span-1">{opp.betType}</div>
                              <div className="col-span-1">{opp.line}</div>
                              <div className="col-span-1 font-medium">{mainSportsbook}</div>
                              <div className="col-span-1">{opp.hit.toFixed(2)}%</div>
                              <div className={`col-span-1 px-2 py-1 rounded text-xs font-bold ${getEVColor(opp.ev)}`}>
                                {opp.ev > 0 ? '+' : ''}{opp.ev.toFixed(2)}%
                              </div>
                              <div className="col-span-1">
                                <div className="bg-gray-100 rounded px-2 py-1 text-center">
                                  <div className="text-xs font-semibold">{formatOdds(opp.mainBookOdds)}</div>
                                </div>
                              </div>
                              <div className="col-span-3">
                                {/* Show competitor book names above field comparison */}
                                <div className="text-xs text-gray-500 mb-1">
                                  {competitorBooks.join(' • ')} • Avg
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {opp.oddsComparison.slice(1, 5).map((comp, idx) => (
                                    <div key={idx} className="bg-gray-800 text-white rounded px-2 py-1 text-xs">
                                      <div className="font-semibold">{formatOdds(comp.odds)}</div>
                                    </div>
                                  ))}
                                  {/* Field Average */}
                                  <div className="bg-[#D8AC35] text-black rounded px-2 py-1 text-xs font-bold">
                                    <div className="font-semibold">{formatOdds(fieldAverage)}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalculatorIcon className="h-5 w-5" />
                  Expected Value Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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