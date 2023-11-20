import { Box, Button, Text, styled } from '@ignite-ui/react'

export const IntervalBox = styled(Box, {
  marginTop: '$6',

  display: 'flex',
  flexDirection: 'column',

  [`${Button}`]: {
    height: '2.875rem',
  },
})

export const IntervalsContainer = styled('section', {
  border: '1px solid $gray600',
  borderRadius: '$md',
  marginBottom: '$4',
})

export const IntervalItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '$3 $4',

  '& + &': {
    borderTop: '1px solid $gray600',
  },
})

export const IntervalDay = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const IntervalInputs = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  // styling clock icon in time type input
  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(100%) brightness(40%)',
  },
})

export const FormError = styled(Text, {
  marginBottom: '$4 !important',
  color: '#f75a68 !important',
})
