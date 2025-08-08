import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PricingToggle } from "@/components/ui/pricing-toggle";
import { Link } from "wouter";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const proPrice = isAnnual ? "$599.99" : "$59.99";
  const unlimitedPrice = isAnnual ? "$999.99" : "$99.99";
  const billing = isAnnual ? "/year" : "/month";

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl tungsten-style mb-6 text-black dark:text-white">Pick Your Edge.</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 sharp-text">Two plans. One goal: Help you win more.</p>
          
          {/* Billing Toggle */}
          <PricingToggle onToggle={setIsAnnual} className="mb-8" />
          
          {/* Free Trial Notice - Trading Terminal Style */}
          <div className="bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3 rounded-lg inline-block border border-gray-700 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono uppercase tracking-wider">7-Day Free Trial • All Plans</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Pro Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Pro</h3>
              <div className="text-4xl font-bold mb-4">
                <span className="text-green-400">{proPrice}</span>
                <span className="text-lg text-gray-500 dark:text-gray-400">{billing}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Perfect for getting started</p>
              {isAnnual && (
                <div className="text-sm text-green-400 font-semibold mt-2">Save two months</div>
              )}
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">+EV Calculator</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Real-Time Line Tracker</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200" title="Closing Line Value - how much better your bet is compared to the final market line">CLV Comparison (24h)</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Save & Share 2 Presets</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Advanced Filters</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Export to CSV</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Dark Mode</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Public Preset Browsing</span>
              </li>
            </ul>
            
            <Link href="/subscribe">
              <Button className="w-full bg-green-400 text-black hover:bg-green-500 transition-colors font-semibold">
                Choose Pro
              </Button>
            </Link>
          </div>

          {/* Unlimited Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border-2 border-[#D8AC35] relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-[#D8AC35] text-black px-4 py-2 rounded-full text-sm font-bold">Most Popular</div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Unlimited</h3>
              <div className="text-4xl font-bold mb-4">
                <span className="text-green-400">{unlimitedPrice}</span>
                <span className="text-lg text-gray-500 dark:text-gray-400">{billing}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">For serious bettors and creators</p>
              {isAnnual && (
                <div className="text-sm text-green-400 font-semibold mt-2">Save two months</div>
              )}
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="font-semibold text-gray-800 dark:text-gray-200">Everything in Pro</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Arbitrage Calculator</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Middling Calculator</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">All Profitable Bets Calculator</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Unlimited Shareable Presets</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Fork, Clone, Collaborate</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Public Follower Count</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-800 dark:text-gray-200">Bio & Creator Highlight Tabs</span>
              </li>
            </ul>
            
            <Link href="/subscribe">
              <Button className="w-full bg-green-400 text-black hover:bg-green-500 transition-colors font-semibold">
                Choose Unlimited
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-center mb-8 text-black dark:text-white">Frequently Asked Questions</h3>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold text-black dark:text-white">What is a "Preset" in Sharp Shot?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                A Preset is a saved betting strategy or filter that runs automatically on top of our calculator to find specific types of bets that match your criteria.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold text-black dark:text-white">Can I change my plan anytime?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold text-black dark:text-white">Do you offer refunds?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                We offer a 7-day money-back guarantee for all new subscriptions. No questions asked.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-bold text-black dark:text-white">Which sportsbooks do you track?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                We track odds from 40+ major sportsbooks including DraftKings, FanDuel, BetMGM, Caesars, and many more.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
