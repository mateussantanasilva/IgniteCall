'use client'

import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import dayjs from 'dayjs'
import { Calendar } from '@/components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import { api } from '@/lib/axios'
import { UsernameParamContext } from '@/contexts/UsernameParamProvider'
import { useQuery } from '@tanstack/react-query'

interface Availability {
  possibleTimesAvaiable: number[]
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const username = useContextSelector(UsernameParamContext, (context) => {
    return context.usernameParam
  })

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const isDateSelected = !!selectedDate

  const selectedDateWithoutTime = isDateSelected
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const userTimeZone = new Date().getTimezoneOffset() / 60

  const { data: availability } = useQuery<Availability>({
    // adding all the information used in the request to create the cache key
    queryKey: ['availability', username, selectedDateWithoutTime],

    queryFn: async () => {
      const { data } = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
          userTimeZone,
        },
      })

      return data
    },

    enabled: isDateSelected, // only runs if date is selected
  })

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay}, <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimesAvaiable.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
