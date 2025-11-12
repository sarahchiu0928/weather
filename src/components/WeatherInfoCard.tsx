import { Box, Typography } from '@mui/material'

interface WeatherInfoCardProps {
  title: string,
  value: string | number,
}

export function WeatherInfoCard ({ title, value }: WeatherInfoCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: '#E3EDF7',
        borderRadius: '20px',
        textAlign: 'center',
        py: '41px',
        boxShadow: '0px 4px 0px 0px rgba(0,0,0,0.25)',
      }}
    >
      <Typography sx={{ fontSize: '16px', color: '#5A6E8C', mb: 3 }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: '28px', fontWeight: 'bold', color: '#5A6E8C' }}>
        {value}
      </Typography>
    </Box>
  )
}
