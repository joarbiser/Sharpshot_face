import { Check } from "lucide-react";

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
            TUTORIALS.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Everything you need to know to get started with profitable sports betting — even if you've never placed a single wager.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-20">

          {/* 1. What You Need to Get Started */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Getting Started</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                WHAT YOU NEED TO GET STARTED
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300">You don't need much to begin:</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#D8AC35]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-lg">An account with at least one legal sportsbook</span>
                </div>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#D8AC35]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-lg">A small bankroll (you can start with $100 or less)</span>
                </div>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#D8AC35]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-lg">A Sharp Shot subscription</span>
                </div>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#D8AC35]" />
                  </div>
                  <span className="text-gray-900 dark:text-white text-lg">A willingness to learn and follow the data</span>
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

          {/* 2. Understanding How Odds Work */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Fundamentals</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                UNDERSTANDING HOW ODDS WORK
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Odds tell you two things: how much you can win and how likely the sportsbook thinks the outcome is. In the U.S. and Canada, the most common format is American odds. Negative odds (−) mean the team is the favorite, so you risk more to win less. Positive odds (+) mean the team is the underdog, so you risk less to win more. Examples are shown using $100, but the math scales to any bet size.
              </p>
            </div>

            {/* American Odds Cards */}
            <div className="grid lg:grid-cols-2 gap-8 mb-20 max-w-[1280px] mx-auto">
              <div className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-6">
                    <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    <span className="text-xs font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Negative Odds</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Favorites (Example: −150)</h3>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Negative odds tell you how much you must risk to make $100 profit.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">At −150, you must risk $150 to win $100.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">If you win, you get back $250 total ($150 stake + $100 profit).</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Implied probability: 60% (according to the odds).</span>
                  </div>
                </div>
              </div>

              <div className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-6">
                    <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                    <span className="text-xs font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Positive Odds</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Underdogs (Example: +200)</h3>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Positive odds tell you how much profit you make if you risk $100.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">At +200, you risk $100 to win $200 profit.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">If you win, you get back $300 total ($100 stake + $200 profit).</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Implied probability: 33% (according to the odds).</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Closing explanation */}
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                All American odds use $100 as the base number. That doesn't mean you have to bet $100 — it's just the standard reference point. If you bet $50 at +200, you'd win $100 profit instead of $200.
              </p>
            </div>
          </div>

          {/* 3. What Is Positive Expected Value (+EV) Betting? */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Core Strategy</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                WHAT IS POSITIVE EXPECTED VALUE (+EV) BETTING?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                This is the foundation of profitable sports betting.
              </p>
            </div>
            
            <div className="grid gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Expected Value (EV) measures the profitability of a bet over time. A positive EV bet is mathematically profitable in the long run, 
                  even if individual bets lose.
                </p>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  <strong className="text-gray-900 dark:text-white">Simple Example:</strong> If you have a 60% chance of winning a bet that pays even money (+100), 
                  that's a +EV bet because you'll profit over time.
                </p>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">How Sharp Shot Finds +EV Bets:</p>
                <ul className="space-y-3 list-disc list-inside text-gray-600 dark:text-gray-300 text-lg">
                  <li>We calculate the true probability of outcomes using market consensus</li>
                  <li>We compare this to the odds offered by each sportsbook</li>
                  <li>When a book's odds are better than the fair probability, we flag it as +EV</li>
                  <li>Higher EV percentages mean more profitable opportunities</li>
                </ul>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  The key insight: You don't need to win every bet to be profitable. You need to find bets where the odds are in your favor.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Arbitrage Betting */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Risk-Free Strategy</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                ARBITRAGE BETTING
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Guaranteed profit by betting all outcomes of an event.
              </p>
            </div>
            
            <div className="grid gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Arbitrage occurs when you can bet on all possible outcomes of an event and guarantee a profit regardless of the result. 
                  This happens when different sportsbooks have inefficient pricing.
                </p>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="font-semibold text-gray-900 dark:text-white mb-3">Example:</p>
                <ul className="space-y-3 list-disc list-inside text-gray-600 dark:text-gray-300">
                  <li>Book A offers Team X at +150</li>
                  <li>Book B offers Team Y at +150</li>
                  <li>If the true odds should total more than 100%, you can bet both sides for guaranteed profit</li>
                </ul>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Sharp Shot automatically calculates arbitrage opportunities and tells you exactly how much to bet on each side. 
                  These are risk-free profits, but they require accounts at multiple sportsbooks.
                </p>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  <strong className="text-gray-900 dark:text-white">Note:</strong> Arbitrage opportunities are rare and usually small (1-3% profit), 
                  but they're guaranteed money when executed correctly.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Middling */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Advanced Strategy</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                MIDDLING
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Win both sides of a bet when the final result falls "in the middle."
              </p>
            </div>
            
            <div className="grid gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Middling is an advanced strategy where you place two bets at the same time on different numbers (spread or total) across one or more sportsbooks, creating a 'middle' where both bets can win.
                </p>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Example:</p>
                <ul className="space-y-3 list-disc list-inside text-gray-600 dark:text-gray-300 text-lg">
                  <li>Book A: Team A -2.5 (−110)</li>
                  <li>Book B: Team B +7.5 (−110)</li>
                  <li>You place 1 unit on each side at the same time</li>
                  <li>If Team A wins by 3–7 points, both bets win and you profit</li>
                  <li>If the game lands outside that range, one side wins and the other loses (usually close to break-even)</li>
                </ul>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Unlike arbitrage, middling isn't guaranteed profit. But when you hit the middle, you win both bets. When you don't, you often break even or take a small loss depending on the prices you captured.
                </p>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                NAVIGATING THE SHARP SHOT PLATFORM
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">There are two main areas you'll use:</p>
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
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Real-time betting opportunities</p>
                </div>
                
                <div className="space-y-3 mt-4 mb-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Live feed of +EV, arbitrage, and middling opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Filter by sport, bet type, or minimum EV</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Click any row to see betting instructions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg leading-relaxed">Best for beginners — we do the math for you</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Highlight the best odds across all available books instantly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">One-click bet sizing suggestions using Kelly or flat staking</span>
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
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Share your presets publicly or keep them private for personal use</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Clone and tweak existing presets to refine your strategies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Summary & Next Steps */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Action Plan</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                SUMMARY & NEXT STEPS
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Your roadmap to profitable sports betting.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You've Learned:</h3>
                <ul className="space-y-3 list-disc list-inside text-gray-600 dark:text-gray-300">
                  <li>How to read American odds</li>
                  <li>The concept of Expected Value</li>
                  <li>Arbitrage betting strategies</li>
                  <li>Middling opportunities</li>
                  <li>How to navigate Sharp Shot</li>
                </ul>
              </div>
              
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Next Steps:</h3>
                <ol className="space-y-3 list-decimal list-inside text-gray-600 dark:text-gray-300">
                  <li>Open accounts at 2-3 major sportsbooks</li>
                  <li>Start with small bet sizes ($5-25)</li>
                  <li>Focus on +EV opportunities in the Trading Terminal</li>
                  <li>Track your results</li>
                  <li>Gradually increase bet sizes as you gain experience</li>
                </ol>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <p className="font-semibold text-gray-900 dark:text-white mb-3 text-center">Remember:</p>
                <p className="text-center leading-relaxed text-gray-600 dark:text-gray-300">
                  Profitable sports betting is about discipline and mathematics, not luck. Start small, follow the data, 
                  and be patient. Sharp Shot provides the opportunities — your job is to execute them consistently.
                </p>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
            <div className="text-center mb-6">
              <div className="w-4 h-4 rounded-full bg-[#D8AC35] mx-auto mb-4 animate-pulse"></div>
              <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                The goal isn't to win every bet — it's to consistently find 
                <span className="text-[#D8AC35]"> value where others don't</span>.
              </blockquote>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-[0.2em]">Sharp Shot</span>
              <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}