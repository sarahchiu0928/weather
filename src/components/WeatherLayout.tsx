import { WeatherBg } from './WeatherBg'
import { Header } from './Header'
import { WeatherCard } from './WeatherCard'
import { WeeklyForecast } from './WeeklyForecast'
import { useWeather } from './WeatherProvider/useWeather'
import { CircularProgress, Stack, Typography } from '@mui/material'
import { VStack } from '../ui/VStack'

export function WeatherLayout () {
  const { searchLoading, coordinates } = useWeather()

  const hasGeoData = coordinates.lat && coordinates.lon

  return (
    <WeatherBg>
      <Header />
      {
        searchLoading && <Stack flex="auto" justifyContent="center">
          <CircularProgress size={60} />
        </Stack>
      }
      {
        hasGeoData && !searchLoading
          ? <VStack mt={1} alignItems="center" gap={2} p={1.5} width="100%">
            <WeatherCard />
            <WeeklyForecast />
          </VStack>
          : <Typography mt={5} variant="h5">找不到您輸入的城市</Typography>
      }
    </WeatherBg>
  )
}
