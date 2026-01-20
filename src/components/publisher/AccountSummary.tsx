'use client'

interface AccountSummaryProps {
  accountSummary: {
    joinedAdvertisers: number
    pendingAdvertisers: number
    rejectedAdvertisers: number
    holdAdvertisers: number
    notJoinedAdvertisers: number
  }
}

export default function AccountSummary({ accountSummary }: AccountSummaryProps) {
  if (!accountSummary) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">Loading account summary...</p>
      </div>
    )
  }

  const stats = [
    {
      label: 'Joined Advertisers',
      value: accountSummary.joinedAdvertisers || 0,
      color: 'text-green-600',
    },
    {
      label: 'Pending Advertisers',
      value: accountSummary.pendingAdvertisers || 0,
      color: 'text-yellow-600',
    },
    {
      label: 'Rejected Advertisers',
      value: accountSummary.rejectedAdvertisers || 0,
      color: 'text-red-600',
    },
    {
      label: 'Hold Advertisers',
      value: accountSummary.holdAdvertisers || 0,
      color: 'text-orange-600',
    },
    {
      label: 'Not Joined Advertisers',
      value: accountSummary.notJoinedAdvertisers || 0,
      color: 'text-gray-600',
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{stat.label}:</span>
            <span className={`text-sm font-semibold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


