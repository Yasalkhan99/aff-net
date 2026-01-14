'use client'

interface Advertiser {
  id: string
  name: string
  logo?: string
  region: string
  commissionRate: string
  averagePaymentCycle?: number
  status: string
  description?: string
}

interface AdvertiserSidebarProps {
  advertiser: Advertiser
}

export default function AdvertiserSidebar({ advertiser }: AdvertiserSidebarProps) {

  return (
    <div className="space-y-6">
      {/* Advertiser Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            {advertiser.logo ? (
              <img
                src={advertiser.logo}
                alt={advertiser.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-4xl font-bold text-gray-400">
                {advertiser.name.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">{advertiser.name}</h2>

        {/* ID */}
        <p className="text-sm text-gray-500 text-center mb-4">ID: {advertiser.id}</p>

        {/* Region */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-gray-700">{advertiser.region}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Message
          </button>
          <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Joined
          </button>
        </div>

        {/* Key Metrics */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Commission:</span>
            <span className="text-sm font-semibold text-gray-900">{advertiser.commissionRate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Regions:</span>
            <span className="text-sm font-semibold text-gray-900">{advertiser.region}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">APC:</span>
            <span className="text-sm font-semibold text-gray-900">
              {advertiser.averagePaymentCycle ? `${advertiser.averagePaymentCycle} days` : '- days'}
            </span>
          </div>
        </div>
      </div>

      {/* About Section */}
      {advertiser.description && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">ABOUT</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{advertiser.description}</p>
        </div>
      )}
    </div>
  )
}
