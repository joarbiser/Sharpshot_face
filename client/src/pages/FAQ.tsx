import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white dark:bg-black py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl tungsten-style mb-6 text-black dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 sharp-text">
            Everything you need to know about Sharp Shot
          </p>
        </div>

        {/* FAQ Content */}
        <div className="w-full">
          <Accordion type="single" collapsible className="space-y-6">
            
            {/* About Sharp Shot Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#D8AC35] dark:text-[#D8AC35]">About Sharp Shot</h2>
            </div>
            
            <AccordionItem value="what-is-sharp-shot">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                What is Sharp Shot?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Sharp Shot is a betting intelligence platform that identifies +EV (positive expected value), arbitrage, and middling opportunities across major sportsbooks. It helps users flip the vig and make data-driven bets with long-term edge.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="who-is-it-for">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                Who is Sharp Shot built for?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Sharp Shot is built for serious bettors who want to leverage market inefficiencies—whether you're a sharp looking to scale or a disciplined beginner seeking an edge.
              </AccordionContent>
            </AccordionItem>

            {/* Betting Concepts Section */}
            <div className="mb-8 mt-12">
              <h2 className="text-2xl font-bold mb-4 text-[#D8AC35] dark:text-[#D8AC35]">Betting Concepts</h2>
            </div>

            <AccordionItem value="what-is-ev">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                What is +EV betting?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                <p className="mb-4">+EV stands for "positive expected value." It means a bet is mathematically projected to make money over time.</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="font-semibold mb-2">Example:</p>
                  <p>DraftKings lists a player prop at -120, but five other books list it at -200. Sharp Shot removes the vig, calculates fair odds as around -185, and flags this as a +EV bet with expected edge.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what-is-arbitrage">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                What is arbitrage betting?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                <p className="mb-4">Arbitrage betting takes advantage of line discrepancies between sportsbooks to lock in a profit regardless of outcome.</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="font-semibold mb-2">Example:</p>
                  <p>FanDuel offers Over 1.5 Goals at +110, while BetMGM offers Under 1.5 Goals at +115 for the same match. Sharp Shot shows you exactly how to stake both sides so that no matter the outcome, you lock in a guaranteed profit with zero risk.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what-is-middling">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                What is middling?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                <p className="mb-4">Middling is when you bet both sides of a line at different numbers and aim for the final score to land in between — resulting in both bets cashing. Sharp Shot only surfaces middles where your worst-case outcome is break-even and your best-case is a double win.</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="font-semibold mb-2">Example:</p>
                  <p className="mb-2">DraftKings has Over 41.5 at +120, while FanDuel posts Under 44.5 at -120. Sharp Shot shows you how to stake both sides so that:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>If the game lands between 42 and 44, both bets win and you lock in profit</li>
                    <li>If it lands outside that range, one bet wins and the other loses — but you break even due to the odds</li>
                  </ul>
                  <p className="mt-2 font-semibold">No matter what, you never lose money — you're either neutral or profitable.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Using the Platform Section */}
            <div className="mb-8 mt-12">
              <h2 className="text-2xl font-bold mb-4 text-[#D8AC35] dark:text-[#D8AC35]">Using the Platform</h2>
            </div>

            <AccordionItem value="supported-sportsbooks">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                Which sportsbooks are supported?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                We support all major U.S. regulated books including DraftKings, FanDuel, BetMGM, Caesars, PointsBet, and others. More are added regularly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="link-accounts">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                Do I need to link my sportsbook accounts?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                No. Sharp Shot is read-only. You don't connect accounts—you view edges and place bets manually on your preferred book.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="customize-strategies">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                Can I customize and save strategies?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Yes. Pro users can customize filters, save presets, and share them publicly or keep them private. Unlimited users get unlimited preset sharing, collaboration tools, and priority support.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="line-updates">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                How often are lines updated?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Odds are refreshed in real time or within seconds depending on the source. All edge calculations are current and based on live data.
              </AccordionContent>
            </AccordionItem>

            {/* Pricing and Subscriptions Section */}
            <div className="mb-8 mt-12">
              <h2 className="text-2xl font-bold mb-4 text-[#D8AC35] dark:text-[#D8AC35]">Pricing and Subscriptions</h2>
            </div>

            <AccordionItem value="pricing">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                How much does Sharp Shot cost?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                <ul className="space-y-2">
                  <li><strong>Pro</strong> – $59.99/month</li>
                  <li><strong>Unlimited</strong> – $99.99/month</li>
                </ul>
                <p className="mt-4">Discounted annual plans are available. Visit the Pricing page for full details.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="free-trial">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                Is there a free trial?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Yes, we offer a 7-day free trial so you can explore the platform before committing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancel-subscription">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                How do I cancel my subscription?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Subscriptions can be canceled anytime from your account dashboard. There are no cancellation fees or long-term commitments.
              </AccordionContent>
            </AccordionItem>

            {/* Affiliate Program Section */}
            <div className="mb-8 mt-12">
              <h2 className="text-2xl font-bold mb-4 text-[#D8AC35] dark:text-[#D8AC35]">Affiliate Program</h2>
            </div>

            <AccordionItem value="affiliate-earnings">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                What do I earn as an affiliate?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                All affiliates earn 51% recurring revenue on every user they refer — no time limits, no tiers, no caps. This is one of the most aggressive affiliate programs in the industry.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="earning-threshold">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                Do I need to hit a threshold to earn?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                No. You earn from the first dollar your referrals spend. Payouts are issued monthly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="track-performance">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                How do I track performance?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Each affiliate receives a personalized dashboard with live tracking of signups, conversion rates, commissions, and retention data.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="w9-submission">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                When do I need to submit a W-9?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Once you hit $600 in cumulative commissions, we are legally required to collect a W-9. You'll be prompted at that point.
              </AccordionContent>
            </AccordionItem>

            {/* Accounting, Taxes, and Payouts Section */}
            <div className="mb-8 mt-12">
              <h2 className="text-2xl font-bold mb-4 text-[#D8AC35] dark:text-[#D8AC35]">Accounting, Taxes, and Payouts</h2>
            </div>

            <AccordionItem value="taxable-income">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                Is affiliate income taxable?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Yes. In the U.S., affiliate commissions are taxable income. Once you earn $600 or more, you'll receive a 1099 form from us at year-end.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tax-support">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                Does Sharp Shot offer tax support?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                No, we do not provide tax advice. We recommend consulting a CPA if you have tax questions.
              </AccordionContent>
            </AccordionItem>

            {/* Technical and Support Section */}
            <div className="mb-8 mt-12">
              <h2 className="text-2xl font-bold mb-4 text-[#D8AC35] dark:text-[#D8AC35]">Technical and Support</h2>
            </div>

            <AccordionItem value="no-ev-bets">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                Why am I not seeing any +EV bets right now?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                At times, markets are more efficient and high-edge opportunities are rare. Try widening your filters or checking back during high-volume windows like game day mornings or injury news cycles.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mobile-friendly">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                Is Sharp Shot mobile-friendly?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Yes. Sharp Shot works on both desktop and mobile browsers. While strategy building is best on desktop, mobile is optimized for scanning and placing bets quickly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger className="font-bold text-black dark:text-white">
                Where do I get support?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                You can reach us at <a href="mailto:support@sharpshotcalc.com" className="text-[#D8AC35] hover:underline">support@sharpshotcalc.com</a> or through our official Discord server. Response time is typically under 24 hours.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#D8AC35] to-[#B8941C] text-white px-8 py-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="mb-6">Our support team is here to help you get the most out of Sharp Shot.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@sharpshotcalc.com"
                className="bg-white text-[#D8AC35] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Email Support
              </a>
              <a 
                href="#"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#D8AC35] transition-colors"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}