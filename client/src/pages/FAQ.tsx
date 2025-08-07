import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800">
      {/* Clean Header Section */}
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6">
              <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full"></div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">Support</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about Sharp Shot's features, pricing, and platform usage
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Accordion type="single" collapsible className="space-y-8">
            
            {/* About Sharp Shot Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#D8AC35] dark:text-[#00ff41] font-mono uppercase tracking-wide mb-8">About Sharp Shot</h2>
            </div>
            
            <AccordionItem value="what-is-sharp-shot" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                What is Sharp Shot?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                Sharp Shot is a betting intelligence platform that identifies +EV (positive expected value), arbitrage, and middling opportunities across major sportsbooks. It helps users flip the vig and make data-driven bets with long-term edge.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="who-is-it-for" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Who is Sharp Shot built for?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                Sharp Shot is built for serious bettors who want to leverage market inefficiencies—whether you're a sharp looking to scale or a disciplined beginner seeking an edge.
              </AccordionContent>
            </AccordionItem>

            {/* Betting Concepts Section */}
            <div className="mb-12 mt-16">
              <h2 className="text-2xl font-bold text-[#D8AC35] dark:text-[#00ff41] font-mono uppercase tracking-wide mb-8">Betting Concepts</h2>
            </div>

            <AccordionItem value="what-is-ev" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                What is +EV betting?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                <p className="mb-4">+EV stands for "positive expected value." It means a bet is mathematically projected to make money over time.</p>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border-l-4 border-[#D8AC35] dark:border-[#00ff41] mt-4">
                  <p className="font-semibold mb-2 text-[#D8AC35] dark:text-[#00ff41]">Example:</p>
                  <p className="font-mono text-sm">DraftKings lists a player prop at -120, but five other books list it at -200. Sharp Shot removes the vig, calculates fair odds as around -185, and flags this as a +EV bet with expected edge.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what-is-arbitrage" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                What is arbitrage betting?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                <p className="mb-4">Arbitrage betting takes advantage of line discrepancies between sportsbooks to lock in a profit regardless of outcome.</p>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border-l-4 border-[#D8AC35] dark:border-[#00ff41] mt-4">
                  <p className="font-semibold mb-2 text-[#D8AC35] dark:text-[#00ff41]">Example:</p>
                  <p className="font-mono text-sm">FanDuel offers Over 1.5 Goals at +110, while BetMGM offers Under 1.5 Goals at +115 for the same match. Sharp Shot shows you exactly how to stake both sides so that no matter the outcome, you lock in a guaranteed profit with zero risk.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what-is-middling" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                What is middling?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                <p className="mb-4">Middling is when you bet both sides of a line at different numbers and aim for the final score to land in between — resulting in both bets cashing. Sharp Shot only surfaces middles where your worst-case outcome is break-even and your best-case is a double win.</p>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border-l-4 border-[#D8AC35] dark:border-[#00ff41] mt-4">
                  <p className="font-semibold mb-2 text-[#D8AC35] dark:text-[#00ff41]">Example:</p>
                  <div className="font-mono text-sm space-y-2">
                    <p className="mb-2">DraftKings has Over 41.5 at +120, while FanDuel posts Under 44.5 at -120. Sharp Shot shows you how to stake both sides so that:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>If the game lands between 42 and 44, both bets win and you lock in profit</li>
                      <li>If it lands outside that range, one bet wins and the other loses — but you break even due to the odds</li>
                    </ul>
                    <p className="mt-2 font-semibold text-[#D8AC35] dark:text-[#00ff41]">No matter what, you never lose money — you're either neutral or profitable.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Using the Platform Section */}
            <div className="mb-12 mt-16">
              <h2 className="text-2xl font-bold text-[#D8AC35] dark:text-[#00ff41] font-mono uppercase tracking-wide mb-8">Using the Platform</h2>
            </div>

            <AccordionItem value="supported-sportsbooks" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Which sportsbooks are supported?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                We support all major U.S. regulated books including DraftKings, FanDuel, BetMGM, Caesars, PointsBet, and others. More are added regularly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="link-accounts" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Do I need to link my sportsbook accounts?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                No. Sharp Shot is read-only. You don't connect accounts—you view edges and place bets manually on your preferred book.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="customize-strategies" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Can I customize and save strategies?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                Yes. Pro users can customize filters, save presets, and share them publicly or keep them private. Unlimited users get unlimited preset sharing, collaboration tools, and priority support.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="line-updates" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                How often are lines updated?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                Odds are refreshed in real time or within seconds depending on the source. All edge calculations are current and based on live data.
              </AccordionContent>
            </AccordionItem>

            {/* Pricing and Subscriptions Section */}
            <div className="mb-12 mt-16">
              <h2 className="text-2xl font-bold text-[#D8AC35] dark:text-[#00ff41] font-mono uppercase tracking-wide mb-8">Pricing and Subscriptions</h2>
            </div>

            <AccordionItem value="pricing" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                How much does Sharp Shot cost?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                <ul className="space-y-2">
                  <li><strong>Pro</strong> – $59.99/month</li>
                  <li><strong>Unlimited</strong> – $99.99/month</li>
                </ul>
                <p className="mt-4">Discounted annual plans are available. Visit the Pricing page for full details.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="free-trial" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Is there a free trial?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                Yes, we offer a 7-day free trial so you can explore the platform before committing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancel-subscription" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                How do I cancel my subscription?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                Subscriptions can be canceled anytime from your account dashboard. There are no cancellation fees or long-term commitments.
              </AccordionContent>
            </AccordionItem>

            {/* Affiliate Program Section */}
            <div className="mb-12 mt-16">
              <h2 className="text-2xl font-bold text-[#D8AC35] dark:text-[#00ff41] font-mono uppercase tracking-wide mb-8">Affiliate Program</h2>
            </div>

            <AccordionItem value="affiliate-earnings" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                What do I earn as an affiliate?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                All affiliates earn 51% recurring revenue on every user they refer — no time limits, no tiers, no caps. This is one of the most aggressive affiliate programs in the industry.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="earning-threshold" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Do I need to hit a threshold to earn?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                No. You earn from the first dollar your referrals spend. Payouts are issued monthly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="track-performance" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                How do I track performance?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                Each affiliate receives a personalized dashboard with live tracking of signups, conversion rates, commissions, and retention data.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="w9-submission" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                When do I need to submit a W-9?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                Once you hit $600 in cumulative commissions, we are legally required to collect a W-9. You'll be prompted at that point.
              </AccordionContent>
            </AccordionItem>

            {/* Accounting, Taxes, and Payouts Section */}
            <div className="mb-12 mt-16">
              <h2 className="text-2xl font-bold text-[#D8AC35] dark:text-[#00ff41] font-mono uppercase tracking-wide mb-8">Accounting, Taxes, and Payouts</h2>
            </div>

            <AccordionItem value="taxable-income" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Is affiliate income taxable?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                Yes. In the U.S., affiliate commissions are taxable income. Once you earn $600 or more, you'll receive a 1099 form from us at year-end.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tax-support" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Does Sharp Shot offer tax support?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                No, we do not provide tax advice. We recommend consulting a CPA if you have tax questions.
              </AccordionContent>
            </AccordionItem>

            {/* Technical and Support Section */}
            <div className="mb-12 mt-16">
              <h2 className="text-2xl font-bold text-[#D8AC35] dark:text-[#00ff41] font-mono uppercase tracking-wide mb-8">Technical and Support</h2>
            </div>

            <AccordionItem value="no-ev-bets" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Why am I not seeing any +EV bets right now?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                At times, markets are more efficient and high-edge opportunities are rare. Try widening your filters or checking back during high-volume windows like game day mornings or injury news cycles.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mobile-friendly" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Is Sharp Shot mobile-friendly?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                Yes. Sharp Shot works on both desktop and mobile browsers. While strategy building is best on desktop, mobile is optimized for scanning and placing bets quickly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support" className="border-0 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <AccordionTrigger className="px-8 py-6 font-mono text-xl font-bold text-black dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Where do I get support?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 dark:text-gray-300 font-mono leading-relaxed text-lg">
                You can reach us at <a href="mailto:support@sharpshotcalc.com" className="text-[#D8AC35] dark:text-[#00ff41] hover:underline">support@sharpshotcalc.com</a> or through our official Discord server. Response time is typically under 24 hours.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-black dark:to-gray-900 rounded-2xl border border-gray-300 dark:border-gray-700/50 shadow-2xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:40px_40px]" />
            <div className="relative px-8 py-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 border border-[#D8AC35]/20 dark:border-[#00ff41]/20 mb-6">
                <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-[#D8AC35] dark:text-[#00ff41] uppercase tracking-wider">Support</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-mono">Still have questions?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 font-mono">Our support team is here to help you get the most out of Sharp Shot.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:support@sharpshotcalc.com"
                  className="bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black px-6 py-3 rounded-lg font-mono font-semibold hover:bg-[#D8AC35]/90 dark:hover:bg-[#00ff41]/90 transition-colors"
                >
                  Email Support
                </a>
                <a 
                  href="#"
                  className="bg-transparent border-2 border-[#D8AC35] dark:border-[#00ff41] text-[#D8AC35] dark:text-[#00ff41] px-6 py-3 rounded-lg font-mono font-semibold hover:bg-[#D8AC35] dark:hover:bg-[#00ff41] hover:text-white dark:hover:text-black transition-colors"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}