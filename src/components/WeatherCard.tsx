import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useWeather } from './WeatherProvider/useWeather'
import { useCurrentWeather } from '../hooks-api/useCurrentWeather'
import { useForecastWeather } from '../hooks-api/useForecastWeather'
import { WeatherIcon } from './WeatherIcon'
import { Stack } from '@mui/material'

export function WeatherCard () {
  const { coordinates: { lat, lon }, setHasWeatherData } = useWeather()

  const getCurrentWeatherSuccess = () => {
    setHasWeatherData(true)
  }
  const { data: currentWeatherData } = useCurrentWeather({ lat, lon, onSuccess: getCurrentWeatherSuccess })
  const { dailyTemperatureRange } = useForecastWeather({ lat, lon })

  const { weather, main, wind, name } = currentWeatherData || {}

  const todayKey = new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' })
  const todayTemperatureRange = dailyTemperatureRange.find(item => item.date === todayKey) ?? dailyTemperatureRange[0]

  const formatTemperature = (value?: number | null) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return `${value.toFixed(1)}°C`
    }
    return '--'
  }

  return (
    <Box
      sx={{
        background: 'rgba(98, 128, 166, 0.50)',
        borderRadius: '12px',
        p: '2rem',
        textAlign: 'center',
        width: '80%',
        boxShadow: '12px 12px 10px 2px rgba(0, 0, 0, 0.10)',
      }}
    >
      <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', lineHeight: '1.5rem' }}>{name}</Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <WeatherIcon iconCode={weather?.[0].icon} />
        <Box>
          <Typography sx={{ fontWeight: 'bold', fontSize: '3rem', margin: '1rem 0' }}>
            {`${Number(main?.temp).toFixed(1)}°C`}
          </Typography>
        </Box>
      </Stack>

      <Stack justifyContent="center">
        <Grid container spacing={4}>
          {/* 溫度 */}
          <Grid item xs={12} md={6}>
            <Stack
              height="100%"
              flexDirection="column"
              justifyContent="center"
              sx={{
                backgroundColor: '#ffffff33',
                mx: 3,
                py: 1,
                px: 3,
                borderRadius: '10px',
                boxShadow: '5px 5px 0px 6px rgba(244, 244, 244, 0.10)',
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: '100%' }}
              >
                <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
                  最高溫度
                </Typography>
                <Typography sx={{ fontSize: '24px' }}>
                  {formatTemperature(todayTemperatureRange?.max ?? '--')}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
                  最低溫度
                </Typography>
                <Typography sx={{ fontSize: '24px' }}>
                  {formatTemperature(todayTemperatureRange?.min ?? '--')}
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* 風力，濕度 */}
          <Grid item xs={12} md={6}>
            <Stack
              // maxWidth="280px"
              height="100%"
              flexDirection="column"
              justifyContent="center"
              sx={{
                backgroundColor: '#ffffff33',
                mx: 3,
                py: 1,
                px: 3,
                borderRadius: '10px',
                boxShadow: '5px 5px 0px 6px rgba(244, 244, 244, 0.10)',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
                  濕度
                </Typography>
                <Typography sx={{ fontSize: '24px' }}>
                  {`${main?.humidity}%`}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
                  風力
                </Typography>
                <Typography sx={{ fontSize: '24px' }}>
                  {`${wind?.speed} m/h`}
                </Typography>
              </Stack>
            </Stack>
          </Grid>

        </Grid>
      </Stack>
    </Box>
  )
}
