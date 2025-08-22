import { useState, useEffect, useRef } from 'react';

// Log lines pool (batches 1-6 - Complete Collection)
const LOG_LINES = [
  "> Analysis initialized... Precision over luck",
  "> Data stream active... Real-time odds analysis", 
  "> Suite loaded... Professional-grade tools ready",
  "> Market scan running... Edges detected",
  "> Arbitrage engine online... Multi-book sync", 
  "> Probability models calibrated... De-vig applied",
  "> Transparency check... Passed",
  "> Secure session established... Terminal unlocked",
  "> Line movement detected... Alerts primed",
  "> Odds feed synchronized... Books connected",
  "> Value detected... +EV identified",
  "> System resources optimized... Latency minimized",
  "> Historical models loaded... CLV tracking enabled",
  "> Neural nets warmed... Pattern recognition live",
  "> Variance buffer calibrated... Risk controlled",
  "> User presets loaded... Filters synced",
  "> Pro tier features... Auto-save enabled",
  "> Unlimited tier features... Priority support online",
  "> Discord link verified... Community highlights synced",
  "> Payout models verified... Unit sizing accurate",
  "> Best price located... Shop the number",
  "> Market snapshot saved... Closing line tracked",
  "> Watchlist armed... Movement monitoring",
  "> Feed health... All providers green",
  "> Book priority set... Preference respected",
  "> Preset fork ready... Collaboration allowed",
  "> Public preset metrics... Followers counted",
  "> Creator bios fetched... Profiles visible",
  "> Edge confirmation... Confidence above threshold",
  "> Line origin mapped... Source confirmed",
  "> Probability normalized... De-vig complete",
  "> CLV delta computed... Advantage measurable",
  "> Kelly fraction calculated... Stake suggested",
  "> Risk guardrails... Max exposure enforced",
  "> Alert pipeline queued... Triggers armed",
  "> Session integrity... Tokens validated",
  "> Encryption active... Transport secure",
  "> Cache warmed... Cold start avoided",
  "> API latency within SLA... Smooth",
  "> Throttle control... Rate limits respected",
  "> Retry strategy armed... Backoff configured",
  "> Book catalog refreshed... Inventory current",
  "> Multi-sport matrix... Leagues indexed",
  "> Market depth parsed... Liquidity noted",
  "> Props model loaded... Player projections ready",
  "> SGP builder awareness... Correlations flagged",
  "> Parlay guard... Leg correlation checked",
  "> Middle window scanned... Ranges identified",
  "> Hedging helpers... Counter-legs proposed",
  "> Arbitrage coverage... Cross-book verified",
  "> Steam detection... Fast moves spotted",
  "> Injury feed parsed... Status updated",
  "> Weather model synced... Impact assessed",
  "> Umpire trends pulled... Context applied",
  "> Pace factors merged... Tempo adjusted",
  "> Form curve updated... Recent performance weighted",
  "> Limits respected... Stake capped",
  "> Unit sizing locked... Bankroll preserved",
  "> Exposure map saved... Diversification OK",
  "> Market open... Live monitoring",
  "> Pre-game focus... Latency advantage",
  "> In-play roadmap... Not yet enabled",
  "> Pricing engine stable... No drift",
  "> Decimal conversion... Implied probability aligned",
  "> American odds parsed... Normalized",
  "> Fractional odds parsed... Normalized",
  "> Hold computed... Book margin extracted",
  "> True price inferred... De-vig successful",
  "> Misprice candidate... Review queued",
  "> Duplicate removed... Unique edge kept",
  "> Confidence band widened... Volatility high",
  "> Confidence band tightened... Volatility low",
  "> Time-to-close tracked... Window shrinking",
  "> Closing line bias... Trend noted",
  "> Market consensus... Agreement high",
  "> Market dispersion... Disagreement high",
  "> Correlated legs flagged... SGP caution",
  "> Uncorrelated legs approved... SGP green",
  "> Props outliers... Projection variance found",
  "> Starter confirmed... Lineups locked",
  "> Goalie change detected... Repricing triggered",
  "> Pitching swap detected... Repricing triggered",
  "> Pace uptick... Totals pressure up",
  "> Pace slowdown... Totals pressure down",
  "> Injury questionable... Probabilities adjusted",
  "> Injury probable... Probabilities adjusted",
  "> Injury out... Market shock possible",
  "> News event parsed... Feed integrated",
  "> Limit move suspected... Sharp action signal",
  "> Public money spike... Sentiment skewed",
  "> Book shade detected... Off-market price",
  "> Mirror line found... Cross-book match",
  "> Teaser protection... Key numbers guarded",
  "> Key numbers mapped... 3 7 10 noted",
  "> Distribution fit checked... Model okay",
  "> Bootstrap sample... Uncertainty estimated",
  "> Monte Carlo batch... Scenario tested",
  "> Allocation updated... Portfolio rebalanced",
  "> CLV stored... Session benchmarked",
  "> Alert delivered... User notified",
];

// Keywords to highlight
const KEYWORDS = [
  'Precision', '+EV', 'Arbitrage', 'Middle', 'CLV', 'De-vig', 'Kelly', 'Secure',
  'Real-time', 'Professional-grade', 'Analysis', 'Market', 'Probability', 
  'Transparency', 'Terminal', 'Odds', 'Data', 'Edges', 'Multi-book', 'Sync'
];

