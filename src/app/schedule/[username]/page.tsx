import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ScheduleContent } from './components/ScheduleContent'

export const metadata: Metadata = {
  title: 'Agendar compromisso',
}

interface ScheduleProps {
  params: {
    username: string
  }
}

export const revalidate = 60 * 60 * 24 // 1 day

export async function generateStaticParams() {
  // fallback equals dynamicParams which by default is true (similar option to 'blocking')
  return []
}

async function getUser(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) notFound()

  return {
    user: {
      name: user.name,
      username,
      bio: user.bio as string,
      avatarUrl: user.avatar_url as string,
    },
  }
}

export default async function Schedule({ params }: ScheduleProps) {
  const { user } = await getUser(params.username)

  if (!user) return

  return <ScheduleContent user={user} />
}
