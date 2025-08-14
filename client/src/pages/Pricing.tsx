import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PricingToggle } from "@/components/ui/pricing-toggle";
import { Link } from "wouter";
import { ChevronDown, ChevronUp, Check, Calculator, Users, Zap, Headphones } from "lucide-react";
import { scrollToTop } from "@/utils/scrollToTop";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const proPrice = isAnnual ? "$599.99" : "$59.99";
  const unlimitedPrice = isAnnual ? "$999.99" : "$99.99";
  const billing = isAnnual ? "/year" : "/month";

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#00ff41]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl tungsten-style mb-6 text-gray-900 dark:text-white">Pick Your Edge.</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 sharp-text">Two plans. One goal: Help you win more.</p>
          
          {/* Billing Toggle */}
          <PricingToggle onToggle={setIsAnnual} className="mb-8" />
          
          {/* Free Trial Notice - Trading Terminal Style */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white px-6 py-3 rounded-lg inline-block border border-gray-300 dark:border-gray-700 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
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
              <p className="text-gray-700 dark:text-gray-300">Perfect for getting started</p>
              {isAnnual && (
                <div className="text-sm text-green-400 font-semibold mt-2">Save two months</div>
              )}
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">+EV Calculator</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Real-Time Line Tracker</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200" title="Closing Line Value - how much better your bet is compared to the final market line">CLV Comparison (24h)</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Save & Share 2 Presets</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Advanced Filters</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Export to CSV</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Dark Mode</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Public Preset Browsing</span>
              </li>
            </ul>
            
            <Link href="/subscribe">
              <Button 
                onClick={scrollToTop}
                className="w-full bg-green-400 text-black hover:bg-green-500 transition-colors font-semibold">
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
              <p className="text-gray-700 dark:text-gray-300">For serious bettors and creators</p>
              {isAnnual && (
                <div className="text-sm text-green-400 font-semibold mt-2">Save two months</div>
              )}
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="font-semibold text-gray-900 dark:text-gray-200">Everything in Pro</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Arbitrage Calculator</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Middling Calculator</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">All Profitable Bets Calculator</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Unlimited Shareable Presets</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Fork, Clone, Collaborate</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Public Follower Count</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-400 mr-3"></i>
                <span className="text-gray-900 dark:text-gray-200">Bio & Creator Highlight Tabs</span>
              </li>
            </ul>
            
            <Link href="/subscribe">
              <Button 
                onClick={scrollToTop}
                className="w-full bg-green-400 text-black hover:bg-green-500 transition-colors font-semibold">
                Choose Unlimited
              </Button>
            </Link>
          </div>
        </div>

        {/* Detailed Plan Comparison - Collapsible */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center mx-auto text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#00ff41] transition-colors duration-200"
            >
              <span className="text-lg font-semibold mr-3">Understanding the Difference Between Pro and Unlimited</span>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {isExpanded && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden max-w-6xl mx-auto">
              {/* Modern Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Choose Your Plan</h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mt-2">Professional sports betting analytics for every level</p>
              </div>

              {/* Desktop: Clean Side-by-Side Layout */}
              <div className="hidden md:block">
                <div className="grid md:grid-cols-2">
                  {/* Pro Column */}
                  <div className="p-10 bg-white dark:bg-gray-900">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center pb-6 border-b border-gray-100 dark:border-gray-800">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                          Starting Smart
                        </div>
                        <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pro</h4>
                        <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">$59.99<span className="text-lg text-gray-500 dark:text-gray-400 font-normal">/month</span></p>
                        <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                          Essential tools for precision betting with data-driven strategies and disciplined bankroll management.
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">+EV Calculator</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">Real-Time Line Tracker</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">CLV Comparison (24h)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">Advanced Filters & Export</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">2 Shareable Presets</span>
                        </div>
                      </div>

                      {/* Best For */}
                      <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl">
                        <h6 className="font-semibold text-gray-900 dark:text-white mb-3">Best for</h6>
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <div>Precision-focused bettors</div>
                          <div>Smaller bankroll management</div>
                          <div>Essential analytical tools</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Unlimited Column */}
                  <div className="p-10 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 border-l border-gray-100 dark:border-gray-800">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                          Scaling Up
                        </div>
                        <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Unlimited</h4>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">$99.99<span className="text-lg text-gray-500 dark:text-gray-400 font-normal">/month</span></p>
                        <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                          Complete toolkit with advanced calculators, unlimited collaboration, and professional features.
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">Everything in Pro, plus:</div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">Arbitrage Calculator</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">Middling Calculator</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">All Profitable Bets Feed</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">Unlimited Presets</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">Collaboration Tools</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">Creator Tools & Priority Support</span>
                        </div>
                      </div>

                      {/* Best For */}
                      <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl">
                        <h6 className="font-semibold text-gray-900 dark:text-white mb-3">Best for</h6>
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <div>High-volume betting</div>
                          <div>Strategy collaboration</div>
                          <div>Advanced analytics</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile: Clean Stacked Layout */}
              <div className="md:hidden">
                {/* Pro Mobile */}
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                      Starting Smart
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pro</h4>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">$59.99<span className="text-base text-gray-500 dark:text-gray-400 font-normal">/month</span></p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                      </div>
                      <span className="text-gray-900 dark:text-white text-sm">+EV Calculator & Line Tracker</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                      </div>
                      <span className="text-gray-900 dark:text-white text-sm">Advanced Filters & Export</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                      </div>
                      <span className="text-gray-900 dark:text-white text-sm">2 Shareable Presets</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800"></div>

                {/* Unlimited Mobile */}
                <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20">
                  <div className="text-center mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                      Scaling Up
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unlimited</h4>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">$99.99<span className="text-base text-gray-500 dark:text-gray-400 font-normal">/month</span></p>
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">Everything in Pro, plus:</div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-gray-900 dark:text-white text-sm">Arbitrage & Middling Calculators</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-gray-900 dark:text-white text-sm">Unlimited Presets & Collaboration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-gray-900 dark:text-white text-sm">Creator Tools & Priority Support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Summary */}
              <div className="bg-gray-50 dark:bg-gray-800 px-8 py-6 border-t border-gray-100 dark:border-gray-700">
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                  Both plans include 7-day free trial and help you win more with data-driven insights. Choose based on your betting volume and collaboration needs.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Frequently Asked Questions</h3>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white">What is a "Preset" in Sharp Shot?</AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                A Preset is a saved betting strategy or filter that runs automatically on top of our calculator to find specific types of bets that match your criteria.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white">Can I change my plan anytime?</AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white">Do you offer refunds?</AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                We offer a 7-day money-back guarantee for all new subscriptions. No questions asked.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white">Which sportsbooks do you track?</AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                We track odds from 40+ major sportsbooks including DraftKings, FanDuel, BetMGM, Caesars, and many more.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
