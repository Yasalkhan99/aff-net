'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/common/Navbar'
import ProfileCompleteness from '@/components/publisher/ProfileCompleteness'
import EarningsOverview from '@/components/publisher/EarningsOverview'
import PerformanceOverview from '@/components/publisher/PerformanceOverview'
import AccountSummary from '@/components/publisher/AccountSummary'
import TopAdvertisers from '@/components/publisher/TopAdvertisers'

export default function PublisherDashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [earnings, setEarnings] = useState<any>(null)
  const [performance, setPerformance] = useState<any>(null)
  const [accountSummary, setAccountSummary] = useState<any>(null)
  const [topAdvertisersBySales, setTopAdvertisersBySales] = useState<any[]>([])
  const [topAdvertisersByClicks, setTopAdvertisersByClicks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      setUser(JSON.parse(userStr))
      fetchDashboardData()
    } else {
      // Redirect to login if no user
      window.location.href = '/login'
    }
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const response = await fetch('/api/publisher/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile || null)
        setEarnings(data.earnings || {
          pending: 0,
          approved: 0,
          declined: 0,
          paid: 0,
          pendingChange: 0,
          approvedChange: 0
        })
        setPerformance(data.performance || {
          totalCommissions: 0,
          totalTransactions: 0,
          totalSales: 0,
          commissionsChange: 0,
          transactionsChange: 0,
          salesChange: 0,
          chartData: []
        })
        setAccountSummary(data.accountSummary || {
          joinedAdvertisers: 0,
          pendingAdvertisers: 0,
          rejectedAdvertisers: 0,
          holdAdvertisers: 0,
          notJoinedAdvertisers: 0,
        })
        setTopAdvertisersBySales(data.topAdvertisersBySales || [])
        setTopAdvertisersByClicks(data.topAdvertisersByClicks || [])
      } else if (response.status === 401) {
        // Unauthorized - redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCompleteness profile={profile} />
            <EarningsOverview earnings={earnings} />
            <AccountSummary accountSummary={accountSummary} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <PerformanceOverview performance={performance} />
            
            {/* Top Advertisers Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TopAdvertisers
                title="Top Advertisers By Sales"
                advertisers={topAdvertisersBySales}
                type="sales"
              />
              <TopAdvertisers
                title="Top Advertisers By Clicks"
                advertisers={topAdvertisersByClicks}
                type="clicks"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

