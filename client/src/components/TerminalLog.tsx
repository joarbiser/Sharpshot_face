import { useState, useEffect, useRef } from 'react';

// Log lines pool (first batch)
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
        typewriterRef.current = setTimeout(type, 30 + Math.random() * 20); // 30-50ms per character
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
        return updated.slice(-4); // Keep only last 4 lines
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
      setVisibleLines(LOG_LINES.slice(0, 4));
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
      const delay = 1000 + Math.random() * 500; // 1-1.5 seconds
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
      <div className="relative h-32 overflow-hidden bg-black/5 dark:bg-black/20 rounded-lg border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm">
        
        {/* Top fade mask */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-gray-50/80 to-transparent dark:from-gray-900/80 dark:to-transparent z-10 pointer-events-none" />
        
        {/* Bottom fade mask */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-gray-50/80 to-transparent dark:from-gray-900/80 dark:to-transparent z-10 pointer-events-none" />
        
        {/* Terminal content */}
        <div className="absolute inset-0 p-3 font-mono text-sm">
          
          {/* Completed lines */}
          {visibleLines.map((line, index) => (
            <div 
              key={`${line}-${index}`} 
              className="flex items-start mb-1 text-gray-600 dark:text-gray-400"
              style={{ 
                animation: prefersReducedMotion() ? 'none' : 'fadeInUp 0.3s ease-out',
                animationDelay: prefersReducedMotion() ? '0s' : `${index * 0.1}s`
              }}
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