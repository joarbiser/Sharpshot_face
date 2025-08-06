import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* Hero Section - Full Screen Layout */}
      <section className="min-h-[80vh] flex items-center justify-between px-8 md:px-20 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Left Column - Headlines and CTAs */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-black text-4xl md:text-6xl font-bold leading-tight mb-6">
                IT'S NOT LUCK.<br />
                IT'S <span className="text-[#D8AC35]">LEVERAGE</span>.
              </h1>
              
              <p className="text-gray-500 mt-4 text-lg md:text-xl mb-8 leading-relaxed">
                Built for sharp minds. Powered by sharp tools.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/calculator">
                  <Button className="bg-[#D8AC35] text-black px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md">
                    Estimate Your Edge
                  </Button>
                </Link>
                <Link href="/calculator">
                  <Button className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md">
                    Try Calculator
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Sharp Shot Terminal Preview */}
            <div className="flex-1 max-w-md w-full">
              <div className="bg-black text-white p-6 rounded-2xl shadow-lg w-full" id="terminal">
                <div className="flex items-center justify-between mb-4 border-b border-gray-600 pb-3">
                  <div className="text-[#D8AC35] font-bold tracking-wider text-sm">SHARP SHOT TERMINAL</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="text-gray-400 text-xs">LIVE</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6 text-xs">
                  <div className="text-center">
                    <div className="text-gray-400 mb-1">BOOKS</div>
                    <div className="text-white font-bold text-lg">47</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 mb-1">+EV FOUND</div>
                    <div className="text-green-400 font-bold text-lg">1,247</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 mb-1">AVG CLV</div>
                    <div className="text-[#D8AC35] font-bold text-lg">+4.2%</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                    <span className="text-sm">LAL vs GSW • O225.5</span>
                    <span className="bg-green-500 text-black px-2 py-1 rounded text-xs font-bold">+8.3%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                    <span className="text-sm">MIA vs BOS • U112.5</span>
                    <span className="bg-green-500 text-black px-2 py-1 rounded text-xs font-bold">+6.1%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                    <span className="text-sm">DAL -3.5 • 1H</span>
                    <span className="bg-green-500 text-black px-2 py-1 rounded text-xs font-bold">+4.7%</span>
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
                <i className="fas fa-chart-line text-[#D8AC35] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">Spot Real-Time Edges</h3>
              <p className="text-gray-600">Scan 40+ sportsbooks in seconds and uncover profitable lines with live +EV calculations.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D8AC35]/20 to-[#D8AC35]/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-[#D8AC35]/20 group-hover:border-[#D8AC35]/40 transition-all duration-500 ease-in-out">
                <i className="fas fa-filter text-[#D8AC35] text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-black">Turn Insight Into Strategy</h3>
              <p className="text-gray-600">Save filters as Views to build repeatable systems that scale your betting operation.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D8AC35]/20 to-[#D8AC35]/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-[#D8AC35]/20 group-hover:border-[#D8AC35]/40 transition-all duration-500 ease-in-out">
                <i className="fas fa-target text-[#D8AC35] text-2xl"></i>
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