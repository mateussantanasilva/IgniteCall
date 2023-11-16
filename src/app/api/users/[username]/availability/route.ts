import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

interface AvailabilityParams {
  params: {
    username: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: AvailabilityParams,
) {
  const username = params.username
  const date = request.nextUrl.searchParams.get('date')
  const userTimeZone = request.nextUrl.searchParams.get('userTimeZone')

  if (!date || !userTimeZone)
    return NextResponse.json('Date or time zone not provided', { status: 400 })

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) return NextResponse.json('User does not exist', { status: 400 })

  const referenceDate = dayjs(date)
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate)
    return NextResponse.json({ possibleTimesAvaiable: [], availableTimes: [] })

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability)
    return NextResponse.json({ possibleTimesAvaiable: [], availableTimes: [] })

  const { start_time_in_minute, end_time_in_minute } = userAvailability
  const startHour = start_time_in_minute / 60
  const endHour = end_time_in_minute / 60

  const possibleTimesAvaiable = Array.from({ length: endHour - startHour }).map(
    (_, index) => {
      return startHour + index
    },
  )

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        // sum default time with start time and end time
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimesAvaiable.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    )

    const isTimeInPast = referenceDate
      .set('hour', time - Number(userTimeZone))
      .isBefore(new Date())

    return !isTimeBlocked && !isTimeInPast
  })

  return NextResponse.json({ possibleTimesAvaiable, availableTimes })
}
