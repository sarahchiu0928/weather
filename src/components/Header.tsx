import { useState } from 'react'
import { TextField, Button, CircularProgress, Typography, Box } from '@mui/material'
import { useWeatherGeo } from '../hooks-api/useWeatherGeo'
import { useWeather } from './WeatherProvider/useWeather'
import { type WeatherGeo } from '../types/WeatherGeo'
import { HStack } from '../ui/HStack'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import SearchIcon from '@mui/icons-material/Search'

import Icon from '@assets/lottie/icon.lottie'

export function Header () {
  const [city, setCity] = useState<string>('')
  const [cityQuery, setCityQuery] = useState<string>('Taiwan')
  const { searchLoading, setCoordinates, setHasWeatherData } = useWeather()

  const handleSearchOnSuccess = (data: WeatherGeo[]) => {
    if (data.length === 0) {
      setHasWeatherData(false)
      return
    }
    setCoordinates({ lat: data?.[0].lat, lon: data?.[0].lon })
  }

  useWeatherGeo(cityQuery, (data) => handleSearchOnSuccess(data))

  return (
    <HStack
      py={1.5}
      px={2.5}
      justifyContent="space-between"
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      gap={{ xs: 2, sm: 0 }}
      sx={{
        width: '100%',
      }}
    >
      <HStack
        gap={1}
        alignItems="center"
        justifyContent={{ xs: 'center', sm: 'flex-start' }}
        width={{ xs: '100%', sm: 'auto' }}
      >
        <Box sx={{ width: '40px', height: '40px' }}>
          <DotLottieReact src={Icon} loop autoplay renderConfig={{ autoResize: true }} />
        </Box>
        <Typography variant="h5" fontWeight="bold">Weather</Typography>
      </HStack>
      <HStack
        gap={1}
        width={{ xs: '100%', sm: 'auto' }}
        alignItems="center"
        flexWrap="nowrap"
      >
        <TextField
          variant="outlined"
          autoComplete="off"
          placeholder="Weather in your city"
          sx={{
            flex: { xs: 1, sm: '0 0 400px' },
            minWidth: 0,
            height: '40px',
            '& .MuiInputBase-root': {
              height: '40px',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '4px',
              '& fieldset': {
                border: 'none',
              },
            },
          }}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          variant="outlined"
          disabled={searchLoading || !city}
          sx={{
            height: '40px',
            flexShrink: 0,
          }}
          aria-label="搜尋"
          onClick={() => setCityQuery(city)}
        >
          {searchLoading ? <CircularProgress size={24} /> : <SearchIcon />}
        </Button>
      </HStack>
    </HStack>
  )
}
