import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChipButton } from "@/components/ui/chip-button";
import { Moon, Sun, Monitor, Radar, Sliders, Users } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";
import { scrollToTop } from "@/utils/scrollToTop";

export default function Home() {
  const { theme } = useTheme();
  
  // Animation refs organized by vertical sections (elements at same level appear together)
  // Section 1: Who We Are
  const whoWeAreHeadingRef = useScrollAnimation<HTMLHeadingElement>();
  const whoWeAreParagraphRef = useScrollAnimation<HTMLParagraphElement>({ delay: 150 });
  const whoWeAreTaglineRef = useScrollAnimation<HTMLQuoteElement>({ delay: 300 });
  
  // Section 2: See Sharp Shot
  const seeSharpShotHeadingRef = useScrollAnimation<HTMLHeadingElement>();
  const seeSharpShotParagraphRef = useScrollAnimation<HTMLParagraphElement>({ delay: 150 });
  
  // Section 3: Built For Pro (heading and paragraph together)
  const builtForProHeadingRef = useScrollAnimation<HTMLHeadingElement>();
  const builtForProParagraphRef = useScrollAnimation<HTMLParagraphElement>({ delay: 150 });
  
  // Section 4: Ready to Find (heading and paragraph together)
  const readyToFindHeadingRef = useScrollAnimation<HTMLHeadingElement>();
  const readyToFindParagraphRef = useScrollAnimation<HTMLParagraphElement>({ delay: 150 });
  
  // Section 5: Feature cards (all appear simultaneously)
  const featureCard1Ref = useScrollAnimation<HTMLDivElement>();
  const featureCard2Ref = useScrollAnimation<HTMLDivElement>();
  const featureCard3Ref = useScrollAnimation<HTMLDivElement>();
  
  // Section 6: Trading terminal and buttons
  const tradingTerminalRef = useScrollAnimation<HTMLDivElement>();
  const ctaButtonsRef = useScrollAnimation<HTMLDivElement>({ delay: 150 });
  
  // Box/Card containers (animate first)
  const whoWeAreBoxRef = useScrollAnimation<HTMLDivElement>();
  const finalCtaBoxRef = useScrollAnimation<HTMLDivElement>();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      {/* Hero Section - New Layout with Prominent Faded Logo */}
      <section className="relative min-h-[90vh] flex items-center justify-between overflow-hidden px-8 md:px-16">
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
            <h1 className="text-foreground text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              It's not luck.<br />
              It's <span className="text-[#D8AC35]">leverage</span>.
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
      <section className="pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 ref={whoWeAreHeadingRef} className="text-foreground text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }} data-animate="fade-up">
              Who We Are
            </h2>
          </div>
          
          <div ref={whoWeAreBoxRef} className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60" data-animate="fade-up">
            <p ref={whoWeAreParagraphRef} className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6" data-animate="fade-up">
              Sharp Shot provides the ultimate toolkit for serious bettors who want more than just tips, they want an edge. We combine cutting-edge algorithms with real-time sportsbook data to uncover +EV, arbitrage, and middling opportunities before the market adjusts. Our platform empowers you to customize, save, and share your own betting presets, turning strategy into repeatable profit.
            </p>
            <div className="text-center mb-4">
              <div className="w-4 h-4 rounded-full bg-[#D8AC35] mx-auto mb-4 animate-pulse"></div>
            </div>
            <blockquote ref={whoWeAreTaglineRef} className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight text-center mb-6" data-animate="fade-up">
              We're not here to sell picks. We're here to flip the odds in your favor.
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-[0.2em]">Sharp Shot</span>
              <div className="h-px w-16 bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Sharp Shot Terminal Demo Section */}
