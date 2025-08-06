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
              Our Preset Terminal scans 40+ sportsbooks in real-time, identifying profitable opportunities instantly.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-2xl w-full">
              <div className="bg-black text-white p-8 rounded-2xl shadow-2xl" id="terminal">
                <div className="flex items-center justify-between mb-6 border-b border-gray-600 pb-4">
                  <div className="text-white font-bold tracking-wider text-lg">SHARP SHOT PRESET TERMINAL</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="text-gray-400 text-sm">LIVE</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mb-8 text-sm">
                  <div className="text-center">
                    <div className="text-white font-bold mb-2">BOOKS</div>
                    <div className="text-white font-bold text-2xl">47</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold mb-2">+EV FOUND</div>
                    <div className="text-green-400 font-bold text-2xl">1,247</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold mb-2">AVG CLV</div>
                    <div className="text-[#D8AC35] font-bold text-2xl">+4.2%</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                    <span className="text-base">LAL vs GSW • O225.5</span>
                    <span className="bg-green-500 text-black px-3 py-2 rounded text-sm font-bold">+8.3%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                    <span className="text-base">MIA vs BOS • U112.5</span>
                    <span className="bg-green-500 text-black px-3 py-2 rounded text-sm font-bold">+6.1%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                    <span className="text-base">DAL -3.5 • 1H</span>
                    <span className="bg-green-500 text-black px-3 py-2 rounded text-sm font-bold">+4.7%</span>
                  </div>
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