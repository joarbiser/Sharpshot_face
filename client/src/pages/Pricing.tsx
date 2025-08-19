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
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl tungsten-style mb-8 text-gray-900 dark:text-white">Pick Your Edge.</h1>
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">Two plans. One goal: Help you win more.</p>
          
          {/* Billing Toggle */}
          <PricingToggle onToggle={setIsAnnual} className="mb-6" />
          
          {/* Tag Chip */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-800/30 text-xs text-gray-600 dark:text-gray-400 inline-flex mb-16">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D8AC35]"></div>
            Professional Sports Betting Analytics
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16 max-w-5xl mx-auto">
          {/* Pro Plan */}
          <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-10 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60 cursor-pointer"
               onClick={() => document.querySelector('[href="/subscribe"]')?.click()}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Pro</h3>
              <div className="mb-4">
                <div className="flex items-baseline justify-center gap-1 transition-all duration-300">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white leading-none">{proPrice}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-normal ml-1">{billing}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Perfect for getting started</p>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">+EV Calculator</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Real-Time Line Tracker</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">CLV Comparison (24h)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Save & Share 2 Presets</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Advanced Filters</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Export to CSV</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Dark Mode</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Public Preset Browsing</span>
              </li>
            </ul>
            
            <Link href="/subscribe">
              <button 
                onClick={scrollToTop}
                className="w-full py-4 px-8 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-2 border-transparent hover:border-[#D8AC35] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D8AC35]/20 font-medium text-sm relative overflow-hidden group">
                <span className="relative z-10">Choose Pro</span>
                <div className="absolute inset-0 border-2 border-[#D8AC35] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>

          {/* Unlimited Plan */}
          <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-[#D8AC35]/30 p-10 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-[#D8AC35]/50 relative scale-[1.02] cursor-pointer"
               onClick={() => document.querySelector('[href="/subscribe"]')?.click()}>
            {/* Most Popular Pill - Outside the card */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                Most Popular
              </div>
            </div>
            
            {/* Thin Sharp Shot gold inside keyline */}
            <div className="absolute inset-2 rounded-2xl border border-[#D8AC35]/30 pointer-events-none"></div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Unlimited</h3>
              <div className="mb-4">
                <div className="flex items-baseline justify-center gap-1 transition-all duration-300">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white leading-none">{unlimitedPrice}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-normal ml-1">{billing}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">For serious bettors and creators</p>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {/* Group label */}
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D8AC35] flex-shrink-0"></div>
                <span className="font-bold text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Everything in Pro</span>
              </li>
              <li className="flex items-center gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Arbitrage Calculator</span>
              </li>
              <li className="flex items-center gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Middling Calculator</span>
              </li>
              <li className="flex items-center gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">All Profitable Bets Calculator</span>
              </li>
              <li className="flex items-center gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Unlimited Shareable Presets</span>
              </li>
              <li className="flex items-center gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Fork, Clone, Collaborate</span>
              </li>
              <li className="flex items-center gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Public Follower Count</span>
              </li>
              <li className="flex items-center gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Bio & Creator Highlight Tabs</span>
              </li>
            </ul>
            
            <Link href="/subscribe">
              <button 
                onClick={scrollToTop}
                className="w-full py-4 px-8 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-2 border-transparent hover:border-[#D8AC35] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D8AC35]/20 font-medium text-sm relative overflow-hidden group">
                <span className="relative z-10">Choose Unlimited</span>
                <div className="absolute inset-0 border-2 border-[#D8AC35] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </div>

        {/* Detailed Plan Comparison - Collapsible */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center mx-auto text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] transition-colors duration-200"
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
                <div className="flex">
                  {/* Pro Column */}
                  <div className="flex-1 p-10 bg-white dark:bg-gray-900 flex flex-col">
                    {/* Header */}
                    <div className="text-center pb-6 border-b border-gray-100 dark:border-gray-800 mb-6">
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                        Starting Smart
                      </div>
                      <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pro</h4>
                      <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">$59.99<span className="text-lg text-gray-500 dark:text-gray-400 font-normal">/month</span></p>
                      <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                        Essential tools for precision betting with data-driven strategies and disciplined bankroll management.
                      </p>
                    </div>

                    {/* Detailed Features */}
                    <div className="space-y-4 mb-6 flex-1">
                      <h5 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">What you get in Pro:</h5>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">+EV Calculator:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Core tool for identifying bets where the odds are in your favor.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Real-Time Line Tracker:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Watch line movement and react before the market shifts.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">CLV Comparison (24h):</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Measure how your bets stack up against the closing line over 24 hours.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Advanced Filters:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Zero in on sports, markets, and odds ranges that fit your style.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Export to CSV:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Store, review, and analyze your historical data offline.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Dark Mode:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Comfortable viewing during extended sessions.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Save & Share 2 Presets:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Build and share up to two of your own strategies.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Best For */}
                    <div className="mt-auto pt-6">
                      <h6 className="font-semibold text-gray-900 dark:text-white mb-3">Best for:</h6>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li>• Bettors building consistency and discipline</li>
                        <li>• Players starting with a smaller bankroll who want to maximize each opportunity</li>
                        <li>• Users who want the essential tools to bet smarter without extra complexity</li>
                      </ul>
                    </div>
                  </div>

                  {/* Unlimited Column */}
                  <div className="flex-1 p-10 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-yellow-950/20 border-l border-gray-100 dark:border-gray-800 flex flex-col">
                    {/* Header */}
                    <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700 mb-6">
                      <div className="bg-[#D8AC35]/20 dark:bg-[#D8AC35]/20 text-[#D8AC35] dark:text-[#D8AC35] px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                        Scaling Up
                      </div>
                      <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Unlimited</h4>
                      <p className="text-4xl font-bold text-[#D8AC35] dark:text-[#D8AC35]">$99.99<span className="text-lg text-gray-500 dark:text-gray-400 font-normal">/month</span></p>
                      <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                        Complete toolkit with advanced calculators, unlimited collaboration, and professional features.
                      </p>
                    </div>

                    {/* Detailed Features */}
                    <div className="space-y-4 mb-6 flex-1">
                      <h5 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">Everything in Pro, plus:</h5>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-[#D8AC35]/20 dark:bg-[#D8AC35]/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#D8AC35] rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Arbitrage Calculator:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Surface and size plays where opposing lines guarantee a profit.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-[#D8AC35]/20 dark:bg-[#D8AC35]/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#D8AC35] rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Middling Calculator:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Spot situations where multiple outcomes lead to profit or breakeven.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-[#D8AC35]/20 dark:bg-[#D8AC35]/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#D8AC35] rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">All Profitable Bets Feed:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Consolidates +EV, arbitrage, and middling plays into a single view.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-[#D8AC35]/20 dark:bg-[#D8AC35]/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#D8AC35] rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Unlimited Shareable Presets:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Create, share, and manage as many strategies as you need.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-[#D8AC35]/20 dark:bg-[#D8AC35]/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#D8AC35] rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Fork, Clone, Collaborate:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Improve existing presets or co-build strategies with others.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-[#D8AC35]/20 dark:bg-[#D8AC35]/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#D8AC35] rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Public Follower Count:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">See how many bettors track your strategies.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-[#D8AC35]/20 dark:bg-[#D8AC35]/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#D8AC35] rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Bio & Creator Highlights:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Add context to your work and highlight top results.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-[#D8AC35]/20 dark:bg-[#D8AC35]/30 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-[#D8AC35] dark:bg-[#D8AC35] rounded-full"></div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">Priority Support:</span>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Direct, on-demand calls with the founders upon request, ensuring you get fast answers and personalized guidance.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Best For */}
                    <div className="mt-auto pt-6">
                      <h6 className="font-semibold text-gray-900 dark:text-white mb-3">Best for:</h6>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li>• High-volume bettors tracking many opportunities daily</li>
                        <li>• Creators who publish and share strategies regularly</li>
                        <li>• Those collaborating with others or testing multiple approaches at once</li>
                      </ul>
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
                <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-gray-900">
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

              {/* Key Difference Summary */}
              <div className="bg-gray-50 dark:bg-gray-800 px-8 py-6 border-t border-gray-100 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center text-lg">The Key Difference</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm mb-4">
                  <div className="text-center">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Pro</span>
                    <span className="text-gray-700 dark:text-gray-300 ml-1">gives you the core analytical tools to place smarter bets and develop your strategies — perfect for those focused on precision, learning, and steady bankroll growth.</span>
                  </div>
                  <div className="text-center">
                    <span className="font-semibold text-[#D8AC35] dark:text-[#D8AC35]">Unlimited</span>
                    <span className="text-gray-700 dark:text-gray-300 ml-1">gives you every calculator and collaboration feature, so you can capture more types of profitable plays, manage more strategies, and work without preset or sharing limits.</span>
                  </div>
                </div>
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Both plans work toward the same goal: helping you win more often with better information. The choice is whether you want to start lean or scale immediately.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Frequently Asked Questions</h3>
          
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-4 data-[state=open]:border-l-2 data-[state=open]:border-l-[#D8AC35] data-[state=open]:bg-gray-100/30 dark:data-[state=open]:bg-gray-800/30 transition-all duration-200">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white py-6 hover:no-underline [&[data-state=open]>svg]:rotate-90">What is a "Preset" in Sharp Shot?</AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 pb-6">
                A Preset is a saved betting strategy or filter that runs automatically on top of our calculator to find specific types of bets that match your criteria.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-4 data-[state=open]:border-l-2 data-[state=open]:border-l-[#D8AC35] data-[state=open]:bg-gray-100/30 dark:data-[state=open]:bg-gray-800/30 transition-all duration-200">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white py-6 hover:no-underline [&[data-state=open]>svg]:rotate-90">Can I change my plan anytime?</AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 pb-6">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-4 data-[state=open]:border-l-2 data-[state=open]:border-l-[#D8AC35] data-[state=open]:bg-gray-100/30 dark:data-[state=open]:bg-gray-800/30 transition-all duration-200">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white py-6 hover:no-underline [&[data-state=open]>svg]:rotate-90">Do you offer refunds?</AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 pb-6">
                We offer a 7-day money-back guarantee for all new subscriptions. No questions asked.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-4 data-[state=open]:border-l-2 data-[state=open]:border-l-[#D8AC35] data-[state=open]:bg-gray-100/30 dark:data-[state=open]:bg-gray-800/30 transition-all duration-200">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white py-6 hover:no-underline [&[data-state=open]>svg]:rotate-90">Which sportsbooks do you track?</AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 pb-6">
                We track odds from 40+ major sportsbooks including DraftKings, FanDuel, BetMGM, Caesars, and many more.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
