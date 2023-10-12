import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../../auth/[...nextauth]/route'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json('Session error', { status: 401 })

  const { bio } = updateProfileBodySchema.parse(await request.json())

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  // , { status: 204 }
  return NextResponse.json('User updated with bio field')
}
