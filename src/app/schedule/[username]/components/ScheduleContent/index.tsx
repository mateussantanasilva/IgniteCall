'use client'

import { useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'
import { UsernameParamContext } from '@/contexts/UsernameParamProvider'
import { Avatar, Heading, Text } from '@ignite-ui/react'
import { ScheduleForm } from '../ScheduleForm'
import { Container, UserHeader } from './styles'

interface ScheduleContentProps {
  user: {
    name: string
    username: string
    bio: string
    avatarUrl: string
  }
}

export function ScheduleContent({ user }: ScheduleContentProps) {
  const onSetUsernameParam = useContextSelector(
    UsernameParamContext,
    (context) => {
      return context.onSetUsernameParam
    },
  )

  useEffect(() => {
    onSetUsernameParam(user.username)
  })

  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} alt={user.name} />

        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </Container>
  )
}
