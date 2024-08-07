import * as jalaali from 'jalaali-js'; // Import jalaali-js

export function isDifferenceLessThan24Hours(timestamp1, timestamp2) {
  const difference = Math.abs(timestamp1 - timestamp2); // Calculate the absolute difference
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  return difference < oneDayInMilliseconds;
}

export function convertJalaliToTimestamp(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
) {
  // Convert Jalali date to Gregorian date
  const { gy, gm, gd } = jalaali.toGregorian(year, month, day);

  // Create a JavaScript Date object
  const date = new Date(gy, gm - 1, gd, hour, minute, second);

  // Return the timestamp
  return date.getTime();
}

export function convertJalaliToGregorian(jalaliDate: string): Date {
  const [year, month, day] = jalaliDate.split('-').map(Number);
  const { gy, gm, gd } = jalaali.toGregorian(year, month, day);
  return new Date(gy, gm - 1, gd); // ماه‌ها در جاوااسکریپت از 0 شروع می‌شوند
}

// // Example usage
// const year = 1403; // مثال: سال ۱۴۰۳
// const month = 5; // مثال: مرداد
// const day = 12; // مثال: روز ۱۲
// const hour = 14; // مثال: ساعت ۱۴
// const minute = 30; // مثال: دقیقه ۳۰
// const second = 0; // مثال: ثانیه ۰

// const timestamp = convertJalaliToTimestamp(
//   year,
//   month,
//   day,
//   hour,
//   minute,
//   second,
// );
// console.log(timestamp);
