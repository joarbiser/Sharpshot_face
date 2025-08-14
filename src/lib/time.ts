// src/lib/time.ts
import { DateTime } from 'luxon';

export const nowUtcISO = () => DateTime.utc().toISO(); // precise ISO string
export const toUtcISO = (d: string | Date | number) => {
  if (typeof d === 'number') {
    // Handle timestamp (milliseconds)
    return DateTime.fromMillis(d, { zone: 'utc' }).toISO();
  }
  if (typeof d === 'string') {
    // Handle ISO string
    return DateTime.fromISO(d, { zone: 'utc' }).toISO();
  }
  // Handle Date object
  return DateTime.fromJSDate(d, { zone: 'utc' }).toISO();
};