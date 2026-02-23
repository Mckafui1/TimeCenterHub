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
    path: '/time-calculator',
    name: 'Time Calculator',
    description: 'Add or subtract time durations (hours, minutes, seconds).',
    category: 'Time',
    longDescription: 'The flagship Time Calculator for summing or finding the difference between durations. Perfect for video production, logistics, and multi-day project tracking.',
    faqs: [{ question: 'How do I add multiple times?', answer: 'Use the calculator to stack durations and see a rolling total.' }],
    examples: ['Totaling project hours', 'Subtracting breaks from total time'],
    howToSteps: ['Enter hours/mins/secs', 'Select Add or Subtract', 'Click Calculate'],
    mathLogic: 'Standard Base-60 time arithmetic.'
  },
  { id: 'chronometer', path: '/chronometer', name: 'Stopwatch', description: 'Precision stopwatch with laps.', category: 'Time', longDescription: 'A professional online stopwatch with lap functionality. Track time intervals with millisecond precision for sports, cooking, or productivity sprints.', faqs: [], examples: [] },
  { id: 'time-between-times', path: '/time-duration', name: 'Time Duration Calculator', description: 'Duration between two times.', category: 'Time', longDescription: 'Calculate the exact duration between two clock times. Handles AM/PM formats and overnight calculations seamlessly for accurate time tracking.', faqs: [], examples: [] },
  { id: 'add-time', path: '/add-time', name: 'Add Time Calculator', description: 'Sum multiple time values.', category: 'Time', longDescription: 'Quickly sum multiple time values together. Ideal for calculating total project hours, flight times, or cumulative event durations.', faqs: [], examples: [] },
  { id: 'subtract-time', path: '/subtract-time', name: 'Subtract Time Calculator', description: 'Find the difference between durations.', category: 'Time', longDescription: 'Calculate the difference between two time durations. Useful for finding remaining time, time elapsed, or adjusting schedules.', faqs: [], examples: [] },
  { id: 'hours-from-now', path: '/hours-from-now', name: 'Hours From Now', description: 'What time is it in X hours?', category: 'Time', longDescription: 'Find out exactly what time it will be in X hours and minutes from now. Great for setting alarms, planning meetings, or scheduling reminders.', faqs: [], examples: [] },
  { id: 'minutes-from-now', path: '/minutes-from-now', name: 'Minutes From Now', description: 'What time is it in X minutes?', category: 'Time', longDescription: 'Determine the exact time it will be in X minutes. Perfect for short-term planning, cooking timers, or quick scheduling needs.', faqs: [], examples: [] },
  { id: 'time-until-midnight', path: '/time-until-midnight', name: 'Time Until Midnight', description: 'Hours left in the day.', category: 'Time', longDescription: 'See exactly how many hours, minutes, and seconds are left until midnight. Stay aware of the remaining time in your day for better productivity.', faqs: [], examples: [] },
  { id: 'sleep-calculator', path: '/sleep-calculator', name: 'Sleep Calculator', description: 'When should I go to bed?', category: 'Time', longDescription: 'Calculate the best time to go to sleep or wake up based on 90-minute sleep cycles. Wake up feeling refreshed and energized every morning.', faqs: [], examples: [] },
  { id: 'meeting-cost-calculator', path: '/meeting-cost', name: 'Meeting Cost Calculator', description: 'Calculate the cost of meeting time.', category: 'Time', longDescription: 'Visualize the true cost of your meetings. Enter the number of attendees and average hourly rate to see how much time and money is being spent.', faqs: [], examples: [] },
  { id: 'world-clock', path: '/world-clock', name: 'Global World Clock', description: 'Real-time city clocks.', category: 'Time', longDescription: 'View current local times in major cities around the world. Essential for scheduling international calls and coordinating across time zones.', faqs: [], examples: [] },
  { id: 'time-in-decimal', path: '/time-to-decimal', name: 'Time to Decimal Converter', description: '8:30:45 to 8.5125 hours.', category: 'Time', longDescription: 'Convert hours, minutes, and seconds (8:30:45) into decimal hours (8.5125), minutes, and seconds. Includes a step-by-step breakdown of the calculation. Essential for payroll, billing, and scientific calculations.', faqs: [], examples: [] },
  { id: 'speed-distance-time', path: '/speed-distance-time', name: 'Speed Distance Time', description: 'Calculate travel velocity.', category: 'Time', longDescription: 'Solve for Speed, Distance, or Time using the classic physics formula. Ideal for runners, cyclists, drivers, and students solving math problems.', faqs: [], examples: [] },

  // --- CORE DATE TOOLS ---
  {
    id: 'age-calculator',
    path: '/age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, and days.',
    category: 'Date',
    longDescription: 'Get your precise age down to the day. Includes weekday of birth and total days lived.',
    faqs: [{ question: 'Is leap year accounted for?', answer: 'Yes, full Gregorian calendar accuracy.' }],
    examples: ['Check exact age today', 'Age for insurance'],
    howToSteps: ['Input birth date', 'Set calculation date', 'View breakdown']
  },
  { id: 'date-calculator', path: '/date-calculator', name: 'Date Calculator (Add/Sub)', description: 'Add/subtract days, weeks, months.', category: 'Date', longDescription: 'Add or subtract days, weeks, months, or years from any date. Calculate future deadlines, past events, or project timelines with ease.', faqs: [], examples: [] },
  { id: 'weekday-calculator', path: '/weekday', name: 'Weekday Calculator', description: 'What day is this date?', category: 'Date', longDescription: 'Find out the day of the week for any date in history or the future. Was it a Monday? Will your birthday be on a weekend next year?', faqs: [], examples: [] },
  { id: 'week-number', path: '/week-number', name: 'Week Number Calculator', description: 'Find the ISO week number.', category: 'Date', longDescription: 'Determine the ISO-8601 week number for any specific date. Essential for business planning, supply chains, and European calendar systems.', faqs: [], examples: [] },
  { id: 'time-between-dates', path: '/time-between-dates', name: 'Time Between Dates', description: 'Difference between two dates.', category: 'Date', longDescription: 'Calculate the exact number of days, weeks, and months between two dates. Perfect for counting down to events or tracking project durations.', faqs: [], examples: [] },
  { id: 'days-from-now', path: '/days-from-now', name: 'Days From Now', description: 'Simple future/past date finder.', category: 'Date', longDescription: 'Find the exact date that is X days from today. Useful for calculating 30, 60, or 90-day deadlines and future appointments.', faqs: [], examples: [] },
  { id: 'business-day-calculator', path: '/business-days', name: 'Business Days Calculator', description: 'Skip weekends and holidays.', category: 'Date', longDescription: 'Calculate the number of working days between two dates, excluding weekends and holidays. Essential for project management and HR planning.', faqs: [], examples: [] },
  { id: 'day-of-year', path: '/day-of-year', name: 'Day of Year Calculator', description: 'Find day number (1-366).', category: 'Date', longDescription: 'Find the ordinal day number (1-366) for any date within the year. Useful for data processing, meteorology, and military logistics.', faqs: [], examples: [] },
  { id: 'leap-year', path: '/leap-year', name: 'Leap Year Calculator', description: 'Is it a leap year?', category: 'Date', longDescription: 'Check if a specific year is a leap year. Understand the rules of the Gregorian calendar and see if February has 29 days.', faqs: [], examples: [] },
  { id: 'pregnancy-due-date', path: '/pregnancy-due-date', name: 'Pregnancy Due Date', description: 'Estimate delivery date.', category: 'Date', longDescription: 'Estimate your baby\'s due date based on the first day of your last menstrual period. A helpful tool for expectant parents planning ahead.', faqs: [], examples: [] },
  { id: 'zodiac-calculator', path: '/zodiac', name: 'Zodiac Sign Calculator', description: 'Find your star sign.', category: 'Date', longDescription: 'Discover your astrological Sun Sign based on your birth date. Learn about your zodiac personality traits and horoscope dates.', faqs: [], examples: [] },
  { id: 'days-to-birthday', path: '/birthday-countdown', name: 'Days to Birthday', description: 'Next birthday countdown.', category: 'Date', longDescription: 'Count down the days, hours, and minutes until your next birthday. Never miss a celebration and start planning your party early.', faqs: [], examples: [] },
  { id: 'retirement-countdown', path: '/retirement', name: 'Retirement Countdown', description: 'When can I quit?', category: 'Date', longDescription: 'Calculate how many days are left until your retirement. Visualize your journey to financial freedom and the golden years.', faqs: [], examples: [] },
  { id: 'wedding-countdown', path: '/wedding', name: 'Wedding Countdown', description: 'Days until the big "I do".', category: 'Date', longDescription: 'Count down the seconds until your wedding day. Create excitement and keep track of time as you prepare for the big event.', faqs: [], examples: [] },

  // --- CORE WORK TOOLS ---
  { id: 'work-hours-calculator', path: '/work-hours', name: 'Work Hours Calculator', description: 'Daily clock-in tracker.', category: 'Work', longDescription: 'Calculate your daily work hours by entering clock-in and clock-out times. Automatically deduct breaks for accurate timesheet reporting.', faqs: [], examples: [] },
  { id: 'time-card-calculator', path: '/time-card', name: 'Time Card Calculator', description: 'Weekly timesheet totaler.', category: 'Work', longDescription: 'Calculate your total weekly hours and gross pay. Enter start and end times for each day to generate a complete weekly time card.', faqs: [], examples: [] },
  { id: 'overtime-calculator', path: '/overtime', name: 'Overtime Calculator', description: 'Time and a half pay.', category: 'Work', longDescription: 'Calculate your overtime pay based on your regular rate and hours worked. Supports time-and-a-half and double-time calculations.', faqs: [], examples: [] },
  { id: 'billable-hours', path: '/billable', name: 'Billable Hours (Law/Accountant)', description: '0.1 unit billing.', category: 'Work', longDescription: 'Convert time worked into billable units (e.g., 6-minute increments). Essential for lawyers, accountants, and consultants tracking client time.', faqs: [], examples: [] },
  { id: 'shift-calculator', path: '/shifts', name: 'Shift Calculator', description: 'Manage complex rotas.', category: 'Work', longDescription: 'Plan and calculate hours for complex shift schedules. Ideal for managers organizing staff rotas and ensuring coverage.', faqs: [], examples: [] },
  { id: 'break-calculator', path: '/breaks', name: 'Break Time Deduction', description: 'Auto-subtract lunch breaks.', category: 'Work', longDescription: 'Calculate your net work hours by automatically deducting lunch breaks and rest periods. Ensure accurate payroll and compliance.', faqs: [], examples: [] },

  // --- CORE CONVERTER TOOLS ---
  { id: 'military-time', path: '/military-time', name: 'Military Time Converter', description: '12hr to 24hr clock.', category: 'Converter', longDescription: 'Convert standard 12-hour AM/PM time to 24-hour military time and vice versa. Essential for travel, healthcare, and logistics.', faqs: [], examples: [] },
  { id: 'minutes-to-hours', path: '/minutes-to-hours', name: 'Minutes to Hours', description: 'Total minutes to H:M.', category: 'Converter', longDescription: 'Convert a total number of minutes into hours and minutes format (e.g., 90 min = 1 hr 30 min). Simplify time duration reporting.', faqs: [], examples: [] },
  { id: 'hours-to-minutes', path: '/hours-to-minutes', name: 'Hours to Minutes', description: 'Hours to total minutes.', category: 'Converter', longDescription: 'Convert hours and minutes into total minutes. Useful for calculations requiring a single unit of time.', faqs: [], examples: [] },
  { id: 'unix-timestamp', path: '/unix', name: 'Unix Timestamp Converter', description: 'Epoch time for devs.', category: 'Converter', longDescription: 'Convert Unix timestamps (Epoch time) to human-readable dates and vice versa. A must-have tool for developers and system administrators.', faqs: [], examples: [] },
  { id: 'time-unit-converter', path: '/units', name: 'Time Unit Converter', description: 's/m/h/d/w conversion.', category: 'Converter', longDescription: 'Convert between seconds, minutes, hours, days, weeks, months, and years. A comprehensive tool for all your time unit conversion needs.', faqs: [], examples: [] },
  { id: 'ms-to-seconds', path: '/ms-to-seconds', name: 'Milliseconds to Seconds', description: 'Convert ms to seconds.', category: 'Converter', longDescription: 'Convert milliseconds to seconds instantly. Essential for developers measuring latency, page load times, and system performance.', faqs: [], examples: [] },
  { id: 'ms-to-date', path: '/ms-to-date', name: 'Milliseconds to Date', description: 'Decode Unix timestamps.', category: 'Converter', longDescription: 'Decode millisecond timestamps into readable dates. Verify when events occurred in your logs or database records.', faqs: [], examples: [] },
  { id: 'pace-calculator', path: '/pace', name: 'Pace Calculator (Running)', description: 'Min/km to km/h.', category: 'Converter', longDescription: 'Calculate your running or cycling pace. Convert min/km to km/h or min/mile to mph to track your training progress.', faqs: [], examples: [] },

  // --- CORE COUNTDOWN TOOLS ---
  { id: 'pomodoro-timer', path: '/pomodoro', name: 'Pomodoro Timer', description: '25/5 focus technique.', category: 'Countdown', longDescription: 'Boost productivity with focus blocks.', faqs: [], examples: [] },
  { id: 'countdown-timer', path: '/timer', name: 'Countdown Timer', description: 'Simple visual timer.', category: 'Countdown', longDescription: 'A simple, large-display countdown timer. Set it for cooking, exercising, or managing tasks. Alerts you when time is up.', faqs: [], examples: [] },
  { id: 'new-year-countdown', path: '/new-year', name: 'New Year Countdown', description: 'Days until next year.', category: 'Countdown', longDescription: 'Count down the days, hours, minutes, and seconds until the New Year. Join the global celebration and track the time remaining.', faqs: [], examples: [] },
  { id: 'exam-countdown', path: '/exam', name: 'Exam Countdown', description: 'Days until test day.', category: 'Countdown', longDescription: 'Track the days left until your important exams. Stay motivated and organize your study schedule effectively.', faqs: [], examples: [] },
  { id: 'federal-holidays', path: '/federal-holidays', name: 'US Federal Holidays', description: 'List of upcoming holidays.', category: 'Date', longDescription: 'Check dates for US federal holidays.', faqs: [], examples: [] }
];