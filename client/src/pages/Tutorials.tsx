import { BookOpen, Target, TrendingUp, BarChart3, Shield, DollarSign, Play } from "lucide-react";

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <BookOpen className="h-12 w-12 text-[#D8AC35] dark:text-[#00ff41]" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
              Sharp Shot Tutorials
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Everything you need to know to get started with profitable sports betting — even if you've never placed a single wager.
          </p>
        </div>
      </section>

      {/* Tutorial Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Section 1: What You Need to Get Started */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#D8AC35] dark:bg-[#00ff41] rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg">1</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What You Need to Get Started</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">You don't need much to begin:</p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-lg">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full mt-3 flex-shrink-0"></div>
                <span>An account with at least one legal sportsbook</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full mt-3 flex-shrink-0"></div>
                <span>A small bankroll (you can start with $100 or less)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full mt-3 flex-shrink-0"></div>
                <span>A Sharp Shot subscription</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full mt-3 flex-shrink-0"></div>
                <span>A willingness to learn and follow the data</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 rounded-lg border border-[#D8AC35]/20 dark:border-[#00ff41]/20">
              <p className="text-gray-700 dark:text-gray-300">
                If you're brand new, we recommend starting small and focusing on understanding how and why you're placing each bet.
                Sharp Shot is designed to remove the guesswork — but knowing the basics will make you far more effective.
              </p>
            </div>
          </div>

          {/* Section 2: Understanding How Odds Work */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#D8AC35] dark:bg-[#00ff41] rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg">2</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Understanding How Odds Work</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              Before using Sharp Shot, it's important to understand how betting odds function. In U.S. markets, the most common format is American odds.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">American Odds</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">Negative odds (example: -150)</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">You must risk $150 to win $100 in profit.</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">If you bet $150 and win, you get back $250 total ($150 stake + $100 profit).</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">Positive odds (example: +200)</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">You win $200 for every $100 risked.</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">If you bet $100 and win, you get back $300 total ($100 stake + $200 profit).</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Odds</th>
                      <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Risk</th>
                      <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Profit if Win</th>
                      <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Total Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">-150</td>
                      <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-300">$150</td>
                      <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">$100</td>
                      <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">$250</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">+200</td>
                      <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-300">$100</td>
                      <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">$200</td>
                      <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">$300</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Implied Probability</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Odds can be converted into a percentage chance — called implied probability — which tells you how often the bet must win to break even.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                      <strong>Negative odds formula:</strong><br />
                      odds / (odds + 100)
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                      <strong>Positive odds formula:</strong><br />
                      100 / (odds + 100)
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">-150 odds</h4>
                    <p className="font-mono text-sm text-gray-700 dark:text-gray-300">150 / (150 + 100) = 0.60 → 60% implied probability</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">+200 odds</h4>
                    <p className="font-mono text-sm text-gray-700 dark:text-gray-300">100 / (200 + 100) = 0.333 → 33.3% implied probability</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">The Vig (Sportsbook's Edge)</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Sportsbooks build a margin into their odds so they profit regardless of the outcome. This is called the vig (or juice).
                </p>
                <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-3">Example:</h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>Imagine two teams are playing, and the odds are the same for both: -110 on Team A and -110 on Team B.</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>If odds were perfectly fair, the probabilities would add up to 100%.</li>
                      <li>But at -110, each side has an implied probability of 52.38%.</li>
                      <li>When you add them together, you get 104.76%, not 100%.</li>
                    </ul>
                    <p className="font-semibold text-yellow-800 dark:text-yellow-300">
                      That extra 4.76% is the sportsbook's built-in margin — their guaranteed profit over time, no matter which team wins.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 rounded-lg border border-[#D8AC35]/20 dark:border-[#00ff41]/20">
                  <h4 className="font-bold text-[#D8AC35] dark:text-[#00ff41] mb-2">Why This Matters in Sharp Shot</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Sharp Shot removes the vig and calculates true market odds.</li>
                    <li>• This lets you see the real probability of a bet winning and compare it to the sportsbook's price — the foundation of finding +EV bets.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: What Is Positive Expected Value (+EV) Betting? */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#D8AC35] dark:bg-[#00ff41] rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg">3</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-[#D8AC35] dark:text-[#00ff41]" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Is Positive Expected Value (+EV) Betting?</h2>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              Positive Expected Value (+EV) means you're getting better odds than the bet is truly worth — which gives you the advantage instead of the sportsbook.
            </p>

            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 mb-6">
              <h3 className="font-bold text-green-800 dark:text-green-300 mb-4 text-xl">Example</h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>The Dallas Cowboys are listed at <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">-120</span> on DraftKings to beat the Carolina Panthers.</p>
                <p>When we check the rest of the market, most sportsbooks have the Cowboys between <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">-180</span> and <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">-200</span>.</p>
                <p>By comparing all the books and removing the built-in margin (vig), Sharp Shot finds that the true market odds are about <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">-185</span>.</p>
                <p className="font-semibold text-green-800 dark:text-green-300">
                  That means DraftKings is giving you a much better deal than the actual market value — and that's a +EV bet.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                When you take bets like this over and over, the math tilts in your favor. You might not win every single wager — no one does — but you're consistently putting yourself in situations where you're getting more value than you're paying for.
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                That's the foundation of how sharp bettors win. It's not about guessing better — it's about finding and taking advantage of small edges, again and again, until they add up to serious profit.
              </p>
            </div>
          </div>

          {/* Section 4: Navigating the Sharp Shot Platform */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#D8AC35] dark:bg-[#00ff41] rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg">4</span>
              </div>
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-[#D8AC35] dark:text-[#00ff41]" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Navigating the Sharp Shot Platform</h2>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">There are two main areas you'll use:</p>

            <div className="space-y-8">
              {/* Trading Terminal */}
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Trading Terminal</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Your real-time feed of profitable bets.</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">The Trading Terminal is divided into four sections so you can quickly filter by the type of opportunity you want to target:</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">All</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Shows every opportunity that matches your filters, no matter the type</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold text-green-600 dark:text-green-400 mb-2">+EV</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Displays only Positive Expected Value bets</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold text-yellow-600 dark:text-yellow-400 mb-2">Arbitrage</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Displays only guaranteed-profit opportunities</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-2">Middling</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Displays only middle-zone betting opportunities</p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-3">Each section displays:</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Market odds across books</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Vig-free true odds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Expected Value (%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Tags for quick identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Links to sportsbooks</span>
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  You can further refine results by sport, market type, odds range, books, and more.
                </p>
              </div>

              {/* Preset Terminal */}
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-4">Preset Terminal</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The Preset Terminal is where you turn Sharp Shot into your version of the platform.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Presets let you lock in your ideal settings and instantly filter the Trading Terminal to show only the bets that match your exact strategy.
                </p>

                <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3">You can:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Use Sharp Shot's built-in presets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Create your own private presets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Clone and modify community presets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Share your presets with other users — or keep them private as a competitive advantage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Save and test your strongest filters to see which strategies produce the best long-term results</span>
                  </li>
                </ul>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3">The real power comes with book weighting.</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    With book weighting, you can tell Sharp Shot which sportsbooks to trust more when calculating true market odds — and which to downplay.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">For example:</p>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Give extra influence to sharper books like Pinnacle or Circa</li>
                    <li>• Reduce the impact of slower-moving or less reliable books</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Arbitrage Betting */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#D8AC35] dark:bg-[#00ff41] rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg">5</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-[#D8AC35] dark:text-[#00ff41]" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Arbitrage Betting</h2>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              Arbitrage betting means strategically placing bets on both sides of the same game — using two different sportsbooks — in a way that guarantees you a profit no matter who wins.
            </p>

            <div className="space-y-6 text-gray-600 dark:text-gray-300">
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

            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-4 text-xl">Example</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Lines found:</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• <strong>Book A:</strong> Team A at <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">+140</span></li>
                    <li>• <strong>Book B:</strong> Team B at <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">-105</span></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">You want to risk $100 total.</h4>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sharp Shot recommends:</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Bet <span className="font-mono bg-green-100 dark:bg-green-900 px-2 py-1 rounded">$44.86</span> on Team A at +140</li>
                    <li>• Bet <span className="font-mono bg-green-100 dark:bg-green-900 px-2 py-1 rounded">$55.14</span> on Team B at -105</li>
                  </ul>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Profit</th>
                        <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Scenario</th>
                        <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Payout on A</th>
                        <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Payout on B</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">+$7.66</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">Team A wins</td>
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">$107.66</td>
                        <td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">-$55.14</td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">+$7.66</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">Team B wins</td>
                        <td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">-$44.86</td>
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">$107.66</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="font-semibold text-green-800 dark:text-green-300">
                  That's a 7.7% locked ROI on your total stake, with zero risk. These high-margin arbs are rare — but when they appear, Sharp Shot alerts you instantly so you can lock in the profit before the lines move.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Middling */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#D8AC35] dark:bg-[#00ff41] rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg">6</span>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-[#D8AC35] dark:text-[#00ff41]" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Middling</h2>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              Middling is a strategy where you place bets on both sides of the same game at different point spreads or totals — in a way that gives you a chance to win both bets if the final result lands in the "middle" zone between your two lines.
            </p>

            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <p>
                Unlike arbitrage, middling doesn't guarantee a profit on every play. Instead, it creates a low-risk scenario where you can win both bets for a big payout — or win one and break even (or profit slightly) if the middle doesn't hit.
              </p>
              
              <div className="p-4 bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 rounded-lg border border-[#D8AC35]/20 dark:border-[#00ff41]/20">
                <h4 className="font-bold text-[#D8AC35] dark:text-[#00ff41] mb-2">Here's the key:</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Every single middle opportunity Sharp Shot shows is still Positive Expected Value (+EV) on both sides.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  That means even if the "middle" outcome never happens, you're still getting the best of the market — just like with our standard +EV bets.
                </p>
                <p className="font-semibold text-[#D8AC35] dark:text-[#00ff41]">
                  The middle is simply an extra layer of upside.
                </p>
              </div>

              <p>
                Sharp Shot finds these plays by scanning all available sportsbooks and spotting when the lines are far enough apart to create strong value. Then, we tell you exactly how much to wager on each side to maximize your upside while minimizing risk.
              </p>
            </div>

            <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-4 text-xl">Example</h3>
              
              <div className="space-y-4">
                <div>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• <strong>Book A:</strong> Over 44.5 total points at <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">-110</span></li>
                    <li>• <strong>Book B:</strong> Under 47.5 total points at <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">-110</span></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">You want to risk $100 total.</h4>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sharp Shot recommends:</h4>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Bet <span className="font-mono bg-green-100 dark:bg-green-900 px-2 py-1 rounded">$50</span> on Over 44.5 at -110</li>
                    <li>• Bet <span className="font-mono bg-green-100 dark:bg-green-900 px-2 py-1 rounded">$50</span> on Under 47.5 at -110</li>
                  </ul>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Profit</th>
                        <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Scenario</th>
                        <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Over Bet Result</th>
                        <th className="px-4 py-3 text-left font-mono text-gray-900 dark:text-white">Under Bet Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400 font-bold">+$90.91</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">Game ends with 45, 46, or 47 total points (middle hits)</td>
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">Win $45.45</td>
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">Win $45.45</td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">+$45.45</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">Game ends with ≤ 44 points</td>
                        <td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">Lose $50</td>
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">Win $95.45</td>
                      </tr>
                      <tr className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">+$45.45</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">Game ends with ≥ 48 points</td>
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">Win $95.45</td>
                        <td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">Lose $50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3">Why Middling Works</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• The sweet spot is when the final score lands in the gap between the two lines (in this case, 45–47 points). When that happens, you cash both tickets.</li>
                    <li>• Even if the middle doesn't hit, the bets you placed are still individually +EV, so you're still getting long-term value. The middle just turns some of those wins into massive wins.</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mt-3">
                    Sharp Shot handles the scanning, timing, and calculations so you can act quickly before the lines move.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Summary & Next Steps */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#D8AC35] dark:bg-[#00ff41] rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg">7</span>
              </div>
              <div className="flex items-center gap-3">
                <Play className="h-8 w-8 text-[#D8AC35] dark:text-[#00ff41]" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Summary & Next Steps</h2>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              You now have the foundation you need to start using Sharp Shot — even if you've never placed a sports bet before. Let's quickly recap what you've learned and turn it into an action plan.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What You've Learned</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full mt-3 flex-shrink-0"></div>
                    <span>The basics you need — one sportsbook account, a small bankroll, and your Sharp Shot subscription.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full mt-3 flex-shrink-0"></div>
                    <span>How odds work — the difference between positive and negative odds, implied probability, and the sportsbook's vig.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full mt-3 flex-shrink-0"></div>
                    <span>Positive Expected Value betting — finding situations where the odds you get are better than the true market odds, giving you the edge instead of the house.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full mt-3 flex-shrink-0"></div>
                    <span>How to navigate Sharp Shot — the Trading Terminal for real-time betting opportunities and the Preset Terminal for saving, sharing, and customizing your strategies.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full mt-3 flex-shrink-0"></div>
                    <span>Arbitrage betting — locking in guaranteed profits by betting both sides at different sportsbooks.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full mt-3 flex-shrink-0"></div>
                    <span>Middling — creating low-risk opportunities to win both bets, with all middles on Sharp Shot still being +EV.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your First Steps in Sharp Shot</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">1. Log in and open the Trading Terminal</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      This is your real-time feed of opportunities. Start in the +EV tab so you get used to spotting good value bets without worrying about more complex strategies.
                    </p>
                  </div>

                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">2. Place your first +EV bet</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Look for a bet with a clear edge — even if it's small. The point is to get familiar with the process. Remember: it's not about winning every bet, it's about consistently getting value.
                    </p>
                  </div>

                  <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">3. Experiment with the Preset Terminal</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Create your first preset based on a sport you like, an odds range you're comfortable with, and the books you use. Save it and try applying it to the Trading Terminal.
                    </p>
                  </div>

                  <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">4. Watch for an arbitrage or middle opportunity</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      When one pops up, don't rush — but place it if you feel confident. Use the recommended stake sizes Sharp Shot gives you.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-gray-300 mb-2">5. Track your results</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Keep a simple record of your bets and outcomes. Over time, you'll see how the small edges Sharp Shot finds add up.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tips for Success</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 rounded-lg border border-[#D8AC35]/20 dark:border-[#00ff41]/20">
                    <h4 className="font-bold text-[#D8AC35] dark:text-[#00ff41] mb-2">Start small</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">Focus on learning the platform before worrying about big profits.</p>
                  </div>
                  <div className="p-4 bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 rounded-lg border border-[#D8AC35]/20 dark:border-[#00ff41]/20">
                    <h4 className="font-bold text-[#D8AC35] dark:text-[#00ff41] mb-2">Stay consistent</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">The real power of +EV betting comes from repetition.</p>
                  </div>
                  <div className="p-4 bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 rounded-lg border border-[#D8AC35]/20 dark:border-[#00ff41]/20">
                    <h4 className="font-bold text-[#D8AC35] dark:text-[#00ff41] mb-2">Trust the numbers</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">Even when you lose a bet, if it was +EV, it was the right decision.</p>
                  </div>
                  <div className="p-4 bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 rounded-lg border border-[#D8AC35]/20 dark:border-[#00ff41]/20">
                    <h4 className="font-bold text-[#D8AC35] dark:text-[#00ff41] mb-2">Use multiple books</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">The more options you have, the more opportunities Sharp Shot can find for you.</p>
                  </div>
                  <div className="p-4 bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 rounded-lg border border-[#D8AC35]/20 dark:border-[#00ff41]/20">
                    <h4 className="font-bold text-[#D8AC35] dark:text-[#00ff41] mb-2">Check in often</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">Lines move fast; catching value early is key.</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-r from-[#D8AC35]/20 to-[#D8AC35]/10 dark:from-[#00ff41]/20 dark:to-[#00ff41]/10 rounded-lg border border-[#D8AC35]/30 dark:border-[#00ff41]/30">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Final Word</h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg">
                  <p>
                    Sharp Shot isn't about guessing who's going to win. It's about finding and exploiting inefficiencies in the betting market. You'll still have wins and losses — that's the nature of sports betting — but over time, if you stick to the strategies you've just learned, the math tilts in your favor.
                  </p>
                  <p>
                    Now that you know how to use the tools, it's time to put them to work.
                    Open Sharp Shot, set your filters, and start taking the bets that put you on the winning side of the odds.
                  </p>
                  <p className="font-bold text-[#D8AC35] dark:text-[#00ff41] text-xl">
                    It's not luck. It's leverage.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}