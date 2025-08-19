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
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {/* Segmented Pill Toggle */}
      <div className="bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full p-1 flex w-48 relative border border-gray-200/50 dark:border-gray-700/50 focus-within:ring-2 focus-within:ring-[#D8AC35]/20">
        <button
          onClick={() => handleToggle(false)}
          className={cn(
            "flex-1 py-2.5 px-4 text-sm font-medium rounded-full transition-all duration-300 z-10 relative focus:outline-none",
            !isAnnual 
              ? "bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white border border-gray-200/20 dark:border-gray-700/20" 
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => handleToggle(true)}
          className={cn(
            "flex-1 py-2.5 px-4 text-sm font-medium rounded-full transition-all duration-300 z-10 relative focus:outline-none",
            isAnnual 
              ? "bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white border border-gray-200/20 dark:border-gray-700/20" 
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          )}
        >
          Annual
        </button>
      </div>
      
      {/* Save 2 Months Pill - Always reserve space */}
      <div className="w-[120px] h-[36px] flex items-center justify-center">
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition-all duration-300",
          isAnnual 
            ? "border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 opacity-100" 
            : "border-transparent bg-transparent text-transparent opacity-0"
        )}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D8AC35]"></div>
          Save 2 months
        </div>
      </div>
    </div>
  );
}
