'use client'

interface TermsProps {
  advertiser: any
}

export default function Terms({ advertiser }: TermsProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
      <div className="prose max-w-none">
        <p className="text-gray-600">
          Terms and conditions for {advertiser.name} will be displayed here.
        </p>
      </div>
    </div>
  )
}



