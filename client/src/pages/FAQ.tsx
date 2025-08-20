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
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Everything you need to know about Sharp Shot.
          </p>
        </div>

        {/* Main Content */}
        <div>
          <Accordion type="single" collapsible className="space-y-12">
            
            {/* About Sharp Shot Section */}
            <div className="mb-16">
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 transition-all duration-300">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-center" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>About Sharp Shot</h2>
                
                <div className="space-y-4">
                  <AccordionItem value="what-is-sharp-shot" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      What is Sharp Shot?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      Sharp Shot is a betting intelligence platform that identifies +EV (positive expected value), arbitrage, and middling opportunities across major sportsbooks. It helps users flip the vig and make data-driven bets with long-term edge.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="who-is-it-for" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      Who is Sharp Shot built for?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      Sharp Shot is built for serious bettors who want to leverage market inefficiencies—whether you're a sharp looking to scale or a disciplined beginner seeking an edge.
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </div>
            </div>

            {/* Betting Concepts Section */}
            <div className="mb-16">
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 transition-all duration-300">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-center" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>Betting Concepts</h2>
                
                <div className="space-y-4">
                  <AccordionItem value="what-is-ev" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      What is +EV betting?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      <p className="mb-4">+EV stands for "positive expected value." It means a bet is mathematically projected to make money over time.</p>
                      <p className="mb-2 font-semibold text-gray-900 dark:text-white">Example:</p>
                      <p>DraftKings lists a player prop at -120, but five other books list it at -200. Sharp Shot removes the vig, calculates fair odds as around -185, and flags this as a +EV bet with expected edge.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="what-is-arbitrage" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      What is arbitrage betting?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      <p className="mb-4">Arbitrage betting takes advantage of line discrepancies between sportsbooks to lock in a profit regardless of outcome.</p>
                      <p className="mb-2 font-semibold text-gray-900 dark:text-white">Example:</p>
                      <p>FanDuel offers Over 1.5 Goals at +110, while BetMGM offers Under 1.5 Goals at +115 for the same match. Sharp Shot shows you exactly how to stake both sides so that no matter the outcome, you lock in a guaranteed profit with zero risk.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="what-is-middling" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      What is middling?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      <p className="mb-4">Middling is when you bet both sides of a line at different numbers and aim for the final score to land in between — resulting in both bets cashing. Sharp Shot only surfaces middles where your worst-case outcome is break-even and your best-case is a double win.</p>
                      <p className="mb-2 font-semibold text-gray-900 dark:text-white">Example:</p>
                      <p className="mb-2">DraftKings has Over 41.5 at +120, while FanDuel posts Under 44.5 at -120. Sharp Shot shows you how to stake both sides so that:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• If the game lands between 42 and 44, both bets win and you lock in profit</li>
                        <li>• If it lands outside that range, one bet wins and the other loses — but you break even due to the odds</li>
                        <li>• No matter what, you never lose money — you're either neutral or profitable.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </div>
            </div>

            {/* Using the Platform Section */}
            <div className="mb-16">
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Using the Platform</h2>
                
                <div className="space-y-4">
                  <AccordionItem value="which-sportsbooks" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      Which sportsbooks are supported?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      We support all major U.S. regulated books including DraftKings, FanDuel, BetMGM, Caesars, PointsBet, and others. More are added regularly.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="link-accounts" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      Do I need to link my sportsbook accounts?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      No. Sharp Shot is read-only. You don't connect accounts—you view edges and place bets manually on your preferred book.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="customize-strategies" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      Can I customize and save strategies?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      Yes. Pro users can customize filters, save presets, and share them publicly or keep them private. Unlimited users get unlimited preset sharing, collaboration tools, and priority support.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="line-updates" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      How often are lines updated?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      Odds are refreshed in real time or within seconds depending on the source. All edge calculations are current and based on live data.
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </div>
            </div>

            {/* Pricing and Subscriptions Section */}
            <div className="mb-16">
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 transition-all duration-300">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-center" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>Pricing and Subscriptions</h2>
                
                <div className="space-y-4">
                  <AccordionItem value="pricing" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      How much does Sharp Shot cost?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      <p className="mb-2">Pro – $59.99/month</p>
                      <p className="mb-4">Unlimited – $99.99/month</p>
                      <p>Discounted annual plans are available. Visit the Pricing page for full details.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="free-trial" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      Is there a free trial?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      Yes, we offer a 7-day free trial so you can explore the platform before committing.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cancellation" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      How do I cancel my subscription?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      Subscriptions can be canceled anytime from your account dashboard. There are no cancellation fees or long-term commitments.
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </div>
            </div>

            {/* Affiliate Program Section */}
            <div className="mb-16">
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 transition-all duration-300">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-center" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>Affiliate Program</h2>
                
                <div className="space-y-4">
                  <AccordionItem value="affiliate-earnings" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      What do I earn as an affiliate?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      All affiliates earn 51% recurring revenue on every user they refer — no time limits, no tiers, no caps. This is one of the most aggressive affiliate programs in the industry.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="earnings-threshold" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      Do I need to hit a threshold to earn?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      No. You earn from the first dollar your referrals spend. Payouts are issued monthly.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="performance-tracking" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      How do I track performance?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      Each affiliate receives a personalized dashboard with live tracking of signups, conversion rates, commissions, and retention data.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="w9-submission" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      When do I need to submit a W-9?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      Once you hit $600 in cumulative commissions, we are legally required to collect a W-9. You'll be prompted at that point.
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </div>
            </div>

            {/* Accounting, Taxes, and Payouts Section */}
            <div className="mb-16">
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 transition-all duration-300">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-center" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>Accounting, Taxes, and Payouts</h2>
                
                <div className="space-y-4">
                  <AccordionItem value="taxable-income" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      Is affiliate income taxable?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      Yes. In the U.S., affiliate commissions are taxable income. Once you earn $600 or more, you'll receive a 1099 form from us at year-end.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tax-support" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      Does Sharp Shot offer tax support?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      No, we do not provide tax advice. We recommend consulting a CPA if you have tax questions.
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </div>
            </div>

            {/* Technical and Support Section */}
            <div className="mb-16">
              <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Technical and Support</h2>
                
                <div className="space-y-4">
                  <AccordionItem value="no-ev-bets" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      Why am I not seeing any +EV bets right now?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      At times, markets are more efficient and high-edge opportunities are rare. Try widening your filters or checking back during high-volume windows like game day mornings or injury news cycles.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mobile-friendly" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      Is Sharp Shot mobile-friendly?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      Yes. Sharp Shot works on both desktop and mobile browsers. While strategy building is best on desktop, mobile is optimized for scanning and placing bets quickly.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="support" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 py-2 hover:border-[#D8AC35]/30 transition-colors">
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-[#D8AC35] transition-colors no-underline hover:no-underline">
                      Where do I get support?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pt-2 pb-4">
                      You can reach us at support@sharpshotcalc.com or through our official Discord server. Response time is typically under 24 hours.
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </div>
            </div>

          </Accordion>
        </div>
      </div>
    </div>
  );
}