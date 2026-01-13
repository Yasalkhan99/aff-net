'use client'

import { useState } from 'react'
import CreateLinkForm from './CreateLinkForm'

interface Advertiser {
  id: string
  name: string
  about?: string
  allowedMethods?: string[]
  restrictedMethods?: string[]
}

interface AdvertiserOverviewProps {
  advertiser: Advertiser
}

export default function AdvertiserOverview({ advertiser }: AdvertiserOverviewProps) {
  const [createdLink, setCreatedLink] = useState<string | null>(null)

  const handleLinkCreated = (link: string) => {
    setCreatedLink(link)
  }

  return (
    <div className="space-y-6">
      {/* Detailed Introduction */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Introduction</h3>
        <div className="text-gray-600 space-y-4">
          <p>
            {advertiser.about ||
              'Welcome to our affiliate program. Join us to promote quality products and earn competitive commissions.'}
          </p>
        </div>
      </div>

      {/* Create A Link Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <CreateLinkForm
          advertiser={advertiser}
          onLinkCreated={handleLinkCreated}
          createdLink={createdLink}
        />
      </div>

      {/* Preferred Promotional Methods */}
      {advertiser.allowedMethods && advertiser.allowedMethods.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Preferred Promotional Methods
          </h3>
          <p className="text-gray-600 mb-4">
            Promotional Traffic From These Sources Is Allowed:
          </p>
          <div className="flex flex-wrap gap-2">
            {advertiser.allowedMethods.map((method, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Restricted Methods */}
      {advertiser.restrictedMethods && advertiser.restrictedMethods.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Restricted Methods</h3>
          <p className="text-gray-600 mb-4">
            Promotional Traffic From These Sources Are Strictly Not Allowed:
          </p>
          <div className="flex flex-wrap gap-2">
            {advertiser.restrictedMethods.map((method, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}



