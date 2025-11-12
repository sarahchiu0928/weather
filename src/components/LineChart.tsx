import { useMemo } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

interface DailyTemperatureRange {
  date: string,
  min: number,
  max: number,
}

interface TemperatureChartProps {
  dailyTemperatureRange?: DailyTemperatureRange[],
}

const formatToMonthDay = (dateString: string) => {
  const dateSegments = dateString.split('/')

  if (dateSegments.length >= 2) {
    const month = dateSegments[dateSegments.length - 2]
    const day = dateSegments[dateSegments.length - 1]

    return `${month}/${day}`
  }

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) return dateString

  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${month}/${day}`
}

const roundToSingleDecimal = (value?: number) => {
  if (typeof value !== 'number' || Number.isNaN(value)) return null

  return Number(value.toFixed(1))
}

const toChartValue = (value?: number) => {
  const rounded = roundToSingleDecimal(value)

  return rounded ?? Number.NaN
}

export default function TemperatureChart ({ dailyTemperatureRange = [] }: TemperatureChartProps) {
  const chartData = useMemo(() => dailyTemperatureRange.slice(0, 6), [dailyTemperatureRange])
  const xLabels = useMemo(() => chartData.map(item => formatToMonthDay(item.date)), [chartData])
  const maxTemperatures = useMemo(() => chartData.map(item => toChartValue(item.max)), [chartData])
  const minTemperatures = useMemo(() => chartData.map(item => toChartValue(item.min)), [chartData])

  return (
    <LineChart
      xAxis={[{ data: xLabels, label: '日期' }]}
      yAxis={[{ label: '溫度 (°C)' }]}
      series={[
        {
          data: maxTemperatures,
          label: '最高溫',
          color: '#F39C12',
        },
        {
          data: minTemperatures,
          label: '最低溫',
          color: '#4A90E2',
        },
      ]}
      height={300}
    />
  )
}
