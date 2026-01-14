'use client'

import AdvertiserCard from './AdvertiserCard'

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

interface AdvertiserGridProps {
  advertisers: Advertiser[]
}

export default function AdvertiserGrid({ advertisers }: AdvertiserGridProps) {
  if (advertisers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 text-lg">No advertisers found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {advertisers.map((advertiser) => (
        <AdvertiserCard key={advertiser.id} advertiser={advertiser} />
      ))}
    </div>
  )
}



