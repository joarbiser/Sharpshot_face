import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Radar, Sliders, Users } from "lucide-react";
import { MiniViz } from "./MiniViz";

export function ProBettorsScrollScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start center", "end center"]
  });
  
  // Check if we're on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Map scroll progress to individual card animation ranges
  // Card 1: 0.0 → 0.33 (Spot Edges) 
  const card1Progress = useTransform(scrollYProgress, [0, 0.33], [0, 1]);
  
  // Card 2: 0.33 → 0.66 (Systematize)
  const card2Progress = useTransform(scrollYProgress, [0.33, 0.66], [0, 1]);
  
  // Card 3: 0.66 → 1.0 (Collaborate)
  const card3Progress = useTransform(scrollYProgress, [0.66, 1.0], [0, 1]);

  // Mobile fallback: simple reveal without sticky
  if (isMobile) {
    return (
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-foreground text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.05em] mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              BUILT FOR PROFESSIONAL BETTORS
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Three tools designed to sharpen your edge and make winning repeatable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Mobile cards with simple animations */}
            <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Radar className="w-6 h-6 text-[#D8AC35]" />
                  <h3 className="text-foreground font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                    Spot Edges in Real Time
                  </h3>
                </div>
                <div className="bg-[#D8AC35]/10 border border-[#D8AC35]/30 rounded px-2 py-1 text-xs font-medium text-[#D8AC35]">
                  40+ Books
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                Instantly scan 40+ sportsbooks to surface profitable lines with live +EV analysis.
              </p>
            </div>

            <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sliders className="w-6 h-6 text-[#D8AC35]" />
                  <h3 className="text-foreground font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                    Systematize Your Strategy
                  </h3>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-4 bg-gray-400 dark:bg-gray-600 rounded-sm"></div>
                  <div className="w-2 h-4 bg-[#D8AC35] rounded-sm"></div>
                  <div className="w-2 h-4 bg-gray-400 dark:bg-gray-600 rounded-sm"></div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                Save filters as Presets to create repeatable systems and scale your betting.
              </p>
            </div>

            <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#D8AC35]" />
                  <h3 className="text-foreground font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                    Collaborate and Share
                  </h3>
                </div>
                <MiniViz type="collab" trigger={true} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Invite others into private presets or share strategies publicly to refine your edge together.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={sceneRef} className="relative h-[150vh]" style={{ position: 'relative' }}>
      {/* Sticky container that pins the cards */}
      <div className="sticky top-0 h-screen flex items-center py-12 px-6 md:px-12" style={{ position: 'sticky' }}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-foreground text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.05em] mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontStyle: 'italic', transform: 'skew(-5deg)' }}>
              BUILT FOR PROFESSIONAL BETTORS
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Three tools designed to sharpen your edge and make winning repeatable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1: Spot Edges in Real Time */}
            <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-300 hover:shadow-lg hover:border-[#D8AC35]/40 dark:hover:border-[#D8AC35]/40 hover:-translate-y-1 hover:shadow-[#D8AC35]/10 focus-within:ring-2 focus-within:ring-[#D8AC35]/20 focus-within:border-[#D8AC35]/50 focus-within:-translate-y-1"
              tabIndex={0}
              aria-label="Spot Edges in Real Time — instant sportsbook scanning"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Radar className="w-6 h-6 text-[#D8AC35]" />
                  <h3 className="text-foreground font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                    Spot Edges in Real Time
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <MiniViz type="edges" progress={card1Progress} />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                Instantly scan 40+ sportsbooks to surface profitable lines with live +EV analysis.
              </p>
            </div>

            {/* Card 2: Systematize Your Strategy */}
            <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-300 hover:shadow-lg hover:border-[#D8AC35]/40 dark:hover:border-[#D8AC35]/40 hover:-translate-y-1 hover:shadow-[#D8AC35]/10 focus-within:ring-2 focus-within:ring-[#D8AC35]/20 focus-within:border-[#D8AC35]/50 focus-within:-translate-y-1"
              tabIndex={0}
              aria-label="Systematize Your Strategy — create repeatable betting systems"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sliders className="w-6 h-6 text-[#D8AC35]" />
                  <h3 className="text-foreground font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                    Systematize Your Strategy
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <MiniViz type="presets" progress={card2Progress} />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                Save filters as Presets to create repeatable systems and scale your betting.
              </p>
            </div>

            {/* Card 3: Collaborate and Share */}
            <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-300 hover:shadow-lg hover:border-[#D8AC35]/40 dark:hover:border-[#D8AC35]/40 hover:-translate-y-1 hover:shadow-[#D8AC35]/10 focus-within:ring-2 focus-within:ring-[#D8AC35]/20 focus-within:border-[#D8AC35]/50 focus-within:-translate-y-1"
              tabIndex={0}
              aria-label="Collaborate and Share — invite others to refine strategies together"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#D8AC35]" />
                  <h3 className="text-foreground font-bold text-lg" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
                    Collaborate and Share
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <MiniViz type="collab" progress={card3Progress} />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Invite others into private presets or share strategies publicly to refine your edge together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}