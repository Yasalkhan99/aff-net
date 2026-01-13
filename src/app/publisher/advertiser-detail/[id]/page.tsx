'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/common/Navbar'
import AdvertiserSidebar from '@/components/publisher/AdvertiserSidebar'
import AdvertiserOverview from '@/components/publisher/AdvertiserOverview'
import CommissionRates from '@/components/publisher/CommissionRates'
import TrackingLinksTab from '@/components/publisher/TrackingLinksTab'
import Terms from '@/components/publisher/Terms'
import Creatives from '@/components/publisher/Creatives'

type TabType = 'overview' | 'commission' | 'tracking' | 'terms' | 'creative'

export default function AdvertiserDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [advertiser, setAdvertiser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchAdvertiserDetails(id)
    }
  }, [id])

  const fetchAdvertiserDetails = async (advertiserId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const response = await fetch(`/api/publisher/advertisers/${advertiserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAdvertiser(data)
      } else if (response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      } else if (response.status === 404) {
        setAdvertiser(null)
      }
    } catch (error) {
      console.error('Error fetching advertiser:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!advertiser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Advertiser not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-80 flex-shrink-0">
            <AdvertiserSidebar advertiser={advertiser} />
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex border-b border-gray-200">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'commission', label: 'Commission Rates' },
                  { id: 'tracking', label: 'Tracking links' },
                  { id: 'terms', label: 'Terms' },
                  { id: 'creative', label: 'Creative' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`px-6 py-4 font-medium transition ${
                      activeTab === tab.id
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && <AdvertiserOverview advertiser={advertiser} />}
                {activeTab === 'commission' && <CommissionRates advertiser={advertiser} />}
                {activeTab === 'tracking' && <TrackingLinksTab advertiser={advertiser} />}
                {activeTab === 'terms' && <Terms advertiser={advertiser} />}
                {activeTab === 'creative' && <Creatives advertiser={advertiser} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

