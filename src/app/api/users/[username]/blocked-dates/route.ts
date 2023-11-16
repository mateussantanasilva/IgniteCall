import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
  const year = request.nextUrl.searchParams.get('year')
  const month = request.nextUrl.searchParams.get('month')

  if (!year || !month)
    return NextResponse.json('Year or month not specified', { status: 400 })

  const formattedYearAndMonth = `${year}-${String(month).padStart(2, '0')}`

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) return NextResponse.json('User does not exist', { status: 400 })

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })

  /* 
    does not working with SQLite
    
    code explanation:

    selects all dates, scheduled times and possible available times.
    together with the table of possible times to book, adding 1 day to equal the bill.
    query executed for the past month and year.
    grouping by day and amount of time available.
    returning only if the number of appointments is equal to what was available.
  */

  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT
      EXTRACT(DAY FROM S.DATE) AS date,
      COUNT(S.date) AS amount_schedulings,
      ((UTI.end_time_in_minute - UTI.start_time_in_minute) / 60) AS available_times

    FROM schedulings S

    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

    WHERE S.user_id = ${user.id}
      AND UTI.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${formattedYearAndMonth}

    GROUP BY EXTRACT(DAY FROM S.DATE),
      ((UTI.end_time_in_minute - UTI.start_time_in_minute) / 60)

    HAVING amount_schedulings = available_times
  `

  const blockedDates = blockedDatesRaw.map((item) => item.date)

  return NextResponse.json({ blockedWeekDays, blockedDates })
}
