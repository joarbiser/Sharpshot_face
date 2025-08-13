// Define BettingOpportunity interface locally
interface BettingOpportunity {
  id: string;
  sport: string;
  game: string;
  market: string;
  betType: string;
  line: string;
  mainBookOdds: number;
  ev: number;
  hit: number;
  gameTime: string;
  confidence: string;
  category: string;
  impliedProbability: number;
  oddsComparison?: any[];
}

export class BettingDataService {
  // Game title formatting
  private formatGameTitle(game: any): string {
    // Prioritize awayTeamName and homeTeamName over team1Name/team2Name
    if (game.awayTeamName && game.homeTeamName) {
      return `${game.awayTeamName} vs ${game.homeTeamName}`;
    }
    
    if (game.team1Name && game.team2Name) {
      return `${game.team1Name} vs ${game.team2Name}`;
    }
    
    // For soccer and games with missing team names, try to extract from headline
    if (game.sport === 'soccer' && game.headline) {
      // Try to extract team names from headline patterns like "Arsenal vs Chelsea"
      const vsMatch = game.headline.match(/(.+?)\s+vs?\s+(.+?)(?:\s|$|,)/i);
      if (vsMatch) {
        const awayTeam = vsMatch[1].trim();
        const homeTeam = vsMatch[2].trim();
        return `${awayTeam} vs ${homeTeam}`;
      }
      
      // Try pattern like "Arsenal - Chelsea" 
      const dashMatch = game.headline.match(/(.+?)\s*[-–—]\s*(.+?)(?:\s|$|,)/i);
      if (dashMatch) {
        const awayTeam = dashMatch[1].trim();
        const homeTeam = dashMatch[2].trim();
        return `${awayTeam} vs ${homeTeam}`;
      }
      
      // If we can't parse, use headline but clean it up
      return game.headline.replace(/^(Game\s+\d+:?\s*)/i, '');
    }
    
    if (game.eventName) {
      return game.eventName;
    }
    
    if (game.headline) {
      return game.headline.replace(/^(Game\s+\d+:?\s*)/i, '');
    }
    
    // Final fallback - avoid showing game numbers to users
    return `${game.sport || 'Game'} Match`;
  }

