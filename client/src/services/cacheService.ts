// Client-side cache management for efficient betting data handling
export class CacheService {
  private static instance: CacheService;
  private lastClearTime = 0;
  private readonly CLEAR_COOLDOWN = 5000; // 5 seconds between cache clears

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  // Clear server-side cache for immediate fresh data
  async clearBettingCache(): Promise<boolean> {
    const now = Date.now();
    if (now - this.lastClearTime < this.CLEAR_COOLDOWN) {
      console.log('Cache clear on cooldown, skipping...');
      return false;
    }

    try {
      const response = await fetch('/api/betting/clear-cache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        this.lastClearTime = now;
        console.log('✅ Server betting cache cleared successfully');
        return true;
      } else {
        console.error('Failed to clear server cache:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error clearing server cache:', error);
      return false;
    }
  }

  // Check if cache clearing is available (not on cooldown)
  canClearCache(): boolean {
    return Date.now() - this.lastClearTime >= this.CLEAR_COOLDOWN;
  }

  // Get time remaining on cooldown
  getClearCooldownRemaining(): number {
    const remaining = this.CLEAR_COOLDOWN - (Date.now() - this.lastClearTime);
    return Math.max(0, remaining);
  }
}