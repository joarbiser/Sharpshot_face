import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ChipButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
  href?: string;
  as?: "button" | "a";
  loading?: boolean;
  disabled?: boolean;
}

const ChipButton = forwardRef<HTMLElement, ChipButtonProps>(
  ({ className, variant = "primary", children, href, as, loading, disabled, ...props }, ref) => {
    const baseClass = "chip-btn";
    const isDisabled = disabled || loading;
    
    const classes = cn(
      // Base chip styles
      baseClass,
      "relative inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 transition-all duration-200 ease-out cursor-pointer font-bold text-base uppercase tracking-widest",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset",
      "active:scale-[0.98]",
      // Respect reduced motion
      "motion-reduce:transition-colors motion-reduce:active:scale-100",
      
      // Disabled/loading states
      isDisabled && [
        "opacity-50 pointer-events-none",
        "motion-reduce:transition-none"
      ],
      
      // Primary variant (accent token)
      variant === "primary" && [
        "border-[#D8AC35] text-[#D8AC35] bg-[#D8AC35]/5",
        !isDisabled && "hover:border-[#E8BC45] hover:bg-[#D8AC35]/15 hover:text-[#E8BC45]",
        "focus-visible:ring-[#D8AC35]"
      ],
      
      // Secondary variant (neutral token)
      variant === "secondary" && [
        "border-gray-500 dark:border-gray-400 text-gray-700 dark:text-gray-300 bg-gray-100/50 dark:bg-gray-800/50",
        !isDisabled && "hover:border-gray-600 dark:hover:border-gray-300 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 hover:text-gray-800 dark:hover:text-gray-200",
        "focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400"
      ],
      
      className
    );

    const content = (
      <>
        {loading && <Loader2 size={16} className="flex-shrink-0 animate-spin" />}
        <span className="min-w-0">{children}</span>
      </>
    );

    if (href || as === "a") {
      return (
        <a
          className={classes}
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          aria-disabled={isDisabled}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        className={classes}
        disabled={isDisabled}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

ChipButton.displayName = "ChipButton";

export { ChipButton };