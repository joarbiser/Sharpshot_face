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
    <div className={`flex space-x-4 ${className}`}>
      {categories.map((category) => {
        const info = BetCategorizer.getCategoryInfo(category);
        const isActive = activeCategory === category;
        const count = stats[category];
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-200
              flex items-center gap-2 border-2
              ${isActive 
                ? 'bg-[#D8AC35] dark:bg-[#00ff41] text-black border-[#D8AC35] dark:border-[#00ff41] shadow-lg' 
                : 'bg-white/10 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-white/20 dark:hover:bg-gray-700/50 hover:border-gray-400 dark:hover:border-gray-500'
              }
            `}
            title={info.description}
          >
            <span>{info.label}</span>
            {count > 0 && (
              <span className={`
                text-xs px-2 py-1 rounded-full font-bold min-w-[24px] text-center
                ${isActive 
                  ? 'bg-black/20 text-black' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
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