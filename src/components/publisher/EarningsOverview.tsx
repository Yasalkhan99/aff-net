'use client'

import { formatCurrency } from '@/lib/utils'

interface EarningsOverviewProps {
  earnings: any
}

export default function EarningsOverview({ earnings }: EarningsOverviewProps) {
  if (!earnings) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">Loading earnings...</p>
      </div>
    )
  }

  const cards = [
    {
      title: 'Pending',
      subtitle: 'Commissions Waiting for Approval',
      amount: earnings.pending || 0,
      change: earnings.pendingChange || 0,
      color: 'text-gray-900',
      bgGradient: 'from-pink-500 to-orange-500',
    },
    {
      title: 'Approved',
      subtitle: 'Waiting for Advertiser to Pay',
      amount: earnings.approved || 0,
      change: earnings.approvedChange || 0,
      color: 'text-green-600',
      bgGradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Declined',
      subtitle: '',
      amount: earnings.declined || 0,
      change: 0,
      color: 'text-red-600',
      bgGradient: 'from-red-500 to-pink-500',
    },
    {
      title: 'Paid',
      subtitle: '',
      amount: earnings.paid || 0,
      change: 0,
      color: 'text-blue-600',
      bgGradient: 'from-blue-500 to-cyan-500',
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Overview</h3>
      <div className="space-y-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${card.bgGradient} rounded-lg p-4 text-white`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-lg">{card.title}</h4>
                {card.subtitle && (
                  <p className="text-sm text-white/80 mt-1">{card.subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-bold">{formatCurrency(card.amount)}</span>
              {card.change !== 0 && (
                <span
                  className={`text-sm ${
                    card.change > 0 ? 'text-green-200' : 'text-red-200'
                  }`}
                >
                  {card.change > 0 ? '↑' : '↓'} {Math.abs(card.change).toFixed(2)}% From Previous Period
                </span>
              )}
            </div>
            {card.title === 'Approved' && (
              <div className="mt-2 w-full bg-white/20 rounded-full h-1.5">
                <div
                  className="bg-white h-1.5 rounded-full"
                  style={{ width: '60%' }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}




