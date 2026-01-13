'use client'

interface TopAdvertiser {
  name: string
  totalSales?: number
  totalClicks?: number
}

interface TopAdvertisersProps {
  title: string
  advertisers: TopAdvertiser[]
  type: 'sales' | 'clicks'
}

export default function TopAdvertisers({ title, advertisers, type }: TopAdvertisersProps) {
  if (!advertisers || advertisers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500 text-sm">No data available</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {advertisers.map((advertiser, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-700 truncate flex-1 mr-2">
              {advertiser.name}
            </span>
            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
              {type === 'sales' ? (
                <>USD {Number(advertiser.totalSales || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>
              ) : (
                <>{advertiser.totalClicks || 0}</>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

