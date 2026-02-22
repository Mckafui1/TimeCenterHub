import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TOOLS } from '../constants.tsx';
import { 
  TimeCalculator,
  TimeDurationCalculator,
  SpeedDistanceTimeCalculator,
  TimeUnitConverter,
  TimeFromNowCalculator,
  CountdownTimer,
  DecimalTimeCalculatorComp,
  MsToSecondsCalculator,
  MsToDateCalculator,
  AgeCalculator,
  MilitaryTimeCalculator,
  TimeZoneConverter,
  SleepCalculator,
  MeetingCostCalculator,
  PomodoroTimer,
  TimeBetweenDatesCalculator,
  BirthdayCalculator,
  RetirementCountdown,
  WeddingCountdown,
  NewYearCountdown,
  ExamCountdown,
  TimeUntilMidnight,
  PaceCalculator,
  UnixTimestampTool,
  TimeCardCalculator,
  OvertimeCalculator,
  BillableHoursCalculator,
  ShiftCalculator,
  BreakCalculator,
  MinutesToHoursCalculator,
  HoursToMinutesCalculator,
  PregnancyCalculator,
  BusinessDayCalculator,
  DaysFromNowCalculator,
  Chronometer,
  USFederalHolidays,
  WorkHoursCalculator,
  TimeBetweenTimesCalculator,
  DateAddSubtractCalculator,
  WeekdayCalculator,
  WeekNumberCalculator,
  DayOfYearCalculator,
  LeapYearCalculator,
  ZodiacCalculator
} from '../components/CalculatorTools.tsx';
import SocialShare from '../components/SocialShare.tsx';

