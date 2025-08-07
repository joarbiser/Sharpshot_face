export default function Tutorials() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Tutorials
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know to get started with profitable sports betting — even if you've never placed a single wager.
          </p>
        </div>
      </section>

      {/* Tutorial Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Section 1: What You Need to Get Started */}
          <div className="border-l-2 border-[#D8AC35] dark:border-[#00ff41] pl-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What You Need to Get Started</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">You don't need much to begin:</p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• An account with at least one legal sportsbook</li>
              <li>• A small bankroll (you can start with $100 or less)</li>
              <li>• A Sharp Shot subscription</li>
              <li>• A willingness to learn and follow the data</li>
            </ul>
            <p className="mt-6 text-gray-600 dark:text-gray-300 text-sm">
              If you're brand new, we recommend starting small and focusing on understanding how and why you're placing each bet.
              Sharp Shot is designed to remove the guesswork — but knowing the basics will make you far more effective.
            </p>
          </div>

          {/* Section 2: Understanding How Odds Work */}
          <div className="border-l-2 border-[#D8AC35] dark:border-[#00ff41] pl-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding How Odds Work</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Before using Sharp Shot, it's important to understand how betting odds function. In U.S. markets, the most common format is American odds.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">American Odds</h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-red-600 dark:text-red-400">-150</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">You must risk $150 to win $100 in profit.</span>
                  </div>
                  <div>
                    <span className="font-mono text-green-600 dark:text-green-400">+200</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">You win $200 for every $100 risked.</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">The Vig (Sportsbook's Edge)</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Sportsbooks build a margin into their odds so they profit regardless of the outcome. This is called the vig (or juice).
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Sharp Shot removes the vig and calculates true market odds, letting you see the real probability of a bet winning and compare it to the sportsbook's price.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: What Is Positive Expected Value (+EV) Betting? */}
          <div className="border-l-2 border-[#D8AC35] dark:border-[#00ff41] pl-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Is +EV Betting?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Positive Expected Value (+EV) means you're getting better odds than the bet is truly worth — which gives you the advantage instead of the sportsbook.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Example</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <p>Cowboys at <span className="font-mono">-120</span> on DraftKings</p>
                <p>Most other books have Cowboys between <span className="font-mono">-180</span> and <span className="font-mono">-200</span></p>
                <p>Sharp Shot calculates true market odds around <span className="font-mono">-185</span></p>
                <p className="text-[#D8AC35] dark:text-[#00ff41] font-medium">DraftKings is offering better value — that's a +EV bet</p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm">
              When you take bets like this repeatedly, the math tilts in your favor. It's not about guessing better — it's about finding and taking advantage of small edges until they add up to serious profit.
            </p>
          </div>

          {/* Section 4: Navigating the Platform */}
          <div className="border-l-2 border-[#D8AC35] dark:border-[#00ff41] pl-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Navigating the Platform</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">There are two main areas you'll use:</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Trading Terminal</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">Your real-time feed of profitable bets.</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Filter by All, +EV, Arbitrage, or Middling. Each shows market odds, true odds, expected value, and direct links to sportsbooks.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Preset Terminal</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">Turn Sharp Shot into your version of the platform.</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Save your ideal settings, create custom filters, and use book weighting to prioritize sharper sportsbooks in calculations.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Arbitrage Betting */}
          <div className="border-l-2 border-[#D8AC35] dark:border-[#00ff41] pl-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Arbitrage Betting</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Strategically place bets on both sides of the same game using different sportsbooks to guarantee profit no matter who wins.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Example</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <p>Book A: Team A at <span className="font-mono">+140</span></p>
                <p>Book B: Team B at <span className="font-mono">-105</span></p>
                <p>Bet $44.86 on Team A, $55.14 on Team B</p>
                <p className="text-[#D8AC35] dark:text-[#00ff41] font-medium">Result: $7.66 profit regardless of outcome</p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Sharp Shot scans in real time, spots opportunities instantly, and calculates exact stake amounts. Profit per bet is small but consistent and risk-free.
            </p>
          </div>

          {/* Section 6: Middling */}
          <div className="border-l-2 border-[#D8AC35] dark:border-[#00ff41] pl-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Middling</h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Place bets on both sides of the same game at different point spreads or totals to potentially win both bets if the result lands in the "middle" zone.
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
              Unlike arbitrage, middling doesn't guarantee profit on every play. Instead, it creates a low-risk scenario where you can win both bets for a big payout — or win one and break even if the middle doesn't hit.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-6">
              <p className="text-[#D8AC35] dark:text-[#00ff41] font-medium text-sm mb-2">Key point:</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Every middle opportunity Sharp Shot shows is still +EV on both sides. Even if the middle doesn't hit, you're getting market value. The middle is just extra upside.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Example</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <p>Book A: Over 44.5 at <span className="font-mono">-110</span></p>
                <p>Book B: Under 47.5 at <span className="font-mono">-110</span></p>
                <p>Bet $50 on each side</p>
                <p className="text-[#D8AC35] dark:text-[#00ff41] font-medium">If game lands 45-47 points: Win both bets for $90.91 profit</p>
                <p className="text-gray-500 text-xs">Otherwise: Win one, lose one, still profit $45.45</p>
              </div>
            </div>
          </div>

          {/* Section 7: Next Steps */}
          <div className="border-l-2 border-[#D8AC35] dark:border-[#00ff41] pl-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Next Steps</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You now have the foundation to start using Sharp Shot profitably.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Your First Actions</h3>
                <ol className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>1. Open the Trading Terminal and start with the +EV tab</li>
                  <li>2. Place your first +EV bet with a clear edge</li>
                  <li>3. Create your first preset in the Preset Terminal</li>
                  <li>4. Watch for arbitrage and middling opportunities</li>
                  <li>5. Keep simple records of your bets and outcomes</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Success Tips</h3>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                  <li>• Start small and focus on learning</li>
                  <li>• Stay consistent — the power comes from repetition</li>
                  <li>• Trust the numbers, even when you lose individual bets</li>
                  <li>• Use multiple sportsbooks for more opportunities</li>
                  <li>• Check in often — lines move fast</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Sharp Shot isn't about guessing who's going to win. It's about finding and exploiting inefficiencies in the betting market.
                </p>
                <p className="text-[#D8AC35] dark:text-[#00ff41] font-semibold">
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