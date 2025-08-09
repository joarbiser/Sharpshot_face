import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
      {/* Hero Section - New Layout with Prominent Faded Logo */}
      <section className="relative min-h-[90vh] flex items-center justify-between overflow-hidden px-8 md:px-16">
        {/* Large Pronounced Logo Background with Radial Gradient */}
        <div className="absolute left-0 md:left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <img 
            src="/logo-gold.png" 
            alt="" 
            className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] object-contain"
            style={{
              opacity: '0.65',
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.1) 100%)',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.1) 100%)'
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

      {/* Who We Are Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-foreground text-3xl md:text-4xl font-bold mb-8">
            Who We Are
          </h2>
          <div className="text-muted-foreground text-lg md:text-xl leading-relaxed space-y-6">
            <p>
              Sharp Shot provides the ultimate toolkit for serious bettors who want more than just tips — they want an edge. We combine cutting-edge algorithms with real-time sportsbook data to uncover +EV, arbitrage, and middling opportunities before the market adjusts. Our platform empowers you to customize, save, and share your own betting presets, turning strategy into repeatable profit.
            </p>
            <p className="text-primary font-semibold text-xl md:text-2xl">
              We're not here to sell picks. We're here to flip the odds in your favor.
            </p>
          </div>
        </div>
      </section>

      {/* Sharp Shot Terminal Demo Section */}
<section className="py-20">
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
            <div className="max-w-7xl w-full">
              {/* Trading Terminal */}
              <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
                {/* Terminal Header */}
                <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-green-400 text-sm">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M2 14L14 2M14 2H8M14 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">TRADING TERMINAL</h3>
                      <div className="flex items-center gap-2 text-sm text-blue-400">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        LIVE MARKET DATA
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">
                        LIVE OPPORTUNITIES
                      </div>
                      <div className="text-gray-400 text-sm">11:04:44 PM EST</div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Stats Dashboard */}
                <div className="bg-gray-900 px-6 py-6 border-b border-gray-700">
                  <div className="grid grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="text-gray-400 text-sm mb-1">BOOKS SCANNED</div>
                      <div className="text-white text-3xl font-bold">47</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-sm mb-1">+EV SIGNALS</div>
                      <div className="text-green-400 text-3xl font-bold">1,247</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-sm mb-1">AVG CLV</div>
                      <div className="text-yellow-400 text-3xl font-bold">+4.2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-sm mb-1">WIN RATE</div>
                      <div className="text-green-400 text-3xl font-bold">67.8%</div>
                    </div>
                  </div>
                </div>

                {/* Filter Controls */}
                <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">PRIMARY BOOK</div>
                      <div className="bg-gray-700 rounded px-3 py-2 text-white">DraftKings</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">MARKET FILTER</div>
                      <div className="bg-gray-700 rounded px-3 py-2 text-white">ALL MARKETS</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">EV THRESHOLD</div>
                      <div className="flex items-center">
                        <div className="bg-gray-700 rounded px-3 py-2 text-green-400 font-bold">3%</div>
                        <div className="ml-2 w-16 h-1 bg-gray-600 rounded">
                          <div className="w-8 h-1 bg-green-400 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">STATUS</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-bold">SCANNING LIVE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table Header */}
                <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
                  <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-400 uppercase">
                    <div className="col-span-2">EVENT</div>
                    <div className="col-span-1">LEAGUE</div>
                    <div className="col-span-1">TYPE</div>
                    <div className="col-span-1">MARKET</div>
                    <div className="col-span-1">BOOK</div>
                    <div className="col-span-1">PROB</div>
                    <div className="col-span-1">EV%</div>
                    <div className="col-span-1">ODDS</div>
                    <div className="col-span-3">FIELD COMPARISON</div>
                  </div>
                </div>

                {/* Sample Bet Row */}
                <div className="bg-gray-900 px-6 py-4 border-l-4 border-l-green-400 hover:bg-gray-800 transition-colors">
                  <div className="grid grid-cols-12 gap-2 text-sm items-center">
                    <div className="col-span-2">
                      <div className="text-white font-medium">San Diego Padres vs Arizona Diamondbacks</div>
                    </div>
                    <div className="col-span-1 text-blue-400">MLB</div>
                    <div className="col-span-1 text-gray-300">Over 5.5</div>
                    <div className="col-span-1 text-gray-300">1st Half</div>
                    <div className="col-span-1 text-green-400 font-medium">DraftKings</div>
                    <div className="col-span-1 text-white">59.0%</div>
                    <div className="col-span-1">
                      <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                        +19.4%
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="bg-gray-700 text-white rounded px-2 py-1 text-center">
                        <div className="text-xs font-semibold">-111</div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex gap-1">
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-gray-400 mb-1">Avg</div>
                          <div className="bg-yellow-600 text-black rounded px-2 py-1 text-xs font-bold">
                            -161
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-4 flex items-center">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          </div>
                          <div className="bg-gray-700 text-white rounded px-2 py-1 text-xs">
                            -152
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-4 flex items-center">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="bg-gray-700 text-white rounded px-2 py-1 text-xs">
                            -175
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-4 flex items-center">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                          </div>
                          <div className="bg-gray-700 text-white rounded px-2 py-1 text-xs">
                            -155
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gray-800 px-6 py-6 text-center">
                  <p className="text-gray-300 text-sm mb-4">
                    Real-time scanning • 47+ sportsbooks • Live +EV calculations • Professional edge detection
                  </p>
                  <Link href="/calculator">
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg">
                      Access Trading Terminal
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
<section className="py-12 px-6 md:px-12">
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
    </div>
  );
}