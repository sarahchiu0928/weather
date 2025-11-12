import { Box, type BoxProps } from '@mui/material'
import { type PropsWithChildren } from 'react'

interface VStackProps extends BoxProps {
}

export function VStack ({ children, ...rest }: PropsWithChildren<VStackProps>) {
  return (
    <Box display="flex" flexDirection="column" {...rest}>
      {children}
    </Box>
  )
}
