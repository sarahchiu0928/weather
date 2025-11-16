import { useMemo } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import { VStack } from '../ui/VStack'
import { useWeather } from './WeatherProvider/useWeather'
import { useForecastWeather } from '../hooks-api/useForecastWeather'
import { format } from 'date-fns'
import { DATE_FORMAT } from '../constants/format'
import { CARD_BACKGROUND, CARD_SHADOW } from '../constants/colors'

const INCREMENT = 8
const REPETITIONS = 6

export default function TemperatureChart () {
  const { coordinates: { lat, lon } } = useWeather()
  const { data: forecastWeatherData } = useForecastWeather({ lat, lon })

  // 找到未來天氣預報的起始索引
  const startIndex = forecastWeatherData?.list.findIndex(item => new Date(item.dt_txt) > new Date()) ?? 0

  // 根據起始索引計算需要的索引集合
  const resultIndex = Array.from({ length: REPETITIONS }, (_, i) => startIndex + i * INCREMENT)

  // 使用 useMemo 計算未來六天的天氣預報數據
  const fiveDayForecast = useMemo(() =>
    resultIndex.map(index => forecastWeatherData?.list[index]).filter(Boolean),
  [forecastWeatherData?.list, resultIndex])

  // X 軸：日期（使用 Date 對象）
  const xDates = useMemo(() =>
    fiveDayForecast.map(item => {
      return item?.dt_txt ? new Date(item.dt_txt) : new Date()
    }),
  [fiveDayForecast])

  // Y 軸：直接使用溫度
  const temperatures = useMemo(() =>
    fiveDayForecast.map(item => item?.main?.temp ?? Number.NaN),
  [fiveDayForecast])

  return (
    <VStack
      sx={{
        background: CARD_BACKGROUND,
        borderRadius: '16px',
        boxShadow: CARD_SHADOW,
        height: '100%',
        px: 3,
      }}
    >
      <LineChart
        xAxis={[{
          scaleType: 'time',
          data: xDates,
          label: '日期',
          valueFormatter: (date: Date) => format(date, DATE_FORMAT),
          tickNumber: xDates.length,
          // tickLabelStyle: {
          //   angle: -45,
          //   textAnchor: 'end',
          //   fontSize: 12,
          // },
        }]}
        yAxis={[{
          label: '溫度 (°C)',
        }]}
        series={[
          {
            data: temperatures,
            label: '溫度',
            color: '#F39C12',
          },
        ]}
        height={300}
        margin={{ right: 50 }}
       // 關鍵：禁止裁切右邊的內容
        sx={{
          '& .MuiChartsAxis-root': {
            overflow: 'visible', // 讓 axis label 不被 clip
          },
          overflow: 'visible',
        }}
      />
    </VStack>
  )
}
