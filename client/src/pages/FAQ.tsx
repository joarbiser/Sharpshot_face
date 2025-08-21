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
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  How is Sharp Shot different from other betting tools?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  We scan 40+ sportsbooks in near real time, calculate +EV/middles/arbs, and let you turn filters into reusable Presets. The UI is built like a trading terminal—fast, minimal, and action-first.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sports-coverage" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Which sports and markets does Sharp Shot cover?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Major U.S. leagues and high-liquidity markets (spreads, totals, moneylines, select props), with more sports added as data quality meets our standards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="legality" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
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
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  What is implied probability (and why does it matter)?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  It converts odds into a percent chance the book is pricing. Comparing that percent to your edge source tells you if a bet is +EV.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="vig-juice" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  What is vig/juice and how does it affect EV?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Vig is the bookmaker's margin embedded in prices; removing it gives a fair line. EV should be computed against that fair price.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="variance" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Why can +EV bets lose in the short term (variance)?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  +EV wins over many trials, not every bet. Short-term results swing; bankroll management smooths the ride.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="kelly-criterion" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  What is the Kelly Criterion for bankroll management?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Kelly sizes bets based on edge and odds to maximize long-term growth; many use fractional Kelly to reduce volatility.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Using the Platform Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Platform</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                USING THE PLATFORM
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="live-markets" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Do you support live/in-game markets?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Yes. We support live/in-game markets on supported books, prioritizing high-liquidity markets (moneyline, spread, total) with fast refresh. Some niche props may have limited coverage or slower updates depending on the data source.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="presets-sharing" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  How do Presets work for private vs public sharing?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Save any filter set as a Preset, then choose private (only you/your team) or public (share with the community). Visibility can be changed later.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="collaborators" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Can I invite collaborators to a private preset?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Yes—Pro lets you invite collaborators to private presets; Unlimited removes collaborator limits. The preset stays private to those invited.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="book-priorities" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Can I set book/market priorities so results match how I bet?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Yes—use Book Priority Sorting and the Preset Editor weighting (Pro and above) to emphasize preferred books/markets.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Pricing and Subscriptions Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Pricing</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                PRICING AND SUBSCRIPTIONS
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="pro-vs-unlimited" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  What's included in Pro vs Unlimited?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Pro includes +EV Calculator, Real-Time Line Tracker, Save & Share 2 Presets, Advanced Filters, Export to CSV, Dark Mode, and Public Preset Browsing. Unlimited includes everything in Pro plus Arbitrage Calculator, Middling Calculator, All Profitable Bets Calculator, Unlimited Shareable Presets, Fork/Clone/Collaborate, and Priority Support.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="plan-switching" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Can I switch plans or downgrade without losing my presets?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Yes. Your presets remain attached to your account; features that require a higher tier pause until you upgrade again.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pricing" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  How much does Sharp Shot cost?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  <p className="mb-2 text-xl">Pro – $59.99/month</p>
                  <p className="mb-4 text-xl">Unlimited – $99.99/month</p>
                  <p className="text-xl">Discounted annual plans are available. Visit the Pricing page for full details.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="free-trial" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Is there a free trial?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Yes, we offer a 7-day free trial so you can explore the platform before committing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cancellation" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  How do I cancel my subscription?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Subscriptions can be canceled anytime from your account dashboard. There are no cancellation fees or long-term commitments.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Affiliate Program Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Affiliate</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                AFFILIATE PROGRAM
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="affiliate-join" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  How do I join the affiliate program and get my link?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Apply via the site or contact support; once approved, you'll get a dashboard with your unique referral link and tracking.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="affiliate-payments" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  When are commissions paid, and what counts as an "active user"?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Commissions are calculated monthly and paid on paying subscribers attributed to your link. An active user is billed and in good standing for that period.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="affiliate-earnings" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  What do I earn as an affiliate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  All affiliates earn 51% recurring revenue on every user they refer — no time limits, no tiers, no caps. This is one of the most aggressive affiliate programs in the industry.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="earnings-threshold" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Do I need to hit a threshold to earn?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  No. You earn from the first dollar your referrals spend. Payouts are issued monthly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="performance-tracking" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  How do I track performance?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Each affiliate receives a personalized dashboard with live tracking of signups, conversion rates, commissions, and retention data.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Taxes Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Taxes</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                TAXES AND PAYOUTS
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="1099-nec" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Will I receive a 1099-NEC for affiliate earnings?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  If your annual affiliate payouts meet IRS thresholds and we have your W-9, we'll issue a 1099-NEC. Please consult your tax advisor for personal guidance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="taxable-income-combined" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Is affiliate income taxable?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Yes. In the U.S., affiliate commissions are taxable income. Once you earn $600 or more, you'll receive a 1099 form from us at year-end.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="w9-submission-tax" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  When do I need to submit a W-9?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  When you become an affiliate. We ask for your W-9 up front, store it securely, and handle 1099-NEC if you qualify.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tax-support-combined" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Does Sharp Shot offer tax support?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  No, we do not provide tax advice. We recommend consulting a CPA if you have tax questions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Technical and Support Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Support</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                TECHNICAL AND SUPPORT
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="browser-support" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Which browsers are officially supported?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  The latest two versions of Chrome, Edge, Safari, and Firefox. For the full terminal experience, use a modern desktop browser.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="opportunity-disappeared" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Why did an opportunity disappear from the terminal?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Lines move quickly; if a price updates or a market is pulled, the opportunity will drop. Refresh or adjust filters to find the next edge.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="report-bug" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  How do I report an odds discrepancy or a bug?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Send the sport, book, market, timestamp, and a screenshot (if possible) to support@sharpshotcalc.com or use the in-app feedback link.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="no-ev-bets" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Why am I not seeing any +EV bets right now?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  At times, markets are more efficient and high-edge opportunities are rare. Try widening your filters or checking back during high-volume windows like game day mornings or injury news cycles.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="mobile-friendly" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Is Sharp Shot mobile-friendly?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Yes. Sharp Shot works on both desktop and mobile browsers. While strategy building is best on desktop, mobile is optimized for scanning and placing bets quickly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="support" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Where do I get support?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  You can reach us at support@sharpshotcalc.com or through our official Discord server. Response time is typically under 24 hours.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Affiliate Program Section */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Affiliate</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                AFFILIATE PROGRAM
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-6">
              <AccordionItem value="affiliate-earnings" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  What do I earn as an affiliate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  All affiliates earn 51% recurring revenue on every user they refer — no time limits, no tiers, no caps. This is one of the most aggressive affiliate programs in the industry.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="earnings-threshold" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  Do I need to hit a threshold to earn?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  No. You earn from the first dollar your referrals spend. Payouts are issued monthly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="performance-tracking" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  How do I track performance?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Each affiliate receives a personalized dashboard with live tracking of signups, conversion rates, commissions, and retention data.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="w9-submission" className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline data-[state=open]:font-bold data-[state=open]:text-[#D8AC35]">
                  When do I need to submit a W-9?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4 text-xl">
                  Once you hit $600 in cumulative commissions, we are legally required to collect a W-9. You'll be prompted at that point.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Quote Section */}
          <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="text-center mb-6">
              <div className="w-4 h-4 rounded-full bg-[#D8AC35] mx-auto mb-4 animate-pulse"></div>
              <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                Clarity leads to confidence, and confidence leads to 
                <span className="text-[#D8AC35]"> smarter bets</span>.
              </blockquote>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-[0.2em]">Sharp Shot</span>
              <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}