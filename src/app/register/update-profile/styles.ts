import { Box, Button, Text, styled } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  marginTop: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
  },

  [`${Button}`]: {
    height: '2.875rem',
  },
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
