import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MiniVizProps {
  type: "collab";
  trigger?: boolean;
}

export function MiniViz({ type, trigger = false }: MiniVizProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (trigger && !isAnimating && !prefersReducedMotion) {
      setIsAnimating(true);
      // Reset animation after completion
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, isAnimating]);

  if (type === "collab") {
    return (
      <div className="flex items-center justify-center w-8 h-6">
        <svg 
          className="w-8 h-6" 
          viewBox="0 0 32 24" 
          aria-label="Network collaboration visualization"
        >
          {/* 4 nodes in diamond formation */}
          <circle cx="16" cy="4" r="2" className="fill-gray-400 dark:fill-gray-500" /> {/* top */}
          <circle cx="8" cy="12" r="2" className="fill-gray-400 dark:fill-gray-500" /> {/* left */}
          <circle cx="24" cy="12" r="2" className="fill-gray-400 dark:fill-gray-500" /> {/* right */}
          <circle cx="16" cy="20" r="2" className="fill-gray-400 dark:fill-gray-500" /> {/* bottom */}
          
          {/* Lines - drawn in sequence on hover */}
          
          {/* Line 1: top to left */}
          <motion.line
            x1="16" y1="4" x2="8" y2="12"
            className="stroke-gray-300 dark:stroke-gray-600"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, stroke: "rgb(156 163 175)" }}
            animate={isAnimating ? {
              pathLength: 1,
              stroke: ["rgb(156 163 175)", "#D8AC35", "rgb(156 163 175)"],
            } : { pathLength: 0, stroke: "rgb(156 163 175)" }}
            transition={{
              pathLength: { duration: 0.2, delay: 0 },
              stroke: { duration: 0.8, times: [0, 0.25, 1] }
            }}
            style={{
              strokeDasharray: "1 1",
              strokeLinecap: "round"
            }}
          />
          
          {/* Line 2: left to bottom */}
          <motion.line
            x1="8" y1="12" x2="16" y2="20"
            className="stroke-gray-300 dark:stroke-gray-600"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, stroke: "rgb(156 163 175)" }}
            animate={isAnimating ? {
              pathLength: 1,
              stroke: ["rgb(156 163 175)", "#D8AC35", "rgb(156 163 175)"],
            } : { pathLength: 0, stroke: "rgb(156 163 175)" }}
            transition={{
              pathLength: { duration: 0.2, delay: 0.2 },
              stroke: { duration: 0.8, delay: 0.2, times: [0, 0.25, 1] }
            }}
            style={{
              strokeDasharray: "1 1",
              strokeLinecap: "round"
            }}
          />
          
          {/* Line 3: bottom to right */}
          <motion.line
            x1="16" y1="20" x2="24" y2="12"
            className="stroke-gray-300 dark:stroke-gray-600"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, stroke: "rgb(156 163 175)" }}
            animate={isAnimating ? {
              pathLength: 1,
              stroke: ["rgb(156 163 175)", "#D8AC35", "rgb(156 163 175)"],
            } : { pathLength: 0, stroke: "rgb(156 163 175)" }}
            transition={{
              pathLength: { duration: 0.2, delay: 0.4 },
              stroke: { duration: 0.8, delay: 0.4, times: [0, 0.25, 1] }
            }}
            style={{
              strokeDasharray: "1 1",
              strokeLinecap: "round"
            }}
          />
          
          {/* Line 4: right to top */}
          <motion.line
            x1="24" y1="12" x2="16" y2="4"
            className="stroke-gray-300 dark:stroke-gray-600"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, stroke: "rgb(156 163 175)" }}
            animate={isAnimating ? {
              pathLength: 1,
              stroke: ["rgb(156 163 175)", "#D8AC35", "rgb(156 163 175)"],
            } : { pathLength: 0, stroke: "rgb(156 163 175)" }}
            transition={{
              pathLength: { duration: 0.2, delay: 0.6 },
              stroke: { duration: 0.8, delay: 0.6, times: [0, 0.25, 1] }
            }}
            style={{
              strokeDasharray: "1 1",
              strokeLinecap: "round"
            }}
          />
          
          {/* Final opacity boost for all lines */}
          <motion.g
            initial={{ opacity: 1 }}
            animate={isAnimating ? {
              opacity: [1, 1.5, 1]
            } : { opacity: 1 }}
            transition={{
              duration: 0.2,
              delay: 0.8,
              times: [0, 0.5, 1]
            }}
          >
            {/* This creates the brief highlight effect after all lines are drawn */}
          </motion.g>
        </svg>
      </div>
    );
  }

  return null;
}