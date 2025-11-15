import { Typography } from '@mui/material'
import { VStack } from '../ui/VStack'

interface WeatherInfoCardProps {
  title: string,
  value: string | number,
}

export function WeatherInfoCard ({ title, value }: WeatherInfoCardProps) {
  return (
    <VStack
      sx={{
        backgroundColor: '#E3EDF7',
        borderRadius: '20px',
        py: '41px',
        boxShadow: '0px 4px 0px 0px rgba(0,0,0,0.25)',
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Typography sx={{ fontSize: '16px', color: '#5A6E8C' }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: '28px', fontWeight: 'bold', color: '#5A6E8C' }}>
        {value}
      </Typography>
    </VStack>
  )
}