interface TerminalLogProps {
  className?: string;
}

export default function TerminalLog({ className = '' }: TerminalLogProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [shuffledLines, setShuffledLines] = useState<string[]>([]);
  const animationRef = useRef<number>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const typewriterRef = useRef<NodeJS.Timeout>();
  const cursorRef = useRef<NodeJS.Timeout>();

  // Shuffle array utility
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Escape special regex characters
  const escapeRegex = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Highlight keywords in text
  const highlightKeywords = (text: string) => {
    let highlightedText = text;
    KEYWORDS.forEach(keyword => {
      const escapedKeyword = escapeRegex(keyword);
      const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(
        regex, 
        `<span class="font-bold text-white dark:text-white">${keyword}</span>`
      );
    });
    return highlightedText;
  };

  // Check if prefers-reduced-motion is set
  const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  // Typewriter effect
  const typewriterEffect = (text: string, callback: () => void) => {
    if (prefersReducedMotion()) {
      setTypewriterText(text);
      callback();
      return;
    }

    setTypewriterText('');
    let i = 0;
    
    const type = () => {
      if (i < text.length) {
        setTypewriterText(text.slice(0, i + 1));
        i++;
        typewriterRef.current = setTimeout(type, 20 + Math.random() * 10); // 20-30ms per character
      } else {
        callback();
      }
    };
    
    type();
  };

  // Add new line with typewriter effect
  const addNewLine = () => {
    if (shuffledLines.length === 0) return;

    const newLine = shuffledLines[currentLineIndex];
    
    typewriterEffect(newLine, () => {
      setVisibleLines(prev => {
        const updated = [...prev, newLine];
        return updated.slice(-6); // Keep only last 6 lines
      });
      
      setTypewriterText('');
      setCurrentLineIndex(prev => {
        const next = prev + 1;
        if (next >= shuffledLines.length) {
          // Reshuffle and start over
          setShuffledLines(shuffleArray(LOG_LINES));
          return 0;
        }
        return next;
      });
    });
  };

  // Initialize component
  useEffect(() => {
    if (prefersReducedMotion()) {
      // Show all lines immediately if motion is reduced
      setVisibleLines(LOG_LINES.slice(0, 6));
      return;
    }

    // Initialize with shuffled lines
    const initialShuffled = shuffleArray(LOG_LINES);
    setShuffledLines(initialShuffled);
    
    // Start with first line
    setCurrentLineIndex(0);
    
    // Add first line immediately
    typewriterEffect(initialShuffled[0], () => {
      setVisibleLines([initialShuffled[0]]);
      setTypewriterText('');
      setCurrentLineIndex(1);
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current);
      }
      if (cursorRef.current) {
        clearTimeout(cursorRef.current);
      }
    };
  }, []);

  // Handle periodic line additions
  useEffect(() => {
    if (prefersReducedMotion() || visibleLines.length === 0) return;

    const scheduleNext = () => {
      const delay = 800 + Math.random() * 400; // 0.8-1.2 seconds
      timeoutRef.current = setTimeout(() => {
        addNewLine();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visibleLines, shuffledLines, currentLineIndex]);

  // Cursor blink effect
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const blinkCursor = () => {
      setShowCursor(prev => !prev);
      cursorRef.current = setTimeout(blinkCursor, 500);
    };

    blinkCursor();

    return () => {
      if (cursorRef.current) {
        clearTimeout(cursorRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Terminal container with fade masks */}
      <div className="relative h-48 overflow-hidden bg-black/5 dark:bg-black/20 rounded-lg border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm">
        
        {/* Top fade mask */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-50/80 to-transparent dark:from-gray-900/80 dark:to-transparent z-10 pointer-events-none" />
        
        {/* Bottom fade mask */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-50/80 to-transparent dark:from-gray-900/80 dark:to-transparent z-10 pointer-events-none" />
        
        {/* Terminal content */}
        <div className="absolute inset-0 p-4 font-mono text-sm leading-relaxed">
          
          {/* Completed lines */}
          {visibleLines.map((line, index) => (
            <div 
              key={`${line}-${index}`} 
              className="flex items-start mb-1.5 text-gray-600 dark:text-gray-400"
            >
              <span className="text-[#D8AC35] mr-2 flex-shrink-0">{'>'}</span>
              <span 
                dangerouslySetInnerHTML={{ 
                  __html: highlightKeywords(line.replace('> ', '')) 
                }} 
              />
            </div>
          ))}
          
          {/* Current typing line */}
          {typewriterText && (
            <div className="flex items-start text-gray-600 dark:text-gray-400">
              <span className="text-[#D8AC35] mr-2 flex-shrink-0">{'>'}</span>
              <span>
                <span 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightKeywords(typewriterText.replace('> ', '')) 
                  }} 
                />
                {/* Blinking cursor */}
                <span 
                  className={`inline-block w-2 h-4 bg-[#D8AC35] ml-1 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    transition: prefersReducedMotion() ? 'none' : 'opacity 0.1s ease-in-out' 
                  }}
                />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}