'use client'

interface Filters {
  search: string
  country: string
  advertiserType: string
  category: string
  promotionalMethod: string
}

interface AdvertiserFiltersProps {
  filters: Filters
  onFilterChange: (filters: Filters) => void
}

export default function AdvertiserFilters({ filters, onFilterChange }: AdvertiserFiltersProps) {
  const handleChange = (key: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search by Name
        </label>
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search advertisers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Country */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
        <select
          value={filters.country}
          onChange={(e) => handleChange('country', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Please Select</option>
          <option value="US">United States</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="FI">Finland</option>
          <option value="Multi">Multi</option>
        </select>
      </div>

      {/* Advertiser Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Advertiser Type
        </label>
        <select
          value={filters.advertiserType}
          onChange={(e) => handleChange('advertiserType', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Advertisers</option>
          <option value="cpa">CPA</option>
          <option value="cpl">CPL</option>
          <option value="cps">CPS</option>
          <option value="cpc">CPC</option>
        </select>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
        <select
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Please Select</option>
          <option value="electronics">Electronics</option>
          <option value="health">Health</option>
          <option value="travel">Travel</option>
          <option value="finance">Finance</option>
          <option value="legal">Legal</option>
        </select>
      </div>

      {/* Promotional Methods */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Promotional Methods
        </label>
        <select
          value={filters.promotionalMethod}
          onChange={(e) => handleChange('promotionalMethod', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Please Select</option>
          <option value="banner">Banner</option>
          <option value="text-link">Text Link</option>
          <option value="email">Email</option>
          <option value="social-media">Social Media</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() =>
          onFilterChange({
            search: '',
            country: '',
            advertiserType: 'all',
            category: '',
            promotionalMethod: '',
          })
        }
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
      >
        Clear Filters
      </button>
    </div>
  )
}



