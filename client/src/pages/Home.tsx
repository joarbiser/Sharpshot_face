import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
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
            <h1 className="text-black text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              IT'S NOT LUCK.<br />
              IT'S <span className="text-[#D8AC35]">LEVERAGE</span>.
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed">
              Built for sharp minds. Powered by sharp tools.<br />
              Advanced algorithms scan multiple sportsbooks in real-time to identify profitable betting opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <Link href="/calculator">
                <Button className="bg-[#D8AC35] text-black px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/calculator">
                <Button className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sharp Shot Terminal Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-black text-3xl md:text-5xl font-bold mb-4">
              See Sharp Shot in Action
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Our Professional Calculator scans 47+ sportsbooks, showing you exactly which books offer the best odds and field averages.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-6xl w-full">
              {/* Professional Calculator Preview */}
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
                {/* Calculator Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black">Professional Betting Interface</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">LIVE</span>
                    </div>
                  </div>
                </div>

                {/* Filter Controls Preview */}
                <div className="px-6 py-4 bg-white border-b border-gray-100">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm font-semibold text-black mb-2">Your Sportsbook</div>
                      <div className="bg-gray-100 rounded px-3 py-2 text-sm">DraftKings</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-black mb-2">Market</div>
                      <div className="bg-gray-100 rounded px-3 py-2 text-sm">All Leagues</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-black mb-2">Signal Strength</div>
                      <div className="bg-gray-100 rounded px-3 py-2 text-sm text-green-600 font-semibold">3%+ EV</div>
                    </div>
                  </div>
                </div>

                {/* Professional Table Header */}
                <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-600">
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
                <div className="px-6 py-4 bg-white border-l-4 border-l-[#D8AC35]">
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
                      <div className="bg-gray-100 rounded px-2 py-1 text-center">
                        <div className="text-xs font-semibold">-111</div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      {/* Logos and Field Comparison */}
                      <div className="flex gap-1">
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-gray-500 mb-1 h-6 flex items-center">Avg</div>
                          <div className="bg-[#D8AC35] text-black rounded px-2 py-1 text-xs font-bold">
                            <div className="font-semibold">-161</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-6 flex items-center">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                          </div>
                          <div className="bg-gray-800 text-white rounded px-2 py-1 text-xs">
                            <div className="font-semibold">-152</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-6 flex items-center">
                            <div className="w-4 h-4 bg-blue-600 rounded"></div>
                          </div>
                          <div className="bg-gray-800 text-white rounded px-2 py-1 text-xs">
                            <div className="font-semibold">-175</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-6 flex items-center">
                            <div className="w-4 h-4 bg-red-700 rounded"></div>
                          </div>
                          <div className="bg-gray-800 text-white rounded px-2 py-1 text-xs">
                            <div className="font-semibold">-155</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="px-6 py-4 bg-gray-50 text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    See your sportsbook vs the field • Compare 47+ books instantly • Find profitable opportunities
                  </p>
                  <Link href="/calculator">
                    <Button className="bg-[#D8AC35] text-black px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
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
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">
              Built for Professional Bettors
            </h2>
            <p className="text-gray-500 text-lg">
              Three core tools that give you the edge you need to profit consistently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D8AC35]/20 to-[#D8AC35]/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-[#D8AC35]/20 group-hover:border-[#D8AC35]/40 transition-all duration-500 ease-in-out">
                <i className="fas fa-clock text-[#D8AC35] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">Spot Real-Time Edges</h3>
              <p className="text-gray-600">Scan 40+ sportsbooks in seconds and uncover profitable lines with live +EV calculations.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D8AC35]/20 to-[#D8AC35]/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-[#D8AC35]/20 group-hover:border-[#D8AC35]/40 transition-all duration-500 ease-in-out">
                <i className="fas fa-eye text-[#D8AC35] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">Turn Insight Into Strategy</h3>
              <p className="text-gray-600">Save filters as Presets to build repeatable systems that scale your betting operation.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D8AC35]/20 to-[#D8AC35]/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-[#D8AC35]/20 group-hover:border-[#D8AC35]/40 transition-all duration-500 ease-in-out">
                <i className="fas fa-chart-bar text-[#D8AC35] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">Measure Your True Edge</h3>
              <p className="text-gray-600">Compare bets to closing lines to prove your sharpness and track performance over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">
            Ready to find your edge?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Join thousands of professional bettors using Sharp Shot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-[#D8AC35] text-black px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}