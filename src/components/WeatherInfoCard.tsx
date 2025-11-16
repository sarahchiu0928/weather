import { Typography } from '@mui/material'
import { VStack } from '../ui/VStack'
import { CARD_BACKGROUND, CARD_SHADOW, FONT_COLOR } from '../constants/colors'

interface WeatherInfoCardProps {
  title: string,
  value: string | number,
}

export function WeatherInfoCard ({ title, value }: WeatherInfoCardProps) {
  return (
    <VStack
      sx={{
        background: CARD_BACKGROUND,
        borderRadius: '20px',
        py: '41px',
        boxShadow: CARD_SHADOW,
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Typography sx={{ fontSize: '16px', color: FONT_COLOR }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: '28px', fontWeight: 'bold', color: FONT_COLOR }}>
        {value}
      </Typography>
    </VStack>
  )
}
