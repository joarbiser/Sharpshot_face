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
  const whoWeAreTaglineRef = useScrollAnimation<HTMLDivElement>({ delay: 300 });
  
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
      <section className="relative min-h-screen flex items-center justify-between overflow-hidden px-8 md:px-16">
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
            <h1 className="text-foreground text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-tight mb-8" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              <span className="shimmer-text">
                It's not luck.<br />
                It's <span className="text-[#D8AC35]">leverage</span>.
              </span>
            </h1>
            
            <p className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-12 leading-relaxed">
              Built for sharp minds. Powered by sharp tools.<br />
              Advanced algorithms scan multiple sportsbooks in real-time to identify profitable betting opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center md:justify-end mt-2">
              <ChipButton 
                variant="primary"
                href="/calculator"
                onClick={scrollToTop}
                className="text-xl md:text-2xl px-10 py-5 rounded-full">
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
                }}
                className="text-xl md:text-2xl px-10 py-5 rounded-full">
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
            <h2 ref={whoWeAreHeadingRef} className="text-foreground text-4xl md:text-5xl lg:text-6xl mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }} data-animate="fade-up">
              WHO WE ARE
            </h2>
          </div>
          
          <div ref={whoWeAreParagraphRef} className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 mb-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60" data-animate="fade-up">
            <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed">
              Sharp Shot provides the ultimate toolkit for serious bettors who want more than just tips, they want an edge. We combine cutting-edge algorithms with real-time sportsbook data to uncover +EV, arbitrage, and middling opportunities before the market adjusts. Our platform empowers you to customize, save, and share your own betting presets, turning strategy into repeatable profit.
            </p>
          </div>
          <div ref={whoWeAreTaglineRef} className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60" data-animate="fade-up">
            <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight text-center">
              We're not here to sell picks. We're here to flip the odds in your favor.
            </blockquote>
          </div>
        </div>
      </section>


      {/* Sharp Shot Terminal Demo Section */}
<section id="see-sharp-shot" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 ref={seeSharpShotHeadingRef} className="text-foreground text-4xl md:text-5xl lg:text-6xl mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }} data-animate="fade-up">
              SEE SHARP SHOT IN ACTION
            </h2>
            <p ref={seeSharpShotParagraphRef} className="text-gray-600 dark:text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" data-animate="fade-up">
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
            <h2 ref={builtForProHeadingRef} className="text-foreground text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.05em] mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }} data-animate="fade-up">
              BUILT FOR PROFESSIONAL BETTORS
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Three tools designed to sharpen your edge and make winning repeatable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1: Spot Edges in Real Time */}
            <div ref={featureCard1Ref} className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60" data-animate="fade-up">
              <div className="flex items-center gap-3 mb-4">
                <Radar className="w-6 h-6 text-[#D8AC35]" />
                <h3 className="text-foreground font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                  Spot Edges in Real Time
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                Instantly scan 40+ sportsbooks to surface profitable lines with live +EV analysis.
              </p>
            </div>

            {/* Card 2: Systematize Your Strategy */}
            <div ref={featureCard2Ref} className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60" data-animate="fade-up">
              <div className="flex items-center gap-3 mb-4">
                <Sliders className="w-6 h-6 text-[#D8AC35]" />
                <h3 className="text-foreground font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                  Systematize Your Strategy
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                Save filters as Presets to create repeatable systems and scale your betting.
              </p>
            </div>

            {/* Card 3: Collaborate and Share */}
            <div ref={featureCard3Ref} className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60" data-animate="fade-up">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-[#D8AC35]" />
                <h3 className="text-foreground font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                  Collaborate and Share
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Invite others into private presets or share strategies publicly to refine your edge together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
<section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div ref={readyToFindHeadingRef} className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60" data-animate="fade-up">
              <h2 className="text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                READY TO FIND YOUR EDGE?
              </h2>
            </div>
            <div ref={readyToFindParagraphRef} className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60" data-animate="fade-up">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Join the sharps who make Sharp Shot their advantage.
              </p>
            </div>
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