// --- EXTENDED CONTENT DATABASE (SEO ENGINE) ---
const TOOL_ARTICLE_DATA: Record<string, { intro: string, mechanics: string, benefits: string, howTo: string, faq: {q: string, a: string}[] }> = {
  'time-calculator': {
    intro: `Time calculation is a unique mathematical challenge because time does not follow the standard decimal (base-10) system that we use for most other forms of measurement. Instead, time relies on a sexagesimal (base-60) system, where 60 seconds make a minute and 60 minutes make an hour. This ancient system, dating back to the Babylonians, makes manual calculation prone to error. The Time Calculator on TimeCenterHub is engineered to handle these complex conversions instantly, allowing you to add or subtract hours, minutes, and seconds with atomic precision. Whether you are a video editor trying to calculate the total runtime of multiple clips, a pilot logging flight hours, or a payroll manager summing up weekly shifts, this tool eliminates the mental gymnastics required to convert "85 minutes" into "1 hour and 25 minutes".`,
    mechanics: `Under the hood, our Time Calculator converts all inputs into the smallest common unit (seconds). It then performs the addition or subtraction operation on this total second count. Once the result is obtained, the engine essentially "re-hydrates" the total seconds back into hours, minutes, and seconds using modulo arithmetic. For example, if you add 45 minutes to 30 minutes, the result is 75 minutes. The calculator divides 75 by 60 to find 1 hour with a remainder of 15 minutes. This logic ensures that no matter how large or small your values are, the final result is always mathematically valid according to ISO-8601 time standards.`,
    benefits: `Accurate time tracking is essential for productivity and fair compensation. For freelancers and contractors, every minute billed is revenue earned. Using a precise calculator prevents under-billing due to rounding errors. In scientific and athletic fields, the difference of a few seconds can be statistically significant. By automating the math, TimeCenterHub ensures that your data is consistent, verifiable, and free from human error. Furthermore, our calculator operates entirely client-side, meaning your data never leaves your device, ensuring maximum privacy for sensitive logs.`,
    howTo: `Using the Time Calculator is straightforward. First, enter your starting duration in the "Hours", "Minutes", and "Seconds" fields. You can leave fields blank if they are zero. Next, select your operation: choose "Add" if you want to combine two durations, or "Subtract" if you want to find the difference (or remaining time). Then, enter the second duration. Finally, click "Calculate Time". The result will appear instantly below, broken down into hours, minutes, and seconds. You can also use negative numbers if you need to subtract a larger time from a smaller one, which is useful for countdown planning.`,
    faq: [
      { q: "Why is adding time different from adding normal numbers?", a: "Normal numbers roll over at 10, 100, 1000, etc. Time rolls over at 60. If you add 0.50 + 0.50 in decimals, you get 1.00. But if you add 50 minutes + 50 minutes, you get 1 hour and 40 minutes, not 100 minutes. Our calculator handles this base-60 logic for you." },
      { q: "Can I use this for payroll?", a: "Yes, this tool is excellent for summing total hours worked. However, for converting those hours into a dollar amount, we recommend using our Time to Decimal converter after finding the total duration." },
      { q: "Does this calculator handle days?", a: "Currently, this specific tool focuses on H:M:S durations. If your total exceeds 24 hours, it will simply show the total hours (e.g., 26 hours) rather than converting it to '1 day and 2 hours', making it ideal for cumulative project tracking." }
    ]
  },
  'date-calculator': {
    intro: `Calculating future or past dates is critical for planning schedules, project deadlines, and legal timelines. The Date Calculator allows you to add or subtract specific units of time (years, months, weeks, days) to any starting date. Unlike simple arithmetic, adding "1 month" to a date is complex because months vary in length from 28 to 31 days. This tool handles those variations automatically.`,
    mechanics: `This tool uses the JavaScript Date object's intelligent rollover features. For example, if you add 1 month to January 31st, standard logic might try to create "February 31st," which doesn't exist. Our engine automatically corrects this to the proper date in March (or the last day of February, depending on the standard required), ensuring valid calendar dates are always returned.`,
    benefits: `Perfect for shipping estimates ("delivery in 3-5 business days"), legal deadlines ("30 days to respond"), or visa planning ("90 day stay limit"). It removes the need to manually count days on a physical calendar.`,
    howTo: `Select a start date. Choose "Add" or "Subtract". Enter the number of years, months, weeks, or days you wish to modify the date by. Click "Calculate" to see the resulting calendar date.`,
    faq: [{q: "Does it account for leap years?", a: "Yes, if you add 1 year to February 29th, the result will be handled correctly according to standard calendar logic."}]
  },
  'weekday-calculator': {
    intro: `Have you ever wondered what day of the week you were born on? Or what day of the week Christmas falls on in 2050? The Weekday Calculator answers this instantly. It uses the perpetual Gregorian calendar algorithm to determine the Monday-Sunday value for any valid date in history or the future.`,
    mechanics: `The calculator extracts the day index (0-6) from the Date object, which corresponds to Sunday through Saturday. It works for any date supported by the modern calendar system.`,
    benefits: `Useful for planning events where the day of the week matters (like weddings or parties), or for historical research to add context to past events.`,
    howTo: `Simply pick a date using the date selector. Click "What Day Is It?" and the tool will display the full day name (e.g., "Wednesday").`,
    faq: [{q: "Does this work for ancient dates?", a: "It works for dates within the standard Gregorian calendar era. Extremely ancient dates might vary due to calendar reforms (Julian vs Gregorian)."}]
  },
  'week-number': {
    intro: `In many corporate and European environments, timelines are managed by "Week Numbers" (1-53) rather than month names. This system, standardized by ISO-8601, breaks the year into numbered weeks starting on Monday. The Week Number Calculator helps you convert any standard date into its corresponding ISO week number.`,
    mechanics: `Calculating the ISO week number involves determining the first Thursday of the year. The first week of the year is the one that contains the first Thursday. Our algorithm performs this standard calculation to ensure compliance with international business standards.`,
    benefits: `Essential for supply chain management, manufacturing schedules, and working with international teams that utilize week-number planning.`,
    howTo: `Select a date. Click "Get ISO Week Number". The result will show the week number (e.g., Week 42).`,
    faq: [{q: "Why is there sometimes a Week 53?", a: "Years have 52 weeks plus 1 or 2 extra days. These extra days accumulate, leading to a 53rd week approximately every 5 or 6 years."}]
  },
  'leap-year': {
    intro: `A leap year occurs every 4 years to keep our calendar in alignment with the Earth's revolutions around the Sun. However, the rule isn't as simple as "every 4 years" (years divisible by 100 are not leap years, unless they are also divisible by 400). This calculator instantly verifies the status of any year.`,
    mechanics: `It applies the full Gregorian logic: Year % 4 == 0 AND (Year % 100 != 0 OR Year % 400 == 0).`,
    benefits: `Useful for developers programming date logic, or anyone curious about why February has 29 days in a specific year.`,
    howTo: `Type in a 4-digit year (e.g., 2024). Click "Check Year" to see if it is a leap year.`,
    faq: [{q: "Was 2000 a leap year?", a: "Yes, because it is divisible by 400."}]
  },
  'day-of-year': {
    intro: `The Day of Year (also known as the ordinal date) is the number of the day ranging from 1 to 365 (or 366). January 1st is Day 1. This format is often used in computing, meteorology, and military logistics.`,
    mechanics: `The tool calculates the difference in time between the selected date and the very first moment of that year, then converts that duration into days.`,
    benefits: `Simplifies data entry for systems that require ordinal dates and helps in calculating percentage progress through the year.`,
    howTo: `Select a date. Click "Calculate Day Number".`,
    faq: []
  },
  'zodiac-calculator': {
    intro: `Astrology divides the year into 12 periods, each associated with a Zodiac sign. This calculator determines your Sun Sign based on your date of birth.`,
    mechanics: `It checks the month and day against the standard tropical zodiac dates (e.g., Aries is March 21 - April 19).`,
    benefits: `A fun and simple tool for personal insight or checking horoscopes.`,
    howTo: `Enter your birth date. Click "Find Sign".`,
    faq: []
  },
  'time-between-times': {
    intro: `Calculating the exact duration between two clock times is a frequent necessity in daily life, yet it can be surprisingly tricky. The Time Duration Calculator is designed to solve one specific problem: finding the elapsed time between a specific Start Time and End Time. This is distinct from simply adding durations; it involves understanding the 24-hour cycle of the day. A common complexity arises when a duration crosses midnight—for example, a shift starting at 10:00 PM and ending at 2:00 AM. A standard subtraction would result in a negative number, but our engine intelligently detects the day rollover to provide the correct 4-hour duration.`,
    mechanics: `The calculator accepts inputs in standard 12-hour (AM/PM) or 24-hour formats. It converts these clock times into "minutes from midnight". For example, 1:00 AM is 60 minutes, while 1:00 PM is 780 minutes. It then subtracts the start value from the end value. If the result is negative (indicating the end time is technically "earlier" in the day cycle than the start time), the engine adds 1440 minutes (24 hours) to the result, correctly interpreting the time as crossing into the next day. This ensures 100% accuracy for overnight shifts, flight connections, and sleep tracking.`,
    benefits: `This tool is indispensable for HR managers verifying timesheets, travelers planning layovers, and individuals tracking sleep or fasting windows. By automating the "midnight math", it prevents the common off-by-one-hour errors that occur when manually calculating durations across the 12-hour meridian. It provides a clear, unambiguous statement of hours and minutes elapsed.`,
    howTo: `Enter your "Start Time" using the time picker or by typing. Be sure to specify AM or PM if you are using a 12-hour format. Then, enter your "End Time". The calculator updates instantly (or upon clicking "Calculate Duration") to show the exact gap. The result is displayed in total hours and minutes.`,
    faq: [
      { q: "Does it account for breaks?", a: "This specific tool calculates the gross duration between two points. For net work hours (minus breaks), please use our dedicated Work Hours Calculator or Break Calculator." },
      { q: "What if the duration is longer than 24 hours?", a: "This calculator assumes the start and end times occur within a 24-hour window (or the immediate next day). For multi-day calculations, use the Time Between Dates tool." }
    ]
  },
  'speed-distance-time': {
    intro: `The relationship between Speed, Distance, and Time is one of the fundamental principles of physics and everyday logistics. Whether you are planning a road trip, training for a marathon, or managing a shipping fleet, understanding this triad is essential. The Speed Distance Time Calculator allows you to solve for any one of these variables by inputting the other two. It utilizes the classic formula: Speed = Distance ÷ Time. However, it simplifies the process by handling unit conversions and providing a user-friendly interface that lets you toggle between what you know and what you need to find.`,
    mechanics: `The calculator operates on three modes. In "Time" mode, it divides Distance by Speed. In "Distance" mode, it multiplies Speed by Time. In "Speed" mode, it divides Distance by Time. The output is formatted for readability—for example, converting a decimal hour result (like 1.5 hours) into a human-readable "1 hour and 30 minutes". It handles floating-point arithmetic to ensure high precision, making it suitable for both casual estimation and precise scientific homework.`,
    benefits: `Runners and cyclists use this to calculate their required pace to hit a target time. Drivers use it to estimate arrival times (ETA) based on average highway speeds. Logistics coordinators use it to plan delivery windows. By providing instant solutions to this variable equation, the tool aids in better planning, goal setting, and time management across diverse activities.`,
    howTo: `First, select what you want to calculate: Time, Distance, or Speed. The input fields will change based on your selection. Enter the two known values (e.g., if calculating Time, enter Distance and Speed). Click "Solve" to see the result.`,
    faq: [
      { q: "What units should I use?", a: "The calculator is unit-agnostic for the math, but assumes consistency. If you enter distance in Kilometers and Speed in km/h, the time will be in hours. If you use Miles and MPH, the time is still hours." },
      { q: "Can I use minutes instead of hours?", a: "Currently, the standard input for time is hours (as in km/h or mph). To use minutes, enter them as a decimal of an hour (eg., 30 minutes = 0.5 hours) or use our Time Unit Converter first." }
    ]
  },
  'time-in-decimal': {
    intro: `In many professional industries—law, accounting, consulting, and payroll—time is not tracked in hours and minutes (8:30), but in decimal hours (8.5). This standardization simplifies billing calculations, as you can simply multiply the decimal time by an hourly rate. The Time to Decimal Calculator bridges the gap between the clock on the wall and the spreadsheet on your computer. It instantly converts hours and minutes into a precise decimal number.`,
    mechanics: `The conversion logic is simple but vital. The hour component remains an integer. The minute component is divided by 60. For example, 15 minutes / 60 = 0.25. The calculator sums these values. It can also handle "rounding" logic implicitly by providing a precise float value, which is often rounded to two decimal places for currency calculations.`,
    benefits: `This tool eliminates the most common payroll error: treating minutes as decimals (e.g., assuming 8 hours 50 minutes is 8.50 hours—it's actually ~8.83). By ensuring accurate conversion, employees get paid for every minute worked, and clients are billed with mathematical integrity.`,
    howTo: `Enter the hours and minutes from your timesheet or clock. Click "Convert". The result is displayed as a decimal number (e.g., 8.75). You can then copy this number directly into your billing software or Excel sheet.`,
    faq: [
      { q: "Why is 30 minutes 0.5?", a: "Because 30 is half of 60. Decimal hours represent a fraction of the whole hour." },
      { q: "How many decimal places does it show?", a: "It typically shows two decimal places, which is standard for financial calculations." }
    ]
  },
  'meeting-cost-calculator': {
    intro: `Time is money, quite literally. The Meeting Cost Calculator helps you visualize the financial impact of a meeting by multiplying the number of attendees by their average hourly rate and the meeting duration.`,
    mechanics: `It uses the formula: Cost = (Attendees * Average Hourly Rate * Duration in Minutes) / 60.`,
    benefits: `Useful for businesses to evaluate the ROI of meetings and encourage efficiency.`,
    howTo: `Enter the number of attendees, average hourly rate, and duration. Click "Calculate Cost".`,
    faq: []
  },
  'federal-holidays': {
    intro: `Keeping track of US Federal Holidays is essential for business planning, banking, and government services. This tool lists the upcoming federal holidays.`,
    mechanics: `It displays a static or calculated list of standard US holidays (New Year's, MLK Day, etc.) based on the current year.`,
    benefits: `Helps you plan days off and know when banks or post offices are closed.`,
    howTo: `View the list of holidays displayed on the page.`,
    faq: []
  },
  'time-unit-converter': {
    intro: `Time is measured in many scales, from the fleeting millisecond to the span of a century. The Time Unit Converter is a comprehensive utility designed to translate temporal quantities across these scales. Whether you are a student visualizing how many seconds are in a year, or a project manager converting a 3-week sprint into working hours, this tool provides the answers instantly. It covers seconds, minutes, hours, days, weeks, months, and years.`,
    mechanics: `The tool uses standard Gregorian calendar constants. A minute is 60 seconds. An hour is 3600 seconds. A day is 86,400 seconds. A year is approximated to 365.2425 days to account for leap year averages in scientific contexts, or standard 365 days for casual use (our specific implementation uses the standard 365 day calendar year for simplicity unless specified). It performs multiplication or division based on the direction of conversion.`,
    benefits: `Context is key in data analysis. "100,000 seconds" is hard to visualize, but "1.15 days" is immediately understandable. This tool helps users grasp the magnitude of time periods, facilitates better estimation, and aids in technical conversions for programming or engineering data.`,
    howTo: `Enter the value you want to convert. Select the current unit of that value from the dropdown (e.g., "Hours"). The tool will automatically calculate and display the equivalent value in all other supported units (Seconds, Days, Weeks, etc.) simultaneously.`,
    faq: [
      { q: "How are months calculated?", a: "We use an average month length of 30.44 days to approximate conversions, as months vary from 28 to 31 days." }
    ]
  },
  'ms-to-seconds': {
    intro: `In the world of computing, time is often counted in milliseconds (thousandths of a second). Network latency, disk read speeds, and animation durations are all defined in this high-resolution unit. However, humans think in seconds and minutes. The Milliseconds to Seconds Calculator is a specialized utility for developers, gamers, and system administrators to translate raw system data into human-readable durations.`,
    mechanics: `The math is straightforward: 1 Second = 1,000 Milliseconds. The calculator divides the input by 1,000 to get seconds. It preserves decimal precision, which is crucial when analyzing sub-second performance metrics (e.g., page load time of 0.35s).`,
    benefits: `For developers debugging code or optimizing website performance, this tool provides a quick sanity check. It is also useful for video editors working with frame-accurate timings or gamers configuring input delay settings.`,
    howTo: `Enter the millisecond value (e.g., 4500). The result (4.5 seconds) appears immediately.`,
    faq: [
      { q: "What is a millisecond?", a: "It is one thousandth of a second. There are 1,000 ms in 1 second." }
    ]
  },
  'ms-to-date': {
    intro: `Modern computer systems store dates and times as a single number: the "Unix Timestamp". This is the number of milliseconds that have elapsed since midnight on January 1, 1970 (UTC). While efficient for computers, a number like "1708300000000" is meaningless to a human. The Milliseconds to Date Converter decodes this timestamp into a readable calendar date and clock time in your local time zone.`,
    mechanics: `The tool utilizes the browser's built-in Date object, which accepts a millisecond integer and converts it to the user's local locale string. It automatically handles time zone offsets, leap years, and daylight savings adjustments that have occurred since 1970.`,
    benefits: `This is an essential tool for database administrators, backend developers, and data analysts who encounter raw timestamps in logs or JSON data. It allows them to quickly verify when an event actually occurred—was that error logged yesterday or today?`,
    howTo: `Copy and paste the 13-digit millisecond timestamp into the input field. Click "Decode Moment". The readable date and time will be displayed below.`,
    faq: [
      { q: "What if my timestamp only has 10 digits?", a: "That is likely in Seconds (Unix Epoch), not Milliseconds. You can add three zeros to the end to convert it to milliseconds for this tool, or use our Unix Timestamp converter." }
    ]
  },
  'hours-from-now': {
    intro: `Planning for the immediate future often requires projecting time forward. "What time will it be 8 hours from now?" is a common question for shift workers, travelers, and planners. The Hours From Now Calculator answers this instantly, providing not just the time, but also the date (in case the duration crosses midnight). It handles the mental math of "clock arithmetic" so you don't have to count on your fingers.`,
    mechanics: `The calculator takes the current system time (Now) and adds the requested duration (converted to milliseconds). It then formats the resulting new Date object into a readable string. It respects AM/PM cycles and month/year rollovers.`,
    benefits: `Useful for setting alarms ("I need to wake up in 7 hours"), tracking medication intervals ("Take next pill in 4 hours"), or coordinating with international colleagues ("It will be 5 PM their time in 3 hours").`,
    howTo: `Enter the number of hours (or minutes). Click "Project Future Time". The result shows the exact time it will be.`,
    faq: [
      { q: "Does it adjust for Daylight Savings?", a: "Yes, because it is using your device's calendar logic, if the duration crosses a DST change, the time will reflect that shift." }
    ]
  },
  'countdown-timer': {
    intro: `A Countdown Timer is more than just a clock ticking down; it is a psychological tool for focus and urgency. Whether you are timing a hard-boiled egg, limiting a brainstorming session, or managing a classroom quiz, a clear visual timer keeps everyone on track. TimeCenterHub's Countdown Timer is designed for high visibility and simplicity, removing the distractions of complex apps.`,
    mechanics: `The timer uses ` + "`setInterval`" + ` in JavaScript to decrement a counter variable every 1000 milliseconds (1 second). It updates the display state on every tick. When the counter reaches zero, it stops.`,
    benefits: `Using a timer creates a "timebox"—a fixed period in which to complete a task. This is a proven productivity technique to reduce procrastination. It is also vital for activities that require precise durations, such as exercise intervals (HIIT) or cooking.`,
    howTo: `Enter the total seconds (or convert minutes to seconds first) you want to count down. Click "Start". The large display will begin counting down. You can pause or restart at any time.`,
    faq: [
      { q: "Does this work if I switch tabs?", a: "Modern browsers sometimes slow down background tabs to save battery. For best accuracy, keep the tab open or in a separate window." }
    ]
  },
  'chronometer': {
    intro: `A Chronometer (or Stopwatch) is a device used to measure the amount of time elapsed from a particular time when it is activated to the time when the piece is deactivated. From ancient water clocks to the modern digital stopwatch on your phone, measuring intervals has always been a key human need. Our online Chronometer offers high-precision timing without the need for a physical device.`,
    mechanics: `This tool uses the high-resolution performance.now() API (where available) or Date.now() to track time deltas. It updates the display every 10 milliseconds to show a smooth ticking effect. The "Lap" feature stores the current time value in an array without stopping the main timer, allowing you to track splits.`,
    benefits: `Essential for athletes tracking laps, scientists measuring reaction times, or chefs timing complex recipes. The lap function is particularly useful for comparing performance across multiple iterations of the same task.`,
    howTo: `Click "Start" to begin the timer. Click "Lap" to record a split time (the timer keeps running). Click "Stop" to pause the timer. Click "Reset" to clear all data and return to zero.`,
    faq: [
      { q: "How accurate is this stopwatch?", a: "It is accurate to within a few milliseconds, limited only by your browser's refresh rate and device performance." }
    ]
  },
  'add-time': {
    intro: `Adding time values together is a common task for pilots, video editors, and project managers. The Add Time Calculator allows you to sum multiple time durations (Hours:Minutes:Seconds) to find a total cumulative time.`,
    mechanics: `It converts all inputs to seconds, sums them up, and then converts the total back to H:M:S format.`,
    benefits: `Perfect for calculating total flight hours, video runtime, or weekly work hours.`,
    howTo: `Enter the time values you want to add. The total is updated automatically.`,
    faq: []
  },
  'subtract-time': {
    intro: `Finding the difference between two time values is essential for calculating durations or remaining time. The Subtract Time Calculator does exactly this.`,
    mechanics: `It subtracts the second time value from the first (converted to seconds) and displays the result.`,
    benefits: `Useful for determining how long a task took or how much time is left before a deadline.`,
    howTo: `Enter the start and end times (or two durations). The difference is displayed instantly.`,
    faq: []
  },
  'minutes-from-now': {
    intro: `Need to know exactly what time it will be in 45 minutes? The Minutes From Now Calculator projects the current time forward by any number of minutes.`,
    mechanics: `It adds the specified number of minutes to the current system time and formats the result.`,
    benefits: `Great for setting cooking timers, parking meters, or quick reminders.`,
    howTo: `Enter the number of minutes. The future time is displayed.`,
    faq: []
  },
  'time-until-midnight': {
    intro: `Curious how much of the day is left? The Time Until Midnight tool provides a live countdown to 12:00 AM.`,
    mechanics: `It calculates the difference between the current time and the next occurrence of midnight.`,
    benefits: `Helps with time management and staying aware of the day's remaining hours.`,
    howTo: `Simply view the countdown. It updates every second.`,
    faq: []
  },
  'sleep-calculator': {
    intro: `Waking up groggy is often due to interrupting a sleep cycle. The Sleep Calculator helps you determine the best times to fall asleep or wake up to ensure you complete full 90-minute sleep cycles.`,
    mechanics: `It calculates wake-up times by adding multiples of 90 minutes (the average sleep cycle length) to your fall-asleep time, plus 14 minutes for falling asleep.`,
    benefits: `Wake up feeling refreshed and alert by timing your alarm to the end of a sleep cycle.`,
    howTo: `Enter the time you want to wake up, or when you plan to go to bed. The tool suggests optimal times.`,
    faq: []
  },
  'time-between-dates': {
    intro: `Calculating the number of days between two dates is useful for project planning, event countdowns, or simply curiosity. The Time Between Dates Calculator finds the exact duration in years, months, weeks, and days.`,
    mechanics: `It calculates the difference in milliseconds between the two selected dates and converts it into various time units.`,
    benefits: `Accurately track project durations, age differences, or time since a historical event.`,
    howTo: `Select a start date and an end date. The duration is calculated instantly.`,
    faq: []
  },
  'days-from-now': {
    intro: `Need to know what date it will be in 90 days? The Days From Now Calculator allows you to add or subtract days from the current date to find a future or past date.`,
    mechanics: `It adds the specified number of days (converted to milliseconds) to the current date object.`,
    benefits: `Essential for calculating warranty expirations, trial periods, or project deadlines.`,
    howTo: `Enter the number of days. Select "From Today" or "Before Today". The date is displayed.`,
    faq: []
  },
  'business-day-calculator': {
    intro: `In the business world, weekends and holidays don't count. The Business Days Calculator determines the number of working days between two dates, excluding Saturdays and Sundays.`,
    mechanics: `It iterates through the days between the start and end dates, incrementing the count only if the day is not a weekend (Sat/Sun).`,
    benefits: `Crucial for HR, payroll, and project management where deadlines are based on business days.`,
    howTo: `Select start and end dates. The tool displays the total business days.`,
    faq: []
  },
  'pregnancy-due-date': {
    intro: `Expecting a baby? The Pregnancy Due Date Calculator estimates your delivery date based on the first day of your last menstrual period (LMP).`,
    mechanics: `It uses Naegele's Rule: adds 280 days (40 weeks) to the first day of the LMP.`,
    benefits: `Helps expectant parents plan for the arrival of their new family member.`,
    howTo: `Select the first day of your last period. The estimated due date is shown.`,
    faq: []
  },
  'birthday-countdown': {
    intro: `Can't wait for your birthday? The Days to Birthday Calculator counts down the days, hours, minutes, and seconds until your special day.`,
    mechanics: `It compares the current date to your next birthday and calculates the remaining time.`,
    benefits: `Builds excitement and helps you plan your birthday celebration.`,
    howTo: `Enter your birth date. The countdown begins immediately.`,
    faq: []
  },
  'retirement-countdown': {
    intro: `Dreaming of retirement? The Retirement Countdown Calculator shows you exactly how much time is left until you can clock out for the last time.`,
    mechanics: `It calculates the time remaining until your selected retirement date.`,
    benefits: `Motivates you to save and plan for your financial freedom.`,
    howTo: `Enter your planned retirement date. View the countdown.`,
    faq: []
  },
  'wedding-countdown': {
    intro: `Counting down to the big day? The Wedding Countdown Calculator tracks the time remaining until your wedding ceremony.`,
    mechanics: `It calculates the difference between now and your wedding date/time.`,
    benefits: `Keeps you on track with wedding planning and builds anticipation.`,
    howTo: `Enter your wedding date and time. The countdown starts.`,
    faq: []
  },
  'world-clock': {
    intro: `In our interconnected world, knowing the time in other cities is vital. The Global World Clock displays the current local time in major cities across different time zones.`,
    mechanics: `It uses the browser's Intl.DateTimeFormat API to fetch accurate local times for specific time zones.`,
    benefits: `Essential for scheduling international meetings, calling friends abroad, or tracking global markets.`,
    howTo: `View the list of cities. You can often add more or search for specific locations.`,
    faq: []
  },
  'work-hours-calculator': {
    intro: `Tracking your daily work hours is the first step to ensuring fair pay. The Work Hours Calculator allows you to input your clock-in and clock-out times to find your total hours worked.`,
    mechanics: `It subtracts the start time from the end time. If a break is entered, it subtracts that duration as well.`,
    benefits: `Prevents payroll disputes and helps freelancers bill accurately.`,
    howTo: `Enter start time, end time, and break duration. Click calculate.`,
    faq: []
  },
  'time-card-calculator': {
    intro: `Managing a weekly timesheet can be tedious. The Time Card Calculator sums up your work hours for an entire week, including overtime.`,
    mechanics: `It iterates through each day's entry, summing the net hours. It then applies overtime rules (e.g., >40 hours) if configured.`,
    benefits: `Streamlines the payroll process for employees and small business owners.`,
    howTo: `Enter hours for each day of the week. The total is calculated at the bottom.`,
    faq: []
  },
  'overtime-calculator': {
    intro: `Working extra hours? The Overtime Calculator helps you determine your gross pay, including time-and-a-half or double-time rates.`,
    mechanics: `It takes your regular hourly rate and hours worked. It applies a 1.5x multiplier to hours over 40 (standard rule).`,
    benefits: `Ensures you are being compensated correctly for your extra effort.`,
    howTo: `Enter your hourly rate and total hours. The pay breakdown is displayed.`,
    faq: []
  },
  'billable-hours': {
    intro: `Professionals like lawyers and accountants often bill in 6-minute or 15-minute increments. The Billable Hours Calculator converts actual time worked into these billable units.`,
    mechanics: `It divides the total minutes by the increment size (e.g., 6) and rounds up to the nearest whole unit.`,
    benefits: `Simplifies invoicing and ensures adherence to industry billing standards.`,
    howTo: `Enter the time worked and your billing increment. The billable units are shown.`,
    faq: []
  },
  'shift-calculator': {
    intro: `Complex shift patterns require careful planning. The Shift Calculator helps managers and employees organize rotating schedules.`,
    mechanics: `It allows you to define shift patterns (e.g., 4 days on, 2 days off) and projects them onto a calendar.`,
    benefits: `Helps in visualizing long-term schedules and planning time off.`,
    howTo: `Select your shift pattern and start date. The calendar populates automatically.`,
    faq: []
  },
  'break-calculator': {
    intro: `Taking breaks is required by law in many places. The Break Calculator helps you determine your net work hours by subtracting mandatory rest periods.`,
    mechanics: `It subtracts the total break duration from the total shift duration.`,
    benefits: `Ensures compliance with labor laws and accurate pay.`,
    howTo: `Enter shift start/end and break start/end. Net hours are calculated.`,
    faq: []
  },
  'military-time': {
    intro: `Military time (24-hour clock) is the international standard for unambiguous timekeeping. The Military Time Converter translates 12-hour AM/PM times into 24-hour format and vice versa.`,
    mechanics: `It adds 12 to PM hours (except 12 PM) and converts 12 AM to 00 hours.`,
    benefits: `Critical for travel, healthcare, and emergency services where confusion is dangerous.`,
    howTo: `Enter a time. The converted format appears instantly.`,
    faq: []
  },
  'minutes-to-hours': {
    intro: `Converting large numbers of minutes into hours and minutes makes them easier to understand. The Minutes to Hours Calculator does this instantly.`,
    mechanics: `It divides total minutes by 60 to get hours, and uses the remainder as minutes.`,
    benefits: `Useful for interpreting movie runtimes, flight durations, or recipe times.`,
    howTo: `Enter total minutes. The result is shown as X hr Y min.`,
    faq: []
  },
  'hours-to-minutes': {
    intro: `Sometimes you need to know the total minutes in a duration. The Hours to Minutes Calculator converts hours (and minutes) into a single minute value.`,
    mechanics: `It multiplies hours by 60 and adds the remaining minutes.`,
    benefits: `Helpful for calculations that require a single unit, like total billing minutes.`,
    howTo: `Enter hours and minutes. The total minutes are displayed.`,
    faq: []
  },
  'unix-timestamp': {
    intro: `The Unix Timestamp is the heartbeat of modern computing. This converter translates the count of seconds since 1970 into a human-readable date.`,
    mechanics: `It converts the timestamp (seconds or milliseconds) into a JavaScript Date object.`,
    benefits: `Essential for debugging server logs and database entries.`,
    howTo: `Paste a timestamp. The date is shown.`,
    faq: []
  },
  'pace-calculator': {
    intro: `Runners and cyclists need to know their speed. The Pace Calculator converts your time and distance into a pace (e.g., minutes per mile or km).`,
    mechanics: `It divides time by distance to find the pace.`,
    benefits: `Helps athletes track performance and set training goals.`,
    howTo: `Enter time and distance. Your pace is calculated.`,
    faq: []
  },
  'pomodoro-timer': {
    intro: `The Pomodoro Technique is a time management method that uses a timer to break work into intervals. This tool is a digital Pomodoro Timer.`,
    mechanics: `It sets a timer for 25 minutes (focus) followed by 5 minutes (break).`,
    benefits: `Improves mental agility and prevents burnout.`,
    howTo: `Click Start. Work until the timer rings. Take a break.`,
    faq: []
  },
  'new-year-countdown': {
    intro: `The New Year is a global moment of celebration. This countdown tracks the seconds until the ball drops in your time zone.`,
    mechanics: `It calculates the time remaining until January 1st of the next year.`,
    benefits: `Builds anticipation for the holiday.`,
    howTo: `Watch the countdown!`,
    faq: []
  },
  'exam-countdown': {
    intro: `Exams can be stressful. The Exam Countdown helps students manage their study time by showing exactly how many days are left until the test.`,
    mechanics: `It counts down to a user-selected exam date.`,
    benefits: `Encourages disciplined study habits.`,
    howTo: `Enter your exam date. The countdown begins.`,
    faq: []
  }
};

