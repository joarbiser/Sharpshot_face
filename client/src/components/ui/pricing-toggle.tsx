import { useState } from "react";
import { cn } from "@/lib/utils";

interface PricingToggleProps {
  onToggle: (isAnnual: boolean) => void;
  className?: string;
}

export function PricingToggle({ onToggle, className }: PricingToggleProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleToggle = (annual: boolean) => {
    setIsAnnual(annual);
    onToggle(annual);
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1.5 flex w-56 relative border border-gray-300/30 dark:border-gray-700/30">
        <button
          onClick={() => handleToggle(false)}
          className={cn(
            "flex-1 py-3 px-6 text-sm font-semibold rounded-xl transition-all duration-500 z-10 relative transform hover:scale-[1.02]",
            !isAnnual 
              ? "bg-white dark:bg-gray-900 shadow-xl text-gray-900 dark:text-white ring-1 ring-gray-900/5 dark:ring-white/10" 
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => handleToggle(true)}
          className={cn(
            "flex-1 py-3 px-6 text-sm font-semibold rounded-xl transition-all duration-500 z-10 relative transform hover:scale-[1.02]",
            isAnnual 
              ? "bg-white dark:bg-gray-900 shadow-xl text-gray-900 dark:text-white ring-1 ring-gray-900/5 dark:ring-white/10" 
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          )}
        >
          Annual
        </button>
      </div>
      <span className="ml-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">Save 2 months</span>
    </div>
  );
}
