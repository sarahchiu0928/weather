import { Typography, Divider } from '@mui/material'
import { WeatherIcon } from './WeatherIcon'
import { useWeather } from './WeatherProvider/useWeather'
import { useCurrentWeather } from '../hooks-api/useCurrentWeather'
import { useForecastWeather } from '../hooks-api/useForecastWeather'
import { VStack } from '../ui/VStack'
import { HStack } from '../ui/HStack'
import { CARD_BACKGROUND, CARD_SHADOW, FONT_COLOR } from '../constants/colors'

const formatTemperature = (value?: number | null) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return `${value.toFixed(1)}°C`
  }
  return '--'
}

export function CurrentWeather () {
  const { coordinates: { lat, lon } } = useWeather()

  const { data: currentWeatherData } = useCurrentWeather({ lat, lon })
  const { dailyTemperatureRange = [] } = useForecastWeather({ lat, lon })

  const { weather, main, name, sys } = currentWeatherData || {}

  const todayKey = new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' })
  const todayTemperatureRange = dailyTemperatureRange.find(item => item.date === todayKey) ?? dailyTemperatureRange[0]

  const temperature = typeof main?.temp === 'number' && Number.isFinite(main.temp) ? main.temp : null
  const iconCode = weather?.[0]?.icon
  const country = sys?.country ?? ''

  return (
    <VStack
      gap={3}
      width="100%"
      height="100%"
      sx={{
        backgroundColor: CARD_BACKGROUND,
        px: 4,
        py: 5,
        borderRadius: '16px',
        boxShadow: CARD_SHADOW,
      }}
    >
      <VStack gap={0.5}>
        <Typography sx={{ fontSize: '15px', lineHeight: '1.5rem', textAlign: 'center' }}>
          當前溫度
        </Typography>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', lineHeight: '1.5rem', textAlign: 'center' }}>
          {name}
          {' ' + country}
        </Typography>
      </VStack>
      <HStack gap={2} justifyContent="center">
        <WeatherIcon iconCode={iconCode} />
        <HStack gap={0.25} alignItems="center">
          <Typography sx={{ fontWeight: 'bold', fontSize: '3rem' }}>
            {typeof temperature === 'number' ? temperature.toFixed(1) : '--'}
          </Typography>
          <HStack>
            <Typography sx={{ fontSize: '2rem' }}>
              °C
            </Typography>
          </HStack>
        </HStack>
      </HStack>
      <HStack justifyContent="center" flex={1} sx={{
        backgroundColor: '#F9FBFD',
        borderRadius: '16px',
        boxShadow: CARD_SHADOW,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
      }}
      >
        <HStack width="100%">
          <VStack flex={1} sx={{ alignItems: 'center' }}>
            <Typography sx={{ color: FONT_COLOR }}>最高</Typography>
            <Typography sx={{ fontWeight: 'bold', color: FONT_COLOR }}>
              {formatTemperature(todayTemperatureRange?.max)}
            </Typography>
          </VStack>
          <Divider orientation="vertical" flexItem />
          <VStack flex={1} sx={{ alignItems: 'center' }}>
            <Typography sx={{ color: FONT_COLOR }}>最低</Typography>
            <Typography sx={{ fontWeight: 'bold', color: FONT_COLOR }}>
              {formatTemperature(todayTemperatureRange?.min)}
            </Typography>
          </VStack>
        </HStack>
      </HStack>
    </VStack>
  )
}
