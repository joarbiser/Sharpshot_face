import { Badge } from "@/components/ui/badge";

export default function Product() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl tungsten-style text-gray-900 dark:text-white mb-8">One Tool. Every Edge.</h1>
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">Sharp Shot calculates your advantage — across props, totals, and spreads — using market inefficiencies in real time.</p>
        </div>

        {/* Feature 1: +EV Calculator */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4 sharp-text">+EV Betting Calculator</h2>
            <p className="text-lg text-gray-600 mb-6 sharp-text">Instantly identifies positive expected value opportunities across every book and sport.</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500"><strong>Tooltip:</strong> "+EV (positive expected value) means long-term profitability."</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
            <div className="text-center">
              <i className="fas fa-calculator text-6xl text-green-600 mb-4"></i>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">+12.4% EV</div>
                <div className="text-sm text-gray-500">Lakers +7.5 @ DraftKings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Live Line Tracker */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-black dark:to-gray-900 p-8 rounded-xl">
              <div className="text-center">
                <i className="fas fa-chart-line text-6xl text-blue-600 mb-4"></i>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg shadow-sm flex justify-between">
                    <span className="text-sm">DraftKings</span>
                    <span className="font-bold">-110</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm flex justify-between">
                    <span className="text-sm">FanDuel</span>
                    <span className="font-bold text-red-500">-115</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm flex justify-between">
                    <span className="text-sm">BetMGM</span>
                    <span className="font-bold text-green-500">-105</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-4 sharp-text">Line Tracker with Alerts</h2>
            <p className="text-lg text-gray-600 mb-6 sharp-text">Get notified in real-time when profitable bets appear.</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500"><strong>Tooltip:</strong> "Steam refers to fast, sharp-driven market movement."</p>
            </div>
          </div>
        </div>

        {/* Feature 3: Preset Builder */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4 sharp-text">Smart Filtering & Presets</h2>
            <p className="text-lg text-gray-600 mb-4 sharp-text">Customize strategies with filters. Save as "Presets" to automate your edge.</p>
            <p className="text-sm text-gray-500 mb-6"><em>Example: "Props {'>'} Receiving Yards {'>'} Under {'>'} EV {'>'} 6%+ {'>'} Game Start Within 2 Hours"</em></p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500"><strong>Tooltip:</strong> "Presets are saved strategies or filters that run on top of the calculator."</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sport</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">NFL</Badge>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Bet Type</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">Props</Badge>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Min EV</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">6%+</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: Public Preset Feed */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm">Late Dog Overs</h4>
                    <span className="text-green-600 font-bold text-sm">+8.2% EV</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>@sharpbettor</span>
                    <button className="bg-gold text-white px-3 py-1 rounded text-xs">Fork</button>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm">1H Unders</h4>
                    <span className="text-green-600 font-bold text-sm">+6.7% EV</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>@propking</span>
                    <button className="bg-gold text-white px-3 py-1 rounded text-xs">Fork</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-4">Public Preset Feed</h2>
            <p className="text-lg text-gray-600 mb-6">Dynamic feed of top-performing Presets. Shows: Name, creator, EV%, win rate, and a 'Fork' button.</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500"><strong>Tooltip:</strong> "Forking allows you to clone a strategy into your account."</p>
            </div>
          </div>
        </div>

        {/* Feature 5: CLV Tracker */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">CLV Tracker</h2>
            <p className="text-lg text-gray-600 mb-6">Visualizes how your bets closed vs the final line.</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500"><strong>Tooltip:</strong> "CLV (Closing Line Value) is the most reliable long-term sharpness indicator."</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gold/10 to-gold/20 p-8 rounded-xl">
            <div className="text-center">
              <i className="fas fa-chart-bar text-6xl text-gold mb-4"></i>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gold">+4.2% CLV</div>
                <div className="text-sm text-gray-500">Average over 30 days</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-gold h-2 rounded-full" style={{width: "65%"}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 6: Advanced Filters */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <i className="fas fa-clock text-charcoal mb-2"></i>
                  <div className="text-xs font-medium">Start Time</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <i className="fas fa-percentage text-charcoal mb-2"></i>
                  <div className="text-xs font-medium">EV %</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <i className="fas fa-building text-charcoal mb-2"></i>
                  <div className="text-xs font-medium">Book Priority</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <i className="fas fa-weight text-charcoal mb-2"></i>
                  <div className="text-xs font-medium">Weighting</div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-4">Advanced Filters & Book Sorting</h2>
            <p className="text-lg text-gray-600 mb-6">Users can sort bets by start time, bet type, book priority, EV%, etc. Pro users can adjust book weighting for sharper custom modeling.</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
