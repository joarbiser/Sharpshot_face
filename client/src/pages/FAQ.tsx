import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Everything you need to know about Sharp Shot.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Accordion type="single" collapsible className="space-y-12">
            
            {/* About Sharp Shot Section */}
            <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">About Sharp Shot</h2>
            </div>
            
            <AccordionItem value="what-is-sharp-shot" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                What is Sharp Shot?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                Sharp Shot is a betting intelligence platform that identifies +EV (positive expected value), arbitrage, and middling opportunities across major sportsbooks. It helps users flip the vig and make data-driven bets with long-term edge.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="who-is-it-for" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Who is Sharp Shot built for?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                Sharp Shot is built for serious bettors who want to leverage market inefficiencies—whether you're a sharp looking to scale or a disciplined beginner seeking an edge.
              </AccordionContent>
            </AccordionItem>

            {/* Betting Concepts Section */}
            <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12 mb-16 mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">Betting Concepts</h2>
            </div>

            <AccordionItem value="what-is-ev" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                What is +EV betting?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                <p className="mb-6">+EV stands for "positive expected value." It means a bet is mathematically projected to make money over time.</p>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border-l-4 border-[#D8AC35] dark:border-[#00ff41] mt-6">
                  <p className="font-semibold mb-3 text-[#D8AC35] dark:text-[#00ff41] text-lg">Example:</p>
                  <p className="text-lg">DraftKings lists a player prop at -120, but five other books list it at -200. Sharp Shot removes the vig, calculates fair odds as around -185, and flags this as a +EV bet with expected edge.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what-is-arbitrage" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                What is arbitrage betting?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                <p className="mb-6">Arbitrage betting takes advantage of line discrepancies between sportsbooks to lock in a profit regardless of outcome.</p>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border-l-4 border-[#D8AC35] dark:border-[#00ff41] mt-6">
                  <p className="font-semibold mb-3 text-[#D8AC35] dark:text-[#00ff41] text-lg">Example:</p>
                  <p className="text-lg">FanDuel offers Over 1.5 Goals at +110, while BetMGM offers Under 1.5 Goals at +115 for the same match. Sharp Shot shows you exactly how to stake both sides so that no matter the outcome, you lock in a guaranteed profit with zero risk.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what-is-middling" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                What is middling?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                <p className="mb-6">Middling is when you bet both sides of a line at different numbers and aim for the final score to land in between — resulting in both bets cashing. Sharp Shot only surfaces middles where your worst-case outcome is break-even and your best-case is a double win.</p>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border-l-4 border-[#D8AC35] dark:border-[#00ff41] mt-6">
                  <p className="font-semibold mb-3 text-[#D8AC35] dark:text-[#00ff41] text-lg">Example:</p>
                  <div className="space-y-3">
                    <p className="mb-3 text-lg">DraftKings has Over 41.5 at +120, while FanDuel posts Under 44.5 at -120. Sharp Shot shows you how to stake both sides so that:</p>
                    <ul className="list-disc pl-6 space-y-2 text-lg">
                      <li>If the game lands between 42 and 44, both bets win and you lock in profit</li>
                      <li>If it lands outside that range, one bet wins and the other loses — but you break even due to the odds</li>
                    </ul>
                    <p className="mt-4 font-semibold text-[#D8AC35] dark:text-[#00ff41] text-lg">No matter what, you never lose money — you're either neutral or profitable.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Using the Platform Section */}
            <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12 mb-16 mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">Using the Platform</h2>
            </div>

            <AccordionItem value="supported-sportsbooks" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Which sportsbooks are supported?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                We support all major U.S. regulated books including DraftKings, FanDuel, BetMGM, Caesars, PointsBet, and others. More are added regularly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="link-accounts" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Do I need to link my sportsbook accounts?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                No. Sharp Shot is read-only. You don't connect accounts—you view edges and place bets manually on your preferred book.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="customize-strategies" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Can I customize and save strategies?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                Yes. Pro users can customize filters, save presets, and share them publicly or keep them private. Unlimited users get unlimited preset sharing, collaboration tools, and priority support.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="line-updates" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                How often are lines updated?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                Odds are refreshed in real time or within seconds depending on the source. All edge calculations are current and based on live data.
              </AccordionContent>
            </AccordionItem>

            {/* Pricing and Subscriptions Section */}
            <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12 mb-16 mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">Pricing and Subscriptions</h2>
            </div>

            <AccordionItem value="pricing" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                How much does Sharp Shot cost?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                <ul className="space-y-3">
                  <li><strong>Pro</strong> – $59.99/month</li>
                  <li><strong>Unlimited</strong> – $99.99/month</li>
                </ul>
                <p className="mt-6">Discounted annual plans are available. Visit the Pricing page for full details.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="free-trial" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Is there a free trial?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                Yes, we offer a 7-day free trial so you can explore the platform before committing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancel-subscription" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                How do I cancel my subscription?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                Subscriptions can be canceled anytime from your account dashboard. There are no cancellation fees or long-term commitments.
              </AccordionContent>
            </AccordionItem>

            {/* Affiliate Program Section */}
            <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12 mb-16 mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">Affiliate Program</h2>
            </div>

            <AccordionItem value="affiliate-earnings" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                What do I earn as an affiliate?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                All affiliates earn 51% recurring revenue on every user they refer — no time limits, no tiers, no caps. This is one of the most aggressive affiliate programs in the industry.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="earning-threshold" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Do I need to hit a threshold to earn?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                No. You earn from the first dollar your referrals spend. Payouts are issued monthly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="track-performance" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                How do I track performance?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                Each affiliate receives a personalized dashboard with live tracking of signups, conversion rates, commissions, and retention data.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="w9-submission" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                When do I need to submit a W-9?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                Once you hit $600 in cumulative commissions, we are legally required to collect a W-9. You'll be prompted at that point.
              </AccordionContent>
            </AccordionItem>

            {/* Accounting, Taxes, and Payouts Section */}
            <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12 mb-16 mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">Accounting, Taxes, and Payouts</h2>
            </div>

            <AccordionItem value="taxable-income" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Is affiliate income taxable?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                Yes. In the U.S., affiliate commissions are taxable income. Once you earn $600 or more, you'll receive a 1099 form from us at year-end.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tax-support" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Does Sharp Shot offer tax support?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                No, we do not provide tax advice. We recommend consulting a CPA if you have tax questions.
              </AccordionContent>
            </AccordionItem>

            {/* Technical and Support Section */}
            <div className="border-l-4 border-[#D8AC35] dark:border-[#00ff41] pl-12 mb-16 mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">Technical and Support</h2>
            </div>

            <AccordionItem value="no-ev-bets" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Why am I not seeing any +EV bets right now?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                At times, markets are more efficient and high-edge opportunities are rare. Try widening your filters or checking back during high-volume windows like game day mornings or injury news cycles.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mobile-friendly" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Is Sharp Shot mobile-friendly?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                Yes. Sharp Shot works on both desktop and mobile browsers. While strategy building is best on desktop, mobile is optimized for scanning and placing bets quickly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support" className="border-0 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <AccordionTrigger className="px-8 py-8 text-2xl font-bold text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors">
                Where do I get support?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-xl">
                You can reach us at <a href="mailto:support@sharpshotcalc.com" className="text-[#D8AC35] dark:text-[#00ff41] hover:underline">support@sharpshotcalc.com</a> or through our official Discord server. Response time is typically under 24 hours.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 border border-[#D8AC35]/20 dark:border-[#00ff41]/20 mb-8">
            <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#00ff41] rounded-full animate-pulse"></div>
            <span className="text-sm text-[#D8AC35] dark:text-[#00ff41] uppercase tracking-wider">Support</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Still have questions?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-10 text-xl max-w-2xl mx-auto">Our support team is here to help you get the most out of Sharp Shot.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="mailto:support@sharpshotcalc.com"
              className="bg-[#D8AC35] dark:bg-[#00ff41] text-white dark:text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#D8AC35]/90 dark:hover:bg-[#00ff41]/90 transition-all hover:scale-105"
            >
              Email Support
            </a>
            <a 
              href="#"
              className="border-2 border-[#D8AC35] dark:border-[#00ff41] text-[#D8AC35] dark:text-[#00ff41] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#D8AC35]/10 dark:hover:bg-[#00ff41]/10 transition-all hover:scale-105"
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}