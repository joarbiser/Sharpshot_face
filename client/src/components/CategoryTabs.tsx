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
    <div className={`flex space-x-1 bg-gray-800/50 dark:bg-gray-900/50 rounded-lg p-1 backdrop-blur-sm ${className}`}>
      {categories.map((category) => {
        const info = BetCategorizer.getCategoryInfo(category);
        const isActive = activeCategory === category;
        const count = stats[category];
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              relative px-4 py-2 rounded-lg font-mono text-sm font-medium transition-all duration-200
              flex items-center gap-2 min-w-[120px] justify-center
              ${isActive 
                ? 'bg-[#D8AC35] dark:bg-[#00ff41] text-black dark:text-black shadow-lg' 
                : 'text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white hover:bg-gray-700/50 dark:hover:bg-gray-800/50'
              }
            `}
            title={info.description}
          >
            <span className="text-xs">{info.icon}</span>
            <span>{info.label}</span>
            {count > 0 && (
              <span className={`
                text-xs px-1.5 py-0.5 rounded-full font-bold
                ${isActive 
                  ? 'bg-black/20 dark:bg-black/20 text-black dark:text-black' 
                  : 'bg-gray-600/50 dark:bg-gray-700/50 text-gray-300 dark:text-gray-400'
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