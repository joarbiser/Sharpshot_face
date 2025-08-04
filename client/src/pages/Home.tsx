import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl tungsten-style mb-4">
              <span className="text-secondary">IT'S NOT LUCK.</span><br />
              <span className="text-primary">IT'S LEVERAGE.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed sharp-text">
              See how much money you can make with Sharp Shot.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button className="bg-gradient-to-r from-primary to-yellow-600 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 hover-lift">
                Estimate your edge
              </Button>
              <Link href="/pricing">
                <Button variant="outline" className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 border-2 border-secondary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-300 hover-lift text-secondary">
                  View Pricing
                </Button>
              </Link>
              <a href="#terminal" className="scroll-smooth">
                <Button variant="outline" className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 border-2 border-secondary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-300 hover-lift text-secondary">
                  Try Calculator
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toggle and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex items-center bg-white rounded-lg p-1 border">
              <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium">
                Pre-match
              </button>
              <button className="px-4 py-2 rounded-md text-muted-foreground font-medium hover:text-foreground">
                Live
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search team, line, or value"
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-80"
              />
              <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Centered Terminal Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border" id="terminal">
            <div className="dashboard-mockup">
              <div className="flex items-center justify-between mb-4 border-b border-gray-600 pb-2">
                <div className="text-green-400 font-bold tracking-wider">SHARP SHOT TERMINAL</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="text-gray-400 text-xs mono-font">LIVE</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4 text-xs">
                <div className="text-center">
                  <div className="text-gray-400 mono-font mb-1" title="Total sportsbooks scanned right now">BOOKS</div>
                  <div className="text-gray-100 font-bold text-lg">47</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mono-font mb-1" title="Expected value — profit margin based on odds">+EV FOUND</div>
                  <div className="text-green-400 font-bold text-lg">1,247</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mono-font mb-1" title="Closing line value — compares your odds to the final market line">AVG CLV</div>
                  <div className="text-gold font-bold text-lg">+4.2%</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between bg-gray-800/80 p-3 rounded border-l-2 border-green-400">
                  <span className="mono-font text-sm">LAL vs GSW • O225.5</span>
                  <span className="bg-green-500 text-charcoal px-2 py-1 rounded text-xs font-bold mono-font">+8.3%</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800/80 p-3 rounded border-l-2 border-green-400">
                  <span className="mono-font text-sm">MIA vs BOS • U112.5</span>
                  <span className="bg-green-500 text-charcoal px-2 py-1 rounded text-xs font-bold mono-font">+6.1%</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800/80 p-3 rounded border-l-2 border-green-400">
                  <span className="mono-font text-sm">DAL -3.5 • 1H</span>
                  <span className="bg-green-500 text-charcoal px-2 py-1 rounded text-xs font-bold mono-font">+4.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group fade-in-up">
              <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-gold/20 group-hover:border-gold/40 transition-all duration-300">
                <i className="fas fa-chart-line text-gold text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 sharp-text text-[#000000]">Spot Real-Time Edges</h3>
              <p className="text-gray-600 sharp-text">Scan 40+ sportsbooks in seconds and uncover profitable lines.</p>
            </div>
            
            <div className="text-center group fade-in-up fade-in-delay-1">
              <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-gold/20 group-hover:border-gold/40 transition-all duration-300">
                <i className="fas fa-filter text-gold text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 sharp-text text-[#000000]">Turn Insight Into Strategy</h3>
              <p className="text-gray-600 sharp-text">Save filters as Views to build repeatable systems that scale.</p>
            </div>
            
            <div className="text-center group fade-in-up fade-in-delay-2">
              <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-gold/20 group-hover:border-gold/40 transition-all duration-300">
                <i className="fas fa-target text-gold text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 sharp-text text-[#000000]">Measure Your True Edge</h3>
              <p className="text-gray-600 sharp-text">Compare bets to closing lines to prove your sharpness over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#000000]">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your betting style</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200 fade-in-up">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Basic</h3>
              <div className="text-4xl font-bold mb-4 text-gray-900">
                <span className="text-blue-600">$39.99</span>
                <span className="text-lg text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="dark:text-gray-200 text-[#4b5563]">Real-Time Line Tracker</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="dark:text-gray-200 text-[#4b5563]">Save & Share 3 Public Views</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="dark:text-gray-200 text-[#4b5563]">Advanced Filters</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="dark:text-gray-200 text-[#4b5563]" title="Closing Line Value - how much better your bet is compared to the final market line">CLV Comparison (24h)</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="dark:text-gray-200 text-[#4b5563]">Export to CSV</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button className="w-full bg-gray-700 text-gray-100 hover:bg-gray-800 py-3">
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
                  <span className="font-semibold dark:text-gray-200 text-[#4b5563]">Everything in Basic</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="dark:text-gray-200 text-[#4b5563]">Unlimited Public & Private Views</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="dark:text-gray-200 text-[#4b5563]">Customize View Logic</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="dark:text-gray-200 text-[#4b5563]">Fork, Clone, Collaborate</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span className="dark:text-gray-200 text-[#4b5563]">Public Follower Count</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button className="w-full bg-yellow-600 text-charcoal hover:bg-yellow-700 py-3">
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Start with either plan today</p>
            <Link href="/pricing">
              <Button className="bg-blue-600 text-gray-100 px-8 py-3 text-lg hover:bg-blue-700">
                Compare All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl tungsten-style mb-4 text-[#000000]">See Sharp Shot in Action</h2>
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
                <h3 className="text-xl font-bold mb-2 sharp-text text-[#b29566]">Live Line Movement</h3>
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
                <h3 className="text-xl font-bold mb-2 sharp-text text-[#b29566]">Expected Value Calculation</h3>
                <p className="text-gray-600 sharp-text">See exactly how much profit you can expect from each bet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to bet smarter?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with the free Demo Mode or unlock full features with a subscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button className="bg-gradient-to-r from-gold to-yellow-600 text-charcoal px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover-lift">
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
    </>
  );
}