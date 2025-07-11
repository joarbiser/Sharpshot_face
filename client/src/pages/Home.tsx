import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-7xl tungsten-style mb-6">
                <span className="text-charcoal dark:text-gray-300">It's not luck.</span><br />
                <span className="text-gold">It's leverage.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed sharp-text">
                Built for sharp minds. Powered by sharp tools.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pricing">
                  <Button className="bg-gradient-to-r from-gold to-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 hover-lift">
                    View Pricing
                  </Button>
                </Link>
                <a href="#terminal" className="scroll-smooth">
                  <Button variant="outline" className="border-2 border-charcoal text-charcoal px-8 py-4 rounded-lg font-semibold text-lg hover:bg-charcoal hover:text-white hover:scale-105 transition-all duration-300 hover-lift">
                    Try Calculator
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative" id="terminal">
              <div className="dashboard-mockup">
                <div className="flex items-center justify-between mb-4 border-b border-gray-600 pb-2">
                  <div className="text-green-400 font-bold tracking-wider">SHARP SHOT TERMINAL</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="text-gray-400 text-xs mono-font">LIVE</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4 text-xs">
                  <div className="text-center" title="Number of sportsbooks scanned for odds comparison">
                    <div className="text-gray-400 mono-font mb-1">BOOKS</div>
                    <div className="text-white font-bold text-lg">47</div>
                  </div>
                  <div className="text-center" title="Positive Expected Value - profit potential over time based on odds inefficiency">
                    <div className="text-gray-400 mono-font mb-1">+EV FOUND</div>
                    <div className="text-green-400 font-bold text-lg">1,247</div>
                  </div>
                  <div className="text-center" title="Closing Line Value - how much better your odds are than the final market line">
                    <div className="text-gray-400 mono-font mb-1">AVG CLV</div>
                    <div className="text-gold font-bold text-lg">+4.2%</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between bg-gray-800/80 p-3 rounded border-l-2 border-green-400">
                    <span className="mono-font text-sm">LAL vs GSW • O225.5</span>
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold mono-font">+8.3%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-800/80 p-3 rounded border-l-2 border-green-400">
                    <span className="mono-font text-sm">MIA vs BOS • U112.5</span>
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold mono-font">+6.1%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-800/80 p-3 rounded border-l-2 border-green-400">
                    <span className="mono-font text-sm">DAL -3.5 • 1H</span>
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold mono-font">+4.7%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section after Terminal */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to bet smarter?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with the free Demo Mode or unlock full features with a subscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button className="bg-gradient-to-r from-gold to-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover-lift">
                View Plans
              </Button>
            </Link>
            <Link href="/calculator">
              <Button variant="outline" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 hover-lift">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group fade-in-up">
              <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-gold/20 group-hover:border-gold/40 transition-all duration-300">
                <i className="fas fa-chart-line text-gold text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 sharp-text">Spot Real-Time Edges</h3>
              <p className="text-gray-600 sharp-text">Scan 40+ sportsbooks in seconds and uncover profitable lines.</p>
            </div>
            
            <div className="text-center group fade-in-up fade-in-delay-1">
              <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-gold/20 group-hover:border-gold/40 transition-all duration-300">
                <i className="fas fa-filter text-gold text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 sharp-text">Turn Insight Into Strategy</h3>
              <p className="text-gray-600 sharp-text">Save filters as Views to build repeatable systems that scale.</p>
            </div>
            
            <div className="text-center group fade-in-up fade-in-delay-2">
              <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-gold/20 group-hover:border-gold/40 transition-all duration-300">
                <i className="fas fa-target text-gold text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 sharp-text">Measure Your True Edge</h3>
              <p className="text-gray-600 sharp-text">Compare bets to closing lines to prove your sharpness over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your betting style</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200 fade-in-up">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Basic</h3>
              <div className="text-4xl font-bold mb-4 text-gray-900">
                <span className="text-blue-600">$39.99</span>
                <span className="text-lg text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Real-Time Line Tracker</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Save & Share 3 Public Views</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Advanced Filters</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-gray-800 dark:text-gray-200" title="Closing Line Value - how much better your bet is compared to the final market line">CLV Comparison (24h)</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Export to CSV</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button className="w-full bg-gray-700 text-white hover:bg-gray-800 py-3">
                  View Full Details
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-yellow-50 rounded-xl p-8 text-center border-2 border-yellow-400 fade-in-up fade-in-delay-1">
              <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Pro</h3>
              <div className="text-4xl font-bold mb-4 text-gray-900">
                <span className="text-yellow-600">$99.99</span>
                <span className="text-lg text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mb-6">For serious bettors and creators</p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Everything in Basic</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Unlimited Public & Private Views</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Customize View Logic</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Fork, Clone, Collaborate</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="text-gray-800 dark:text-gray-200">Public Follower Count</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700 py-3">
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Start with either plan today</p>
            <Link href="/pricing">
              <Button className="bg-blue-600 text-white px-8 py-3 text-lg hover:bg-blue-700">
                Compare All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl tungsten-style mb-4">See Sharp Shot in Action</h2>
            <p className="text-xl text-gray-600">Professional tools for professional bettors</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift border border-gray-200">
              <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative">
                <div className="absolute top-4 left-4 text-xs mono-font text-slate-500">LIVE ODDS</div>
                <div className="text-center">
                  <div className="mb-4 p-4 bg-white/80 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="mono-font text-charcoal">DK</span>
                      <span className="font-bold text-green-600">-108</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="mono-font text-charcoal">FD</span>
                      <span className="font-bold text-red-500">-115</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="mono-font text-charcoal">MGM</span>
                      <span className="font-bold text-charcoal">-110</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 sharp-text">Live Line Movement</h3>
                <p className="text-gray-600 sharp-text">Track odds across all major sportsbooks in real-time</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
              <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-calculator text-6xl text-green-600 mb-4"></i>
                  <p className="text-lg font-semibold text-charcoal">+EV Calculator</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Expected Value Analysis</h3>
                <p className="text-gray-600">Instantly calculate the edge on any betting opportunity</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
              <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-sliders-h text-6xl text-blue-600 mb-4"></i>
                  <p className="text-lg font-semibold text-charcoal">Strategy Builder</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Custom View Builder</h3>
                <p className="text-gray-600">Create automated filters to find your perfect betting spots</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
              <div className="h-64 bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-users text-6xl text-purple-600 mb-4"></i>
                  <p className="text-lg font-semibold text-charcoal">Community Feed</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Public Strategy Feed</h3>
                <p className="text-gray-600">Discover and fork winning strategies from top performers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <i className="fas fa-users text-6xl text-gold mb-6"></i>
            <h2 className="text-3xl tungsten-style mb-4">Join the Sharp Shot Community</h2>
            <p className="text-xl text-gray-300 mb-8">Trade edges. Test theories. Build sharper strategies with other pros.</p>
            <Link href="/views">
              <Button className="bg-gold text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold/90 transition-colors">
                Join the Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl tungsten-style mb-6">Ready to Get Sharp?</h2>
          <p className="text-xl text-gray-600 mb-8">Built by sharps. Built for sharps.</p>
          <Link href="/register">
            <Button className="bg-gold text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold/90 transition-colors">
              Start Using Sharp Shot
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
