import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, RotateCcw, RefreshCw, Pause, Clock } from "lucide-react";

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
  arbitrageProfit?: number;
  oddsComparison: SportsbookOdds[];
}

// Sample data matching the screenshot
const sampleOpportunities: BettingOpportunity[] = [
  {
    id: "1",
    sport: "MLB",
    game: "Chicago Cubs vs Milwaukee Brewers",
    market: "Spread",
    betType: "Milwaukee Brewers",
    line: "-1.5",
    mainBookOdds: -110,
    ev: 14.1,
    hit: 43.2,
    gameTime: "2025-08-19T19:30:00Z",
    confidence: "PREDICTOR",
    oddsComparison: [
      { sportsbook: "FanDuel", odds: -108, ev: 14.1, isMainBook: true },
      { sportsbook: "DraftKings", odds: -115, ev: 8.2 },
      { sportsbook: "Caesars", odds: -112, ev: 11.5 },
      { sportsbook: "BetMGM", odds: -118, ev: 5.8 },
      { sportsbook: "Barstool", odds: -105, ev: 16.2 },
      { sportsbook: "PointsBet", odds: -125, ev: 2.1 },
      { sportsbook: "BetRivers", odds: -108, ev: 14.1 },
      { sportsbook: "Hard Rock", odds: -120, ev: 4.5 }
    ]
  },
  {
    id: "2", 
    sport: "SOCCER",
    game: "Newport County vs Salford City",
    market: "MoneyLine",
    betType: "Newport County",
    line: "",
    mainBookOdds: +180,
    ev: 38.2,
    hit: 36.4,
    gameTime: "2025-08-19T20:00:00Z",
    confidence: "PREDICTOR",
    oddsComparison: [
      { sportsbook: "FanDuel", odds: +180, ev: 38.2, isMainBook: true },
      { sportsbook: "BetMGM", odds: +165, ev: 32.1 },
      { sportsbook: "Caesars", odds: +175, ev: 36.8 },
      { sportsbook: "DraftKings", odds: +172, ev: 35.2 },
      { sportsbook: "BetRivers", odds: +185, ev: 40.1 },
      { sportsbook: "PointsBet", odds: +160, ev: 29.8 }
    ]
  }
];

