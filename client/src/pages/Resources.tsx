import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Search, Mail, Bug, Lightbulb, CheckCircle } from 'lucide-react';

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

// Mock data - In production, this would come from an API
const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'arbitrage',
    term: 'Arbitrage',
    definition: 'A betting strategy that guarantees profit by placing bets on all possible outcomes across different sportsbooks with favorable odds.',
    learnMoreUrl: '/tutorials#arbitrage',
    letter: 'A'
  },
  {
    id: 'ev',
    term: 'Expected Value (+EV)',
    definition: 'The theoretical return on a bet over time. Positive EV indicates a profitable bet in the long run.',
    learnMoreUrl: '/tutorials#expected-value',
    letter: 'E'
  },
  {
    id: 'clv',
    term: 'Closing Line Value (CLV)',
    definition: 'The difference between the odds when you placed your bet and the closing odds. Positive CLV indicates sharp betting.',
    learnMoreUrl: '/tutorials#clv',
    letter: 'C'
  },
  {
    id: 'kelly',
    term: 'Kelly Criterion',
    definition: 'A mathematical formula for determining optimal bet size based on edge and bankroll.',
    learnMoreUrl: '/tutorials#kelly-criterion',
    letter: 'K'
  },
  {
    id: 'middling',
    term: 'Middling',
    definition: 'A betting strategy where you bet both sides of a line at different numbers, hoping the result falls between them.',
    learnMoreUrl: '/tutorials#middling',
    letter: 'M'
  },
  {
    id: 'steam',
    term: 'Steam Move',
    definition: 'Rapid line movement across multiple sportsbooks, typically indicating sharp money.',
    letter: 'S'
  },
  {
    id: 'vig',
    term: 'Vig (Vigorish)',
    definition: 'The commission charged by sportsbooks, built into the odds. Also known as juice.',
    learnMoreUrl: '/tutorials#understanding-vig',
    letter: 'V'
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
  const tabsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabType;
      if (['glossary', 'patch-notes', 'support'].includes(hash)) {
        setActiveTab(hash);
      } else {
        // Check for term-specific hash
        if (hash.startsWith('glossary-')) {
          setActiveTab('glossary');
        } else if (hash.startsWith('patch-')) {
          setActiveTab('patch-notes');
        }
      }
    };

    // Set initial tab from hash or session storage
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && ['glossary', 'patch-notes', 'support'].includes(currentHash)) {
      setActiveTab(currentHash as TabType);
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
              {/* Search */}
              <div className="mb-8">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search terms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Terms */}
              {filteredTerms.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No terms found matching "{searchTerm}"</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {Object.entries(termsByLetter)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([letter, terms]) => (
                      <div key={letter} className="space-y-4">
                        <h3 className="text-2xl font-bold text-[#D8AC35] dark:text-[#00ff41] border-b border-gray-200 dark:border-gray-700 pb-2">
                          {letter}
                        </h3>
                        {terms.map((term) => (
                          <div 
                            key={term.id} 
                            id={`glossary-${term.id}`}
                            className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"
                          >
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {term.term}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                              {term.definition}
                            </p>
                            {term.learnMoreUrl && (
                              <a 
                                href={term.learnMoreUrl}
                                className="text-[#D8AC35] dark:text-[#00ff41] hover:underline text-sm font-medium"
                              >
                                Learn more →
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
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