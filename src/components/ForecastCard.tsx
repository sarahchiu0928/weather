import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { WeatherIcon } from './WeatherIcon'
import Grid from '@mui/material/Grid'
import { type WeatherCode } from '../types/CurrentWeather'
import { CARD_BACKGROUND, CARD_SHADOW, FONT_COLOR, CARD_INFO, BORDER_RADIUS } from '../constants/colors'

interface ForecastCardProps {
  day?: string,
  weatherIconCode?: WeatherCode,
  maxTemp?: number,
  minTemp?: number,
  humidity?: number,
}

export function ForecastCard ({
  day,
  weatherIconCode,
  maxTemp,
  minTemp,
}: ForecastCardProps) {
  const formatTemperature = (value?: number | null) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return `${value.toFixed(1)}°C`
    }
    return '99.9°C'
  }

  return (
    <Box
      sx={{
        background: CARD_BACKGROUND,
        borderRadius: '15px',
        boxShadow: CARD_SHADOW,
        px: 1,
        py: 3,
      }}
    >
      {/* 日期 */}
      <Typography sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>{day}</Typography>

      {/* 天氣圖示 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
        <WeatherIcon iconCode={weatherIconCode} />
      </Box>

      {/* 溫度 */}
      <Grid item xs={12}>
        <Box
          sx={{
            background: CARD_INFO,
            borderRadius: BORDER_RADIUS,
            boxShadow: CARD_SHADOW,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            py: 1,
          }}
        >
          {/* 左邊：最高 */}
          <Box
            sx={{
              flex: 1,
              textAlign: 'center',
              borderRight: '1px solid #D3DEE9',
            }}
          >
            <Typography sx={{ fontSize: '15px', color: FONT_COLOR }}>
              最高
            </Typography>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 'bold',
                color: FONT_COLOR,
                pr: 1,
              }}
            >
              {formatTemperature(maxTemp)}
            </Typography>
          </Box>

          {/* 右邊：最低 */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '15px', color: FONT_COLOR }}>
              最低
            </Typography>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 'bold',
                color: FONT_COLOR,
                pl: 1,
              }}
            >
              {formatTemperature(minTemp)}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}
