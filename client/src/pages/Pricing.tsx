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
              className="flex items-center justify-center mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-4 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 shadow-sm"
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
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Desktop: Side-by-Side Layout */}
              <div className="hidden md:block">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Pro Column */}
                  <div className="p-8 border-r border-gray-200 dark:border-gray-700">
                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-green-700 dark:text-green-300 text-sm font-semibold mr-3">
                          Best for: Starting Smart
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pro — $59.99/month</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        Pro is the ideal starting point for bettors who want to apply sharp, data-driven strategies without committing to every advanced feature. It's also well-suited for those managing a smaller bankroll, where the focus is on precision and discipline rather than sheer volume.
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Calculator className="h-4 w-4 mr-2 text-green-500" />
                        What you get in Pro:
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">+EV Calculator:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Core tool for identifying bets where the odds are in your favor.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Real-Time Line Tracker:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Watch line movement and react before the market shifts.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">CLV Comparison (24h):</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Measure how your bets stack up against the closing line over 24 hours.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Advanced Filters:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Zero in on sports, markets, and odds ranges that fit your style.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Export to CSV:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Store, review, and analyze your historical data offline.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Dark Mode:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Comfortable viewing during extended sessions.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Public Preset Browsing:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">See and learn from other users' saved strategies.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Save & Share 2 Presets:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Build and share up to two of your own strategies.</span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Best for:</h5>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Bettors building consistency and discipline.</li>
                        <li>• Players starting with a smaller bankroll who want to maximize each opportunity.</li>
                        <li>• Users who want the essential tools to bet smarter without extra complexity.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Unlimited Column */}
                  <div className="p-8 bg-gradient-to-br from-gray-50 to-[#D8AC35]/5 dark:from-gray-800 dark:to-[#00ff41]/5">
                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <div className="bg-[#D8AC35]/20 dark:bg-[#00ff41]/20 px-3 py-1 rounded-full text-[#D8AC35] dark:text-[#00ff41] text-sm font-semibold mr-3">
                          Best for: Scaling Up
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unlimited — $99.99/month</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        Unlimited is built for bettors who need to operate at a higher capacity — whether that means tracking more opportunities, working with more collaborators, or sharing more strategies. It includes every feature in Pro, plus additional calculators, expanded feeds, and unlimited publishing.
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-[#D8AC35] dark:text-[#00ff41]" />
                        Everything in Pro, plus:
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-[#D8AC35] dark:text-[#00ff41] mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Arbitrage Calculator:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Surface and size plays where opposing lines guarantee a profit.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-[#D8AC35] dark:text-[#00ff41] mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Middling Calculator:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Spot situations where multiple outcomes lead to profit or breakeven.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-[#D8AC35] dark:text-[#00ff41] mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">All Profitable Bets Feed:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Consolidates +EV, arbitrage, and middling plays into a single view.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-[#D8AC35] dark:text-[#00ff41] mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Unlimited Shareable Presets:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Create, share, and manage as many strategies as you need.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-[#D8AC35] dark:text-[#00ff41] mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Fork, Clone, Collaborate:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Improve existing presets or co-build strategies with others.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-[#D8AC35] dark:text-[#00ff41] mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Public Follower Count:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">See how many bettors track your strategies.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-[#D8AC35] dark:text-[#00ff41] mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Bio & Creator Highlights Tabs:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Add context to your work and highlight top results.</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-[#D8AC35] dark:text-[#00ff41] mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Priority Support:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">Faster responses when you need assistance.</span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#D8AC35]/10 dark:bg-[#00ff41]/10 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Best for:</h5>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• High-volume bettors tracking many opportunities daily.</li>
                        <li>• Creators who publish and share strategies regularly.</li>
                        <li>• Those collaborating with others or testing multiple approaches at once.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile: Stacked Layout */}
              <div className="md:hidden">
                {/* Pro Mobile */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="mb-4">
                    <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-green-700 dark:text-green-300 text-xs font-semibold mb-3 inline-block">
                      Best for: Starting Smart
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pro — $59.99/month</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      Perfect for bettors focused on precision and discipline rather than sheer volume.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Key Features:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">+EV Calculator & Real-Time Line Tracker</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">CLV Comparison & Advanced Filters</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Save & Share 2 Presets</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Export to CSV & Dark Mode</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Unlimited Mobile */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-[#D8AC35]/5 dark:from-gray-800 dark:to-[#00ff41]/5">
                  <div className="mb-4">
                    <div className="bg-[#D8AC35]/20 dark:bg-[#00ff41]/20 px-3 py-1 rounded-full text-[#D8AC35] dark:text-[#00ff41] text-xs font-semibold mb-3 inline-block">
                      Best for: Scaling Up
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Unlimited — $99.99/month</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      Everything in Pro plus advanced calculators and unlimited collaboration features.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Additional Features:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-3 w-3 text-[#D8AC35] dark:text-[#00ff41] mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Arbitrage & Middling Calculators</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-3 w-3 text-[#D8AC35] dark:text-[#00ff41] mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">All Profitable Bets Feed</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-3 w-3 text-[#D8AC35] dark:text-[#00ff41] mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Unlimited Shareable Presets</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-3 w-3 text-[#D8AC35] dark:text-[#00ff41] mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Fork, Clone, Collaborate</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-3 w-3 text-[#D8AC35] dark:text-[#00ff41] mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Creator Tools & Priority Support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Difference Section - Bottom Bar */}
              <div className="bg-gray-100 dark:bg-gray-800 p-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-center">The Key Difference</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <span className="font-semibold text-gray-900 dark:text-white">Pro</span>
                    <span className="text-gray-700 dark:text-gray-300 ml-1">gives you the core analytical tools to place smarter bets and develop your strategies — perfect for those focused on precision, learning, and steady bankroll growth.</span>
                  </div>
                  <div className="text-center">
                    <span className="font-semibold text-gray-900 dark:text-white">Unlimited</span>
                    <span className="text-gray-700 dark:text-gray-300 ml-1">gives you every calculator and collaboration feature, so you can capture more types of profitable plays, manage more strategies, and work without preset or sharing limits.</span>
                  </div>
                </div>
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4 font-medium">
                  Both plans work toward the same goal: helping you win more often with better information. The choice is whether you want to start lean or scale immediately.
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
