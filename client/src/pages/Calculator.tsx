import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calculator as CalculatorIcon, Target, AlertCircle, ExternalLink, Clock, Globe, Users } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { MAJOR_SPORTSBOOKS } from "@/lib/sports";
import { getSportIcon } from "@/lib/sportsIcons";
import { routeToBet, getSportsbookDisplayName } from "@/lib/betRouting";
import { formatInUserTimezone, getUserTimezone, TimezoneInfo } from '@/lib/timezone';
import { getSportsbookLogo } from '@/lib/sportsbookLogos';

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
  teamLogos?: { home: string; away: string };
  market: string;
  betType: string;
  line: string;
  mainBookOdds: number;
  ev: number;
  hit: number;
  projectedTotal?: number;
  gameTime: string;
  confidence: string;
  oddsComparison: SportsbookOdds[];
}

export default function Calculator() {
  const [selectedSport, setSelectedSport] = useState("all");
  const [minEV, setMinEV] = useState("3");
  const [maxBet, setMaxBet] = useState("1000");
  const [opportunities, setOpportunities] = useState<BettingOpportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [userTimezone, setUserTimezone] = useState<TimezoneInfo | null>(null);
  const [mainSportsbook, setMainSportsbook] = useState("DraftKings");

  useEffect(() => {
    // Get user's timezone on component mount
    setUserTimezone(getUserTimezone());
  }, []);

  // Fetch real demo betting opportunities from API
  const { data: demoData, isLoading: isLoadingOpportunities } = useQuery({
    queryKey: ['/api/demo/betting-opportunities'],
  });

  // Sort opportunities by EV (highest first)  
  const mockOpportunities: BettingOpportunity[] = (demoData?.opportunities || [
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
      projectedTotal: 5.5,
      gameTime: "4h 15m",
      confidence: "High",
      oddsComparison: [
        { sportsbook: "Rebet", odds: -111, ev: 19.42, isMainBook: true },
        { sportsbook: "PointsBet", odds: -152, ev: 0 },
        { sportsbook: "DraftKings", odds: -175, ev: -8.2 },
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
      projectedTotal: 4.5,
      gameTime: "3h 45m",
      confidence: "Medium",
      oddsComparison: [
        { sportsbook: "Rebet", odds: 115, ev: 1.44, isMainBook: true },
        { sportsbook: "FanDuel", odds: -105, ev: -2.3 },
        { sportsbook: "BetMGM", odds: -117, ev: -5.8 },
        { sportsbook: "DraftKings", odds: 105, ev: 0.8 }
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
      projectedTotal: 3.5,
      gameTime: "3h 45m", 
      confidence: "Low",
      oddsComparison: [
        { sportsbook: "Rebet", odds: -294, ev: -8.44, isMainBook: true },
        { sportsbook: "PointsBet", odds: -308, ev: -12.1 },
        { sportsbook: "Caesars", odds: -375, ev: -18.7 },
        { sportsbook: "BetMGM", odds: -360, ev: -16.2 },
        { sportsbook: "DraftKings", odds: -305, ev: -13.4 }
      ]
    },
    {
      id: "4",
      sport: "MLB",
      game: "Tampa Bay Rays vs Los Angeles Angels", 
      market: "Run Line",
      betType: "Los Angeles Angels +5.5",
      line: "Run Line +5.5",
      mainBookOdds: -217,
      ev: -8.92,
      hit: 67.82,
      projectedTotal: 5.5,
      gameTime: "2h 30m",
      confidence: "Low", 
      oddsComparison: [
        { sportsbook: "Rebet", odds: -217, ev: -8.92, isMainBook: true },
        { sportsbook: "FanDuel", odds: -218, ev: -9.1 },
        { sportsbook: "PointsBet", odds: -220, ev: -9.4 },
        { sportsbook: "BetMGM", odds: -244, ev: -12.8 },
        { sportsbook: "DraftKings", odds: -305, ev: -18.9 },
        { sportsbook: "Caesars", odds: -240, ev: -12.1 }
      ]
    }
  ]).sort((a, b) => b.ev - a.ev);

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
    if (mockOpportunities.length > 0) {
      setLoading(true);
      // Filter opportunities based on user selections
      setTimeout(() => {
        setOpportunities(mockOpportunities.filter(opp => 
          (selectedSport === "all" || opp.sport === selectedSport) &&
          opp.ev >= parseFloat(minEV)
        ));
        setLoading(false);
      }, 500);
    }
  }, [selectedSport, minEV, mockOpportunities]);

  // Set loading state based on API fetch
  useEffect(() => {
    setLoading(isLoadingOpportunities);
  }, [isLoadingOpportunities]);

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
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
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Sharp Shot Calculator
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time odds comparison and EV calculation across 40+ sportsbooks
          </p>
          
          {/* Timezone Display */}
          {userTimezone && (
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                Game times shown in your timezone: {userTimezone.timezone} ({userTimezone.abbreviation})
              </span>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500 max-w-2xl mx-auto">
            <p className="text-sm text-blue-700 dark:text-blue-300">
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
                  Live Betting Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Advanced Filter System */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                  {/* Group 0: Main Sportsbook Selection */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-charcoal dark:text-gray-200 mb-4">Your Sportsbook</h3>
                    
                    <div>
                      <Label htmlFor="mainBook" className="text-sm font-medium">Main Book</Label>
                      <Select value={mainSportsbook} onValueChange={setMainSportsbook}>
                        <SelectTrigger id="mainBook" className="hover-lift">
                          <SelectValue placeholder="Select Your Book" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DraftKings">DraftKings</SelectItem>
                          <SelectItem value="FanDuel">FanDuel</SelectItem>
                          <SelectItem value="BetMGM">BetMGM</SelectItem>
                          <SelectItem value="Caesars">Caesars</SelectItem>
                          <SelectItem value="PointsBet">PointsBet</SelectItem>
                          <SelectItem value="Rebet">Rebet</SelectItem>
                          <SelectItem value="Bet365">Bet365</SelectItem>
                          <SelectItem value="Barstool">Barstool</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Group 1: Market Filters */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-charcoal dark:text-gray-200 mb-4">Market</h3>
                    
                    <div>
                      <Label htmlFor="league" className="text-sm font-medium">League</Label>
                      <Select value={selectedSport} onValueChange={setSelectedSport}>
                        <SelectTrigger id="league" className="hover-lift">
                          <SelectValue placeholder="All Leagues" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Leagues</SelectItem>
                          <SelectItem value="NFL">NFL</SelectItem>
                          <SelectItem value="NBA">NBA</SelectItem>
                          <SelectItem value="MLB">MLB</SelectItem>
                          <SelectItem value="NHL">NHL</SelectItem>
                          <SelectItem value="NCAAF">NCAAF</SelectItem>
                          <SelectItem value="NCAAB">NCAAB</SelectItem>
                          <SelectItem value="UFC">UFC</SelectItem>
                          <SelectItem value="F1">Formula 1</SelectItem>
                          <SelectItem value="Soccer">Soccer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="betType" className="text-sm font-medium" title="The type of bet you want to place">Bet Type</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="betType" className="hover-lift">
                          <SelectValue placeholder="All Bet Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="spread" title="Margin-based bets on victory or loss">Spread</SelectItem>
                          <SelectItem value="total" title="Combined point totals for a game">Total (O/U)</SelectItem>
                          <SelectItem value="moneyline">Moneyline</SelectItem>
                          <SelectItem value="prop" title="Player or team stat bets (e.g., yards, receptions, strikeouts)">Props</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="propType" className="text-sm font-medium">Prop Type</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="propType" className="hover-lift">
                          <SelectValue placeholder="All Props" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Props</SelectItem>
                          <SelectItem value="passing-yards">Passing Yards</SelectItem>
                          <SelectItem value="rushing-yards">Rushing Yards</SelectItem>
                          <SelectItem value="receiving-yards">Receiving Yards</SelectItem>
                          <SelectItem value="rebounds">Rebounds</SelectItem>
                          <SelectItem value="assists">Assists</SelectItem>
                          <SelectItem value="home-runs">Home Runs</SelectItem>
                          <SelectItem value="strikeouts">Strikeouts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Group 2: Signal Strength */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-charcoal dark:text-gray-200 mb-4">Signal Strength</h3>
                    
                    <div>
                      <Label htmlFor="marketSide" className="text-sm font-medium">Market Side</Label>
                      <div className="flex space-x-4 mt-2">
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="marketSide" 
                            value="over" 
                            className="w-4 h-4 text-gold bg-gray-100 border-gray-300 focus:ring-gold"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Over</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="marketSide" 
                            value="under" 
                            className="w-4 h-4 text-gold bg-gray-100 border-gray-300 focus:ring-gold"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Under</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="marketSide" 
                            value="both" 
                            defaultChecked
                            className="w-4 h-4 text-gold bg-gray-100 border-gray-300 focus:ring-gold"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Both</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="minEV" className="text-sm font-medium" title="Positive Expected Value - profit potential over time based on odds inefficiency">Minimum EV %</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Slider
                          id="minEV"
                          min={0}
                          max={20}
                          step={0.1}
                          value={[parseFloat(minEV)]}
                          onValueChange={(value) => setMinEV(value[0].toString())}
                          className="flex-1"
                        />
                        <span className="min-w-16 text-sm font-mono text-green-600 dark:text-green-400 font-semibold">{minEV}%</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="minimumDataPoints" className="text-sm font-medium">Minimum Data Points</Label>
                      <Input 
                        type="number" 
                        id="minimumDataPoints"
                        min="1"
                        max="10"
                        defaultValue="3"
                        className="mt-2 hover-lift"
                      />
                    </div>

                    <div>
                      <Label htmlFor="startTimeWindow" className="text-sm font-medium">Start Time Window</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="startTimeWindow" className="hover-lift">
                          <SelectValue placeholder="All Times" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Times</SelectItem>
                          <SelectItem value="now">Starting Now</SelectItem>
                          <SelectItem value="1hr">Next 1 Hour</SelectItem>
                          <SelectItem value="2hr">Next 2 Hours</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Group 3: Book Configuration */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-charcoal dark:text-gray-200 mb-4">Book Configuration</h3>
                    
                    <div>
                      <Label htmlFor="sourceBooks" className="text-sm font-medium" title="The sportsbook offering this line">Source Books</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="sourceBooks" className="hover-lift">
                          <SelectValue placeholder="All Books" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Books</SelectItem>
                          <SelectItem value="draftkings">DraftKings</SelectItem>
                          <SelectItem value="fanduel">FanDuel</SelectItem>
                          <SelectItem value="betmgm">BetMGM</SelectItem>
                          <SelectItem value="caesars">Caesars</SelectItem>
                          <SelectItem value="pointsbet">PointsBet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="bookPriorityWeighting" className="text-sm font-medium">Book Priority Weighting</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Slider
                          id="bookPriorityWeighting"
                          min={0}
                          max={100}
                          step={5}
                          defaultValue={[50]}
                          className="flex-1"
                        />
                        <span className="min-w-16 text-sm font-mono text-gray-700 dark:text-gray-300">50%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Higher values prioritize premium sportsbooks</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="prematchOrLive" 
                        className="w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold"
                      />
                      <Label htmlFor="prematchOrLive" className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Markets Only</Label>
                    </div>

                    <div className="flex items-end">
                      <Button 
                        className="w-full bg-gold text-charcoal hover:bg-gold/90 hover-lift"
                        onClick={() => {
                          setLoading(true);
                          setTimeout(() => {
                            setOpportunities(mockOpportunities.filter(opp => 
                              (selectedSport === "all" || opp.sport === selectedSport) &&
                              opp.ev >= parseFloat(minEV)
                            ));
                            setLoading(false);
                          }, 1000);
                        }}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mb-3"></div>
                    <p className="text-gray-600 text-sm">Fetching sharpest lines across 47 sportsbooks...</p>
                  </div>
                ) : (
                  <div className="space-y-4 overflow-x-auto">
                    {opportunities.map((opp, index) => (
                      <Card key={`${opp.id}-${index}`} className="border-l-4 border-l-gold hover-lift">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{opp.sport}</Badge>
                              <h3 className="font-semibold">{opp.game}</h3>
                            </div>
                            <Badge 
                              className={getEVColor(opp.ev)}
                              title="Expected Value - shows how profitable the bet is compared to market consensus"
                            >
                              {opp.ev > 0 ? '+' : ''}{opp.ev}% EV
                            </Badge>
                          </div>
                          {/* Professional Betting Interface - Main Book vs Field */}
                          <div className="space-y-3">
                            {/* Header Row */}
                            <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-600 border-b pb-2">
                              <div className="col-span-2">Event Name</div>
                              <div className="col-span-1">League</div>
                              <div className="col-span-1">Prop Type</div>
                              <div className="col-span-1">Market</div>
                              <div className="col-span-1">Sportsbook</div>
                              <div className="col-span-1">Hit</div>
                              <div className="col-span-1">+EV%</div>
                              <div className="col-span-1">% Odds to</div>
                              <div className="col-span-3">Field Comparison</div>
                            </div>
                            
                            {/* Data Row */}
                            <div className="grid grid-cols-12 gap-2 text-sm items-center">
                              <div className="col-span-2 font-medium">{opp.game}</div>
                              <div className="col-span-1">{opp.sport}</div>
                              <div className="col-span-1">{opp.betType}</div>
                              <div className="col-span-1">{opp.line}</div>
                              <div className="col-span-1 font-medium">{mainSportsbook}</div>
                              <div className="col-span-1">{opp.hit?.toFixed(2) || '0.00'}%</div>
                              <div className={`col-span-1 px-2 py-1 rounded text-xs font-bold ${getEVColor(opp.ev)}`}>
                                {opp.ev > 0 ? '+' : ''}{opp.ev?.toFixed(2) || '0.00'}%
                              </div>
                              <div className="col-span-1">
                                <div className="bg-gray-100 rounded px-2 py-1 text-center">
                                  <div className="text-xs font-semibold">{formatOdds(opp.mainBookOdds)}</div>
                                </div>
                              </div>
                              <div className="col-span-3">
                                <div className="flex flex-wrap gap-1">
                                  {opp.oddsComparison.slice(1, 6).map((comp, idx) => (
                                    <div key={idx} className="bg-gray-800 text-white rounded px-2 py-1 text-xs">
                                      <div className="font-semibold">{formatOdds(comp.odds)}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
                    <Button className="w-full bg-gold text-charcoal hover:bg-gold/90">
                      Calculate EV
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Results</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Implied Probability:</span>
                          <span className="font-medium">52.38%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expected Value:</span>
                          <span className="font-medium text-green-600">+$0.02</span>
                        </div>
                        <div className="flex justify-between">
                          <span>EV Percentage:</span>
                          <span className="font-medium text-green-600">+0.02%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Quick Guide
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Positive EV = Profitable bet</li>
                        <li>• Negative EV = Unprofitable bet</li>
                        <li>• Higher EV% = Better opportunity</li>
                        <li>• Consider bankroll management</li>
                      </ul>
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
                  Odds Comparison - Josh Allen Passing Yards O274.5
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Table Headers with Tooltips */}
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg font-semibold text-sm border-b mb-4">
                  <div title="Total sportsbooks scanned right now" className="cursor-help">Books</div>
                  <div>Odds</div>
                  <div title="Expected value — profit margin based on odds" className="cursor-help">+EV</div>
                  <div title="Closing line value — compares your odds to the final market line" className="cursor-help">CLV</div>
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
                          className="hover:bg-gold hover:text-charcoal transition-colors"
                          onClick={() => routeToBet({
                            sportsbook: comp.sportsbook,
                            gameId: "sample-game",
                            betType: "sample-bet",
                            team: "sample-team",
                            line: "sample-line"
                          })}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Bet
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gold/10 rounded-lg">
                  <h4 className="font-semibold mb-2">Best Opportunity</h4>
                  <p className="text-sm">
                    <strong>PointsBet</strong> offers the highest EV at +5.2% with odds of -105.
                    Maximum bet limit: $200
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}