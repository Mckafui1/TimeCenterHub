import { Tool, CategoryData } from './types';

export const CATEGORIES: CategoryData[] = [
  { name: 'Time', icon: '🕒', slug: 'time' },
  { name: 'Date', icon: '📅', slug: 'date' },
  { name: 'Work', icon: '💼', slug: 'work' },
  { name: 'Converter', icon: '🔄', slug: 'converter' },
  { name: 'Countdown', icon: '⏳', slug: 'countdown' },
];

export const TOOLS: Tool[] = [
  // --- CORE TIME TOOLS ---
  {
    id: 'time-calculator',
    path: '/time/time-calculator',
    name: 'Time Calculator',
    description: 'Add or subtract time durations (hours, minutes, seconds).',
    category: 'Time',
    longDescription: 'The flagship Time Calculator for summing or finding the difference between durations. Perfect for video production, logistics, and multi-day project tracking.',
    faqs: [{ question: 'How do I add multiple times?', answer: 'Use the calculator to stack durations and see a rolling total.' }],
    examples: ['Totaling project hours', 'Subtracting breaks from total time'],
    howToSteps: ['Enter hours/mins/secs', 'Select Add or Subtract', 'Click Calculate'],
    mathLogic: 'Standard Base-60 time arithmetic.'
  },
  { id: 'chronometer', path: '/time/chronometer', name: 'Stopwatch', description: 'Precision stopwatch with laps.', category: 'Time', longDescription: 'Professional grade stopwatch for tracking time intervals with millisecond precision.', faqs: [], examples: [] },
  { id: 'time-between-times', path: '/time/time-duration', name: 'Time Duration Calculator', description: 'Duration between two times.', category: 'Time', longDescription: 'Calculate the gap between two clock times.', faqs: [], examples: [] },
  { id: 'add-time', path: '/time/add-time', name: 'Add Time Calculator', description: 'Sum multiple time values.', category: 'Time', longDescription: 'Add hours and minutes together.', faqs: [], examples: [] },
  { id: 'subtract-time', path: '/time/subtract-time', name: 'Subtract Time Calculator', description: 'Find the difference between durations.', category: 'Time', longDescription: 'Subtract one time from another.', faqs: [], examples: [] },
  { id: 'hours-from-now', path: '/time/hours-from-now', name: 'Hours From Now', description: 'What time is it in X hours?', category: 'Time', longDescription: 'Future time projection.', faqs: [], examples: [] },
  { id: 'minutes-from-now', path: '/time/minutes-from-now', name: 'Minutes From Now', description: 'What time is it in X minutes?', category: 'Time', longDescription: 'Short-term future time.', faqs: [], examples: [] },
  { id: 'time-until-midnight', path: '/time/time-until-midnight', name: 'Time Until Midnight', description: 'Hours left in the day.', category: 'Time', longDescription: 'Countdown to the end of today.', faqs: [], examples: [] },
  { id: 'sleep-calculator', path: '/time/sleep-calculator', name: 'Sleep Calculator', description: 'When should I go to bed?', category: 'Time', longDescription: 'Optimize sleep cycles and wake-up times.', faqs: [], examples: [] },
  { id: 'meeting-cost-calculator', path: '/time/meeting-cost', name: 'Meeting Cost Calculator', description: 'Calculate the cost of meeting time.', category: 'Time', longDescription: 'Time is money. See the actual dollar value of attendees.', faqs: [], examples: [] },
  { id: 'world-clock', path: '/time/world-clock', name: 'Global World Clock', description: 'Real-time city clocks.', category: 'Time', longDescription: 'Live pulse of global cities.', faqs: [], examples: [] },
  { id: 'time-in-decimal', path: '/time/time-to-decimal', name: 'Time to Decimal Converter', description: '8:30 to 8.5 hours.', category: 'Time', longDescription: 'Decimal conversion for payroll.', faqs: [], examples: [] },
  { id: 'speed-distance-time', path: '/time/speed-distance-time', name: 'Speed Distance Time', description: 'Calculate travel velocity.', category: 'Time', longDescription: 'Basic physics time calculations.', faqs: [], examples: [] },

  // --- CORE DATE TOOLS ---
  {
    id: 'age-calculator',
    path: '/date/age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, and days.',
    category: 'Date',
    longDescription: 'Get your precise age down to the day. Includes weekday of birth and total days lived.',
    faqs: [{ question: 'Is leap year accounted for?', answer: 'Yes, full Gregorian calendar accuracy.' }],
    examples: ['Check exact age today', 'Age for insurance'],
    howToSteps: ['Input birth date', 'Set calculation date', 'View breakdown']
  },
  { id: 'date-calculator', path: '/date/date-calculator', name: 'Date Calculator (Add/Sub)', description: 'Add/subtract days, weeks, months.', category: 'Date', longDescription: 'Advanced date arithmetic. Calculate exactly what date falls X days or weeks from now.', faqs: [], examples: [] },
  { id: 'weekday-calculator', path: '/date/weekday', name: 'Weekday Calculator', description: 'What day is this date?', category: 'Date', longDescription: 'Find out the day of the week for any date in history or the future.', faqs: [], examples: [] },
  { id: 'week-number', path: '/date/week-number', name: 'Week Number Calculator', description: 'Find the ISO week number.', category: 'Date', longDescription: 'Determine the ISO-8601 week number for any specific date.', faqs: [], examples: [] },
  { id: 'time-between-dates', path: '/date/time-between-dates', name: 'Time Between Dates', description: 'Difference between two dates.', category: 'Date', longDescription: 'Calculate days/weeks/months between dates.', faqs: [], examples: [] },
  { id: 'days-from-now', path: '/date/days-from-now', name: 'Days From Now', description: 'Simple future/past date finder.', category: 'Date', longDescription: 'Project deadlines and look-back.', faqs: [], examples: [] },
  { id: 'business-day-calculator', path: '/date/business-days', name: 'Business Days Calculator', description: 'Skip weekends and holidays.', category: 'Date', longDescription: 'Legal and financial working day tracker.', faqs: [], examples: [] },
  { id: 'day-of-year', path: '/date/day-of-year', name: 'Day of Year Calculator', description: 'Find day number (1-366).', category: 'Date', longDescription: 'Find the ordinal day number within the year.', faqs: [], examples: [] },
  { id: 'leap-year', path: '/date/leap-year', name: 'Leap Year Calculator', description: 'Is it a leap year?', category: 'Date', longDescription: 'Check if a specific year has 366 days.', faqs: [], examples: [] },
  { id: 'pregnancy-due-date', path: '/date/pregnancy-due-date', name: 'Pregnancy Due Date', description: 'Estimate delivery date.', category: 'Date', longDescription: 'Calculate based on LMP.', faqs: [], examples: [] },
  { id: 'zodiac-calculator', path: '/date/zodiac', name: 'Zodiac Sign Calculator', description: 'Find your star sign.', category: 'Date', longDescription: 'Determine astrological sign based on birth date.', faqs: [], examples: [] },
  { id: 'days-to-birthday', path: '/date/birthday-countdown', name: 'Days to Birthday', description: 'Next birthday countdown.', category: 'Date', longDescription: 'Never miss a celebration.', faqs: [], examples: [] },
  { id: 'retirement-countdown', path: '/date/retirement', name: 'Retirement Countdown', description: 'When can I quit?', category: 'Date', longDescription: 'Days until your golden years.', faqs: [], examples: [] },
  { id: 'wedding-countdown', path: '/date/wedding', name: 'Wedding Countdown', description: 'Days until the big "I do".', category: 'Date', longDescription: 'Event planning essential.', faqs: [], examples: [] },

  // --- CORE WORK TOOLS ---
  { id: 'work-hours-calculator', path: '/work/work-hours', name: 'Work Hours Calculator', description: 'Daily clock-in tracker.', category: 'Work', longDescription: 'Total your daily shift hours.', faqs: [], examples: [] },
  { id: 'time-card-calculator', path: '/work/time-card', name: 'Time Card Calculator', description: 'Weekly timesheet totaler.', category: 'Work', longDescription: 'Full week payroll calculation.', faqs: [], examples: [] },
  { id: 'overtime-calculator', path: '/work/overtime', name: 'Overtime Calculator', description: 'Time and a half pay.', category: 'Work', longDescription: 'Calculate gross pay with OT.', faqs: [], examples: [] },
  { id: 'billable-hours', path: '/work/billable', name: 'Billable Hours (Law/Accountant)', description: '0.1 unit billing.', category: 'Work', longDescription: 'Rounds to nearest 6 minutes.', faqs: [], examples: [] },
  { id: 'shift-calculator', path: '/work/shifts', name: 'Shift Calculator', description: 'Manage complex rotas.', category: 'Work', longDescription: 'Organize work schedules.', faqs: [], examples: [] },
  { id: 'break-calculator', path: '/work/breaks', name: 'Break Time Deduction', description: 'Auto-subtract lunch breaks.', category: 'Work', longDescription: 'Ensure accurate net hours.', faqs: [], examples: [] },

  // --- CORE CONVERTER TOOLS ---
  { id: 'military-time', path: '/converter/military-time', name: 'Military Time Converter', description: '12hr to 24hr clock.', category: 'Converter', longDescription: 'Convert AM/PM to 0000-2400.', faqs: [], examples: [] },
  { id: 'minutes-to-hours', path: '/converter/minutes-to-hours', name: 'Minutes to Hours', description: 'Total minutes to H:M.', category: 'Converter', longDescription: 'Simplify large minute counts.', faqs: [], examples: [] },
  { id: 'hours-to-minutes', path: '/converter/hours-to-minutes', name: 'Hours to Minutes', description: 'Hours to total minutes.', category: 'Converter', longDescription: 'Reverse duration conversion.', faqs: [], examples: [] },
  { id: 'unix-timestamp', path: '/converter/unix', name: 'Unix Timestamp Converter', description: 'Epoch time for devs.', category: 'Converter', longDescription: 'Standard dev utility.', faqs: [], examples: [] },
  { id: 'time-unit-converter', path: '/converter/units', name: 'Time Unit Converter', description: 's/m/h/d/w conversion.', category: 'Converter', longDescription: 'Comprehensive unit scaling.', faqs: [], examples: [] },
  { id: 'pace-calculator', path: '/converter/pace', name: 'Pace Calculator (Running)', description: 'Min/km to km/h.', category: 'Converter', longDescription: 'Running and cycling analytics.', faqs: [], examples: [] },

  // --- CORE COUNTDOWN TOOLS ---
  { id: 'pomodoro-timer', path: '/countdown/pomodoro', name: 'Pomodoro Timer', description: '25/5 focus technique.', category: 'Countdown', longDescription: 'Boost productivity with focus blocks.', faqs: [], examples: [] },
  { id: 'countdown-timer', path: '/countdown/timer', name: 'Countdown Timer', description: 'Simple visual timer.', category: 'Countdown', longDescription: 'Alert-based countdown.', faqs: [], examples: [] },
  { id: 'new-year-countdown', path: '/countdown/new-year', name: 'New Year Countdown', description: 'Days until next year.', category: 'Countdown', longDescription: 'Global celebration tracker.', faqs: [], examples: [] },
  { id: 'exam-countdown', path: '/countdown/exam', name: 'Exam Countdown', description: 'Days until test day.', category: 'Countdown', longDescription: 'Student study planner.', faqs: [], examples: [] }
];