import { useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown, ChevronUp, Filter, TrendingUp, Target, BarChart3, Settings, Table, Calculator, Mail, X } from 'lucide-react';

// Support Modal Component
function SupportModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    topic: 'General',
    sendCopy: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send to support@sharpshotcalc.com
    console.log('Support form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ email: '', message: '', topic: 'General', sendCopy: false });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
        
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="text-primary text-lg font-medium mb-2">Got it—we'll get back to you shortly.</div>
            <div className="text-muted-foreground text-sm">Thanks for reaching out!</div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-4">Questions? Ask us like you'd talk to a person.</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Topic</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="General">General</option>
                  <option value="Billing">Billing</option>
                  <option value="Presets/Filters">Presets/Filters</option>
                  <option value="Data/Books">Data/Books</option>
                  <option value="Getting Started">Getting Started</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">What can we help with?</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Just ask in plain English—we're here to help"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground resize-none"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sendCopy"
                  checked={formData.sendCopy}
                  onChange={(e) => setFormData({ ...formData, sendCopy: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="sendCopy" className="text-sm text-muted-foreground">Send me a copy</label>
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, details }: {
  icon: any;
  title: string;
  description: string;
  details: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="border border-border/40 rounded-lg p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer bg-background/50"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start space-x-4">
        <div className="p-2 rounded-md bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {description}
          </p>
          
          {isExpanded && (
            <div className="pt-3 border-t border-border/30">
              <p className="text-sm text-foreground">{details}</p>
            </div>
          )}
          
          <div className="flex items-center text-xs text-primary mt-2">
            {isExpanded ? 'Show less' : 'Learn more'}
            {isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ Component
function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      q: "How do you calculate +EV?",
      a: "We convert odds to implied probabilities, remove the sportsbook's margin (vig), and compare the true fair odds to what's offered. When the fair probability is lower than the book's implied probability, you have positive expected value."
    },
    {
      q: "What is 'removing the vig' and why does it matter?",
      a: "The vig is the sportsbook's built-in profit margin. By removing it, we calculate the true fair odds without the book's edge, giving you accurate expected value calculations."
    },
    {
      q: "Do you support arbitrage and middling on all books?",
      a: "We support arbitrage and middling across all major sportsbooks in our system. Coverage depends on which books are offering lines for specific markets."
    },
    {
      q: "How accurate are the 'fair odds'?",
      a: "Our fair odds calculations use proven mathematical models to remove vig and account for market efficiency. While no model is perfect, our approach is consistent and transparent."
    },
    {
      q: "Can I share presets and collaborate?",
      a: "Yes! Save personal presets, fork community ones, and collaborate with others. Pro users can invite collaborators to private presets."
    },
    {
      q: "What if I'm totally new to betting analytics?",
      a: "Start with our Learn section for tutorials on the basics. Our interface is designed to be approachable while still being powerful for advanced users."
    },
    {
      q: "Do I need an account to ask questions?",
      a: "No. Email support any time—members and non-members. We're here to help whether you've signed up or not."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-border/40 rounded-lg">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/20 transition-colors"
          >
            <span className="font-medium text-foreground">{faq.q}</span>
            {openItems.includes(index) ? 
              <ChevronUp className="w-4 h-4 text-muted-foreground" /> : 
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            }
          </button>
          {openItems.includes(index) && (
            <div className="px-6 pb-4 pt-0">
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Product() {
  const [showExample, setShowExample] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Bet with the edge, not a hunch.
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Sharp Shot finds +EV, arbitrage, and middling opportunities across major sportsbooks and shows exactly how to size your bets.
                </p>
              </div>
              
              <div className="space-y-4">
                <Link 
                  href="/register"
                  className="inline-flex items-center px-6 py-3 text-base font-medium border border-primary/30 rounded-md text-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200 group relative overflow-hidden"
                >
                  <span className="relative z-10">Get Started Free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                </Link>
                <div className="text-sm text-muted-foreground">
                  7 days free for new users.
                </div>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  See how it works
                </button>
              </div>
            </div>

            {/* Right Column - Product Preview */}
            <div className="relative">
              <div className="border border-border/40 rounded-lg bg-background/80 p-6 space-y-4">
                <div className="flex space-x-1 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex space-x-2 text-xs">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded">Filters</span>
                    <span className="px-2 py-1 bg-muted/50 text-muted-foreground rounded">Results</span>
                    <span className="px-2 py-1 bg-muted/50 text-muted-foreground rounded">Sizing</span>
                  </div>
                  
                  <div className="border border-border/30 rounded p-3 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market</span>
                      <span className="text-muted-foreground">EV%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lakers ML</span>
                      <span className="text-green-500">+4.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Warriors +2.5</span>
                      <span className="text-green-500">+2.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Over 223.5</span>
                      <span className="text-green-500">+1.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Feature Cards */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={TrendingUp}
              title="+EV Bets"
              description="Remove the vig, compute true odds, and surface statistically positive opportunities."
              details="Our algorithms analyze market inefficiencies by calculating fair odds after removing sportsbook margins, highlighting bets with genuine positive expected value."
            />
            <FeatureCard
              icon={Target}
              title="Arbitrage"
              description="Exploit price discrepancies to lock in profit regardless of outcome."
              details="Find opportunities where you can bet both sides of a market across different sportsbooks and guarantee profit through price differences."
            />
            <FeatureCard
              icon={BarChart3}
              title="Middles"
              description="Capitalize on line gaps where both sides can potentially win."
              details="Identify situations where line movement creates windows where both your original bet and a hedge bet can win simultaneously."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Four simple steps to find your edge</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Filter className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Choose your filters</h3>
              <p className="text-sm text-muted-foreground">
                Select books, markets, min EV, hold thresholds, time windows.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">We remove the vig & evaluate</h3>
              <p className="text-sm text-muted-foreground">
                Convert odds → implied probability, remove margin, compute expected value.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Table className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">See the opportunities</h3>
              <p className="text-sm text-muted-foreground">
                Sorted results with market, line, fair odds, EV%, and confidence context.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Bet sizing guidance</h3>
              <p className="text-sm text-muted-foreground">
                Show recommended stake with optional Kelly fraction, unit sizing, and risk notes.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowExample(!showExample)}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              {showExample ? 'Hide example' : 'View an example'}
            </button>
          </div>

          {showExample && (
            <div className="mt-8 max-w-4xl mx-auto border border-border/40 rounded-lg p-6 bg-background/80">
              <div className="text-xs text-muted-foreground mb-3 font-mono">EXAMPLE OPPORTUNITY</div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Team/Market</div>
                  <div className="font-medium">Lakers ML</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Sportsbook</div>
                  <div>DraftKings</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Line/Odds</div>
                  <div>+110</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Fair Odds</div>
                  <div>+102</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wide mb-1">EV%</div>
                  <div className="text-green-500 font-medium">+4.2%</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Suggested Stake</div>
                  <div>$42 (2.1u)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Feature Details */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Filters & Presets */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Filters & Presets</h3>
              <p className="text-muted-foreground">
                Save presets, fork community ones, and auto-apply last used filters. Collaborate privately or share publicly.
              </p>
            </div>
            <div className="border border-border/40 rounded-lg bg-background/80 p-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">DraftKings</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">NBA</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">EV &gt; 2%</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Next 4h</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 border border-border rounded text-sm hover:bg-muted/20 transition-colors">
                    Save Preset
                  </button>
                  <span className="text-xs text-muted-foreground">👥 247 followers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="border border-border/40 rounded-lg bg-background/80 p-6">
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground uppercase tracking-wide pb-2 border-b border-border/30">
                  <span>Market ↕</span>
                  <span>Book ↕</span>
                  <span>Odds ↕</span>
                  <span>EV% ↕</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-4 gap-2 py-1">
                    <span>Lakers ML</span>
                    <span>DK</span>
                    <span>+110</span>
                    <span className="text-green-500">+4.2%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-1">
                    <span>Warriors +2.5</span>
                    <span>FD</span>
                    <span>-108</span>
                    <span className="text-green-500">+2.8%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Results Table Built for Decisions</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Fair odds & EV% after vig removal</li>
                <li>• Market depth/context tooltips</li>
                <li>• One-click copy for odds/lines</li>
                <li>• Quick links to supported books</li>
              </ul>
            </div>
          </div>

          {/* Bet Sizing */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Bet Sizing & Risk</h3>
              <p className="text-muted-foreground">
                Use optional Kelly fractions for disciplined staking, or choose conservative unit sizing.
              </p>
            </div>
            <div className="border border-border/40 rounded-lg bg-background/80 p-6">
              <div className="space-y-4">
                <div className="text-sm font-mono">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">Edge</div>
                      <div>4.2%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">Bankroll</div>
                      <div>$1,000</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border/30">
                    <div className="text-muted-foreground text-xs mb-1">Recommended Stake</div>
                    <div className="text-lg font-semibold text-primary">$42 (4.2% Kelly)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Preview */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">Start with Pro, scale to Unlimited</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="border border-border/40 rounded-lg p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Pro</h3>
                <div className="text-2xl font-bold text-primary">$59.99<span className="text-sm text-muted-foreground">/month</span></div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Auto-save last filters</li>
                <li>• Book priority sorting via Preset Editor</li>
                <li>• Public preset follower count</li>
                <li>• Creator bio on public presets</li>
                <li>• Community highlights tab</li>
                <li>• Preset "fork" functionality</li>
                <li>• Invite collaborators to private presets</li>
              </ul>
            </div>

            <div className="border border-primary/40 rounded-lg p-6 space-y-4 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 text-xs rounded-full">Most Popular</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Unlimited</h3>
                <div className="text-2xl font-bold text-primary">$99.99<span className="text-sm text-muted-foreground">/month</span></div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Everything in Pro</li>
                <li>• Unlimited preset sharing</li>
                <li>• Unlimited collaborators</li>
                <li>• Priority support</li>
                <li>• On-demand founder calls upon request</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/pricing"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              See full pricing & details
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-8 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground text-sm font-mono tracking-wide">
            Built for sharps, not edge-seekers.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know to get started</p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Questions? Ask us like you'd talk to a person.</h2>
          <p className="text-muted-foreground">
            Whether you've signed up or not, send questions and we'll help.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center px-6 py-3 border border-primary/30 rounded-md text-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200 group relative overflow-hidden"
          >
            <Mail className="w-4 h-4 mr-2" />
            <span className="relative z-10">Contact Support</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
          </Link>
        </div>
      </section>

      <SupportModal isOpen={showSupportModal} onClose={() => setShowSupportModal(false)} />
    </div>
  );
}