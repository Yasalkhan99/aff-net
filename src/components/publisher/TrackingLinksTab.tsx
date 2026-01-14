'use client'

import { useState, useEffect } from 'react'

interface TrackingLinksTabProps {
  advertiser: any
}

export default function TrackingLinksTab({ advertiser }: TrackingLinksTabProps) {
  const [links, setLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrackingLinks()
  }, [advertiser.id])

  const fetchTrackingLinks = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `/api/publisher/tracking-links?advertiserId=${advertiser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setLinks(data.links || [])
      }
    } catch (error) {
      console.error('Error fetching tracking links:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Tracking Links</h3>
      {links.length === 0 ? (
        <p className="text-gray-500">No tracking links created yet.</p>
      ) : (
        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{link.trackingLink}</p>
                  <p className="text-sm text-gray-500">
                    Clicks: {link.clickCount} | Conversions: {link.conversionCount}
                  </p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(link.trackingLink)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



