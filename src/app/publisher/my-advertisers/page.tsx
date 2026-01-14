'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/common/Navbar'
import AdvertiserFilters from '@/components/publisher/AdvertiserFilters'
import AdvertiserGrid from '@/components/publisher/AdvertiserGrid'
import AdvertiserList from '@/components/publisher/AdvertiserList'
import { convertToCSV, downloadCSV } from '@/lib/utils'

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
  category?: string
  advertiserType?: string
  promotionalMethods?: string[]
}

export default function MyAdvertisersPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState<'joined' | 'hold' | 'rejected'>('joined')
  const [filters, setFilters] = useState({
    search: '',
    country: '',
    advertiserType: 'all',
    category: '',
    promotionalMethod: '',
  })
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAdvertisers()
  }, [activeTab, filters])

  const fetchAdvertisers = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const params = new URLSearchParams({
        status: activeTab,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '' && v !== 'all')
        ),
      })

      const response = await fetch(`/api/publisher/advertisers?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAdvertisers(data.advertisers || [])
      } else if (response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Error fetching advertisers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    const headers = ['Name', 'Commission', 'Region', 'APC', 'Status', 'Website']
    const csv = convertToCSV(
      filteredAdvertisers.map((adv) => ({
        Name: adv.name,
        Commission: adv.commission,
        Region: adv.region,
        APC: adv.averagePaymentCycle ? `${adv.averagePaymentCycle} days` : '- days',
        Status: adv.status,
        Website: adv.website,
      })),
      headers
    )
    downloadCSV(csv, 'advertisers.csv')
  }

  const filteredAdvertisers = advertisers.filter((advertiser) => {
    if (filters.search && !advertiser.name.toLowerCase().includes(filters.search.toLowerCase()))
      return false
    if (filters.country && advertiser.region !== filters.country) return false
    if (filters.advertiserType !== 'all' && advertiser.advertiserType !== filters.advertiserType)
      return false
    if (filters.category && advertiser.category !== filters.category) return false
    if (
      filters.promotionalMethod &&
      !advertiser.promotionalMethods?.includes(filters.promotionalMethod)
    )
      return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Advertisers</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Total {filteredAdvertisers.length} advertisers found
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push('/publisher/create-brand')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Brand
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-4">
            <button
              onClick={() => setActiveTab('joined')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeTab === 'joined'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Joined
            </button>
            <button
              onClick={() => setActiveTab('hold')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeTab === 'hold'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hold
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeTab === 'rejected'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rejected
            </button>

            {/* View Toggle */}
            <div className="ml-auto flex items-center gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <AdvertiserFilters filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Advertisers Display */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : viewMode === 'grid' ? (
              <AdvertiserGrid advertisers={filteredAdvertisers} />
            ) : (
              <AdvertiserList advertisers={filteredAdvertisers} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

