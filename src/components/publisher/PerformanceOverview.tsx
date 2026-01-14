'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface PerformanceOverviewProps {
  performance: any
}

export default function PerformanceOverview({ performance }: PerformanceOverviewProps) {
  const [period, setPeriod] = useState<'monthly' | 'weekly'>('monthly')

  if (!performance) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">Loading performance...</p>
      </div>
    )
  }

  // Format numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatSales = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toFixed(2)
  }

  const metrics = [
    {
      label: 'Total Commissions',
      value: formatNumber(performance.totalCommissions || 0),
      change: performance.commissionsChange || 0,
    },
    {
      label: 'Total Transactions',
      value: (performance.totalTransactions || 0).toString(),
      change: performance.transactionsChange || 0,
    },
    {
      label: 'Total Sales',
      value: formatSales(performance.totalSales || 0),
      change: performance.salesChange || 0,
    },
  ]

  // Use actual chart data from API
  const chartData = performance.chartData || []

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-1 rounded text-sm font-medium transition ${
              period === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-4 py-1 rounded text-sm font-medium transition ${
              period === 'weekly'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p
              className={`text-sm ${
                metric.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change).toFixed(2)}%
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              domain={[-120, 180]} 
              tickCount={16}
              ticks={[-120, -100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100, 120, 140, 160, 180]}
              stroke="#6b7280"
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '6px',
                padding: '8px'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Current period"
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Previous period"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}



