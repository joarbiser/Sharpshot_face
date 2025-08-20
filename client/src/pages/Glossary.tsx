import { useState } from "react";
import { Search } from "lucide-react";

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");

  const glossaryTerms = [
    { 
      term: "+EV", 
      definition: "Expected Value. A bet where your expected return is positive over the long term. The foundation of profitable betting.", 
      category: "strategy" 
    },
    { 
      term: "Arbitrage", 
      definition: "Risk-free betting by placing bets on all possible outcomes at different sportsbooks to guarantee profit.", 
      category: "strategy" 
    },
    { 
      term: "American Odds", 
      definition: "Odds displayed as positive (+200) or negative (-150) numbers. Positive shows profit on $100 bet, negative shows amount needed to win $100.", 
      category: "odds" 
    },
    { 
      term: "Bankroll", 
      definition: "The total amount of money you've set aside specifically for sports betting. Never bet more than you can afford to lose.", 
      category: "management" 
    },
    { 
      term: "Closing Line Value", 
      definition: "Getting better odds than what's available when betting closes. A key indicator of long-term profitability.", 
      category: "value" 
    },
    { 
      term: "Devig", 
      definition: "Removing the sportsbook's built-in profit margin (vig) to calculate true probabilities and find value.", 
      category: "math" 
    },
    { 
      term: "Edge", 
      definition: "Your mathematical advantage over the sportsbook. Even a small edge compounds significantly over time.", 
      category: "value" 
    },
    { 
      term: "Favorite", 
      definition: "The team or outcome expected to win, indicated by negative odds (e.g., -150).", 
      category: "odds" 
    },
    { 
      term: "Handle", 
      definition: "Total amount of money wagered on a particular game or market by all bettors.", 
      category: "market" 
    },
    { 
      term: "Implied Probability", 
      definition: "The probability suggested by betting odds. Used to identify when odds don't match actual likelihood.", 
      category: "math" 
    },
    { 
      term: "Juice", 
      definition: "Another term for vig - the sportsbook's commission built into every bet.", 
      category: "math" 
    },
    { 
      term: "Kelly Criterion", 
      definition: "Mathematical formula for optimal bet sizing based on your edge and bankroll. Maximizes long-term growth.", 
      category: "management" 
    },
    { 
      term: "Line", 
      definition: "The odds or point spread offered by a sportsbook for a particular bet.", 
      category: "odds" 
    },
    { 
      term: "Line Movement", 
      definition: "Changes in odds or spreads before game time. Can indicate where sharp money is going.", 
      category: "market" 
    },
    { 
      term: "Middling", 
      definition: "Betting both sides of a game at different numbers, creating a chance to win both bets.", 
      category: "strategy" 
    },
    { 
      term: "Moneyline", 
      definition: "A straight bet on which team will win the game, regardless of the score.", 
      category: "bets" 
    },
    { 
      term: "No-Vig Odds", 
      definition: "Fair market odds with the sportsbook's commission removed. Shows true probability.", 
      category: "math" 
    },
    { 
      term: "Over/Under", 
      definition: "A bet on whether the total points scored will be over or under a set number.", 
      category: "bets" 
    },
    { 
      term: "Point Spread", 
      definition: "The margin of victory a favored team must win by to cover the bet.", 
      category: "bets" 
    },
    { 
      term: "Push", 
      definition: "When a bet results in a tie (e.g., team wins by exactly the spread). Usually results in refund.", 
      category: "outcomes" 
    },
    { 
      term: "Sharp", 
      definition: "A sophisticated, profitable bettor who uses data and math rather than emotion or hunches.", 
      category: "players" 
    },
    { 
      term: "Square", 
      definition: "A recreational bettor who typically bets based on emotion, favorites, or popular opinion.", 
      category: "players" 
    },
    { 
      term: "Steam", 
      definition: "Rapid line movement across multiple sportsbooks, usually following sharp action.", 
      category: "market" 
    },
    { 
      term: "Underdog", 
      definition: "The team or outcome expected to lose, indicated by positive odds (e.g., +200).", 
      category: "odds" 
    },
    { 
      term: "Unit", 
      definition: "A standardized bet size, typically 1-5% of your bankroll. Helps manage risk consistently.", 
      category: "management" 
    },
    { 
      term: "Value", 
      definition: "When the true probability of an outcome is higher than what the odds suggest.", 
      category: "value" 
    },
    { 
      term: "Vig", 
      definition: "The sportsbook's commission, built into every bet. Typically 4-10% of the total handle.", 
      category: "math" 
    },
    { 
      term: "Void", 
      definition: "A cancelled bet, usually due to game postponement or player injury. Stake is returned.", 
      category: "outcomes" 
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
    { key: "outcomes", label: "Outcomes", color: "teal" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
              <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Knowledge Base</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              Betting Dictionary
            </h2>
          </div>

          {/* Search and Filters Card */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
              
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

          {/* Terms Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTerms.map((item, index) => (
              <div
                key={index}
                className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.term}
                  </h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                    item.category === 'strategy' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' :
                    item.category === 'odds' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                    item.category === 'math' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' :
                    item.category === 'management' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300' :
                    item.category === 'market' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                    item.category === 'bets' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300' :
                    item.category === 'value' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' :
                    item.category === 'players' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300' :
                    'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300'
                  }`}>
                    {categories.find(c => c.key === item.category)?.label}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTerms.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-12">
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
          <div className="relative mt-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative p-8 md:p-12 rounded-2xl border border-[#D8AC35]/20">
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