const ToolPage: React.FC = () => {
  const { toolId } = useParams();
  
  // Lookup by path (including leading slash) or id
  const currentPath = `/${toolId}`;
  const tool = TOOLS.find(t => t.path === currentPath) || TOOLS.find(t => t.id === toolId);

  // --- RELATED TOOLS LOGIC (UPDATED) ---
  // Instead of always grabbing the first 4 tools, grab the *next* 4 tools in the list relative to current tool.
  const categoryTools = TOOLS.filter(t => t.category === tool?.category);
  const currentIdx = categoryTools.findIndex(t => t.id === tool?.id);
  const relatedTools: typeof TOOLS = [];
  
  if (currentIdx !== -1) {
    // Cycle through next 4 tools
    for (let i = 1; i <= 4; i++) {
        // Use modulo to wrap around to the start of the list if we reach the end
        const next = categoryTools[(currentIdx + i) % categoryTools.length];
        // Double check we don't add the current tool (redundant if length > 1 but safe)
        if (next.id !== tool?.id) {
            relatedTools.push(next);
        }
    }
  } else if (categoryTools.length > 0) {
      // Fallback if index not found (shouldn't happen)
      relatedTools.push(...categoryTools.slice(0, 4));
  }

  // --- SMART CONTENT GENERATOR ---
  const getToolContent = () => {
    if (!tool) return null;
    const specificData = TOOL_ARTICLE_DATA[tool.id] || TOOL_ARTICLE_DATA[toolId || ''];
    
    const genericIntro = `Welcome to the ${tool.name}, a specialized utility designed for precision and ease of use. In our fast-paced world, managing the dimension of ${tool.category.toLowerCase()} is crucial. Whether you are a professional needing accurate data or an individual organizing your personal life, this tool provides instant, reliable results without the need for manual calculation. TimeCenterHub has engineered this tool to adhere to the highest standards of digital accuracy.`;
    
    const genericMechanics = `This tool operates by taking your input values and processing them through industry-standard algorithms. For time-based calculations, we utilize base-60 arithmetic to ensure minutes and seconds roll over correctly. For date-based tools, we employ the Gregorian calendar rules, accounting for leap years and varying month lengths. All processing occurs locally within your web browser's JavaScript engine, ensuring that your data remains private and the results are delivered instantly without server latency.`;
    
    const genericBenefits = `Why use an online ${tool.name}? Precision and speed. Manual calculations are prone to human error, especially when dealing with complex units like time or dates. By automating the process, you ensure that your results are consistent and verifiable. This tool is free, accessible 24/7 from any device, and requires no installation, making it the perfect companion for work, school, or daily planning.`;
    
    const genericHowTo = `1. Identify the input fields required (e.g., dates, times, or numeric values).\n2. Enter your data into the respective fields. Ensure accuracy for the best results.\n3. Click the calculation button (usually labeled "Calculate" or "Convert").\n4. View your result instantly in the display area below the button.\n5. Use the "Reset" or "Clear" button if you need to perform a new calculation.`;

    const genericFAQ = [
      { q: "Is this tool free?", a: "Yes, TimeCenterHub provides this tool completely free of charge." },
      { q: "Is it accurate?", a: "Yes, we use standard mathematical libraries and test our tools extensively." },
      { q: "Do you save my data?", a: "No. All calculations happen in your browser. We do not store your inputs." }
    ];

    return {
      intro: specificData?.intro || genericIntro,
      mechanics: specificData?.mechanics || genericMechanics,
      benefits: specificData?.benefits || genericBenefits,
      howTo: specificData?.howTo || genericHowTo,
      faq: specificData?.faq || genericFAQ
    };
  };

  const content = getToolContent();

  if (!tool || !content) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Tool not found</h1>
        <p className="text-slate-600 mt-4 font-medium text-lg">The calculator you are looking for might have been moved.</p>
        <Link to="/" className="text-blue-600 mt-10 inline-block font-black hover:underline text-xl">← Back to Home</Link>
      </div>
    );
  }

  const renderCalculator = () => {
    switch(tool.id) {
      case 'time-calculator': return <TimeCalculator />;
      case 'time-duration-calculator': return <TimeDurationCalculator />;
      case 'speed-distance-time': return <SpeedDistanceTimeCalculator />;
      case 'time-unit-converter': return <TimeUnitConverter />;
      case 'hours-from-now': return <TimeFromNowCalculator />;
      case 'countdown-timer': return <CountdownTimer />;
      case 'time-in-decimal': 
      case 'time-to-decimal': return <DecimalTimeCalculatorComp />;
      case 'ms-to-seconds': return <MsToSecondsCalculator />;
      case 'ms-to-date': return <MsToDateCalculator />;
      case 'age-calculator': return <AgeCalculator />;
      case 'date-calculator': return <DateAddSubtractCalculator />;
      case 'weekday-calculator': return <WeekdayCalculator />;
      case 'week-number': return <WeekNumberCalculator />;
      case 'day-of-year': return <DayOfYearCalculator />;
      case 'leap-year': return <LeapYearCalculator />;
      case 'zodiac-calculator': return <ZodiacCalculator />;
      case 'pregnancy-due-date': return <PregnancyCalculator />;
      case 'retirement-countdown': return <RetirementCountdown />;
      case 'work-hours-calculator': return <WorkHoursCalculator />;
      case 'military-time': return <MilitaryTimeCalculator />;
      case 'world-clock': return <TimeZoneConverter />;
      case 'sleep-calculator': return <SleepCalculator />;
      case 'meeting-cost-calculator': return <MeetingCostCalculator />;
      case 'pomodoro-timer': return <PomodoroTimer />;
      case 'time-between-dates': return <TimeBetweenDatesCalculator />;
      case 'pace-calculator': return <PaceCalculator />;
      case 'days-from-now': return <DaysFromNowCalculator />;
      case 'billable-hours': return <BillableHoursCalculator />;
      case 'time-between-times': return <TimeBetweenTimesCalculator />;
      case 'minutes-to-hours': return <MinutesToHoursCalculator />;
      case 'hours-to-minutes': return <HoursToMinutesCalculator />;
      case 'business-day-calculator': return <BusinessDayCalculator />;
      case 'time-card-calculator': return <TimeCardCalculator />;
      case 'overtime-calculator': return <OvertimeCalculator />;
      case 'unix-timestamp': return <UnixTimestampTool />;
      case 'shift-calculator': return <ShiftCalculator />;
      case 'break-calculator': return <BreakCalculator />;
      case 'time-until-midnight': return <TimeUntilMidnight />;
      case 'wedding-countdown': return <WeddingCountdown />;
      case 'new-year-countdown': return <NewYearCountdown />;
      case 'exam-countdown': return <ExamCountdown />;
      case 'birthday-countdown': return <BirthdayCalculator />;
      case 'chronometer': return <Chronometer />;
      case 'federal-holidays': return <USFederalHolidays />;
      default: return <div className="p-16 bg-slate-50 border rounded-3xl text-center text-slate-500 font-bold uppercase tracking-widest italic text-lg">Tool Initializing...</div>;
    }
  };

  // Helper to truncate description for SEO
  const getMetaDescription = () => {
      // Priority: 1. Specific Intro (truncated), 2. Long Description, 3. Short Description
      if (content.intro && content.intro.length > 50 && !content.intro.startsWith("Welcome to the")) {
          return content.intro.length > 160 ? content.intro.substring(0, 157) + '...' : content.intro;
      }
      return tool.longDescription || tool.description;
  };

  const metaDescription = getMetaDescription();

  return (
    <div className="min-h-screen bg-slate-50">
       <Helmet>
        <title>{tool.name} - Free Online Calculator & Tool | TimeCenterHub</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://timecenterhub.com${tool.path}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${tool.name} - Free Online Calculator & Tool`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`https://timecenterhub.com${tool.path}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TimeCenterHub" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${tool.name} - Free Online Calculator & Tool`} />
        <meta name="twitter:description" content={metaDescription} />
      </Helmet>

       {/* Breadcrumbs & Header Container */}
       <div className="bg-white border-b border-slate-200 pb-20 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center text-sm font-bold text-slate-500 uppercase tracking-wider mb-8">
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <svg className="w-4 h-4 mx-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                <span className="text-slate-600">{tool.category}</span>
                <svg className="w-4 h-4 mx-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                <span className="text-blue-600 truncate">{tool.name}</span>
            </nav>

            <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                {tool.name}
                </h1>
                <p className="text-xl text-slate-600 font-medium leading-relaxed">
                {tool.description}
                </p>
            </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
            {/* Calculator Card - Floating effect */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-2 md:p-4 mb-16 relative z-10">
                <div className="bg-slate-50/50 rounded-[2rem] overflow-hidden">
                   {renderCalculator()}
                </div>
                <SocialShare title={`Check out this ${tool.name}`} description={tool.description} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                {/* Left Content Column */}
                <div className="lg:col-span-8 space-y-12">
                     {/* How To Use Section */}
                     <section className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">How to use this tool</h2>
                        </div>
                        <div className="prose prose-slate prose-lg max-w-none font-medium text-slate-600 whitespace-pre-line leading-relaxed">
                            {content.howTo}
                        </div>
                     </section>

                     {/* Deep Content */}
                     <article className="prose prose-slate prose-lg max-w-none">
                        <h3 className="text-3xl font-black text-slate-900 mb-6">About {tool.name}</h3>
                        <p className="mb-8 text-slate-600 font-medium leading-relaxed text-lg">{content.intro}</p>
                        
                        <h3 className="text-3xl font-black text-slate-900 mb-6">How It Works</h3>
                        <p className="mb-8 text-slate-600 font-medium leading-relaxed text-lg">{content.mechanics}</p>
                        
                        <h3 className="text-3xl font-black text-slate-900 mb-6">Benefits</h3>
                        <p className="mb-8 text-slate-600 font-medium leading-relaxed text-lg">{content.benefits}</p>
                     </article>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                     {/* Related Tools */}
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-lg">
                        <h3 className="text-lg font-black uppercase tracking-wide mb-6 text-blue-400">Related Tools</h3>
                        <div className="space-y-4">
                            {relatedTools.map(rt => (
                                <Link key={rt.id} to={rt.path} className="block p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5 hover:border-white/10 group">
                                    <div className="font-bold text-sm mb-1 group-hover:text-blue-300 transition-colors">{rt.name}</div>
                                    <div className="text-xs text-slate-400 line-clamp-1">{rt.description}</div>
                                </Link>
                            ))}
                            {relatedTools.length === 0 && <p className="text-slate-500 text-sm">No related tools found.</p>}
                        </div>
                         <Link to="/sitemap" className="inline-block mt-8 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">View All Tools →</Link>
                    </div>

                    {/* FAQ Card */}
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm sticky top-8">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-6">Common Questions</h3>
                        <div className="space-y-6">
                            {content.faq.map((item, idx) => (
                                <div key={idx}>
                                    <h4 className="font-bold text-slate-800 mb-2 text-base leading-snug">{item.q}</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
  );
};

export default ToolPage;