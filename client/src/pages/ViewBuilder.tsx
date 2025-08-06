import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, Play, Settings } from "lucide-react";

interface Filter {
  id: string;
  field: string;
  operator: string;
  value: string;
  enabled: boolean;
}

interface PresetConfig {
  name: string;
  description: string;
  sport: string;
  market: string;
  minEV: number;
  maxRisk: number;
  timeFilter: string;
  filters: Filter[];
  isPublic: boolean;
  autoRefresh: boolean;
  notifications: boolean;
}

export default function ViewBuilder() {
  const [presetConfig, setPresetConfig] = useState<PresetConfig>({
    name: "",
    description: "",
    sport: "all",
    market: "all",
    minEV: 3,
    maxRisk: 1000,
    timeFilter: "all",
    filters: [],
    isPublic: false,
    autoRefresh: true,
    notifications: false
  });

  const [activeResults, setActiveResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addFilter = () => {
    const newFilter: Filter = {
      id: Date.now().toString(),
      field: "odds",
      operator: "gt",
      value: "",
      enabled: true
    };
    setPresetConfig(prev => ({
      ...prev,
      filters: [...prev.filters, newFilter]
    }));
  };

  const removeFilter = (id: string) => {
    setPresetConfig(prev => ({
      ...prev,
      filters: prev.filters.filter(f => f.id !== id)
    }));
  };

  const updateFilter = (id: string, field: keyof Filter, value: any) => {
    setPresetConfig(prev => ({
      ...prev,
      filters: prev.filters.map(f => 
        f.id === id ? { ...f, [field]: value } : f
      )
    }));
  };

  const runPreset = async () => {
    setIsRunning(true);
    // Simulate API call with realistic betting data
    setTimeout(() => {
      const mockResults = [
        {
          id: "1",
          game: "Chiefs vs Bills",
          market: "Player Props",
          bet: "Josh Allen Passing Yards Over 274.5",
          odds: -108,
          ev: 4.7,
          sportsbook: "DraftKings",
          maxBet: 500,
          gameTime: "2 hours"
        },
        {
          id: "2",
          game: "Lakers vs Celtics",
          market: "Spread",
          bet: "Lakers +3.5",
          odds: -110,
          ev: 3.2,
          sportsbook: "FanDuel",
          maxBet: 1000,
          gameTime: "4 hours"
        },
        {
          id: "3",
          game: "Yankees vs Red Sox",
          market: "Total",
          bet: "Over 9.5",
          odds: +105,
          ev: 5.8,
          sportsbook: "Caesars",
          maxBet: 750,
          gameTime: "1 hour"
        }
      ];
      setActiveResults(mockResults);
      setIsRunning(false);
    }, 1500);
  };

  const savePreset = () => {
    // Simulate saving preset
    alert("Preset saved successfully! You can find it in your Presets dashboard.");
  };

  const fieldOptions = [
    { value: "odds", label: "Odds" },
    { value: "ev", label: "Expected Value %" },
    { value: "gameTime", label: "Game Time (hours)" },
    { value: "maxBet", label: "Max Bet Limit" },
    { value: "spread", label: "Spread" },
    { value: "total", label: "Total Points" },
    { value: "moneyline", label: "Moneyline" },
    { value: "bookmaker", label: "Sportsbook" }
  ];

  const operatorOptions = [
    { value: "gt", label: "Greater Than" },
    { value: "lt", label: "Less Than" },
    { value: "eq", label: "Equal To" },
    { value: "gte", label: "Greater Than or Equal" },
    { value: "lte", label: "Less Than or Equal" },
    { value: "contains", label: "Contains" },
    { value: "not", label: "Not Equal To" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Preset Builder
          </h1>
          <p className="text-xl text-gray-600">
            Create custom betting strategies with advanced filters and conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Basic Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="presetName">Preset Name</Label>
                    <Input
                      id="presetName"
                      value={presetConfig.name}
                      onChange={(e) => setPresetConfig(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., High EV NBA Props"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sport">Sport</Label>
                    <Select value={presetConfig.sport} onValueChange={(value) => setPresetConfig(prev => ({ ...prev, sport: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sports</SelectItem>
                        <SelectItem value="nfl">NFL</SelectItem>
                        <SelectItem value="nba">NBA</SelectItem>
                        <SelectItem value="mlb">MLB</SelectItem>
                        <SelectItem value="nhl">NHL</SelectItem>
                        <SelectItem value="ncaaf">NCAA Football</SelectItem>
                        <SelectItem value="ncaab">NCAA Basketball</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={presetConfig.description}
                    onChange={(e) => setPresetConfig(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your betting strategy..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="market">Market Type</Label>
                    <Select value={presetConfig.market} onValueChange={(value) => setPresetConfig(prev => ({ ...prev, market: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select market" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Markets</SelectItem>
                        <SelectItem value="spreads">Spreads</SelectItem>
                        <SelectItem value="totals">Totals</SelectItem>
                        <SelectItem value="moneylines">Moneylines</SelectItem>
                        <SelectItem value="props">Player Props</SelectItem>
                        <SelectItem value="futures">Futures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeFilter">Time Filter</Label>
                    <Select value={presetConfig.timeFilter} onValueChange={(value) => setPresetConfig(prev => ({ ...prev, timeFilter: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Games</SelectItem>
                        <SelectItem value="today">Today Only</SelectItem>
                        <SelectItem value="1h">Starting within 1 hour</SelectItem>
                        <SelectItem value="2h">Starting within 2 hours</SelectItem>
                        <SelectItem value="4h">Starting within 4 hours</SelectItem>
                        <SelectItem value="live">Live Games Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minEV">Minimum EV% ({presetConfig.minEV}%)</Label>
                    <Slider
                      id="minEV"
                      value={[presetConfig.minEV]}
                      onValueChange={(value) => setPresetConfig(prev => ({ ...prev, minEV: value[0] }))}
                      min={0}
                      max={20}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxRisk">Max Risk ($)</Label>
                    <Input
                      id="maxRisk"
                      type="number"
                      value={presetConfig.maxRisk}
                      onChange={(e) => setPresetConfig(prev => ({ ...prev, maxRisk: parseInt(e.target.value) || 0 }))}
                      placeholder="1000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Advanced Filters</span>
                  <Button size="sm" onClick={addFilter} className="bg-gold text-charcoal hover:bg-gold/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Filter
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {viewConfig.filters.map((filter) => (
                    <div key={filter.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Switch
                        checked={filter.enabled}
                        onCheckedChange={(checked) => updateFilter(filter.id, 'enabled', checked)}
                      />
                      <Select
                        value={filter.field}
                        onValueChange={(value) => updateFilter(filter.id, 'field', value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={filter.operator}
                        onValueChange={(value) => updateFilter(filter.id, 'operator', value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {operatorOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={filter.value}
                        onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                        placeholder="Value"
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFilter(filter.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {viewConfig.filters.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                      No filters added yet. Click "Add Filter" to get started.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Make Public</Label>
                    <p className="text-sm text-gray-500">Allow others to view and follow this strategy</p>
                  </div>
                  <Switch
                    checked={viewConfig.isPublic}
                    onCheckedChange={(checked) => setViewConfig(prev => ({ ...prev, isPublic: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Refresh</Label>
                    <p className="text-sm text-gray-500">Automatically update results every 30 seconds</p>
                  </div>
                  <Switch
                    checked={viewConfig.autoRefresh}
                    onCheckedChange={(checked) => setViewConfig(prev => ({ ...prev, autoRefresh: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifications</Label>
                    <p className="text-sm text-gray-500">Get alerts when new opportunities match this view</p>
                  </div>
                  <Switch
                    checked={viewConfig.notifications}
                    onCheckedChange={(checked) => setViewConfig(prev => ({ ...prev, notifications: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={runView}
                  disabled={isRunning}
                  className="w-full bg-gold text-charcoal hover:bg-gold/90"
                >
                  {isRunning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run View
                    </>
                  )}
                </Button>
                <Button
                  onClick={saveView}
                  variant="outline"
                  className="w-full"
                  disabled={!viewConfig.name}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save View
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Results ({activeResults.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeResults.map((result) => (
                    <div key={result.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{result.market}</Badge>
                        <Badge className={result.ev >= 5 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          +{result.ev}% EV
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm">{result.game}</h4>
                      <p className="text-xs text-gray-600 mb-2">{result.bet}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{result.odds > 0 ? `+${result.odds}` : result.odds}</span>
                        <span>{result.sportsbook}</span>
                      </div>
                    </div>
                  ))}
                  {activeResults.length === 0 && (
                    <p className="text-gray-500 text-center py-8 text-sm">
                      Run the view to see matching opportunities
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}