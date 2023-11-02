import { useMemo } from 'react'
import dayjs from 'dayjs'

interface CalendarDay {
  date: dayjs.Dayjs
  disabled: boolean
}

interface CalendarWeek {
  week: number
  days: CalendarDay[]
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  currentDate: dayjs.Dayjs
  blockedDates: {
    blockedWeekDays: number[]
    blockedDates: number[]
  }
}

export function useCalendar({ currentDate, blockedDates }: CalendarProps) {
  function buildArrayOfCalendarWeeks() {
    if (!blockedDates) return []

    // date != day (day of the week - Sunday...)

    const currentMonthFillArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map<CalendarDay>((_, index) => {
      const date = currentDate.set('date', index + 1)

      return {
        date,
        disabled:
          date.endOf('day').isBefore(new Date()) ||
          blockedDates.blockedWeekDays.includes(date.get('day')) ||
          blockedDates.blockedDates.includes(date.get('date')),
      }
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map<CalendarDay>((_, index) => {
        return {
          date: currentDate.subtract(index + 1, 'day'),
          disabled: true,
        }
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map<CalendarDay>((_, index) => {
      return {
        date: lastDayInCurrentMonth.add(index + 1, 'day'),
        disabled: true,
      }
    })

    const calendarDays = [
      ...previousMonthFillArray,
      ...currentMonthFillArray,
      ...nextMonthFillArray,
    ]

    const calendarWeeks: CalendarWeeks = []

    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push({
        week: i / 7 + 1,
        days: calendarDays.slice(i, i + 7),
      })
    }

    return calendarWeeks
  }

  return useMemo(buildArrayOfCalendarWeeks, [currentDate, blockedDates])
}
