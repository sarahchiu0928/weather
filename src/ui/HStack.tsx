import { Box, type BoxProps } from '@mui/material'
import { type PropsWithChildren } from 'react'

interface HStackProps extends BoxProps {}

export function HStack ({ children, ...rest }: PropsWithChildren<HStackProps>) {
  return (
    <Box display="flex" flexDirection="row" {...rest}>
      {children}
    </Box>
  )
}