<section id="see-sharp-shot" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 ref={seeSharpShotHeadingRef} className="text-foreground text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }} data-animate="fade-up">
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
                      <div className="text-[#D8AC35] text-sm">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M2 14L14 2M14 2H8M14 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">TRADING TERMINAL</h3>
                      <div className="flex items-center gap-2 text-sm text-[#D8AC35]">
                        <div className="w-2 h-2 bg-[#D8AC35] rounded-full animate-pulse"></div>
                        LIVE MARKET DATA
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-[#D8AC35] text-black px-3 py-1 rounded text-sm font-bold">
                        LIVE OPPORTUNITIES
                      </div>
                      <div className="text-muted-foreground text-sm">1:06:44 AM EST</div>
                      <div className="w-2 h-2 bg-[#D8AC35] rounded-full animate-pulse"></div>
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
                      <div className="text-[#D8AC35] text-3xl font-bold">18</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground text-sm mb-1">AVG EV</div>
                      <div className="text-[#D8AC35] text-3xl font-bold">+3.2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground text-sm mb-1">LIVE ARBS</div>
                      <div className="text-[#D8AC35] text-3xl font-bold">3</div>
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
                    href="/pricing"
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
<section className="py-12 px-6 md:px-12 scroll-mt-20" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
              BUILT FOR PROFESSIONAL BETTORS
            </div>
            <h2 ref={builtForProHeadingRef} className="text-foreground text-2xl md:text-3xl font-normal mb-4 max-w-2xl mx-auto" data-animate="fade-up">
              Three tools designed to sharpen your edge and make winning repeatable.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1: Spot Edges in Real Time */}
            <div ref={featureCard1Ref} className="group bg-gray-900 dark:bg-gray-800 rounded-lg border border-gray-700 dark:border-gray-600 p-6 transition-all duration-300 hover:transform hover:translate-y-[-4px] hover:border-[#D8AC35] hover:shadow-lg focus-within:ring-2 focus-within:ring-[#D8AC35] motion-reduce:hover:transform-none motion-reduce:transition-none" data-animate="fade-up">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Radar className="w-6 h-6 text-[#D8AC35]" />
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                    Spot Edges in Real Time
                  </h3>
                </div>
                <div className="text-[#D8AC35] font-bold text-sm group-hover:animate-pulse motion-reduce:animate-none">
                  40+ Books
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Instantly scan 40+ sportsbooks to surface profitable lines with live +EV analysis.
              </p>
            </div>

            {/* Card 2: Systematize Your Strategy */}
            <div ref={featureCard2Ref} className="group bg-gray-900 dark:bg-gray-800 rounded-lg border border-gray-700 dark:border-gray-600 p-6 transition-all duration-300 hover:transform hover:translate-y-[-4px] hover:border-[#D8AC35] hover:shadow-lg focus-within:ring-2 focus-within:ring-[#D8AC35] motion-reduce:hover:transform-none motion-reduce:transition-none" data-animate="fade-up">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sliders className="w-6 h-6 text-[#D8AC35] group-hover:animate-pulse motion-reduce:animate-none" />
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                    Systematize Your Strategy
                  </h3>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-4 bg-gray-600 rounded-sm group-hover:animate-pulse motion-reduce:animate-none"></div>
                  <div className="w-2 h-4 bg-[#D8AC35] rounded-sm"></div>
                  <div className="w-2 h-4 bg-gray-600 rounded-sm"></div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Save filters as Presets to create repeatable systems and scale your betting.
              </p>
            </div>

            {/* Card 3: Collaborate and Share */}
            <div ref={featureCard3Ref} className="group bg-gray-900 dark:bg-gray-800 rounded-lg border border-gray-700 dark:border-gray-600 p-6 transition-all duration-300 hover:transform hover:translate-y-[-4px] hover:border-[#D8AC35] hover:shadow-lg focus-within:ring-2 focus-within:ring-[#D8AC35] motion-reduce:hover:transform-none motion-reduce:transition-none" data-animate="fade-up">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#D8AC35]" />
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                    Collaborate and Share
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-8 h-4" viewBox="0 0 32 16">
                    <polyline points="2,14 8,6 14,10 20,2 26,8" stroke="#D8AC35" strokeWidth="2" fill="none" className="group-hover:animate-pulse motion-reduce:animate-none"/>
                    <circle cx="26" cy="8" r="2" fill="#D8AC35" className="group-hover:animate-ping motion-reduce:animate-none"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Invite others into private presets or share strategies publicly to refine your edge together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
<section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div ref={finalCtaBoxRef} className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 text-center transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60" data-animate="fade-up">
            <h2 ref={readyToFindHeadingRef} className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }} data-animate="fade-up">
              Ready to find your edge?
            </h2>
            <p ref={readyToFindParagraphRef} className="text-gray-600 dark:text-gray-300 text-lg mb-8" data-animate="fade-up">
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
        </div>
      </section>
    </div>
  );
}