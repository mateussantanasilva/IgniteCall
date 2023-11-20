import { Box, Button, Text, styled } from '@ignite-ui/react'

export const ConnectBox = styled(Box, {
  marginTop: '$6',

  display: 'flex',
  flexDirection: 'column',

  [`> ${Button}`]: {
    height: '2.875rem',
  },
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '1px solid $gray600',
  padding: '$4 $6',
  borderRadius: '$md',

  marginBottom: '$4',

  [`> ${Button}`]: {
    border: '2px solid $ignite500',
  },

  '@media (max-width: 425px)': {
    flexDirection: 'column',
    gap: '$2',
  },
})

export const AuthError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$4',
})
