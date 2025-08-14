import { BetCategorizer, type BetCategory } from "../../../shared/betCategories";

interface CategoryTabsProps {
  activeCategory: BetCategory;
  onCategoryChange: (category: BetCategory) => void;
  opportunities: any[];
  className?: string;
}

export function CategoryTabs({ activeCategory, onCategoryChange, opportunities, className = "" }: CategoryTabsProps) {
  const stats = BetCategorizer.getCategoryStats(opportunities);
  
  const categories: BetCategory[] = ['all', 'ev', 'arbitrage', 'middling'];
  
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {categories.map((category) => {
        const info = BetCategorizer.getCategoryInfo(category);
        const isActive = activeCategory === category;
        const count = stats[category];
        const isComingSoon = category === 'arbitrage' || category === 'middling';
        
        return (
          <button
            key={category}
            onClick={() => !isComingSoon && onCategoryChange(category)}
            className={`
              relative font-mono text-sm font-medium transition-all duration-200
              flex items-center gap-2 bg-transparent border-none outline-none py-2 px-3 rounded-lg
              ${isComingSoon 
                ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60' 
                : isActive 
                  ? 'text-[#D8AC35] dark:text-[#D8AC35] bg-[#D8AC35]/10 dark:bg-[#D8AC35]/10' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
              }
            `}
            title={isComingSoon ? `${info.label} - Coming Soon` : info.description}
            disabled={isComingSoon}
          >
            <span>{info.label}</span>
            {isComingSoon && (
              <span className="text-xs px-2 py-1 rounded-full font-bold bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400">
                Soon
              </span>
            )}
            {!isComingSoon && count > 0 && (
              <span className={`
                text-xs px-2 py-1 rounded-full font-bold
                ${isActive 
                  ? 'bg-[#D8AC35] text-black dark:bg-[#D8AC35] dark:text-black' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }
              `}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function CategoryBadge({ category, arbitrageProfit }: { category: BetCategory; arbitrageProfit?: number }) {
  const info = BetCategorizer.getCategoryInfo(category);
  
  if (category === 'ev') return null; // Don't show badge for regular +EV
  
  return (
    <div className={`
      inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono font-bold
      ${category === 'arbitrage' ? 'bg-gold-dark/20 text-gold-dark border border-gold-dark/30' : ''}
      ${category === 'middling' ? 'bg-gold-light/20 text-gold-light border border-gold-light/30' : ''}
    `}>
      <span>{info.icon}</span>
      <span>{info.label}</span>
      {category === 'arbitrage' && arbitrageProfit && (
        <span className="text-gold">+${arbitrageProfit.toFixed(2)}</span>
      )}
    </div>
  );
}