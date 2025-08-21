import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChipButton } from "@/components/ui/chip-button";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";
import { scrollToTop } from "@/utils/scrollToTop";

export default function Home() {
  const { theme } = useTheme();
  
  // Animation refs for individual elements
  const whoWeAreHeadingRef = useScrollAnimation<HTMLHeadingElement>();
  const whoWeAreParagraphRef = useScrollAnimation<HTMLParagraphElement>({ delay: 120 });
  const whoWeAreTaglineRef = useScrollAnimation<HTMLParagraphElement>({ delay: 240 });
  const seeSharpShotHeadingRef = useScrollAnimation<HTMLHeadingElement>();
  const seeSharpShotParagraphRef = useScrollAnimation<HTMLParagraphElement>({ delay: 120 });
  
  // Additional animation refs for lower sections with slower timing
  const builtForProHeadingRef = useScrollAnimation<HTMLHeadingElement>({ delay: 200 });
  const builtForProParagraphRef = useScrollAnimation<HTMLParagraphElement>({ delay: 400 });
  const readyToFindHeadingRef = useScrollAnimation<HTMLHeadingElement>({ delay: 300 });
  const readyToFindParagraphRef = useScrollAnimation<HTMLParagraphElement>({ delay: 500 });
  
  // Feature card animation refs with staggered timing
  const featureCard1Ref = useScrollAnimation<HTMLDivElement>({ delay: 600 });
  const featureCard2Ref = useScrollAnimation<HTMLDivElement>({ delay: 750 });
  const featureCard3Ref = useScrollAnimation<HTMLDivElement>({ delay: 900 });
  
  // Trading terminal and button animation refs
  const tradingTerminalRef = useScrollAnimation<HTMLDivElement>({ delay: 300 });
  const ctaButtonsRef = useScrollAnimation<HTMLDivElement>({ delay: 600 });
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Stripe-style gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base background */}
        <div className="absolute inset-0 bg-white dark:bg-gray-900"></div>
        
        {/* Large blurred color fields */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D8AC35] rounded-full opacity-20 dark:opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute -top-20 left-1/3 w-80 h-80 bg-blue-400 rounded-full opacity-15 dark:opacity-25 blur-3xl"></div>
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-teal-400 rounded-full opacity-12 dark:opacity-20 blur-3xl"></div>
        <div className="absolute top-40 -right-20 w-64 h-64 bg-[#D8AC35] rounded-full opacity-15 dark:opacity-25 blur-2xl"></div>
        <div className="absolute top-60 left-1/2 w-56 h-56 bg-blue-300 rounded-full opacity-10 dark:opacity-15 blur-3xl"></div>
        
        {/* Gradient overlay to fade into clean base */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 dark:via-gray-900/60 to-white dark:to-gray-900"></div>
      </div>

      {/* Hero Section - New Layout with Prominent Faded Logo */}
      <section className="relative min-h-[90vh] flex items-center justify-between overflow-hidden px-8 md:px-16 z-10">
        {/* Large Pronounced Logo Background with Radial Gradient */}
        <div className="absolute left-0 md:left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <img 
            src="/logo-gold.png" 
            alt="" 
            className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] object-contain"
            style={{
              opacity: '0.65',
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.1) 100%)',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.1) 100%)'
            }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full">
          {/* Left side - Logo space */}
          <div className="flex-1"></div>
          
          {/* Right side - Content */}
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-foreground text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              It's not luck.<br />
              It's <span className="text-primary">leverage</span>.
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed">
              Built for sharp minds. Powered by sharp tools.<br />
              Advanced algorithms scan multiple sportsbooks in real-time to identify profitable betting opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <ChipButton 
                variant="primary"
                href="/calculator"
                onClick={scrollToTop}>
                Get Started
              </ChipButton>
              <ChipButton 
                variant="secondary"
                href="#see-sharp-shot"
                onClick={() => {
                  const element = document.getElementById('see-sharp-shot');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                See How It Works
              </ChipButton>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative pt-16 pb-12 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 ref={whoWeAreHeadingRef} className="text-foreground text-3xl md:text-5xl font-bold mb-4" data-animate="fade-up">
            Who We Are
          </h2>
          <div className="text-muted-foreground text-lg md:text-xl leading-relaxed space-y-6">
            <p ref={whoWeAreParagraphRef} data-animate="fade-up">
              Sharp Shot provides the ultimate toolkit for serious bettors who want more than just tips, they want an edge. We combine cutting-edge algorithms with real-time sportsbook data to uncover +EV, arbitrage, and middling opportunities before the market adjusts. Our platform empowers you to customize, save, and share your own betting presets, turning strategy into repeatable profit.
            </p>
            <p ref={whoWeAreTaglineRef} className="text-primary font-semibold text-xl md:text-2xl" data-animate="fade-up">
              We're not here to sell picks. We're here to flip the odds in your favor.
            </p>
          </div>
        </div>
      </section>

      {/* Sharp Shot Terminal Demo Section */}
<section id="see-sharp-shot" className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 ref={seeSharpShotHeadingRef} className="text-foreground text-3xl md:text-5xl font-bold mb-4" data-animate="fade-up">
              See Sharp Shot in Action
            </h2>
            <p ref={seeSharpShotParagraphRef} className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto" data-animate="fade-up">
              Our Professional Calculator scans 47+ sportsbooks, showing you exactly which books offer the best odds and field averages.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-7xl w-full">
              {/* Trading Terminal */}
              <div ref={tradingTerminalRef} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden" data-animate="fade-up">
                {/* Terminal Header */}
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-primary text-sm">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M2 14L14 2M14 2H8M14 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">TRADING TERMINAL</h3>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        LIVE MARKET DATA
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-bold">
                        LIVE OPPORTUNITIES
                      </div>
                      <div className="text-muted-foreground text-sm">1:06:44 AM EST</div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Stats Dashboard */}
                <div className="bg-white dark:bg-gray-900 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="text-muted-foreground text-sm mb-1">BOOKS SCANNED</div>
                      <div className="text-foreground text-3xl font-bold">11</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground text-sm mb-1">+EV SIGNALS</div>
                      <div className="text-primary text-3xl font-bold">18</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground text-sm mb-1">AVG EV</div>
                      <div className="text-primary text-3xl font-bold">+3.2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground text-sm mb-1">LIVE ARBS</div>
                      <div className="text-primary text-3xl font-bold">3</div>
                    </div>
                  </div>
                </div>

                {/* Filter Controls */}
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">FILTER:</span>
                      <div className="flex gap-2">
                        <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium">All</button>
                        <button className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm font-medium hover:bg-secondary/80">+EV</button>
                        <button className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm font-medium hover:bg-secondary/80">Arbitrage</button>
                        <button className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm font-medium hover:bg-secondary/80">Middling</button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">SPORT:</span>
                      <select className="bg-background text-foreground px-3 py-1 rounded text-sm border border-border">
                        <option>All Sports</option>
                        <option>NFL</option>
                        <option>NBA</option>
                        <option>MLB</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">MIN EV:</span>
                      <select className="bg-background text-foreground px-3 py-1 rounded text-sm border border-border">
                        <option>1%+</option>
                        <option>2%+</option>
                        <option>3%+</option>
                        <option>5%+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Table Header */}
                <div className="bg-gray-100 dark:bg-gray-800 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-muted-foreground uppercase">
                    <div className="col-span-2">EVENT</div>
                    <div className="col-span-1">LEAGUE</div>
                    <div className="col-span-1">TYPE</div>
                    <div className="col-span-1">MARKET</div>
                    <div className="col-span-1">BOOK</div>
                    <div className="col-span-1">PROB</div>
                    <div className="col-span-1">EV%</div>
                    <div className="col-span-1">ODDS</div>
                    <div className="col-span-3">FIELD COMPARISON</div>
                  </div>
                </div>

                {/* Sample Bet Row */}
                <div className="bg-white dark:bg-gray-900 px-6 py-4 border-l-4 border-l-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="grid grid-cols-12 gap-2 text-sm items-center">
                    <div className="col-span-2">
                      <div className="text-foreground font-medium">San Diego Padres vs Arizona Diamondbacks</div>
                    </div>
                    <div className="col-span-1 text-primary">MLB</div>
                    <div className="col-span-1 text-muted-foreground">Over 5.5</div>
                    <div className="col-span-1 text-muted-foreground">1st Half</div>
                    <div className="col-span-1 text-primary font-medium">DraftKings</div>
                    <div className="col-span-1 text-foreground">59.0%</div>
                    <div className="col-span-1">
                      <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
                        +19.4%
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-center">
                        <div className="text-xs font-semibold">-111</div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex gap-1">
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-muted-foreground mb-1">Avg</div>
                          <div className="bg-yellow-600 text-black rounded px-2 py-1 text-xs font-bold">
                            -161
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-4 flex items-center">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          </div>
                          <div className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs">
                            -152
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-4 flex items-center">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs">
                            -175
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-1 h-4 flex items-center">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                          </div>
                          <div className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs">
                            -155
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gray-100 dark:bg-gray-800 px-6 py-6 text-center">
                  <p className="text-muted-foreground text-sm mb-4">
                    Real-time scanning • 11+ sportsbooks • Live +EV calculations • Professional edge detection
                  </p>
                  <ChipButton 
                    variant="primary"
                    href="/calculator"
                    onClick={scrollToTop}>
                    Access Trading Terminal
                  </ChipButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section - Main Value Props */}
