import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Search, Mail, Bug, Lightbulb, CheckCircle, X } from 'lucide-react';

// Types for the tabs
type TabType = 'glossary' | 'patch-notes' | 'support';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  learnMoreUrl?: string;
  letter: string;
}

interface PatchNote {
  id: string;
  version: string;
  date: string;
  summary: string;
  changes: {
    new?: string[];
    improved?: string[];
    fixed?: string[];
    deprecated?: string[];
  };
}

interface SupportItem {
  id: string;
  question: string;
  answer: string;
  relatedLinks?: { text: string; url: string }[];
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

const patchNotes: PatchNote[] = [
  {
    id: 'patch-2025-08-15',
    version: '2025.08.15',
    date: 'August 15, 2025',
    summary: 'Major UI overhaul and performance improvements',
    changes: {
      new: ['Dark mode toggle', 'Enhanced trading terminal filters', 'Real-time odds feed'],
      improved: ['Page load speeds by 40%', 'Mobile responsiveness', 'Search functionality'],
      fixed: ['Memory leak in odds updates', 'Timezone display issues', 'Login session persistence']
    }
  },
  {
    id: 'patch-2025-08-01',
    version: '2025.08.01',
    date: 'August 1, 2025',
    summary: 'Preset terminal launch and bug fixes',
    changes: {
      new: ['Preset Terminal for strategy management', 'Export functionality for bet history'],
      improved: ['Calculation accuracy for complex arbitrage scenarios'],
      fixed: ['Sportsbook logo display issues', 'Filter reset button behavior']
    }
  },
  {
    id: 'patch-2025-07-20',
    version: '2025.07.20',
    date: 'July 20, 2025',
    summary: 'Enhanced sportsbook integration',
    changes: {
      new: ['Support for 15 additional sportsbooks', 'Live betting opportunities'],
      improved: ['Data refresh rates', 'Error handling for API timeouts'],
      fixed: ['Duplicate opportunity detection', 'Calculation rounding errors']
    }
  }
];

const supportItems: SupportItem[] = [
  {
    id: 'getting-started',
    question: 'How do I get started with Sharp Shot?',
    answer: 'Sign up for an account, choose your subscription plan, and start with the Tutorials section to understand the basics of +EV betting and arbitrage.',
    relatedLinks: [
      { text: 'View Tutorials', url: '/tutorials' },
      { text: 'Pricing Plans', url: '/pricing' }
    ]
  },
  {
    id: 'sportsbook-accounts',
    question: 'Which sportsbooks do I need accounts with?',
    answer: 'We recommend having accounts with at least 3-5 major sportsbooks to maximize opportunities. The more books you have access to, the more profitable opportunities you\'ll find.',
    relatedLinks: [
      { text: 'Supported Sportsbooks', url: '/tutorials#sportsbooks' }
    ]
  },
  {
    id: 'bankroll-management',
    question: 'How much money do I need to start?',
    answer: 'You can start with as little as $100, but we recommend $500-1000 for better opportunity access and risk management.',
    relatedLinks: [
      { text: 'Bankroll Management Guide', url: '/tutorials#bankroll' }
    ]
  },
  {
    id: 'data-accuracy',
    question: 'How accurate is your odds data?',
    answer: 'Our odds are updated in real-time directly from sportsbook APIs. We use multiple data sources and validation checks to ensure accuracy.',
  },
  {
    id: 'mobile-access',
    question: 'Can I use Sharp Shot on mobile?',
    answer: 'Yes! Sharp Shot is fully responsive and works on all mobile devices. We also recommend our mobile alerts for time-sensitive opportunities.',
  },
  {
    id: 'subscription-cancel',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. You\'ll retain access until the end of your current billing period.',
    relatedLinks: [
      { text: 'Manage Account', url: '/account' }
    ]
  }
];

export default function Resources() {
  const [activeTab, setActiveTab] = useState<TabType>('glossary');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedReleases, setExpandedReleases] = useState<string[]>(['patch-2025-08-15', 'patch-2025-08-01']);
  const [patchFilters, setPatchFilters] = useState<string[]>([]);
  const [stickyTabs, setStickyTabs] = useState(false);
  const [bugReportOpen, setBugReportOpen] = useState(false);
  const [featureRequestOpen, setFeatureRequestOpen] = useState(false);
  const [bugForm, setBugForm] = useState({ name: '', email: '', description: '', steps: '' });
  const [featureForm, setFeatureForm] = useState({ name: '', email: '', useCase: '', impact: '' });
  const [activeLetter, setActiveLetter] = useState<string>('A');
  const [highlightedTerm, setHighlightedTerm] = useState<string>('');
  const tabsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['glossary', 'patch-notes', 'support'].includes(hash)) {
        setActiveTab(hash as TabType);
      } else {
        // Check for term-specific hash
        if (hash.startsWith('glossary-')) {
          setActiveTab('glossary');
          const termId = hash.replace('glossary-', '');
          setHighlightedTerm(termId);
          setTimeout(() => {
            const termElement = document.getElementById(termId);
            if (termElement) {
              termElement.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => setHighlightedTerm(''), 3000);
            }
          }, 100);
        } else if (hash.startsWith('patch-')) {
          setActiveTab('patch-notes');
        }
      }
    };

    // Set initial tab from hash or session storage
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && ['glossary', 'patch-notes', 'support'].includes(currentHash)) {
      setActiveTab(currentHash as TabType);
    } else if (currentHash.startsWith('glossary-')) {
      setActiveTab('glossary');
      const termId = currentHash.replace('glossary-', '');
      setHighlightedTerm(termId);
      setTimeout(() => {
        const termElement = document.getElementById(termId);
        if (termElement) {
          termElement.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => setHighlightedTerm(''), 3000);
        }
      }, 100);
    } else {
      const savedTab = sessionStorage.getItem('sharp-shot-resources-tab');
      if (savedTab && ['glossary', 'patch-notes', 'support'].includes(savedTab)) {
        setActiveTab(savedTab as TabType);
      }
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle sticky tabs on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        setStickyTabs(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update hash and session storage when tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.history.pushState(null, '', `#${tab}`);
    sessionStorage.setItem('sharp-shot-resources-tab', tab);
  };

  // Keyboard navigation for tabs
  const handleTabKeyDown = (e: React.KeyboardEvent, tab: TabType) => {
    const tabs: TabType[] = ['glossary', 'patch-notes', 'support'];
    const currentIndex = tabs.indexOf(activeTab);

    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      e.preventDefault();
      handleTabChange(tabs[currentIndex - 1]);
    } else if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
      e.preventDefault();
      handleTabChange(tabs[currentIndex + 1]);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabChange(tab);
    }
  };

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
    if (activeTab !== 'glossary') return;

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
  }, [activeTab, availableLetters]);

  // Filter patch notes
  const filteredPatchNotes = patchNotes.filter(note => {
    if (patchFilters.length === 0) return true;
    return patchFilters.some(filter => {
      const changeArray = note.changes[filter as keyof typeof note.changes];
      return changeArray && changeArray.length > 0;
    });
  });

  // Handle form submissions
  const handleBugSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    toast({
      title: "Bug Report Submitted",
      description: "Thank you for your report. We'll investigate and get back to you soon.",
    });
    setBugReportOpen(false);
    setBugForm({ name: '', email: '', description: '', steps: '' });
  };

  const handleFeatureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    toast({
      title: "Feature Request Submitted",
      description: "Thank you for your suggestion. We'll review it for future development.",
    });
    setFeatureRequestOpen(false);
    setFeatureForm({ name: '', email: '', useCase: '', impact: '' });
  };

  const togglePatchFilter = (filter: string) => {
    setPatchFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Resources
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Everything you need to master profitable sports betting.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div 
        ref={tabsRef}
        className={`${stickyTabs ? 'sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800' : ''} transition-all duration-200`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            role="tablist" 
            className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700"
          >
            {[
              { id: 'glossary', label: 'Glossary' },
              { id: 'patch-notes', label: 'Patch Notes' },
              { id: 'support', label: 'Support' }
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                className={`px-6 py-4 font-semibold text-lg transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-[#D8AC35] dark:focus:ring-[#00ff41] focus:ring-offset-2 ${
                  activeTab === tab.id
                    ? 'text-[#D8AC35] dark:text-[#00ff41]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-[#D8AC35] dark:hover:text-[#00ff41]'
                }`}
                onClick={() => handleTabChange(tab.id as TabType)}
                onKeyDown={(e) => handleTabKeyDown(e, tab.id as TabType)}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D8AC35] dark:bg-[#00ff41]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Glossary Tab */}
          {activeTab === 'glossary' && (
            <div 
              role="tabpanel" 
              id="glossary-panel"
              className="mt-12 animate-fadeInUp"
            >
              {/* Intro Text */}
              <div className="mb-8 text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  Your quick-reference guide to betting terms and concepts used inside Sharp Shot.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <p><strong>Search:</strong> Use the search bar below to instantly filter by term or definition.</p>
                  <p><strong>Navigation:</strong> Click any letter below to jump to that section.</p>
                  <p><strong>Updates:</strong> This glossary grows as we add new features — check back often.</p>
                </div>
              </div>

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
                  <div className="flex flex-wrap justify-center gap-1 md:gap-2 px-4">
                    {allLetters.map((letter) => {
                      const hasTerms = availableLetters.includes(letter);
                      const isActive = activeLetter === letter;
                      return (
                        <button
                          key={letter}
                          onClick={() => hasTerms && scrollToLetter(letter)}
                          disabled={!hasTerms}
                          aria-label={`Jump to section ${letter}`}
                          className={`w-8 h-8 md:w-10 md:h-10 text-sm md:text-base font-semibold rounded transition-all duration-200 ${
                            hasTerms
                              ? isActive
                                ? 'bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#D8AC35]/20 dark:hover:bg-[#00ff41]/20 hover:text-[#D8AC35] dark:hover:text-[#00ff41] cursor-pointer'
                              : 'bg-gray-50 dark:bg-gray-900 text-gray-300 dark:text-gray-600 cursor-not-allowed'
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
                        <div className="sticky top-20 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-3 mb-6 -mx-4 px-4">
                          <h3 
                            role="heading"
                            className="text-3xl md:text-4xl font-bold text-[#D8AC35] dark:text-[#00ff41] border-b-2 border-[#D8AC35] dark:border-[#00ff41] pb-2 inline-block"
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
          )}

          {/* Patch Notes Tab */}
          {activeTab === 'patch-notes' && (
            <div 
              role="tabpanel" 
              id="patch-notes-panel"
              className="mt-12 animate-fadeInUp"
            >
              {/* Filters */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filter by type:</h3>
                <div className="flex flex-wrap gap-2">
                  {['new', 'improved', 'fixed', 'deprecated'].map((filter) => (
                    <Button
                      key={filter}
                      variant={patchFilters.includes(filter) ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePatchFilter(filter)}
                      className={patchFilters.includes(filter) ? 'bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black' : ''}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Release Notes */}
              <div className="space-y-6">
                {filteredPatchNotes.slice(0, 2).map((note) => (
                  <div 
                    key={note.id}
                    id={note.id}
                    className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {note.version}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">{note.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{note.summary}</p>
                    
                    <div className="space-y-4">
                      {Object.entries(note.changes).map(([type, items]) => (
                        items && items.length > 0 && (
                          <div key={type}>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 capitalize">
                              {type === 'new' && '🆕 New'}
                              {type === 'improved' && '⚡ Improved'}
                              {type === 'fixed' && '🐛 Fixed'}
                              {type === 'deprecated' && '⚠️ Deprecated'}
                            </h4>
                            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                              {items.map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                ))}

                {/* Show older releases */}
                {filteredPatchNotes.length > 2 && (
                  <div className="space-y-6">
                    {!expandedReleases.includes('all') && (
                      <Button
                        variant="outline"
                        onClick={() => setExpandedReleases([...expandedReleases, 'all'])}
                        className="w-full"
                      >
                        Show older notes ({filteredPatchNotes.length - 2} more)
                      </Button>
                    )}
                    
                    {expandedReleases.includes('all') && filteredPatchNotes.slice(2).map((note) => (
                      <div 
                        key={note.id}
                        id={note.id}
                        className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"
                      >
                        {/* Same structure as above releases */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {note.version}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">{note.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">{note.summary}</p>
                        
                        <div className="space-y-4">
                          {Object.entries(note.changes).map(([type, items]) => (
                            items && items.length > 0 && (
                              <div key={type}>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 capitalize">
                                  {type === 'new' && '🆕 New'}
                                  {type === 'improved' && '⚡ Improved'}
                                  {type === 'fixed' && '🐛 Fixed'}
                                  {type === 'deprecated' && '⚠️ Deprecated'}
                                </h4>
                                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                                  {items.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="mr-2">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div 
              role="tabpanel" 
              id="support-panel"
              className="mt-12 animate-fadeInUp"
            >
              {/* Quick Actions */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get Help Fast</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* Contact Support */}
                  <a
                    href="mailto:support@sharpshotcalc.com"
                    className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <Mail className="h-8 w-8 text-[#D8AC35] dark:text-[#00ff41] mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Contact Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Get direct help from our team via email
                    </p>
                  </a>

                  {/* Report a Bug */}
                  <Dialog open={bugReportOpen} onOpenChange={setBugReportOpen}>
                    <DialogTrigger asChild>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <Bug className="h-8 w-8 text-[#D8AC35] dark:text-[#00ff41] mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Report a Bug
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Help us fix issues you've encountered
                        </p>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Report a Bug</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleBugSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="bug-name">Name</Label>
                          <Input
                            id="bug-name"
                            value={bugForm.name}
                            onChange={(e) => setBugForm(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="bug-email">Email</Label>
                          <Input
                            id="bug-email"
                            type="email"
                            value={bugForm.email}
                            onChange={(e) => setBugForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="bug-description">Bug Description</Label>
                          <Textarea
                            id="bug-description"
                            value={bugForm.description}
                            onChange={(e) => setBugForm(prev => ({ ...prev, description: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="bug-steps">Steps to Reproduce</Label>
                          <Textarea
                            id="bug-steps"
                            value={bugForm.steps}
                            onChange={(e) => setBugForm(prev => ({ ...prev, steps: e.target.value }))}
                            placeholder="1. Go to...\n2. Click on...\n3. See error..."
                          />
                        </div>
                        <Button type="submit" className="w-full">Submit Report</Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Request a Feature */}
                  <Dialog open={featureRequestOpen} onOpenChange={setFeatureRequestOpen}>
                    <DialogTrigger asChild>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <Lightbulb className="h-8 w-8 text-[#D8AC35] dark:text-[#00ff41] mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Request a Feature
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Suggest improvements or new features
                        </p>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request a Feature</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleFeatureSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="feature-name">Name</Label>
                          <Input
                            id="feature-name"
                            value={featureForm.name}
                            onChange={(e) => setFeatureForm(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="feature-email">Email</Label>
                          <Input
                            id="feature-email"
                            type="email"
                            value={featureForm.email}
                            onChange={(e) => setFeatureForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="feature-usecase">Use Case</Label>
                          <Textarea
                            id="feature-usecase"
                            value={featureForm.useCase}
                            onChange={(e) => setFeatureForm(prev => ({ ...prev, useCase: e.target.value }))}
                            placeholder="Describe what you want to accomplish..."
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="feature-impact">Expected Impact</Label>
                          <Textarea
                            id="feature-impact"
                            value={featureForm.impact}
                            onChange={(e) => setFeatureForm(prev => ({ ...prev, impact: e.target.value }))}
                            placeholder="How would this feature help you or other users?"
                          />
                        </div>
                        <Button type="submit" className="w-full">Submit Request</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Service Info */}
              <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Response Time</span>
                </div>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  We typically reply within 24-48 hours on business days.
                </p>
              </div>

              {/* Common Issues */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Common Issues</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {supportItems.map((item) => (
                    <AccordionItem 
                      key={item.id} 
                      value={item.id}
                      className="border-0 bg-white dark:bg-gray-900 rounded-lg"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                        <p className="mb-4">{item.answer}</p>
                        {item.relatedLinks && (
                          <div className="space-y-2">
                            <p className="font-medium text-gray-900 dark:text-white">Related:</p>
                            {item.relatedLinks.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                className="block text-[#D8AC35] dark:text-[#00ff41] hover:underline text-sm"
                              >
                                {link.text} →
                              </a>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}