// src/common/helpers/time.helper.ts
import * as moment from 'moment';

export class TimeHelper {
  /**
   * Get the current time (UTC)
   */
  static nowUtc(): Date {
    return moment.utc().toDate();
  }

  /**
   * Get the current time (Local)
   */
  static nowLocal(): Date {
    return moment().toDate();
  }

  /**
   * Format a Date object into a string
   */
  static format(date: Date, format = 'YYYY-MM-DD HH:mm:ss'): string {
    return moment(date).format(format);
  }

  /**
   * Add a specific amount of time to a date
   */
  static add(
    date: Date,
    amount: number,
    unit: moment.unitOfTime.DurationConstructor,
  ): Date {
    return moment(date).add(amount, unit).toDate();
  }

  /**
   * Subtract a specific amount of time from a date
   */
  static subtract(
    date: Date,
    amount: number,
    unit: moment.unitOfTime.DurationConstructor,
  ): Date {
    return moment(date).subtract(amount, unit).toDate();
  }

  /**
   * Check whether a date has expired
   */
  static isExpired(date: Date): boolean {
    return moment(date).isBefore(moment());
  }

  /**
   * Compare two Date objects
   * @returns -1 if date1 < date2, 1 if date1 > date2, 0 if equal
   */
  static compare(date1: Date, date2: Date): number {
    if (moment(date1).isBefore(date2)) {
      return -1;
    }
    if (moment(date1).isAfter(date2)) {
      return 1;
    }
    return 0;
  }

  /**
   * Get the number of days between two dates
   */
  static diffInDays(date1: Date, date2: Date): number {
    return moment(date1).diff(moment(date2), 'days');
  }
}