<section className="relative py-12 px-6 md:px-12 scroll-mt-20 z-10" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 ref={builtForProHeadingRef} className="text-foreground text-3xl md:text-4xl font-bold mb-4" data-animate="fade-up">
              Built for Professional Bettors
            </h2>
            <p ref={builtForProParagraphRef} className="text-muted-foreground text-lg" data-animate="fade-up">
              Three core tools that give you the edge you need to profit consistently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div ref={featureCard1Ref} className="text-center group" data-animate="fade-up">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 ease-in-out">
                <i className="fas fa-clock text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Spot Real-Time Edges</h3>
              <p className="text-muted-foreground">Scan 40+ sportsbooks in seconds and uncover profitable lines with live +EV calculations.</p>
            </div>
            
            <div ref={featureCard2Ref} className="text-center group" data-animate="fade-up">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 ease-in-out">
                <i className="fas fa-eye text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Turn Insight Into Strategy</h3>
              <p className="text-muted-foreground">Save filters as Presets to build repeatable systems that scale your betting operation.</p>
            </div>
            
            <div ref={featureCard3Ref} className="text-center group" data-animate="fade-up">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 ease-in-out">
                <i className="fas fa-chart-bar text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Measure Your True Edge</h3>
              <p className="text-muted-foreground">Compare bets to closing lines to prove your sharpness and track performance over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
<section className="relative py-12 px-6 md:px-12 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 ref={readyToFindHeadingRef} className="text-foreground text-3xl md:text-4xl font-bold mb-4" data-animate="fade-up">
            Ready to find your edge?
          </h2>
          <p ref={readyToFindParagraphRef} className="text-muted-foreground text-lg mb-8" data-animate="fade-up">
            Join the sharps who make Sharp Shot their advantage.
          </p>
          <div ref={ctaButtonsRef} className="flex justify-center" data-animate="fade-up">
            <ChipButton 
              variant="primary"
              href="/pricing"
              onClick={scrollToTop}>
              View Memberships
            </ChipButton>
          </div>
        </div>
      </section>
    </div>
  );
}