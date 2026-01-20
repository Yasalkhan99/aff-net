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

interface AdvertiserListProps {
  advertisers: Advertiser[]
}

export default function AdvertiserList({ advertisers }: AdvertiserListProps) {
  const router = useRouter()

  if (advertisers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 text-lg">No advertisers found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Advertiser
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Commission
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Region
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              APC
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {advertisers.map((advertiser) => (
            <tr key={advertiser.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {advertiser.logo ? (
                        <img
                          className="h-10 w-10 rounded-lg object-contain"
                          src={advertiser.logo}
                          alt={advertiser.name}
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-400">
                          {advertiser.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{advertiser.name}</div>
                    <div className="text-sm text-gray-500">{advertiser.website}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {advertiser.commission}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {advertiser.region || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {advertiser.averagePaymentCycle ? `${advertiser.averagePaymentCycle} days` : '- days'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => router.push(`/publisher/advertiser-detail/${advertiser.id}`)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  View
                </button>
                <button className="text-blue-600 hover:text-blue-900">Contact</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}




