import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  learnMoreUrl?: string;
  letter: string;
}

// Comprehensive glossary data
const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'arbitrage',
    term: 'Arbitrage Betting (Arb)',
    definition: 'A betting strategy where you place bets on all possible outcomes of an event at different sportsbooks to lock in a guaranteed profit due to discrepancies in odds. Sharp Shot\'s Arbitrage tools instantly calculate optimal stake sizes so both bets cover the spread of outcomes.',
    letter: 'A'
  },
  {
    id: 'ats',
    term: 'Against the Spread (ATS)',
    definition: 'A wager on whether a team will cover the point spread set by the sportsbook, not just whether they win or lose.',
    letter: 'A'
  },
  {
    id: 'clv',
    term: 'Average Closing Line Value (CLV)',
    definition: 'A measure of how your betting odds compare to the final odds offered before the event starts (the "closing line"). Positive CLV indicates you beat the market — a key sign of long-term profitability.',
    letter: 'A'
  },
  {
    id: 'bankroll',
    term: 'Bankroll',
    definition: 'The total pool of money you\'ve set aside strictly for betting. Sharp bankroll management means sizing bets as a percentage of this amount to protect against swings.',
    letter: 'B'
  },
  {
    id: 'bet-slip',
    term: 'Bet Slip',
    definition: 'The digital ticket on a sportsbook platform where you enter your selections, stake, and confirm the bet.',
    letter: 'B'
  },
  {
    id: 'book',
    term: 'Book / Sportsbook',
    definition: 'A company or platform that accepts and pays out wagers on sporting events. Sharp Shot compares odds across multiple books to find the best price.',
    letter: 'B'
  },
  {
    id: 'cash-out',
    term: 'Cash Out',
    definition: 'An option allowing you to settle a bet before the event finishes, locking in a smaller profit or reduced loss.',
    letter: 'C'
  },
  {
    id: 'closing-line',
    term: 'Closing Line',
    definition: 'The final odds available right before an event begins. Often considered the most accurate market prediction.',
    letter: 'C'
  },
  {
    id: 'cover',
    term: 'Cover',
    definition: 'When a team beats the point spread (favorite wins by more than the spread, or underdog loses by less than the spread or wins outright).',
    letter: 'C'
  },
  {
    id: 'decimal-odds',
    term: 'Decimal Odds',
    definition: 'A format common outside the U.S. showing the total payout (including stake) for each $1 wagered.',
    letter: 'D'
  },
  {
    id: 'draw',
    term: 'Draw',
    definition: 'A tied outcome in a match or event, common in soccer and combat sports markets.',
    letter: 'D'
  },
  {
    id: 'edge',
    term: 'Edge',
    definition: 'The percentage advantage a bettor has over the sportsbook after removing the vig. Sharp Shot calculates this to highlight value bets.',
    letter: 'E'
  },
  {
    id: 'expected-value',
    term: 'Expected Value (+EV)',
    definition: 'The projected average profit or loss from a bet if it were placed many times. A +EV bet has positive long-term profitability.',
    letter: 'E'
  },
  {
    id: 'favorite',
    term: 'Favorite',
    definition: 'The side expected to win, indicated by negative odds in American format (e.g., -150).',
    letter: 'F'
  },
  {
    id: 'futures',
    term: 'Futures Bet',
    definition: 'A long-term wager on an event\'s outcome decided later in a season, such as the winner of the Super Bowl.',
    letter: 'F'
  },
  {
    id: 'handle',
    term: 'Handle',
    definition: 'The total amount of money wagered on a game or event across all bets.',
    letter: 'H'
  },
  {
    id: 'handicap',
    term: 'Handicap (Spread Betting)',
    definition: 'A method of balancing competition between two teams by assigning a virtual advantage (+ points/goals) to the underdog or a virtual disadvantage (– points/goals) to the favorite before play starts.',
    letter: 'H'
  },
  {
    id: 'in-play',
    term: 'In-Play / Live Betting',
    definition: 'Placing bets after an event has started, with odds updating in real time as the game progresses.',
    letter: 'I'
  },
  {
    id: 'implied-probability',
    term: 'Implied Probability',
    definition: 'The probability of an outcome derived from the odds, adjusted once the vig is removed.',
    letter: 'I'
  },
  {
    id: 'juice',
    term: 'Juice (Vig)',
    definition: 'The sportsbook\'s built-in commission, included in all odds to ensure their edge over the bettor. Sharp Shot strips this out when calculating true odds.',
    letter: 'J'
  },
  {
    id: 'kelly',
    term: 'Kelly Criterion',
    definition: 'A mathematical formula used to determine optimal bet size based on your edge and odds. Often used for bankroll growth over the long term.',
    letter: 'K'
  },
  {
    id: 'line',
    term: 'Line',
    definition: 'The odds or spread a sportsbook sets for a market.',
    letter: 'L'
  },
  {
    id: 'live-odds',
    term: 'Live Odds Feed',
    definition: 'Real-time updating of odds from multiple sportsbooks, displayed in Sharp Shot\'s Trading Terminal.',
    letter: 'L'
  },
  {
    id: 'middling',
    term: 'Middling',
    definition: 'Placing bets on opposite sides of a game at different lines, aiming for a middle result that wins both bets. Sharp Shot\'s Middling feature calculates exact stake sizes for maximum profit potential.',
    letter: 'M'
  },
  {
    id: 'moneyline',
    term: 'Moneyline',
    definition: 'A bet on which team will win outright, with no point spread involved.',
    letter: 'M'
  },
  {
    id: 'odds',
    term: 'Odds',
    definition: 'The numerical representation of an event\'s probability and payout. Sharp Shot supports American, decimal, and fractional odds formats.',
    letter: 'O'
  },
  {
    id: 'over-under',
    term: 'Over/Under (Totals)',
    definition: 'A bet on whether the combined score of both teams will be over or under the posted total.',
    letter: 'O'
  },
  {
    id: 'parlay',
    term: 'Parlay',
    definition: 'A single wager combining two or more selections. All must win for the bet to pay out. Sharp Shot evaluates parlay legs individually for value before combining.',
    letter: 'P'
  },
  {
    id: 'preset',
    term: 'Preset',
    definition: 'A saved Sharp Shot filter configuration that instantly displays bets matching your criteria. Can be private, shared with collaborators, or made public.',
    letter: 'P'
  },
  {
    id: 'push',
    term: 'Push',
    definition: 'A tied result between the bettor and sportsbook, returning the stake.',
    letter: 'P'
  },
  {
    id: 'roi',
    term: 'Return on Investment (ROI)',
    definition: 'The percentage of profit relative to the amount wagered.',
    letter: 'R'
  },
  {
    id: 'round-robin',
    term: 'Round Robin',
    definition: 'Multiple parlays generated from a larger list of selections, allowing partial wins.',
    letter: 'R'
  },
  {
    id: 'sharp-bettor',
    term: 'Sharp Bettor',
    definition: 'A bettor who consistently finds value and beats the closing line.',
    letter: 'S'
  },
  {
    id: 'spread',
    term: 'Spread',
    definition: 'The number of points by which a favorite must win or an underdog must stay within to cover.',
    letter: 'S'
  },
  {
    id: 'stake',
    term: 'Stake',
    definition: 'The amount risked on a single wager.',
    letter: 'S'
  },
  {
    id: 'teaser',
    term: 'Teaser',
    definition: 'A parlay variant where you move the point spread or totals in your favor in exchange for lower odds.',
    letter: 'T'
  },
  {
    id: 'true-odds',
    term: 'True Odds',
    definition: 'The real probability of an event occurring without vig. Sharp Shot uses true odds to calculate EV.',
    letter: 'T'
  },
  {
    id: 'underdog',
    term: 'Underdog',
    definition: 'The side expected to lose, indicated by positive odds (e.g., +200).',
    letter: 'U'
  },
  {
    id: 'units',
    term: 'Units',
    definition: 'A consistent measurement of bet size as a percentage of your bankroll, used to track results accurately.',
    letter: 'U'
  },
  {
    id: 'vig',
    term: 'Vig / Juice',
    definition: 'The commission a sportsbook charges, built into the odds.',
    letter: 'V'
  },
  {
    id: 'win-rate',
    term: 'Win Rate',
    definition: 'The percentage of bets you win over a period. High win rate doesn\'t always mean profitability — EV and CLV matter more.',
    letter: 'W'
  },
  {
    id: 'wager',
    term: 'Wager',
    definition: 'A bet placed with a sportsbook.',
    letter: 'W'
  },
  {
    id: 'zig-zag',
    term: 'Zig-Zag Theory',
    definition: 'A betting angle in playoff series where you back the team that lost the previous game, expecting an adjustment.',
    letter: 'Z'
  }
];

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLetter, setActiveLetter] = useState<string>('A');
  const [highlightedTerm, setHighlightedTerm] = useState<string>('');

  // Set page title
  useEffect(() => {
    document.title = 'Glossary - Sharp Shot';
  }, []);

  // Handle hash-based navigation for direct term linking
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setHighlightedTerm(hash);
      setTimeout(() => {
        const termElement = document.getElementById(hash);
        if (termElement) {
          termElement.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => setHighlightedTerm(''), 3000);
        }
      }, 100);
    }
  }, []);

  // Filter glossary terms by search
  const filteredTerms = glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group terms by letter
  const termsByLetter = filteredTerms.reduce((acc, term) => {
    if (!acc[term.letter]) acc[term.letter] = [];
    acc[term.letter].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  // Get all letters A-Z and determine which have content
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const availableLetters = Object.keys(termsByLetter).sort();

  // Handle A-Z navigation scroll
  const scrollToLetter = (letter: string) => {
    const section = document.getElementById(`letter-${letter}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveLetter(letter);
    }
  };

  // Intersection Observer for active letter highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const letter = entry.target.getAttribute('data-letter');
            if (letter) {
              setActiveLetter(letter);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -75% 0px',
        threshold: 0
      }
    );

    availableLetters.forEach((letter) => {
      const element = document.getElementById(`letter-${letter}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [availableLetters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Glossary
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Your quick-reference guide to betting terms and concepts.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">


          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10"
                aria-label="Search glossary terms"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* A-Z Navigation */}
          {!searchTerm && (
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4">
                {allLetters.map((letter) => {
                  const hasTerms = availableLetters.includes(letter);
                  const isActive = activeLetter === letter;
                  return (
                    <button
                      key={letter}
                      onClick={() => hasTerms && scrollToLetter(letter)}
                      disabled={!hasTerms}
                      aria-label={`Jump to section ${letter}`}
                      className={`text-lg md:text-xl font-bold transition-all duration-200 border-none bg-transparent p-0 ${
                        hasTerms
                          ? isActive
                            ? 'text-[#D8AC35] dark:text-[#00ff41]'
                            : 'text-gray-600 dark:text-gray-400 hover:text-[#D8AC35] dark:hover:text-[#00ff41] cursor-pointer'
                          : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Terms */}
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No matches found. Try adjusting your search.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(termsByLetter)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([letter, terms]) => (
                  <section
                    key={letter}
                    id={`letter-${letter}`}
                    data-letter={letter}
                    className="scroll-mt-32"
                  >
                    <div className="py-3 mb-6">
                      <h3 
                        role="heading"
                        className="text-3xl md:text-4xl font-bold text-[#D8AC35] dark:text-[#00ff41]"
                      >
                        {letter}
                      </h3>
                    </div>
                    <div className="space-y-6">
                      {terms.map((term, index) => (
                        <div 
                          key={term.id} 
                          id={term.id}
                          className={`bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm transition-all duration-300 ${
                            highlightedTerm === term.id
                              ? 'bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 shadow-md'
                              : ''
                          }`}
                          style={{
                            animationDelay: `${index * 80}ms`
                          }}
                        >
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {term.term}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {term.definition}
                          </p>
                          {term.learnMoreUrl && (
                            <a 
                              href={term.learnMoreUrl}
                              className="inline-block mt-3 text-[#D8AC35] dark:text-[#00ff41] hover:underline text-sm font-medium"
                            >
                              Learn more →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                ))
              }
            </div>
          )}
        </div>
      </section>
    </div>
  );
}