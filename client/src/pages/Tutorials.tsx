export default function Tutorials() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Sharp Shot Tutorials
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Everything you need to know to get started with profitable sports betting — even if you've never placed a single wager.
          </p>
        </div>
      </section>

      {/* Tutorial Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Section 1: What You Need to Get Started */}
          <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">1. What You Need to Get Started</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">You don't need much to begin:</p>
            
            <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-300 mb-8">
              <li>• An account with at least one legal sportsbook</li>
              <li>• A small bankroll (you can start with $100 or less)</li>
              <li>• A Sharp Shot subscription</li>
              <li>• A willingness to learn and follow the data</li>
            </ul>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              If you're brand new, we recommend starting small and focusing on understanding how and why you're placing each bet.
              Sharp Shot is designed to remove the guesswork — but knowing the basics will make you far more effective.
            </p>
          </div>

          {/* Section 2: Understanding How Odds Work */}
          <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">2. Understanding How Odds Work</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Before using Sharp Shot, it's important to understand how betting odds function. In U.S. markets, the most common format is American odds.
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">American Odds</h3>
                
                <div className="space-y-8 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Negative odds (example: -150)</h4>
                    <div className="space-y-2 text-lg text-gray-600 dark:text-gray-300">
                      <p>You must risk $150 to win $100 in profit.</p>
                      <p>If you bet $150 and win, you get back $250 total ($150 stake + $100 profit).</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Positive odds (example: +200)</h4>
                    <div className="space-y-2 text-lg text-gray-600 dark:text-gray-300">
                      <p>You win $200 for every $100 risked.</p>
                      <p>If you bet $100 and win, you get back $300 total ($100 stake + $200 profit).</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Reference</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-lg">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 text-gray-900 dark:text-white">Odds</th>
                          <th className="text-left py-3 text-gray-900 dark:text-white">Risk</th>
                          <th className="text-left py-3 text-gray-900 dark:text-white">Profit if Win</th>
                          <th className="text-left py-3 text-gray-900 dark:text-white">Total Return</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-3 font-mono text-gray-600 dark:text-gray-300">-150</td>
                          <td className="py-3 text-gray-600 dark:text-gray-300">$150</td>
                          <td className="py-3 text-gray-600 dark:text-gray-300">$100</td>
                          <td className="py-3 text-gray-600 dark:text-gray-300">$250</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-mono text-gray-600 dark:text-gray-300">+200</td>
                          <td className="py-3 text-gray-600 dark:text-gray-300">$100</td>
                          <td className="py-3 text-gray-600 dark:text-gray-300">$200</td>
                          <td className="py-3 text-gray-600 dark:text-gray-300">$300</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Implied Probability</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Odds can be converted into a percentage chance — called implied probability — which tells you how often the bet must win to break even.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Formulas</h4>
                    <div className="space-y-3 text-lg text-gray-600 dark:text-gray-300">
                      <p><strong>Negative odds formula:</strong> odds / (odds + 100) — where odds is the positive number from the line (drop the minus sign)</p>
                      <p><strong>Positive odds formula:</strong> 100 / (odds + 100)</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Examples</h4>
                    <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                      <div>
                        <p><strong>-150 odds</strong></p>
                        <p>150 / (150 + 100) = 0.60 → 60% implied probability</p>
                      </div>
                      <div>
                        <p><strong>+200 odds</strong></p>
                        <p>100 / (200 + 100) = 0.333 → 33.3% implied probability</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">The Vig (Sportsbook's Edge)</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Sportsbooks build a margin into their odds so they profit regardless of the outcome. This is called the vig (or juice).
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Example:</h4>
                  <div className="space-y-3 text-lg text-gray-600 dark:text-gray-300">
                    <p>Imagine two teams are playing, and the odds are the same for both: -110 on Team A and -110 on Team B.</p>
                    <p>If odds were perfectly fair, the probabilities would add up to 100%.</p>
                    <p>But at -110, each side has an implied probability of 52.38%.</p>
                    <p>When you add them together, you get 104.76%, not 100%.</p>
                    <p className="text-[#D8AC35] dark:text-[#00ff41] font-semibold">That extra 4.76% is the sportsbook's built-in margin — their guaranteed profit over time, no matter which team wins.</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Why This Matters in Sharp Shot</h4>
                  <div className="space-y-3 text-lg text-gray-600 dark:text-gray-300">
                    <p>Sharp Shot removes the vig and calculates true market odds.</p>
                    <p>This lets you see the real probability of a bet winning and compare it to the sportsbook's price — the foundation of finding +EV bets.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: What Is +EV Betting? */}
          <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">3. What Is Positive Expected Value (+EV) Betting?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Positive Expected Value (+EV) means you're getting better odds than the bet is truly worth — which gives you the advantage instead of the sportsbook.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded mb-8">
              <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-4">Example</h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-300 text-lg">
                <p>The Dallas Cowboys are listed at -120 on DraftKings to beat the Carolina Panthers.</p>
                <p>When we check the rest of the market, most sportsbooks have the Cowboys between -180 and -200.</p>
                <p>By comparing all the books and removing the built-in margin (vig), Sharp Shot finds that the true market odds are about -185.</p>
                <p className="text-[#D8AC35] dark:text-[#00ff41] font-medium text-xl">That means DraftKings is giving you a much better deal than the actual market value — and that's a +EV bet.</p>
              </div>
            </div>

            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>
                When you take bets like this over and over, the math tilts in your favor. You might not win every single wager — no one does — but you're consistently putting yourself in situations where you're getting more value than you're paying for.
              </p>
              <p>
                That's the foundation of how sharp bettors win. It's not about guessing better — it's about finding and taking advantage of small edges, again and again, until they add up to serious profit.
              </p>
            </div>
          </div>

          {/* Section 4: Navigating the Sharp Shot Platform */}
          <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">4. Navigating the Sharp Shot Platform</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">There are two main areas you'll use:</p>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Trading Terminal</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Your real-time feed of profitable bets.</p>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  The Trading Terminal is divided into four sections so you can quickly filter by the type of opportunity you want to target:
                </p>
                
                <ul className="space-y-3 text-lg text-gray-600 dark:text-gray-300 mb-6">
                  <li><strong>All</strong> – Shows every opportunity that matches your filters, no matter the type</li>
                  <li><strong>+EV</strong> – Displays only Positive Expected Value bets</li>
                  <li><strong>Arbitrage</strong> – Displays only guaranteed-profit opportunities</li>
                  <li><strong>Middling</strong> – Displays only middle-zone betting opportunities</li>
                </ul>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">Each section displays:</p>
                <ul className="space-y-2 text-lg text-gray-600 dark:text-gray-300 mb-6">
                  <li>• Market odds across books</li>
                  <li>• Vig-free true odds</li>
                  <li>• Expected Value (%)</li>
                  <li>• Tags for quick identification</li>
                  <li>• Links to sportsbooks</li>
                </ul>
                
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  You can further refine results by sport, market type, odds range, books, and more.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Preset Terminal</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  The Preset Terminal is where you turn Sharp Shot into your version of the platform.
                </p>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Presets let you lock in your ideal settings and instantly filter the Trading Terminal to show only the bets that match your exact strategy.
                </p>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">You can:</p>
                <ul className="space-y-2 text-lg text-gray-600 dark:text-gray-300 mb-8">
                  <li>• Use Sharp Shot's built-in presets</li>
                  <li>• Create your own private presets</li>
                  <li>• Clone and modify community presets</li>
                  <li>• Share your presets with other users — or keep them private as a competitive advantage</li>
                  <li>• Save and test your strongest filters to see which strategies produce the best long-term results</li>
                </ul>
                
                <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Book Weighting</h4>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    The real power comes with book weighting. With book weighting, you can tell Sharp Shot which sportsbooks to trust more when calculating true market odds — and which to downplay.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">For example:</p>
                  <ul className="space-y-2 text-lg text-gray-600 dark:text-gray-300">
                    <li>• Give extra influence to sharper books like Pinnacle or Circa</li>
                    <li>• Reduce the impact of slower-moving or less reliable books</li>
                  </ul>
                </div>
                
                <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                  <p>
                    When you share a preset, your filters, book weighting, and settings all carry over — so other users see exactly what you see.
                    When you keep it private, only you benefit from that fine-tuned edge.
                  </p>
                  <p>
                    Once you dial in your presets, weighting, and testing, the Trading Terminal becomes a laser-focused feed of only the opportunities that match your exact strategy — and you'll have the performance data to back it up.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Arbitrage Betting */}
          <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">5. Arbitrage Betting</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Arbitrage betting means strategically placing bets on both sides of the same game — using two different sportsbooks — in a way that guarantees you a profit no matter who wins.
            </p>

            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 mb-8">
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

            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded mb-8">
              <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-6">Example</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Lines found:</h4>
                  <ul className="space-y-2 text-lg text-gray-600 dark:text-gray-300">
                    <li>Book A: Team A at +140</li>
                    <li>Book B: Team B at -105</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">You want to risk $100 total.</h4>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Sharp Shot recommends:</h4>
                  <ul className="space-y-2 text-lg text-gray-600 dark:text-gray-300">
                    <li>Bet $44.86 on Team A at +140</li>
                    <li>Bet $55.14 on Team B at -105</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Outcomes (profit shown first):</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-lg border border-gray-200 dark:border-gray-700 rounded">
                      <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Profit</th>
                          <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Scenario</th>
                          <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Payout on A</th>
                          <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Payout on B</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-200 dark:border-gray-700">
                          <td className="px-4 py-3 text-[#D8AC35] dark:text-[#00ff41] font-semibold">+$7.66</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Team A wins</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">$107.66</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">-$55.14</td>
                        </tr>
                        <tr className="border-t border-gray-200 dark:border-gray-700">
                          <td className="px-4 py-3 text-[#D8AC35] dark:text-[#00ff41] font-semibold">+$7.66</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Team B wins</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">-$44.86</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">$107.66</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              That's a 7.7% locked ROI on your total stake, with zero risk. These high-margin arbs are rare — but when they appear, Sharp Shot alerts you instantly so you can lock in the profit before the lines move.
            </p>
          </div>

          {/* Section 6: Middling */}
          <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">6. Middling</h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Middling is a strategy where you place bets on both sides of the same game at different point spreads or totals — in a way that gives you a chance to win both bets if the final result lands in the "middle" zone between your two lines.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Unlike arbitrage, middling doesn't guarantee a profit on every play. Instead, it creates a low-risk scenario where you can win both bets for a big payout — or win one and break even (or profit slightly) if the middle doesn't hit.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded mb-8">
              <h4 className="text-xl font-semibold text-[#D8AC35] dark:text-[#00ff41] mb-4">Here's the key:</h4>
              <div className="space-y-3 text-lg text-gray-600 dark:text-gray-300">
                <p>Every single middle opportunity Sharp Shot shows is still Positive Expected Value (+EV) on both sides.</p>
                <p>That means even if the "middle" outcome never happens, you're still getting the best of the market — just like with our standard +EV bets.</p>
                <p className="text-[#D8AC35] dark:text-[#00ff41] font-semibold">The middle is simply an extra layer of upside.</p>
              </div>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Sharp Shot finds these plays by scanning all available sportsbooks and spotting when the lines are far enough apart to create strong value. Then, we tell you exactly how much to wager on each side to maximize your upside while minimizing risk.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded mb-8">
              <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-6">Example</h3>
              
              <div className="space-y-6">
                <div>
                  <ul className="space-y-2 text-lg text-gray-600 dark:text-gray-300">
                    <li>Book A: Over 44.5 total points at -110</li>
                    <li>Book B: Under 47.5 total points at -110</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">You want to risk $100 total.</h4>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Sharp Shot recommends:</h4>
                  <ul className="space-y-2 text-lg text-gray-600 dark:text-gray-300">
                    <li>Bet $50 on Over 44.5 at -110</li>
                    <li>Bet $50 on Under 47.5 at -110</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Outcomes (profit shown first):</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-lg border border-gray-200 dark:border-gray-700 rounded">
                      <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Profit</th>
                          <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Scenario</th>
                          <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Over Bet Result</th>
                          <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Under Bet Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
                          <td className="px-4 py-3 text-[#D8AC35] dark:text-[#00ff41] font-semibold">+$90.91</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Game ends with 45, 46, or 47 total points (middle hits)</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Win $45.45</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Win $45.45</td>
                        </tr>
                        <tr className="border-t border-gray-200 dark:border-gray-700">
                          <td className="px-4 py-3 text-[#D8AC35] dark:text-[#00ff41] font-semibold">+$45.45</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Game ends with ≤ 44 points</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Lose $50</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Win $95.45</td>
                        </tr>
                        <tr className="border-t border-gray-200 dark:border-gray-700">
                          <td className="px-4 py-3 text-[#D8AC35] dark:text-[#00ff41] font-semibold">+$45.45</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Game ends with ≥ 48 points</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Win $95.45</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Lose $50</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Why Middling Works</h4>
                <ul className="space-y-3">
                  <li>• The sweet spot is when the final score lands in the gap between the two lines (in this case, 45–47 points). When that happens, you cash both tickets.</li>
                  <li>• Even if the middle doesn't hit, the bets you placed are still individually +EV, so you're still getting long-term value. The middle just turns some of those wins into massive wins.</li>
                </ul>
              </div>
              
              <p>Sharp Shot handles the scanning, timing, and calculations so you can act quickly before the lines move.</p>
            </div>
          </div>

          {/* Section 7: Summary & Next Steps */}
          <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">7. Summary & Next Steps</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              You now have the foundation you need to start using Sharp Shot — even if you've never placed a sports bet before. Let's quickly recap what you've learned and turn it into an action plan.
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">What You've Learned</h3>
                <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                  <li>• The basics you need — one sportsbook account, a small bankroll, and your Sharp Shot subscription.</li>
                  <li>• How odds work — the difference between positive and negative odds, implied probability, and the sportsbook's vig.</li>
                  <li>• Positive Expected Value betting — finding situations where the odds you get are better than the true market odds, giving you the edge instead of the house.</li>
                  <li>• How to navigate Sharp Shot — the Trading Terminal for real-time betting opportunities and the Preset Terminal for saving, sharing, and customizing your strategies.</li>
                  <li>• Arbitrage betting — locking in guaranteed profits by betting both sides at different sportsbooks.</li>
                  <li>• Middling — creating low-risk opportunities to win both bets, with all middles on Sharp Shot still being +EV.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Your First Steps in Sharp Shot</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Log in and open the Trading Terminal</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      This is your real-time feed of opportunities. Start in the +EV tab so you get used to spotting good value bets without worrying about more complex strategies.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Place your first +EV bet</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Look for a bet with a clear edge — even if it's small. The point is to get familiar with the process. Remember: it's not about winning every bet, it's about consistently getting value.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Experiment with the Preset Terminal</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Create your first preset based on a sport you like, an odds range you're comfortable with, and the books you use. Save it and try applying it to the Trading Terminal.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Watch for an arbitrage or middle opportunity</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      When one pops up, don't rush — but place it if you feel confident. Use the recommended stake sizes Sharp Shot gives you.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Track your results</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Keep a simple record of your bets and outcomes. Over time, you'll see how the small edges Sharp Shot finds add up.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Tips for Success</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Start small</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Focus on learning the platform before worrying about big profits.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Stay consistent</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300">The real power of +EV betting comes from repetition.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Trust the numbers</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Even when you lose a bet, if it was +EV, it was the right decision.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Use multiple books</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300">The more options you have, the more opportunities Sharp Shot can find for you.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Check in often</h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Lines move fast; catching value early is key.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Final Word</h3>
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
                  <p>
                    Sharp Shot isn't about guessing who's going to win. It's about finding and exploiting inefficiencies in the betting market. You'll still have wins and losses — that's the nature of sports betting — but over time, if you stick to the strategies you've just learned, the math tilts in your favor.
                  </p>
                  <p>
                    Now that you know how to use the tools, it's time to put them to work.
                    Open Sharp Shot, set your filters, and start taking the bets that put you on the winning side of the odds.
                  </p>
                  <p className="text-[#D8AC35] dark:text-[#00ff41] font-semibold text-2xl">
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