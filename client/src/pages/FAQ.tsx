import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
            FAQ.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Here you'll find everything you need to know about Sharp Shot. We've answered the most common questions to help you get started.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-20">

          {/* About Sharp Shot Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Foundation</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                ABOUT SHARP SHOT
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="what-is-different" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  How is Sharp Shot different from other betting tools?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  We scan 40+ sportsbooks in near real time, calculate +EV/middles/arbs, and let you turn filters into reusable Presets. The UI is built like a trading terminal—fast, minimal, and action-first.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sports-coverage" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  Which sports and markets does Sharp Shot cover?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Major U.S. leagues and high-liquidity markets (spreads, totals, moneylines, select props), with more sports added as data quality meets our standards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="legality" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  Is Sharp Shot legal to use in my state?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Sharp Shot is an analytics tool, not a sportsbook, and is generally legal to use. You're responsible for local laws and age restrictions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Betting Concepts Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Concepts</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                BETTING CONCEPTS
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="implied-probability" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  What is implied probability (and why does it matter)?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  It converts odds into a percent chance the book is pricing. Comparing that percent to your edge source tells you if a bet is +EV.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="vig-juice" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  What is vig/juice and how does it affect EV?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Vig is the bookmaker's margin embedded in prices; removing it gives a fair line. EV should be computed against that fair price.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="variance" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  Why can +EV bets lose in the short term (variance)?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  +EV wins over many trials, not every bet. Short-term results swing; bankroll management smooths the ride.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="kelly-criterion" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  What is the Kelly Criterion for bankroll management?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Kelly sizes bets based on edge and odds to maximize long-term growth; many use fractional Kelly to reduce volatility.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Sharp Shot Features Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Features</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                SHARP SHOT FEATURES
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="how-fast" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  How fast is Sharp Shot's data? Is it real-time?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Data refreshes every 30 seconds across 40+ sportsbooks. While not millisecond-level like a stock exchange, it's fast enough for actionable betting decisions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-accuracy" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  How accurate is Sharp Shot's data?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  We use direct API feeds and comprehensive validation. Our zero-tolerance system flags stale data and maintains guardrails for data integrity.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="preset-terminal" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  What's the difference between Trading Terminal and Preset Terminal?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Trading Terminal shows all opportunities with basic filters. Preset Terminal lets you save advanced filter combinations as reusable "presets" for specific strategies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="mobile-access" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  Can I use Sharp Shot on mobile?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Yes, Sharp Shot is fully responsive and optimized for mobile devices. Access your terminals and presets from anywhere.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Account & Billing Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Billing</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                ACCOUNT & BILLING
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="trial-period" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  Do you offer a free trial?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Yes, new users get 7 days of full access to test all features before choosing a subscription plan.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="plan-differences" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  What's the difference between Pro and Unlimited plans?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Pro ($59.99/month) covers most users with full terminal access and preset features. Unlimited ($149.99/month) adds priority data, advanced analytics, and premium support.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cancel-anytime" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  Can I cancel my subscription anytime?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Yes, cancel anytime from your account settings. Your access continues until the end of your current billing cycle.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="payment-methods" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Credit cards, debit cards, and select cryptocurrencies. All payments are processed securely through Stripe.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Support Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Support</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                SUPPORT & HELP
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="contact-support" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  How do I contact support?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Email support@sharpshotcalc.com or use the contact form in the Support section. Unlimited plan users get priority support response.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="learning-resources" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  Where can I learn more about betting strategies?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Check out our Tutorials section for comprehensive guides on +EV betting, arbitrage, bankroll management, and using Sharp Shot effectively.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="api-access" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35] dark:data-[state=open]:text-[#D8AC35]">
                  Do you offer API access?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  API access is available for enterprise users. Contact support@sharpshotcalc.com to discuss custom integrations and pricing.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>
    </div>
  );
}