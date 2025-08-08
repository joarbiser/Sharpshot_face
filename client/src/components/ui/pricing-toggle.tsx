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
      <div className="bg-gray-100 rounded-full p-1 flex w-48 relative">
        <button
          onClick={() => handleToggle(false)}
          className={cn(
            "flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 z-10 relative",
            !isAnnual ? "bg-white shadow-md text-gray-900" : "text-gray-600"
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => handleToggle(true)}
          className={cn(
            "flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 z-10 relative",
            isAnnual ? "bg-white shadow-md text-gray-900" : "text-gray-600"
          )}
        >
          Annual
        </button>
      </div>
      <span className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-bold">Save 2 months</span>
    </div>
  );
}
