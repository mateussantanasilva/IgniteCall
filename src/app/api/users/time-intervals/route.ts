import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json('Session error', { status: 401 })

  const { intervals } = timeIntervalsBodySchema.parse(await request.json())

  // create all intervals at the same time
  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          start_time_in_minute: interval.startTimeInMinutes,
          end_time_in_minute: interval.endTimeInMinutes,
          user_id: session.user.id,
        },
      })
    }),
  )

  return NextResponse.json('Created intervals', { status: 201 })
}
