import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import '@fontsource/press-start-2p';

interface TickerItem {
  id: string;
  text: string;
  sport: string;
  emoji: string;
}

export function SportsTicker() {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);

  // Fetch live sports data
  const { data: gamesData } = useQuery({
    queryKey: ['/api/sports/games/today'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: eventsData } = useQuery({
    queryKey: ['/api/sports/events/recent'],
    refetchInterval: 15000, // Refresh every 15 seconds for live events
  });

  useEffect(() => {
    const items: TickerItem[] = [];

    // Process games data
    if (gamesData?.games?.length > 0) {
      gamesData.games.slice(0, 10).forEach((game: any) => {
        const sportEmoji = getSportEmoji(game.sport);
        const timeOrScore = game.team1Score !== undefined && game.team2Score !== undefined
          ? `${game.team1Score} - ${game.team2Score}`
          : formatGameTime(game.time);
        
        items.push({
          id: `game-${game.gameID}`,
          text: `${sportEmoji} ${game.team1City || ''} ${game.team1Name} vs ${game.team2City || ''} ${game.team2Name} • ${timeOrScore}`,
          sport: game.sport,
          emoji: sportEmoji
        });
      });
    }

    // Process live events data
    if (eventsData?.events?.length > 0) {
      eventsData.events.slice(0, 5).forEach((event: any) => {
        const sportEmoji = getSportEmoji(event.sport);
        items.push({
          id: `event-${event.eventID}`,
          text: `${sportEmoji} LIVE: ${event.message} • ${event.team1Score || 0} - ${event.team2Score || 0}`,
          sport: event.sport,
          emoji: sportEmoji
        });
      });
    }

    // Fallback to demo data if no real data available
    if (items.length === 0) {
      const demoItems = [
        { id: '1', text: '⚽ Man City vs Arsenal • 19:30 • 2 - 1', sport: 'Soccer', emoji: '⚽' },
        { id: '2', text: '🏀 Celtics vs Lakers • 20:00 • 98 - 103', sport: 'NBA', emoji: '🏀' },
        { id: '3', text: '🏈 Chiefs vs 49ers • 21:15 • Starts Soon', sport: 'NFL', emoji: '🏈' },
        { id: '4', text: '🏒 Rangers vs Bruins • LIVE • 3 - 2', sport: 'NHL', emoji: '🏒' },
        { id: '5', text: '⚾ Yankees vs Red Sox • 19:45 • 7 - 4', sport: 'MLB', emoji: '⚾' },
        { id: '6', text: '🎾 Djokovic vs Nadal • FINAL • 6-4, 6-2', sport: 'Tennis', emoji: '🎾' },
        { id: '7', text: '🏎️ F1 Monaco GP • Qualifying • Verstappen P1', sport: 'F1', emoji: '🏎️' },
        { id: '8', text: '🥊 UFC 300 • Main Event • 22:00 ET', sport: 'MMA', emoji: '🥊' },
      ];
      items.push(...demoItems);
    }

    setTickerItems(items);
  }, [gamesData, eventsData]);

  const getSportEmoji = (sport: string): string => {
    const emojiMap: { [key: string]: string } = {
      'nfl': '🏈',
      'nba': '🏀',
      'mlb': '⚾',
      'nhl': '🏒',
      'soccer': '⚽',
      'football': '⚽',
      'tennis': '🎾',
      'f1': '🏎️',
      'formula1': '🏎️',
      'mma': '🥊',
      'ufc': '🥊',
      'boxing': '🥊',
      'golf': '⛳',
      'cricket': '🏏',
      'basketball': '🏀',
      'hockey': '🏒',
      'baseball': '⚾',
      'wnba': '🏀',
    };
    return emojiMap[sport?.toLowerCase()] || '🏆';
  };

  const formatGameTime = (timestamp: number): string => {
    if (!timestamp) return 'TBD';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 0) {
      return 'LIVE';
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (tickerItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black dark:bg-gray-900 border-t border-green-500/30 dark:border-green-400/30 overflow-hidden h-12">
      <div className="relative h-full flex items-center">
        <div 
          className="whitespace-nowrap flex items-center animate-scroll"
          style={{
            animation: `scroll ${tickerItems.length * 20}s linear infinite`
          }}
        >
          {/* Duplicate items for seamless loop */}
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={`${item.id}-${index}`}
              className="inline-block text-green-400 dark:text-green-300 text-sm font-semibold px-8 tracking-wide"
              style={{ 
                fontFamily: '"Press Start 2P", "Courier New", monospace',
                textShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
                filter: 'brightness(1.1)',
                fontSize: '11px'
              }}
            >
              {item.text}
              <span className="text-green-600 dark:text-green-500 mx-4">|</span>
            </span>
          ))}
        </div>
        
        {/* Gradient fade edges */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black dark:from-gray-900 dark:via-transparent dark:to-gray-900"></div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .px-8 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}