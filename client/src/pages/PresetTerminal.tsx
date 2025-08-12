import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Plus, Settings, Copy, Share2, TrendingUp, Target, BarChart3, Users, Clock } from 'lucide-react';
import { BettingPreset, PresetFilters, BookWeighting, PresetManager, BUILTIN_PRESETS, DEFAULT_BOOK_WEIGHTS } from '../../../shared/presets';
import { Link, useLocation } from 'wouter';

export default function PresetTerminal() {
  const [, setLocation] = useLocation();
  const [selectedPreset, setSelectedPreset] = useState<BettingPreset | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('community');
  
  // Preset creation form state
  const [presetForm, setPresetForm] = useState({
    name: '',
    description: '',
    isPublic: false,
    filters: {
      sports: ['all'],
      categories: ['all'],
      minEV: 3,
      maxEV: 25,
      oddsRange: { min: -200, max: 200 },
      sportsbooks: ['all'],
      markets: ['all'],
      timeframe: 'today' as const
    },
    bookWeighting: { ...DEFAULT_BOOK_WEIGHTS }
  });

  const queryClient = useQueryClient();

  // Get user presets
  const { data: userPresets = [], isLoading: loadingUserPresets } = useQuery({
    queryKey: ['/api/presets/user'],
    queryFn: async () => {
      const response = await fetch('/api/presets/user');
      if (!response.ok) throw new Error('Failed to fetch user presets');
      return response.json();
    }
  });

  // Get community presets
  const { data: communityPresets = [], isLoading: loadingCommunityPresets } = useQuery({
    queryKey: ['/api/presets/community'],
    queryFn: async () => {
      const response = await fetch('/api/presets/community');
      if (!response.ok) throw new Error('Failed to fetch community presets');
      return response.json();
    }
  });

  // Create preset mutation
  const createPresetMutation = useMutation({
    mutationFn: async (preset: Omit<BettingPreset, 'id' | 'createdAt' | 'createdBy'>) => {
      const response = await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preset)
      });
      if (!response.ok) throw new Error('Failed to create preset');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/presets/user'] });
      setCreateDialogOpen(false);
      resetForm();
    }
  });

  // Clone preset mutation
  const clonePresetMutation = useMutation({
    mutationFn: async (presetId: string) => {
      const response = await fetch(`/api/presets/${presetId}/clone`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to clone preset');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/presets/user'] });
    }
  });

  const resetForm = () => {
    setPresetForm({
      name: '',
      description: '',
      isPublic: false,
      filters: {
        sports: ['all'],
        categories: ['all'],
        minEV: 3,
        maxEV: 25,
        oddsRange: { min: -200, max: 200 },
        sportsbooks: ['all'],
        markets: ['all'],
        timeframe: 'today'
      },
      bookWeighting: { ...DEFAULT_BOOK_WEIGHTS }
    });
  };

  const applyPresetToTrading = (preset: BettingPreset) => {
    // Store preset in localStorage for Trading Terminal to pick up
    localStorage.setItem('appliedPreset', JSON.stringify(preset));
    // Navigate to Trading Terminal
    setLocation('/trading-terminal');
  };

  const getPerformanceBadgeColor = (winRate: number) => {
    if (winRate >= 60) return 'bg-green-500';
    if (winRate >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'ev': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'arbitrage': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'middling': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const allPresets = [...BUILTIN_PRESETS, ...userPresets, ...communityPresets];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
      <div className="container mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold font-mono text-gray-900 dark:text-white mb-3">PRESET TERMINAL</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Build, share, and optimize your betting strategies with custom filter presets</p>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#D8AC35] dark:bg-[#00ff41] hover:bg-[#C4982A] dark:hover:bg-[#00e639] text-black font-mono font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  CREATE PRESET
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-mono">Create New Preset</DialogTitle>
                  <DialogDescription>Configure your custom betting strategy preset</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preset-name">Preset Name</Label>
                      <Input
                        id="preset-name"
                        value={presetForm.name}
                        onChange={(e) => setPresetForm({...presetForm, name: e.target.value})}
                        placeholder="My Strategy"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={presetForm.isPublic}
                        onCheckedChange={(checked) => setPresetForm({...presetForm, isPublic: checked})}
                      />
                      <Label>Make Public</Label>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="preset-description">Description</Label>
                    <Input
                      id="preset-description"
                      value={presetForm.description}
                      onChange={(e) => setPresetForm({...presetForm, description: e.target.value})}
                      placeholder="Describe your strategy..."
                    />
                  </div>

                  {/* Filters */}
                  <Separator />
                  <h3 className="font-semibold">Filters</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Sports</Label>
                      <Select 
                        value={presetForm.filters.sports[0]} 
                        onValueChange={(value) => setPresetForm({
                          ...presetForm, 
                          filters: {...presetForm.filters, sports: [value]}
                        })}
                      >
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
                    
                    <div>
                      <Label>Category</Label>
                      <Select 
                        value={presetForm.filters.categories[0]} 
                        onValueChange={(value) => setPresetForm({
                          ...presetForm, 
                          filters: {...presetForm.filters, categories: [value]}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="ev">+EV Only</SelectItem>
                          <SelectItem value="arbitrage">Arbitrage</SelectItem>
                          <SelectItem value="middling">Middling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Minimum EV: {presetForm.filters.minEV}%</Label>
                    <Slider
                      value={[presetForm.filters.minEV]}
                      onValueChange={([value]) => setPresetForm({
                        ...presetForm,
                        filters: {...presetForm.filters, minEV: value}
                      })}
                      max={20}
                      min={0}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => createPresetMutation.mutate(presetForm)}
                      disabled={!presetForm.name || createPresetMutation.isPending}
                      className="bg-[#D8AC35] dark:bg-[#00ff41] hover:bg-[#C4982A] dark:hover:bg-[#00e639] text-black"
                    >
                      {createPresetMutation.isPending ? 'Creating...' : 'Create Preset'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="community" className="font-mono">
              <Users className="h-4 w-4 mr-2" />
              COMMUNITY PRESETS
            </TabsTrigger>
            <TabsTrigger value="personal" className="font-mono">
              <Target className="h-4 w-4 mr-2" />
              MY PRESETS
            </TabsTrigger>
            <TabsTrigger value="builtin" className="font-mono">
              <BarChart3 className="h-4 w-4 mr-2" />
              SHARP SHOT PRESETS
            </TabsTrigger>
          </TabsList>

          {/* Community Presets */}
          <TabsContent value="community" className="space-y-4">
            {loadingCommunityPresets ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-[#D8AC35] dark:border-[#00ff41] mx-auto shadow-lg"></div>
              </div>
            ) : communityPresets.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Community Presets</h3>
                  <p className="text-gray-600 dark:text-gray-400">Be the first to share a public preset!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityPresets.map((preset: BettingPreset) => (
                  <PresetCard 
                    key={preset.id} 
                    preset={preset} 
                    onApply={applyPresetToTrading}
                    onClone={(id) => clonePresetMutation.mutate(id)}
                    showClone
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Personal Presets */}
          <TabsContent value="personal" className="space-y-4">
            {loadingUserPresets ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-[#D8AC35] dark:border-[#00ff41] mx-auto shadow-lg"></div>
              </div>
            ) : userPresets.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Personal Presets</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first preset to get started</p>
                  <Button onClick={() => setCreateDialogOpen(true)} className="bg-[#D8AC35] dark:bg-[#00ff41] hover:bg-[#C4982A] dark:hover:bg-[#00e639] text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Preset
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPresets.map((preset: BettingPreset) => (
                  <PresetCard 
                    key={preset.id} 
                    preset={preset} 
                    onApply={applyPresetToTrading}
                    showPerformance
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Built-in Presets */}
          <TabsContent value="builtin" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BUILTIN_PRESETS.map((preset) => (
                <PresetCard 
                  key={preset.id} 
                  preset={preset} 
                  onApply={applyPresetToTrading}
                  onClone={(id) => clonePresetMutation.mutate(id)}
                  showClone
                  isBuiltIn
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Preset Card Component
interface PresetCardProps {
  preset: BettingPreset;
  onApply: (preset: BettingPreset) => void;
  onClone?: (id: string) => void;
  showClone?: boolean;
  showPerformance?: boolean;
  isBuiltIn?: boolean;
}

function PresetCard({ preset, onApply, onClone, showClone, showPerformance, isBuiltIn }: PresetCardProps) {
  const getPerformanceBadgeColor = (winRate: number) => {
    if (winRate >= 60) return 'bg-green-500';
    if (winRate >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'ev': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'arbitrage': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'middling': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-mono mb-1">{preset.name}</CardTitle>
            <CardDescription className="text-sm">{preset.description}</CardDescription>
          </div>
          {isBuiltIn && (
            <Badge variant="secondary" className="text-xs">SHARP SHOT</Badge>
          )}
        </div>
        
        {/* Preset filters preview */}
        <div className="flex flex-wrap gap-1 mt-3">
          {preset.filters.sports[0] !== 'all' && (
            <Badge variant="outline" className="text-xs">{preset.filters.sports[0]}</Badge>
          )}
          {preset.filters.categories.map(cat => (
            <Badge key={cat} className={`text-xs ${getCategoryBadgeColor(cat)}`}>
              {cat.toUpperCase()}
            </Badge>
          ))}
          <Badge variant="outline" className="text-xs">+{preset.filters.minEV}% EV</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Performance metrics */}
        {showPerformance && preset.performance && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Win Rate:</span>
                <span className={`ml-1 px-2 py-1 rounded text-xs text-white ${getPerformanceBadgeColor(preset.performance.winRate)}`}>
                  {preset.performance.winRate}%
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">ROI:</span>
                <span className="ml-1 font-mono">{preset.performance.roi > 0 ? '+' : ''}{preset.performance.roi}%</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Bets:</span>
                <span className="ml-1 font-mono">{preset.performance.totalBets}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Profit:</span>
                <span className="ml-1 font-mono">${preset.performance.totalProfit}</span>
              </div>
            </div>
          </div>
        )}

        {/* Last used */}
        {preset.lastUsed && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
            <Clock className="h-3 w-3 mr-1" />
            Used {new Date(preset.lastUsed).toLocaleDateString()}
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Button 
            onClick={() => onApply(preset)}
            className="flex-1 bg-[#D8AC35] dark:bg-[#00ff41] hover:bg-[#C4982A] dark:hover:bg-[#00e639] text-black font-mono text-sm"
          >
            APPLY TO TRADING
          </Button>
          {showClone && onClone && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onClone(preset.id)}
              className="px-3"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}