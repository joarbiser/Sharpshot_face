import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calculator as CalculatorIcon, Target, AlertCircle, ExternalLink, Clock, Globe } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { MAJOR_SPORTSBOOKS } from "@/lib/sports";
import { getSportIcon } from "@/lib/sportsIcons";
import { routeToBet, getSportsbookDisplayName } from "@/lib/betRouting";
import { formatInUserTimezone, getUserTimezone, TimezoneInfo } from '@/lib/timezone';

interface OddsComparison {
  sportsbook: string;
  odds: number;
  ev: number;
  maxBet: number;
  color: string;
}

interface BettingOpportunity {
  id: string;
  sport: string;
  game: string;
  market: string;
  betType: string;
  line: string;
  bestOdds: number;
  ev: number;
  maxBet: number;
  sportsbook: string;
  gameTime: string;
  confidence: string;
}

export default function Calculator() {
  const [selectedSport, setSelectedSport] = useState("all");
  const [minEV, setMinEV] = useState("3");
  const [maxBet, setMaxBet] = useState("1000");
  const [opportunities, setOpportunities] = useState<BettingOpportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [userTimezone, setUserTimezone] = useState<TimezoneInfo | null>(null);

  useEffect(() => {
    // Get user's timezone on component mount
    setUserTimezone(getUserTimezone());
  }, []);

  // Fetch real demo betting opportunities from API
  const { data: demoData, isLoading: isLoadingOpportunities } = useQuery({
    queryKey: ['/api/demo/betting-opportunities'],
  });

  const mockOpportunities: BettingOpportunity[] = demoData?.opportunities || [
    {
      id: "1",
      sport: "NFL",
      game: "Chiefs vs Bills",
      market: "Player Props",
      betType: "Josh Allen Passing Yards",
      line: "Over 274.5",
      bestOdds: -108,
      ev: 4.7,
      maxBet: 500,
      sportsbook: "DraftKings",
      gameTime: "2 hours",
      confidence: "High"
    },
    {
      id: "2",
      sport: "NBA",
      game: "Lakers vs Celtics",
      market: "Spread",
      betType: "Lakers",
      line: "+3.5",
      bestOdds: -110,
      ev: 3.2,
      maxBet: 1000,
      sportsbook: "FanDuel",
      gameTime: "4 hours",
      confidence: "Medium"
    },
    {
      id: "3",
      sport: "F1",
      game: "Monaco Grand Prix",
      market: "Race Winner",
      betType: "Max Verstappen",
      line: "+180",
      bestOdds: 180,
      ev: 8.4,
      maxBet: 250,
      sportsbook: "BetMGM",
      gameTime: "3 days",
      confidence: "High"
    },
    {
      id: "4",
      sport: "Soccer",
      game: "Manchester United vs Liverpool",
      market: "Both Teams to Score",
      betType: "Yes",
      line: "-120",
      bestOdds: -120,
      ev: 5.1,
      maxBet: 750,
      sportsbook: "Caesars",
      gameTime: "1 day",
      confidence: "Medium"
    },
    {
      id: "5",
      sport: "MLB",
      game: "Yankees vs Red Sox",
      market: "Total",
      betType: "Over",
      line: "9.5",
      bestOdds: +105,
      ev: 5.8,
      maxBet: 750,
      sportsbook: "Caesars",
      gameTime: "1 hour",
      confidence: "High"
    },
    {
      id: "4",
      sport: "NHL",
      game: "Rangers vs Bruins",
      market: "Moneyline",
      betType: "Rangers",
      line: "ML",
      bestOdds: +150,
      ev: 6.1,
      maxBet: 300,
      sportsbook: "BetMGM",
      gameTime: "3 hours",
      confidence: "Medium"
    }
  ];

  const oddsComparisons: OddsComparison[] = [
    { sportsbook: "DraftKings", odds: -108, ev: 4.7, maxBet: 500, color: "bg-green-500" },
    { sportsbook: "FanDuel", odds: -112, ev: 2.1, maxBet: 400, color: "bg-yellow-500" },
    { sportsbook: "Caesars", odds: -115, ev: 1.4, maxBet: 300, color: "bg-orange-500" },
    { sportsbook: "BetMGM", odds: -120, ev: -0.8, maxBet: 250, color: "bg-red-500" },
    { sportsbook: "PointsBet", odds: -105, ev: 5.2, maxBet: 200, color: "bg-green-600" }
  ];

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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
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
                              className={`${opp.ev >= 5 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                              title="Expected Value - shows how profitable the bet is compared to market consensus"
                            >
                              +{opp.ev}% EV
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm overflow-x-auto">
                            <div>
                              <span className="text-gray-500">Market:</span>
                              <p className="font-medium">{opp.market}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Bet:</span>
                              <p className="font-medium">{opp.betType} {opp.line}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Best Odds:</span>
                              <p className="font-medium">{formatOdds(opp.bestOdds)} @ {opp.sportsbook}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Game Time:</span>
                              <p className="font-medium">{opp.gameTime}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Badge className={getConfidenceColor(opp.confidence)}>
                                {opp.confidence} Confidence
                              </Badge>
                              <span className="text-sm text-gray-500">Max: ${opp.maxBet}</span>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-gold text-charcoal hover:bg-gold/90 flex items-center gap-1"
                              onClick={() => routeToBet({
                                sportsbook: opp.sportsbook,
                                gameId: opp.id,
                                betType: opp.betType,
                                team: opp.game.split(' vs ')[0],
                                line: opp.line
                              })}
                            >
                              <ExternalLink className="h-3 w-3" />
                              Place Bet
                            </Button>
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
                  {oddsComparisons.map((comp, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${comp.color}`}></div>
                        <span className="font-semibold">{comp.sportsbook}</span>
                      </div>
                      <div className="font-bold">{formatOdds(comp.odds)}</div>
                      <div className={`font-semibold ${comp.ev >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {comp.ev >= 0 ? '+' : ''}{comp.ev}%
                      </div>
                      <div className="text-sm text-gray-600">
                        Max: ${comp.maxBet}
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