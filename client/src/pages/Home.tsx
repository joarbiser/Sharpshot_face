import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  
  return (
    <>
      {/* Hero Section - New Layout with Prominent Faded Logo */}
      <section className="relative min-h-[90vh] flex items-center justify-between overflow-hidden px-8 md:px-16">
        {/* Large Pronounced Logo Background with Radial Gradient */}
        <div className="absolute left-0 md:left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <img 
            src="/logo-gold.png" 
            alt="" 
            className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] object-contain"
            style={{
              opacity: '0.55',
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.08) 100%)',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.08) 100%)'
            }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full">
          {/* Left side - Logo space */}
          <div className="flex-1"></div>
          
          {/* Right side - Content */}
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-foreground text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              IT'S NOT LUCK.<br />
              IT'S <span className="text-primary">LEVERAGE</span>.
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed">
              Built for sharp minds. Powered by sharp tools.<br />
              Advanced algorithms scan multiple sportsbooks in real-time to identify profitable betting opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <Link href="/calculator">
                <Button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/calculator">
                <Button className="bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Interface Feature Showcase */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Monitor className="h-4 w-4" />
              NEW INTERFACE
            </div>
            <h2 className="text-foreground text-3xl md:text-4xl font-bold mb-4">
              Now with Dark & Light Mode
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Professional interface that adapts to your preference. Work comfortably in any lighting condition.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              {/* Light Mode Preview */}
              <div className="relative group">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-semibold text-gray-900">Light Mode</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">Professional Calculator</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-600">LIVE</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-600 mb-1">NBA • Over 218.5</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">Lakers vs Warriors</span>
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-bold">+12.3%</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-600 mb-1">MLB • Under 8.5</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">Yankees vs Red Sox</span>
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-bold">+8.7%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dark Mode Preview */}
              <div className="relative group">
                <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-700 overflow-hidden transform transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="bg-gray-900 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-semibold text-gray-100">Dark Mode</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-900">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-100">Professional Calculator</h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-400">LIVE</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-gray-800 rounded p-2">
                        <div className="text-xs text-gray-400 mb-1">NBA • Over 218.5</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-100">Lakers vs Warriors</span>
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-bold">+12.3%</span>
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded p-2">
                        <div className="text-xs text-gray-400 mb-1">MLB • Under 8.5</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-100">Yankees vs Red Sox</span>
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-bold">+8.7%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Toggle between light and dark modes with the button in the top navigation
            </p>
            <Link href="/calculator">
              <Button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
                Try the New Interface
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sharp Shot Terminal Demo Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-foreground text-3xl md:text-5xl font-bold mb-4">
              See Sharp Shot in Action
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Our Professional Calculator scans 47+ sportsbooks, showing you exactly which books offer the best odds and field averages.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-6xl w-full">
              {/* Professional Calculator Preview */}
              <div className="bg-card rounded-2xl shadow-2xl border-2 border-border overflow-hidden">
                {/* Calculator Header */}
                <div className="bg-muted px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground">Professional Betting Interface</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">LIVE</span>
                    </div>
                  </div>
                </div>

                {/* Filter Controls Preview */}
                <div className="px-6 py-4 bg-card border-b border-border">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-2">Your Sportsbook</div>
                      <div className="bg-muted rounded px-3 py-2 text-sm text-muted-foreground">DraftKings</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-2">Market</div>
                      <div className="bg-muted rounded px-3 py-2 text-sm text-muted-foreground">All Leagues</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-2">Signal Strength</div>
                      <div className="bg-muted rounded px-3 py-2 text-sm text-green-600 font-semibold">3%+ EV</div>
                    </div>
                  </div>
                </div>

                {/* Professional Table Header */}
                <div className="px-6 py-3 bg-muted border-b border-border">
                  <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-muted-foreground">
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
                </div>

                {/* Sample Bet Row */}
                <div className="px-6 py-4 bg-card border-l-4 border-l-primary">
                  <div className="grid grid-cols-12 gap-2 text-sm items-center">
                    <div className="col-span-2 font-medium">San Diego Padres vs Arizona Diamondbacks</div>
                    <div className="col-span-1">MLB</div>
                    <div className="col-span-1">Over 5.5</div>
                    <div className="col-span-1">1st Half</div>
                    <div className="col-span-1 font-medium">DraftKings</div>
                    <div className="col-span-1">58.99%</div>
                    <div className="col-span-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                      +19.42%
                    </div>
                    <div className="col-span-1">
                      <div className="bg-muted rounded px-2 py-1 text-center">
                        <div className="text-xs font-semibold text-foreground">-111</div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      {/* Logos and Field Comparison */}
                      <div className="flex gap-1">
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-muted-foreground mb-1 h-6 flex items-center">Avg</div>
                          <div className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs font-bold">
                            <div className="font-semibold">-161</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-6 flex items-center">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                          </div>
                          <div className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs">
                            <div className="font-semibold">-152</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-6 flex items-center">
                            <div className="w-4 h-4 bg-blue-600 rounded"></div>
                          </div>
                          <div className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs">
                            <div className="font-semibold">-175</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-6 flex items-center">
                            <div className="w-4 h-4 bg-red-700 rounded"></div>
                          </div>
                          <div className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs">
                            <div className="font-semibold">-155</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="px-6 py-4 bg-muted text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    See your sportsbook vs the field • Compare 47+ books instantly • Find profitable opportunities
                  </p>
                  <Link href="/calculator">
                    <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
                      Try the Calculator Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section - Main Value Props */}
      <section className="py-12 px-6 md:px-12 scroll-mt-20" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-foreground text-3xl md:text-4xl font-bold mb-4">
              Built for Professional Bettors
            </h2>
            <p className="text-muted-foreground text-lg">
              Three core tools that give you the edge you need to profit consistently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 ease-in-out">
                <i className="fas fa-clock text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Spot Real-Time Edges</h3>
              <p className="text-muted-foreground">Scan 40+ sportsbooks in seconds and uncover profitable lines with live +EV calculations.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 ease-in-out">
                <i className="fas fa-eye text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Turn Insight Into Strategy</h3>
              <p className="text-muted-foreground">Save filters as Presets to build repeatable systems that scale your betting operation.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 ease-in-out">
                <i className="fas fa-chart-bar text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Measure Your True Edge</h3>
              <p className="text-muted-foreground">Compare bets to closing lines to prove your sharpness and track performance over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-12 px-6 md:px-12 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-foreground text-3xl md:text-4xl font-bold mb-4">
            Ready to find your edge?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of professional bettors using Sharp Shot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button className="bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}