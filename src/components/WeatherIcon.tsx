import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import ClearSky from '@assets/lottie/clear-sky.lottie'
import FewClouds from '@assets/lottie/few-clouds.lottie'
import ScatteredClouds from '@assets/lottie/scattered-clouds.lottie'
import BrokenClouds from '@assets/lottie/broken-clouds.lottie'
import ShowerRain from '@assets/lottie/shower-rain.lottie'
import Rain from '@assets/lottie/rain.lottie'
import Thunderstorm from '@assets/lottie/thunderstorm.lottie'
import Snow from '@assets/lottie/snow.lottie'
import Mist from '@assets/lottie/mist.lottie'

import ClearSkyNight from '@assets/lottie/clear-sky-night.lottie'
import FewCloudsNight from '@assets/lottie/few-clouds-night.lottie'
import RainNight from '@assets/lottie/rain-night.lottie'
import SnowNight from '@assets/lottie/snow-night.lottie'
import { type WeatherCode } from '../types/CurrentWeather'

const WeatherIconMap: Record<WeatherCode, string> = {
  '01d': ClearSky,
  '02d': FewClouds,
  '03d': ScatteredClouds,
  '04d': BrokenClouds,
  '09d': ShowerRain,
  '10d': Rain,
  '11d': Thunderstorm,
  '13d': Snow,
  '50d': Mist,
  '01n': ClearSkyNight,
  '02n': FewCloudsNight,
  '03n': ScatteredClouds,
  '04n': BrokenClouds,
  '09n': ShowerRain,
  '10n': RainNight,
  '11n': Thunderstorm,
  '13n': SnowNight,
  '50n': Mist,
}

const DEFAULT_WEATHER_CODE = '03d'
interface WeatherIconProps {
  iconCode?: WeatherCode,
}

export function WeatherIcon ({ iconCode = DEFAULT_WEATHER_CODE }: WeatherIconProps) {
  const lottieFile = WeatherIconMap[iconCode]

  return <DotLottieReact src={lottieFile} loop autoplay />
}