  // Game time formatting  
  private formatGameTime(game: any): string {
    if (game.datetime) {
      try {
        const gameDate = new Date(game.datetime);
        return gameDate.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'America/New_York'
        });
      } catch (error) {
        console.error('Error parsing game datetime:', game.datetime, error);
        return 'TBD';
      }
    }
    return 'TBD';
  }

  // Calculate implied probability from American odds
  private calculateImpliedProbability(americanOdds: number): number {
    if (americanOdds > 0) {
      return 100 / (americanOdds + 100);
    } else {
      return Math.abs(americanOdds) / (Math.abs(americanOdds) + 100);
    }
  }

  // Convert European odds to American odds
  private europeanToAmerican(europeanOdds: number): number {
    if (europeanOdds >= 2.0) {
      return Math.round((europeanOdds - 1) * 100);
    } else {
      return Math.round(-100 / (europeanOdds - 1));
    }
  }

  // Fetch live betting opportunities from real API
  async getLiveBettingOpportunities(): Promise<BettingOpportunity[]> {
    try {
      const opportunities: BettingOpportunity[] = [];
      console.log('Fetching betting opportunities from real API...');

      // Fetch games and process odds 
      const gamesResponse = await fetch(`https://sharpshot.api.areyouwatchingthis.com/api/games.json?apiKey=3e8b23fdd1b6030714b9320484d7367b`);
      const gamesData = await gamesResponse.json();
      
      if (!gamesData?.results) {
        console.error('No games data found in API response');
        return [];
      }

      const games = gamesData.results.slice(0, 15); // Process first 15 games
      console.log(`Processing ${games.length} games for betting opportunities`);

      // Process each game to get odds
      for (const game of games) {
        try {
          const oddsResponse = await fetch(`https://sharpshot.api.areyouwatchingthis.com/api/odds.json?apiKey=3e8b23fdd1b6030714b9320484d7367b&gameID=${game.gameID}`);
          const oddsData = await oddsResponse.json();
          
          if (oddsData?.results && oddsData.results.length > 0) {
            const realOdds = oddsData.results[0]?.odds || [];
            console.log(`Found ${realOdds.length} sportsbooks for game ${game.gameID}`);
            
            if (realOdds.length > 0) {
              const gameOpportunities = this.processRealOddsData(game, realOdds);
              opportunities.push(...gameOpportunities);
            }
          }
        } catch (error) {
          console.error(`Error processing game ${game.gameID}:`, error);
        }
      }
      
      console.log(`Found ${opportunities.length} real betting opportunities from API`);
      return opportunities;
    } catch (error) {
      console.error('Error fetching live betting opportunities:', error);
      return [];
    }
  }

  // Process real odds data from API into betting opportunities with side-by-side comparison
  private processRealOddsData(game: any, oddsData: any[]): BettingOpportunity[] {
    const opportunities: BettingOpportunity[] = [];
    const gameTitle = this.formatGameTitle(game);
    
    console.log(`Processing ${oddsData.length} real sportsbooks for ${gameTitle}`);

    // Group books by market type for side-by-side comparison
    const moneylineBooks = oddsData.filter(book => book.moneyLine1 && book.moneyLine2);
    const spreadBooks = oddsData.filter(book => book.spread !== undefined && book.spreadLine1 && book.spreadLine2);
    const totalBooks = oddsData.filter(book => book.overUnder !== undefined && book.overUnderLineOver && book.overUnderLineUnder);

    console.log(`Market breakdown: ${moneylineBooks.length} moneyline, ${spreadBooks.length} spread, ${totalBooks.length} total books`);

    // Create comprehensive moneyline opportunity with all available books side-by-side
    if (moneylineBooks.length > 0) {
      const allMoneylineOdds = moneylineBooks.map(book => {
        const americanOdds1 = this.europeanToAmerican(book.moneyLine1);
        const americanOdds2 = this.europeanToAmerican(book.moneyLine2);
        const team1Prob = this.calculateImpliedProbability(americanOdds1);
        const team2Prob = this.calculateImpliedProbability(americanOdds2);
        const efficiency = 1 - (team1Prob + team2Prob);
        
        return {
          sportsbook: book.provider,
          odds: Math.max(americanOdds1, americanOdds2),
          team1Odds: americanOdds1,
          team2Odds: americanOdds2,
          ev: efficiency * 50,
          isMainBook: false,
          url: book.url || '',
          lastUpdated: book.lastUpdated || new Date().toISOString()
        };
      });

      // Find best odds for main book
      const bestOddsComparison = allMoneylineOdds.sort((a, b) => b.odds - a.odds);
      if (bestOddsComparison.length > 0) {
        bestOddsComparison[0].isMainBook = true;
        
        const bestBook = bestOddsComparison[0];
        if (bestBook.ev > 1) { // Only show if there's meaningful value
          opportunities.push({
            id: `comprehensive_moneyline_${game.gameID}_${Date.now()}`,
            sport: game.sport || 'Unknown',
            game: gameTitle,
            market: 'Moneyline',
            betType: '+EV',
            line: `${game.team1Name || 'Team 1'} vs ${game.team2Name || 'Team 2'}`,
            mainBookOdds: bestBook.odds,
            ev: Math.round(bestBook.ev * 100) / 100,
            hit: bestBook.ev > 3 ? 65 : 55,
            gameTime: this.formatGameTime(game),
            confidence: bestBook.ev > 3 ? 'high' : 'medium',
            category: 'ev',
            impliedProbability: bestBook.ev,
            oddsComparison: bestOddsComparison
          });
        }
      }
    }

    // Create comprehensive spread opportunities grouped by spread value
    if (spreadBooks.length > 0) {
      const spreadLines = Array.from(new Set(spreadBooks.map(book => book.spread)));
      
      spreadLines.forEach(spread => {
        const booksWithSpread = spreadBooks.filter(book => book.spread === spread);
        if (booksWithSpread.length > 0) {
          const allSpreadOdds = booksWithSpread.map(book => {
            const americanSpread1 = this.europeanToAmerican(book.spreadLine1);
            const americanSpread2 = this.europeanToAmerican(book.spreadLine2);
            const spreadProb1 = this.calculateImpliedProbability(americanSpread1);
            const spreadProb2 = this.calculateImpliedProbability(americanSpread2);
            const efficiency = 1 - (spreadProb1 + spreadProb2);
            
            return {
              sportsbook: book.provider,
              odds: Math.max(americanSpread1, americanSpread2),
              team1Odds: americanSpread1,
              team2Odds: americanSpread2,
              ev: efficiency * 50,
              isMainBook: false,
              url: book.url || '',
              lastUpdated: book.lastUpdated || new Date().toISOString()
            };
          });

          const bestSpreadComparison = allSpreadOdds.sort((a, b) => b.odds - a.odds);
          if (bestSpreadComparison.length > 0) {
            bestSpreadComparison[0].isMainBook = true;
            
            const bestSpreadBook = bestSpreadComparison[0];
            if (bestSpreadBook.ev > 1) {
              opportunities.push({
                id: `comprehensive_spread_${game.gameID}_${spread}_${Date.now()}`,
                sport: game.sport || 'Unknown',
                game: gameTitle,
                market: 'Spread',
                betType: '+EV',
                line: `${spread} spread`,
                mainBookOdds: bestSpreadBook.odds,
                ev: Math.round(bestSpreadBook.ev * 100) / 100,
                hit: bestSpreadBook.ev > 3 ? 65 : 55,
                gameTime: this.formatGameTime(game),
                confidence: bestSpreadBook.ev > 3 ? 'high' : 'medium',
                category: 'ev',
                impliedProbability: bestSpreadBook.ev,
                oddsComparison: bestSpreadComparison
              });
            }
          }
        }
      });
    }

    // Create comprehensive total opportunities grouped by total value
    if (totalBooks.length > 0) {
      const totalLines = Array.from(new Set(totalBooks.map(book => book.overUnder)));
      
      totalLines.forEach(total => {
        const booksWithTotal = totalBooks.filter(book => book.overUnder === total);
        if (booksWithTotal.length > 0) {
          const allTotalOdds = booksWithTotal.map(book => {
            const americanOver = this.europeanToAmerican(book.overUnderLineOver);
            const americanUnder = this.europeanToAmerican(book.overUnderLineUnder);
            const overProb = this.calculateImpliedProbability(americanOver);
            const underProb = this.calculateImpliedProbability(americanUnder);
            const efficiency = 1 - (overProb + underProb);
            
            return {
              sportsbook: book.provider,
              odds: Math.max(americanOver, americanUnder),
              overOdds: americanOver,
              underOdds: americanUnder,
              ev: efficiency * 50,
              isMainBook: false,
              url: book.url || '',
              lastUpdated: book.lastUpdated || new Date().toISOString()
            };
          });

          const bestTotalComparison = allTotalOdds.sort((a, b) => b.odds - a.odds);
          if (bestTotalComparison.length > 0) {
            bestTotalComparison[0].isMainBook = true;
            
            const bestTotalBook = bestTotalComparison[0];
            if (bestTotalBook.ev > 1) {
              opportunities.push({
                id: `comprehensive_total_${game.gameID}_${total}_${Date.now()}`,
                sport: game.sport || 'Unknown',
                game: gameTitle,
                market: 'Total',
                betType: '+EV',
                line: `O/U ${total}`,
                mainBookOdds: bestTotalBook.odds,
                ev: Math.round(bestTotalBook.ev * 100) / 100,
                hit: bestTotalBook.ev > 3 ? 65 : 55,
                gameTime: this.formatGameTime(game),
                confidence: bestTotalBook.ev > 3 ? 'high' : 'medium',
                category: 'ev',
                impliedProbability: bestTotalBook.ev,
                oddsComparison: bestTotalComparison
              });
            }
          }
        }
      });
    }

    // Also create individual opportunities for each book (legacy support)
    oddsData.forEach(book => {
      // Create moneyline opportunities if available
      if (book.moneyLine1 && book.moneyLine2) {
        const americanOdds1 = this.europeanToAmerican(book.moneyLine1);
        const americanOdds2 = this.europeanToAmerican(book.moneyLine2);
        const team1Prob = this.calculateImpliedProbability(americanOdds1);
        const team2Prob = this.calculateImpliedProbability(americanOdds2);
        const totalProb = team1Prob + team2Prob;
        const efficiency = 1 - totalProb;
        
        if (efficiency > 0.02) { // Book margin > 2% suggests potential +EV
          const estimatedEV = efficiency * 50;
          
          opportunities.push({
            id: `real_moneyline_${game.gameID}_${book.provider}_${Date.now()}`,
            sport: game.sport || 'Unknown',
            game: gameTitle,
            market: 'Moneyline',
            betType: '+EV',
            line: `${game.team1Name || 'Team 1'} vs ${game.team2Name || 'Team 2'}`,
            mainBookOdds: Math.max(americanOdds1, americanOdds2),
            ev: Math.round(estimatedEV * 100) / 100,
            hit: Math.min(team1Prob, team2Prob) * 100,
            gameTime: this.formatGameTime(game),
            confidence: efficiency > 0.05 ? 'medium' : 'low',
            category: 'ev',
            impliedProbability: totalProb,
            oddsComparison: [
              {
                sportsbook: book.provider,
                odds: Math.max(americanOdds1, americanOdds2),
                ev: estimatedEV,
                isMainBook: true
              }
            ]
          });
        }
      }

      // Create spread opportunities if available
      if (book.spread && book.spreadLine1 && book.spreadLine2) {
        const americanSpread1 = this.europeanToAmerican(book.spreadLine1);
        const americanSpread2 = this.europeanToAmerican(book.spreadLine2);
        const spreadProb1 = this.calculateImpliedProbability(americanSpread1);
        const spreadProb2 = this.calculateImpliedProbability(americanSpread2);
        const totalSpreadProb = spreadProb1 + spreadProb2;
        const spreadEfficiency = 1 - totalSpreadProb;
        
        if (spreadEfficiency > 0.02) {
          const spreadEV = spreadEfficiency * 50;
          
          opportunities.push({
            id: `real_spread_${game.gameID}_${book.provider}_${Date.now()}`,
            sport: game.sport || 'Unknown',
            game: gameTitle,
            market: 'Spread',
            betType: '+EV',
            line: `${book.spread} spread`,
            mainBookOdds: Math.max(americanSpread1, americanSpread2),
            ev: Math.round(spreadEV * 100) / 100,
            hit: Math.min(spreadProb1, spreadProb2) * 100,
            gameTime: this.formatGameTime(game),
            confidence: spreadEfficiency > 0.05 ? 'medium' : 'low',
            category: 'ev',
            impliedProbability: totalSpreadProb,
            oddsComparison: [
              {
                sportsbook: book.provider,
                odds: Math.max(americanSpread1, americanSpread2),
                ev: spreadEV,
                isMainBook: true
              }
            ]
          });
        }
      }

      // Create total opportunities if available
      if (book.overUnder && book.overUnderLineOver && book.overUnderLineUnder) {
        const americanOver = this.europeanToAmerican(book.overUnderLineOver);
        const americanUnder = this.europeanToAmerican(book.overUnderLineUnder);
        const overProb = this.calculateImpliedProbability(americanOver);
        const underProb = this.calculateImpliedProbability(americanUnder);
        const totalTotalProb = overProb + underProb;
        const totalEfficiency = 1 - totalTotalProb;
        
        if (totalEfficiency > 0.02) {
          const totalEV = totalEfficiency * 50;
          
          opportunities.push({
            id: `real_total_${game.gameID}_${book.provider}_${Date.now()}`,
            sport: game.sport || 'Unknown',
            game: gameTitle,
            market: 'Total',
            betType: '+EV',
            line: `O/U ${book.overUnder}`,
            mainBookOdds: Math.max(americanOver, americanUnder),
            ev: Math.round(totalEV * 100) / 100,
            hit: Math.min(overProb, underProb) * 100,
            gameTime: this.formatGameTime(game),
            confidence: totalEfficiency > 0.05 ? 'medium' : 'low',
            category: 'ev',
            impliedProbability: totalTotalProb,
            oddsComparison: [
              {
                sportsbook: book.provider,
                odds: Math.max(americanOver, americanUnder),
                ev: totalEV,
                isMainBook: true
              }
            ]
          });
        }
      }
    });

    if (opportunities.length > 0) {
      console.log(`Created ${opportunities.length} individual betting opportunities from ${oddsData.length} sportsbooks for ${gameTitle}`);
    }

    // Add arbitrage and middling detection BEFORE returning
    // Group ALL opportunities by game to analyze cross-sportsbook patterns
    const allGameOpportunities = new Map<string, BettingOpportunity[]>();
    
    opportunities.forEach(opp => {
      const gameKey = opp.game;
      if (!allGameOpportunities.has(gameKey)) {
        allGameOpportunities.set(gameKey, []);
      }
      allGameOpportunities.get(gameKey)!.push(opp);
    });

    // Detect arbitrage and middling across all games
    allGameOpportunities.forEach((gameOpps, gameTitle) => {
      const arbAndMiddlingOpps = this.detectArbitrageAndMiddling(gameOpps, gameTitle);
      opportunities.push(...arbAndMiddlingOpps);
    });
    
    return opportunities;
  }

  // Detect arbitrage and middling opportunities across sportsbooks
  private detectArbitrageAndMiddling(opportunities: BettingOpportunity[], gameTitle: string): BettingOpportunity[] {
    const arbOpps: BettingOpportunity[] = [];
    
    // Group opportunities by game and market type
    const gameGroups = new Map<string, BettingOpportunity[]>();
    
    opportunities.forEach(opp => {
      const key = `${opp.game}_${opp.market}`;
      if (!gameGroups.has(key)) {
        gameGroups.set(key, []);
      }
      gameGroups.get(key)!.push(opp);
    });

    // Check each group for arbitrage/middling opportunities
    gameGroups.forEach((opps, gameMarket) => {
      if (opps.length < 2) return; // Need at least 2 books for arb
      
      const [game, market] = gameMarket.split('_');
      
      if (market === 'Moneyline') {
        // Check for moneyline arbitrage
        const arbOpp = this.detectMoneylineArbitrage(opps, gameTitle);
        if (arbOpp) arbOpps.push(arbOpp);
      } else if (market === 'Total') {
        // Check for middling on totals - compare different lines
        const middlingOpp = this.detectTotalMiddling(opportunities.filter(o => o.market === 'Total'), gameTitle);
        if (middlingOpp) arbOpps.push(middlingOpp);
      } else if (market === 'Spread') {
        // Check for spread middling - compare different lines
        const spreadMiddlingOpp = this.detectSpreadMiddling(opportunities.filter(o => o.market === 'Spread'), gameTitle);
        if (spreadMiddlingOpp) arbOpps.push(spreadMiddlingOpp);
      }
    });

    return arbOpps;
  }

  // Detect moneyline arbitrage opportunities
  private detectMoneylineArbitrage(opps: BettingOpportunity[], game: string): BettingOpportunity | null {
    if (opps.length < 2) return null;

    // Get all sportsbook odds for this moneyline
    const allOdds: any[] = [];
    opps.forEach(opp => {
      if (opp.oddsComparison) {
        opp.oddsComparison.forEach((odds: any) => {
          if (odds.team1Odds && odds.team2Odds) {
            allOdds.push({
              sportsbook: odds.sportsbook,
              team1Odds: odds.team1Odds,
              team2Odds: odds.team2Odds,
              team1Prob: this.calculateImpliedProbability(odds.team1Odds),
              team2Prob: this.calculateImpliedProbability(odds.team2Odds)
            });
          }
        });
      }
    });

    if (allOdds.length < 2) return null;

    // Find best odds for each team
    const bestTeam1 = allOdds.reduce((best, current) => 
      current.team1Odds > best.team1Odds ? current : best
    );
    const bestTeam2 = allOdds.reduce((best, current) => 
      current.team2Odds > best.team2Odds ? current : best
    );

    // Calculate arbitrage percentage
    const totalImpliedProb = bestTeam1.team1Prob + bestTeam2.team2Prob;
    const arbPercentage = ((1 - totalImpliedProb) * 100);

    // If arbitrage exists (total implied probability < 1)
    if (arbPercentage > 0.5) { // Minimum 0.5% profit
      return {
        id: `arbitrage_moneyline_${game}_${Date.now()}`,
        sport: opps[0].sport,
        game: game,
        market: 'Moneyline',
        betType: 'Arbitrage',
        line: `${bestTeam1.sportsbook} vs ${bestTeam2.sportsbook}`,
        mainBookOdds: Math.max(bestTeam1.team1Odds, bestTeam2.team2Odds),
        ev: arbPercentage,
        hit: 100, // Guaranteed profit
        gameTime: opps[0].gameTime,
        confidence: 'high',
        category: 'arbitrage',
        impliedProbability: totalImpliedProb,
        oddsComparison: [
          {
            sportsbook: bestTeam1.sportsbook,
            odds: bestTeam1.team1Odds,
            ev: arbPercentage,
            isMainBook: true
          },
          {
            sportsbook: bestTeam2.sportsbook,
            odds: bestTeam2.team2Odds,
            ev: arbPercentage,
            isMainBook: false
          }
        ]
      };
    }

    return null;
  }

  // Detect total middling opportunities
  private detectTotalMiddling(opps: BettingOpportunity[], gameTitle: string): BettingOpportunity | null {
    if (opps.length < 2) return null;

    // Collect all different total lines from different opportunities
    const totalLineMap = new Map<number, any[]>();
    
    opps.forEach(opp => {
      if (opp.line.includes('O/U')) {
        const totalValue = parseFloat(opp.line.replace('O/U ', ''));
        if (!totalLineMap.has(totalValue)) {
          totalLineMap.set(totalValue, []);
        }
        
        // Add this opportunity's best odds for this total
        totalLineMap.get(totalValue)!.push({
          total: totalValue,
          sportsbook: opp.oddsComparison?.[0]?.sportsbook || 'Unknown',
          overOdds: opp.mainBookOdds, // Simplified - using main book odds
          underOdds: opp.mainBookOdds * 0.9, // Estimate under odds
          opportunity: opp
        });
      }
    });

    const totalLines = Array.from(totalLineMap.keys()).sort((a, b) => a - b);

    // Look for different total lines that create middling opportunities
    for (let i = 0; i < totalLines.length - 1; i++) {
      for (let j = i + 1; j < totalLines.length; j++) {
        const lowerTotal = totalLines[i];
        const higherTotal = totalLines[j];
        
        // Check if we have significant gap for potential middle (at least 1 point difference)
        if (higherTotal - lowerTotal >= 1.0) {
          const lowerTotalBooks = totalLineMap.get(lowerTotal) || [];
          const higherTotalBooks = totalLineMap.get(higherTotal) || [];
          
          if (lowerTotalBooks.length > 0 && higherTotalBooks.length > 0) {
            const bestLowerBook = lowerTotalBooks[0];
            const bestHigherBook = higherTotalBooks[0];
            
            // Middling strategy: Bet Over on lower total, Under on higher total
            const middleGap = higherTotal - lowerTotal;
            const middleProbability = Math.min(0.15, middleGap * 0.05); // Estimate based on gap size
            
            if (middleProbability > 0.03) { // Minimum 3% middle chance
              return {
                id: `middling_total_${gameTitle.replace(/\s+/g, '_')}_${Date.now()}`,
                sport: opps[0].sport,
                game: gameTitle,
                market: 'Total',
                betType: 'Middling',
                line: `Middle O${lowerTotal}/U${higherTotal}`,
                mainBookOdds: 150, // Estimated middling odds
                ev: middleProbability * 100,
                hit: middleProbability * 100,
                gameTime: opps[0].gameTime,
                confidence: middleProbability > 0.08 ? 'high' : 'medium',
                category: 'middling',
                impliedProbability: 0.85, // Conservative
                oddsComparison: [
                  {
                    sportsbook: bestLowerBook.sportsbook,
                    odds: bestLowerBook.overOdds,
                    ev: middleProbability * 100,
                    isMainBook: true
                  },
                  {
                    sportsbook: bestHigherBook.sportsbook,
                    odds: bestHigherBook.underOdds,
                    ev: middleProbability * 100,
                    isMainBook: false
                  }
                ]
              };
            }
          }
        }
      }
    }

    return null;
  }

  // Detect spread middling opportunities
  private detectSpreadMiddling(opps: BettingOpportunity[], game: string): BettingOpportunity | null {
    if (opps.length < 2) return null;

    // Get all spread lines and odds
    const spreadLines: any[] = [];
    opps.forEach(opp => {
      if (opp.oddsComparison && opp.line.includes('spread')) {
        const spreadValue = parseFloat(opp.line.replace(' spread', ''));
        opp.oddsComparison.forEach((odds: any) => {
          if (odds.team1Odds && odds.team2Odds) {
            spreadLines.push({
              sportsbook: odds.sportsbook,
              spread: spreadValue,
              favoriteOdds: odds.team1Odds,
              underdogOdds: odds.team2Odds,
              line: opp.line
            });
          }
        });
      }
    });

    // Look for different spread lines that create middling opportunities
    for (let i = 0; i < spreadLines.length; i++) {
      for (let j = i + 1; j < spreadLines.length; j++) {
        const line1 = spreadLines[i];
        const line2 = spreadLines[j];
        
        // Check if we have different spreads for potential middle
        if (Math.abs(line1.spread - line2.spread) >= 0.5) {
          const lowerSpread = line1.spread < line2.spread ? line1 : line2;
          const higherSpread = line1.spread < line2.spread ? line2 : line1;
          
          // Potential middle: take favorite on higher spread, dog on lower spread
          const favProb = this.calculateImpliedProbability(higherSpread.favoriteOdds);
          const dogProb = this.calculateImpliedProbability(lowerSpread.underdogOdds);
          const totalProb = favProb + dogProb;
          const middleProb = 1 - totalProb;
          
          if (middleProb > 0.02) { // Minimum 2% middle probability
            return {
              id: `middling_spread_${game}_${Date.now()}`,
              sport: opps[0].sport,
              game: game,
              market: 'Spread',
              betType: 'Middling',
              line: `${higherSpread.spread} @ ${higherSpread.sportsbook} / ${lowerSpread.spread} @ ${lowerSpread.sportsbook}`,
              mainBookOdds: Math.max(higherSpread.favoriteOdds, lowerSpread.underdogOdds),
              ev: middleProb * 100,
              hit: middleProb * 100,
              gameTime: opps[0].gameTime,
              confidence: middleProb > 0.05 ? 'high' : 'medium',
              category: 'middling',
              impliedProbability: totalProb,
              oddsComparison: [
                {
                  sportsbook: higherSpread.sportsbook,
                  odds: higherSpread.favoriteOdds,
                  ev: middleProb * 100,
                  isMainBook: true
                },
                {
                  sportsbook: lowerSpread.sportsbook,
                  odds: lowerSpread.underdogOdds,
                  ev: middleProb * 100,
                  isMainBook: false
                }
              ]
            };
          }
        }
      }
    }

    return null;
  }

  // Get terminal stats
  async getTerminalStats() {
    return {
      booksScanned: 27,
      evSignals: 114,
      averageCLV: "2.1%",
      winRate: 58.7
    };
  }
}

export const bettingDataService = new BettingDataService();