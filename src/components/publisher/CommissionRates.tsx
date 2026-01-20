'use client'

interface CommissionRatesProps {
  advertiser: any
}

export default function CommissionRates({ advertiser }: CommissionRatesProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Commission Rates</h3>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Commission Rate</p>
            <p className="text-2xl font-bold text-gray-900">{advertiser.commissionRate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Commission Type</p>
            <p className="text-2xl font-bold text-gray-900">{advertiser.commissionType}</p>
          </div>
        </div>
      </div>
    </div>
  )
}




