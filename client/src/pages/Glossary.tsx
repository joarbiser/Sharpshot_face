import { useState } from "react";
import { Search } from "lucide-react";

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");

  // Complete glossary terms from original content, alphabetically organized
  const glossaryTerms = [
    { 
      term: "Against the Spread (ATS)", 
      definition: "A wager on whether a team will cover the point spread set by the sportsbook, not just whether they win or lose.", 
      category: "bets",
      letter: "A"
    },
    { 
      term: "Arbitrage Betting (Arb)", 
      definition: "A betting strategy where you place bets on all possible outcomes of an event at different sportsbooks to lock in a guaranteed profit due to discrepancies in odds. Sharp Shot's Arbitrage tools instantly calculate optimal stake sizes so both bets cover the spread of outcomes.", 
      category: "strategy",
      letter: "A"
    },
    { 
      term: "Average Closing Line Value (CLV)", 
      definition: "A measure of how your betting odds compare to the final odds offered before the event starts (the \"closing line\"). Positive CLV indicates you beat the market — a key sign of long-term profitability.", 
      category: "value",
      letter: "A"
    },
    { 
      term: "Bankroll", 
      definition: "The total pool of money you've set aside strictly for betting. Sharp bankroll management means sizing bets as a percentage of this amount to protect against swings.", 
      category: "management",
      letter: "B"
    },
    { 
      term: "Bet Slip", 
      definition: "The digital ticket on a sportsbook platform where you enter your selections, stake, and confirm the bet.", 
      category: "platform",
      letter: "B"
    },
    { 
      term: "Book / Sportsbook", 
      definition: "A company or platform that accepts and pays out wagers on sporting events. Sharp Shot compares odds across multiple books to find the best price.", 
      category: "platform",
      letter: "B"
    },
    { 
      term: "Cash Out", 
      definition: "An option allowing you to settle a bet before the event finishes, locking in a smaller profit or reduced loss.", 
      category: "outcomes",
      letter: "C"
    },
    { 
      term: "Closing Line", 
      definition: "The final odds available right before an event begins. Often considered the most accurate market prediction.", 
      category: "market",
      letter: "C"
    },
    { 
      term: "Cover", 
      definition: "When a team beats the point spread (favorite wins by more than the spread, or underdog loses by less than the spread or wins outright).", 
      category: "outcomes",
      letter: "C"
    },
    { 
      term: "Decimal Odds", 
      definition: "A format common outside the U.S. showing the total payout (including stake) for each $1 wagered.", 
      category: "odds",
      letter: "D"
    },
    { 
      term: "Draw", 
      definition: "A tied outcome in a match or event, common in soccer and combat sports markets.", 
      category: "outcomes",
      letter: "D"
    },
    { 
      term: "Edge", 
      definition: "The percentage advantage a bettor has over the sportsbook after removing the vig. Sharp Shot calculates this to highlight value bets.", 
      category: "value",
      letter: "E"
    },
    { 
      term: "Expected Value (+EV)", 
      definition: "The projected average profit or loss from a bet if it were placed many times. A +EV bet has positive long-term profitability.", 
      category: "strategy",
      letter: "E"
    },
    { 
      term: "Favorite", 
      definition: "The side expected to win, indicated by negative odds in American format (e.g., -150).", 
      category: "odds",
      letter: "F"
    },
    { 
      term: "Futures Bet", 
      definition: "A long-term wager on an event's outcome decided later in a season, such as the winner of the Super Bowl.", 
      category: "bets",
      letter: "F"
    },
    { 
      term: "Handle", 
      definition: "The total amount of money wagered on a game or event across all bets.", 
      category: "market",
      letter: "H"
    },
    { 
      term: "Handicap (Spread Betting)", 
      definition: "A method of balancing competition between two teams by assigning a virtual advantage (+ points/goals) to the underdog or a virtual disadvantage (– points/goals) to the favorite before play starts. Favorite with – handicap: Must win by more than the handicap number. Underdog with + handicap: Can lose by less than the handicap number or win outright for the bet to cash. Sharp Shot flags handicap markets where the odds present +EV after vig removal.", 
      category: "bets",
      letter: "H"
    },
    { 
      term: "Implied Probability", 
      definition: "The probability of an outcome derived from the odds, adjusted once the vig is removed.", 
      category: "math",
      letter: "I"
    },
    { 
      term: "In-Play / Live Betting", 
      definition: "Placing bets after an event has started, with odds updating in real time as the game progresses.", 
      category: "bets",
      letter: "I"
    },
    { 
      term: "Juice (Vig)", 
      definition: "The sportsbook's built-in commission, included in all odds to ensure their edge over the bettor. Sharp Shot strips this out when calculating true odds.", 
      category: "math",
      letter: "J"
    },
    { 
      term: "Kelly Criterion", 
      definition: "A mathematical formula used to determine optimal bet size based on your edge and odds. Often used for bankroll growth over the long term.", 
      category: "management",
      letter: "K"
    },
    { 
      term: "Line", 
      definition: "The odds or spread a sportsbook sets for a market.", 
      category: "odds",
      letter: "L"
    },
    { 
      term: "Live Odds Feed", 
      definition: "Real-time updating of odds from multiple sportsbooks, displayed in Sharp Shot's Trading Terminal.", 
      category: "platform",
      letter: "L"
    },
    { 
      term: "Middling", 
      definition: "Placing bets on opposite sides of a game at different lines, aiming for a middle result that wins both bets. Sharp Shot's Middling feature calculates exact stake sizes for maximum profit potential.", 
      category: "strategy",
      letter: "M"
    },
    { 
      term: "Moneyline", 
      definition: "A bet on which team will win outright, with no point spread involved.", 
      category: "bets",
      letter: "M"
    },
    { 
      term: "Odds", 
      definition: "The numerical representation of an event's probability and payout. Sharp Shot supports American, decimal, and fractional odds formats.", 
      category: "odds",
      letter: "O"
    },
    { 
      term: "Over/Under (Totals)", 
      definition: "A bet on whether the combined score of both teams will be over or under the posted total.", 
      category: "bets",
      letter: "O"
    },
    { 
      term: "Parlay", 
      definition: "A single wager combining two or more selections. All must win for the bet to pay out. Sharp Shot evaluates parlay legs individually for value before combining.", 
      category: "bets",
      letter: "P"
    },
    { 
      term: "Preset", 
      definition: "A saved Sharp Shot filter configuration that instantly displays bets matching your criteria. Can be private, shared with collaborators, or made public.", 
      category: "platform",
      letter: "P"
    },
    { 
      term: "Push", 
      definition: "A tied result between the bettor and sportsbook, returning the stake.", 
      category: "outcomes",
      letter: "P"
    },
    { 
      term: "Return on Investment (ROI)", 
      definition: "The percentage of profit relative to the amount wagered.", 
      category: "management",
      letter: "R"
    },
    { 
      term: "Round Robin", 
      definition: "Multiple parlays generated from a larger list of selections, allowing partial wins.", 
      category: "bets",
      letter: "R"
    },
    { 
      term: "Sharp Bettor", 
      definition: "A bettor who consistently finds value and beats the closing line.", 
      category: "players",
      letter: "S"
    },
    { 
      term: "Spread", 
      definition: "The number of points by which a favorite must win or an underdog must stay within to cover.", 
      category: "bets",
      letter: "S"
    },
    { 
      term: "Stake", 
      definition: "The amount risked on a single wager.", 
      category: "management",
      letter: "S"
    },
    { 
      term: "Teaser", 
      definition: "A parlay variant where you move the point spread or totals in your favor in exchange for lower odds.", 
      category: "bets",
      letter: "T"
    },
    { 
      term: "True Odds", 
      definition: "The real probability of an event occurring without vig. Sharp Shot uses true odds to calculate EV.", 
      category: "math",
      letter: "T"
    },
    { 
      term: "Underdog", 
      definition: "The side expected to lose, indicated by positive odds (e.g., +200).", 
      category: "odds",
      letter: "U"
    },
    { 
      term: "Units", 
      definition: "A consistent measurement of bet size as a percentage of your bankroll, used to track results accurately.", 
      category: "management",
      letter: "U"
    },
    { 
      term: "Vig / Juice", 
      definition: "The commission a sportsbook charges, built into the odds.", 
      category: "math",
      letter: "V"
    },
    { 
      term: "Wager", 
      definition: "A bet placed with a sportsbook.", 
      category: "platform",
      letter: "W"
    },
    { 
      term: "Win Rate", 
      definition: "The percentage of bets you win over a period. High win rate doesn't always mean profitability — EV and CLV matter more.", 
      category: "management",
      letter: "W"
    },
    { 
      term: "Zig-Zag Theory", 
      definition: "A betting angle in playoff series where you back the team that lost the previous game, expecting an adjustment.", 
      category: "strategy",
      letter: "Z"
    }
  ];

  const categories = [
    { key: "all", label: "All Terms", color: "gray" },
    { key: "strategy", label: "Strategy", color: "blue" },
    { key: "odds", label: "Odds", color: "green" },
    { key: "math", label: "Math", color: "purple" },
    { key: "management", label: "Management", color: "orange" },
    { key: "market", label: "Market", color: "red" },
    { key: "bets", label: "Bet Types", color: "yellow" },
    { key: "value", label: "Value", color: "indigo" },
    { key: "players", label: "Player Types", color: "pink" },
    { key: "outcomes", label: "Outcomes", color: "teal" },
    { key: "platform", label: "Platform", color: "cyan" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group terms by letter for alphabetical display
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const letter = term.letter;
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, typeof filteredTerms>);

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
            GLOSSARY.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Your quick reference guide to betting terms and concepts used inside Sharp Shot.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* How to Use Section */}
          <div className="mb-20">
            <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                  <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">How to Use</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                  Navigate This Page
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100/50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200/50 dark:border-blue-800/50">
                    <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Search</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Use the search bar below to instantly filter by term or definition.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100/50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200/50 dark:border-green-800/50">
                    <span className="text-green-600 dark:text-green-400 font-bold text-lg">A-Z</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Browse</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Terms are organized alphabetically for easy browsing.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100/50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-200/50 dark:border-purple-800/50">
                    <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">📈</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Updates</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">This glossary grows as we add new features — check back often.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters Card */}
          <div className="mb-20">
            <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
              
              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search terms or definitions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#D8AC35] focus:border-transparent text-lg"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.key
                        ? 'bg-[#D8AC35] text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Terms by Letter */}
          {sortedLetters.map((letter) => (
            <div key={letter} className="mb-16">
              {/* Letter Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#D8AC35]/10 dark:bg-[#D8AC35]/20 rounded-full flex items-center justify-center border border-[#D8AC35]/20 dark:border-[#D8AC35]/30">
                    <span className="text-[#D8AC35] font-bold text-2xl">{letter}</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#D8AC35]/30 to-transparent"></div>
                </div>
              </div>

              {/* Terms Grid for this letter */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedTerms[letter].map((item, index) => (
                  <div
                    key={index}
                    className="group bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                        {item.term}
                      </h3>
                      <div className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide flex-shrink-0 ml-4 ${
                        item.category === 'strategy' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' :
                        item.category === 'odds' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                        item.category === 'math' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' :
                        item.category === 'management' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300' :
                        item.category === 'market' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                        item.category === 'bets' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300' :
                        item.category === 'value' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' :
                        item.category === 'players' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300' :
                        item.category === 'platform' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300' :
                        'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300'
                      }`}>
                        {categories.find(c => c.key === item.category)?.label}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-1 text-base">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* No Results */}
          {filteredTerms.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Terms Found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your search or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-3 bg-[#D8AC35] text-white rounded-xl hover:bg-[#B8941F] transition-colors"
                >
                  Show All Terms
                </button>
              </div>
            </div>
          )}

          {/* Philosophy Statement */}
          <div className="mt-20">
            <div className="p-8 md:p-12 rounded-2xl border border-[#D8AC35]/20">
              <div className="text-center mb-6">
                <div className="w-4 h-4 rounded-full bg-[#D8AC35] mx-auto mb-4 animate-pulse"></div>
                <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  "Understanding the language is the first step to 
                  <span className="text-[#D8AC35]"> mastering the game</span>."
                </blockquote>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D8AC35]"></div>
                <span className="text-xs text-[#D8AC35] font-semibold uppercase tracking-[0.2em]">Sharp Shot Philosophy</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D8AC35]"></div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}