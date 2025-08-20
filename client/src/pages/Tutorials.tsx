import { Check } from "lucide-react";

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
            TUTORIALS.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Everything you need to know to get started with profitable sports betting.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-20">

          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
              <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Getting Started</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              Your Path to Profitable Betting
            </h2>
          </div>

          {/* What You Need - Single Card */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                  What You Need to Get Started
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">You don't need much to begin:</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    </div>
                    <span className="text-gray-900 dark:text-white">An account with at least one legal sportsbook</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    </div>
                    <span className="text-gray-900 dark:text-white">A small bankroll (you can start with $100 or less)</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    </div>
                    <span className="text-gray-900 dark:text-white">A Sharp Shot subscription</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    </div>
                    <span className="text-gray-900 dark:text-white">A willingness to learn and follow the data</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  If you're brand new, we recommend starting small and focusing on understanding how and why you're placing each bet.
                  Sharp Shot is designed to remove the guesswork — but knowing the basics will make you far more effective.
                </p>
              </div>
            </div>
          </div>

          {/* Understanding Odds Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Fundamentals</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                Understanding How Odds Work
              </h2>
            </div>

            {/* Two-column cards for American Odds */}
            <div className="grid lg:grid-cols-2 gap-7 mb-20 max-w-[1280px] mx-auto">
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50 mb-6">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-[0.2em]">Negative Odds</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Favorites (Example: -150)</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Risk more to win less</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">You must risk $150 to win $100 in profit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">If you win, you get back $250 total</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Higher probability of winning</span>
                  </div>
                </div>
              </div>

              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-[0.2em]">Positive Odds</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Underdogs (Example: +200)</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Risk less to win more</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">You win $200 for every $100 risked</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">If you win, you get back $300 total</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Lower probability but higher payout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three Strategies Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Strategies</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                Three Ways to Win
              </h2>
            </div>

            {/* Three-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-20 max-w-[1280px] mx-auto">
              {/* Expected Value */}
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D8AC35]/20 dark:border-[#D8AC35]/30">
                    <span className="text-[#D8AC35] font-bold text-lg">+EV</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Expected Value</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Long-term profit through value</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Better odds than market value</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Profit over time through edge</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Foundation of sharp betting</span>
                  </div>
                </div>
              </div>

              {/* Arbitrage */}
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D8AC35]/20 dark:border-[#D8AC35]/30">
                    <span className="text-[#D8AC35] font-bold text-lg">ARB</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Arbitrage</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Guaranteed profit scenarios</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Zero risk when done correctly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Bet both sides for profit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Requires multiple sportsbooks</span>
                  </div>
                </div>
              </div>

              {/* Middling */}
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D8AC35]/20 dark:border-[#D8AC35]/30">
                    <span className="text-[#D8AC35] font-bold text-lg">MID</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Middling</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Double-win opportunities</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Chance to win both bets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Break-even protection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">All middles are still +EV</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Statement */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative p-8 md:p-12 rounded-2xl border border-[#D8AC35]/20">
              <div className="text-center mb-6">
                <div className="w-4 h-4 rounded-full bg-[#D8AC35] mx-auto mb-4 animate-pulse"></div>
                <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  "Sharp Shot isn't about guessing who's going to win. It's about finding and exploiting 
                  <span className="text-[#D8AC35]"> inefficiencies in the betting market</span>."
                </blockquote>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D8AC35]"></div>
                <span className="text-xs text-[#D8AC35] font-semibold uppercase tracking-[0.2em]">Sharp Shot Method</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D8AC35]"></div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Action Plan</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                Your First Steps
              </h2>
            </div>

            {/* Action Items */}
            <div className="grid md:grid-cols-2 gap-7 mb-20 max-w-[1280px] mx-auto">
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Platform Mastery</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Learn the tools</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Open the Trading Terminal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Start with the +EV tab</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Create your first preset</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Experiment with filters</span>
                  </div>
                </div>
              </div>

              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Smart Execution</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Build winning habits</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Start small and learn</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Trust the numbers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Track your results</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Stay consistent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Statement */}
            <div className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ready to Start?</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Now that you know how to use the tools, it's time to put them to work.
                Open Sharp Shot, set your filters, and start taking the bets that put you on the winning side of the odds.
              </p>
              <p className="text-[#D8AC35] dark:text-[#D8AC35] font-semibold text-2xl">
                It's not luck. It's leverage.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}