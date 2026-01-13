'use client'

import { useRouter } from 'next/navigation'

interface Advertiser {
  id: string
  name: string
  logo: string
  website: string
  commission: string
  commissionType: string
  region: string
  averagePaymentCycle: number | null
  status: 'joined' | 'hold' | 'rejected'
}

interface AdvertiserCardProps {
  advertiser: Advertiser
}

export default function AdvertiserCard({ advertiser }: AdvertiserCardProps) {
  const router = useRouter()

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons or links
    const target = e.target as HTMLElement
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'A'
    ) {
      return
    }
    router.push(`/publisher/advertiser-detail/${advertiser.id}`)
  }

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/publisher/advertiser-detail/${advertiser.id}`)
  }

  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Open contact modal or navigate to contact page
    console.log('Contact advertiser:', advertiser.id)
  }

  const getStatusBadge = () => {
    const statusConfig = {
      joined: { bg: 'bg-green-100', text: 'text-green-800', label: 'Joined' },
      hold: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Hold' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },
    }
    const config = statusConfig[advertiser.status]
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {advertiser.logo ? (
            <img src={advertiser.logo} alt={advertiser.name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-2xl font-bold text-gray-400">
              {advertiser.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{advertiser.name}</h3>

      {/* Website Link */}
      <div className="flex items-center justify-center mb-4">
        <a
          href={advertiser.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          View Website
        </a>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={handleViewDetails}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          title="View Details"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
        <button
          onClick={handleContact}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          title="Contact"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>
        {getStatusBadge()}
      </div>

      {/* Metrics */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Commission:</span>
          <span className="text-sm font-semibold text-gray-900">{advertiser.commission}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Region:</span>
          <span className="text-sm font-semibold text-gray-900">{advertiser.region || '-'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">APC:</span>
          <span className="text-sm font-semibold text-gray-900">
            {advertiser.averagePaymentCycle ? `${advertiser.averagePaymentCycle} days` : '- days'}
          </span>
        </div>
      </div>
    </div>
  )
}



