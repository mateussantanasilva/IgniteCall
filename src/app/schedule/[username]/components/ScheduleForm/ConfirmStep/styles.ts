import { Box, Text, styled } from '@ignite-ui/react'

export const ConfirmForm = styled(Box, {
  maxWidth: '33.75rem',
  margin: '$6 auto 0',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  paddingBottom: '$6',
  borderBottom: '1px solid $gray600',
  marginBottom: '$2',

  [`${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    svg: {
      color: '$gray200',
      width: '$5',
      height: '$5',
    },
  },

  '@media (max-width: 425px)': {
    flexDirection: 'column',
    alignItems: 'start',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68 !important',
})

export const FormActions = styled(Text, {
  marginTop: '$2',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',

  '@media (max-width: 425px)': {
    flexDirection: 'column-reverse',
  },
})
