import { styled, Heading, Text } from '@ignite-ui/react'

export const Container = styled('main', {
  display: 'flex',
  alignItems: 'center',
  gap: '$20',

  marginLeft: 'auto',
  maxWidth: 'calc(100vw - (100vw - 1160px) /2)', // when the screen grows, only one side grows
  height: '100vh',
})

export const Hero = styled('section', {
  padding: '0 $5',
  maxWidth: '500px',

  // tag independent component
  [`> ${Heading}`]: {
    '@media (max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    maxWidth: '480px',

    marginTop: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media (max-width: 600px)': {
    display: 'none',
  },
})
