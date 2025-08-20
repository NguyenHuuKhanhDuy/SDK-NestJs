// src/common/helpers/time.helper.ts
import * as moment from 'moment';

export class TimeHelper {
  /**
   * Lấy thời gian hiện tại (UTC hoặc local)
   */
  static nowUtc(): Date {
    return moment.utc().toDate();
  }

  static nowLocal(): Date {
    return moment().toDate();
  }

  /**
   * Format Date thành string
   */
  static format(date: Date, format = 'YYYY-MM-DD HH:mm:ss'): string {
    return moment(date).format(format);
  }

  /**
   * Cộng thêm thời gian
   */
  static add(
    date: Date,
    amount: number,
    unit: moment.unitOfTime.DurationConstructor,
  ): Date {
    return moment(date).add(amount, unit).toDate();
  }

  /**
   * Trừ thời gian
   */
  static subtract(
    date: Date,
    amount: number,
    unit: moment.unitOfTime.DurationConstructor,
  ): Date {
    return moment(date).subtract(amount, unit).toDate();
  }

  /**
   * Kiểm tra một date có hết hạn chưa
   */
  static isExpired(date: Date): boolean {
    return moment(date).isBefore(moment());
  }

  /**
   * So sánh 2 Date
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
   * Lấy số ngày giữa 2 thời điểm
   */
  static diffInDays(date1: Date, date2: Date): number {
    return moment(date1).diff(moment(date2), 'days');
  }
}
