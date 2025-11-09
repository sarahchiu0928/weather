import { useMemo } from 'react'
import useSWR from 'swr'
import { WEATHER_API_URL } from '../constants/baseUrls' // 定義的API URL
import { weatherSWRFetcher } from '../utils/weatherSWRFetcher'// 自定義的fetcher
import { type ForecastWeather } from '../types/ForecastWeather'// 定義的型別
import { urlWithQueryParams } from '../utils/urlWithQueryParams'// 自定義的fetcher
import { type Coordinates } from '../types/Coordinates'// 定義的型別
import { UNITS } from '../constants/units'

interface ForecastWeatherProps extends Coordinates {}

export function useForecastWeather ({ lat, lon }: ForecastWeatherProps) {
  const key = lat && lon
    ? urlWithQueryParams(`${WEATHER_API_URL}/forecast`, { lat, lon, units: UNITS.METRIC })
    : null
  const { data, error, isLoading } = useSWR<ForecastWeather>(key, weatherSWRFetcher, {
    revalidateOnFocus: false,
  })

  const dailyTemperatureRange = useMemo(() => {
    if (!data?.list) return []

    const groupByDay: Record<string, number[]> = {}

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' })
      if (!groupByDay[date]) groupByDay[date] = []
      groupByDay[date].push(item.main.temp)
    })

    return Object.entries(groupByDay).map(([date, temps]) => ({
      date,
      min: Math.min(...temps),
      max: Math.max(...temps),
    }))
  }, [data?.list])

  return {
    data,
    error,
    isLoading,
    dailyTemperatureRange,
  }
}
