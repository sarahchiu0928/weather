import React from 'react'
import { Stack } from '@mui/material'
import { FONT_COLOR } from '../constants/colors'

interface WeatherProps {
  children?: React.ReactNode,
}

export function WeatherBg ({ children }: WeatherProps) {
  return (
    <Stack
      minHeight="100vh"
      direction="column"
      alignItems="center"
      color={FONT_COLOR}
      sx={{
        backgroundColor: '#BCD0DB',
      }}
    >
      {children}
    </Stack>
  )
}
