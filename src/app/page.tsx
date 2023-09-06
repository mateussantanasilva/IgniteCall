'use client'

import Image from 'next/image'
import { Heading, Text } from '@ignite-ui/react'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { Container, Hero, Preview } from './styles'

import PreviewImage from '../assets/app-preview.jpg'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl" as="h1">
          Agendamento descomplicado
        </Heading>

        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={PreviewImage}
          alt="Calendário simbolizando aplicação em funcionamento"
          height={400}
          quality={100} // kep the quality
          priority // show only with full image
        />
      </Preview>
    </Container>
  )
}
