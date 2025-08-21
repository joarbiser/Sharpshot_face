import { useState, useEffect } from "react";
import { motion, useTransform } from "framer-motion";

interface MiniVizProps {
  type: "collab" | "books" | "slider" | "edges" | "presets";
  trigger?: boolean;
  progress?: any; // MotionValue from useTransform
}

export function MiniViz({ type, trigger = false, progress }: MiniVizProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [bookCount, setBookCount] = useState(40);
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

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
    // For scroll-driven, use progress to draw lines sequentially
    if (progress) {
      const line1Progress = useTransform(progress, [0, 0.25], [0, 1]);
      const line2Progress = useTransform(progress, [0.25, 0.5], [0, 1]);
      const line3Progress = useTransform(progress, [0.5, 0.75], [0, 1]);
      const line4Progress = useTransform(progress, [0.75, 1], [0, 1]);
      const goldHighlight = useTransform(progress, [0.9, 1], [0, 1]);
      
      return (
        <div className="flex items-center justify-center w-8 h-6">
          <svg className="w-8 h-6" viewBox="0 0 32 24" aria-label="Network collaboration visualization">
            {/* 4 nodes in diamond formation */}
            <circle cx="16" cy="4" r="2" className="fill-gray-400 dark:fill-gray-500" />
            <circle cx="8" cy="12" r="2" className="fill-gray-400 dark:fill-gray-500" />
            <circle cx="24" cy="12" r="2" className="fill-gray-400 dark:fill-gray-500" />
            <circle cx="16" cy="20" r="2" className="fill-gray-400 dark:fill-gray-500" />
            
            {/* Lines drawn by scroll progress */}
            <motion.line
              x1="16" y1="4" x2="8" y2="12"
              className="stroke-gray-300 dark:stroke-gray-600"
              strokeWidth="1.5"
              fill="none"
              style={{
                pathLength: prefersReducedMotion ? 1 : line1Progress,
                stroke: prefersReducedMotion ? "rgb(156 163 175)" : 
                  useTransform(goldHighlight, [0, 1], ["rgb(156 163 175)", "#D8AC35"]),
                strokeLinecap: "round"
              }}
            />
            <motion.line
              x1="8" y1="12" x2="16" y2="20"
              className="stroke-gray-300 dark:stroke-gray-600"
              strokeWidth="1.5"
              fill="none"
              style={{
                pathLength: prefersReducedMotion ? 1 : line2Progress,
                stroke: prefersReducedMotion ? "rgb(156 163 175)" : 
                  useTransform(goldHighlight, [0, 1], ["rgb(156 163 175)", "#D8AC35"]),
                strokeLinecap: "round"
              }}
            />
            <motion.line
              x1="16" y1="20" x2="24" y2="12"
              className="stroke-gray-300 dark:stroke-gray-600"
              strokeWidth="1.5"
              fill="none"
              style={{
                pathLength: prefersReducedMotion ? 1 : line3Progress,
                stroke: prefersReducedMotion ? "rgb(156 163 175)" : 
                  useTransform(goldHighlight, [0, 1], ["rgb(156 163 175)", "#D8AC35"]),
                strokeLinecap: "round"
              }}
            />
            <motion.line
              x1="24" y1="12" x2="16" y2="4"
              className="stroke-gray-300 dark:stroke-gray-600"
              strokeWidth="1.5"
              fill="none"
              style={{
                pathLength: prefersReducedMotion ? 1 : line4Progress,
                stroke: prefersReducedMotion ? "rgb(156 163 175)" : 
                  useTransform(goldHighlight, [0, 1], ["rgb(156 163 175)", "#D8AC35"]),
                strokeLinecap: "round"
              }}
            />
          </svg>
        </div>
      );
    }
    
    // Fallback for hover-triggered animation (original behavior)
    return (
      <div className="flex items-center justify-center w-8 h-6">
        <svg 
          className="w-8 h-6" 
          viewBox="0 0 32 24" 
          aria-label="Network collaboration visualization"
        >
          {/* 4 nodes in diamond formation */}
          <circle cx="16" cy="4" r="2" className="fill-gray-400 dark:fill-gray-500" />
          <circle cx="8" cy="12" r="2" className="fill-gray-400 dark:fill-gray-500" />
          <circle cx="24" cy="12" r="2" className="fill-gray-400 dark:fill-gray-500" />
          <circle cx="16" cy="20" r="2" className="fill-gray-400 dark:fill-gray-500" />
          
          {/* Lines - drawn in sequence on hover */}
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

  if (type === "edges") {
    // Card 1: Radar sweep + book counter driven by scroll progress
    const rotation = progress ? useTransform(progress, [0, 1], [0, 540]) : { get: () => 0 };
    const currentCount = progress ? useTransform(progress, [0, 0.5, 0.8, 1], [40, 42, 44, 40]) : { get: () => 40 };
    const pingOpacity = progress ? useTransform(progress, [0.25, 0.35, 0.45], [0, 1, 0]) : { get: () => 0 };
    
    return (
      <div className="relative">
        {/* Radar sweep */}
        <div className="absolute inset-0 w-8 h-6 overflow-hidden">
          <motion.div
            className="absolute w-4 h-4 bg-gradient-to-r from-transparent via-[#D8AC35]/20 to-transparent rounded-full"
            style={{
              rotate: prefersReducedMotion ? 0 : rotation,
              opacity: prefersReducedMotion ? 0.3 : 0.6,
              x: 2,
              y: 1
            }}
          />
          
          {/* Ping dot */}
          <motion.div
            className="absolute w-2 h-2 bg-[#D8AC35] rounded-full"
            style={{
              opacity: pingOpacity,
              x: 20,
              y: 8
            }}
          />
        </div>
        
        {/* Book counter badge */}
        <motion.div 
          className="bg-[#D8AC35]/10 border border-[#D8AC35]/30 rounded px-2 py-1 text-xs font-medium text-[#D8AC35] relative z-10"
          style={{
            scale: progress ? useTransform(progress, [0.2, 0.4, 0.6], [1, 1.05, 1]) : 1
          }}
        >
          {Math.round(currentCount?.get() || 40)}+ Books
        </motion.div>
      </div>
    );
  }

  if (type === "presets") {
    // Card 2: Slider handles + checkmark driven by scroll progress
    const leftHandle = progress ? useTransform(progress, [0, 1], [10, 20]) : { get: () => 10 };
    const rightHandle = progress ? useTransform(progress, [0, 1], [85, 75]) : { get: () => 85 };
    const checkmarkOpacity = progress ? useTransform(progress, [0.65, 0.75, 0.9], [0, 1, 0]) : { get: () => 0 };
    
    return (
      <div className="flex items-center gap-1 relative">
        {/* Slider track */}
        <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full relative">
          {/* Left handle */}
          <motion.div
            className="absolute w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full top-1/2 -translate-y-1/2"
            style={{
              left: prefersReducedMotion ? "10%" : `${leftHandle?.get() || 10}%`
            }}
          />
          
          {/* Right handle (gold) */}
          <motion.div
            className="absolute w-2 h-2 bg-[#D8AC35] rounded-full top-1/2 -translate-y-1/2"
            style={{
              right: prefersReducedMotion ? "15%" : `${100 - (rightHandle?.get() || 85)}%`
            }}
          />
          
          {/* Checkmark */}
          <motion.div
            className="absolute -top-3 right-0 w-3 h-3 text-[#D8AC35] text-xs flex items-center justify-center"
            style={{
              opacity: checkmarkOpacity,
              scale: progress ? useTransform(checkmarkOpacity, [0, 1], [0.5, 1]) : 0.5
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