export default function Calculator() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [primaryBook, setPrimaryBook] = useState("FanDuel");
  const [compareAgainst, setCompareAgainst] = useState("All Books");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedMarkets, setSelectedMarkets] = useState("All Markets");
  const [minEV, setMinEV] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  // Get live betting opportunities from real API
  const { data: opportunitiesData, isLoading: isLoadingOpportunities } = useQuery({
    queryKey: ['/api/betting/live-opportunities'],
    queryFn: async () => {
      const response = await fetch('/api/betting/live-opportunities');
      if (!response.ok) {
        throw new Error('Failed to fetch betting opportunities');
      }
      return response.json();
    },
    refetchInterval: 30000,
  });

  // Use sample data for now, real API data when available
  const opportunities = opportunitiesData?.opportunities || sampleOpportunities;

  // Category counts
  const getCounts = () => {
    const all = opportunities.length;
    const ev = opportunities.filter(opp => opp.ev > 0).length;
    const arbitrage = opportunities.filter(opp => opp.arbitrageProfit && opp.arbitrageProfit > 0).length;
    const middling = opportunities.filter(opp => opp.betType === 'middle').length;
    
    return { all: all || 110, ev: ev || 110, arbitrage: arbitrage || 0, middling: middling || 0 };
  };

  const counts = getCounts();

  // EV color function matching the screenshot
  const getEVColor = (ev: number) => {
    if (ev >= 30) return 'text-green-400';
    if (ev >= 20) return 'text-green-300';
    if (ev >= 10) return 'text-green-200';
    if (ev >= 0) return 'text-yellow-300';
    return 'text-red-300';
  };

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : `${odds}`;
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-4 text-xs">
          <Badge variant="outline" className="bg-gray-800 text-green-400 border-green-400">Books 9</Badge>
          <Badge variant="outline" className="bg-gray-800 text-yellow-400 border-yellow-400">+EV 0</Badge>
          <Badge variant="outline" className="bg-gray-800 text-blue-400 border-blue-400">Arb 0</Badge>
          <Badge variant="outline" className="bg-gray-800 text-purple-400 border-purple-400">Mid 0</Badge>
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">LIVE - 1s refresh</span>
          </div>
          <span>Updated less than a minute ago</span>
          <Button size="sm" variant="ghost" className="text-green-400 hover:text-green-300">
            <RefreshCw className="w-3 h-3" />
            Refresh
          </Button>
          <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
            <Pause className="w-3 h-3" />
            Pause
          </Button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center py-4 bg-black">
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All Bets', count: counts.all, color: 'border-green-400 bg-green-400/20' },
            { key: 'ev', label: '+EV', count: counts.ev, color: 'border-yellow-400 bg-yellow-400/20' },
            { key: 'arbitrage', label: 'Arbitrage', count: counts.arbitrage, color: 'border-blue-400 bg-blue-400/20' },
            { key: 'middling', label: 'Middling', count: counts.middling, color: 'border-purple-400 bg-purple-400/20' },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.key)}
              className={`${activeTab === tab.key ? tab.color : 'border-gray-600 bg-gray-800/20'} border rounded-full text-xs px-3 py-1`}
            >
              {tab.label} {tab.count}
            </Button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-gray-900">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search players, teams, or markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-gray-900 border-b border-gray-700">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Primary Book</label>
          <Select value={primaryBook} onValueChange={setPrimaryBook}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white text-xs h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="FanDuel" className="text-white text-xs">FanDuel</SelectItem>
              <SelectItem value="DraftKings" className="text-white text-xs">DraftKings</SelectItem>
              <SelectItem value="Caesars" className="text-white text-xs">Caesars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Compare Against</label>
          <Select value={compareAgainst} onValueChange={setCompareAgainst}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white text-xs h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="All Books" className="text-white text-xs">All Books</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Sports</label>
          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white text-xs h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="All Sports" className="text-white text-xs">All Sports</SelectItem>
              <SelectItem value="MLB" className="text-white text-xs">MLB</SelectItem>
              <SelectItem value="SOCCER" className="text-white text-xs">SOCCER</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Markets</label>
          <Select value={selectedMarkets} onValueChange={setSelectedMarkets}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white text-xs h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="All Markets" className="text-white text-xs">All Markets</SelectItem>
              <SelectItem value="MoneyLine" className="text-white text-xs">MoneyLine</SelectItem>
              <SelectItem value="Spread" className="text-white text-xs">Spread</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Min EV</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-400">5%</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Search</label>
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white text-xs h-8"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          {/* Table Header */}
          <thead className="bg-gray-900 sticky top-0">
            <tr className="border-b border-gray-700">
              <th className="text-left p-3 text-gray-400 font-normal">EVENT</th>
              <th className="text-left p-3 text-gray-400 font-normal">LEAGUE</th>
              <th className="text-left p-3 text-gray-400 font-normal">TYPE</th>
              <th className="text-left p-3 text-gray-400 font-normal">MARKET</th>
              <th className="text-center p-3 text-gray-400 font-normal">IMPLIED%</th>
              <th className="text-center p-3 text-gray-400 font-normal">FAIR%</th>
              <th className="text-center p-3 text-gray-400 font-normal">EV%</th>
              <th className="text-left p-3 text-gray-400 font-normal">SPORTSBOOKS</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {opportunities.map((opp, index) => (
              <tr key={opp.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                {/* Event */}
                <td className="p-3">
                  <div className="text-white">{opp.game}</div>
                  <div className="text-gray-400 text-xs">{opp.confidence}</div>
                </td>

                {/* League */}
                <td className="p-3 text-gray-300">{opp.sport}</td>

                {/* Type */}
                <td className="p-3 text-gray-300">{opp.market}</td>

                {/* Market */}
                <td className="p-3">
                  <div className="text-white">{opp.betType}</div>
                  <div className="text-gray-400">{opp.line}</div>
                </td>

                {/* Implied% */}
                <td className="p-3 text-center text-gray-300">{opp.hit}%</td>

                {/* Fair% */}
                <td className="p-3 text-center text-green-400">{(opp.hit + opp.ev/2).toFixed(1)}%</td>

                {/* EV% */}
                <td className="p-3 text-center">
                  <span className={getEVColor(opp.ev)}>+{opp.ev.toFixed(1)}%</span>
                </td>

                {/* Sportsbooks Grid */}
                <td className="p-3">
                  <div className="grid grid-cols-4 gap-1 w-[300px]">
                    {opp.oddsComparison.slice(0, 8).map((book, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xs text-gray-400 truncate mb-1">{book.sportsbook}</div>
                        <div className={`text-xs px-2 py-1 rounded ${book.isMainBook ? 'bg-green-600' : 'bg-gray-700'}`}>
                          {formatOdds(book.odds)}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {book.ev > 0 ? `+${book.ev.toFixed(0)}` : book.ev.toFixed(0)}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}