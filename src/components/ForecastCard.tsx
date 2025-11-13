import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { WeatherIcon } from './WeatherIcon'
import Grid from '@mui/material/Grid'

interface ForecastCardProps {
  day?: string,
  weatherIconCode?: string,
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
        background: '#E3EDF7',
        borderRadius: '15px',
        boxShadow: '0px 4px 0px 0px rgba(0, 0, 0, 0.25)',
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
            backgroundColor: '#F9FBFD',
            borderRadius: '15px',
            boxShadow: '0px 4px 0px 0px rgba(0, 0, 0, 0.25)',
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
            <Typography sx={{ fontSize: '15px', color: '#5A6E8C' }}>
              最高
            </Typography>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#5A6E8C',
                pr: 1,
              }}
            >
              {formatTemperature(maxTemp)}
            </Typography>
          </Box>

          {/* 右邊：最低 */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '15px', color: '#5A6E8C' }}>
              最低
            </Typography>
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#5A6E8C',
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
