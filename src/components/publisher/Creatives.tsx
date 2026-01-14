'use client'

interface CreativesProps {
  advertiser: any
}

export default function Creatives({ advertiser }: CreativesProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Creatives</h3>
      <p className="text-gray-600">Creative materials for {advertiser.name} will be displayed here.</p>
    </div>
  )
}



