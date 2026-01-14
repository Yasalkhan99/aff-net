'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/common/Navbar'

export default function CreateBrandPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    baseUrl: '',
    logo: '',
    description: '',
    about: '',
    commissionRate: '',
    commissionType: 'percentage',
    region: '',
    averagePaymentCycle: '',
    advertiserType: '',
    categories: '',
    allowedMethods: '',
    restrictedMethods: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name || !formData.website || !formData.baseUrl || !formData.commissionRate || !formData.region) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch('/api/publisher/advertisers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          website: formData.website,
          baseUrl: formData.baseUrl || formData.website,
          logo: formData.logo || null,
          description: formData.description || null,
          about: formData.about || null,
          commissionRate: formData.commissionRate,
          commissionType: formData.commissionType,
          region: formData.region,
          averagePaymentCycle: formData.averagePaymentCycle ? parseInt(formData.averagePaymentCycle) : null,
          advertiserType: formData.advertiserType || null,
          categories: formData.categories ? formData.categories.split(',').map((c) => c.trim()) : [],
          allowedMethods: formData.allowedMethods ? formData.allowedMethods.split(',').map((m) => m.trim()) : [],
          restrictedMethods: formData.restrictedMethods ? formData.restrictedMethods.split(',').map((m) => m.trim()) : [],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create brand')
      }

      // Redirect to advertiser detail page
      if (data.advertiser && data.advertiser.id) {
        router.push(`/publisher/advertiser-detail/${data.advertiser.id}`)
      } else {
        router.push('/publisher/my-advertisers')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Create Brand</h1>
            <p className="mt-2 text-gray-600">Add a new brand/advertiser to your network</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label htmlFor="baseUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    Base URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="baseUrl"
                    name="baseUrl"
                    value={formData.baseUrl}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    id="logo"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the brand"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">
                  About
                </label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detailed information about the brand"
                />
              </div>
            </div>

            {/* Commission Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Commission Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700 mb-2">
                    Commission Rate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="commissionRate"
                    name="commissionRate"
                    value={formData.commissionRate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10% or $10"
                  />
                </div>

                <div>
                  <label htmlFor="commissionType" className="block text-sm font-medium text-gray-700 mb-2">
                    Commission Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="commissionType"
                    name="commissionType"
                    value={formData.commissionType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="cpa">CPA</option>
                    <option value="cpc">CPC</option>
                    <option value="cpm">CPM</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="averagePaymentCycle" className="block text-sm font-medium text-gray-700 mb-2">
                    Average Payment Cycle (days)
                  </label>
                  <input
                    type="number"
                    id="averagePaymentCycle"
                    name="averagePaymentCycle"
                    value={formData.averagePaymentCycle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
              </div>
            </div>

            {/* Location & Type */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location & Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                    Region <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Global, US, EU, etc."
                  />
                </div>

                <div>
                  <label htmlFor="advertiserType" className="block text-sm font-medium text-gray-700 mb-2">
                    Advertiser Type
                  </label>
                  <input
                    type="text"
                    id="advertiserType"
                    name="advertiserType"
                    value={formData.advertiserType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Retail, SaaS, etc."
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">
                    Categories (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="categories"
                    name="categories"
                    value={formData.categories}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Electronics, Fashion, Technology"
                  />
                </div>
              </div>
            </div>

            {/* Promotional Methods */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Promotional Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="allowedMethods" className="block text-sm font-medium text-gray-700 mb-2">
                    Allowed Methods (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="allowedMethods"
                    name="allowedMethods"
                    value={formData.allowedMethods}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SEO, Email, Social Media"
                  />
                </div>

                <div>
                  <label htmlFor="restrictedMethods" className="block text-sm font-medium text-gray-700 mb-2">
                    Restricted Methods (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="restrictedMethods"
                    name="restrictedMethods"
                    value={formData.restrictedMethods}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="PPC, Paid Ads"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Brand'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

