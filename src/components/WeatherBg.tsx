import React from 'react'
import { Stack } from '@mui/material'

interface WeatherProps {
  children?: React.ReactNode,
}

export function WeatherBg ({ children }: WeatherProps) {
  return (
    <Stack
      minHeight="100vh"
      direction="column"
      alignItems="center"
      color="#566489"
      sx={{
        backgroundColor: '#BCD0DB',
      }}
    >
      {children}
    </Stack>
  )
}
