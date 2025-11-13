import { Unstable_Grid2 as Grid } from '@mui/material'
import { ForecastCard } from './ForecastCard'
import { useWeather } from './WeatherProvider/useWeather'
import { useForecastWeather } from '../hooks-api/useForecastWeather'
import { useMemo } from 'react'
import { format } from 'date-fns'
import { DATE_FORMAT } from '../constants/format'

const INCREMENT = 8
const REPETITIONS = 6

export function WeeklyForecast () {
  const { coordinates: { lat, lon }, searchLoading } = useWeather()
  // 使用自定義的 `useForecastWeather` hook-api，根據經緯度（lat, lon）獲取天氣數據
  const { data: forecastWeatherData, dailyTemperatureRange } = useForecastWeather({ lat, lon })

  // 找到未來天氣預報的起始索引
  // `forecastWeatherData.list` 是預報的天氣數據列表，`dt_txt` 是日期時間字串
  // 這裡查找第一個未來日期的索引，若數據不存在則默認為 0
  const startIndex = forecastWeatherData?.list.findIndex(item => new Date(item.dt_txt) === new Date()
  ) ?? 0

  // 根據起始索引計算需要的索引集合
  // 使用 `Array.from` 生成一個長度為 REPETITIONS 的數組，並根據索引計算每次的增量
  const resultIndex = Array.from({ length: REPETITIONS }, (_, i) => startIndex + i * INCREMENT)

  // 使用 `useMemo` 計算五天的天氣預報
  // 從 `forecastWeatherData.list` 中提取 `resultIndex` 對應的數據，並將結果緩存
  const fiveDayForecast = useMemo(() =>
    resultIndex.map(index => forecastWeatherData?.list[index]),
  [forecastWeatherData?.list, resultIndex]
  )

  return (
    <Grid container
      spacing={2}
      justifyContent="center"
      alignContent="center"
      width="100%"
    >
      {forecastWeatherData && !searchLoading && (
        fiveDayForecast?.map((item, index) => {
          const safeDate = item?.dt_txt ? new Date(item.dt_txt) : new Date()
          const weatherIconCode = item?.weather[0].icon
          const dayKey = safeDate.toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' })
          const tempRange = dailyTemperatureRange.find(range => range.date === dayKey) ?? dailyTemperatureRange[index]
          return (
            <Grid lg={2} md={4} xs={6} key={item?.dt_txt ?? index}>
              <ForecastCard
                day={format(safeDate, DATE_FORMAT)}
                weatherIconCode={weatherIconCode}
                maxTemp={tempRange?.max}
                minTemp={tempRange?.min}
                humidity={item?.main.humidity}
              />
            </Grid>
          )
        })
      )}
    </Grid>
  )
}
