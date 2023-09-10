import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { registerFormData } from '@/app/register/page'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const { name, username }: registerFormData = await request.json()

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists)
    return NextResponse.json('Username already exists', { status: 400 })

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  cookies().set('@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: '/', // all routes has access permissions
  })

  return NextResponse.json(user, { status: 201 })
}
