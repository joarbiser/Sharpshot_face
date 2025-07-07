import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calculator as CalculatorIcon, Target, AlertCircle, ExternalLink } from "lucide-react";
import { MAJOR_SPORTSBOOKS } from "@/lib/sports";
import { getSportIcon } from "@/lib/sportsIcons";
import { routeToBet, getSportsbookDisplayName } from "@/lib/betRouting";

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sharp Shot Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Real-time odds comparison and EV calculation across 40+ sportsbooks
          </p>
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <Label htmlFor="sport">Sport</Label>
                    <Select value={selectedSport} onValueChange={setSelectedSport}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sports</SelectItem>
                        <SelectItem value="NFL">🏈 NFL</SelectItem>
                        <SelectItem value="NBA">🏀 NBA</SelectItem>
                        <SelectItem value="MLB">⚾ MLB</SelectItem>
                        <SelectItem value="NHL">🏒 NHL</SelectItem>
                        <SelectItem value="F1">🏎️ Formula 1</SelectItem>
                        <SelectItem value="Soccer">⚽ Soccer</SelectItem>
                        <SelectItem value="Tennis">🎾 Tennis</SelectItem>
                        <SelectItem value="MMA">🥊 MMA/UFC</SelectItem>
                        <SelectItem value="Golf">⛳ Golf</SelectItem>
                        <SelectItem value="Cricket">🏏 Cricket</SelectItem>
                        <SelectItem value="Boxing">🥊 Boxing</SelectItem>
                        <SelectItem value="NCAA Basketball">🏀 NCAA Basketball</SelectItem>
                        <SelectItem value="NCAA Football">🏈 NCAA Football</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="minEV">Min EV%</Label>
                    <Input
                      id="minEV"
                      type="number"
                      value={minEV}
                      onChange={(e) => setMinEV(e.target.value)}
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxBet">Max Bet</Label>
                    <Input
                      id="maxBet"
                      type="number"
                      value={maxBet}
                      onChange={(e) => setMaxBet(e.target.value)}
                      placeholder="1000"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      className="w-full bg-gold text-white hover:bg-gold/90"
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
                      Refresh Data
                    </Button>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {opportunities.map((opp) => (
                      <Card key={opp.id} className="border-l-4 border-l-gold">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{opp.sport}</Badge>
                              <h3 className="font-semibold">{opp.game}</h3>
                            </div>
                            <Badge className={`${opp.ev >= 5 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              +{opp.ev}% EV
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                              className="bg-gold text-white hover:bg-gold/90 flex items-center gap-1"
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
                    <Button className="w-full bg-gold text-white hover:bg-gold/90">
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
                <div className="space-y-4">
                  {oddsComparisons.map((comp, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${comp.color}`}></div>
                        <div>
                          <h4 className="font-semibold">{comp.sportsbook}</h4>
                          <p className="text-sm text-gray-500">Max: ${comp.maxBet}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatOdds(comp.odds)}</p>
                        <p className={`text-sm ${comp.ev >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {comp.ev >= 0 ? '+' : ''}{comp.ev}% EV
                        </p>
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