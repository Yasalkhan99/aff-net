'use client'

import { calculateProfileCompleteness } from '@/lib/utils'

interface ProfileCompletenessProps {
  profile: any
}

export default function ProfileCompleteness({ profile }: ProfileCompletenessProps) {
  if (!profile) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    )
  }

  const completeness = calculateProfileCompleteness(profile)
  const completedFields = [
    profile.logoSubmitted,
    profile.profilePictureSubmitted,
    profile.basicDetailsCompleted,
    profile.companyDetailsCompleted,
    profile.billingDetailsCompleted,
    profile.paymentDetailsCompleted,
  ].filter(Boolean).length

  const totalFields = 5

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completeness</h3>
      
      {/* Circular Progress */}
      <div className="flex justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${(completeness / 100) * 351.86} 351.86`}
              className="text-green-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-green-600">{completeness}%</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-700">
          Complete Your Profile To Apply More Advertisers. Please complete your profile to get more brand approvals. 
          To complete your profile, you must submit the logo and all the details in profile picture, basic, company, billing, and payments.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-900">
            {completedFields}/{totalFields} settings completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${completeness}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500">{completeness}%</span>
      </div>
    </div>
  )
}



