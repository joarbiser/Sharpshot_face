export interface TimezoneInfo {
  timezone: string;
  offset: string;
  abbreviation: string;
  isDST: boolean;
}

/**
 * Get the user's current timezone information
 */
export const getUserTimezone = (): TimezoneInfo => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();
  
  // Get timezone offset in minutes and convert to hours
  const offsetMinutes = now.getTimezoneOffset();
  const offsetHours = Math.abs(offsetMinutes / 60);
  const offsetSign = offsetMinutes <= 0 ? '+' : '-';
  const offset = `${offsetSign}${offsetHours.toString().padStart(2, '0')}:${Math.abs(offsetMinutes % 60).toString().padStart(2, '0')}`;
  
  // Get timezone abbreviation
  const abbreviation = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short'
  }).formatToParts(now).find(part => part.type === 'timeZoneName')?.value || 'UTC';
  
  // Check if currently in DST
  const january = new Date(now.getFullYear(), 0, 1);
  const july = new Date(now.getFullYear(), 6, 1);
  const isDST = now.getTimezoneOffset() < Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
  
  return {
    timezone,
    offset,
    abbreviation,
    isDST
  };
};

/**
 * Convert a UTC date string to user's local timezone
 */
export const convertToUserTimezone = (utcDateString: string): Date => {
  const utcDate = new Date(utcDateString);
  return new Date(utcDate.toLocaleString('en-US', { timeZone: getUserTimezone().timezone }));
};

/**
 * Format a date in user's timezone with custom format
 */
export const formatInUserTimezone = (date: Date | string, formatString: string = 'MMM d, h:mm a'): string => {
  try {
    const userTimezone = getUserTimezone().timezone;
    let dateObj: Date;
    
    if (typeof date === 'string') {
      // Handle string input - could be time only or full date
      if (date === 'TBD' || !date) {
        return 'TBD';
      }
      dateObj = new Date(date);
    } else {
      dateObj = date;
    }
    
    // Validate the date object
    if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      console.warn('Invalid date passed to formatInUserTimezone:', date);
      return 'TBD';
    }
    
    // Additional validation for reasonable date range
    const year = dateObj.getFullYear();
    if (year < 1900 || year > 2100) {
      console.warn('Date out of reasonable range:', dateObj);
      return 'TBD';
    }
  
    // Use native JavaScript Intl formatting
    const options: Intl.DateTimeFormatOptions = {};
    
    if (formatString.includes('MMM')) {
      options.month = 'short';
    }
    if (formatString.includes('d')) {
      options.day = 'numeric';
    }
    if (formatString.includes('h')) {
      options.hour = 'numeric';
      options.hour12 = true;
    }
    if (formatString.includes('mm')) {
      options.minute = '2-digit';
    }
    if (formatString.includes('a')) {
      options.hour12 = true;
    }
    
    return new Intl.DateTimeFormat('en-US', {
      ...options,
      timeZone: userTimezone
    }).format(dateObj);
  } catch (error) {
    console.error('Error formatting date in user timezone:', error, date);
    return 'TBD';
  }
};

/**
 * Get formatted game time for display
 */
export const formatGameTime = (gameDate: string, gameTime: string): string => {
  try {
    // Combine date and time into a single datetime string
    const dateTimeString = `${gameDate} ${gameTime}`;
    const gameDateTime = new Date(dateTimeString);
    
    // If the date is invalid, try parsing differently
    if (isNaN(gameDateTime.getTime())) {
      // Try parsing as ISO string or other formats
      const isoString = `${gameDate}T${gameTime}:00.000Z`;
      const parsedDate = new Date(isoString);
      
      if (isNaN(parsedDate.getTime())) {
        // Return original if parsing fails
        return `${gameDate} ${gameTime}`;
      }
      
      return formatInUserTimezone(parsedDate, 'MMM d, h:mm a');
    }
    
    return formatInUserTimezone(gameDateTime, 'MMM d, h:mm a');
  } catch (error) {
    console.error('Error formatting game time:', error);
    return `${gameDate} ${gameTime}`;
  }
};

/**
 * Get time until game starts (for upcoming games)
 */
export const getTimeUntilGame = (gameDate: string, gameTime: string): string => {
  try {
    const gameDateTime = new Date(`${gameDate} ${gameTime}`);
    const now = new Date();
    const diff = gameDateTime.getTime() - now.getTime();
    
    if (diff < 0) {
      return 'Started';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  } catch (error) {
    console.error('Error calculating time until game:', error);
    return 'Unknown';
  }
};

/**
 * Check if a game is happening today in user's timezone
 */
export const isGameToday = (gameDate: string): boolean => {
  try {
    const gameDateTime = new Date(gameDate);
    const userTimezone = getUserTimezone().timezone;
    const today = utcToZonedTime(new Date(), userTimezone);
    const gameInUserTZ = utcToZonedTime(gameDateTime, userTimezone);
    
    return format(today, 'yyyy-MM-dd', { timeZone: userTimezone }) === 
           format(gameInUserTZ, 'yyyy-MM-dd', { timeZone: userTimezone });
  } catch (error) {
    console.error('Error checking if game is today:', error);
    return false;
  }
};