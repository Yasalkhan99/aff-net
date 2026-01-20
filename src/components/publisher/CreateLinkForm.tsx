'use client'

import { useState } from 'react'

interface Advertiser {
  id: string
  name: string
}

interface CreateLinkFormProps {
  advertiser: Advertiser
  onLinkCreated: (link: string) => void
  createdLink: string | null
}

export default function CreateLinkForm({
  advertiser,
  onLinkCreated,
  createdLink,
}: CreateLinkFormProps) {
  const [isDeepLink, setIsDeepLink] = useState(true)
  const [landingPage, setLandingPage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/publisher/tracking-links/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          advertiserId: advertiser.id,
          isDeepLink,
          landingPage: landingPage || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create tracking link')
      }

      onLinkCreated(data.trackingLink)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (createdLink) {
      navigator.clipboard.writeText(createdLink)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Create A Link</h3>
      <p className="text-sm text-gray-600 mb-4">Promote any brand with a simple link.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Brand Selection (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand / Campaign
          </label>
          <input
            type="text"
            value={advertiser.name}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Deep Link Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="deepLink"
            checked={isDeepLink}
            onChange={(e) => setIsDeepLink(e.target.checked)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="deepLink" className="ml-2 text-sm text-gray-700">
            Deep Link
          </label>
        </div>

        {/* Landing Page Input */}
        {isDeepLink && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter a Landing Page <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="url"
              value={landingPage}
              onChange={(e) => setLandingPage(e.target.value)}
              placeholder="https://example.com/product-page"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Advanced
          </button>
        </div>
      </form>

      {/* Generated Link Display */}
      {createdLink && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            Use this link to promote {advertiser.name}. Updates may take up to 5 min to propagate.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={createdLink}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
            <button
              onClick={copyToClipboard}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Copy Tracking Link
            </button>
          </div>
        </div>
      )}
    </div>
  )
}




