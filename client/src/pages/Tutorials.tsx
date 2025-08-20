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
            Everything you need to know to get started with profitable sports betting — even if you've never placed a single wager.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-20">

          {/* What You Need to Get Started */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
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
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#D8AC35]" />
                    </div>
                    <span className="text-gray-900 dark:text-white">An account with at least one legal sportsbook</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#D8AC35]" />
                    </div>
                    <span className="text-gray-900 dark:text-white">A small bankroll (you can start with $100 or less)</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#D8AC35]" />
                    </div>
                    <span className="text-gray-900 dark:text-white">A Sharp Shot subscription</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D8AC35]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#D8AC35]" />
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

          {/* Understanding How Odds Work */}
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
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
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

              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
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
                    <span className="text-gray-900 dark:text-white text-sm leading-relaxed">You win $200 for every $100 risked</span>
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

            {/* Odds Comparison Table */}
            <div className="relative mb-20">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
              <div className="relative bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Quick Reference</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Odds</th>
                        <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Risk</th>
                        <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Profit if Win</th>
                        <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Total Return</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">-150</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">$150</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">$100</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">$250</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">+200</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">$100</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">$200</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">$300</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Implied Probability Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Math</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                Implied Probability
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Odds can be converted into a percentage chance — called implied probability — which tells you how often the bet must win to break even.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-7 mb-12 max-w-[1280px] mx-auto">
              <div className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Negative Odds Formula</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">odds / (odds + 100) — where odds is the positive number from the line (drop the minus sign)</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">-150 odds</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">150 / (150 + 100) = 0.60 → 60% implied probability</p>
                </div>
              </div>
              
              <div className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Positive Odds Formula</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">100 / (odds + 100)</p>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">+200 odds</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">100 / (200 + 100) = 0.333 → 33.3% implied probability</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Vig Section */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                  The Vig (Sportsbook's Edge)
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">Sportsbooks build a margin into their odds so they profit regardless of the outcome. This is called the vig (or juice).</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Example:</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Imagine two teams are playing, and the odds are the same for both: -110 on Team A and -110 on Team B.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                      </div>
                      <span className="text-gray-900 dark:text-white text-sm">If odds were perfectly fair, probabilities would add up to 100%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                      </div>
                      <span className="text-gray-900 dark:text-white text-sm">But at -110, each side has 52.38% implied probability</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                      </div>
                      <span className="text-gray-900 dark:text-white text-sm">Added together: 104.76%, not 100%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                      </div>
                      <span className="text-gray-900 dark:text-white text-sm">Extra 4.76% = sportsbook's guaranteed profit</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#D8AC35]/10 p-6 rounded-lg border border-[#D8AC35]/20">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Why This Matters in Sharp Shot</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sharp Shot removes the vig and calculates true market odds. This lets you see the real probability of a bet winning and compare it to the sportsbook's price — the foundation of finding +EV bets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* +EV Betting Section */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Strategy</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                  What Is Positive Expected Value (+EV) Betting?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Positive Expected Value (+EV) means you're getting better odds than the bet is truly worth — which gives you the advantage instead of the sportsbook.
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Example</h3>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p>The Dallas Cowboys are listed at -120 on DraftKings to beat the Carolina Panthers.</p>
                    <p>When we check the rest of the market, most sportsbooks have the Cowboys between -180 and -200.</p>
                    <p>By comparing all the books and removing the built-in margin (vig), Sharp Shot finds that the true market odds are about -185.</p>
                    <p className="font-semibold text-[#D8AC35]">That means DraftKings is giving you a much better deal than the actual market value — and that's a +EV bet.</p>
                  </div>
                </div>

                <div className="bg-[#D8AC35]/10 p-6 rounded-lg border border-[#D8AC35]/20">
                  <p className="text-gray-600 dark:text-gray-300">
                    When you take bets like this over and over, the math tilts in your favor. You might not win every single wager — no one does — but you're consistently putting yourself in situations where you're getting more value than you're paying for.
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold mt-4">
                    That's the foundation of how sharp bettors win. It's not about guessing better — it's about finding and taking advantage of small edges, again and again, until they add up to serious profit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Platform</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                Navigating the Sharp Shot Platform
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">There are two main areas you'll use:</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-20 max-w-[1280px] mx-auto">
              {/* Trading Terminal */}
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50 mb-6">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-[0.2em]">Real-Time</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Trading Terminal</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Your real-time feed of profitable bets</p>
                </div>
                
                <div className="space-y-6 flex-1">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      The Trading Terminal is divided into four sections so you can quickly filter by the type of opportunity you want to target:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm"><strong>All</strong> – Shows every opportunity that matches your filters, no matter the type</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm"><strong>+EV</strong> – Displays only Positive Expected Value bets</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm"><strong>Arbitrage</strong> – Displays only guaranteed-profit opportunities</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm"><strong>Middling</strong> – Displays only middle-zone betting opportunities</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Each section displays:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-xs">Market odds across books</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-xs">Vig-free true odds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-xs">Expected Value (%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-xs">Tags for quick identification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-xs">Links to sportsbooks</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">
                      You can further refine results by sport, market type, odds range, books, and more.
                    </p>
                  </div>
                </div>
              </div>

              {/* Preset Terminal */}
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-[0.2em]">Customization</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Preset Terminal</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Turn Sharp Shot into your version of the platform</p>
                </div>
                
                <div className="space-y-6 flex-1">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Presets let you lock in your ideal settings and instantly filter the Trading Terminal to show only the bets that match your exact strategy.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm">Use Sharp Shot's built-in presets</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm">Create your own private presets</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm">Clone and modify community presets</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm">Share your presets with other users — or keep them private as a competitive advantage</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm">Save and test your strongest filters to see which strategies produce the best long-term results</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#D8AC35]/10 p-4 rounded-lg border border-[#D8AC35]/20">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Book Weighting</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">
                      The real power comes with book weighting. You can tell Sharp Shot which sportsbooks to trust more when calculating true market odds — and which to downplay.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">
                      For example: Give extra influence to sharper books like Pinnacle or Circa, or reduce the impact of slower-moving or less reliable books.
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Once you dial in your presets, weighting, and testing, the Trading Terminal becomes a laser-focused feed of only the opportunities that match your exact strategy — and you'll have the performance data to back it up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arbitrage Section */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Arbitrage</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                  Arbitrage Betting
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Arbitrage betting means strategically placing bets on both sides of the same game — using two different sportsbooks — in a way that guarantees you a profit no matter who wins.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    This works because sportsbooks often post slightly different odds for the same event. If those differences are big enough, you can cover every possible outcome while still coming out ahead.
                  </p>
                  <p>
                    Sharp Shot scans the market in real time, spots these opportunities instantly, and calculates the exact amount to wager on each side so your payout is locked in before the game even starts. You don't have to guess or do the math — we handle it for you.
                  </p>
                  <p>
                    With arbitrage, the profit per bet is usually small, but it's consistent, repeatable, and risk-free when executed correctly. Over time, stacking these wins can add up to meaningful returns without exposing your bankroll to major swings.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Example</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Lines found:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">Book A: Team A at +140</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">Book B: Team B at -105</span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">You want to risk $100 total.</p>
                      
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 mt-4">Sharp Shot recommends:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">Bet $44.86 on Team A at +140</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">Bet $55.14 on Team B at -105</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Outcomes (profit shown first):</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="text-left py-2 text-gray-900 dark:text-white font-semibold">Profit</th>
                              <th className="text-left py-2 text-gray-900 dark:text-white font-semibold">Scenario</th>
                              <th className="text-left py-2 text-gray-900 dark:text-white font-semibold">Payout on A</th>
                              <th className="text-left py-2 text-gray-900 dark:text-white font-semibold">Payout on B</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <td className="py-2 text-[#D8AC35] font-semibold">+$7.66</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">Team A wins</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">$107.66</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">-$55.14</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-[#D8AC35] font-semibold">+$7.66</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">Team B wins</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">-$44.86</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">$107.66</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#D8AC35]/10 p-6 rounded-lg border border-[#D8AC35]/20 mt-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      That's a 7.7% locked ROI on your total stake, with zero risk. These high-margin arbs are rare — but when they appear, Sharp Shot alerts you instantly so you can lock in the profit before the lines move.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middling Section */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Middling</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                  Middling
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Middling is a strategy where you place bets on both sides of the same game at different point spreads or totals — in a way that gives you a chance to win both bets if the final result lands in the "middle" zone between your two lines.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    Unlike arbitrage, middling doesn't guarantee a profit on every play. Instead, it creates a low-risk scenario where you can win both bets for a big payout — or win one and break even (or profit slightly) if the middle doesn't hit.
                  </p>
                  
                  <div className="bg-[#D8AC35]/10 p-6 rounded-lg border border-[#D8AC35]/20">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Here's the key:</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Every single middle opportunity Sharp Shot shows is still Positive Expected Value (+EV) on both sides.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      That means even if the "middle" outcome never happens, you're still getting the best of the market — just like with our standard +EV bets.
                      The middle is simply an extra layer of upside.
                    </p>
                  </div>
                  
                  <p>
                    Sharp Shot finds these plays by scanning all available sportsbooks and spotting when the lines are far enough apart to create strong value. Then, we tell you exactly how much to wager on each side to maximize your upside while minimizing risk.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Example</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">Book A: Over 44.5 total points at -110</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">Book B: Under 47.5 total points at -110</span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">You want to risk $100 total.</p>
                      
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Sharp Shot recommends:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">Bet $50 on Over 44.5 at -110</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">Bet $50 on Under 47.5 at -110</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Outcomes (profit shown first):</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="text-left py-2 text-gray-900 dark:text-white font-semibold">Profit</th>
                              <th className="text-left py-2 text-gray-900 dark:text-white font-semibold">Scenario</th>
                              <th className="text-left py-2 text-gray-900 dark:text-white font-semibold">Over Bet</th>
                              <th className="text-left py-2 text-gray-900 dark:text-white font-semibold">Under Bet</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <td className="py-2 text-[#D8AC35] font-semibold">+$90.91</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">45, 46, or 47 total (middle hits)</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">Win $45.45</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">Win $45.45</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <td className="py-2 text-[#D8AC35] font-semibold">+$45.45</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">≤ 44 points</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">Lose $50</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">Win $95.45</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-[#D8AC35] font-semibold">+$45.45</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">≥ 48 points</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">Win $95.45</td>
                              <td className="py-2 text-gray-600 dark:text-gray-300">Lose $50</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#D8AC35]/10 p-6 rounded-lg border border-[#D8AC35]/20">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Why Middling Works</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    The sweet spot is when the final score lands in the gap between the two lines (in this case, 45–47 points). When that happens, you cash both tickets.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Even if the middle doesn't hit, the bets you placed are still individually +EV, so you're still getting long-term value. The middle just turns some of those wins into massive wins.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-3">
                    Sharp Shot handles the scanning, timing, and calculations so you can act quickly before the lines move.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary & Next Steps */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Summary</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                  Summary & Next Steps
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  You now have the foundation you need to start using Sharp Shot — even if you've never placed a sports bet before. Let's quickly recap what you've learned and turn it into an action plan.
                </p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You've Learned</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm">The basics you need — one sportsbook account, a small bankroll, and your Sharp Shot subscription</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm">How odds work — the difference between positive and negative odds, implied probability, and the sportsbook's vig</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm">Positive Expected Value betting — finding situations where the odds you get are better than the true market odds, giving you the edge instead of the house</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm">How to navigate Sharp Shot — the Trading Terminal for real-time betting opportunities and the Preset Terminal for saving, sharing, and customizing your strategies</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm">Arbitrage betting — locking in guaranteed profits by betting both sides at different sportsbooks</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm">Middling — creating low-risk opportunities to win both bets, with all middles on Sharp Shot still being +EV</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your First Steps in Sharp Shot</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Log in and open the Trading Terminal</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">This is your real-time feed of opportunities. Start in the +EV tab so you get used to spotting good value bets without worrying about more complex strategies.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Place your first +EV bet</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Look for a bet with a clear edge — even if it's small. The point is to get familiar with the process. Remember: it's not about winning every bet, it's about consistently getting value.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Experiment with the Preset Terminal</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Create your first preset based on a sport you like, an odds range you're comfortable with, and the books you use. Save it and try applying it to the Trading Terminal.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Watch for an arbitrage or middle opportunity</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">When one pops up, don't rush — but place it if you feel confident. Use the recommended stake sizes Sharp Shot gives you.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Track your results</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Keep a simple record of your bets and outcomes. Over time, you'll see how the small edges Sharp Shot finds add up.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips for Success</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm"><strong>Start small</strong> — Focus on learning the platform before worrying about big profits</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm"><strong>Stay consistent</strong> — The real power of +EV betting comes from repetition</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm"><strong>Trust the numbers</strong> — Even when you lose a bet, if it was +EV, it was the right decision</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm"><strong>Use multiple books</strong> — The more options you have, the more opportunities Sharp Shot can find for you</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white text-sm"><strong>Check in often</strong> — Lines move fast; catching value early is key</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Word Section */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                  Final Word
                </h3>
              </div>
              
              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <p>
                  Sharp Shot isn't about guessing who's going to win. It's about finding and exploiting inefficiencies in the betting market. You'll still have wins and losses — that's the nature of sports betting — but over time, if you stick to the strategies you've just learned, the math tilts in your favor.
                </p>
                <p>
                  Now that you know how to use the tools, it's time to put them to work.
                  Open Sharp Shot, set your filters, and start taking the bets that put you on the winning side of the odds.
                </p>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-[#D8AC35] dark:text-[#D8AC35] font-semibold text-2xl">
                  It's not luck. It's leverage.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}