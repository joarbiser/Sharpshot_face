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
    <section className="pt-16 pb-16 bg-gradient-to-br from-background via-secondary to-[hsl(var(--sharp-gold))]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-hero tungsten-style mb-3 text-foreground">Pick Your Edge.</h1>
          <p className="text-subheading text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6">Two plans. One goal: Help you win more.</p>
          
          {/* Billing Toggle */}
          <PricingToggle onToggle={setIsAnnual} className="mb-4" />
          
          {/* Tag Chip */}
          <div className="tag-chip mb-8">
            <div className="tag-chip-dot"></div>
            Professional Sports Betting Analytics
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-16 max-w-[1280px] mx-auto">
          {/* Pro Plan */}
          <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60 cursor-pointer"
               onClick={() => (document.querySelector('[href="/subscribe"]') as HTMLElement)?.click()}>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Pro</h3>
              <div className="flex items-baseline justify-center gap-1 transition-all duration-300 mb-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-white leading-none">{proPrice}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-normal ml-1">{billing}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Perfect for getting started</p>
            </div>
            
            <ul className="space-y-3 mt-4 mb-6 flex-1">
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
                className="w-full py-4 px-8 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-2 border-transparent hover:border-[#D8AC35] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D8AC35]/20 font-medium text-sm relative overflow-hidden group mt-6">
                <span className="relative z-10">Choose Pro</span>
                <div className="absolute inset-0 border-2 border-[#D8AC35] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>

          {/* Unlimited Plan */}
          <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-[#D8AC35]/30 px-8 py-7 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-[#D8AC35]/50 relative cursor-pointer"
               onClick={() => (document.querySelector('[href="/subscribe"]') as HTMLElement)?.click()}>
            {/* Most Popular Pill - At top edge of Unlimited card */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                Most Popular
              </div>
            </div>
            
            {/* Thin Sharp Shot gold inside keyline */}
            <div className="absolute inset-2 rounded-2xl border border-[#D8AC35]/30 pointer-events-none"></div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Unlimited</h3>
              <div className="flex items-baseline justify-center gap-1 transition-all duration-300 mb-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-white leading-none">{unlimitedPrice}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-normal ml-1">{billing}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">For serious bettors and creators</p>
            </div>
            
            <ul className="space-y-3 mt-4 mb-6 flex-1">
              {/* Group label */}
              <li className="flex items-start gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="font-bold text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Everything in Pro</span>
              </li>
              <li className="flex items-start gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Arbitrage Calculator</span>
              </li>
              <li className="flex items-start gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Middling Calculator</span>
              </li>
              <li className="flex items-start gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">All Profitable Bets Calculator</span>
              </li>
              <li className="flex items-start gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Unlimited Shareable Presets</span>
              </li>
              <li className="flex items-start gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Fork, Clone, Collaborate</span>
              </li>
              <li className="flex items-start gap-3 ml-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-[3]" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Priority Support</span>
              </li>

            </ul>
            
            <Link href="/subscribe">
              <button 
                onClick={scrollToTop}
                className="w-full py-4 px-8 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-2 border-transparent hover:border-[#D8AC35] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D8AC35]/20 font-medium text-sm relative overflow-hidden group mt-6">
                <span className="relative z-10">Choose Unlimited</span>
                <div className="absolute inset-0 border-2 border-[#D8AC35] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </div>

        {/* Compare Features - Collapsible */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center mx-auto px-6 py-3 rounded-full bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white hover:text-[#D8AC35] dark:hover:text-[#D8AC35] hover:border-[#D8AC35]/50 transition-all duration-200"
            >
              <span className="text-sm font-semibold mr-3">Compare features</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>

          {isExpanded && (
            <div className="max-w-[1280px] mx-auto px-8 transition-all duration-300 ease-out animate-in slide-in-from-top-2 fade-in-0">
              <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-lg shadow-black/5 dark:shadow-black/20 pt-6 pb-8">
                {/* Optional Header with reduced opacity */}
                <div className="px-8 pb-4 border-b border-[#D8AC35]/15">
                  <p className="text-center text-gray-600/70 dark:text-gray-400/70 text-sm">Professional sports betting analytics comparison</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 relative px-8 pt-6">
                  {/* Sharp Shot Gold Vertical Divider - extends to bottom border */}
                  <div className="absolute left-1/2 top-0 bottom-[-20px] w-px bg-[#D8AC35]/15 -translate-x-1/2 hidden md:block"></div>
                  
                  {/* Pro Column */}
                  <div className="px-6 flex flex-col">
                    <div className="text-center mb-6 h-[140px] flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 text-xs text-gray-600 dark:text-gray-400 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        Starting Smart
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pro</h4>
                      <div className="text-center mb-3 flex items-baseline justify-center">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{proPrice}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-0.5">/month</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Essential tools for precision and discipline.</p>
                    </div>

                    <div className="space-y-4 mb-6 flex-grow">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-green-400 dark:border-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-green-500 dark:text-green-400 stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">+EV Calculator</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Removes vig, derives true odds, and shows EV% so you bet with an edge.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-green-400 dark:border-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-green-500 dark:text-green-400 stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Real-Time Line Tracker</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Watch line movement in real time to react before the market shifts.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-green-400 dark:border-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-green-500 dark:text-green-400 stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Save & Share 2 Presets</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Build up to two strategies and share public links.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-green-400 dark:border-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-green-500 dark:text-green-400 stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Advanced Filters</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Choose books, markets, min EV, time-to-game, and sort by best price.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-green-400 dark:border-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-green-500 dark:text-green-400 stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Export to CSV</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Download filtered opportunities with odds and EV fields.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-green-400 dark:border-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-green-500 dark:text-green-400 stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Dark Mode</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Comfortable viewing during long sessions.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-green-400 dark:border-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-green-500 dark:text-green-400 stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Public Preset Browsing</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Explore community strategies and copy their settings.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl border border-gray-200/30 dark:border-gray-700/30 p-4 mt-5">
                      <h6 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3">Best for</h6>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li>• Bettors building consistency and discipline</li>
                        <li>• Smaller bankrolls maximizing each opportunity</li>
                        <li>• Users who want essential tools without extra complexity</li>
                      </ul>
                    </div>
                  </div>

                  {/* Unlimited Column */}
                  <div className="px-6 flex flex-col">
                    <div className="text-center mb-6 h-[140px] flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 text-xs text-gray-600 dark:text-gray-400 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D8AC35]"></div>
                        Scaling Up
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Unlimited</h4>
                      <div className="text-center mb-3 flex items-baseline justify-center">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{unlimitedPrice}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-0.5">/month</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Every calculator and collaboration to scale strategies.</p>
                    </div>

                    <div className="space-y-4 mb-6 flex-grow">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-[#D8AC35]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Everything in Pro</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">All Pro features included.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-[#D8AC35]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Arbitrage Calculator</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Surface risk-free profit across books with stake guidance.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-[#D8AC35]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Middling Calculator</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Identify middle windows and auto-calculate both sides.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-[#D8AC35]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">All Profitable Bets Calculator</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Unified view of +EV, arbitrage, and middles with sorting.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-[#D8AC35]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Unlimited Shareable Presets</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Create, publish, and update unlimited strategies.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-[#D8AC35]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Fork, Clone, Collaborate</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Duplicate any preset, iterate, and invite collaborators.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-[#D8AC35]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">API Access</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">Programmatic access to betting data and calculations.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border border-[#D8AC35]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#D8AC35] stroke-2" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm block mb-1">Priority Support</span>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">On-demand calls with the founders upon request.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl border border-gray-200/30 dark:border-gray-700/30 p-4 mt-5">
                      <h6 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3">Best for</h6>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li>• High-volume bettors tracking many opportunities daily</li>
                        <li>• Creators who publish and share strategies regularly</li>
                        <li>• Teams collaborating or testing multiple approaches at once</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-t border-[#D8AC35]/15 text-center px-8">
                  <p className="text-sm text-gray-600/80 dark:text-gray-400/80 tracking-wide">
                    Pro: essential tools for precision and discipline. Unlimited: every calculator + collaboration to scale strategies.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Frequently Asked Questions</h3>
          
          <Accordion type="single" collapsible className="space-y-1">
            <AccordionItem value="item-1" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-4 data-[state=open]:border-l-2 data-[state=open]:border-l-[#D8AC35] data-[state=open]:bg-gray-100/30 dark:data-[state=open]:bg-gray-800/30 transition-all duration-200">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white h-14 hover:no-underline [&[data-state=open]>svg]:rotate-90">What is a "Preset" in Sharp Shot?</AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 pb-6">
                A Preset is a saved betting strategy or filter that runs automatically on top of our calculator to find specific types of bets that match your criteria.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-4 data-[state=open]:border-l-2 data-[state=open]:border-l-[#D8AC35] data-[state=open]:bg-gray-100/30 dark:data-[state=open]:bg-gray-800/30 transition-all duration-200">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white h-14 hover:no-underline [&[data-state=open]>svg]:rotate-90">Can I change my plan anytime?</AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 pb-6">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-4 data-[state=open]:border-l-2 data-[state=open]:border-l-[#D8AC35] data-[state=open]:bg-gray-100/30 dark:data-[state=open]:bg-gray-800/30 transition-all duration-200">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white h-14 hover:no-underline [&[data-state=open]>svg]:rotate-90">Do you offer refunds?</AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300 pb-6">
                We offer a 7-day money-back guarantee for all new subscriptions. No questions asked.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-4 data-[state=open]:border-l-2 data-[state=open]:border-l-[#D8AC35] data-[state=open]:bg-gray-100/30 dark:data-[state=open]:bg-gray-800/30 transition-all duration-200">
              <AccordionTrigger className="font-bold text-gray-900 dark:text-white h-14 hover:no-underline [&[data-state=open]>svg]:rotate-90">Which sportsbooks do you track?</AccordionTrigger>
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
