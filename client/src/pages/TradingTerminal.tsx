import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calculator as CalculatorIcon, Target, AlertCircle, ExternalLink, Clock, Filter, Settings } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { getSportsbookLogo, SportsbookDot } from '@/lib/sportsbookLogos';
import { SportsbookLogo } from '../components/SportsbookLogo';
import { routeToBet } from "@/lib/betRouting";
import { formatInUserTimezone, getUserTimezone, TimezoneInfo } from '@/lib/timezone';
import { CategoryTabs, CategoryBadge } from '../components/CategoryTabs';
import { BetCategorizer, type BetCategory } from '../../../shared/betCategories';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Import sportsbooks data through a shared module
const SPORTSBOOKS = {
  'FanDuel': { name: 'FanDuel', logo: '/booklogos/fanduel.png', displayName: 'FanDuel' },
  'DraftKings': { name: 'DraftKings', logo: '/booklogos/draftkings.png', displayName: 'DraftKings' },
  'Caesars': { name: 'Caesars', logo: '/booklogos/caesars.png', displayName: 'Caesars' },
  'BetRivers': { name: 'BetRivers', logo: '/booklogos/betrivers.png', displayName: 'BetRivers' },
  'ESPNBET': { name: 'ESPN BET', logo: '/booklogos/espnbet.png', displayName: 'ESPN BET' },
  'Fanatics': { name: 'Fanatics', logo: '/booklogos/fanatics.png', displayName: 'Fanatics' },
  'BetOnline': { name: 'BetOnline', logo: '/booklogos/betonline.jpg', displayName: 'BetOnline' },
  'Bovada': { name: 'Bovada', logo: '/booklogos/bovada.jpg', displayName: 'Bovada' }
};

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
  category?: BetCategory;
  arbitrageProfit?: number;
  oddsComparison: SportsbookOdds[];
}

export default function TradingTerminal() {
  const [selectedSport, setSelectedSport] = useState("all");
  const [minEV, setMinEV] = useState("3");
  const [activeView, setActiveView] = useState("all");
  const currentTime = useLiveTime();
  const [opportunities, setOpportunities] = useState<BettingOpportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [userTimezone, setUserTimezone] = useState<TimezoneInfo | null>(null);

  // Get user's timezone on component mount
  useEffect(() => {
    setUserTimezone(getUserTimezone());
  }, []);

  // Fetch betting opportunities from the API
  const { data: apiOpportunities, isLoading, error } = useQuery({
    queryKey: ['/api/betting-opportunities'],
    enabled: true
  });

  useEffect(() => {
    if (apiOpportunities && Array.isArray(apiOpportunities)) {
      const categorizedOpportunities = apiOpportunities.map((opp: any) => ({
        ...opp,
        category: BetCategorizer.categorizeBet(opp)
      }));
      setOpportunities(categorizedOpportunities);
    }
  }, [apiOpportunities]);

  // Filter opportunities based on active view
  const filteredOpportunities = opportunities.filter(opp => {
    if (activeView === "all") return true;
    if (activeView === "ev") return opp.category === "ev";
    if (activeView === "arbitrage") return opp.category === "arbitrage";
    if (activeView === "middling") return opp.category === "middling";
    return true;
  });

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  const formatTime = (gameTime: string, timezone?: TimezoneInfo) => {
    if (!timezone) return gameTime;
    return formatInUserTimezone(gameTime, timezone.abbreviation);
  };

  const BetCard = ({ opportunity }: { opportunity: BettingOpportunity }) => (
    <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CategoryBadge category={opportunity.category || "ev"} />
              <Badge variant="outline" className="text-xs">
                {opportunity.sport}
              </Badge>
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              {opportunity.game}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {opportunity.market} • {opportunity.betType}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#D8AC35] dark:text-[#00ff41]">
              {opportunity.ev > 0 ? '+' : ''}{opportunity.ev.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {opportunity.hit}% Hit Rate
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {opportunity.line}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {formatTime(opportunity.gameTime, userTimezone || undefined)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {formatOdds(opportunity.mainBookOdds)}
            </div>
            <Badge variant={opportunity.confidence === 'High' ? 'default' : 'secondary'} className="mt-1">
              {opportunity.confidence}
            </Badge>
          </div>
        </div>

        {/* Odds Comparison */}
        <div className="grid grid-cols-2 gap-2">
          {opportunity.oddsComparison.slice(0, 4).map((book, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <SportsbookLogo 
                  sportsbook={book.sportsbook} 
                  size="sm"
                />
                <span className="text-xs font-medium text-gray-900 dark:text-white truncate">
                  {book.sportsbook}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatOdds(book.odds)}
                </div>
                <div className="text-xs text-[#D8AC35] dark:text-[#00ff41]">
                  {book.ev > 0 ? '+' : ''}{book.ev.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black hover:bg-[#D8AC35]/90 dark:hover:bg-[#00ff41]/90 transition-colors"
            onClick={() => {
              const mainBook = opportunity.oddsComparison.find(book => book.isMainBook);
              if (mainBook) {
                const url = "https://" + mainBook.sportsbook.toLowerCase().replace(/\s+/g, '') + ".com";
                window.open(url, '_blank');
              }
            }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Place Bet
          </Button>
          <Button variant="outline" size="icon">
            <Target className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trading Terminal</h1>
              <Badge variant="outline" className="bg-[#D8AC35]/10 text-[#D8AC35] dark:bg-[#00ff41]/10 dark:text-[#00ff41]">
                Live Feed
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {currentTime.toLocaleTimeString()}
              </div>
              
              {/* Filter Panel Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filter Settings</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label htmlFor="sport-filter">Sport</Label>
                      <Select value={selectedSport} onValueChange={setSelectedSport}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Sports" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sports</SelectItem>
                          <SelectItem value="nfl">NFL</SelectItem>
                          <SelectItem value="nba">NBA</SelectItem>
                          <SelectItem value="mlb">MLB</SelectItem>
                          <SelectItem value="nhl">NHL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="min-ev">Minimum EV (%)</Label>
                      <div className="mt-2">
                        <Slider
                          value={[parseInt(minEV)]}
                          onValueChange={(value) => setMinEV(value[0].toString())}
                          max={20}
                          min={0}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span className="font-medium">{minEV}%</span>
                          <span>20%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
              <TabsTrigger value="ev" className="text-sm">+EV</TabsTrigger>
              <TabsTrigger value="arbitrage" className="text-sm">Arbitrage</TabsTrigger>
              <TabsTrigger value="middling" className="text-sm">Middling</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D8AC35] dark:border-[#00ff41] mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading opportunities...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Unable to load opportunities
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Please check your connection and try again.
            </p>
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No opportunities found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <BetCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}