'use client'

import '@/lib/dayjs'
import { useState } from 'react'
import dayjs from 'dayjs'
import { getWeekDays } from '@/utils/get-week-days'
import { useCalendar } from '@/hooks/useCalendar'
import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useContextSelector } from 'use-context-selector'
import { UsernameParamContext } from '@/contexts/UsernameParamProvider'

interface CalendarProps {
  onDateSelected: (date: Date) => void
}

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export function Calendar({ onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const shortWeekDay = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const username = useContextSelector(UsernameParamContext, (context) => {
    return context.usernameParam
  })

  const { data: blockedDates } = useQuery<BlockedDates>({
    // adding all the information used in the request to create the cache key
    queryKey: [
      'blocked-dates',
      username,
      currentDate.get('year'),
      currentDate.get('month'),
    ],

    queryFn: async () => {
      const { data } = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month') + 1,
        },
      })

      return data
    },
  })

  const calendarWeeks = useCalendar({
    currentDate,
    blockedDates: blockedDates as BlockedDates,
  })

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')

    setCurrentDate(nextMonthDate)
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button title="Mês anterior" onClick={handlePreviousMonth}>
            <CaretLeft />
          </button>

          <button title="Próximo mês" onClick={handleNextMonth}>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDay.map((weekDay) => (
              <th key={weekDay}>{weekDay}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                      >
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
