import { Unstable_Grid2 as Grid } from '@mui/material'
import { useWeather } from './WeatherProvider/useWeather'
import { useCurrentWeather } from '../hooks-api/useCurrentWeather'
import TemperatureChart from './LineChart'
import { WeatherInfoCard } from './WeatherInfoCard'
import { VStack } from '../ui/VStack'
import { CurrentWeather } from './CurrentWeather'

export function WeatherCard () {
  const { coordinates: { lat, lon }, setHasWeatherData } = useWeather()

  const getCurrentWeatherSuccess = () => {
    setHasWeatherData(true)
  }
  const { data: currentWeatherData } = useCurrentWeather({ lat, lon, onSuccess: getCurrentWeatherSuccess })

  const { main, wind } = currentWeatherData || {}

  return (
    <Grid container spacing={2} width="100%">
      <Grid lg={4} md={8} xs={12}>
        <CurrentWeather />
      </Grid>
      <Grid lg={2} md={4} xs={6}>
        <VStack gap={2}>
          <WeatherInfoCard title="相對濕度" value={`${main?.humidity ?? '--'}%`} />
          <WeatherInfoCard title="風力" value={`${wind?.speed ?? '--'} m/h`} />
        </VStack>
      </Grid>
      <Grid lg={2} md={4} xs={6}>
        <VStack gap={2}>
          <WeatherInfoCard title="體感溫度" value={`${main?.feels_like ?? '--'}°C`} />
          <WeatherInfoCard title="當地氣壓" value={`${main?.pressure ?? '--'} hPa`} />
        </VStack>
      </Grid>
      <Grid lg={4} md={8} xs={12}>
        <TemperatureChart />
      </Grid>
    </Grid>
  )
}
