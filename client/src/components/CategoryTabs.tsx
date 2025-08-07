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
    <div className={`flex items-center gap-1 ${className}`}>
      {categories.map((category) => {
        const info = BetCategorizer.getCategoryInfo(category);
        const isActive = activeCategory === category;
        const count = stats[category];
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              relative px-5 py-2.5 font-mono text-sm font-medium transition-all duration-300
              flex items-center gap-2 border-0 overflow-hidden group
              ${isActive 
                ? 'bg-gradient-to-r from-[#D8AC35]/20 to-[#D8AC35]/10 dark:from-[#00ff41]/20 dark:to-[#00ff41]/10 text-[#D8AC35] dark:text-[#00ff41] shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-[#D8AC35] dark:hover:text-[#00ff41] hover:bg-gray-50/50 dark:hover:bg-gray-800/30'
              }
              before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:transition-all before:duration-300
              ${isActive 
                ? 'before:bg-[#D8AC35] dark:before:bg-[#00ff41] before:opacity-100' 
                : 'before:bg-[#D8AC35] dark:before:bg-[#00ff41] before:opacity-0 group-hover:before:opacity-50'
              }
            `}
            title={info.description}
          >
            <span className="relative z-10">{info.label}</span>
            {count > 0 && (
              <span className={`
                relative z-10 text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center
                transition-all duration-300
                ${isActive 
                  ? 'bg-[#D8AC35]/20 dark:bg-[#00ff41]/20 text-[#D8AC35] dark:text-[#00ff41]' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-[#D8AC35]/10 dark:group-hover:bg-[#00ff41]/10'
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
      ${category === 'arbitrage' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
      ${category === 'middling' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : ''}
    `}>
      <span>{info.icon}</span>
      <span>{info.label}</span>
      {category === 'arbitrage' && arbitrageProfit && (
        <span className="text-green-400">+${arbitrageProfit.toFixed(2)}</span>
      )}
    </div>
  );
}