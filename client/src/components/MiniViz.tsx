import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MiniVizProps {
  type: "collab" | "books" | "slider";
  trigger?: boolean;
}

export function MiniViz({ type, trigger = false }: MiniVizProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [bookCount, setBookCount] = useState(40);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (trigger && !isAnimating) {
      setIsAnimating(true);
      
      // Book counter animation for "books" type
      if (type === "books" && !prefersReducedMotion) {
        const sequence = [42, 44, 40];
        let step = 0;
        const countInterval = setInterval(() => {
          if (step < sequence.length) {
            setBookCount(sequence[step]);
            step++;
          } else {
            clearInterval(countInterval);
          }
        }, 250);
      }
      
      // Reset animation after completion
      const duration = type === "books" ? 1100 : 1000;
      const timer = setTimeout(() => {
        setIsAnimating(false);
        if (type === "books") {
          setBookCount(40);
        }
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [trigger, isAnimating, type]);

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

  if (type === "books") {
    return (
      <div className="relative">
        {/* Radar sweep background */}
        <div className="absolute inset-0 w-8 h-6 overflow-hidden">
          <motion.div
            className="absolute w-4 h-4 bg-gradient-to-r from-transparent via-[#D8AC35]/20 to-transparent rounded-full"
            initial={{ x: -16, opacity: 0 }}
            animate={isAnimating ? {
              x: [32, 16, 0],
              opacity: [0, 0.6, 0]
            } : { x: -16, opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Badge */}
        <div className="bg-[#D8AC35]/10 border border-[#D8AC35]/30 rounded px-2 py-1 text-xs font-medium text-[#D8AC35] relative z-10">
          {bookCount}+ Books
        </div>
      </div>
    );
  }

  if (type === "slider") {
    return (
      <div className="flex items-center gap-1 relative">
        {/* Two-handle slider track */}
        <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full relative">
          {/* Left handle */}
          <motion.div
            className="absolute w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full top-1/2 -translate-y-1/2"
            initial={{ left: "10%" }}
            animate={isAnimating ? {
              left: ["10%", "20%"]
            } : { left: "10%" }}
            transition={{
              duration: 0.3,
              delay: 0.1
            }}
          />
          
          {/* Right handle */}
          <motion.div
            className="absolute w-2 h-2 bg-[#D8AC35] rounded-full top-1/2 -translate-y-1/2"
            initial={{ right: "15%" }}
            animate={isAnimating ? {
              right: ["15%", "25%"]
            } : { right: "15%" }}
            transition={{
              duration: 0.3,
              delay: 0.2
            }}
          />
          
          {/* Checkmark */}
          <motion.div
            className="absolute -top-3 right-0 w-3 h-3 text-[#D8AC35] text-xs flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={isAnimating ? {
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0]
            } : { opacity: 0, scale: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              times: [0, 0.2, 0.8, 1]
            }}
          >
            ✓
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}