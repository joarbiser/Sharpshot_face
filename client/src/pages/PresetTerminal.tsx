import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Plus, Settings, Play, Share2, Edit, Trash2, Copy, TrendingUp, Target, Bookmark } from "lucide-react";
import { useLocation } from "wouter";

interface Preset {
  id: string;
  name: string;
  description: string;
  sport: string;
  minEV: number;
  maxOdds: number;
  minOdds: number;
  sportsbooks: string[];
  marketTypes: string[];
  isPrivate: boolean;
  createdAt: string;
  author: string;
  uses: number;
  performance: {
    totalBets: number;
    winRate: number;
    avgEV: number;
    profit: number;
  };
}

const SAMPLE_PRESETS: Preset[] = [
  {
    id: "1",
    name: "High-Value NFL Props",
    description: "Focus on NFL player props with high expected value and reliable hit rates",
    sport: "NFL",
    minEV: 5.0,
    maxOdds: 200,
    minOdds: -200,
    sportsbooks: ["DraftKings", "FanDuel", "Caesars"],
    marketTypes: ["Player Props", "Game Props"],
    isPrivate: false,
    createdAt: "2024-01-15",
    author: "SharpBettor",
    uses: 1247,
    performance: {
      totalBets: 156,
      winRate: 67.3,
      avgEV: 7.2,
      profit: 2340
    }
  },
  {
    id: "2",
    name: "NBA Arbitrage Hunter",
    description: "Automated arbitrage detection across major NBA markets",
    sport: "NBA",
    minEV: 0.5,
    maxOdds: 300,
    minOdds: -300,
    sportsbooks: ["DraftKings", "FanDuel", "BetMGM", "Caesars"],
    marketTypes: ["Moneyline", "Spread", "Totals"],
    isPrivate: false,
    createdAt: "2024-01-10",
    author: "ArbMaster",
    uses: 892,
    performance: {
      totalBets: 203,
      winRate: 100,
      avgEV: 2.1,
      profit: 1580
    }
  },
  {
    id: "3",
    name: "Safe MLB Middling",
    description: "Conservative middling strategy for MLB totals",
    sport: "MLB",
    minEV: 2.0,
    maxOdds: 150,
    minOdds: -150,
    sportsbooks: ["FanDuel", "BetRivers", "ESPN BET"],
    marketTypes: ["Totals"],
    isPrivate: true,
    createdAt: "2024-01-08",
    author: "You",
    uses: 45,
    performance: {
      totalBets: 67,
      winRate: 89.6,
      avgEV: 4.1,
      profit: 890
    }
  }
];

export default function PresetTerminal() {
  const [, setLocation] = useLocation();
  const [presets, setPresets] = useState<Preset[]>(SAMPLE_PRESETS);
  const [activeTab, setActiveTab] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [newPreset, setNewPreset] = useState({
    name: "",
    description: "",
    sport: "all",
    minEV: 3,
    maxOdds: 200,
    minOdds: -200,
    sportsbooks: [] as string[],
    marketTypes: [] as string[],
    isPrivate: false
  });

  const filteredPresets = presets.filter(preset => {
    if (activeTab === "all") return true;
    if (activeTab === "public") return !preset.isPrivate;
    if (activeTab === "private") return preset.isPrivate;
    if (activeTab === "my-presets") return preset.author === "You";
    return true;
  });

  const handleApplyPreset = (preset: Preset) => {
    // Navigate to Trading Terminal with preset applied
    setLocation(`/trading-terminal?preset=${preset.id}`);
  };

  const handleCreatePreset = () => {
    const preset: Preset = {
      id: Date.now().toString(),
      ...newPreset,
      createdAt: new Date().toISOString().split('T')[0],
      author: "You",
      uses: 0,
      performance: {
        totalBets: 0,
        winRate: 0,
        avgEV: 0,
        profit: 0
      }
    };
    
    setPresets([preset, ...presets]);
    setIsCreating(false);
    setNewPreset({
      name: "",
      description: "",
      sport: "all",
      minEV: 3,
      maxOdds: 200,
      minOdds: -200,
      sportsbooks: [],
      marketTypes: [],
      isPrivate: false
    });
  };

  const PresetCard = ({ preset }: { preset: Preset }) => (
    <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                {preset.name}
              </CardTitle>
              {preset.isPrivate ? (
                <Badge variant="secondary" className="text-xs">Private</Badge>
              ) : (
                <Badge variant="outline" className="text-xs">Public</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {preset.description}
            </p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Sport:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">{preset.sport}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Min EV:</span>
            <span className="ml-2 font-medium text-[#D8AC35] dark:text-[#00ff41]">{preset.minEV}%</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Books:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">{preset.sportsbooks.length}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Markets:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">{preset.marketTypes.length}</span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 dark:text-white">{preset.performance.winRate}%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-[#D8AC35] dark:text-[#00ff41]">
              ${preset.performance.profit}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Profit</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black hover:bg-[#D8AC35]/90 dark:hover:bg-[#00ff41]/90"
            onClick={() => handleApplyPreset(preset)}
          >
            <Play className="w-4 h-4 mr-2" />
            Apply Preset
          </Button>
          <Button variant="outline" size="icon">
            <Copy className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>by {preset.author}</span>
          <span>{preset.uses} uses</span>
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Preset Terminal</h1>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                Strategy Builder
              </Badge>
            </div>
            
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button className="bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black hover:bg-[#D8AC35]/90 dark:hover:bg-[#00ff41]/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Preset
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Preset</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preset-name">Preset Name</Label>
                      <Input
                        id="preset-name"
                        value={newPreset.name}
                        onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                        placeholder="Enter preset name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preset-sport">Sport</Label>
                      <Select value={newPreset.sport} onValueChange={(value) => setNewPreset({ ...newPreset, sport: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sports</SelectItem>
                          <SelectItem value="NFL">NFL</SelectItem>
                          <SelectItem value="NBA">NBA</SelectItem>
                          <SelectItem value="MLB">MLB</SelectItem>
                          <SelectItem value="NHL">NHL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="preset-description">Description</Label>
                    <Input
                      id="preset-description"
                      value={newPreset.description}
                      onChange={(e) => setNewPreset({ ...newPreset, description: e.target.value })}
                      placeholder="Describe your preset strategy"
                    />
                  </div>
                  
                  <div>
                    <Label>Minimum EV (%)</Label>
                    <div className="mt-2">
                      <Slider
                        value={[newPreset.minEV]}
                        onValueChange={(value) => setNewPreset({ ...newPreset, minEV: value[0] })}
                        max={20}
                        min={0}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span className="font-medium">{newPreset.minEV}%</span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="private-preset"
                      checked={newPreset.isPrivate}
                      onCheckedChange={(checked) => setNewPreset({ ...newPreset, isPrivate: checked })}
                    />
                    <Label htmlFor="private-preset">Keep this preset private</Label>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleCreatePreset} className="flex-1">
                      Create Preset
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-lg grid-cols-4 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="all" className="text-sm">All Presets</TabsTrigger>
              <TabsTrigger value="public" className="text-sm">Public</TabsTrigger>
              <TabsTrigger value="private" className="text-sm">Private</TabsTrigger>
              <TabsTrigger value="my-presets" className="text-sm">My Presets</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPresets.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No presets found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first preset to get started with automated betting strategies.
            </p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Preset
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPresets.map((preset) => (
              <PresetCard key={preset.id} preset={preset} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}