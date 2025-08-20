import { Check } from "lucide-react";

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      {/* Hero Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
            TUTORIALS.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Everything you need to know to get started with profitable sports betting — even if you've never placed a single wager.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-20">

          {/* 1. What You Need to Get Started */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12 lg:p-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Getting Started</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                  What You Need to Get Started
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">You don't need much to begin:</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 justify-start">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#D8AC35]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-left">An account with at least one legal sportsbook</span>
                  </div>
                  <div className="flex items-center gap-4 justify-start">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#D8AC35]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-left">A small bankroll (you can start with $100 or less)</span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 justify-start">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#D8AC35]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-left">A Sharp Shot subscription</span>
                  </div>
                  <div className="flex items-center gap-4 justify-start">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#D8AC35]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-left">A willingness to learn and follow the data</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center max-w-4xl mx-auto">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you're brand new, we recommend starting small and focusing on understanding how and why you're placing each bet.
                  Sharp Shot is designed to remove the guesswork — but knowing the basics will make you far more effective.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Understanding How Odds Work */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Fundamentals</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                Understanding How Odds Work
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Before using Sharp Shot, it's important to understand how betting odds function. In U.S. markets, the most common format is American odds.
              </p>
            </div>

            {/* American Odds Cards */}
            <div className="grid lg:grid-cols-2 gap-8 mb-20 max-w-[1280px] mx-auto">
              <div className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50 mb-6">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-[0.2em]">Negative Odds</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Favorites (Example: -150)</h3>
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
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">If you bet $150 and win, you get back $250 total ($150 stake + $100 profit)</span>
                  </div>
                </div>
              </div>

              <div className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-[0.2em]">Positive Odds</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Underdogs (Example: +200)</h3>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">You risk $100 to win $200 in profit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">If you bet $100 and win, you get back $300 total ($100 stake + $200 profit)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. What Is Positive Expected Value (+EV) Betting? */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12 lg:p-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Core Strategy</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                  What Is Positive Expected Value (+EV) Betting?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  This is the foundation of profitable sports betting.
                </p>
              </div>
              
              <div className="space-y-8 text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-4xl mx-auto">
                <p>
                  Expected Value (EV) measures the profitability of a bet over time. A positive EV bet is mathematically profitable in the long run, 
                  even if individual bets lose.
                </p>
                
                <p>
                  <strong className="text-gray-900 dark:text-white">Simple Example:</strong> If you have a 60% chance of winning a bet that pays even money (+100), 
                  that's a +EV bet because you'll profit over time.
                </p>
                
                <div className="bg-gray-100/50 dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                  <p className="font-semibold text-gray-900 dark:text-white mb-3">How Sharp Shot Finds +EV Bets:</p>
                  <ul className="space-y-3 list-disc list-inside">
                    <li>We calculate the true probability of outcomes using market consensus</li>
                    <li>We compare this to the odds offered by each sportsbook</li>
                    <li>When a book's odds are better than the fair probability, we flag it as +EV</li>
                    <li>Higher EV percentages mean more profitable opportunities</li>
                  </ul>
                </div>
                
                <p>
                  The key insight: You don't need to win every bet to be profitable. You need to find bets where the odds are in your favor.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Arbitrage Betting */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12 lg:p-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Risk-Free Strategy</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                  Arbitrage Betting
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Guaranteed profit by betting all outcomes of an event.
                </p>
              </div>
              
              <div className="space-y-8 text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-4xl mx-auto">
                <p>
                  Arbitrage occurs when you can bet on all possible outcomes of an event and guarantee a profit regardless of the result. 
                  This happens when different sportsbooks have inefficient pricing.
                </p>
                
                <div className="bg-gray-100/50 dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                  <p className="font-semibold text-gray-900 dark:text-white mb-3">Example:</p>
                  <ul className="space-y-3 list-disc list-inside">
                    <li>Book A offers Team X at +150</li>
                    <li>Book B offers Team Y at +150</li>
                    <li>If the true odds should total more than 100%, you can bet both sides for guaranteed profit</li>
                  </ul>
                </div>
                
                <p>
                  Sharp Shot automatically calculates arbitrage opportunities and tells you exactly how much to bet on each side. 
                  These are risk-free profits, but they require accounts at multiple sportsbooks.
                </p>
                
                <p>
                  <strong className="text-gray-900 dark:text-white">Note:</strong> Arbitrage opportunities are rare and usually small (1-3% profit), 
                  but they're guaranteed money when executed correctly.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Middling */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12 lg:p-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Advanced Strategy</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                  Middling
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Win both sides of a bet when the final result falls "in the middle."
                </p>
              </div>
              
              <div className="space-y-8 text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-4xl mx-auto">
                <p>
                  Middling is an advanced strategy where you place two bets at the same time on different numbers (spread or total) across one or more sportsbooks, creating a 'middle' where both bets can win.
                </p>
                
                <div className="bg-gray-100/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Example:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>At the same moment: Book A has Team A -3 (-110) and Book B has Team B +6 (-110).</li>
                    <li>You place both bets immediately.</li>
                    <li>If Team A wins by 4 or 5, both bets win.</li>
                    <li>If the game lands outside the middle, one side usually wins and the other loses (often near break-even depending on prices).</li>
                  </ul>
                </div>
                
                <p>
                  Unlike arbitrage, middling isn't guaranteed profit. But when you hit the middle, you win both bets. When you don't, you often break even or take a small loss depending on the prices you captured.
                </p>
                
                <p>
                  Sharp Shot surfaces these windows in real time. We monitor lines live across books and alert you the instant a profitable middle appears, including the estimated hit probability and expected value.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Navigating the Sharp Shot Platform */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Platform Guide</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                Navigating the Sharp Shot Platform
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">There are two main areas you'll use:</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-20 max-w-[1280px] mx-auto">
              {/* Trading Terminal */}
              <div className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50 mb-6">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-[0.2em]">Live Opportunities</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Trading Terminal</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Real-time betting opportunities</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Live feed of +EV, arbitrage, and middling opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Filter by sport, bet type, or minimum EV</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Click any row to see betting instructions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Best for beginners — we do the math for you</span>
                  </div>
                </div>
              </div>

              {/* Preset Terminal */}
              <div className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-[0.2em]">Custom Strategies</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Preset Terminal</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Build custom betting strategies</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Weight different sportsbooks based on your preferences</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Create strategies for specific sports or bet types</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Track performance of your custom approaches</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Advanced tool for experienced bettors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Summary & Next Steps */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12 lg:p-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Action Plan</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                  Summary & Next Steps
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Your roadmap to profitable sports betting.
                </p>
              </div>
              
              <div className="space-y-8 text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You've Learned:</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>How to read American odds</li>
                      <li>The concept of Expected Value</li>
                      <li>Arbitrage betting strategies</li>
                      <li>Middling opportunities</li>
                      <li>How to navigate Sharp Shot</li>
                    </ul>
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Next Steps:</h3>
                    <ol className="space-y-3 list-decimal list-inside">
                      <li>Open accounts at 2-3 major sportsbooks</li>
                      <li>Start with small bet sizes ($5-25)</li>
                      <li>Focus on +EV opportunities in the Trading Terminal</li>
                      <li>Track your results</li>
                      <li>Gradually increase bet sizes as you gain experience</li>
                    </ol>
                  </div>
                </div>
                
                <div className="bg-gray-100/50 dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                  <p className="font-semibold text-gray-900 dark:text-white mb-3 text-center">Remember:</p>
                  <p className="text-center leading-relaxed">
                    Profitable sports betting is about discipline and mathematics, not luck. Start small, follow the data, 
                    and be patient. Sharp Shot provides the opportunities — your job is to execute them consistently.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Final Word */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12 lg:p-16">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Philosophy</span>
                </div>
                <blockquote className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 leading-tight italic">
                  "The goal isn't to win every bet. The goal is to consistently find value where others don't."
                </blockquote>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Sharp Shot gives you the tools and data to make informed decisions. The discipline to execute those decisions consistently is what separates profitable bettors from everyone else.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}